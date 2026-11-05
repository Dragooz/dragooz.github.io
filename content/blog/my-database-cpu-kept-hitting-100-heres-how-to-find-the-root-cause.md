---
title: "My Database CPU Kept Hitting 100% — Here’s How to find the Root Cause"
description: "I noticed something ugly on my monitoring graph: the database CPU would spike to 100%, hold there for a bit, drop, then spike again."
publishedAt: "2026-07-14"
updatedAt: "2026-07-14"
topic: "technical"
faq: []
coverImage: "/images/blog/my-database-cpu-kept-hitting-100-heres-how-to-find-the-root-cause/cover.webp"
coverAlt: "My Database CPU Kept Hitting 100% — Here’s How to find the Root Cause"
coverWidth: 1600
coverHeight: 900
---

I noticed something ugly on my monitoring graph: the database CPU would spike to 100%, hold there for a bit, drop, then spike again. It wasn’t constant — it came and went.

But every time it hit 100%, the whole app paid for it. Everything slowed to a crawl, and eventually requests started timing out. Users don’t care *why* it’s slow; they just see a spinner and leave.

So it was time to dig in. 🔍

## 🐢 First Suspect: The N+1 Problem

When a Django app gets slow at the database, N+1 is the first thing I check — it’s that common.

Django loads related data *lazily*. It won’t touch a related table until your code actually asks for it. Sounds efficient, but it bites you in loops.

Fetch 100 authors, then loop over them and read each author’s books inside the loop:

- 1 query for the authors
- 100 more — one per author — for the books

That’s 101 queries for something that should be 1 or 2. That’s N+1.

The two standard fixes:

`**select_related**` — one query using a SQL JOIN. For forward foreign keys and OneToOne.

```
Book.objects.select_related("author")   # 1 query, joined in SQL
```

`**prefetch_related**` — a second query, then joined in Python memory. For many-to-many and reverse foreign keys.

```
Author.objects.prefetch_related("books")  # 2 queries, stitched in Python
```

I went through the hot paths looking for it. Turns out N+1 wasn’t my root cause this time. So I kept going.

## 🔬 Going Into Postgres: pg_stat_activity

If the ORM layer isn’t the problem, stop guessing and ask the database directly.

This is where a senior from infra team stepped in. He went straight into Postgres and pulled up **pg_stat_activity** — the table that shows exactly what’s running *right now*: which queries are active, how long they’ve been going, and what they’re waiting on.

```
SELECT pid, state, wait_event_type, query
FROM pg_stat_activity
WHERE state != 'idle';
```

He inspected the live queries one by one to see what they were actually doing.

## 🎯 Bingo: A Sequential Scan Over a Million Rows

There it was: a **sequential scan over roughly 1 million rows**. Postgres was reading the *entire* table every single time that query ran.

One of those is bad enough. But in `pg_stat_activity` we could see several running at once — all scanning the same giant table, locking and blocking each other. That's exactly the pattern that pins CPU at 100% and makes it come and go with traffic.

Found it.

Straight from `pg_stat_activity` we could read the actual query text that was running — and it was hitting a table we knew was massive, with no index on the column it filtered on. That was the giveaway.

(One nuance: `pg_stat_activity` shows you the query and that it's slow or blocking, but not *how* Postgres runs it. If you want to see the plan itself — the actual "sequential scan" step — that's what `EXPLAIN` is for. Running it on the query confirmed the seq scan.)

## 📇 The Fix: Indexing

A sequential scan means Postgres has no shortcut, so it walks the whole table. The fix is an **index**.

An index is a separate structure stored on disk — a B-tree by default — that only Postgres knows how to read, sitting alongside the table. Instead of scanning all million rows, Postgres uses the index to jump straight to the ones it needs.

Think of a 500-page book. Without an index, you flip through every page to find one topic. With the index at the back, you jump to page 342 directly. Same idea, same speedup.

```
CREATE INDEX idx_transactions_account_id ON transactions (account_id);
```

I added the index on the column being filtered, re-ran EXPLAIN, and the seq scan turned into an index scan. The CPU came back down, and the timeouts stopped.

## Takeaway

“My database is slow” almost always has a findable cause. Don’t guess — rule out N+1 first, then look at `pg_stat_activity` to see what's actually running right now and inspect it. Mine was a million-row sequential scan with no index behind it, several copies fighting each other.

## TLDR;

- App timing out → DB CPU pinned at 100%, spiking on and off.
- **First suspect:** N+1. Fixes are `select_related` (JOIN, forward FK) and `prefetch_related` (2 queries, M2M/reverse FK). Wasn't the root cause here.
- **Then dig into Postgres:** a senior checked `pg_stat_activity` — the table of what's running right now — and inspected the live queries.
- **Found it:** a sequential scan over ~1M rows, several running concurrently and blocking each other. `EXPLAIN ANALYZE` confirmed the plan (it runs for real — wrap writes in `BEGIN … ROLLBACK`).
- **Fix:** add an index (B-tree) so Postgres jumps to rows instead of scanning the whole table. CPU recovered.
