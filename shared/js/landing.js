// Landing Page Logic: The Boys Multiverse Hub

const GANG_QUOTES = [
  { text: "Aswini walked 14km to save ₹5 on auto fare, while Hondu was stuck on the sofa waiting for Swiggy to deliver a single samosa.", author: "The Gang Chronicle" },
  { text: "When Hondu and Aswini enter a restaurant together, Aswini asks for the discount code while Hondu pre-orders the entire dessert menu.", author: "Buffet Archives" },
  { text: "If Aswini owes Hondu 50 paise, Padhy will file a 400-page Public Interest Litigation in the High Court of Chai Tapri.", author: "Legal Bakchodi Council" },
  { text: "Hondu's gravity pulls all food into his orbit; Aswini's vocal volume repels all attempts to split the bill.", author: "Theoretical Physics Dept" },
  { text: "In 2019 they were friends. In 2026, they are three distinct gravitational and legal anomalies.", author: "The Boys Multiverse" }
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
