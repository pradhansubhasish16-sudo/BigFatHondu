// Web Audio Context for zero-dependency sound effects
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Sound Synthesis Functions
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

// Text to Speech
function speak(phrase) {
  if (!soundEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.rate = 1.05;
  utterance.pitch = 0.92;
  window.speechSynthesis.speak(utterance);
}

// Sound toggle
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('soundToggleBtn');
  if (btn) {
    btn.innerHTML = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    btn.classList.toggle('muted', !soundEnabled);
  }
}

// Master Roasts & Puns Collection (Improvised Friend-to-Friend)
const HONDU_ROASTS = [
  // No Chin & Photos
  "Hondu’s chin is like an Apple accessory: sold separately and currently out of stock.",
  "In stylish_hondu.jpg, bro is literally holding his chin with his hand just to prove to the camera that one exists.",
  "His jaw and neck signed an unconditional corporate merger. You can't tell where the face stops and the torso begins.",
  "In No_Chin_Hondu.jpg, bro is staring at the night sky wondering which galaxy stole his jawline.",
  "Zero chin angle means zero air resistance. Wind tunnel tests show he has the aerodynamics of an egg with a mustache.",
  "In LGBTQ_Hondu.png, Captain Rainbow Belly isn't saving Gotham — he's personally guarding the dessert section of the buffet.",
  "Bro paid for a high-fashion black & white photoshoot just to look deeply disappointed by his own diet choices.",
  
  // Heavyweight & Food
  "His bathroom weighing scale doesn't display numbers anymore — it just shows an error message: 'Please step on one person at a time.'",
  "Hondu's shadow is so wide it has its own postal code, voter registration list, and separate municipal corporation.",
  "When Hondu sits in the back of an auto-rickshaw, the front wheel does a wheelie and the driver starts reciting holy prayers.",
  "Hondu’s definition of a balanced diet is a chicken roll in his left hand and a double cheese burger in his right for equal equilibrium.",
  "When Hondu opens Swiggy, the restaurants within a 5km radius turn on their exhaust fans and call in chefs for overtime.",
  "When Hondu puts on his Puma hoodie, the leaping puma stretches so wide it turns into a sleeping manatee.",
  "Stood in front of the ₹200 discount rack in 2019 like he was scouting land deals in Dubai. Peak confidence, budget price.",
  "His phone couldn't unlock with Face ID, so Apple had to switch to geological tectonic plate scanning.",
  "When Hondu gets up from the sofa, the cushion takes 3 to 5 business days to recover its original shape.",
  "Bro said 'I will just have one small bite,' and suddenly half the fridge is declared a UNESCO heritage memory site.",
  "Scientists discovered that Earth doesn't pull Hondu down. Hondu pulls Earth up.",
  "In 2019 he was Sid. In 2025, he is the entire SID-dicate.",
  "When Hondu enters the elevator, the weight limit sign asks for consent.",
  "Hondu went to the beach and ocean levels officially rose by 2 inches.",
  "Car manufacturers use Hondu to stress-test their heavy-duty shock absorbers.",
  "Hondu's favorite yoga pose is 'Lying on the sofa scrolling food reels'.",
  "Google Maps recalculated the route because Hondu blocked the entire sidewalk.",
  "Hondu doesn't need a passport photo; he needs a panoramic 360-degree drone scan.",
  "In 2019, a gust of wind made him tremble. Today, cyclones avoid him out of respect.",
  "Bro isn't big, he's just maintaining peak aerodynamic stability against the wind.",
  "Hondu's blood group isn't O positive; it's Biryani Gravy Positive.",
  "His gym membership has been active for 4 years, but the only muscle getting a daily workout is his chewing jaw.",
  "Whenever Hondu goes on a morning walk, Fitbit congratulates the pavement for surviving."
];

let lastRoastIndex = -1;

function generateRoast() {
  playBoing();
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * HONDU_ROASTS.length);
  } while (nextIdx === lastRoastIndex && HONDU_ROASTS.length > 1);
  
  lastRoastIndex = nextIdx;
  const roastText = HONDU_ROASTS[nextIdx];
  
  const textEl = document.getElementById('roastText');
  const cardEl = document.getElementById('roastCard');
  
  cardEl.classList.remove('pop-in');
  void cardEl.offsetWidth; // Trigger reflow
  cardEl.classList.add('pop-in');
  
  textEl.textContent = `"${roastText}"`;
  
  // Confetti effect
  spawnConfetti(15);
}

function copyCurrentRoast() {
  const text = document.getElementById('roastText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById('copyRoastBtn');
    const oldText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copied to Send!';
    playNom();
    setTimeout(() => {
      copyBtn.textContent = oldText;
    }, 2000);
  }).catch(() => {
    alert('Roast: ' + text);
  });
}

// Interactive Aura Poll
const POLL_STORAGE_KEY = 'hondu_poll_votes_v2';
function getPollData() {
  const saved = localStorage.getItem(POLL_STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return [210, 395, 518, 442];
}

function savePollData(data) {
  localStorage.setItem(POLL_STORAGE_KEY, JSON.stringify(data));
}

function votePoll(optionIndex) {
  const votes = getPollData();
  votes[optionIndex] += 1;
  savePollData(votes);
  playNom();
  updatePollUI(optionIndex);
}

function updatePollUI(votedIndex = -1) {
  const votes = getPollData();
  const total = votes.reduce((a, b) => a + b, 0);
  
  votes.forEach((count, i) => {
    const pct = Math.round((count / total) * 100);
    const bar = document.getElementById(`poll-bar-${i}`);
    const pctText = document.getElementById(`poll-pct-${i}`);
    const btn = document.getElementById(`poll-btn-${i}`);
    
    if (bar) bar.style.width = `${pct}%`;
    if (pctText) pctText.textContent = `${pct}% (${count} votes)`;
    if (btn && i === votedIndex) {
      btn.classList.add('voted');
      btn.innerHTML = '✅ Voted!';
    }
  });
}

// Emergency Prank Siren
let alarmActive = false;
function triggerEmergency() {
  if (alarmActive) return;
  alarmActive = true;
  
  playBuzzer();
  setTimeout(() => playHonk(), 300);
  speak("Warning! Critical Big Fat Hondu alert! Zero chin detected! Heavyweight overflow in progress!");
  
  const overlay = document.getElementById('sirenOverlay');
  overlay.classList.add('active');
  document.body.classList.add('screen-shake');
  
  spawnConfetti(40);
  
  setTimeout(() => {
    overlay.classList.remove('active');
    document.body.classList.remove('screen-shake');
    alarmActive = false;
  }, 4000);
}

// Confetti generator
function spawnConfetti(count = 20) {
  const container = document.getElementById('confettiContainer') || document.body;
  const colors = ['#ff416c', '#ff4b2b', '#f9cb28', '#00f2fe', '#4facfe', '#43e97b'];
  
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

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  updatePollUI();
  generateRoast();
  
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
