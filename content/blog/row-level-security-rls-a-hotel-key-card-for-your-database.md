---
title: "Row Level Security (RLS)? A Hotel Key Card for Your Database"
description: "I ran into RLS twice in the same month."
publishedAt: "2026-06-16"
updatedAt: "2026-06-16"
topic: "technical"
faq: []
---

I ran into RLS twice in the same month.

First, I spun up a Supabase side project and the dashboard kept nagging me — enable RLS, enable RLS — on every single table I created. Fine, I clicked the toggle. But clicking a toggle isn’t understanding.

Then it got serious: I was building an AI agent that connects to a database and **writes its own SQL**. I can’t review every query it generates. Before letting it loose, I needed to actually understand what was protecting the data.

So I went reading. And honestly, it got a bit annoying — every article explains what RLS is, but almost none clearly says **when and where you actually need it**. That gap is the reason for this post.

**🔑 What RLS actually does**

Row Level Security lets the **database itself** decide which rows you’re allowed to see — based on who you are. Your identity rides along inside a JWT, and the database reads it (auth.uid()) when deciding what to return.

The real-life version: a hotel key card. You walk down a hallway of identical doors, but your card only opens *your* room. RLS is the front desk — the database checks your key before handing back a single row.

**🚪 It denies by default**

This is the part that surprised me.

If RLS is enabled on a table and **no policy matches you**, you get **nothing** back:

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
 — no policy yet → every query returns 0 rows

You unlock it with a policy:

> CREATE POLICY “own rows only”
> ON todos FOR SELECT
> USING (auth.uid() = user_id);

Now SELECT * FROM todos quietly becomes “select *my* todos.” The DB appends the filter for you — you never write it in the query.

**So when do we actually need it?**

This was the question none of those articles answered properly. RLS isn’t free (policies evaluate per row), so here’s the rule of thumb I landed on.

**📱 Client talks to the database directly → mandatory**

If a mobile app or a React app connects to Supabase directly, there’s **no backend in between** to act as the bouncer. The browser holds an anon/publishable key that’s sitting right in the JS bundle — anyone can grab it. Without RLS, anyone can read the table.

So RLS *is* the bouncer. No other layer is going to do it.

**🤖 AI agent writing its own SQL → mandatory**

This was my case. The agent connects to the DB, sees the schema, and generates queries dynamically. I can’t hand-audit every query it writes. RLS is the seatbelt — even if the agent writes SELECT * FROM todos, the DB still only returns the rows that identity is allowed to see.

**✅ Django (or any trusted backend) in front → optional**

If a trusted backend sits between the client and the DB, the ORM already filters by user:

> Todo.objects.filter(user=request.user)

The filtering happens in code you control. Enabling RLS on top is mostly **redundant** — the same rule enforced twice.

The exception: when data leakage is **0% tolerable**, like multi-tenant SaaS where one tenant seeing another’s data is catastrophic. There, defense-in-depth earns its keep — let the ORM filter *and* let the DB refuse to leak even if an ORM query has a bug. Then enforce RLS too.

**With that said, I was curious about one thing**

When a client logs in, does it query the auth table directly? That felt dangerous to me.

Turns out no. The flow is:

1. Client sends an HTTP POST to **GoTrue** (Supabase’s auth server) with credentials.
2. GoTrue queries auth.users **internally**, checks the password hash.
3. On match, GoTrue returns a **JWT** carrying your user_id.
4. The client never touches the auth table.

The auth schema lives in the *same* Postgres database, but it’s **not exposed through the Data API** by default — only your public tables are. So the only tables a client can query are the ones you intend, and those are exactly the ones RLS guards. (Supabase even ships a security lint, “auth users exposed,” to warn you if that boundary ever breaks.)

**TLDR**

- **RLS** = the database filters rows by your identity, not your app code.
- It **denies by default** — RLS on with no matching policy returns **zero rows**.
- **Client-direct** (mobile/React → Supabase) or **AI-generated SQL** → RLS is mandatory; there’s no other bouncer.
- **Trusted backend** like Django → optional; the ORM already filters. Enforce it anyway only when leakage is 0% tolerable (multi-tenant).
- Login goes through **GoTrue**, not a direct auth table query. The auth schema isn’t exposed to clients — only your public tables are.

— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —

**I’m Yi Chong** — a fullstack engineer who kills repetition. If your team does anything manually twice a week that a script could do once, that’s my favorite kind of problem.

👉 [Tell me what’s eating your team’s hours ](http://yichonggoh.com)— I’ll reply with how I’d automate it. No pitch, just the approach.
