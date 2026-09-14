// =======================================================
// Sidhant "BigFatHondu" - Complete Feature Script
// Roasts, Feed Hondu Arcade Game, Aura Poll, Siren
// =======================================================

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
  if (typeof playBoing === 'function') playBoing();
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * HONDU_ROASTS.length);
  } while (nextIdx === lastRoastIndex && HONDU_ROASTS.length > 1);
  
  lastRoastIndex = nextIdx;
  const roastText = HONDU_ROASTS[nextIdx];
  
  const textEl = document.getElementById('roastText');
  const cardEl = document.getElementById('roastCard');
  
  if (cardEl && textEl) {
    cardEl.classList.remove('pop-in');
    void cardEl.offsetWidth;
    cardEl.classList.add('pop-in');
    textEl.textContent = `"${roastText}"`;
  }
  
  if (typeof spawnConfetti === 'function') spawnConfetti(15);
}

function copyCurrentRoast() {
  const textEl = document.getElementById('roastText');
  if (!textEl) return;
  const text = textEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById('copyRoastBtn');
    if (copyBtn) {
      const oldText = copyBtn.textContent;
      copyBtn.textContent = '✅ Copied to Send!';
      if (typeof playNom === 'function') playNom();
      setTimeout(() => {
        copyBtn.textContent = oldText;
      }, 2000);
    }
  }).catch(() => {
    alert('Roast: ' + text);
  });
}

// Community Aura Poll
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
  if (typeof playNom === 'function') playNom();
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
  
  if (typeof playBuzzer === 'function') playBuzzer();
  setTimeout(() => { if (typeof playHonk === 'function') playHonk(); }, 300);
  if (typeof playVoice === 'function') {
    playVoice("Warning! Critical Big Fat Hondu alert! Zero chin detected! Heavyweight overflow in progress!", 'hondu');
  } else if (typeof speak === 'function') {
    speak("Warning! Critical Big Fat Hondu alert! Zero chin detected! Heavyweight overflow in progress!", 'hondu');
  }
  
  const overlay = document.getElementById('sirenOverlay');
  if (overlay) overlay.classList.add('active');
  document.body.classList.add('screen-shake');
  
  if (typeof spawnConfetti === 'function') spawnConfetti(40);
  
  setTimeout(() => {
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('screen-shake');
    alarmActive = false;
  }, 4000);
}

// MINI-GAME: "FEED BIGFAT HONDU!"
let gameRunning = false;
let gameScore = 0;
let timeLeft = 30;
let gameInterval = null;
let timerInterval = null;
let items = [];
let playerX = 50;

const BASE_SIZE = 60;
const MAX_SIZE = 210;
let currentSize = BASE_SIZE;

const FOOD_ITEMS = [
  { emoji: '🍔', points: 10, type: 'good', sound: 'nom', growth: 8 },
  { emoji: '🍕', points: 15, type: 'good', sound: 'nom', growth: 10 },
  { emoji: '🍗', points: 20, type: 'good', sound: 'nom', growth: 12 },
  { emoji: '🥟', points: 25, type: 'good', sound: 'nom', growth: 14 },
  { emoji: '🥦', points: -15, type: 'bad', text: 'BLEHH! -15', sound: 'buzz', growth: -12 },
  { emoji: '🥗', points: -20, type: 'bad', text: 'DIET REJECTED! -20', sound: 'buzz', growth: -15 }
];

const NO_CHIN_ROASTS = [
  "Scientists scanned with satellite ground-penetrating radar: ZERO CHIN DETECTED. ONLY NECK.",
  "Bro is built like an aerodynamic thumb with a mustache.",
  "Where does the face end and the torso begin? An unsolved enigma of modern geometry.",
  "Your jawline was not included in the starter pack. Please purchase the Chin DLC.",
  "Wind tunnel rating: 10/10. Chin rating: -404 Error Not Found.",
  "Bro looks like he swallowed a sphere and decided to keep it as a chin replacement.",
  "Look at that neck-to-face seamless gradient. Not even Apple engineers could make a transition that smooth."
];

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  gameScore = 0;
  timeLeft = 30;
  items = [];
  currentSize = BASE_SIZE;
  
  const board = document.getElementById('gameBoard');
  const startBtn = document.getElementById('gameStartBtn');
  const scoreEl = document.getElementById('gameScore');
  const timerEl = document.getElementById('gameTimer');
  const statusEl = document.getElementById('gameStatus');
  
  if (startBtn) {
    startBtn.textContent = 'Playing...';
    startBtn.disabled = true;
  }
  if (scoreEl) scoreEl.textContent = '0';
  if (timerEl) timerEl.textContent = '30s';
  if (statusEl) statusEl.textContent = 'Catch fast food to EXPAND Hondu! Dodge the salad!';
  
  updatePlayerSize(BASE_SIZE);
  
  document.querySelectorAll('.falling-item').forEach(el => el.remove());
  
  const prankModal = document.getElementById('noChinPrankModal');
  if (prankModal) prankModal.classList.remove('active');
  
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
  
  gameInterval = setInterval(gameLoop, 35);
  if (typeof playTaDa === 'function') playTaDa();
}

function updatePlayerSize(newSize) {
  currentSize = Math.max(BASE_SIZE, Math.min(MAX_SIZE, newSize));
  const player = document.getElementById('gamePlayer');
  if (player) {
    player.style.width = `${currentSize}px`;
    player.style.height = `${currentSize}px`;
  }
  
  const chinStatus = document.getElementById('chinStatusBadge');
  if (chinStatus) {
    if (currentSize < 75) {
      chinStatus.textContent = 'CHIN: 404 NOT FOUND (Base)';
      chinStatus.style.background = 'rgba(255, 255, 255, 0.1)';
    } else if (currentSize < 110) {
      chinStatus.textContent = 'CHIN: DOUBLE CHIN STAGE 1';
      chinStatus.style.background = 'rgba(249, 203, 40, 0.3)';
    } else if (currentSize < 150) {
      chinStatus.textContent = 'CHIN: TRIPLE CHIN OVERDRIVE';
      chinStatus.style.background = 'rgba(255, 75, 43, 0.4)';
    } else {
      chinStatus.textContent = 'CHIN: GRAVITATIONAL SINGULARITY (100% Neck)';
      chinStatus.style.background = 'rgba(255, 65, 108, 0.6)';
    }
  }
}

function gameLoop() {
  const board = document.getElementById('gameBoard');
  if (!board) return;
  const boardRect = board.getBoundingClientRect();
  
  if (Math.random() < 0.08 && items.length < 9) {
    const itemData = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
    const el = document.createElement('div');
    el.className = 'falling-item';
    el.textContent = itemData.emoji;
    
    const startX = Math.random() * 85 + 7;
    el.style.left = `${startX}%`;
    el.style.top = '-40px';
    board.appendChild(el);
    
    items.push({
      el: el,
      data: itemData,
      x: startX,
      y: -40,
      speed: 3 + Math.random() * 3.5
    });
  }
  
  const player = document.getElementById('gamePlayer');
  const playerRadius = currentSize / 2;
  const playerCenterY = boardRect.height - 10 - playerRadius;
  const playerCenterX = (playerX / 100) * boardRect.width;
  
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    item.y += item.speed;
    item.el.style.top = `${item.y}px`;
    
    const itemCenterX = (item.x / 100) * boardRect.width;
    const itemCenterY = item.y + 20;
    
    const dist = Math.hypot(itemCenterX - playerCenterX, itemCenterY - playerCenterY);
    const hitRadius = playerRadius + 22;
    
    if (dist < hitRadius) {
      gameScore += item.data.points;
      const scoreEl = document.getElementById('gameScore');
      if (scoreEl) scoreEl.textContent = gameScore;
      
      updatePlayerSize(currentSize + item.data.growth);
      
      showCatchEffect(itemCenterX, itemCenterY, item.data);
      
      if (item.data.type === 'good') {
        if (typeof playNom === 'function') playNom();
        if (player) {
          player.classList.add('eating');
          setTimeout(() => player.classList.remove('eating'), 180);
        }
      } else {
        if (typeof playBuzzer === 'function') playBuzzer();
        if (player) {
          player.classList.add('gagging');
          setTimeout(() => player.classList.remove('gagging'), 250);
        }
      }
      
      item.el.remove();
      items.splice(i, 1);
      continue;
    }
    
    if (item.y > boardRect.height + 30) {
      item.el.remove();
      items.splice(i, 1);
    }
  }
}

function showCatchEffect(x, y, data) {
  const board = document.getElementById('gameBoard');
  if (!board) return;
  const floatEl = document.createElement('div');
  floatEl.className = `catch-float ${data.type}`;
  floatEl.textContent = data.type === 'good' ? `+${data.points}` : data.text;
  floatEl.style.left = `${x}px`;
  floatEl.style.top = `${y}px`;
  board.appendChild(floatEl);
  setTimeout(() => floatEl.remove(), 700);
}

function endGame() {
  gameRunning = false;
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  
  const startBtn = document.getElementById('gameStartBtn');
  const statusEl = document.getElementById('gameStatus');
  if (startBtn) {
    startBtn.textContent = 'Play Again';
    startBtn.disabled = false;
  }
  if (statusEl) {
    statusEl.textContent = `Time's Up! Final Score: ${gameScore} Calories!`;
  }
  
  if (typeof playHonk === 'function') playHonk();
  setTimeout(() => {
    triggerNoChinPrankModal();
  }, 450);
}

function triggerNoChinPrankModal() {
  const modal = document.getElementById('noChinPrankModal');
  const scoreDisp = document.getElementById('prankScoreDisplay');
  const roastDisp = document.getElementById('prankRoastText');
  
  if (modal) {
    modal.classList.add('active');
    if (scoreDisp) scoreDisp.textContent = `${gameScore} Calories Inhaled!`;
    const randomRoast = NO_CHIN_ROASTS[Math.floor(Math.random() * NO_CHIN_ROASTS.length)];
    if (roastDisp) roastDisp.textContent = `"${randomRoast}"`;
    if (typeof playBuzzer === 'function') playBuzzer();
    if (typeof spawnConfetti === 'function') spawnConfetti(35);
  }
}

function closeNoChinPrank() {
  const modal = document.getElementById('noChinPrankModal');
  if (modal) modal.classList.remove('active');
}

// Mouse and Touch Controls
document.addEventListener('DOMContentLoaded', () => {
  updatePollUI();
  generateRoast();
  
  const board = document.getElementById('gameBoard');
  const player = document.getElementById('gamePlayer');
  
  if (board && player) {
    const handleMove = (clientX) => {
      const rect = board.getBoundingClientRect();
      let relX = ((clientX - rect.left) / rect.width) * 100;
      relX = Math.max(5, Math.min(95, relX));
      playerX = relX;
      player.style.left = `${playerX}%`;
    };
    
    board.addEventListener('mousemove', (e) => {
      if (gameRunning) handleMove(e.clientX);
    });
    
    board.addEventListener('touchmove', (e) => {
      if (gameRunning && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    }, { passive: true });
    
    window.addEventListener('keydown', (e) => {
      if (!gameRunning) return;
      if (e.key === 'ArrowLeft') {
        playerX = Math.max(5, playerX - 5);
        player.style.left = `${playerX}%`;
      } else if (e.key === 'ArrowRight') {
        playerX = Math.min(95, playerX + 5);
        player.style.left = `${playerX}%`;
      }
    });
  }
});
