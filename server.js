require('dotenv').config();
const express = require('express');
const path = require('path');
const { Readable } = require('stream');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// Middleware
app.use(express.json());

// Character-specific premade high-fidelity voices (Supported on ElevenLabs free tier API)
const CHARACTER_DEFAULTS = {
  hondu: 'pNInz6obpgDQGcFmaJgB', // Adam (Deep, resonant)
  padhy: 'JBFqnCBsd6RMkjVDRZzb', // George (Sharp, courtroom authority)
  aswini: 'ErXwobaYiN019PkySvjV' // Antoni (Energetic, loud)
};

// Dynamic config getter to auto-reload .env changes without server restarts
function getEnvConfig() {
  require('dotenv').config({ override: true });
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const isConfigured = !!(apiKey && apiKey !== 'your_elevenlabs_api_key_here' && apiKey.trim() !== '');
  return {
    apiKey: isConfigured ? apiKey.trim() : null,
    voiceMap: {
      hondu: (process.env.HONDU_VOICE_ID && process.env.HONDU_VOICE_ID.trim()) || CHARACTER_DEFAULTS.hondu,
      padhy: (process.env.PADHY_VOICE_ID && process.env.PADHY_VOICE_ID.trim()) || CHARACTER_DEFAULTS.padhy,
      aswini: (process.env.ASWINI_VOICE_ID && process.env.ASWINI_VOICE_ID.trim()) || CHARACTER_DEFAULTS.aswini
    }
  };
}

// Check configuration status
app.get('/api/status', (req, res) => {
  const { apiKey, voiceMap } = getEnvConfig();
  res.json({
    status: 'ok',
    elevenlabsConfigured: !!apiKey,
    activeVoices: voiceMap,
    defaults: CHARACTER_DEFAULTS
  });
});

// 🎙️ ElevenLabs Streaming Text-to-Speech Endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceId, character } = req.body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text parameter is required and cannot be empty.' });
    }

    const { apiKey, voiceMap } = getEnvConfig();
    if (!apiKey) {
      return res.status(500).json({
        error: 'ELEVENLABS_API_KEY is not configured in .env.',
        hint: 'Add your ElevenLabs API key in .env file to enable high-fidelity voice cloning.'
      });
    }

    const selectedChar = (character || 'hondu').toLowerCase();
    const fallbackVoiceId = CHARACTER_DEFAULTS[selectedChar] || CHARACTER_DEFAULTS.hondu;
    const targetVoiceId = voiceId || voiceMap[selectedChar] || fallbackVoiceId;

    async function requestElevenLabs(vId) {
      const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(vId)}/stream`;
      return fetch(elevenLabsUrl, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.40,
            similarity_boost: 0.85,
            style: 0.15,
            use_speaker_boost: true
          }
        })
      });
    }

    let response = await requestElevenLabs(targetVoiceId);
    let usedFallback = false;
    let fallbackReason = '';

    // If custom voice returned 402 (Community Library voice requiring paid plan) or 404,
    // automatically fall back to the character's guaranteed free premade voice!
    if (!response.ok && (response.status === 402 || response.status === 404) && targetVoiceId !== fallbackVoiceId) {
      usedFallback = true;
      fallbackReason = response.status === 402 
        ? 'Library voice requires paid plan (402). Playing default voice.'
        : 'Voice ID not found (404). Playing default voice.';
      console.warn(`[ElevenLabs Notice]: Voice "${targetVoiceId}" returned ${response.status} (${fallbackReason}). Automatically streaming with fallback voice "${fallbackVoiceId}"!`);
      response = await requestElevenLabs(fallbackVoiceId);
    }

    if (!response.ok) {
      let errorDetails;
      try {
        errorDetails = await response.json();
      } catch {
        errorDetails = { message: await response.text() };
      }
      console.error(`[ElevenLabs API Error ${response.status}]:`, errorDetails);
      return res.status(response.status).json({
        error: 'Failed to synthesize audio from ElevenLabs',
        status: response.status,
        details: errorDetails
      });
    }

    // Stream audio binary directly back to client
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    if (usedFallback) {
      res.setHeader('X-Voice-Fallback', 'true');
      res.setHeader('X-Voice-Reason', fallbackReason);
    }

    const stream = Readable.fromWeb(response.body);
    stream.on('error', (err) => {
      console.error('[Audio Stream Error]:', err.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Audio streaming error', message: err.message });
      } else {
        res.end();
      }
    });

    stream.pipe(res);
  } catch (err) {
    console.error('[POST /api/tts Exception]:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error during TTS synthesis', message: err.message });
    }
  }
});

// Friendly URL Aliases
const ROUTE_ALIASES = {
  '/': '/index.html',
  '/aswini': '/friends/aswini/index.html',
  '/aswini.html': '/friends/aswini/index.html',
  '/hondu': '/friends/hondu/index.html',
  '/hondu.html': '/friends/hondu/index.html',
  '/padhy': '/friends/padhy/index.html',
  '/padhy.html': '/friends/padhy/index.html',
};

Object.entries(ROUTE_ALIASES).forEach(([route, targetFile]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, targetFile));
  });
});

// Serve static assets
app.use(express.static(PUBLIC_DIR));

// 404 Fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 The Boys Multiverse Server is Live!`);
  console.log(`🏠 Landing Hub : http://localhost:${PORT}`);
  console.log(`🍔 Hondu       : http://localhost:${PORT}/friends/hondu/`);
  console.log(`🪙 Aswini      : http://localhost:${PORT}/friends/aswini/`);
  console.log(`⚖️ Padhy       : http://localhost:${PORT}/friends/padhy/`);
  console.log(`🎙️ TTS API     : http://localhost:${PORT}/api/tts (ElevenLabs Streaming)`);
  console.log(`===================================================`);
});
