// Simple Mini-Game: "Feed BigFatHondu!"
// Enhanced with Drastic Growth Mechanic + Fullscreen "No-Chin" Game Over Prank!

let gameRunning = false;
let gameScore = 0;
let timeLeft = 30;
let gameInterval = null;
let timerInterval = null;
let items = [];
let playerX = 50; // percentage across width

// Dynamic Size Scaling
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
  const player = document.getElementById('gamePlayer');
  
  startBtn.textContent = 'Playing...';
  startBtn.disabled = true;
  scoreEl.textContent = '0';
  timerEl.textContent = '30s';
  statusEl.textContent = 'Catch fast food to EXPAND Hondu! Dodge the salad!';
  
  // Set initial player size
  updatePlayerSize(BASE_SIZE);
  
  // Clean existing dropped items
  document.querySelectorAll('.falling-item').forEach(el => el.remove());
  
  // Close any open prank modal
  const prankModal = document.getElementById('noChinPrankModal');
  if (prankModal) prankModal.classList.remove('active');
  
  // Timer countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
  
  // Item spawner and mover loop
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
  
  // Update Chin Tier Indicator
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
      chinStatus.textContent = '⚠️ CHIN: CRITICAL MASS REACHED!';
      chinStatus.style.background = 'rgba(255, 65, 108, 0.7)';
    }
  }
}

let spawnCounter = 0;
function gameLoop() {
  if (!gameRunning) return;
  
  const board = document.getElementById('gameBoard');
  if (!board) return;
  const boardRect = board.getBoundingClientRect();
  
  // Spawn new item every ~12 frames
  spawnCounter++;
  if (spawnCounter % 12 === 0) {
    const isSalad = Math.random() < 0.32;
    const possible = isSalad 
      ? FOOD_ITEMS.filter(f => f.type === 'bad') 
      : FOOD_ITEMS.filter(f => f.type === 'good');
    const template = possible[Math.floor(Math.random() * possible.length)];
    
    const itemEl = document.createElement('div');
    itemEl.className = 'falling-item';
    itemEl.textContent = template.emoji;
    
    const xPos = Math.random() * 85 + 5; // percentage
    itemEl.style.left = `${xPos}%`;
    itemEl.style.top = '0px';
    board.appendChild(itemEl);
    
    items.push({
      el: itemEl,
      x: xPos,
      y: 0,
      speed: 3.5 + Math.random() * 3.5,
      meta: template
    });
  }
  
  // Move items
  const hondu = document.getElementById('gamePlayer');
  const playerPercentX = playerX;
  
  // Hitbox expands proportional to current player size
  const hitboxWidthPct = (currentSize / board.offsetWidth) * 90;
  
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i];
    it.y += it.speed;
    it.el.style.top = `${it.y}px`;
    
    // Check catch near player height
    const boardH = board.offsetHeight;
    const catchZoneY = boardH - currentSize - 10;
    
    if (it.y >= catchZoneY && it.y <= boardH - 10) {
      // Check X distance
      const diffX = Math.abs(it.x - playerPercentX);
      if (diffX < (hitboxWidthPct / 2 + 3)) {
        // Caught!
        gameScore = Math.max(0, gameScore + it.meta.points);
        document.getElementById('gameScore').textContent = gameScore;
        
        // Drastically grow or shrink Hondu!
        updatePlayerSize(currentSize + it.meta.growth);
        
        // Visual indicator
        showCatchFloatingText(it.x, it.meta.type === 'good' ? `+${it.meta.points} BIGGER!` : it.meta.text, it.meta.type);
        
        if (it.meta.type === 'good') {
          if (typeof playNom === 'function') playNom();
          hondu.classList.add('eating');
          setTimeout(() => hondu.classList.remove('eating'), 250);
        } else {
          if (typeof playBuzzer === 'function') playBuzzer();
          hondu.classList.add('gagging');
          setTimeout(() => hondu.classList.remove('gagging'), 300);
        }
        
        it.el.remove();
        items.splice(i, 1);
        continue;
      }
    }
    
    // Remove if fallen past bottom
    if (it.y > boardH) {
      it.el.remove();
      items.splice(i, 1);
    }
  }
}

function showCatchFloatingText(x, text, type) {
  const board = document.getElementById('gameBoard');
  if (!board) return;
  const floatEl = document.createElement('div');
  floatEl.className = `catch-float ${type}`;
  floatEl.textContent = text;
  floatEl.style.left = `${x}%`;
  floatEl.style.bottom = `${currentSize + 20}px`;
  board.appendChild(floatEl);
  setTimeout(() => floatEl.remove(), 700);
}

function endGame() {
  gameRunning = false;
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  
  const startBtn = document.getElementById('gameStartBtn');
  const statusEl = document.getElementById('gameStatus');
  startBtn.disabled = false;
  startBtn.textContent = '🔄 Play Again!';
  
  // High score
  const high = parseInt(localStorage.getItem('hondu_high_score') || '0', 10);
  if (gameScore > high) {
    localStorage.setItem('hondu_high_score', gameScore);
  }
  statusEl.textContent = `Game Over! Final Score: ${gameScore} pts (Best: ${Math.max(high, gameScore)} pts)`;
  
  // TRIGGER THE FULLSCREEN NO-CHIN PRANK JUMPSCARE!
  setTimeout(() => {
    triggerNoChinPrank(gameScore);
  }, 400);
}

// Fullscreen Prank Takeover when Game Ends
function triggerNoChinPrank(score) {
  const modal = document.getElementById('noChinPrankModal');
  if (!modal) return;
  
  // Pick random roast
  const randomRoast = NO_CHIN_ROASTS[Math.floor(Math.random() * NO_CHIN_ROASTS.length)];
  document.getElementById('prankRoastText').textContent = `"${randomRoast}"`;
  document.getElementById('prankScoreDisplay').textContent = `${score} Calories Consumed!`;
  
  modal.classList.add('active');
  document.body.classList.add('screen-shake');
  
  if (typeof playHonk === 'function') playHonk();
  if (typeof playBuzzer === 'function') setTimeout(playBuzzer, 200);
  
  // Robotic TTS Announcement
  if (typeof speak === 'function') {
    speak("Alert! Critical game over. Hondu has consumed all food. Scanning for chin... error 404. Zero chin found. Only neck.");
  }
  
  if (typeof spawnConfetti === 'function') spawnConfetti(45);
  
  setTimeout(() => {
    document.body.classList.remove('screen-shake');
  }, 1000);
}

function closeNoChinPrank() {
  const modal = document.getElementById('noChinPrankModal');
  if (modal) modal.classList.remove('active');
}

// Controls
function setupControls() {
  const board = document.getElementById('gameBoard');
  const player = document.getElementById('gamePlayer');
  if (!board || !player) return;
  
  function updatePlayerPos(clientX) {
    const rect = board.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    let pct = (relativeX / rect.width) * 100;
    pct = Math.max(10, Math.min(90, pct));
    playerX = pct;
    player.style.left = `${pct}%`;
  }
  
  // Mouse move
  board.addEventListener('mousemove', (e) => {
    if (!gameRunning) return;
    updatePlayerPos(e.clientX);
  });
  
  // Touch move
  board.addEventListener('touchmove', (e) => {
    if (!gameRunning) return;
    if (e.touches && e.touches[0]) {
      updatePlayerPos(e.touches[0].clientX);
      e.preventDefault();
    }
  }, { passive: false });
  
  // Keyboard Left / Right
  window.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      playerX = Math.max(10, playerX - 7);
      player.style.left = `${playerX}%`;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      playerX = Math.min(90, playerX + 7);
      player.style.left = `${playerX}%`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupControls();
  const high = localStorage.getItem('hondu_high_score');
  if (high) {
    const statusEl = document.getElementById('gameStatus');
    if (statusEl) statusEl.textContent = `High Score: ${high} pts! Feed Hondu to expand him!`;
  }
});
