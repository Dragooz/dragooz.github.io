---
title: "JSON Web Token (JWT)? Concept of API Key? HS256 vs RS256?"
description: "When building a new app, JWT is always the first choice for auth."
publishedAt: "2026-07-25"
updatedAt: "2026-07-25"
topic: "technical"
faq: []
coverImage: "/images/blog/json-web-token-jwt-concept-of-api-key-hs256-vs-rs256/cover.webp"
coverAlt: "JSON Web Token (JWT)? Concept of API Key? HS256 vs RS256?"
coverWidth: 1536
coverHeight: 1024
---

When building a new app, JWT is always the first choice for auth. Every framework defaults to it, every "Bearer token" header runs on it. I've used it plenty of times — but I realized I couldn't properly explain how it actually authenticates anyone.

In my mind, thinking is API key auth basically the same concept?

## 🎫 Finding #1: JWTs are signed, NOT encrypted

Do you even know JWT is signed, NOT encrypted? I always thought it was encrypted, until now.

- **Signed** — "here's the data, publicly ready to decode, anyone can read — but nobody can forge it." The signature only proves nobody tampered with it.
- **Encrypted** — "locked. You give the key, I give the answer." A different job, done by algorithms like AES.

Two different guarantees. Signing gives you trust. Encryption gives you secrecy. And JWT gives you the first one only.

A JWT has 3 parts:

```
aaaa.bbbb.cccc
header.payload.signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
```

- **Payload** — the data. Anyone can base64-decode and read it.
- **Signature** — proof the header + payload weren't touched.

The analogy that made it click: A concert wristband. 
Everyone can see it and read what's printed on it. But only the venue can issue a real one, and the bouncer instantly spots a fake.

So why not encrypt it with AES anyway? I wondered this too. 
Turns out: The payload is usually non-sensitive anyway, and encryption adds real cost — complexity, compute per request, key maintenance. If you have actual secrets, don't put them in the token.

Hence in term of the concert wristband example, signing solves exactly the issue here without overcomplicating it: Trust, not secrecy.

## 🔑 Finding #2: API keys and JWTs are the same concept underneath

This was the part I found most interesting. Both boil down to: **prove a secret, get access.**

- **API key:** you send a secret → server hashes it (SHA-256) → compares with the stored hash in the DB → proven, allowed.
- **JWT:** your email + password IS the secret → server verifies it once at login → hands you back a signed identity to use from then on.

So technically, we could just send email + password on every single API call. Same proof, right? But here's the catch:

- Send the password **once** at login → 1 chance to leak
- Send it on **10,000 requests** → 10,000 chances to leak

That's really why JWT exists: **exchange the long-term secret once, for a short-lived, verifiable identity.** The password stays safe; the token does the daily work — and even if the token leaks, it expires.

The JWT flow:

1. User logs in (email + password), server verifies
2. Server signs a JWT (access + refresh) and sends it back
3. User attaches it to every request: `Authorization: Bearer <token>`
4. Server verifies signature + expiry. Done.

**The big win:** the server stores nothing to check against — unlike the API key, there's no DB lookup per request.

**The trade-off:** you can't revoke a JWT immediately. It's valid until expiry — unless you build a blacklist, which brings back the storage you were avoiding.

## 🔐 Then I dove into the JWT’s algorithms: HS256 vs RS256

The choice comes down to one question: **who needs to verify your tokens?**

### HS256 — symmetric (HMAC)

HS256 = HMAC (the recipe) + SHA-256 (the ingredient).

One secret does everything: signs AND verifies.

- **Pros:** fast, simple, small
- **Cons:** anyone holding the secret can also forge tokens
- **Use case:** a single Django app signing and verifying its own login tokens. Using RS256 here is pure waste — you’d generate a keypair, manage two keys, and pay slower crypto per request… to protect yourself from *yourself*. The only party verifying is the same server that signed. HS256, done.

Analogy: a shared rubber stamp. Whoever has the stamp can both check documents and produce fakes.

### RS256 — asymmetric (RSA)

Two keys:

- **Private key** (SIGNING_KEY) — signs, stays secret on your auth server
- **Public key** (VERIFYING_KEY) — verifies, can be handed to anyone

Analogy: a signet ring. Only you own the ring that presses the seal, but anyone can recognize the seal.

- **Pros:** private key stays secret — verifiers can never forge
- **Cons:** slower crypto, bigger keys, two keys to manage
- **Use case:** “Sign in with Google.” Google’s tokens get verified by millions of third-party apps. With HS256, every one of those apps would hold Google’s signing secret — meaning any random todo-app could mint valid Google tokens for anyone. Insane. RS256 is the only sane option: they verify, they can never forge.

Under the hood it's RSA — prime factoring math, where reversing the multiplication of two giant primes is computationally a wall. You don't need the math to use it.

### 💡 Asymmetric buys you exactly ONE thing

**The verifier cannot forge.** That's the entire difference.

Tried picture the Discord with 10,000 third-party apps verifying its tokens:

- With HS256, all 10,000 apps hold the shared secret. Any one of them can forge valid tokens and attack the other 9,999.
- The HMAC "fix" would be 10,000 separate secrets — not scalable.
- With RS256: ONE private key at Discord, ONE public key distributed. Everyone verifies, nobody forges.

This is exactly how "Sign in with Google" works. The third-party app holds Google's public key, verifies your token is genuinely Google-signed — but could never mint one.

**Flip side:** if it's just your own backend verifying, HS256 is fine. The secret lives only with parties you already trust.

### ⚡ ES256 — the modern pick

ECDSA is the modern alternative to RSA (elliptic curves instead of prime factoring). Practical facts:

- **Much smaller keys, same strength** — 256-bit EC ≈ 3072-bit RSA
- Faster, smaller tokens
- The modern default: Bitcoin, TLS, Apple/Google tokens

One gotcha: bit counts aren’t comparable across algorithm types.

- HS256 secret: 256-bit ≈ 256-bit strength
- RSA 2048-bit ≈ ~112-bit strength
- ECDSA 256-bit ≈ ~128-bit strength

So “2048 > 256” doesn’t mean RSA is stronger. Different math, different scales.

## 🤔 Why can’t someone reverse the signature?

SHA-256 is a one-way function. Any input → a fixed 256-bit fingerprint. Change 1 bit, the whole output changes. And there’s no going backward — 256 bits means ~1.15×10⁷⁷ possibilities. Attempting to recover the input is called a preimage attack, and it’s a dead end.

## 👉 My practical rule now

- **Only your own servers verify?** HS256. Simple wins.
- **Third parties verify your tokens?** Asymmetric — verifiers must not be able to forge.
- **Going asymmetric today?** ES256 over RS256. Same safety, smaller and faster.

## TLDR

- JWT = signed, not encrypted. Anyone can read, nobody can forge. Only AES-type encryption actually hides content.
- API key & JWT = same core concept: prove a secret. Email + password IS the secret — JWT just exchanges it once instead of exposing it on every request.
- Password once = 1 leak chance. Password on 10,000 requests = 10,000 chances. That’s why tokens exist.
- HS256 = one shared secret, fine inside your own system.
- Asymmetric buys ONE thing: verifiers cannot forge. Required once outsiders verify.
- ES256 = modern default for asymmetric.
