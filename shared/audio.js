// Universal shim for shared/audio.js -> shared/js/audio.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = require('./js/audio.js');
} else if (typeof window !== 'undefined') {
  // If loaded directly as script tag in browser, load audio.js
  const script = document.createElement('script');
  script.src = '/shared/js/audio.js';
  document.head.appendChild(script);
}
