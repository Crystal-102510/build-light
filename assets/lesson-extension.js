import { commonPictureRoots, lessonRoots } from './glyph-root-data.js';

const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = new URL('./lesson-extension.css', import.meta.url).href;
document.head.appendChild(stylesheet);

function makeStage(label, content, className = '') {
  const stage = document.createElement('div');
  stage.className = `evolution-stage ${className}`;
  stage.innerHTML = `<span class="stage-label">${label}</span><div class="stage-glyph">${content}</div>`;
  return stage;
}

function makeRootLesson(root) {
  const card = document.createElement('article');
  card.className = `root-story root-${root.picture}`;

  const heading = document.createElement('div');
  heading.className = 'root-story-heading';
  heading.innerHTML = `<div class="root-badge">${root.char}</div><div><h3>${root.title}</h3><p>${root.meaning} · ${root.pinyin}</p></div>`;

  const timeline = document.createElement('div');
  timeline.className = 'evolution-strip';
  timeline.setAttribute('aria-label', `${root.char} evolution from picture to modern character`);
  timeline.append(
    makeStage('PICTURE', `<span class="picture-mark ${root.picture}"></span>`),
    makeStage('ORACLE BONE', `<span class="oracle-mark ${root.picture}"></span>`, 'oracle-stage'),
    makeStage('CLERICAL', root.char, 'clerical-stage'),
    makeStage('TODAY', root.char, 'modern-stage'),
  );

  const copy = document.createElement('p');
  copy.className = 'root-explanation';
  copy.textContent = root.explanation;

  const hook = document.createElement('p');
  hook.className = 'memory-hook';
  hook.innerHTML = `<b>Memory hook</b><span>${root.hook}</span>`;

  card.append(heading, timeline, copy, hook);
  return card;
}

function enhanceObserve(screen) {
  if (screen.querySelector('.root-memory')) return;
  const meaningGrid = screen.querySelector('.meaning-grid');
  const ideaBox = screen.querySelector('.idea-box');
  if (!meaningGrid || !ideaBox) return;

  const section = document.createElement('section');
  section.className = 'root-memory';
  section.innerHTML = `<div class="section-kicker">REMEMBER THE ROOTS</div><h3>Find the picture inside each character</h3><p class="section-intro">These are teaching sketches: ancient forms varied, but the visual idea stayed recognizable.</p>`;
  lessonRoots.forEach((root) => section.appendChild(makeRootLesson(root)));

  const bridge = document.createElement('aside');
  bridge.className = 'clerical-note';
  bridge.innerHTML = `<b>Why the clerical step matters</b><p>Clerical script flattened curves and regularized strokes. It is the bridge where picture-like ancient writing starts to look like the characters used today.</p>`;
  section.appendChild(bridge);
  meaningGrid.after(section);

  ideaBox.querySelector('p').textContent = '日 and 月 began as pictures. Their shapes became easier to write, then joined to build 明 — bright.';
}

function enhanceComplete(screen) {
  if (screen.querySelector('.root-library')) return;
  const unlockCard = screen.querySelector('.unlock-card');
  if (!unlockCard) return;

  const library = document.createElement('details');
  library.className = 'root-library';
  library.innerHTML = `<summary><span><b>20 picture-roots to explore</b><small>Start with shapes you can see and remember</small></span><i>＋</i></summary>`;

  const caution = document.createElement('p');
  caution.className = 'library-note';
  caution.textContent = 'A root can change shape inside a larger character, and not every repeated shape keeps exactly the same meaning.';

  const grid = document.createElement('div');
  grid.className = 'root-grid';
  commonPictureRoots.forEach((root) => {
    const item = document.createElement('article');
    item.className = 'root-chip';
    item.innerHTML = `<span class="root-icon">${root.icon}</span><div><b>${root.char}</b><small>${root.pinyin} · ${root.meaning}</small><em>${root.examples}</em>${root.note ? `<p>${root.note}</p>` : ''}</div>`;
    grid.appendChild(item);
  });

  library.append(caution, grid);
  unlockCard.after(library);
  library.addEventListener('toggle', () => {
    const icon = library.querySelector('summary i');
    icon.textContent = library.open ? '−' : '＋';
  });
}

function enhanceCurrentScreen() {
  const screen = document.querySelector('.phone-card .screen');
  if (!screen) return;
  if (screen.querySelector('.meaning-grid')) enhanceObserve(screen);
  if (screen.querySelector('.complete-screen, .medal')) enhanceComplete(screen);
}

let queued = false;
const observer = new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    enhanceCurrentScreen();
  });
});

observer.observe(document.body, { childList: true, subtree: true });
enhanceCurrentScreen();
