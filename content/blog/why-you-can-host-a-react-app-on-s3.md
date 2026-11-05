---
title: "Why You Can Host a React App on S3"
description: "Two things about React bugged me for a while."
publishedAt: "2026-06-30"
updatedAt: "2026-06-30"
topic: "technical"
faq: []
---

Two things about React bugged me for a while.

First, people kept saying you can host a React app on plain S3. But S3 is just file storage — a bucket you dump files into. How does a whole app run on that? And then I tried, and it works. Magic.

Second, years ago (back in the pre-AI era) I hit a “hydration” error while building React. I read the docs, and still walked away half understanding it, half not.

So I finally got curious and researched both properly. Turns out they share the same answer. Here’s what’s actually going on — and the one question that tells you whether to host your frontend on S3 or on a real server.

## A quick one: the Element tab isn’t HTML

You know F12, the DevTools panel you open a hundred times a day? Until pretty recently I only just realized that the **Element** tab isn’t your HTML.

It’s the **DOM** — the Document Object Model. Think of it as the live tree of the page sitting in the browser’s memory. The HTML file is what the server *sent*; the DOM is the living version the browser is actually showing. When React “renders,” it’s building and mutating this DOM, not rewriting your HTML file.

Keep that in your back pocket — it matters in a second.

## First, what is a React app actually made of?

React builds a **SPA** — a Single Page Application.

Normally a website works like this: the browser asks the server for a page, the server builds an HTML page and sends it back. Click a link, you get another full page from the server. A SPA flips that: the browser loads **one** page once, and JavaScript swaps the content as you move around. No full page reloads.

So a React SPA ships as just two static things:

- an HTML shell (mostly empty)
- a JS bundle

The host sends those files. Your browser downloads them, runs the JS, and the JS builds the actual page into the DOM (the thing we just talked about).

```
host (just files)  →  browser downloads HTML + JS  →  browser runs JS  →  app appears
```

## Why S3 can host that

Here’s the important part: **nothing needs to run on the host.** The host just hands over files. The browser does all the work.

S3 only serves static files — that is literally all it does. And static files (shell HTML + JS bundled) are all a SPA needs. So S3 fits with zero fuss.

## Why SSR can’t live on S3

**SSR (Server-Side Rendering)** is the opposite model. The server builds the full HTML on every request — every URL change, every page that needs a re-render. The browser receives finished HTML immediately.

But that requires a **runtime** — something on the host actually executing code, per request. S3 can’t run code. It can store your SSR build output, but there’s nothing there to *run* it. So SSR is ruled out on S3.

So who actually uses SSR? Marketing sites and WordPress are the classic examples. And there’s a solid reason: because the server hands over fully-rendered HTML, **search engine bots can crawl the content** — the words are right there in the response, not assembled later by JS. For anything where SEO matters, that’s a big deal.

## The one question that decides it

Forget memorizing acronyms. Ask one thing: **does the host need to run code on each request (or do you need crawlable HTML)?**

- **CSR (SPA, like React)** — the browser runs everything. Static files. → S3 works ✅
- **SSG (Static Site Generation)** — HTML built once at build time, e.g. a blog. Static files. → S3 works ✅
- **SSR** — HTML built per request, needs a runtime; also what you reach for when SEO/crawlability matters (marketing, WordPress). → use a server, not S3 ✅

No → static host like S3. Yes → a server.

One nuance on SSR: even when you use it, it still needs JS to hydrate before it’s truly interactive. “Faster” there means faster first paint, not faster interactive.

## Where hydration (and that error) comes from

Now the hydration error I hit all those years ago. Here’s where it lives.

On its own, the HTML the browser first shows is just a shell. You can see it, but it does nothing — all the interactivity lives in the JS, which hasn’t arrived yet. **Hydration** is the process of attaching that JS onto the shell already on screen: walking the existing HTML and wiring up the event handlers so the buttons actually work.

So with a SPA, the browser shows that lifeless HTML shell almost immediately, then downloads the JS bundle in the background and hydrates it.

The analogy that made it click for me:

> *The HTML is a TV remote you can hold and see. Hydration is installing the batteries — the JS that makes the buttons actually work. Click before the batteries are in, and nothing happens.*

That window — page looks ready, buttons are dead — is the **hydration gap**. It happens when you click before the bundle finishes downloading and hydrating. Hydration *errors* come from this same step: the JS expects the live DOM to match what it’s about to wire up, and it complains when they don’t line up. (That’s the half I never fully got back then.)

Ways to shrink that gap:

- keep the bundle small
- buffer early clicks and replay them once JS is ready
- show a loading state until hydration is done
- hydrate the critical bits first

## Why not just download all the JS up front?

Fair question — if downloading the bundle is the slow part, why not background-fetch every chunk for a smooth ride?

Because it burns mobile data and battery, pulling down code the user may never open. So instead frameworks **prefetch predictively** — they guess what you’ll likely click next (like links already on screen) and quietly fetch those, not everything.

## What npm run build actually does

I’m guessing you’ve run `npm run build` plenty of times — because the docs told you to, so you did. But do you know what it actually produces?

1. it splits your code into several `.js` files (code splitting)
2. it produces a `main.js` the browser downloads first
3. the browser then requests more `.js` chunks on demand as you navigate into them (lazy loading)

```
npm run build
# → main.js + chunk-1.js + chunk-2.js + ...
```

Every one of those is a **static file**. Which is the whole reason a SPA drops onto S3 effortlessly — and exactly why SSR can’t.

## TLDR;

- A React SPA loads one page once and lets JS swap the content. It ships as a static HTML shell + JS bundle, and the browser runs it.
- Because nothing runs on the host, **S3 can host it** — S3 only serves static files, which is all a SPA needs.
- SSR builds HTML per request and needs a runtime → **S3 can’t host it, use a server.** It’s what marketing sites and WordPress use, because server-rendered HTML can be crawled by bots (SEO).
- The deciding question: does the host need to run code on each request (or do you need crawlable HTML)? No → S3. Yes → server.
- Hydration is installing the batteries; the hydration gap (and those hydration errors) is why a fresh page’s buttons feel dead for a second.
- `npm run build` outputs static chunks — main.js plus lazy-loaded files — which is the whole reason S3 works.
