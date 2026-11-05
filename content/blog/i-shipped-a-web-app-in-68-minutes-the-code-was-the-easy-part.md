---
title: "I Shipped a Web App in 68 Minutes. The Code Was the Easy Part."
description: "First commit to live site: 68 minutes. 9 commits. Custom domain, HTTPS, SEO, analytics, accessibility."
publishedAt: "2026-09-08"
updatedAt: "2026-09-08"
topic: "business"
faq: []
coverImage: "/images/blog/i-shipped-a-web-app-in-68-minutes-the-code-was-the-easy-part/cover.webp"
coverAlt: "I Shipped a Web App in 68 Minutes. The Code Was the Easy Part."
coverWidth: 1600
coverHeight: 900
---

First commit to live site: **68 minutes. 9 commits.** Custom domain, HTTPS, SEO, analytics, accessibility.

A few years ago this was a week. Not because the code was hard — because everything *around* the code was hard.

I want to talk about what actually changed, and what didn’t.

## 🎯 The Itch

I’m on a fitness rewards programme that awards points based on your **average** heart rate as a percentage of your age-related maximum, held for a minimum duration.

The published table gives you percentages. My watch gives me beats per minute. So before every workout I was doing arithmetic in my head, and I kept forgetting the numbers.

Small, real, personal. The best kind of side project — nobody has to want it except me.

Enter age, average heart rate, minutes. Get points.

## ⚡ What Fit Inside 68 Minutes

This is the part that would have been unthinkable in one sitting.

**The app**

- Single-purpose calculator, per-field validation with physiologically real bounds and specific error messages
- A tier ladder replacing the reference table — shows which tiers you cleared and the exact gap to the next one
- A separate steps block with its own thresholds
- A tally that corrects a rule people misread, showing the sum they expected struck through next to the real answer
- A ~600 word explainer collapsed behind a `<details>` toggle

**The layer around it**

- SEO: FAQPage and WebApplication JSON-LD, canonical, `sitemap.xml`, `robots.txt`, OG tags
- GA4
- Accessibility: `aria-describedby` on every input, `role="status"` on the result, `aria-invalid` on failed validation, visible focus states

Every one of those used to be its own ticket.

## 🧱 The Stack: Deliberately Nothing

- **Three source files** — `index.html`, `styles.css`, `app.js`
- **~1,278 lines**, 192 KB including all images
- Vanilla JS, CSS custom properties, one Google Font
- **Zero npm packages. Zero**`**node_modules**`**. Nothing to**`**npm install**`**.**

This wasn’t minimalism as aesthetic. A build step is a thing that can break between you and production. For a calculator with no state and no backend, a framework buys nothing and charges you setup time, dependency drift, and a pipeline to maintain.

## ☁️ Hosting, Genuinely Free

- Cloudflare Page & Workers static assets, connected to GitHub
- Push to `main` → live in about 20 seconds
- Custom domain and HTTPS included
- Config is a 5-line `wrangler.toml`

No trial, no card, no cold start. At this scale free is actually free — and that used to be the single biggest friction point in shipping a weekend idea.

## ⏱️ Where the Time Actually Went

Not the code. The calculator logic is about 100 lines.

**1. Design iteration.** The first version had two separate forms asking for overlapping inputs and a 9-row reference table nobody would ever read. Caught it, threw it out, rebuilt around a single input and a tier ladder.

**2. One deploy misconfiguration.** `wrangler.toml` pointed at a directory that didn't exist. One failed build, reverted, moved on.

**3. Getting the domain rules right.** This is the one that matters.

## 🖨️ The Shift

AI handed us a printing press. Printing got free. Proofreading didn’t.

That’s the whole thing. Generation collapsed from days to minutes. Verification didn’t move at all — it still costs what it always cost, because it’s bounded by reality, not by typing speed.

So the ratio flipped. Generating everything took a fraction of the session. Checking it, redesigning it, and correcting the domain logic took the rest.

Our value moved with it. We used to be paid to produce the artifact. Now we’re paid to know what correct looks like, and to actually go and check.

And the most valuable part of this build wasn’t the calculator. It was taking a rule people consistently misunderstand and encoding it into something that corrects them visually, in the moment they’re making the mistake.

AI can generate that in minutes. It can’t tell you it was worth building.

See it live here: [https://aia-vitality-hr-calculator.dragooz.com/](https://aia-vitality-hr-calculator.dragooz.com/)

## TLDR;

- Shipped a real, deployed, polished web app in **68 minutes** — SEO, PWA, accessibility, custom domain, all of it
- **Three source files, zero dependencies, free hosting** with push-to-deploy
- The code was ~100 lines and the **easy part**
- Generation is cheap now, **verification + providing value is the job**
- Knowing which problem is worth encoding still isn’t automated
