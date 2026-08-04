import { rootChapters } from './glyph-root-data.js';

const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = new URL('./lesson-extension.css?v=water-course-v1', import.meta.url).href;
document.head.appendChild(stylesheet);

const chapter = rootChapters.find((item) => item.id === 'water');
const totalSteps = 8;
const state = {
  step: 1,
  round: 0,
  correct: new Set(),
  mistakes: 0,
  explored: new Set(),
};

function waterPicture() {
  return `
    <svg class="stage-art stage-art-picture" viewBox="0 0 120 180" aria-hidden="true">
      <path d="M52 11C38 35 36 57 48 77C60 97 57 120 41 153C68 137 80 112 70 87C61 64 63 41 78 19C67 23 58 20 52 11Z" />
      <path d="M21 48C12 60 12 74 21 83C30 72 31 59 21 48Z" />
      <path d="M98 37C89 50 89 62 98 72C107 60 107 48 98 37Z" />
      <circle cx="24" cy="111" r="7" />
      <path d="M101 102C94 112 94 122 101 129C109 120 109 110 101 102Z" />
    </svg>`;
}

function waterSeal() {
  return `
    <svg class="stage-art stage-art-seal" viewBox="70 10 260 380" aria-hidden="true">
      <path d="m217.07 152.89c-1.38 8.98-3.3 18.54-4.24 28.2-1.63 16.69-3.46 33.43-3.75 50.17-.46 27.41 3.74 54.06 15.29 79.37 8.71 19.09 19.15 37.14 30 55.02.52.86 1.39 1.73 1.43 2.62.08 2.04.34 4.48-.64 6-.67 1.05-3.36 1.25-5.06 1.08-3.94-.4-6.81-2.38-9.12-5.91-12.47-19.03-23.89-38.62-32.44-59.75-7.88-19.48-13.65-39.52-13.97-60.76-.25-16.78-.95-33.58-.49-50.35.21-7.6 2.79-15.12 4.19-22.7 2.93-15.83 6.43-31.58 8.53-47.52 2.85-21.58.3-42.91-6.28-63.62-3.28-10.33-9.53-18.64-19.44-23.81-3.69-1.93-6.62-4.59-7.15-9.11-.54-4.55 2.23-7.15 6.74-6.38 14.83 2.53 24.47 11.48 30.08 24.92 7.95 19.02 11.92 38.84 10.94 59.56-.37 7.93-.31 15.89-.45 23.84-.07 4.22.47 5.19 4.79 5.31 4.66.13 9.35-.44 14.02-.77 1.11-.08 2.19-.47 3.29-.61 15.83-2.04 19.38-11.91 22.3-24.58 1.54-6.66.46-13.41-1.74-19.83-5.17-15.11-10.57-30.15-15.74-45.26-1.11-3.26-1.79-6.69-2.4-10.09-.42-2.35.22-4.51 2.75-5.51 2.94-1.16 5.73-.39 7.26 2.06 12.39 19.83 20.1 41.42 23.17 64.52 1.6 12.01-.04 23.88-5.63 34.95-5.76 11.4-20.41 19.65-33.16 19.02-7.44-.38-14.94-.08-23.08-.08z" />
      <path d="m134.73 247.85c1.04-25.11 3.34-49.86 10.7-73.95 1-3.28 3.1-4.87 6.1-5.23 2.92-.35 5.72 1.99 6.04 5.57.41 4.62.37 9.36-.13 13.98-2.34 21.68-5.03 43.32-7.32 65-1.4 13.28.78 26.34 3.56 39.27 2.98 13.87 5.97 27.74 9.37 41.51 1.36 5.5 4.17 10.62 5.7 16.09 1.5 5.34 2.3 10.89 3.19 16.38.13.79-.81 2.25-1.61 2.61-6.1 2.77-6.62 2.52-10.36-3.06-6.83-10.18-9.44-21.88-12.12-33.53-3.23-14.05-6.83-28.06-9.03-42.27-2.18-14-2.8-28.24-4.09-42.37z" />
      <path d="m305.21 340.24c-6.7 1.48-10.25-.31-13.04-5.93-10.07-20.26-19.1-40.94-25.6-62.6-2.13-7.09-2.43-14.74-3.38-22.16-2.65-20.86-5.23-41.73-7.77-62.6-.98-8.07-.93-16.06 2.47-23.72.83-1.87 1.84-2.18 3.62-1.53 4.99 1.81 8.13 5.44 8.91 10.48 1.25 8.06 2.05 16.19 2.7 24.33 1.48 18.51 2.5 37.05 4.19 55.53.96 10.53 4.32 20.47 9.07 29.99 7.19 14.42 13.58 29.21 17.23 44.98.98 4.28 1.08 8.76 1.6 13.23z" />
      <path d="m163.63 106.62c-1.12 13.25-3.47 24.49-13.66 32.8-11.37 9.27-22.43 18.9-35.72 25.42-5.99 2.94-12.31 4.63-19.06 4.56-2.57-.03-4.51-.81-4.81-3.54-.28-2.53-.44-5.02 2.51-6.61 12.7-6.84 25.46-13.58 37.92-20.84 10.03-5.84 16.59-14.56 18.43-26.3.29-1.88-.31-3.9-.51-5.86-.01-.1-.11-.19-.15-.3-3.88-12.44-10.04-23.44-19.42-32.7-4.27-4.21-6.33-9.66-5.28-15.96.37-2.22 1.31-3.05 3.33-2.22 2.85 1.17 6.29 1.88 8.3 3.94 10.27 10.53 19.67 21.81 25.04 35.76 1.57 4.12 2.25 8.58 3.08 11.85z" />
    </svg>`;
}

function stageVisual(stage) {
  if (stage.visual === 'water-picture') return waterPicture();
  if (stage.visual === 'water-seal') return waterSeal();
  return `<span class="stage-character" aria-hidden="true">${chapter.char}</span>`;
}

function stageMarkup(stage) {
  return `
    <li class="evolution-stage evolution-stage-${stage.color}">
      <div class="evolution-card" role="img" aria-label="${stage.accessibleLabel}">
        ${stageVisual(stage)}
      </div>
      <span class="stage-label">${stage.label}</span>
    </li>`;
}

function resetLesson() {
  state.step = 1;
  state.round = 0;
  state.correct.clear();
  state.explored.clear();
  state.mistakes = 0;
  renderLesson();
}

function goToStep(step) {
  state.step = step;
  state.round = 0;
  renderLesson();
}

function recordCorrect(key) {
  state.correct.add(key);
}

function showFeedback(screen, type, title, message) {
  const feedback = screen.querySelector('.answer-feedback');
  feedback.className = `answer-feedback answer-feedback-${type}`;
  feedback.hidden = false;
  feedback.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
}

function createShell({ step, eyebrow, title, body, actionLabel = 'Continue', actionDisabled = false, completion = false }) {
  const progress = Math.round((step / totalSteps) * 100);
  const screen = document.createElement('section');
  screen.className = `lesson-screen lesson-step-${step}${completion ? ' lesson-complete' : ''}`;
  screen.setAttribute('aria-labelledby', 'lesson-title');
  screen.innerHTML = `
    <header class="lesson-navigation">
      <button class="lesson-close" type="button" aria-label="Restart lesson">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <div class="lesson-progress" aria-label="Lesson progress: step ${step} of ${totalSteps}">
        <span class="progress-track"><span class="progress-value" style="width: ${progress}%"></span></span>
        <strong>${step} / ${totalSteps}</strong>
      </div>
    </header>
    <main class="lesson-content">
      <p class="lesson-eyebrow">${eyebrow}</p>
      <h1 id="lesson-title" tabindex="-1">${title}</h1>
      <div class="lesson-body">${body}</div>
    </main>
    <footer class="lesson-footer">
      <div class="answer-feedback" role="status" aria-live="polite" hidden></div>
      <button class="primary-action" type="button"${actionDisabled ? ' disabled' : ''}>${actionLabel}</button>
    </footer>`;
  screen.querySelector('.lesson-close').addEventListener('click', resetLesson);
  return screen;
}

function mountScreen(screen) {
  const phoneCard = document.querySelector('.phone-card');
  phoneCard.replaceChildren(screen);
  window.scrollTo(0, 0);
  screen.querySelector('h1')?.focus({ preventScroll: true });
}

function renderEvolution() {
  const screen = createShell({
    step: 1,
    eyebrow: 'MEET THE ROOT · WATER',
    title: chapter.headline,
    body: `
      <ol class="evolution-grid" aria-label="Evolution of the character ${chapter.char}">
        ${chapter.stages.map(stageMarkup).join('')}
      </ol>
      <p class="lesson-note">${chapter.note}</p>`,
  });
  screen.querySelector('.primary-action').addEventListener('click', () => goToStep(2));
  mountScreen(screen);
}

function renderRadicalShift() {
  const question = chapter.radicalQuestion;
  const screen = createShell({
    step: 2,
    eyebrow: 'SHAPE SHIFT',
    title: 'Water gets compact',
    actionLabel: 'Continue',
    actionDisabled: true,
    body: `
      <div class="root-shift" aria-label="水 changes to the water radical 氵">
        <span class="root-shift-full">水</span>
        <svg viewBox="0 0 40 24" aria-hidden="true"><path d="M3 12h31M27 5l7 7-7 7" /></svg>
        <span class="root-shift-compact">氵</span>
      </div>
      <p class="question-prompt">${question.prompt}</p>
      <div class="choice-grid choice-grid-glyph">
        ${question.options.map((option) => `<button class="choice-button choice-glyph" type="button" data-option="${option}">${option}</button>`).join('')}
      </div>`,
  });
  const action = screen.querySelector('.primary-action');
  screen.querySelectorAll('[data-option]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.option === question.answer) {
        button.classList.add('is-correct');
        button.setAttribute('aria-pressed', 'true');
        screen.querySelectorAll('[data-option]').forEach((item) => { item.disabled = true; });
        recordCorrect('radical');
        showFeedback(screen, 'success', 'Correct', question.explanation);
        action.disabled = false;
      } else {
        button.classList.add('is-wrong');
        button.disabled = true;
        state.mistakes += 1;
        showFeedback(screen, 'hint', 'Try again', 'Look for the form made from three water drops.');
      }
    });
  });
  action.addEventListener('click', () => goToStep(3));
  mountScreen(screen);
}

function familyCardMarkup(item) {
  const explored = state.explored.has(item.char);
  return `
    <button class="family-card${explored ? ' is-explored' : ''}" type="button" data-family="${item.char}" aria-expanded="${explored}">
      <span class="family-glyph">${item.char}</span>
      <span class="family-copy"><strong>${item.pinyin}</strong><small>${item.meaning}</small></span>
      <span class="family-toggle" aria-hidden="true">${explored ? '✓' : '+'}</span>
      <span class="family-chunks"${explored ? '' : ' hidden'}>
        ${item.chunks.map((chunk) => `<span><b>${chunk.text}</b><small>${chunk.pinyin} · ${chunk.meaning}</small></span>`).join('')}
      </span>
    </button>`;
}

function renderFamily() {
  const screen = createShell({
    step: 3,
    eyebrow: 'WORD FAMILY',
    title: 'Meet five water characters',
    actionLabel: 'Continue',
    actionDisabled: state.explored.size < chapter.family.length,
    body: `
      <p class="lesson-instruction">Open each character. Notice the same <b>氵</b> clue, then read its two useful word chunks.</p>
      <div class="family-progress"><span>${state.explored.size} / ${chapter.family.length} explored</span></div>
      <div class="family-list">${chapter.family.map(familyCardMarkup).join('')}</div>`,
  });
  const action = screen.querySelector('.primary-action');
  screen.querySelectorAll('[data-family]').forEach((button) => {
    button.addEventListener('click', () => {
      const char = button.dataset.family;
      if (state.explored.has(char)) return;
      state.explored.add(char);
      button.classList.add('is-explored');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('.family-toggle').textContent = '✓';
      button.querySelector('.family-chunks').hidden = false;
      screen.querySelector('.family-progress span').textContent = `${state.explored.size} / ${chapter.family.length} explored`;
      action.disabled = state.explored.size < chapter.family.length;
    });
  });
  action.addEventListener('click', () => goToStep(4));
  mountScreen(screen);
}

function findFamily(char) {
  return chapter.family.find((item) => item.char === char);
}

function findChunk(text) {
  return chapter.family.flatMap((item) => item.chunks).find((chunk) => chunk.text === text);
}

function choiceOptionMarkup(option, mode) {
  if (mode === 'meaning') {
    const item = findFamily(option);
    return `<span class="choice-main choice-main-char">${option}</span><span class="choice-sub">${item?.pinyin || ''}</span>`;
  }
  if (mode === 'word') {
    const chunk = findChunk(option);
    return `<span class="choice-main">${option}</span><span class="choice-sub">${chunk?.pinyin || ''}</span>`;
  }
  return `<span class="choice-main choice-main-sentence">${option}</span>`;
}

function renderChoiceRound({ step, eyebrow, title, questions, mode, nextStep, hint }) {
  const question = questions[state.round];
  const isSentence = mode === 'sentence';
  const screen = createShell({
    step,
    eyebrow: `${eyebrow} · ${state.round + 1} / ${questions.length}`,
    title,
    actionLabel: state.round === questions.length - 1 ? 'Continue' : 'Next question',
    actionDisabled: true,
    body: `
      <div class="round-dots" aria-label="Question ${state.round + 1} of ${questions.length}">
        ${questions.map((_, index) => `<span class="${index < state.round ? 'is-done' : index === state.round ? 'is-current' : ''}"></span>`).join('')}
      </div>
      ${isSentence ? `<div class="sentence-hero"><strong>${question.sentence}</strong><span>${question.pinyin}</span></div>` : ''}
      <p class="question-prompt">${isSentence ? 'Choose the meaning.' : question.prompt}</p>
      <div class="choice-grid${isSentence ? ' choice-grid-text' : ''}">
        ${question.options.map((option) => `<button class="choice-button" type="button" data-option="${option}">${choiceOptionMarkup(option, mode)}</button>`).join('')}
      </div>`,
  });
  const action = screen.querySelector('.primary-action');
  const key = `${mode}-${state.round}`;
  screen.querySelectorAll('[data-option]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.option === question.answer) {
        button.classList.add('is-correct');
        button.setAttribute('aria-pressed', 'true');
        screen.querySelectorAll('[data-option]').forEach((item) => { item.disabled = true; });
        recordCorrect(key);
        showFeedback(screen, 'success', 'Correct', mode === 'meaning' ? `${question.answer} carries the water clue 氵.` : 'That meaning fits.');
        action.disabled = false;
      } else {
        button.classList.add('is-wrong');
        button.disabled = true;
        state.mistakes += 1;
        showFeedback(screen, 'hint', 'Try again', hint);
      }
    });
  });
  action.addEventListener('click', () => {
    if (state.round < questions.length - 1) {
      state.round += 1;
      renderLesson();
    } else {
      goToStep(nextStep);
    }
  });
  mountScreen(screen);
}

function renderMeaningQuiz() {
  renderChoiceRound({
    step: 4,
    eyebrow: 'MEANING CHECK',
    title: 'Read the idea',
    questions: chapter.meaningQuestions,
    mode: 'meaning',
    nextStep: 5,
    hint: 'Think back to the English meaning you just opened.',
  });
}

function renderWordQuiz() {
  renderChoiceRound({
    step: 5,
    eyebrow: 'USEFUL WORDS',
    title: 'Choose the word chunk',
    questions: chapter.wordQuestions,
    mode: 'word',
    nextStep: 6,
    hint: 'Look for the character you learned in the water family.',
  });
}

function renderSentenceQuiz() {
  renderChoiceRound({
    step: 6,
    eyebrow: 'IN CONTEXT',
    title: 'Read a real sentence',
    questions: chapter.sentenceQuestions,
    mode: 'sentence',
    nextStep: 7,
    hint: 'Use the water-family word as your first clue.',
  });
}

function renderBuildRound() {
  const question = chapter.buildQuestions[state.round];
  const selected = [];
  let solved = false;
  const screen = createShell({
    step: 7,
    eyebrow: `BUILD A SENTENCE · ${state.round + 1} / ${chapter.buildQuestions.length}`,
    title: 'Put the sentence in order',
    actionLabel: 'Check answer',
    actionDisabled: true,
    body: `
      <div class="round-dots" aria-label="Sentence ${state.round + 1} of ${chapter.buildQuestions.length}">
        ${chapter.buildQuestions.map((_, index) => `<span class="${index < state.round ? 'is-done' : index === state.round ? 'is-current' : ''}"></span>`).join('')}
      </div>
      <p class="question-prompt">${question.prompt}</p>
      <div class="sentence-tray" aria-label="Your sentence"><span class="tray-placeholder">Tap the tiles below</span></div>
      <div class="token-bank" aria-label="Available words"></div>`,
  });
  const tray = screen.querySelector('.sentence-tray');
  const bank = screen.querySelector('.token-bank');
  const action = screen.querySelector('.primary-action');

  function updateBuilder() {
    tray.innerHTML = selected.length
      ? selected.map((token, index) => `<button type="button" class="word-token is-selected" data-remove="${index}">${token}</button>`).join('')
      : '<span class="tray-placeholder">Tap the tiles below</span>';
    bank.innerHTML = question.tokens
      .filter((token) => !selected.includes(token))
      .map((token) => `<button type="button" class="word-token" data-add="${token}">${token}</button>`).join('');
    if (!solved) action.disabled = selected.length !== question.answer.length;
    tray.querySelectorAll('[data-remove]').forEach((button) => {
      button.addEventListener('click', () => {
        selected.splice(Number(button.dataset.remove), 1);
        updateBuilder();
      });
    });
    bank.querySelectorAll('[data-add]').forEach((button) => {
      button.addEventListener('click', () => {
        selected.push(button.dataset.add);
        updateBuilder();
      });
    });
  }

  action.addEventListener('click', () => {
    if (solved) {
      if (state.round < chapter.buildQuestions.length - 1) {
        state.round += 1;
        renderLesson();
      } else {
        goToStep(8);
      }
      return;
    }
    if (selected.join('|') === question.answer.join('|')) {
      solved = true;
      recordCorrect(`build-${state.round}`);
      tray.classList.add('is-correct');
      tray.querySelectorAll('button').forEach((button) => { button.disabled = true; });
      showFeedback(screen, 'success', 'Great sentence', `${question.answer.join('')}。`);
      action.textContent = state.round === chapter.buildQuestions.length - 1 ? 'See results' : 'Next sentence';
      action.disabled = false;
    } else {
      state.mistakes += 1;
      tray.classList.add('is-wrong');
      window.setTimeout(() => tray.classList.remove('is-wrong'), 300);
      showFeedback(screen, 'hint', 'Try another order', 'Start with who is acting, then add time or action.');
    }
  });
  updateBuilder();
  mountScreen(screen);
}

function renderCompletion() {
  try {
    window.localStorage.setItem('glyph-lab-water-complete', new Date().toISOString());
  } catch {
    // Completion still works when storage is unavailable.
  }
  const accuracy = Math.round((state.correct.size / (state.correct.size + state.mistakes || 1)) * 100);
  const screen = createShell({
    step: 8,
    eyebrow: 'LESSON COMPLETE',
    title: 'You unlocked the water family',
    actionLabel: 'Practice again',
    completion: true,
    body: `
      <div class="completion-mark" aria-hidden="true">水</div>
      <p class="completion-copy">You followed water from a picture to <b>水</b>, recognized <b>氵</b>, learned five characters, and used them in sentences.</p>
      <div class="result-grid">
        <div><strong>${state.correct.size}</strong><span>checks completed</span></div>
        <div><strong>${accuracy}%</strong><span>practice accuracy</span></div>
      </div>
      <div class="learned-family" aria-label="Characters learned">
        ${chapter.family.map((item) => `<span><b>${item.char}</b><small>${item.meaning}</small></span>`).join('')}
      </div>`,
  });
  screen.querySelector('.primary-action').addEventListener('click', resetLesson);
  mountScreen(screen);
}

function renderLesson() {
  document.title = `Water Root · ${state.step} / ${totalSteps} — Glyph Lab`;
  if (state.step === 1) return renderEvolution();
  if (state.step === 2) return renderRadicalShift();
  if (state.step === 3) return renderFamily();
  if (state.step === 4) return renderMeaningQuiz();
  if (state.step === 5) return renderWordQuiz();
  if (state.step === 6) return renderSentenceQuiz();
  if (state.step === 7) return renderBuildRound();
  return renderCompletion();
}

function mountRootCourse() {
  const phoneCard = document.querySelector('.phone-card');
  if (!phoneCard || phoneCard.dataset.rootCourseMounted || !chapter) return false;
  phoneCard.dataset.rootCourseMounted = 'true';
  document.documentElement.classList.add('root-course-active');
  renderLesson();
  return true;
}

function mountAfterHydration(attempt = 0) {
  if (window.__VINEXT_HYDRATED_AT || attempt >= 40) {
    requestAnimationFrame(mountRootCourse);
    return;
  }
  window.setTimeout(() => mountAfterHydration(attempt + 1), 50);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => mountAfterHydration(), { once: true });
} else {
  mountAfterHydration();
}
