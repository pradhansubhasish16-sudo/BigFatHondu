# 📜 The Boys Multiverse — Project Context & Handover

- **Snapshot Timestamp:** Tuesday, September 15, 2026 • 03:23:27 AM IST (UTC+05:30)
- **Date Stamp:** `2026-09-15`
- **Session ID:** `3f90de4c-706e-4422-9b19-f6b17e6a27b6`
- **Repository:** `pradhansubhasish16-sudo/BigFatHondu`
- **Active Branch:** `main`

> **How to use this file:** Whenever starting a new conversation with an AI assistant or continuing development, prompt the assistant with:  
> *"Please read `SESSION_CONTEXT_2026-09-15_03-23-AM.md` (or `SESSION_CONTEXT.md`) to get full context on the codebase, architecture, and current state."*

---

## 🎯 1. Project Overview & Characters

A parody web portal featuring the three friends, their personalities, interactive soundboards, and custom arcade minigames:

### 🍔 Sidhant "BigFatHondu" (`friends/hondu/`)
- **Personality**: Heavy eater, food enthusiast, zero-chin aerodynamic geometry, 2019 lightweight vs. 2025 final boss.
- **Key Features**:
  - Multiverse Photo Archive (No chin, stylish B&W shoot, beach Puma hoodie, 2019 bargain kurta).
  - Infinite Roast Generator with text-to-speech.
  - Arcade Game: *"Feed BigFatHondu!"* (Catch fast food to expand head, dodge salads).
  - Chin status tiers from "404 Not Found" to "Gravitational Singularity".
  - Community Aura Poll & Emergency Siren Prank.

### 🪙 Aswini "Assini" Sahoo (`friends/aswini/`)
- **Personality**: The ₹0.01 / 1-Paisa Savings God, extreme penny pincher, splits 33-paise chai, hoards napkins/ketchup, 145 dB loud voice.
- **Key Features**:
  - WhatsApp screenshot expense ledger roasts.
  - Interactive Ultrasonic Decibel Meter (from whisper up to glass-shattering 220 dB).
  - Arcade Game: *"Catch the 1-Paisa Coin!"* (Collect coins, dodge auto-rickshaws and equal bill split traps).
  - Soundboard (Coin chime, cha-ching, loud megaphone).

### ⚖️ Soumendra Padhy aka "Lawyerpady" (`friends/padhy/`)
- **Personality**: Section 420 Street Counsel, constantly looks for roadside disputes, deliberately delays court hearings (*"Tareekh pe tareekh"*) to milk clients ₹500 per adjournment.
- **Key Features**:
  - The Tareekh-O-Meter (40 ridiculous excuses for postponing hearings).
  - Arcade Game: *"The Tareekh Rush!"* (Catch postponement files; win triggers the *"Next client is victim of Padhy"* warning; lose triggers judge scolding).
  - Soundboard (Gavel strike, legal objection roar).

---

## 📁 2. File & Directory Structure

Cleanly separated modular structure so each friend is an independent module:

```
BigFatHondu/
├── index.html              # Main Boys Multiverse landing portal
├── server.js               # Express server + ElevenLabs TTS streaming API
├── .env                    # Local secrets (ELEVENLABS_API_KEY) - IGNORED IN GIT
├── .env.example            # Safe template for environment variables
├── .gitignore              # Protects .env, node_modules, logs, OS metadata
├── README.md               # GitHub repository documentation
├── SESSION_CONTEXT_2026-09-15_03-23-AM.md # Timestamped handover archive
├── SESSION_CONTEXT.md      # Latest handover context file
├── package.json            # Express & dotenv dependencies
├── shared/                 # Universal shared assets
│   ├── css/
│   │   ├── shared.css      # Core styles, glassmorphism, buttons, animations
│   │   └── landing.css     # Main portal styles & multiverse matrix
│   └── js/
│       ├── audio.js        # Dual-engine audio synthesizer & toast UI
│       └── landing.js      # Multiverse quote generator & logic
└── friends/                # Self-contained modules per person
    ├── hondu/              # Sidhant: index.html, script.js, style.css, images/
    ├── aswini/             # Aswini: index.html, script.js, style.css, images/
    └── padhy/              # Padhy: index.html, script.js, style.css, images/
```

> **Path Rule**: All relative paths inside `friends/*/index.html` use `../../index.html` for root and `../../shared/` for assets. This ensures the app works identically on a local Node server, raw filesystem, or GitHub Pages.

---

## 🎙️ 3. Audio & Voice Architecture (Dual-Engine)

The audio engine in [`shared/js/audio.js`](file:///D:/IT/Website/BigFatHondu/shared/js/audio.js) is built with **zero downtime**:

### Engine A: ElevenLabs HD Streaming (`/api/tts`)
- Used when `server.js` is running and an `ELEVENLABS_API_KEY` is present in `.env`.
- Pipes `audio/mpeg` binary directly to the browser via `fetch` $\rightarrow$ `URL.createObjectURL(blob)` $\rightarrow$ `new Audio()`.
- Prevents overlapping voice lines using an `AbortController` and `stopCurrentVoice()`.

### ⚠️ ElevenLabs Free Tier & 402 Library Voice Rule
- **The Quirk**: ElevenLabs returns `402: Free users cannot use library voices via the API` if you use a voice ID from the Community Library.
- **The Solution in `server.js`**:
  If the voice ID triggers a `402` or `404`, the server **automatically fails over** to character-matched premade ElevenLabs voices that work on all accounts:
  - **Hondu**: `pNInz6obpgDQGcFmaJgB` (Adam - Deep, baritone, relaxed)
  - **Padhy**: `JBFqnCBsd6RMkjVDRZzb` (George - Articulate, courtroom counsel)
  - **Aswini**: `ErXwobaYiN019PkySvjV` (Antoni - Energetic, animated)
- **User Voice Clones**: If the user creates an **Instant Voice Clone** in their own VoiceLab, that clone ID will work directly without triggering 402.

### Engine B: Browser Speech Synthesis Fallback (`window.speechSynthesis`)
- Automatically activates if:
  - The user deploys to **GitHub Pages** (where there is no Node backend).
  - The backend server is offline or rate-limited (HTTP 429).
  - The API key is not configured.
- **Punctuation & Pronunciation Normalization** (`cleanTextForSpeech`):
  - Strips ellipses `...`, hyphens, asterisks, and quotes to prevent Windows/Chrome voices from literally pronouncing *"dot dot dot"* or *"alpabiram"*.
  - Converts currency (`₹10` $\rightarrow$ `"10 rupees"`) and distances (`14km` $\rightarrow$ `"14 kilometers"`).
  - Sets custom pitch & rate per character.

### Web Audio Oscillators
- Custom zero-dependency sound effects: `playHonk()`, `playNom()`, `playBoing()`, `playCreak()`, `playBuzzer()`, `playTaDa()`, `playCoin()`, `playChaChing()`, `playMegaphone()`, `playGavel()`, `playMicClick()`.
- Autoplay unlock listeners attached to initial user touch/click.

---

## 🔒 4. Git & Security Status

- [`.gitignore`](file:///D:/IT/Website/BigFatHondu/.gitignore) is strictly configured:
  - `.env` is ignored to ensure the ElevenLabs API key is never committed.
  - `node_modules/` is ignored.
  - `.env.example` is committed as a reference template.
- **Remote Origin**: `https://github.com/pradhansubhasish16-sudo/BigFatHondu.git`
- **GitHub Pages Support**: Compatible out of the box with GitHub Pages (root directory deployment on `main` branch).

---

## 💻 5. Useful Commands

```powershell
# Start local Node server
node server.js

# Check server status / configuration
curl http://localhost:3000/api/status

# Test ElevenLabs TTS stream
node -e "fetch('http://localhost:3000/api/tts', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({text:'Hello', character:'hondu'})}).then(r=>console.log(r.status, r.headers.get('content-type')))"

# Stage and push to Git
git add .
git commit -m "Update project"
git push origin main
```

---

## 📌 6. Current State Snapshot (As of 2026-09-15 03:23:27 IST)

- **Server Status**: Stopped cleanly; port `3000` released and idle.
- **Audio Engine**: Verified functional (ElevenLabs HD streaming with live 200 responses + Browser Voice fallback).
- **Filesystem**: Modular, cleanly structured, git-ready with `.gitignore` and `README.md`.
- **Syntax**: 100% verified with `node -c`.
