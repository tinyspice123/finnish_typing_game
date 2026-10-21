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
    if (options.level && options.level !== "all") candidates = candidates.filter(({ sentence }) => sentence.level === options.level);
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

  const learningSkills = ["reading", "listening", "writing", "speaking"];
  function createLearningAttempt(history, input, now = new Date()) {
    const supported = Boolean(input.supported);
    const reviewSource = ["objective", "tutor"].includes(input.reviewSource) ? input.reviewSource : "self";
    const success = reviewSource !== "self" && typeof input.success === "boolean" ? input.success : null;
    const sourceId = input.sourceId || input.taskId;
    const prior = history.filter(item => item.skill === input.skill && item.sourceId === sourceId);
    const earlier = history.filter(item => item.skill === input.skill && item.unitId === input.unitId && item.unitId);
    const delayed = success === true && !supported && earlier.some(item => item.success === true && !item.supported && item.taskId !== input.taskId && item.sourceId !== sourceId && now.getTime() - Date.parse(item.at) >= 86400000);
    return { id: input.id || `${now.getTime()}-${history.length}`, taskId: input.taskId, sourceId: input.sourceId || input.taskId,
      unitId: input.unitId || null, variant: input.variant || 0, skill: input.skill, at: now.toISOString(),
      supported, unseen: input.unseen !== false && !prior.length, type: input.type || "practice", reviewSource, success, delayed,
      difficulty: input.difficulty === "hard" ? "hard" : "okay" };
  }

  function summarizeEvidence(attempts = []) {
    return Object.fromEntries(learningSkills.map(skill => {
      const items = attempts.filter(item => item.skill === skill);
      return [skill, { attempts: items.length, sources: new Set(items.map(item => item.sourceId)).size,
        unseen: items.filter(item => item.unseen).length, supported: items.filter(item => item.supported).length,
        independent: items.filter(item => !item.supported).length, delayed: items.filter(item => item.delayed && item.success === true && !item.supported).length,
        reviewed: items.filter(item => item.reviewSource === "tutor").length }];
    }));
  }

  function learningReview(attempts, unitId, now = new Date()) {
    const items = attempts.filter(item => item.unitId === unitId);
    if (!items.length) return null;
    const last = items[items.length - 1];
    const needsHelp = last.supported || last.success === false || last.difficulty === "hard";
    const days = needsHelp || last.success === null ? 1 : last.delayed ? 7 : 3;
    const dueAt = new Date(Date.parse(last.at) + days * 86400000).toISOString();
    return { dueAt, due: Date.parse(dueAt) <= now.getTime(), reason: needsHelp ? "Revisit after difficulty or support" : last.success === null ? "Check your independent response on another day" : "Retrieve with changed details after a delay" };
  }

  function suggestLearning(units, attempts, completed = {}, now = new Date()) {
    const due = units.map(unit => ({ unit, review: learningReview(attempts, unit.id, now) })).filter(item => item.review?.due).sort((a, b) => Date.parse(a.review.dueAt) - Date.parse(b.review.dueAt));
    if (due.length) return { unitId: due[0].unit.id, step: 6, reason: due[0].review.reason };
    const next = units.find(unit => !completed[unit.id]);
    return next ? { unitId: next.id, step: 0, reason: "Next practical unit in the course sequence" } : { unitId: units[0]?.id, step: 6, reason: "Course visited: practise a changed scenario to check transfer" };
  }

  function migrateBridgeProgress(saved, ids) {
    const migrated = { completed: {}, drafts: {} };
    ids.forEach((id, index) => {
      if (saved?.[`done-${index}`]) migrated.completed[id] = true;
      if (typeof saved?.[`draft-${index}`] === "string") migrated.drafts[`${id}:4:0`] = saved[`draft-${index}`];
    });
    return migrated;
  }

  return { normalize, calculateStats, identifyMistypedWords, sentenceId, buildWeightedPool, recordSuccess, scheduleReview, isReviewDue, readinessScore, readinessLevel, dateKey, createLearningAttempt, summarizeEvidence, learningReview, suggestLearning, migrateBridgeProgress };
});
