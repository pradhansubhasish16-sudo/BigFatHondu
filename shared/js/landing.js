// Landing Page Logic: The Boys Multiverse Hub

const GANG_QUOTES = [
  { 
    text: "When the three go out for dinner: Hondu orders food for 8 people, Aswini calculates the bill split down to 17 paise, and Padhy files an urgent stay order against the waiter to delay payment until next financial year.", 
    author: "Culinary Tribunal Archives" 
  },
  { 
    text: "When they ride in an auto-rickshaw together: Hondu collapses the rear shock absorbers, Aswini yells out the window to save a ₹5 shortcut fare, and Padhy threatens the driver with a High Court lawsuit for reckless acceleration.", 
    author: "Urban Transit Commission" 
  },
  { 
    text: "Hondu accidentally inhaled Aswini's samosa. Aswini called a press conference demanding repayment of ₹7.50 with compounding interest. Padhy took the case on contingency and has secured 42 consecutive hearing adjournments.", 
    author: "Supreme Court of Samosas" 
  },
  { 
    text: "The gang WhatsApp group operates on strict physics: Hondu only sends food photos, Aswini only sends UPI payment reminders, and Padhy sends 14-page PDF legal notices whenever someone leaves him on read.", 
    author: "Telecom Regulatory Authority" 
  },
  { 
    text: "On a road trip: Hondu stops every 15 kilometers for a dhaba buffet, Aswini turns off the car AC to save 0.2% fuel, and Padhy drafts a public interest litigation against the highway authority for every single pothole.", 
    author: "Highway Patrol Gazette" 
  },
  { 
    text: "If the three were stranded on a deserted island: Hondu would eat the entire coconut supply by sunset, Aswini would demand 50 paise royalty per shell, and Padhy would form a provisional government to tax both of them.", 
    author: "Survival Economics Journal" 
  },
  { 
    text: "When splitting a ₹30 cutting chai bill: Aswini demands 33 paise change, Padhy bills both of them ₹500 for legal dispute mediation, and Hondu orders 4 more bun maskas to keep the conversation going.", 
    author: "Tapri Financial Times" 
  },
  { 
    text: "Aswini walked 18km in 44°C heat to save ₹5 on auto fare, Hondu spent ₹800 on Swiggy delivery for a ₹40 dessert, and Padhy found a way to make the delivery guy his permanent client.", 
    author: "The Grand Paradox" 
  },
  { 
    text: "NASA confirmed three celestial objects in close proximity: a supermassive gravitational black hole named Hondu, an ultrasonic acoustic pulsar named Aswini, and an infinite event-horizon delay named Padhy.", 
    author: "Astrophysical Journal" 
  },
  { 
    text: "If Padhy ever successfully wins a case, Aswini will audit his fee down to the last rupee, and Hondu will immediately celebrate by bankrupting an all-you-can-eat barbecue buffet.", 
    author: "The Boys Chronicle" 
  },
  { 
    text: "Aswini once tried to charge Hondu ₹2 rent for sitting on his sofa. Padhy immediately filed an eviction notice, and Hondu simply refused to move because the sofa had permanently molded to his gravitational footprint.", 
    author: "Real Estate Bakchodi Council" 
  },
  { 
    text: "In 2019 they were normal friends. In 2026, they are three distinct gravitational, legal, and financial anomalies classified by the Ministry of Science.", 
    author: "The Boys Multiverse" 
  },
  {
    text: "At a movie theater: Hondu finishes the large tub of popcorn during the opening credits, Aswini sneaks in home-cooked rice in his socks to save ₹20, and Padhy threatens the cinema manager with an antitrust lawsuit over ticket prices.",
    author: "Box Office Investigation Dept"
  },
  {
    text: "Hondu's jawline was reported missing in 2021. Aswini refused to fund the search party because the poster printing cost 40 paise per copy, while Padhy took a retainership fee to postpone the investigation indefinitely.",
    author: "Cold Case Files"
  }
];

let lastGangIdx = -1;

function rollGangQuote() {
  if (typeof playTaDa === 'function') playTaDa();
  let next;
  do {
    next = Math.floor(Math.random() * GANG_QUOTES.length);
  } while (next === lastGangIdx && GANG_QUOTES.length > 1);
  
  lastGangIdx = next;
  const quote = GANG_QUOTES[next];
  
  const textEl = document.getElementById('gangQuoteText');
  const authorEl = document.getElementById('gangQuoteAuthor');
  const boxEl = document.getElementById('gangQuoteBox');
  
  if (boxEl && textEl && authorEl) {
    boxEl.classList.remove('pop-in');
    void boxEl.offsetWidth;
    boxEl.classList.add('pop-in');
    textEl.textContent = `"${quote.text}"`;
    authorEl.textContent = `— ${quote.author}`;
  }
  
  if (typeof spawnConfetti === 'function') spawnConfetti(15);
}

function speakCurrentGangQuote() {
  const textEl = document.getElementById('gangQuoteText');
  if (textEl) {
    const text = textEl.textContent.replace(/^"|"$/g, '');
    const chars = ['hondu', 'aswini', 'padhy'];
    const char = (lastGangIdx >= 0 && chars[lastGangIdx % chars.length]) || 'hondu';
    if (typeof playVoice === 'function') {
      playVoice(text, char);
    } else if (typeof speak === 'function') {
      speak(text, char);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  rollGangQuote();
});
