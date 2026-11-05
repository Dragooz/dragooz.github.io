---
title: "Everything you need to know about OIDC — and you’ve probably already used it without noticing"
description: "When I was initializing CI/CD, an AI told me to stop putting long-lived AWS keys in my CI secrets and use OIDC instead, because it’s “safer.” That’s the…"
publishedAt: "2026-08-18"
updatedAt: "2026-08-18"
topic: "technical"
faq: []
coverImage: "/images/blog/everything-you-need-to-know-about-oidc-and-youve-probably-already/cover.webp"
coverAlt: "Everything you need to know about OIDC — and you’ve probably already used it without noticing"
coverWidth: 1536
coverHeight: 1024
---

When I was initializing CI/CD, an AI told me to stop putting long-lived AWS keys in my CI secrets and use OIDC instead, because it’s “safer.” That’s the kind of sentence I don’t like taking on faith. Safer how? Against what? So I questioned it and dug in.

Turns out the mechanism is quite straightforward. And by the end I realised I’d been using it for years — every “Log in with Google” button is the same thing.

## Before and after

Here’s what I was about to build, and what I built instead.

**Before:** generate an IAM user, copy the access key and secret into CI secrets, reference them in the workflow.

```
env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

That key never expires. It works from any machine on earth. It’s now in CI secrets, in whoever’s password manager, and possibly in a Slack thread from onboarding. If it leaks, you find out later.

**After:** no key anywhere, and the temp credentials only live for, say, 10 minutes;

```
permissions:
  id-token: write
```

```
steps:
  - uses: aws-actions/configure-aws-credentials@<commit-sha>
    with:
      role-to-assume: ${{ vars.AWS_ROLE_ARN }}
      aws-region: ${{ vars.AWS_REGION }}
```

## The three parties

1. **Issuer** (also called provider, or IdP — same thing) signs a short-lived token with their private key, proving it really came from them
2. **Courier** carries it (the middleman)
3. **Verifier** checks the signature and grants access — it knows what to expect, and has the public key to verify

For a GitHub Actions deploy to AWS: GitHub is the issuer, the runner is the courier, AWS is the verifier.

Plenty of others sit in that issuer slot: GitLab CI, CircleCI, Bitbucket Pipelines, Google, Microsoft Entra ID, Okta, Auth0, Kubernetes service accounts. Any service publishing its config and public keys at a well-known URL can be one.

The part that took me a moment: **the issuer and the verifier never talk to each other.** GitHub does not know your AWS account exists. The runner is the only thing that touches both.

AWS does fetch something from GitHub once, but it’s GitHub’s *public* keys from a public URL. Nothing secret is exchanged. GitHub holds the private key. AWS holds nothing at all.

## 🛂 It’s just a passport at a border

- The token is the passport
- GitHub is the government that issued it
- The runner is the traveller, carrying it
- AWS is the officer at the border, verifying the passport

The officer doesn’t phone the government. He trusts the signature, and reads three things off the document.

## What the officer reads

### Your name — subject (sub)

GitHub prints this from the real job:

```
repo:MY-ORG@111111/MY-REPO@222222:ref:refs/heads/develop
```

Three parts. Owner, repo, branch. And the two `@` numbers are the interesting bit.

### 🔒 Why the IDs make it unforgeable

Owner and repo names are globally unique at any given moment — nobody else can create your org’s repo while it exists. But names are **recyclable.** Delete a repo, rename an org, let a username lapse, and the name is free for anyone to take.

That used to be a real hole. Whoever grabbed the freed name could create a repo with the same name, and mint tokens whose `sub` was character-for-character identical to yours. Any cloud role still trusting that string would happily let them in.

The numeric IDs close it. `111111` is the owner ID, `222222` is the repository ID, and **IDs are never reused.** Delete the repo and recreate it with the same name, and it gets a fresh repo ID — so its tokens no longer match. Lose the org name to someone else, and they get a different owner ID.

So the identity isn’t “a repo called this.” It’s “*that* repo, the one that exists.” Names can be re-registered; IDs cannot be re-issued.

And underneath all of it, the property that actually matters: **the job cannot write its own**`**sub**`**.** It asks for a token and receives one already filled in.

### Your visa, which country it’s for — aud

A token minted for one service can’t be replayed at another. AWS expects `sts.amazonaws.com`. GCP expects its own workload identity provider path. Vault expects whatever you named the audience there.

## What we configure on the cloud side

Two things, and they answer different questions.

**One — register the issuer.** Once per account. “Tokens signed by this URL are readable here.” This grants nothing by itself.

```
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]   # audience allowlist
}
```

No certificate thumbprint needed anymore — AWS validates GitHub’s endpoint against its own trusted CAs.

**Two — the role’s trust policy.** “This exact job may become this role.” **This one is the security boundary.**

```
condition {
  test     = "StringEquals"
  variable = "token.actions.githubusercontent.com:sub"
  values   = ["repo:MY-ORG@111111/MY-REPO@222222:ref:refs/heads/develop"]
}
```

`StringEquals`, not `StringLike`. A wildcard like `repo:MY-ORG/*:*` hands the deploy role to every branch, tag and pull request in that repo — and a wildcard on the org hands it to every other repo too. That single character is the entire attack in more than one public write-up.

Pass the provider check but fail the trust policy, and you’re denied. The provider alone opens nothing.

## 🔐 So why is it actually safer?

Back to my original question. Four properties are doing the work:

**1. Nothing is stored, so there’s nothing to steal at rest.** The credential doesn’t exist until a job asks, and stops existing shortly after.

**2. The caller can’t name itself.** If I could keep only one property, this is it. The issuer writes the identity from real job metadata; the verifier decides whether to accept it. The asker gets no say in either.

**3. The verifier holds no secret.** AWS only has a public key. Compromise AWS’s copy and you get nothing — you can’t forge a signature with a public key. Compare a shared secret, where a leak on either side is fatal.

**4. Audience binding blocks replay.** A token for one service is useless at another.

And the framing that made it click: **big organizations trust each other without ever sharing a secret.** Nobody hands over the key to print passports. They publish what a valid signature looks like, and check at the border.

## ⚠️ Where “safer” stops

I set out to test a claim, so it’d be dishonest to stop at the good part.

- **A leaked token is still a bearer token for its lifetime.** Anyone holding it in that window can use it from anywhere. What shrinks is the window — forever, to minutes. Real win, smaller claim than “unstealable.”
- **Same for the credentials it returns.** Around an hour by default, sitting in the runner’s environment, readable by anything running in that job — including a third-party action you pulled in. Pin actions to a commit SHA, not a mutable tag.
- **It authenticates the run, not the human.** It proves the job ran on that branch of that repo. It does not prove the change was reviewed.
- **The role’s permissions are a separate question.** A perfectly pinned trust policy on a role that can do anything is a perfectly authenticated path to doing anything.

Safer, yes — and now for reasons I can name. Not magic.

## You’ve already used this

“Log in with Google” is the same three parties. Google issues a signed token about you, your browser carries it, the app verifies it against Google’s public keys. The app never sees your password. Google never calls the app.

`sub` is your Google account ID — a number, not your email, for exactly the reason above: emails get recycled, IDs don't. `aud` is the app's client ID, which is precisely why one app can't take your token and replay it at another.

Same shape, different names. Only the issuer and the `sub` format change — and the `sub` format is the only reason a trust policy has to be written per-issuer.

## TLDR;

- OIDC is a signed note about who is asking, good for minutes.
- Three parties: issuer signs with a private key, courier carries, verifier checks with the public key. Issuer and verifier never talk to each other.
- Token = passport, GitHub = the government, runner = the traveler, AWS = the officer.
- The asker can’t write its own name. The issuer writes it, the verifier decides. That’s the whole security boundary.
- Unforgeable because `sub` carries immutable owner and repo IDs — names can be recycled, IDs never are.
- The branch has no ID, so branch protection is the other half of the story.
- `aud` is the only field the caller picks, which is exactly why it must be verified.
- Before: a key that never expires, stored in three places; After: no key at all.
- Pin `sub` with `StringEquals`. Pin actions to a SHA. Scope the role.
