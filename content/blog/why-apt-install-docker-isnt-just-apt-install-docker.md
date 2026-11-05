---
title: "Why apt install docker Isn't Just apt install docker"
description: "I believe that all of us have been installing a bunch of packages into our Linux — E.g. Ubuntu, setup."
publishedAt: "2026-07-28"
updatedAt: "2026-07-28"
topic: "technical"
faq: []
coverImage: "/images/blog/why-apt-install-docker-isnt-just-apt-install-docker/cover.webp"
coverAlt: "Why apt install docker Isn't Just apt install docker"
coverWidth: 1536
coverHeight: 1024
---

I believe that all of us have been installing a bunch of packages into our Linux — E.g. Ubuntu, setup. Most of the time it’s one line: `apt install <thing>`, done.

But a few times — Docker, Terraform — I had to go to the official site and copy-paste a long block of commands first. Same OS, same apt. Why the difference?

Turns out it comes down to one thing: **where the package actually lives.**

## 🧩 A Few Terms First (Prerequisite — Understand What’s Underneath)

Before the “why,” a handful of terms that explain the moving parts. Simple version:

- **pkg (package)** — bundled software, ready to install.
- apt**(Advanced Package Tool)** — the manager. You ask for software, it finds it, sorts out dependencies, installs it. Same role `pip` plays for Python libraries, but for the OS itself.
- **.deb** — the actual package file, like a `.zip` or `.exe` but for Debian-based systems. Inside: the compiled program, config scripts, and a list of what else it needs.
- **dpkg (Debian Package tool)** — opens the `.deb` and puts everything in the right place on your system.

Basic flow:

```
apt  →  calls dpkg  →  dpkg unpacks the .deb and installs it
```

apt is the brain. dpkg is the hands.

One more layer, since the words get thrown around loosely: **kernel** is the engine, **distro** (Debian, Ubuntu, Fedora) is the whole car built around it — brand, dashboard, tools included.

```
Linux kernel → Distro (Debian/Ubuntu/Fedora) → Package manager (apt/dnf/pacman) → Packages (.deb/.rpm) → Installer (dpkg/rpm)
```

## 📋 Two Commands That Look Almost Identical, But Are Actually Different

`**apt update**` — walks through every repo you've registered and pulls down the latest package **list/index**: names, versions, dependencies. Not the software itself. Just refreshing the menu.

`**apt install <pkg>**` — looks up the package in that cached list, downloads the real `.deb` + dependencies, verifies the signature, hands it to `dpkg` to install.

`update` refreshes the menu. `install` actually orders the food. Easy to mix up because they sound like they do the same thing — they don't.

## 🏠 Why Some Packages Just Work

Ubuntu ships with a curated set of repos, maintained by **Canonical**. If a package sits in one of those, apt already knows where to find it. One command, done.

## 🐳 Why Docker (and Terraform) Don’t

Docker isn’t Canonical’s software — it’s a separate company. They want control over their own release cadence, shipping updates the moment they’re ready instead of waiting for Canonical to package each version. So they run their **own repo**, entirely outside Ubuntu’s.

apt has no idea this repo exists by default. That’s the whole reason for the long copy-paste block on their install page — it’s manually teaching apt about a repo it doesn’t already know.

Same story for **HashiCorp** (Terraform), Google Cloud SDK, Kubernetes tooling. Any vendor that wants control over its own shipping does this. Once you spot the pattern, every “official install instructions” wall of commands makes sense.

## 🔑 What That Setup Block Is Actually Doing

Using Docker as the example, the long command block does two things:

**1. Registers the new repo**, usually via a file under `/etc/apt/sources.list.d/`:

```
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

`tee` creates the file *and* prints it to your terminal at the same time — named after a water pipeline “T-junction”, one input, two outputs.

**2. Saves Docker’s public signing key** (`docker.asc`) so apt can verify packages actually came from Docker (See code blocks below). For detailed breakdown of private key signing and public key verifying concept, do reference here: [https://medium.com/@ycgoh99/dive-into-the-concept-of-json-web-token-jwt-a3980e797afc](/@ycgoh99/dive-into-the-concept-of-json-web-token-jwt-a3980e797afc)

If you ever wondered what this line does, and what’s the different between this and `sudo apt install`:

```
sudo install -m 0755 -d /etc/apt/keyrings
```

That’s really two commands bundled into one:

```
sudo mkdir -p /etc/apt/keyrings    # -p creates missing parent dirs
sudo chmod 0755 /etc/apt/keyrings  # set permissions
```

## 🛡️ The Signature Check (Why It’s Safe to Trust a Random Repo)

Now, saving the key file does nothing by itself — it’s just data sitting on disk. The actual check happens on `apt update`:

1. Docker’s repo hands over a `Release` (or `InRelease`) file listing package checksums — and this file is itself signed.
2. apt calls `**gpgv**` (a stripped-down GPG that only verifies signatures) to check: does this signature match the key we saved, at the path in `Signed-By:`?
3. **Match** → apt trusts the repo, proceeds. **Mismatch** → refuses, errors out.
4. E.g. “Signed-By: /etc/apt/keyrings/docker.asc” >> Means we can find the public key in docker.asc, used it, verify agains the signature signed with the private key.

That’s what stops a tampered or fake repo from slipping malicious packages onto your machine.

## 📦 TLDR

- Package in Ubuntu’s own repo → `apt install` just works.
- Vendor runs its own repo (Docker, Terraform, GCP SDK, etc.) → you register it first (key + repo file), hence the long official setup.
- `apt update` = refresh the package list only. `apt install` = actually fetch, verify, and install. Similar-looking, very different jobs.
- `gpgv` checks the repo's signed `Release` file against your saved key before trusting anything — this is what keeps the whole system safe even when you're pulling from third-party sources.
