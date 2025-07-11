document.addEventListener('DOMContentLoaded', function () {
  // 1. Typewriter effect for heading
  const heading = document.querySelector('.typewriter');
  if (heading) {
    const text = 'Dear Sister...';
    let i = 0;
    heading.textContent = '';
    heading.style.width = (text.length * 1.1) + 'ch';

    function type() {
      if (i < text.length) {
        heading.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80);
      }
    }
    type();
  }

  // 2. Floating hearts & stars
  createFloatingHearts();
  createTwinklingStars();

  // 3. Set up popups for buttons
  setupPopupButton('galleryBtn', 'galleryPopup');
  setupPopupButton('letterBtn', 'letterPopup', setupLetterPopup);
  setupPopupButton('poemBtn', 'poemPopup', setupPoemPopup);

  // 4. Gallery navigation
  setupGalleryNavigation();

  // 5. Hug popup
  const hugBtn = document.getElementById('hugBtn');
  const hugPopup = document.getElementById('hugPopup');
  if (hugBtn && hugPopup) {
    hugBtn.onclick = () => {
      hugPopup.classList.add('active');
      setTimeout(() => {
        hugPopup.classList.remove('active');
      }, 4100);
    };
  }
});

// Utility to setup popup open/close
function setupPopupButton(btnId, popupId, afterOpenFn) {
  const btn = document.getElementById(btnId);
  const popup = document.getElementById(popupId);
  if (btn && popup) {
    btn.onclick = () => {
      popup.classList.add('active');
      if (afterOpenFn) afterOpenFn();
    };
    const closeBtn = popup.querySelector('.close-popup');
    if (closeBtn) {
      closeBtn.onclick = () => popup.classList.remove('active');
    }
    popup.onclick = function (e) {
      if (e.target === popup) popup.classList.remove('active');
    };
  }
}

// Gallery navigation
function setupGalleryNavigation() {
  const popup = document.getElementById('galleryPopup');
  if (!popup) return;
  const slides = popup.querySelectorAll('.gallery-photo');
  let idx = 0;
  const show = (idxNew) => {
    slides[idx].classList.remove('active');
    idx = (idxNew + slides.length) % slides.length;
    slides[idx].classList.add('active');
  };
  const nextBtn = popup.querySelector('#nextPhoto');
  const prevBtn = popup.querySelector('#prevPhoto');
  if (nextBtn && prevBtn) {
    nextBtn.onclick = () => show(idx + 1);
    prevBtn.onclick = () => show(idx - 1);
  }
}

// Letter popup typewriter
function setupLetterPopup() {
  const popup = document.getElementById('letterPopup');
  if (!popup) return;
  const text = `My dearest,\n\nSome words, I could never say aloud. But I hope you always knew — your courage, your laughter, your love made every day better.\n\nNo matter how old we get, you’ll always be the magic in my world.`;
  const target = popup.querySelector('.letter-typewriter');
  target.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      if (text.charAt(i) === '\n') {
        target.appendChild(document.createElement('br'));
      } else {
        target.textContent += text.charAt(i);
      }
      i++;
      setTimeout(type, 50);
    }
  }
  type();
}

// Poem popup
function setupPoemPopup() {
  const popup = document.getElementById('poemPopup');
  if (!popup) return;
  const lines = [
    "You, in every sunrise — gentle blush and blazing gold.",
    "You, in every rain — the laughter between every drop.",
    "You, in every song — the melody that stays long after the music fades.",
    "You, in every metaphor I’ll ever write."
  ];
  const target = popup.querySelector('.poem-lines');
  target.textContent = '';
  let i = 0;
  function floatLine() {
    if (i < lines.length) {
      const div = document.createElement('div');
      div.textContent = lines[i];
      div.style.opacity = 0;
      div.style.transition = 'opacity 0.6s';
      target.appendChild(div);
      setTimeout(() => div.style.opacity = 1, 40);
      i++;
      setTimeout(floatLine, 1200);
    }
  }
  floatLine();
}

function createFloatingHearts() {
  const heartsCont = document.querySelector('.floating-hearts');
  if (!heartsCont) return;
  heartsCont.innerHTML = '';
  const heartSVG = encodeURIComponent('<svg width="32" height="32" viewBox="0 0 32 32" fill="#f186b5" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 3.5c-2.5 0-4.6 1.7-5.5 4.1C16.1 5.2 14 3.5 11.5 3.5 7.4 3.5 4 6.9 4 11c0 8.6 11.5 15.5 11.5 15.5s11.5-6.9 11.5-15.5c0-4.1-3.4-7.5-7.5-7.5z"/></svg>');
  for (let i = 0; i < 9; i++) {
    const img = document.createElement('img');
    img.src = 'data:image/svg+xml,' + heartSVG;
    img.className = 'heart';
    img.style.left = (12 + Math.random() * 76) + '%';
    img.style.top = (18 + Math.random() * 60) + '%';
    img.style.animationDelay = (Math.random() * 3) + 's';
    img.style.opacity = 0.6 + Math.random() * 0.4;
    heartsCont.appendChild(img);
  }
}

function createTwinklingStars() {
  const starsCont = document.querySelector('.twinkling-stars');
  if (!starsCont) return;
  starsCont.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = (10 + Math.random() * 75) + '%';
    star.style.top = (10 + Math.random() * 80) + '%';
    star.style.animationDelay = (Math.random() * 2.5) + 's';
    star.style.opacity = 0.25 + Math.random() * 0.55;
    starsCont.appendChild(star);
  }
}
