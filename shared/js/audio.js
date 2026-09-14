// =======================================================
// Universal Web Audio & Dual-Engine Speech Synthesizer
// Mode 1: ElevenLabs High-Fidelity Audio Streaming (Primary)
// Mode 2: Natural Browser Speech Synthesis (Automatic Fallback)
// Zero Downtime • Punctuation Optimization • Web Audio Oscillators
// =======================================================

let audioCtx = null;
let soundEnabled = true;
let isElevenLabsConfigured = false;
let currentUtterance = null; // Prevent Chrome GC pause bug

// 🔓 Eager Audio Context Initializer
function initAudio() {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
}

// 🍞 Modern Non-Intrusive Audio Toast Notification
function showAudioToast(message, type = 'info') {
  if (typeof document === 'undefined') return;
  let toast = document.getElementById('audioToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'audioToastNotification';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: rgba(15, 23, 42, 0.94);
      color: #fff;
      padding: 10px 18px;
      border-radius: 999px;
      font-size: 0.84rem;
      font-weight: 600;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(60px) scale(0.95);
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  const colors = {
    info: '#38bdf8',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  const badgeColor = colors[type] || colors.info;
  toast.innerHTML = `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${badgeColor}; box-shadow:0 0 8px ${badgeColor};"></span> ${message}`;
  toast.style.transform = 'translateY(0) scale(1)';
  toast.style.opacity = '1';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.transform = 'translateY(60px) scale(0.95)';
    toast.style.opacity = '0';
  }, 3500);
}

// 📯 Honk Sound
function playHonk() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.35);
  
  gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.36);
}

// 🍔 Nom / Eat Sound
function playNom() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(480, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.16);
  
  gain.gain.setValueAtTime(0.45, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.16);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.17);
}

// 🏀 Boing Sound
function playBoing() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(160, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(650, audioCtx.currentTime + 0.32);
  
  gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.32);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.33);
}

// 🚗 Creak Sound
function playCreak() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(75, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(130, audioCtx.currentTime + 0.2);
  osc.frequency.linearRampToValueAtTime(65, audioCtx.currentTime + 0.45);
  
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.51);
}

// 🚨 Buzzer / Warning Sound
function playBuzzer() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(110, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.31);
}

// 🎉 Ta-Da Fanfare
function playTaDa() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;
  
  [330, 440, 554.37, 659.25].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);
    
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.08 + 0.4);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + i * 0.08);
    osc.stop(audioCtx.currentTime + i * 0.08 + 0.45);
  });
}

// 🪙 Metallic Coin Sound (1-Paisa Collection)
function playCoin() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc1.type = 'sine';
  osc2.type = 'sine';

  osc1.frequency.setValueAtTime(987.77, audioCtx.currentTime);
  osc1.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.08);

  osc2.frequency.setValueAtTime(1975.53, audioCtx.currentTime);
  osc2.frequency.setValueAtTime(2637.02, audioCtx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);

  osc1.start();
  osc2.start();
  osc1.stop(audioCtx.currentTime + 0.36);
  osc2.stop(audioCtx.currentTime + 0.36);
}

// 💵 Cha-Ching / Cash Register Sound
function playChaChing() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
  osc.frequency.setValueAtTime(1600, audioCtx.currentTime + 0.06);
  osc.frequency.setValueAtTime(2400, audioCtx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.52);
}

// 📢 Loud Megaphone Blast
function playMegaphone() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(400, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.15);
  osc.frequency.linearRampToValueAtTime(350, audioCtx.currentTime + 0.4);

  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.46);
}

// ⚖️ Gavel Strike
function playGavel() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(90, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.18);

  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.21);
}

// 🎙️ Realistic Mic-On Key Chime
function playMicClick() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.setValueAtTime(2100, audioCtx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (e) {}
}

// =======================================================
// TEXT NORMALIZER & VOICE SELECTION ENGINE
// Cleans punctuation to prevent "dot dot", "alpabiram", "dash"
// =======================================================
function cleanTextForSpeech(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/https?:\/\/\S+/gi, '')              // Remove links
    .replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g, '')      // Strip outer quotes
    .replace(/["'“”‘’]/g, '')                     // Remove inner quotes
    .replace(/₹\s*([0-9.]+)/g, '$1 rupees')       // ₹50 -> 50 rupees
    .replace(/rs\.?\s*([0-9.]+)/gi, '$1 rupees')   // rs 50 -> 50 rupees
    .replace(/\b(\d+)\s*km\b/gi, '$1 kilometers')  // 14km -> 14 kilometers
    .replace(/\b(\d+)\s*kg\b/gi, '$1 kilograms')   // 55kg -> 55 kilograms
    .replace(/—|–|--/g, ', ')                      // Replace dashes with breath pauses
    .replace(/\.{2,}/g, '. ')                      // Strip "..." -> single pause (stops "dot dot")
    .replace(/[,;:]+/g, ', ')                      // Standardize comma pauses (stops "alpabiram")
    .replace(/[?!]+/g, '! ')                       // Standardize exclamations
    .replace(/[*_~`#|<>]/g, ' ')                  // Strip markdown symbols
    .replace(/\s+/g, ' ')                          // Normalize whitespace
    .trim();
}

let cachedVoices = [];
function updateVoicesList() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  updateVoicesList();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoicesList;
  }
}

function getBestBrowserVoice(character = 'hondu') {
  const voices = (cachedVoices.length > 0) ? cachedVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
  if (!voices || voices.length === 0) return null;

  const indianEnglish = voices.filter(v => 
    (v.lang && (v.lang.toLowerCase() === 'en-in' || v.lang.toLowerCase() === 'hi-in')) ||
    (v.name && v.name.toLowerCase().includes('india'))
  );

  const naturalEnglish = voices.filter(v =>
    v.lang && v.lang.toLowerCase().startsWith('en') &&
    (v.name.toLowerCase().includes('natural') || 
     v.name.toLowerCase().includes('neural') ||
     v.name.toLowerCase().includes('google') ||
     v.name.toLowerCase().includes('david') ||
     v.name.toLowerCase().includes('george'))
  );

  const anyEnglish = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));

  if (character === 'hondu') {
    // Deep, calm, relaxed voice
    const maleVoice = [...indianEnglish, ...naturalEnglish, ...anyEnglish].find(v =>
      v.name.toLowerCase().includes('male') ||
      v.name.toLowerCase().includes('david') ||
      v.name.toLowerCase().includes('rishi') ||
      v.name.toLowerCase().includes('guy') ||
      v.name.toLowerCase().includes('mark')
    );
    if (maleVoice) return maleVoice;
  } else if (character === 'padhy') {
    // Sharp, articulate lawyer voice
    const lawyerVoice = [...indianEnglish, ...naturalEnglish, ...anyEnglish].find(v =>
      v.name.toLowerCase().includes('ravi') ||
      v.name.toLowerCase().includes('george') ||
      v.name.toLowerCase().includes('roger')
    );
    if (lawyerVoice) return lawyerVoice;
  } else if (character === 'aswini') {
    // Energetic, expressive voice
    const energeticVoice = [...indianEnglish, ...naturalEnglish, ...anyEnglish].find(v =>
      v.name.toLowerCase().includes('prabhat') ||
      v.name.toLowerCase().includes('alex') ||
      v.name.toLowerCase().includes('steffi')
    );
    if (energeticVoice) return energeticVoice;
  }

  return indianEnglish[0] || naturalEnglish[0] || anyEnglish[0] || voices[0];
}

// 🔊 Browser Speech Synthesis Fallback Engine
function speakWithBrowserFallback(text, character = 'hondu') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[Speech Synthesis] Not supported in this browser environment.');
    return;
  }

  // Cancel any active speech
  try {
    window.speechSynthesis.cancel();
  } catch (e) {}

  const clean = cleanTextForSpeech(text);
  if (!clean) return;

  const utterance = new SpeechSynthesisUtterance(clean);
  currentUtterance = utterance; // Keep alive against Chrome GC

  const voice = getBestBrowserVoice(character);
  if (voice) {
    utterance.voice = voice;
  }

  // Character tuning
  if (character === 'hondu') {
    utterance.pitch = 0.88;
    utterance.rate = 0.95;
  } else if (character === 'padhy') {
    utterance.pitch = 1.05;
    utterance.rate = 1.08;
  } else if (character === 'aswini') {
    utterance.pitch = 1.15;
    utterance.rate = 1.05;
  } else {
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
  }

  utterance.onend = () => {
    currentUtterance = null;
  };
  utterance.onerror = (e) => {
    console.warn('[Browser SpeechSynthesis Error]:', e);
    currentUtterance = null;
  };

  showAudioToast(`📢 Speaking (${character.toUpperCase()} • Browser Voice)`, 'info');
  window.speechSynthesis.speak(utterance);
}

// =======================================================
// ELEVENLABS STREAMING TEXT-TO-SPEECH AUDIO ENGINE
// =======================================================
let currentAudio = null;
let currentAudioUrl = null;
let currentAbortController = null;

function stopCurrentVoice() {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentAudioUrl) {
    try {
      URL.revokeObjectURL(currentAudioUrl);
    } catch (e) {}
    currentAudioUrl = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/**
 * Streams high-fidelity clone audio from ElevenLabs via /api/tts.
 * Automatically falls back to browser speech synthesis if ElevenLabs is unavailable!
 * @param {string} text - Roast or phrase to speak
 * @param {string} character - Target character ('hondu', 'padhy', 'aswini')
 */
async function playVoice(text, character = 'hondu') {
  if (!soundEnabled) {
    showAudioToast('🔇 Sound is MUTED. Click "Sound: OFF" in the top bar to unmute!', 'warning');
    return;
  }
  if (!text || typeof text !== 'string' || !text.trim()) return;

  // Interrupt any currently playing voice
  stopCurrentVoice();

  // Subtle physical mic click chime
  playMicClick();

  showAudioToast(`🎙️ Loading ${character.toUpperCase()} voice...`, 'info');

  currentAbortController = new AbortController();
  const { signal } = currentAbortController;

  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text.trim(),
        character: (character || 'hondu').toLowerCase()
      }),
      signal
    });

    if (!response.ok) {
      let errJson;
      try {
        errJson = await response.json();
      } catch {
        errJson = { message: response.statusText };
      }
      console.info(`[ElevenLabs TTS (${response.status}) - switching to browser voice]:`, errJson?.error || errJson?.message);
      
      // Seamlessly fall back to browser speech synthesis
      speakWithBrowserFallback(text, character);
      return;
    }

    const blob = await response.blob();
    if (signal.aborted) return;

    const audioUrl = URL.createObjectURL(blob);
    currentAudioUrl = audioUrl;

    const audio = new Audio(audioUrl);
    currentAudio = audio;

    const cleanup = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
      if (currentAudioUrl === audioUrl) {
        currentAudioUrl = null;
      }
      try {
        URL.revokeObjectURL(audioUrl);
      } catch (e) {}
    };

    audio.onended = cleanup;
    audio.onerror = (e) => {
      cleanup();
      console.warn('[Audio Playback Error, falling back]:', e);
      speakWithBrowserFallback(text, character);
    };
    audio.onpause = () => {
      if (audio.currentTime === 0 || audio.ended) {
        cleanup();
      }
    };

    showAudioToast(`⚡ Playing ElevenLabs HD (${character.toUpperCase()})`, 'success');
    await audio.play();
  } catch (err) {
    if (err.name === 'AbortError') {
      return;
    }
    console.info('[ElevenLabs Fetch Exception - falling back to browser voice]:', err.message);
    speakWithBrowserFallback(text, character);
  }
}

// Deprecated Web Speech alias for seamless backward compatibility
function speak(phrase, character = 'hondu') {
  return playVoice(phrase, character);
}

// 🔊 Sound Toggle Button
function toggleSound() {
  soundEnabled = !soundEnabled;
  if (!soundEnabled) {
    stopCurrentVoice();
  }
  const btn = document.getElementById('soundToggleBtn');
  if (btn) {
    btn.innerHTML = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    btn.classList.toggle('muted', !soundEnabled);
  }
  showAudioToast(soundEnabled ? '🔊 Sound enabled' : '🔇 Sound muted', soundEnabled ? 'info' : 'warning');
}

// 🎊 Confetti Spawner
function spawnConfetti(count = 20) {
  if (typeof document === 'undefined') return;
  const container = document.getElementById('confettiContainer') || document.body;
  const colors = ['#ff416c', '#ff4b2b', '#f9cb28', '#10b981', '#00f2fe', '#3b82f6'];
  
  for (let i = 0; i < count; i++) {
    const bit = document.createElement('div');
    bit.className = 'confetti-bit';
    bit.style.left = `${Math.random() * 100}vw`;
    bit.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    bit.style.animationDuration = `${1.5 + Math.random() * 2}s`;
    bit.style.transform = `rotate(${Math.random() * 360}deg)`;
    bit.style.width = `${8 + Math.random() * 10}px`;
    bit.style.height = `${8 + Math.random() * 10}px`;
    container.appendChild(bit);
    
    setTimeout(() => bit.remove(), 3500);
  }
}

// 🔍 Check Backend Status & Auto-Update UI Badges
async function checkBackendVoiceStatus() {
  if (typeof fetch === 'undefined') return;
  try {
    const res = await fetch('/api/status');
    if (res.ok) {
      const data = await res.json();
      isElevenLabsConfigured = !!data.elevenlabsConfigured;
      
      const badgeWraps = document.querySelectorAll('.accent-selector-wrap');
      badgeWraps.forEach(wrap => {
        if (isElevenLabsConfigured) {
          wrap.innerHTML = `<span class="accent-label">🎙️ Voice:</span> <span style="color: #10b981; font-weight: 700; font-size: 0.82rem;">⚡ ElevenLabs HD</span>`;
          wrap.title = 'ElevenLabs API connected and active';
        } else {
          wrap.innerHTML = `<span class="accent-label">🎙️ Voice:</span> <span style="color: #38bdf8; font-weight: 700; font-size: 0.82rem;">🎙️ Natural Browser (ElevenLabs Ready)</span>`;
          wrap.title = 'Browser voice active. Add ELEVENLABS_API_KEY in .env for cloned voices!';
        }
      });
    }
  } catch (e) {}
}

// Global click-to-unlock audio context initialization
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    checkBackendVoiceStatus();
    const unlock = () => {
      initAudio();
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('touchstart', unlock);
    };
    document.addEventListener('click', unlock);
    document.addEventListener('keydown', unlock);
    document.addEventListener('touchstart', unlock);
  });
}

// Environment exports
if (typeof window !== 'undefined') {
  window.playVoice = playVoice;
  window.stopCurrentVoice = stopCurrentVoice;
  window.speak = speak;
  window.speakWithBrowserFallback = speakWithBrowserFallback;
  window.initAudio = initAudio;
  window.playHonk = playHonk;
  window.playNom = playNom;
  window.playBoing = playBoing;
  window.playCreak = playCreak;
  window.playBuzzer = playBuzzer;
  window.playTaDa = playTaDa;
  window.playCoin = playCoin;
  window.playChaChing = playChaChing;
  window.playMegaphone = playMegaphone;
  window.playGavel = playGavel;
  window.playMicClick = playMicClick;
  window.toggleSound = toggleSound;
  window.spawnConfetti = spawnConfetti;
  window.showAudioToast = showAudioToast;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    playVoice,
    stopCurrentVoice,
    speak,
    speakWithBrowserFallback,
    cleanTextForSpeech,
    initAudio,
    playHonk,
    playNom,
    playBoing,
    playCreak,
    playBuzzer,
    playTaDa,
    playCoin,
    playChaChing,
    playMegaphone,
    playGavel,
    playMicClick,
    toggleSound,
    spawnConfetti,
    showAudioToast
  };
}
