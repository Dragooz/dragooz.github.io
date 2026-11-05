---
# TODO: DRAFT. Every [FILL: ...] below is a fact only YiChong knows. Replace or delete each one.
# Do not publish with placeholders in. The 80% figure and the shape of the problem are real.
title: "How I cut 80% of manual order entry for a Malaysian F&B business without building an app"
description: "Orders came in over WhatsApp and phone and staff retyped every one by hand each night. Here is what I changed, what it cost, and what moved."
publishedAt: "2026-11-03"
updatedAt: "2026-11-05"
topic: "business"
draft: true
faq:
  - question: "Do I need to build an app to automate WhatsApp orders?"
    answer: "Usually not. In this case the staff kept using WhatsApp exactly as before. The automation sat behind it and did the retyping. An app your staff must learn is the most common reason an automation project fails."
  - question: "How much does something like this cost in Malaysia?"
    answer: "A fix of this size is capped at two weeks of my time, at a fixed price. Most fixes are RM2,000–6,000. Founding clients pay RM1,000–3,000, after 30 days, and only if the number we agreed on moved."
  - question: "What if my orders also come by phone, not only WhatsApp?"
    answer: "Phone orders still need a human to take them. The fix is to make the one place that human types into feed everything else, so the order is typed once, not three times."
  - question: "How do I know what to automate first?"
    answer: "Count the tasks someone does more than ten times a week by hand. The one that touches money or customers goes first. I do this count for you in a free half-day diagnosis."
---

**Short answer:** the business was retyping every WhatsApp and phone order into a spreadsheet by hand, every night. I put a small automation behind the WhatsApp number they already used, so orders landed in the system without anyone typing them twice. Manual order entry dropped by 80%. No new app, no training day, and the staff kept working the way they already did.

## What the business looked like before

[FILL: type of F&B business, number of outlets, rough orders per day. Keep the client anonymous.]

Orders arrived three ways: WhatsApp messages, phone calls, and walk-ins. Each one got written down, then at closing time someone sat down and typed the day's orders into [FILL: Excel / Google Sheets / the POS back office] for stock and accounts.

That nightly session took [FILL: how long, e.g. two to three hours] and the owner [FILL: what the owner's involvement was, e.g. checked it personally at 11pm because errors had cost money before].

The costs were not the hours. They were:

- Orders typed wrong, which meant [FILL: a concrete example, e.g. wrong quantity delivered, a refund, an argument with a regular customer].
- Stock counts that were always a day behind, so [FILL: e.g. items ran out mid-service or were over-ordered].
- The owner was the last check on everything, so the business could not run a night without them.

## Why they did not just buy an app

They had tried. [FILL: what they tried before, e.g. a POS ordering add-on or an ordering app, and why staff stopped using it.]

The pattern is common. An app asks the staff to change how they work during the busiest hours of the day. The staff go back to WhatsApp within a week because the customers are on WhatsApp. The app then becomes a second place to type, which is worse than before.

So the rule for this fix was: **nobody on the floor changes what they do.**

## What I actually built

[FILL: the mechanism in plain words. For example: incoming WhatsApp messages on the business number were read by a small script, the order lines were pulled out, and each order was written into the sheet or POS with a timestamp and the customer's number. Anything the script could not read confidently was flagged for a human instead of guessed.]

Three things mattered more than the code:

1. **It had to fail safe.** When the automation was unsure, it put the message in a "check me" list rather than entering a wrong order. A wrong order costs more than a delayed one.
2. **The owner could see it working.** [FILL: how, e.g. a daily summary message of what was entered and what was flagged.]
3. **Phone orders got one entry point.** The person taking the call typed it once into [FILL: where], and the same automation carried it everywhere else.

Total build time: [FILL: e.g. nine working days across two weeks]. Tools: [FILL: e.g. Python, Google Sheets, the WhatsApp Business API or a mailbox integration]. Nothing the business had to buy a licence for beyond [FILL: any recurring cost, or "nothing"].

## What moved

| | Before | After |
|---|---|---|
| Manual order entry | [FILL: e.g. 2.5 hours a night] | [FILL: e.g. 30 minutes checking the flagged list] |
| Orders typed wrong | [FILL: e.g. a few a week] | [FILL] |
| Stock figures | A day behind | Same day |
| Owner needed at closing | Every night | [FILL] |

The headline number is 80% less manual order work. The number the owner cared about was [FILL: e.g. "I have not checked the sheet at 11pm since"].

## What I would tell another owner in the same spot

- Count the retyping first. Anything a person types into a second place more than ten times a week is the candidate.
- Do not start with the app. Start with the place the orders already arrive and make that feed everything else.
- Insist on a "check me" list. An automation that guesses will eventually guess wrong on a big order.
- Measure one number before and after, and agree on it before any work starts. Here it was hours of entry per night.

## About this case

The client asked to stay anonymous, which is normal for a small business and I respect it. The numbers above are theirs. If you want to talk to them before working with me, [FILL: whether a reference call is possible, or delete this sentence].
