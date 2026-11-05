---
title: "Learning How to Learn With AI"
description: "In 2019 I learnt my first programming: if condition, for loop, while loop, variables, functions, dictionary."
publishedAt: "2026-09-01"
updatedAt: "2026-09-01"
topic: "business"
faq: []
coverImage: "/images/blog/learning-how-to-learn-with-ai/cover.webp"
coverAlt: "Learning How to Learn With AI"
coverWidth: 1536
coverHeight: 1024
---

In 2019 I learnt my first programming: if condition, for loop, while loop, variables, functions, dictionary. Pretty simple and basic stuff.

Then came the real confusion — that’s all? Grab, TnG eWallet, the webapps we browse casually, all built on top of these simple things? Where’s the fancy stuff? I also knew there were many programming languages out there, but I didn’t really understand why back then.

Back then, that one question took days to answer.

I’d google around, ask seniors how an “app” actually works behind the scenes, prep a list of questions, book a slot with the lecturer, or just walk in and hope he’s there. Somewhere in that period I joined a hackathon without full coding knowledge and ended up with a prototype that had no backend. Got disqualified. 😂

Today the same question closes in seconds. That’s the whole shift, and I want to break down what actually changed and how I use it.

## ⚡ What actually changed: latency, not intelligence

People say AI made learning “faster”. I don’t think that’s precise. The books were always there. Stack Overflow was always there. My lecturer was always there — on Tuesday afternoon, if he wasn’t in a meeting.

What changed is the **ask-to-answer gap**. It went from days to seconds.

That sounds small until you realise curiosity has a shelf life. In 2019, by the time I got my answer on Thursday, I’d already lost the thread of why I cared on Monday. Most of my questions just died in the queue. Now nothing sits in a queue.

For someone with a lot of “stupid” questions and too much curiosity, that’s the best friend of this era.

So honestly, I’m not sure I’d still pay to fill a gap I can just ask.

But that only holds if you use it properly. Here’s how I do it.

## 🔍 Trick 1: Force citations — then open the link

The common objection is “AI can be wrong”. Sure. Humans are wrong too. The difference is I can make AI show its work on demand. (Of course only applied this when having suspicious on the answer, but I would say AI is pretty accurate on the deterministic stuff with absolute answers)

```
Explain X. For every factual claim, cite the specific doc, 
RFC or source file. If you're not sure, say "unverified" 
instead of guessing.
```

The `say "unverified" instead of guessing` part matters more than the citation part. It gives the model a way out that isn't fabrication.

Now the caveat nobody says loudly enough: **models fabricate citations.** Real-looking URLs, plausible section names, papers that don’t exist. This is the failure mode that got lawyers sanctioned in real courtrooms for filing AI-written briefs with invented cases.

So the rule I follow is simple: **open the link, don’t trust the link.**

Think of AI here as a research assistant, not a judge. A good assistant hands you the source. A bad one hands you a summary and tells you to relax. You still read the source.

And yes — some things are just easier to consult a human expert on. That hasn’t gone away.

## 📚 Trick 2: It answers, it doesn’t audit

The second objection is “AI can’t actively teach you”.

I disagree with the surface of it. Feed it the textbook chapters and it teaches fine — patiently, at whatever depth you want, anytime.

But there’s a real gap underneath, and it’s this: **AI can’t tell you what you don’t know you don’t know.** No curriculum. No blind-spot detection. It answers, it doesn’t audit.

It’s like a lecturer whose door is always open, but who never tells you which chapter you skipped.

So I make it audit, explicitly:

```
Here's the chapter. Based on this material, list 5 things a 
learner would commonly misunderstand or skip. Then quiz me 
on the ones I haven't asked you about.
```

And when I’m mid-way through something:

```
Based on this conversation, what important questions am I 
NOT asking that I should be?
```

That second prompt has caught more of my gaps than any amount of “explain it again”.

## 🔁 Trick 3: The re-state and break loop

This is my actual learning method, and it’s the part I’d keep if I had to throw everything else away.

1. **Ask.** Get the answer.
2. **Get the big picture.** Not the syntax — the shape of the thing and why it exists.
3. **Re-state it in my own words.** Out loud, in the chat, badly if necessary.
4. **Ask it to break me.**
5. **Loop.**

The prompt for step 4 looks like this:

```
My understanding of this is ABC. Based on that, give me a 
case where my understanding breaks. Don't confirm me — 
attack the weakest part.
```

The reason step 3 matters: reading a fluent explanation feels like understanding. It isn’t. The moment you have to produce the explanation yourself, you find out exactly where the fog is. That’s the whole trick — it’s the old Feynman technique, just with a sparring partner who’s always awake.

The reason step 4 matters: **AI is agreeable by default.** Ask “am I right?” and you’ll often get “yes, exactly!” for a half-right answer. That’s the most dangerous failure mode in AI learning, because it feels like progress. So I never ask for a verdict. I ask it to break the answer. If it can’t break it anymore, I’ve probably got it.

Break it, don’t bless it. Ask AI to challenge you enough.

## 🪜 Trick 4: The escalation ladder

My order of operations changed completely. It used to be: ask lecturer, ask senior, google. Now:

1. **Ask AI.** Fast, cheap, no social cost, no “is this a stupid question” tax.
2. **Not sure? Cross-check with another model.** Different model, different training mix, sometimes catches it. But careful — models can share the same blind spots, so agreement is not proof.
3. **Still not sure? Go to the primary source.** Official docs. The actual source code. Or just run it and watch what happens. This is ground truth and it beats every opinion, human or machine.
4. **Still can’t wrap my head around it? Only then, a human expert.**

The point of the ladder isn’t to avoid people. It’s that by the time I reach a senior, I’ve burned through the easy 90% myself and I’m bringing a sharp question instead of a vague one. That’s a better use of their time and mine.

## ⏰ The 1-hour teacher

Assuming someone is motivated enough, I don’t think we need an 8-hour teacher anymore. Maybe 1 hour a day with a teacher, and the rest self-learning.

The shift isn’t that teachers got worse. It’s that teacher time went from **scheduled** to **on-demand**. Scheduled time gets wasted on questions I could’ve answered myself. On-demand time gets spent on the ones I genuinely couldn’t.

## 😐 The honest downside

It’s boring alone. It’s demotivating when there’s no friend going through the same thing, no one to complain to at 1am, no one to be stuck with.

That part hasn’t been solved and I don’t think a model solves it.

So I vote hybrid — AI for speed, people for the parts that need people. And in the meantime, just dive deep into the field or the stuff you actually want. Motivation beats method.

## 👶 I envy juniors

Genuinely. They’ve got the best learning resources in history, arriving at the exact age where they have the most time and the most energy to use them.

If I had this in 2019, that hackathon prototype would’ve had a backend. :)

## TLDR;

- **What changed is latency, not intelligence.** The ask-to-answer gap went from days to seconds, and that keeps curiosity alive long enough to matter.
- **Force citations, then open the link.** Models fabricate real-looking sources. Verify, don’t trust.
- **It answers, it doesn’t audit.** Ask it directly what you’re not asking — that’s how you find blind spots.
- **Re-state your understanding, then ask it to break your answer.** Never ask “am I right?” — AI is agreeable and will bless a half-right answer.
- **Escalate: AI → second model → primary source → human expert.** Reach a senior with a sharp question, not a vague one.
- **1 hour of teacher, rest self-learning.** Teacher time moved from scheduled to on-demand.
- **It’s lonely.** Go hybrid. That part still needs humans.

The way we learn changed significantly. I’m not sharing this to sell anxiety — it’s just a truth all of us are going to embrace.

Want to dive deep into “how to learn to learn”? Try out the method above, ask AI today.
