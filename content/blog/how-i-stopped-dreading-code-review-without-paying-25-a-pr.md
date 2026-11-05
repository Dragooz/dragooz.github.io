---
title: "How I Stopped Dreading Code Review (Without Paying $25 a PR)"
description: "Code review eats most of my day."
publishedAt: "2026-06-23"
updatedAt: "2026-06-23"
topic: "technical"
faq: []
---

Code review eats most of my day. I’d bet a lot of engineers are in the same boat right now — the PR queue grows faster than I can clear it, and the reviewing itself is the slow part.

For a while my plan was simple: hand it to AI, move on with my life. What actually happened was more interesting, and a lot cheaper than where I started.

## I thought I wanted AI to do my reviews. I was wrong.

Here’s the thing that changed my mind: AI review can be wrong, and a wrong review that slips through doesn’t just cost you a comment — it can hurt your reputation as a code reviewer, worst case, cause fire in production. Once you’ve felt that risk, “let the AI handle it” stops sounding clever.

So I stopped treating it as a replacement and started treating it as a helper. A fast second pair of eyes that speeds up my *understanding* of a PR — what it does, how it’s supposed to behave, what it might have missed. It levels me up, and it doesn’t review for me.

Because someone still has to make the human calls:

> Can this be reused instead of rebuilt?
> Does something like this already exist in the repo?
> Can the whole thing just be simpler?

That’s the real engineering judgment, and it’s exactly the part that takes time. My goal was never to remove it. Just to reach it faster, with the obvious stuff already surfaced. Big difference, and it changed everything about how I set this up.

## First stop: GitHub Copilot

My personal experience so far: Copilot is good at catching the small technical misses — the off-by-one, the missing null check, the obvious smell. That genuinely helped on day one.

But it kept reviewing the diff in a vacuum. Clean opinions on the lines that changed, zero feel for *why* the PR existed or how it tied into the rest of the repo. It was reading sentences without ever reading the book.

## Second stop: @claude on the PR

So I went bigger. With the Claude GitHub app, you drop `@claude` as a comment on the PR and it kicks off a full review run.

It chewed on it for ~15 minutes and, honestly, the result was great — real context, comments that actually made sense. I was impressed.

Then I saw the bill. That run cost roughly **$15–25 per review** in API usage — big diff, heavy model, long run. For a one-off deep review, totally worth it. As something I’d run on every PR, every day? No chance. That’s a SaaS subscription per pull request.

## What’s actually working now

Here’s the thing that clicked: the expensive `@claude` run was great *because it had context*. The blueprint and the keys, not just the diff. So instead of renting that context on a hosted run every time, I give the same context to Claude Code running locally.

Two connections do the heavy lifting:

- `**gh**`**(GitHub CLI)** → so the agent can read the PR, the diff, and the current files.
- **A project management MCP** (Linear, Jira, ClickUp, Asana, monday — whatever your team runs) → so the agent can read the ticket description and comments, which is where the business “why” actually lives.

Then I wrote a skill so it never reviews blind — it walks the agent through a fixed sequence every time:

- `gh pr view` = What's this PR about? Where's the ticket link?
- `gh pr diff` = What actually changed?

Then based on these 2 base functions, derived (Your AI will know how to do the command):

- `pr-head-sha` = What’s the exact current snapshot? 
`gh pr view <URL> — json commits — jq ‘.commits[-1].oid`
- `file-at-head` — What does this file fully look like right now?
`gh api “repos/<org>/<repo>/contents/<path>?ref=<head_sha>” — jq ‘.content’ | base64 -d`

Roughly, the GitHub side maps to:

```
gh pr view <num> --json title,body,url
gh pr diff <num>
gh pr view <num> --json headRefOid -q .headRefOid   # exact snapshot
git show <sha>:path/to/file                          # full file at that snapshot
```

And similar concept applies to project management MCP there.

The skill is what makes this repeatable instead of me re-explaining the workflow every single time. 
[https://github.com/Dragooz/Simple-AI-Agent-Skills](https://github.com/Dragooz/Simple-AI-Agent-Skills)

## The analogy: a building inspector

If you’re not deep in the tooling, here’s the picture I keep in my head.

Code review is like hiring an inspector to check a renovation.

- **Copilot** knows the building code by heart but never saw your blueprint. Technically sharp, no idea what you were trying to build.
- **Full**`**@claude**` reads the blueprint *and* walks the whole house — brilliant, but bills by the hour.
- **This setup** hands the inspector the blueprint (the ticket) *and* the keys to walk part OR whole house (the repo via `gh`) — but **read-only**. They could choose to see part of the things, or everything. Managable, fast, and cheap.

## Three honest caveats (because hype helps no one)

I’ve been burned enough to be upfront about the edges:

**1. It’s built for simple-to-moderate PRs.** When something is genuinely gnarly — a hairy migration, a cross-service refactor, anything with real blast radius — I still fall back to a careful human read or a full comprehensive `@claude` review. There's no shortcut on the hard ones, and pretending otherwise is how you ship a mess.

**2. It does NOT replace the reviewer.** This is the part I want to be loud about. The tool front-loads the obvious and the critical stuff so it’s already captured by the time I open the PR. My job then isn’t to review cold from scratch — it’s to double-check everything’s sane and make the calls that need judgment. It makes me a faster, sharper reviewer. It doesn’t make me an absent one.

**3. Know the hit rate.** Rough split from actually running it: about **80%** of the feedback is useful and on-point, **~10%** is nonsense I throw away, and **~10%** is stuff I’m not sure about and have to verify myself. That last 20% is exactly where an outage hides if you switch your brain off and rubber-stamp the AI’s output. Which is why I treat it as a tool to level up my own judgment — not a colleague whose review I trust blindly. The 80% buys me speed; the 20% is why I’m still the reviewer.

## The config tip that makes it fast

If the agent stops to ask permission on every read, the whole speed gain dies. Fix it in your Claude Code settings.

Global settings live at `~/.claude/settings.json`. Two things worth knowing:

1. Built-in read-only bash commands (`ls`, `cat`, `grep`, `head`, `tail`, read-only `git`) already run **without** a prompt in every mode — no need to list those.
2. For your `gh` review commands, add explicit allow rules so they don't stall:

```
{
  "permissions": {
    "allow": [
      "Bash(gh pr view:*)",
      "Bash(gh pr diff:*)",
      "Bash(git show:*)"
    ]
  }
}
```

Newer Claude Code also has an “auto mode” that runs actions through a classifier and auto-approves stuff. But becareful on it, as it automate does destructive request like write, update and delete too.

The principle: **reviewing is all reads, so let the reads fly.** Nothing here writes to anything, so there’s no reason to make it ask.

## When this fits — and when it doesn’t

Reach for it when:

- You review a lot of PRs and want context without paying per run.
- Your “why” lives in a ticket tool the agent can reach.

Skip it when:

- It’s a tiny PR — your own glance is faster than any setup.
- It’s a hard one. Keep the human (or the full comprehensive review) in the loop. The AI does the legwork; you keep the judgment.

## Grab the setup

Everything you need to run this yourself, in one place:

- **The skill** (drives the review sequence): [https://github.com/Dragooz/Simple-AI-Agent-Skills](https://github.com/Dragooz/Simple-AI-Agent-Skills)
- **Github Auth** (gh)
- **The config** — in `~/.claude/settings.json`, so read-only ops never stall the run:

```
{
  "permissions": {
    "allow": [
      "Bash(gh pr view:*)",
      "Bash(gh pr diff:*)",
      "Bash(git show:*)"
    ]
  }
}
```

- **The context source** — point a project management MCP (Linear, Jira, ClickUp, Asana, monday — your pick) at the ticket so the agent reads the description + comments.

Copy it, put it in, and you’re running.

## TLDR;

- AI review can be wrong, and a wrong review can cause an outage — so treat it as a helper that speeds up your understanding, not a replacement.
- Hit rate is roughly 80% useful / 10% nonsense / 10% verify-yourself. Use it to level up your own judgment, not as a colleague you trust blindly.
- The slow part of review — reuse, dedup, simplify — is real engineering you shouldn’t fully hand off.
- GitHub Copilot catches technical misses but reviews the diff in a vacuum, missing business context and repo-wide linkage.
- A full `@claude` PR run nails the context but costs ~$15–25 per review — not sustainable daily.
- The fix: run Claude Code locally with `gh` + a project management MCP (Jira, Linear, ClickUp, Asana — your pick) for context, and a skill to drive the sequence. Same context, fraction of the cost.
- It’s for simple-to-moderate PRs and front-loads the obvious stuff — the reviewer still makes the final call. Make read-only ops auto-approve in `~/.claude/settings.json` so the run never stalls.

I’m Yi Chong — a fullstack engineer who kills repetition. If your team does the same manual thing twice a week when a script could do it once, that’s exactly the kind of problem I like.

👉 [Tell me what’s eating your team’s hours](http://yichonggoh.com/) — I’ll reply with how I’d automate it. No pitch, just the approach.
