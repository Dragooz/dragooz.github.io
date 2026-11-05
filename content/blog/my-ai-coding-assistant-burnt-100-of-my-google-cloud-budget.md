---
title: "My AI Coding Assistant Burnt 100% of My Google Cloud Budget."
description: "I was building an AI-powered trip itinerary planner with Claude Code, and the process burnt 100% of my budget in my Google Cloud Console — without me…"
publishedAt: "2026-07-07"
updatedAt: "2026-07-07"
topic: "technical"
faq: []
---

## Here’s How.

I was building an AI-powered trip itinerary planner with Claude Code, and the process burnt 100% of my budget in my Google Cloud Console — without me noticing, until Google sent me an email reminder. ngl, I panicked abit. 😅

Here’s the thing — I thought vibe coding = low volume API calls = no need to worry about cost there. Plus Google APIs like Sheets, Drive, etc. are free anyway, right?

With that mindset, it almost cost me thousands. To note: **Google Maps is a completely different beast compared to other API services.** 🐉

Turns out the damage was “only” RM33 — but only because I’d set a budget alert and STOPPED right there (I’m monitoring what the code does, not fully automated). It wasn’t the AI tokens (I ran on subscription). It was an API the AI suggested I call: the Google Maps API. My app calls it 50–100 times per trip plan — if I’d kept vibe coding without noticing, thousands.

If you’re about to enable billing on Google Cloud — especially to explore the Maps services — this article exists so you never repeat my mistake. Let’s walk through exactly how the billing works and where the traps are.

## ⚡ First, clear the terminology

- **Google Cloud Console** = the UI you click through.
- **Google Cloud Platform (GCP)** = the actual services behind it (IAM, APIs & Services, Compute Engine, and so on).

On billing, I mentally split things into two buckets: usage-based Cloud services (like the Maps API — use first, get charged after), and AI Studio / Gemini (LLMs billed per token, free tier then pay-as-you-go). That prepay/postpay split is my own mental model, not an official Google category — Gemini’s paid tier is also usage-based.

Most people already understand token billing, so I’ll skip that. The one that bit me is the usage-based side.

## 🆓 The mindset trap: not everything is free

My assumption came from the Workspace world, where the APIs really are free. But Google’s services split into three very different cost models:

- **Workspace APIs** (Sheets, Drive, Docs, Gmail, Calendar, Forms, Meet) — free, quota-capped. Hit the limit and you get a 429 error; wait or request an increase. This is where my “Google APIs are free” mindset came from.
- **GCP infra** (BigQuery, Compute, Storage, Cloud SQL…) — pay for what you consume. Bills like AWS, nothing new to learn.
- **Maps Platform** — pay per event past a free cap. The different beast. The rest of this article is about it.

## 🚦 Free Trial vs Paid Account

Before anything else, know which account type you’re on:

- **Free Trial** = safe mode. You won’t be charged anything; worst case, your API calls stop working. New accounts also get a $300 trial credit.
- **Paid Account** = charges start once you exceed free usage. This is where you MUST set budget alerts — mine is the only reason RM33 didn’t become thousands.

## 💡 The change that makes old guides wrong

Google Maps Platform pricing changed on **1 March 2025**. The old flat **$200/month credit is gone**, replaced with a free monthly cap **per SKU** plus expanded volume discounts.

Almost every “Google Maps free tier” article online predates this. If you’re reading old guides, you’re budgeting against the wrong model.

## 📱 The phone-plan analogy

Maps billing clicks once you picture a phone plan. Each month you get free “minutes” that **reset**. Go over, you pay per unit. And there are different lanes — each lane has a different price and a different free allowance.

On a paid account, you also choose how to pay:

- **Pay-as-you-go (default)** — pay per call after exceeding the free cap.
- **Subscription plans** — Starter ($100/mo, 50K calls), Essentials ($275/mo, 100K calls), Pro ($1,200/mo, 250K calls). Each covers a specific scope of APIs; anything outside the plan, or beyond the cap, falls back to pay-as-you-go. (Enterprise is a pricing *category* with custom SKU deals, not a subscribe-able plan.)

## 🔑 The trap that actually got me: fields decide the price

The Maps Platform is layered: the platform sits on top, with services like **Maps**, **Routes**, and **Places API (New)** underneath, and specific APIs like Text Search below those.

Here’s the part I didn’t expect: **the pricing tier isn’t set by which API you call. It’s set by which fields you request.**

Same Places Text Search call, different fields, different lane:

- `places.attributions` → **Essentials** tier → 10,000 free calls/month
- `places.businessStatus` → **Pro** tier → 5,000 free calls/month
- `places.websiteUri` → **Enterprise** tier → 1,000 free calls/month
- `places.editorialSummary` → **Enterprise + Atmosphere** tier → 1,000 free calls/month

My travel app wanted the rich stuff — editorial summaries like *“Opened in 1998, this 6-storey shopping hub offers designer boutiques & international restaurants”* (that’s Suria KLCC), plus websites. That pushed every call into the **Enterprise + Atmosphere** tier.

So my free allowance was only **1,000 calls**, not the 10,000 I assumed. And remember — my app fires 50–100 of these per trip plan. I burned through it without knowing.

## 🧮 Here’s how I got charged

I made **1,278 requests** between 28 June and 2 July — just 2 days of actual experimenting, about 1 hour each, whenever I got time. Since the free cap resets monthly, split it by month:

- **June:** ~1,208 calls − 1,000 free = **208 charged**
- **July:** ~70 calls, all inside a fresh 1,000 free = **0 charged**

For Text Search Enterprise + Atmosphere in the 1,000–100,000 band, the rate on my pricing table is **RM163.54 per 1,000 calls**:

208 × RM163.54 / 1,000 = **RM34.02**

Which matches my ~RM33 bill. Everything made sense once I saw the two mechanics: the free cap resets monthly, and my fields chose the tier for me.

## 🛠️ Do this BEFORE you write a single line of code

If you’re exploring Google Cloud APIs, especially Maps, here’s the checklist that would’ve saved me:

1. **Set a budget alert first.** Console → Billing → Budgets & alerts. This one email is why I stopped at RM33 instead of thousands.
2. **Pick your API and check the free cap and tiers** → developers.google.com/maps/billing-and-pricing/pricing
3. **Look up which tier your requested fields fall into** → e.g. the Text Search field docs. Request only the fields you need — every extra field can jump you into a pricier lane.
4. **Monitor your real request count** → the Maps metrics page in Cloud Console.
5. **Do the maths, then verify** → the Billing console shows actual charges.

## Takeaway

It honestly felt complicated to figure out the pricing, but it’s a one-time learn. Vibe coding doesn’t mean low cost — the AI writes the calls, but you pay for them. The free tier resets monthly per SKU, the fields you request decide the price tier, and a budget alert set before you build is the difference between a RM33 lesson and real debt.

## TLDR;

1. “Vibe coding = low volume = free” is a trap — sometimes it’s not true.
2. Google Maps Services is a different beast scheme than other services like GDrive, GSheet — per-SKU free caps (Essentials 10K, Pro 5K, Enterprise 1K), resetting monthly, and the **fields** you request decide the tier.
3. Set a budget and alert BEFORE starting to vibe code!
