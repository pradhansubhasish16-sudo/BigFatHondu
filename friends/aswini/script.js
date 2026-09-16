// =======================================================
// Aswini Sahoo ("Assini") - Complete Feature Script
// The 1-Paisa God & Ultrasonic Megaphone
// =======================================================

const ASWINI_ROASTS = [
  "Aswini once dropped a 1-paisa coin in a drain and conducted a 7-day archaeological excavation to retrieve it.",
  "Bro doesn't need Airtel or Jio network; he just opens his window and shouts to his friend 12 kilometers away.",
  "Splits a ₹10 cutting chai into ₹3.33 each and sends an automated UPI payment request for the remaining 33 paise at 2:30 AM.",
  "Walked 18 km in 44°C summer heat just to save a ₹5 auto fare, permanently destroying a ₹3,500 pair of sneakers in the process.",
  "When Aswini whispers a secret, stray dogs in the next district start barking.",
  "Leaves Subway with 60 napkins and 14 ketchup packets: 'This is my monthly grocery shopping sorted.'",
  "Negotiated with an automated ATM machine for a 2% cashback discount before entering his PIN.",
  "Gives a missed call, cuts it after 0.5 seconds, and then yells across the street: 'CALL ME BACK, MY BALANCE IS PRECIOUS!'",
  "His voice has enough decibels to crack tempered glass screen protectors from 50 feet away.",
  "When Aswini orders a pizza, he brings a ruler and food scale to ensure everyone eats strictly according to their ₹0.01 financial contribution.",
  "Asked the barber if he gets a discount for having fewer hairs cut on the sides.",
  "Bro puts his smartphone on maximum low-power mode to avoid paying an extra 2 paise on the electricity bill.",
  "In his 2018 WhatsApp screenshot, bro is literally auditing a ₹1.50 expense ledger with forensic accounting precision.",
  "When Aswini talks in a movie theater, the audience thinks IMAX installed new subwoofer surround sound directly behind their ears.",
  "His UPI QR code is tattooed on his forehead just in case someone owes him 50 paise for a chewing gum.",
  "Once spent 3 hours researching discount promo codes for a ₹15 haircut.",
  "The only thing louder than thunder during a coastal cyclone is Aswini saying 'ARE BHAI SUN TOH!'",
  "Refused to die until the hospital offered a 15% promotional discount code on the ICU bill.",
  "Bro turns off the Wi-Fi router when he blinks to save 0.0001 watts of household electricity.",
  "His heart rate spikes to 195 BPM whenever someone at the restaurant table casually suggests: 'Let's just split the bill equally!'",
  "Bargains with Amazon customer care AI bots until the machine gives up and transfers ₹2 wallet cash out of sheer exhaustion.",
  "Has never bought black pepper in his life; he has 500 Domino's seasoning sachets organized alphabetically in his kitchen.",
  "When Aswini clears his throat, car alarms across the entire parking lot go off.",
  "He doesn't use headphones; he broadcasts his private phone calls to the entire neighborhood like a public radio station.",
  "Bro calculates compounding interest on a single sip of water you took from his bottle."
];

let lastAswiniRoastIndex = -1;

function generateAswiniRoast() {
  if (typeof playCoin === 'function') playCoin();
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * ASWINI_ROASTS.length);
  } while (nextIdx === lastAswiniRoastIndex && ASWINI_ROASTS.length > 1);
  
  lastAswiniRoastIndex = nextIdx;
  const roastText = ASWINI_ROASTS[nextIdx];
  
  const textEl = document.getElementById('aswiniRoastText');
  const cardEl = document.getElementById('aswiniRoastCard');
  
  if (cardEl && textEl) {
    cardEl.classList.remove('pop-in');
    void cardEl.offsetWidth;
    cardEl.classList.add('pop-in');
    textEl.textContent = `"${roastText}"`;
  }
  
  if (typeof spawnConfetti === 'function') spawnConfetti(15);
}

function copyAswiniRoast() {
  const textEl = document.getElementById('aswiniRoastText');
  if (!textEl) return;
  const text = textEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById('copyAswiniRoastBtn');
    if (copyBtn) {
      const oldText = copyBtn.textContent;
      copyBtn.textContent = '✅ Copied to Send!';
      if (typeof playChaChing === 'function') playChaChing();
      setTimeout(() => {
        copyBtn.textContent = oldText;
      }, 2000);
    }
  }).catch(() => {
    alert('Roast: ' + text);
  });
}

// DECIBEL METER SIMULATOR
const DECIBEL_LEVELS = [
  { max: 70, label: "Whisper (Physically Impossible For Aswini)", warning: "Anomaly: Aswini is sound asleep", color: "#10b981" },
  { max: 95, label: "Normal Chat (Still Way Too Loud)", warning: "Neighbors turning on earplugs", color: "#43e97b" },
  { max: 120, label: "Subway Train / Jackhammer Level", warning: "Car windshields vibrating gently", color: "#f9cb28" },
  { max: 145, label: "Military Jet Afterburner Level", warning: "Permanent hearing loss in 3km radius", color: "#ff8a65" },
  { max: 175, label: "Aswini Shouting 'ARE BHAI BOL NA!'", warning: "🚨 CRITICAL: Ultrasonic Glass Shattering Alert!", color: "#ff416c" },
  { max: 220, label: "Someone Forgot To Pay Aswini 25 Paise", warning: "💥 TECTONIC CONTINENTAL DRIFT TRIGGERED!", color: "#e63946" }
];

function updateDecibelSlider(val) {
  const dbVal = parseInt(val, 10);
  const valEl = document.getElementById('decibelVal');
  const warningEl = document.getElementById('decibelWarning');
  const bars = document.querySelectorAll('.decibel-bar');
  
  if (valEl) valEl.textContent = `${dbVal} dB`;
  
  const level = DECIBEL_LEVELS.find(l => dbVal <= l.max) || DECIBEL_LEVELS[DECIBEL_LEVELS.length - 1];
  
  if (warningEl) {
    warningEl.textContent = `${level.label} • ${level.warning}`;
    warningEl.style.borderColor = level.color;
    warningEl.style.color = level.color;
  }
  
  bars.forEach((bar, idx) => {
    const factor = (dbVal / 220);
    const randomHeight = Math.min(100, Math.max(10, Math.floor(factor * 90 + Math.sin(idx + dbVal) * 20)));
    bar.style.height = `${randomHeight}%`;
    bar.style.backgroundColor = level.color;
  });
}

function testDecibelBlast() {
  if (typeof playMegaphone === 'function') playMegaphone();
  const slider = document.getElementById('decibelRange');
  if (slider) {
    slider.value = 185;
    updateDecibelSlider(185);
  }
  if (typeof playVoice === 'function') {
    playVoice("Hello Bhai! Sun toh! Balance khatam ho jayega jaldi bol!", 'aswini');
  } else if (typeof speak === 'function') {
    speak("Hello Bhai! Sun toh! Balance khatam ho jayega jaldi bol!", 'aswini');
  }
}

// 🪙 1-PAISA ARCADE GAME: "PAISA BACHAO!"
let coinGameRunning = false;
let totalPaisaSaved = 0.00;
let coinTimeLeft = 30;
let coinGameInterval = null;
let coinTimerInterval = null;
let coinItems = [];
let aswiniX = 50;

const ASWINI_ITEMS = [
  { emoji: '🪙', points: 0.01, type: 'good', label: '+₹0.01 Paisa', sound: 'coin' },
  { emoji: '🪙', points: 0.01, type: 'good', label: '+₹0.01 Paisa', sound: 'coin' },
  { emoji: '🏷️', points: 0.50, type: 'good', label: '+₹0.50 Discount', sound: 'chaching' },
  { emoji: '🍅', points: 0.05, type: 'good', label: '+₹0.05 Free Ketchup', sound: 'coin' },
  { emoji: '💵', points: 1.00, type: 'good', label: '+₹1.00 Found Cash!', sound: 'chaching' },
  { emoji: '🧾', points: -2.50, type: 'bad', label: '-₹2.50 BILL SPLIT!', sound: 'buzz' },
  { emoji: '☕', points: -5.00, type: 'bad', label: '-₹5.00 STARBUCKS!', sound: 'buzz' },
  { emoji: '🎂', points: -10.00, type: 'bad', label: '-₹10.00 TREAT DEMAND!', sound: 'buzz' }
];

const BANKRUPTCY_ROASTS = [
  "DISASTER: Aswini was forced to pay ₹3.50! He has collapsed and is currently demanding ₹3.50 from the nearest bystander.",
  "Bro took one look at the bill and his vocal cords generated a 180 dB sonic shockwave.",
  "Financial ruin! That ₹2.50 expense set his 2045 retirement plan back by 14 months.",
  "Aswini is currently writing a 12-page legal notice demanding a 1-paisa refund from the game creator.",
  "Emergency UPI QR code activated! Please send ₹0.01 to help Aswini recover from this trauma."
];

function startCoinGame() {
  if (coinGameRunning) return;
  coinGameRunning = true;
  totalPaisaSaved = 0.00;
  coinTimeLeft = 30;
  coinItems = [];
  
  const startBtn = document.getElementById('coinGameStartBtn');
  const scoreEl = document.getElementById('coinGameScore');
  const timerEl = document.getElementById('coinGameTimer');
  const statusEl = document.getElementById('coinGameStatus');
  
  if (startBtn) {
    startBtn.textContent = 'Saving Paise...';
    startBtn.disabled = true;
  }
  if (scoreEl) scoreEl.textContent = '₹0.00';
  if (timerEl) timerEl.textContent = '30s';
  if (statusEl) statusEl.textContent = 'Catch 🪙 1-paisa coins & discounts! DODGE restaurant bills & treat demands!';
  
  document.querySelectorAll('.falling-coin-item').forEach(el => el.remove());
  
  const modal = document.getElementById('aswiniPrankModal');
  if (modal) modal.classList.remove('active');
  
  coinTimerInterval = setInterval(() => {
    coinTimeLeft--;
    if (timerEl) timerEl.textContent = `${coinTimeLeft}s`;
    if (coinTimeLeft <= 0) {
      endCoinGame();
    }
  }, 1000);
  
  coinGameInterval = setInterval(coinGameLoop, 35);
  if (typeof playTaDa === 'function') playTaDa();
}

function coinGameLoop() {
  const board = document.getElementById('coinGameBoard');
  if (!board) return;
  const boardRect = board.getBoundingClientRect();
  
  if (Math.random() < 0.09 && coinItems.length < 9) {
    const itemData = ASWINI_ITEMS[Math.floor(Math.random() * ASWINI_ITEMS.length)];
    const el = document.createElement('div');
    el.className = 'falling-coin-item';
    el.style.position = 'absolute';
    el.style.fontSize = '2.2rem';
    el.style.transform = 'translateX(-50%)';
    el.style.pointerEvents = 'none';
    el.textContent = itemData.emoji;
    
    const startX = Math.random() * 85 + 7;
    el.style.left = `${startX}%`;
    el.style.top = '-40px';
    board.appendChild(el);
    
    coinItems.push({
      el: el,
      data: itemData,
      x: startX,
      y: -40,
      speed: 3 + Math.random() * 4
    });
  }
  
  const player = document.getElementById('aswiniPlayer');
  const playerRadius = 35;
  const playerCenterY = boardRect.height - 10 - playerRadius;
  const playerCenterX = (aswiniX / 100) * boardRect.width;
  
  for (let i = coinItems.length - 1; i >= 0; i--) {
    const item = coinItems[i];
    item.y += item.speed;
    item.el.style.top = `${item.y}px`;
    
    const itemCenterX = (item.x / 100) * boardRect.width;
    const itemCenterY = item.y + 20;
    
    const dist = Math.hypot(itemCenterX - playerCenterX, itemCenterY - playerCenterY);
    
      if (dist < playerRadius + 22) {
        totalPaisaSaved += item.data.points;
        const scoreEl = document.getElementById('coinGameScore');
        if (scoreEl) {
          scoreEl.textContent = `₹${totalPaisaSaved.toFixed(2)}`;
          scoreEl.style.color = totalPaisaSaved >= 0 ? '#10b981' : '#ff416c';
        }
        
        updatePaisaTier(totalPaisaSaved);
        showCoinCatchEffect(itemCenterX, itemCenterY, item.data);
        
        if (item.data.type === 'good') {
          if (item.data.sound === 'chaching' && typeof playChaChing === 'function') {
            playChaChing();
          } else if (typeof playCoin === 'function') {
            playCoin();
          }
          if (player) {
            player.classList.add('saving');
            setTimeout(() => player.classList.remove('saving'), 180);
          }
        } else {
          if (typeof playMegaphone === 'function') playMegaphone();
          if (player) {
            player.classList.add('stung');
            setTimeout(() => player.classList.remove('stung'), 250);
          }
        }
        
        item.el.remove();
        coinItems.splice(i, 1);
        continue;
      }
      
      if (item.y > boardRect.height + 30) {
        item.el.remove();
        coinItems.splice(i, 1);
      }
    }
  }

  function updatePaisaTier(score) {
    const badge = document.getElementById('paisaTierBadge');
    if (!badge) return;
    if (score < 0) {
      badge.textContent = "WEALTH TIER: 🚨 BANKRUPTCY CRISIS (Demanding ₹0.01 UPI Refund)";
      badge.style.background = "rgba(230, 57, 70, 0.35)";
      badge.style.borderColor = "#e63946";
      badge.style.color = "#ff6b6b";
    } else if (score < 1.00) {
      badge.textContent = "WEALTH TIER: Frugal Mortal (Base 1-Paisa Mode)";
      badge.style.background = "rgba(16, 185, 129, 0.15)";
      badge.style.borderColor = "rgba(16, 185, 129, 0.4)";
      badge.style.color = "#10b981";
    } else if (score < 5.00) {
      badge.textContent = "WEALTH TIER: 🥈 Penny Pincher Master (Auto Drivers Crying)";
      badge.style.background = "rgba(67, 233, 123, 0.25)";
      badge.style.borderColor = "#43e97b";
      badge.style.color = "#43e97b";
    } else if (score < 10.00) {
      badge.textContent = "WEALTH TIER: 🥇 ₹0.01 Sovereign Baron (Warren Buffett Is Jealous)";
      badge.style.background = "rgba(249, 203, 40, 0.3)";
      badge.style.borderColor = "#f9cb28";
      badge.style.color = "#f9cb28";
    } else {
      badge.textContent = "WEALTH TIER: 👑 GOD OF THE 1-PAISA COIN (Infinite Ketchup Hoard)";
      badge.style.background = "rgba(255, 215, 0, 0.4)";
      badge.style.borderColor = "#ffd700";
      badge.style.color = "#ffd700";
    }
  }

  function showCoinCatchEffect(x, y, data) {
    const board = document.getElementById('coinGameBoard');
    if (!board) return;
    const floatEl = document.createElement('div');
    floatEl.className = `catch-float ${data.type}`;
    floatEl.textContent = data.label;
    floatEl.style.left = `${x}px`;
    floatEl.style.top = `${y}px`;
    board.appendChild(floatEl);
    setTimeout(() => floatEl.remove(), 700);
  }

  function endCoinGame() {
    coinGameRunning = false;
    clearInterval(coinGameInterval);
    clearInterval(coinTimerInterval);
    
    const startBtn = document.getElementById('coinGameStartBtn');
    const statusEl = document.getElementById('coinGameStatus');
    if (startBtn) {
      startBtn.textContent = 'Save Again';
      startBtn.disabled = false;
    }
    if (statusEl) {
      statusEl.textContent = `Shift Over! Net Wealth Preserved: ₹${totalPaisaSaved.toFixed(2)}`;
    }
    
    if (typeof playChaChing === 'function') playChaChing();
    setTimeout(() => {
      triggerAswiniPrankModal();
    }, 450);
  }

  function triggerAswiniPrankModal() {
    const modal = document.getElementById('aswiniPrankModal');
    const scoreDisp = document.getElementById('aswiniPrankScore');
    const roastDisp = document.getElementById('aswiniPrankRoast');
    
    if (modal) {
      modal.classList.add('active');
      if (scoreDisp) scoreDisp.textContent = `₹${totalPaisaSaved.toFixed(2)} Secured in Secret Locker!`;
      const randomRoast = BANKRUPTCY_ROASTS[Math.floor(Math.random() * BANKRUPTCY_ROASTS.length)];
      if (roastDisp) roastDisp.textContent = `"${randomRoast}"`;
      if (typeof spawnConfetti === 'function') spawnConfetti(35);
    }
  }

  function closeAswiniPrank() {
    const modal = document.getElementById('aswiniPrankModal');
    if (modal) modal.classList.remove('active');
  }

  // 🧮 1-PAISA SAVINGS CALCULATOR LOGIC
  function calculateSavings() {
    const km = parseFloat(document.getElementById('calcKm')?.value || 0);
    const packets = parseFloat(document.getElementById('calcPackets')?.value || 0);
    const splits = parseFloat(document.getElementById('calcSplits')?.value || 0);
    const fans = parseFloat(document.getElementById('calcFans')?.value || 0);

    const total = (km * 2.5) + (packets * 0.5) + (splits * 0.33) + (fans * 1.5);
    const coinsCount = Math.round(total * 100);

    const resultEl = document.getElementById('calcTotalResult');
    const subtextEl = document.getElementById('calcTotalSubtext');

    if (resultEl) resultEl.textContent = `₹${total.toFixed(2)}`;
    if (subtextEl) {
      subtextEl.textContent = `Equivalent to ${coinsCount.toLocaleString()} one-paisa copper coins stored under Aswini's pillow.`;
    }
  }

  // Controls & Initialization
  document.addEventListener('DOMContentLoaded', () => {
    generateAswiniRoast();
    updateDecibelSlider(145);
    calculateSavings();
    
    const board = document.getElementById('coinGameBoard');
    const player = document.getElementById('aswiniPlayer');
    
    if (board && player) {
      const handleMove = (clientX) => {
        const rect = board.getBoundingClientRect();
        let relX = ((clientX - rect.left) / rect.width) * 100;
        relX = Math.max(6, Math.min(94, relX));
        aswiniX = relX;
        player.style.left = `${aswiniX}%`;
      };
      
      board.addEventListener('mousemove', (e) => {
        if (coinGameRunning) handleMove(e.clientX);
      });

      window.addEventListener('mousemove', (e) => {
        if (!coinGameRunning) return;
        const rect = board.getBoundingClientRect();
        if (e.clientY >= rect.top - 60 && e.clientY <= rect.bottom + 60) {
          handleMove(e.clientX);
        }
      });
      
      board.addEventListener('touchmove', (e) => {
        if (coinGameRunning && e.touches.length > 0) {
          e.preventDefault();
          handleMove(e.touches[0].clientX);
        }
      }, { passive: false });
      
      window.addEventListener('keydown', (e) => {
        if (!coinGameRunning) return;
        if (e.key === 'ArrowLeft') {
          aswiniX = Math.max(6, aswiniX - 6);
          player.style.left = `${aswiniX}%`;
        } else if (e.key === 'ArrowRight') {
          aswiniX = Math.min(94, aswiniX + 6);
          player.style.left = `${aswiniX}%`;
        }
      });
    }
  });
