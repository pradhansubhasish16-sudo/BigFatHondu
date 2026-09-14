// =======================================================
// Soumendra Padhy ("Lawyerpady") - Feature Script
// Section 420 Street Counsel, Tareekh Simulator & Roasts
// =======================================================

const PADHY_ROASTS = [
  "Padhy treats client disputes like a Netflix subscription: auto-renewed every month with a brand new hearing date.",
  "If Padhy wins a case early, he considers it personal financial misconduct. Cases must ferment for at least 15 years to yield regular income.",
  "Padhy is constantly lurking outside roadside tea stalls listening for minor arguments: 'Did he call your dog fluffy? That's Section 499 Defamation! Sign here!'",
  "The judge asks: 'Mr. Padhy, any progress on this dispute?' Padhy: 'Milord, my client is still emotionally unprepared. Please grant a hearing in November 2038.'",
  "Hiring Padhy to resolve a 500-rupee boundary wall dispute is how innocent families end up mortgaging their ancestral farmland for three generations.",
  "The biggest victim in any courtroom isn't the accused or the plaintiff — it's Padhy's own client, whose wallet is drained 500 rupees per tareekh.",
  "When Padhy's client asks 'Sir, when will the verdict come?', Padhy wipes away a tear and says: 'Beta, your grandchildren will attend the final hearing. Have faith in the judiciary.'",
  "Padhy has 40 standard excuses memorized for adjournments, ranging from 'The court typist sneezed' to 'Planetary alignment is unfavorable for evidence submission.'",
  "His entire business model is 1% legal knowledge, 99% looking at the judge with puppy eyes and asking: 'Milord, ek date aur mil jaati toh case me jaan aa jaati.'",
  "Other lawyers fight for justice. Padhy fights to keep the hearing calendar booked so his daily cutting chai and samosa budget stays funded.",
  "Bro spotted two neighbors arguing over parking space and showed up 4 minutes later with pre-printed Supreme Court appeal drafts.",
  "Padhy's clients don't get justice; they get an EMI plan for lifetime court appearances.",
  "Whenever a judge threatens to pass an immediate verdict, Padhy dramatically fakes a coughing fit to force a 3-week postponement.",
  "If Padhy was the defense counsel in Mahabharata, the Kurukshetra war would still be adjourned awaiting document verification in Session Court Hastinapur.",
  "Padhy told his client: 'Good news! The judge gave us another date!' Client: 'Sir, this case is about a stolen bicycle from 2012.' Padhy: 'Justice takes time, beta. Pay ₹500 for today.'",
  "Bro doesn't need evidence. Evidence is dangerous because evidence solves cases. And solved cases don't pay monthly consultation fees.",
  "Padhy's definition of a speedy trial is anything concluded within the current geological epoch.",
  "He checks the local police station blotter every morning like it's the stock market looking for prospective victims, sorry, clients.",
  "Padhy once convinced two best friends who accidentally bumped shoulders to sue each other for aggravated emotional distress under Section 323.",
  "When Padhy visits a salon, he asks the barber for an adjournment on the haircut so he can come back for 4 separate billable sessions.",
  "The only thing delayed more than an Indian train during winter fog is a case handled by Soumendra Padhy.",
  "His client said 'I have no more money left.' Padhy immediately drafted an urgent petition to freeze the client's own remaining assets as collateral.",
  "Padhy has requested so many dates in court that the judge's calendar software automatically crashes whenever he approaches the podium.",
  "Soumendra's client thought he was hiring Harvey Specter. Turns out he hired a human 'Tareekh-Generator' who bills by the minute.",
  "Padhy's WhatsApp status: 'Available 24/7 for filing PILs against anyone who hurts your feelings. Nominal daily appearance fee applies.'"
];

let lastPadhyIdx = -1;

function generatePadhyRoast() {
  if (typeof playGavel === 'function') playGavel();
  let next;
  do {
    next = Math.floor(Math.random() * PADHY_ROASTS.length);
  } while (next === lastPadhyIdx && PADHY_ROASTS.length > 1);
  
  lastPadhyIdx = next;
  const text = PADHY_ROASTS[next];
  
  const textEl = document.getElementById('padhyRoastText');
  const cardEl = document.getElementById('padhyRoastCard');
  
  if (cardEl && textEl) {
    cardEl.classList.remove('pop-in');
    void cardEl.offsetWidth;
    cardEl.classList.add('pop-in');
    textEl.textContent = `"${text}"`;
  }
  
  if (typeof spawnConfetti === 'function') spawnConfetti(15);
}

function copyPadhyRoast() {
  const textEl = document.getElementById('padhyRoastText');
  if (!textEl) return;
  const text = textEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById('copyPadhyRoastBtn');
    if (copyBtn) {
      const oldText = copyBtn.textContent;
      copyBtn.textContent = '✅ Copied to Send!';
      if (typeof playGavel === 'function') playGavel();
      setTimeout(() => {
        copyBtn.textContent = oldText;
      }, 2000);
    }
  }).catch(() => {
    alert('Roast: ' + text);
  });
}

function triggerObjection() {
  if (typeof playGavel === 'function') playGavel();
  setTimeout(() => {
    if (typeof playBuzzer === 'function') playBuzzer();
  }, 150);
  if (typeof playVoice === 'function') {
    playVoice("Objection your honor! The opposing counsel is speaking logic, which is completely unconstitutional!", 'padhy');
  } else if (typeof speak === 'function') {
    speak("Objection your honor! The opposing counsel is speaking logic, which is completely unconstitutional!", 'padhy');
  }
  if (typeof spawnConfetti === 'function') spawnConfetti(25);
}

// =======================================================
// THE TAREEKH-O-METER (OUTRAGEOUS EXCUSE GENERATOR)
// =======================================================
const COURT_EXCUSES = [
  "Milord, the opposing lawyer's necktie is color-coordinated to psychologically intimidate my client. Please adjourn till next month.",
  "Milord, the original receipt of the disputed ₹10 samosa is currently undergoing carbon-dating in a Swiss laboratory.",
  "Milord, my client is observing silence every Tuesday and cannot bear the emotional stress of answering questions today.",
  "Milord, I have strong reasons to believe the key witness was replaced by an AI hologram. We require 90 days of forensic research.",
  "Milord, my junior typist typed 'Section 420' in Comic Sans font, making the entire petition constitutionally void today.",
  "Milord, the air conditioner in Courtroom 3 is blowing towards my left ear, creating severe legal turbulence in my arguments.",
  "Milord, planetary alignment between Saturn and Rahu indicates that justice served today will cause an eclipse. Next date please!"
];

let lastExcuseIdx = -1;

function generateAdjournmentExcuse() {
  if (typeof playGavel === 'function') playGavel();
  let next;
  do {
    next = Math.floor(Math.random() * COURT_EXCUSES.length);
  } while (next === lastExcuseIdx && COURT_EXCUSES.length > 1);
  
  lastExcuseIdx = next;
  const excuseText = COURT_EXCUSES[next];
  
  const textEl = document.getElementById('excuseDisplay');
  if (textEl) {
    textEl.textContent = `"${excuseText}"`;
  }
  if (typeof playVoice === 'function') {
    playVoice(excuseText, 'padhy');
  } else if (typeof speak === 'function') {
    speak(excuseText, 'padhy');
  }
}

// =======================================================
// ⚖️ COURTROOM GAME: "TAREEKH PE TAREEKH!"
// =======================================================
let courtGameRunning = false;
let padhyEarnings = 0.00;
let totalTareekhs = 0;
let judgePatience = 100;
let courtTimeLeft = 30;
let courtGameInterval = null;
let courtTimerInterval = null;
let courtItems = [];
let padhyX = 50; // percentage

const COURT_ITEMS = [
  { emoji: '📅', points: 0.50, tareekh: 1, patience: 3, type: 'good', label: '+₹0.50 Next Date!', sound: 'chaching' },
  { emoji: '📅', points: 0.50, tareekh: 1, patience: 3, type: 'good', label: '+₹0.50 Next Date!', sound: 'chaching' },
  { emoji: '📂', points: 0.30, tareekh: 1, patience: 2, type: 'good', label: '+₹0.30 Lost Files Excuse', sound: 'coin' },
  { emoji: '🤒', points: 0.40, tareekh: 1, patience: 2, type: 'good', label: '+₹0.40 Sick Certificate', sound: 'coin' },
  { emoji: '☕', points: 0.20, tareekh: 1, patience: 1, type: 'good', label: '+₹0.20 Chai Break', sound: 'coin' },
  { emoji: '🤝', points: 1.00, tareekh: 2, patience: 8, type: 'good', label: '+₹1.00 New Client Trapped!', sound: 'chaching' },
  
  // Hazards
  { emoji: '🔨', points: -2.00, tareekh: 0, patience: -25, type: 'bad', label: '🚨 VERDICT ATTEMPT! -25%', sound: 'gavel' },
  { emoji: '🚨', points: -1.50, tareekh: 0, patience: -30, type: 'bad', label: '💥 CONTEMPT OF COURT! -30%', sound: 'buzz' },
  { emoji: '🏃', points: -1.00, tareekh: 0, patience: -15, type: 'bad', label: '🏃 CLIENT ESCAPED! -₹1.00', sound: 'buzz' }
];

function startCourtGame() {
  if (courtGameRunning) return;
  courtGameRunning = true;
  padhyEarnings = 0.00;
  totalTareekhs = 0;
  judgePatience = 100;
  courtTimeLeft = 30;
  courtItems = [];
  
  const startBtn = document.getElementById('courtGameStartBtn');
  const earningsEl = document.getElementById('courtGameEarnings');
  const tareekhEl = document.getElementById('courtGameTareekhs');
  const timerEl = document.getElementById('courtGameTimer');
  const statusEl = document.getElementById('courtGameStatus');
  
  if (startBtn) {
    startBtn.textContent = 'Delaying Trial...';
    startBtn.disabled = true;
  }
  if (earningsEl) earningsEl.textContent = '₹0.00';
  if (tareekhEl) tareekhEl.textContent = '0 Dates';
  if (timerEl) timerEl.textContent = '30s';
  if (statusEl) statusEl.textContent = 'Catch 📅 Dates & 🤝 Clients! DODGE 🔨 Final Verdicts & 🚨 Contempt Notices!';
  
  updateJudgePatienceUI();
  
  document.querySelectorAll('.falling-court-item').forEach(el => el.remove());
  
  closeCourtModals();
  
  courtTimerInterval = setInterval(() => {
    courtTimeLeft--;
    if (timerEl) timerEl.textContent = `${courtTimeLeft}s`;
    if (courtTimeLeft <= 0) {
      endCourtGame(true); // Win by timeout (trial successfully delayed!)
    }
  }, 1000);
  
  courtGameInterval = setInterval(courtGameLoop, 35);
  if (typeof playGavel === 'function') playGavel();
}

function updateJudgePatienceUI() {
  const fill = document.getElementById('patienceFill');
  const text = document.getElementById('patienceText');
  judgePatience = Math.max(0, Math.min(100, judgePatience));
  
  if (fill) {
    fill.style.width = `${judgePatience}%`;
    if (judgePatience > 60) {
      fill.style.background = '#10b981';
    } else if (judgePatience > 30) {
      fill.style.background = '#f9cb28';
    } else {
      fill.style.background = '#e63946';
    }
  }
  if (text) text.textContent = `${judgePatience}% Patience`;
}

function courtGameLoop() {
  const board = document.getElementById('courtGameBoard');
  if (!board) return;
  const boardRect = board.getBoundingClientRect();
  
  // Spawn falling items
  if (Math.random() < 0.09 && courtItems.length < 9) {
    const itemData = COURT_ITEMS[Math.floor(Math.random() * COURT_ITEMS.length)];
    const el = document.createElement('div');
    el.className = 'falling-court-item';
    el.textContent = itemData.emoji;
    
    const startX = Math.random() * 85 + 7;
    el.style.left = `${startX}%`;
    el.style.top = '-40px';
    board.appendChild(el);
    
    courtItems.push({
      el: el,
      data: itemData,
      x: startX,
      y: -40,
      speed: 3 + Math.random() * 3.8
    });
  }
  
  const player = document.getElementById('padhyPlayer');
  const playerRadius = 36;
  const playerCenterY = boardRect.height - 10 - playerRadius;
  const playerCenterX = (padhyX / 100) * boardRect.width;
  
  for (let i = courtItems.length - 1; i >= 0; i--) {
    const item = courtItems[i];
    item.y += item.speed;
    item.el.style.top = `${item.y}px`;
    
    const itemCenterX = (item.x / 100) * boardRect.width;
    const itemCenterY = item.y + 20;
    
    const dist = Math.hypot(itemCenterX - playerCenterX, itemCenterY - playerCenterY);
    
    if (dist < playerRadius + 22) {
      padhyEarnings += item.data.points;
      totalTareekhs += item.data.tareekh;
      judgePatience += item.data.patience;
      
      const earningsEl = document.getElementById('courtGameEarnings');
      const tareekhEl = document.getElementById('courtGameTareekhs');
      if (earningsEl) {
        earningsEl.textContent = `₹${padhyEarnings.toFixed(2)}`;
        earningsEl.style.color = padhyEarnings >= 0 ? '#f9cb28' : '#ff416c';
      }
      if (tareekhEl) {
        tareekhEl.textContent = `${totalTareekhs} Dates`;
      }
      
      updateJudgePatienceUI();
      showCourtCatchEffect(itemCenterX, itemCenterY, item.data);
      
      if (item.data.type === 'good') {
        if (typeof playCoin === 'function') playCoin();
        if (player) {
          player.classList.add('delaying');
          setTimeout(() => player.classList.remove('delaying'), 180);
        }
      } else {
        if (item.data.sound === 'gavel' && typeof playGavel === 'function') {
          playGavel();
        } else if (typeof playBuzzer === 'function') {
          playBuzzer();
        }
        if (player) {
          player.classList.add('scolded');
          setTimeout(() => player.classList.remove('scolded'), 250);
        }
      }
      
      item.el.remove();
      courtItems.splice(i, 1);
      
      // Check for lose condition: Judge's patience dropped to 0!
      if (judgePatience <= 0) {
        endCourtGame(false); // Lost: judge kicked Padhy out!
        return;
      }
      continue;
    }
    
    if (item.y > boardRect.height + 30) {
      item.el.remove();
      courtItems.splice(i, 1);
    }
  }
}

function showCourtCatchEffect(x, y, data) {
  const board = document.getElementById('courtGameBoard');
  if (!board) return;
  const floatEl = document.createElement('div');
  floatEl.className = `catch-float ${data.type}`;
  floatEl.textContent = data.label;
  floatEl.style.left = `${x}px`;
  floatEl.style.top = `${y}px`;
  board.appendChild(floatEl);
  setTimeout(() => floatEl.remove(), 700);
}

function endCourtGame(won) {
  courtGameRunning = false;
  clearInterval(courtGameInterval);
  clearInterval(courtTimerInterval);
  
  const startBtn = document.getElementById('courtGameStartBtn');
  const statusEl = document.getElementById('courtGameStatus');
  if (startBtn) {
    startBtn.textContent = 'Adjourn Again';
    startBtn.disabled = false;
  }
  
  if (won) {
    if (statusEl) {
      statusEl.textContent = `SUCCESS: Case Adjourned! Total Fee Extracted: ₹${padhyEarnings.toFixed(2)} across ${totalTareekhs} dates!`;
    }
    if (typeof playChaChing === 'function') playChaChing();
    setTimeout(() => {
      triggerClientVictimWarningModal();
    }, 400);
  } else {
    if (statusEl) {
      statusEl.textContent = `DISMISSED: Judge lost all patience and threw Padhy out of Courtroom 3!`;
    }
    if (typeof playGavel === 'function') playGavel();
    setTimeout(() => {
      if (typeof playBuzzer === 'function') playBuzzer();
      triggerJudgeScoldModal();
    }, 400);
  }
}

// WIN MODAL: Client Exploitation Warning (Billed tiny amount, next client is victim)
function triggerClientVictimWarningModal() {
  const modal = document.getElementById('clientVictimModal');
  const scoreDisp = document.getElementById('victimFeeDisplay');
  const tareekhDisp = document.getElementById('victimTareekhDisplay');
  
  if (modal) {
    modal.classList.add('active');
    if (scoreDisp) scoreDisp.textContent = `Net Hearing Fee Billed: ₹${padhyEarnings.toFixed(2)}`;
    if (tareekhDisp) tareekhDisp.textContent = `${totalTareekhs} Dates Successfully Postponed Till 2042!`;
    if (typeof spawnConfetti === 'function') spawnConfetti(35);
    if (typeof playVoice === 'function') {
      playVoice("Warning! Padhy has billed another client. The next client of Padhy is officially a victim of Padhy!", 'padhy');
    } else if (typeof speak === 'function') {
      speak("Warning! Padhy has billed another client. The next client of Padhy is officially a victim of Padhy!", 'padhy');
    }
  }
}

// LOSE MODAL: Judge Scolds for Wasting Time
function triggerJudgeScoldModal() {
  const modal = document.getElementById('judgeScoldModal');
  if (modal) {
    modal.classList.add('active');
    if (typeof playVoice === 'function') {
      playVoice("Mr. Padhy, stop wasting the court's time! Case dismissed with prejudice!", 'padhy');
    } else if (typeof speak === 'function') {
      speak("Mr. Padhy, stop wasting the court's time! Case dismissed with prejudice!", 'padhy');
    }
  }
}

function closeCourtModals() {
  const m1 = document.getElementById('clientVictimModal');
  const m2 = document.getElementById('judgeScoldModal');
  if (m1) m1.classList.remove('active');
  if (m2) m2.classList.remove('active');
}

// Mouse & Touch Controls
document.addEventListener('DOMContentLoaded', () => {
  generatePadhyRoast();
  generateAdjournmentExcuse();
  
  const board = document.getElementById('courtGameBoard');
  const player = document.getElementById('padhyPlayer');
  
  if (board && player) {
    const handleMove = (clientX) => {
      const rect = board.getBoundingClientRect();
      let relX = ((clientX - rect.left) / rect.width) * 100;
      relX = Math.max(6, Math.min(94, relX));
      padhyX = relX;
      player.style.left = `${padhyX}%`;
    };
    
    board.addEventListener('mousemove', (e) => {
      if (courtGameRunning) handleMove(e.clientX);
    });
    
    board.addEventListener('touchmove', (e) => {
      if (courtGameRunning && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    }, { passive: true });
    
    window.addEventListener('keydown', (e) => {
      if (!courtGameRunning) return;
      if (e.key === 'ArrowLeft') {
        padhyX = Math.max(6, padhyX - 5);
        player.style.left = `${padhyX}%`;
      } else if (e.key === 'ArrowRight') {
        padhyX = Math.min(94, padhyX + 5);
        player.style.left = `${padhyX}%`;
      }
    });
  }
});
