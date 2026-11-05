---
title: "All you need to know about CORS — Cross-Origin Resource Sharing"
description: "I met CORS the way I think most of us do. Fresh project, Django on the backend, React on the frontend, both running on my own laptop."
publishedAt: "2026-08-04"
updatedAt: "2026-08-04"
topic: "technical"
faq: []
coverImage: "/images/blog/all-you-need-to-know-about-cors-cross-origin-resource-sharing/cover.webp"
coverAlt: "All you need to know about CORS — Cross-Origin Resource Sharing"
coverWidth: 1600
coverHeight: 900
---

## Why Do We Even Need CORS?

I met CORS the way I think most of us do. Fresh project, Django on the backend, React on the frontend, both running on my own laptop. And they refused to talk to each other.

Same machine. Same developer. Same code I wrote five minutes ago. Blocked.

```
Access to fetch at 'http://localhost:8000/api/users' from origin
'http://localhost:3000' has been blocked by CORS policy
```

The fix is simply add in the CORS Allowed List, and for a long time that’s exactly what I did. But it never told me *why* the browser did that to me in the first place, or what the header I just pasted actually turns off. So eventually I sat down with it.

## 🚧 Day one: why your own two apps are strangers

React dev server runs on `localhost:3000`. Django runs on `localhost:8000`.

To me, that’s one project. To the browser, those are two different origins, and it applies the exact same suspicion it would apply to a random site on the internet. It doesn’t know or care that both are mine.

That’s the whole reason CORS setup is mandatory even locally. It’s not a production concern leaking into dev — it’s the browser’s default posture, and dev is just where you notice it first.

## 🌐 Origin vs site (the distinction worth getting right)

These two get used interchangeably and they are not the same rule. Getting them straight saved me a lot of confusion later.

**Origin = protocol + host + port.** Any one of the three differs, and it’s cross-origin.

- `http://mysite.com` vs `https://mysite.com` → **cross-origin**, protocol differs
- `https://app.mysite.com` vs `https://api.mysite.com` → **cross-origin**, host differs
- `http://localhost:3000` vs `http://localhost:8000` → **cross-origin**, port differs
- `https://mysite.com/a` vs `https://mysite.com/b` → **same origin**, path is irrelevant

**Site = the registrable domain** (roughly, the part you bought, plus its suffix). Subdomains and ports don’t count here.

- `app.mysite.com` vs `api.mysite.com` → **same site**, but cross-origin
- `mysite.com:443` vs `mysite.com:8443` → **same site**, but cross-origin
- `mysite.com` vs `evil.com` → **cross-site**, and cross-origin too

Notice the direction here. Cross-site is **always** cross-origin, because a different domain means a different host, so the origin can’t possibly match. But cross-origin is **not** always cross-site — `api.mysite.com` and `app.mysite.com` are cross-origin while staying same-site, and so are two ports on localhost.

Origin is the stricter of the two. Same-origin implies same-site; the reverse doesn’t hold.

Why that matters practically: **cookies care about site, CORS cares about origin.** Two separate security mechanisms with two separate definitions of “close enough.” So you can land in a state where the cookie is happily attached to your request (same site) while the browser still blocks your JS from reading the response (cross-origin). It looks like one bug. It’s two systems each doing exactly what they were told.

## 🔑 The sentence that reframed it for me

Here’s the part I wish someone had put in front of me on day one:

> *The Same-Origin Policy blocks JavaScript from****reading****a cross-origin response. It never blocked****sending****one.*

Sending cross-origin was never restricted, and it can’t be — the web is built on it:

- `<img src="https://other-site.com/pic.png">` loads fine
- `<script src="https://cdn.com/lib.js">` loads fine
- `<form action="https://other-site.com/submit" method="POST">` submits fine

None of that needs permission from the browser. What needs permission is your JavaScript calling `fetch()` and then reading the response body or headers.

So CORS is a server saying: *“here are the frontend origins I allow to read my responses.”* The browser gets the response, checks the calling origin against that list, and only then hands the data to your JS.

Which means back on day one, my request **did** reach Django. Django **did** run the view and return the users. The browser just refused to give React the reply.

## 🍽️ The restaurant analogy

A restaurant with a slot in the door.

Anyone walking past can slip an order through, and the kitchen cooks whatever the order says. CORS is the rule about who’s allowed to read the receipt that comes back out.

If the order said “transfer money,” the money is gone. Not being able to read the receipt doesn’t undo it.

CORS is a read-guard, not a door lock.

## 🛠️ How much CORS you actually need in a Django project

For the day-to-day, this is it.

Install `django-cors-headers`, then:

```
INSTALLED_APPS = [
    "corsheaders",
    # ...
]
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",   # keep this high
    "django.middleware.common.CommonMiddleware",
    # ...
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://app.mysite.com",
]
# only if the frontend sends cookies
CORS_ALLOW_CREDENTIALS = True
```

Three things that actually bite people:

1. **Middleware order.** `CorsMiddleware` has to run before anything that can generate a response, or your error responses come back without CORS headers — and you get a confusing browser error instead of a readable 500. This is to tackle the “preflight” scenario too (will be cover in future)
2. `**CORS_ALLOW_ALL_ORIGINS = True**`**is not "the fix."** Fine for a throwaway local spike. In production it means any site can read your responses, and combined with cookie auth that's a real hole.
3. `*****`**and credentials don't mix.** The spec forbids a wildcard origin on credentialed requests. If you're sending cookies, you must list exact origins.

That’s genuinely most of what a working engineer needs. The rest is understanding *why*, which is the interesting bit.

## ❓ The questions I had while digging

## If CORS only exists in the browser, can’t an attacker just use curl?

Yes. CORS is enforced by the browser — curl, Postman, or a Python script ignores it completely, because there’s no browser in the loop to enforce anything.

But that attacker hits your API as an anonymous stranger. They don’t have the victim’s cookie, because cookies live inside the victim’s browser.

So the attack that matters isn’t “attacker calls your API.” It’s “attacker gets the **victim’s browser** to call your API” — because that request shows up already authenticated.

## Can’t the attacker just grab the cookie and send it themselves?

Not if it’s `HttpOnly`. That flag means JavaScript can't reach the cookie through `document.cookie`; only the browser's HTTP layer touches it.

And a cookie is pinned to a domain the moment it’s created. The browser’s rule is simply: only attach this cookie when the request goes to that domain. There’s no way for JS on `evil.com` to say "also ship bank.com's cookie over to me."

(XSS breaks this (if cookie has no httpOnly flag), because then attacker code is running *inside your origin*. Different problem, different post.)

## So what happens step by step when no CORS headers are set?

1. Malicious JS on `evil.com` calls `fetch('https://bank.com/api/account')`
2. The browser sends it, and attaches bank.com’s cookie — the request is going to bank.com, so the cookie qualifies
3. bank.com sees a valid session and returns the account details
4. The browser checks: is `evil.com` in bank.com's allowed origins? No.
5. The browser refuses to hand the response body to evil.com’s JavaScript

Step 5 is the protection. Steps 1 through 3 happened regardless.

One thing I had to correct in my own head: this isn’t about “displaying” anything. If a user just navigates their tab to bank.com, the page renders perfectly — top-level navigation (main page url changed) isn’t governed by CORS at all. CORS applies to background requests JS initiates, like `fetch` and `XMLHttpRequest`.

## Then what is CORS really protecting?

Not the server. The server ran the request either way.

Not the browser, which is how I used to phrase it.

**It protects the user’s already-authenticated data.** The browser is just where enforcement happens, because the browser is the thing holding the credentials.

## 🎫 Cookies as ambient authority

There’s a name for the underlying awkwardness, and it’s a useful one to carry: **ambient authority** — access you have by default because of the environment you’re running in, with no permission check per action.

Your session cookie is ambient authority. You don’t attach it, approve it, or confirm it. The browser attaches it to every qualifying request, automatically, whether that request came from your app or from a tab you opened by mistake.

That convenience is the entire reason browser auth is hard. Once cookies look like ambient authority, the next problem stops feeling like an edge case and starts feeling inevitable.

## ✅ TLDR

- `localhost:3000` and `localhost:8000` are different origins. That's why a fresh Django + React project breaks before you've written any real code.
- **Origin** = protocol + host + port; any one differs and it’s cross-origin. **Site** = registrable domain.
- Cross-site is always cross-origin. Cross-origin is not always cross-site. Origin is the stricter rule.
- Cookies care about site. CORS cares about origin. Two mechanisms, two definitions.
- The Same-Origin Policy blocks JS from **reading** cross-origin responses. Sending was never blocked.
- No CORS headers still means your Django view executed and returned data.
- Day-to-day Django: `django-cors-headers`, explicit `CORS_ALLOWED_ORIGINS`, `CorsMiddleware` near the top, no wildcard with credentials.
- CORS protects the user’s authenticated data — not your server, not the browser.

Which leaves the obvious gap. If CORS can’t stop a cross-origin request from firing off a money transfer, what does?

That’s CSRF, and it’s the next post.
