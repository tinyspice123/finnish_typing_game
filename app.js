const sentences = [
  { fi: "Aurinko paistaa ja linnut laulavat.", en: "The sun is shining and the birds are singing." },
  { fi: "Haluaisin kupin kahvia, kiitos.", en: "I would like a cup of coffee, please." },
  { fi: "Missä on lähin rautatieasema?", en: "Where is the nearest railway station?" },
  { fi: "Tänään on hyvä päivä oppia jotain uutta.", en: "Today is a good day to learn something new." },
  { fi: "Kävelen mielelläni metsässä sateen jälkeen.", en: "I like walking in the forest after the rain." },
  { fi: "Voisitko puhua hieman hitaammin?", en: "Could you speak a little more slowly?" },
  { fi: "Suomen kesä on lyhyt mutta valoisa.", en: "The Finnish summer is short but bright." },
  { fi: "Ystäväni asuu pienessä talossa järven rannalla.", en: "My friend lives in a small house by the lake." },
  { fi: "Aamulla luen uutiset ja syön aamupalaa.", en: "In the morning I read the news and eat breakfast." },
  { fi: "Bussi saapuu pysäkille kymmenen minuutin kuluttua.", en: "The bus arrives at the stop in ten minutes." },
  { fi: "Harjoitus tekee mestarin.", en: "Practice makes perfect." },
  { fi: "Nähdään huomenna samaan aikaan!", en: "See you tomorrow at the same time!" }
];

const $ = (selector) => document.querySelector(selector);
const elements = {
  sentence: $("#sentence"), translation: $("#translation"), translationWrap: $("#translationWrap"),
  translationButton: $("#translationButton"), translationButtonLabel: $("#translationButtonLabel"),
  speakButton: $("#speakButton"), shuffleButton: $("#shuffleButton"), input: $("#typingInput"),
  inputWrap: $("#inputWrap"), feedback: $("#feedback"), progress: $("#progressBar"),
  wpm: $("#wpm"), accuracy: $("#accuracy"), time: $("#time"), streak: $("#streak"),
  round: $("#roundNumber"), total: $("#roundTotal"), completed: $("#completedCount"),
  bestWpm: $("#bestWpm"), reset: $("#resetButton")
};

let order = shuffle([...Array(sentences.length).keys()]);
let roundIndex = 0;
let startedAt = null;
let timerId = null;
let completed = 0;
let streak = 0;
let bestWpm = Number(localStorage.getItem("nappara-best-wpm")) || 0;
let locked = false;

elements.total.textContent = String(sentences.length).padStart(2, "0");
elements.bestWpm.textContent = bestWpm;

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function normalized(text) {
  return text.toLocaleLowerCase("fi-FI").replace(/[^a-zäöå\s]/gi, "").replace(/\s+/g, " ").trim();
}

function current() { return sentences[order[roundIndex]]; }

function renderSentence(value = "") {
  const target = current().fi;
  elements.sentence.replaceChildren(...[...target].map((character, i) => {
    const span = document.createElement("span");
    span.textContent = character;
    if (i < value.length) span.className = normalized(value[i]) === normalized(character) ? "correct" : "incorrect";
    else if (i === value.length) span.className = "current";
    return span;
  }));
}

function loadRound() {
  locked = false;
  startedAt = null;
  clearInterval(timerId);
  timerId = null;
  elements.input.value = "";
  elements.input.disabled = false;
  elements.inputWrap.classList.remove("complete");
  elements.feedback.textContent = "Timer starts with your first keystroke.";
  elements.feedback.className = "";
  elements.progress.style.width = "0%";
  elements.wpm.textContent = "0";
  elements.accuracy.textContent = "100";
  elements.time.textContent = "0:00";
  elements.round.textContent = String(roundIndex + 1).padStart(2, "0");
  elements.translation.textContent = current().en;
  renderSentence();
  elements.input.focus();
}

function formatTime(seconds) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`; }

function updateStats() {
  if (!startedAt) return;
  const elapsedSeconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
  const value = elements.input.value;
  const target = current().fi;
  let correct = 0;
  for (let i = 0; i < value.length; i++) if (normalized(value[i]) === normalized(target[i] || "")) correct++;
  const accuracy = value.length ? Math.round((correct / value.length) * 100) : 100;
  const wpm = Math.round((correct / 5) / (elapsedSeconds / 60));
  elements.time.textContent = formatTime(elapsedSeconds);
  elements.accuracy.textContent = Math.max(0, accuracy);
  elements.wpm.textContent = Math.max(0, wpm);
  elements.progress.style.width = `${Math.min(100, (normalized(value).length / normalized(target).length) * 100)}%`;
}

function completeRound() {
  if (locked) return;
  locked = true;
  clearInterval(timerId);
  updateStats();
  const roundWpm = Number(elements.wpm.textContent);
  completed++;
  streak++;
  bestWpm = Math.max(bestWpm, roundWpm);
  localStorage.setItem("nappara-best-wpm", String(bestWpm));
  elements.completed.textContent = completed;
  elements.streak.textContent = streak;
  elements.bestWpm.textContent = bestWpm;
  elements.progress.style.width = "100%";
  elements.inputWrap.classList.add("complete");
  elements.feedback.textContent = "Hyvä! Press Enter for the next sentence.";
  elements.feedback.className = "success";
  if (navigator.vibrate) navigator.vibrate(35);
}

function nextRound() {
  roundIndex++;
  if (roundIndex >= order.length) { order = shuffle(order); roundIndex = 0; }
  loadRound();
}

elements.input.addEventListener("input", () => {
  if (!startedAt && elements.input.value.length) {
    startedAt = Date.now();
    timerId = setInterval(updateStats, 500);
  }
  renderSentence(elements.input.value);
  updateStats();
  if (normalized(elements.input.value) === normalized(current().fi)) completeRound();
});

elements.input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); if (locked) nextRound(); }
});

elements.translationButton.addEventListener("click", () => {
  const willShow = elements.translationWrap.hidden;
  elements.translationWrap.hidden = !willShow;
  elements.translationButton.setAttribute("aria-expanded", String(willShow));
  elements.translationButtonLabel.textContent = willShow ? "Hide translation" : "Show translation";
});

elements.speakButton.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) { elements.feedback.textContent = "Speech is not supported by this browser."; return; }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(current().fi);
  utterance.lang = "fi-FI";
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find((voice) => voice.lang.toLowerCase().startsWith("fi")) || null;
  utterance.rate = 0.88;
  utterance.onstart = () => elements.speakButton.classList.add("speaking");
  utterance.onend = utterance.onerror = () => elements.speakButton.classList.remove("speaking");
  speechSynthesis.speak(utterance);
});

elements.shuffleButton.addEventListener("click", () => { streak = 0; elements.streak.textContent = streak; nextRound(); });
elements.reset.addEventListener("click", () => {
  completed = 0; streak = 0; roundIndex = 0; order = shuffle(order);
  elements.completed.textContent = "0"; elements.streak.textContent = "0"; loadRound();
});

loadRound();
