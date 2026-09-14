# ⚡ The Boys Multiverse — BigFatHondu & Gang

An interactive, responsive parody web application dedicated to the legendary friend trio: **Sidhant "BigFatHondu"**, **Aswini "Assini" Sahoo**, and **Soumendra "Lawyerpady" Padhy**.

Featuring tailored soundboards, hilarious roasts, arcade mini-games, and a **Dual-Engine Audio Synthesizer** (ElevenLabs HD streaming with automatic browser speech synthesis fallback).

---

## 🌟 Features

### 🍔 1. BigFatHondu (Sidhant)
- **The Chinless Enigma**: Photo archives, aerodynamic chin analysis, and time-travel memes.
- **Feed BigFatHondu!**: 30-second arcade minigame to catch fast food and dodge salads.
- **Aura Survey**: Community poll to rate Hondu's appetite superpowers.
- **Emergency Siren**: High-gravity visual alarms.

### 🪙 2. Aswiniverse (Aswini Sahoo)
- **The ₹0.01 Savings God**: Audits of 1-paisa coins, UPI splits, and napkin hoarding archives.
- **Catch the 1-Paisa Coin**: Arcade game dodging auto-rickshaws and restaurant bill-splitting traps.
- **Ultrasonic Decibel Meter**: Interactive acoustic simulation of Aswini's vocal volume.

### ⚖️ 3. Padhyverse (Soumendra Padhy)
- **Street Counsel & Section 420**: Hilarious legal excuses and client milking telemetry.
- **The Tareekh-O-Meter**: Adjournment simulator to postpone hearings indefinitely for regular income.
- **Courtroom Gavel & Objection SFX**: Authentic legal drama synthesizer.

---

## 🎙️ Dual-Engine Voice Architecture

The application is built to work anywhere with zero downtime:
1. **Primary Engine (ElevenLabs Streaming)**: When running locally or on a Node server with an `ELEVENLABS_API_KEY`, speech streams high-fidelity audio via `/api/tts`.
2. **Automatic Browser Fallback**: If hosted statically (such as **GitHub Pages**), or if ElevenLabs is unconfigured or rate-limited, the system seamlessly falls back to the browser's native `SpeechSynthesis` engine with sanitized punctuation and character-specific pitch/rate.

---

## 📁 Clean Multiverse Structure

```
BigFatHondu/
├── index.html              # Main Boys Multiverse Portal
├── server.js               # Express + ElevenLabs Streaming API
├── .env.example            # Environment template for keys
├── .gitignore              # Protects secrets & node_modules
├── shared/                 # Universal assets
│   ├── css/                # Shared stylesheets & landing themes
│   └── js/                 # Dual-engine audio synthesizer & toast UI
└── friends/                # Self-contained modules per person
    ├── hondu/              # BigFatHondu page, script, css & images
    ├── aswini/             # Aswini Sahoo page, script, css & images
    └── padhy/              # Soumendra Padhy page, script, css & images
```

---

## 🚀 Quick Start (Local)

1. Clone the repository:
   ```bash
   git clone https://github.com/pradhansubhasish16-sudo/BigFatHondu.git
   cd BigFatHondu
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up ElevenLabs HD Voice:
   ```bash
   cp .env.example .env
   # Add your ELEVENLABS_API_KEY inside .env
   ```

4. Start the server:
   ```bash
   npm start
   # or: node server.js
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying Live on GitHub Pages

This project is 100% compatible with **GitHub Pages**:
1. Push your repository to GitHub.
2. Go to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Branch**, choose `main` and `/ (root)`.
4. Click **Save**. The website will be live at:
   `https://pradhansubhasish16-sudo.github.io/BigFatHondu/`
