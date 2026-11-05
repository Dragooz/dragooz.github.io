---
title: "Programming: What’s “Enum”?"
description: "Imagine you’re organizing your child’s art supplies. You have three crayons: red, blue, and yellow."
publishedAt: "2025-01-07"
updatedAt: "2025-01-07"
topic: "technical"
faq: []
---

Imagine you’re organizing your child’s art supplies. You have three crayons: red, blue, and yellow. Instead of calling them “thing 1,” “thing 2,” and “thing 3,” you name them “RedCrayon,” “BlueCrayon,” and “YellowCrayon.” Clear names eliminate confusion — so you’ll never mix up colors again!!

**That’s exactly what enums (short for enumerations) do in programming**. They assign meaningful names to sets of related values, making code more readable, reliable, and maintainable. Ready to dive in? Let’s explore why enums are such a game-changer.

## The Basics: What Are Enums?

Enums are a **data type used to define a fixed set of named values**. Think of them as custom labels for related constants. Here’s a simple example:

```
from enum import Enum

class Breakfast(Enum):
    PANCAKES = "pancakes"
    WAFFLES = "waffles"
    CEREAL = "cereal"

print(f"I want to eat {Breakfast.PANCAKES.value}!") # Do this
print(f"I want to eat pancake!") # Instead of this, and this is wrong
```

Instead of hardcoding strings like “I want to eat pancakes,” you use `Breakfast.PANCAKES`. Why? Because typos like “pancake” (missing an "s") can break your code. Enums enforce consistency and eliminate these mistakes.

## Why Use Enums? Benefits That Matter

Enums shine when it comes to **type safety, readability, and maintainability.**

## 1. Type Safety

Enums restrict your values to predefined options. For example:

```
class Direction(Enum):
    NORTH = 1
    EAST = 2
    SOUTH = 3
    WEST = 4

# Safe
current_direction = Direction.NORTH

# Unsafe without Enum
current_direction = 5  # What does 5 even mean?
```

By using enums, you avoid invalid states like `Direction(5)`, ensuring your code remains predictable and bug-free.

## 2. Readability

Compare these two snippets:

```
# Without Enums
if direction == 1:
    print("Heading North")

# With Enums
if direction == Direction.NORTH:
    print("Heading North")
```

Enums replace ambiguous magic numbers (“1”) with self-explanatory names (`Direction.NORTH`)

## The Pitfalls of Skipping Enums

Skipping enums might seem faster, but it leads to several risks:

## 1. Lack of Type Safety

Without enums, your code can accept invalid values, creating hard-to-find bugs:

```
# No error, but what does this mean?
# Without comment, it means nothing; 
# With comment, it's redundant;
current_direction = Direction(99) 
```

## 2. No Built-in Iteration

Enums let you iterate over all valid options effortlessly:

```
# With Direction Enum declared
for direction in Direction:
    print(direction)

# Without Direction Enum declared
for direction in ["north", "south", etc..]:
```

Without enums, you’d need to manually list every value, increasing the risk of omissions.

## 3. Risk of Overwriting

Without enums, constants can be overwritten accidentally:

```

# With Enum
Direction.North = 10 # Will raise error

# Without Enum
Direction.NORTH = 10  # Allowed without Enum, dangerous in practice!
```

Enums safeguard against such mishaps.

## 4. No Automatic Values

Python’s `Enum` class offers the `auto()` feature to assign values automatically:

```
from enum import Enum, auto

class Direction(Enum):
    NORTH = auto() # 1
    EAST = auto() # 2
    SOUTH = auto() # 3
    WEST = auto() # 4
print(Direction.NORTH.value)  # Outputs 1
```

This convenience disappears if you skip enums.

## 5. No Duplicate Prevention

Enums prevent duplicate values:

```
class Colors(Enum):
    RED = 1
    BLUE = 2
    RED = 3  # Error: Duplicate values not allowed (RED is declared already)
```

Without enums, these errors can sneak into your codebase.

## Enums in Real Life: The Bigger Picture

Enums go beyond breakfast menus and directions — they’re a **best practice in real-world software**. Use cases include:

- **API Responses:** Define status codes like `HTTPStatus.OK` or `HTTPStatus.NOT_FOUND`.
- **Game Development:** Manage states like `GameState.START`, `GameState.PAUSED`, or `GameState.OVER`.
- **Configurations:** Represent user roles like `UserRole.ADMIN` or `UserRole.VISITOR`.

By integrating enums, you make your code more robust, understandable, and future-proof.

## The Final Takeaway

Enums might seem like a small detail, but they have a massive impact on code quality. They bring clarity, prevent errors, and make collaboration easier. Think of them as the labels on your crayons — simple yet essential for staying organized.

So, next time you’re tempted to hardcode strings or numbers, pause and ask: **Could an enum make this better?**

Mastering enums is a step toward writing professional, polished code. Start using them today, and watch your projects transform!
