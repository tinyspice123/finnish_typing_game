(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.GameCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function normalize(text) {
    return String(text || "").toLocaleLowerCase("fi-FI").replace(/[^a-zäöå\s]/gi, "").replace(/\s+/g, " ").trim();
  }

  function calculateStats(value, target, elapsedSeconds) {
    const typed = normalize(value);
    const expected = normalize(target);
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === (expected[i] || "")) correct++;
    }
    const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
    const minutes = Math.max(1, elapsedSeconds) / 60;
    return { correct, accuracy: Math.max(0, accuracy), wpm: Math.max(0, Math.round((correct / 5) / minutes)) };
  }

  function identifyMistypedWords(value, target) {
    const typed = normalize(value).split(" ").filter(Boolean);
    const expected = normalize(target).split(" ").filter(Boolean);
    const table = Array.from({ length: typed.length + 1 }, () => Array(expected.length + 1).fill(0));
    for (let i = 1; i <= typed.length; i++) for (let j = 1; j <= expected.length; j++) {
      table[i][j] = typed[i - 1] === expected[j - 1] ? table[i - 1][j - 1] + 1 : Math.max(table[i - 1][j], table[i][j - 1]);
    }
    const matchedExpected = new Set(); let i = typed.length; let j = expected.length;
    while (i && j) {
      if (typed[i - 1] === expected[j - 1]) { matchedExpected.add(j - 1); i--; j--; }
      else if (table[i - 1][j] >= table[i][j - 1]) i--;
      else j--;
    }
    return [...new Set(expected.filter((_, index) => !matchedExpected.has(index)))];
  }

  function sentenceId(sentence, fallbackIndex = 0) {
    if (sentence.id !== undefined && sentence.id !== null) return sentence.id;
    if (!sentence.fi) return fallbackIndex;
    let hash = 2166136261;
    for (const character of sentence.fi) { hash ^= character.charCodeAt(0); hash = Math.imul(hash, 16777619); }
    return `s-${(hash >>> 0).toString(36)}`;
  }

  function buildWeightedPool(sentences, progress, options = {}, random = Math.random) {
    const mode = options.mode || "adaptive";
    const topic = options.topic || "all";
    const records = sentences.map((sentence, index) => ({ id: sentenceId(sentence, index), sentence }));
    let candidates = records;
    if (topic !== "all") candidates = candidates.filter(({ sentence }) => sentence.topic === topic);
    if (mode === "patterns") candidates = candidates.filter(({ sentence }) => sentence.topic === "Vuorovaikutus");
    if (mode === "review") candidates = candidates.filter(({ id }) => progress[id]?.needsPractice);
    if (!candidates.length) return [];
    const pool = [];
    candidates.forEach(({ id }) => {
      const record = progress[id] || {};
      const weight = mode === "adaptive" ? (record.needsPractice ? 4 : record.mastered ? 1 : 2) : 1;
      for (let i = 0; i < weight; i++) pool.push(id);
    });
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }

  function recordSuccess(record = {}) {
    const next = { ...record, attempts: (record.attempts || 0) + 1, correctRuns: (record.correctRuns || 0) + 1 };
    if (next.correctRuns >= 3) { next.needsPractice = false; next.mastered = true; }
    return next;
  }

  function scheduleReview(record = {}, rating = 2, now = new Date()) {
    const quality = Math.max(0, Math.min(3, Number(rating) || 0));
    const previousInterval = Math.max(0, Number(record.interval) || 0);
    const repetitions = quality < 2 ? 0 : (record.repetitions || 0) + 1;
    let interval;
    if (quality < 2) interval = quality === 0 ? 0 : 1;
    else if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 3;
    else interval = Math.max(4, Math.round(previousInterval * (quality === 3 ? 2.4 : 1.7)));
    const due = new Date(now);
    due.setDate(due.getDate() + interval);
    return {
      ...record,
      repetitions,
      interval,
      lastRating: quality,
      reviewedAt: now.toISOString(),
      dueAt: due.toISOString()
    };
  }

  function isReviewDue(record, now = new Date()) {
    return Boolean(record?.dueAt) && new Date(record.dueAt).getTime() <= now.getTime();
  }

  function readinessScore(skillResults = {}) {
    const values = Object.values(skillResults).flatMap((items) => Array.isArray(items) ? items.slice(-5) : []);
    if (!values.length) return 0;
    return Math.round(values.reduce((sum, value) => sum + Math.max(0, Math.min(100, Number(value) || 0)), 0) / values.length);
  }

  function readinessLevel(results = [], minimumAttempts = 3) {
    const recent = Array.isArray(results) ? results.slice(-5) : [];
    if (recent.length < minimumAttempts) return { label: "Not assessed", score: 0, assessed: false };
    const score = readinessScore({ results: recent });
    const label = score >= 80 ? "Strong in practice" : score >= 60 ? "Consistent" : "Developing";
    return { label, score, assessed: true };
  }

  function dateKey(date = new Date()) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  }

  return { normalize, calculateStats, identifyMistypedWords, sentenceId, buildWeightedPool, recordSuccess, scheduleReview, isReviewDue, readinessScore, readinessLevel, dateKey };
});
