const test = require("node:test");
const assert = require("node:assert/strict");
const { normalize, calculateStats, identifyMistypedWords, sentenceId, buildWeightedPool, recordSuccess, scheduleReview, isReviewDue, readinessScore, readinessLevel, dateKey } = require("../game-core.js");

test("easy difficulty excludes harder sentences while preserving topic and review filters", () => {
  const bank = [{ id: "easy", level: "starter", topic: "Tausta" }, { id: "hard", topic: "Tausta" }, { id: "other", level: "starter", topic: "Terveys" }];
  assert.deepEqual(buildWeightedPool(bank, {}, { level: "starter", topic: "Tausta", mode: "listening" }), ["easy"]);
  assert.deepEqual(buildWeightedPool(bank, { hard: { needsPractice: true } }, { level: "starter", mode: "review" }), []);
  assert.equal(new Set(buildWeightedPool(bank, {}, { level: "all" })).size, 3);
});

test("normalize ignores punctuation, capitalization, and extra whitespace", () => {
  assert.equal(normalize("  Hyvää, PÄIVÄÄ! "), "hyvää päivää");
  assert.equal(normalize("Missä on asema?"), normalize("missä on asema"));
});

test("calculateStats reports perfect accuracy and conventional WPM", () => {
  const stats = calculateStats("abcde", "abcde", 60);
  assert.deepEqual(stats, { correct: 5, accuracy: 100, wpm: 1 });
});

test("calculateStats ignores optional punctuation", () => {
  const stats = calculateStats("Missä on asema", "Missä on asema?", 60);
  assert.equal(stats.accuracy, 100);
  assert.equal(stats.correct, 14);
});

test("calculateStats counts incorrect characters", () => {
  const stats = calculateStats("abxde", "abcde", 60);
  assert.equal(stats.correct, 4);
  assert.equal(stats.accuracy, 80);
});

test("identifyMistypedWords returns unique expected words", () => {
  assert.deepEqual(identifyMistypedWords("minä olen hyvä", "minä olen täällä"), ["täällä"]);
  assert.deepEqual(identifyMistypedWords("väärä väärä", "oikea oikea"), ["oikea"]);
});

test("mistake alignment does not cascade after an inserted word", () => {
  assert.deepEqual(identifyMistypedWords("olen todella asunut suomessa", "olen asunut suomessa"), []);
  assert.deepEqual(identifyMistypedWords("olen suomessa", "olen asunut suomessa"), ["asunut"]);
});

test("sentence IDs remain stable when the bank is reordered", () => {
  const sentence = { fi: "Olen asunut Suomessa.", topic: "Tausta" };
  assert.equal(sentenceId(sentence, 0), sentenceId(sentence, 999));
});

test("adaptive pool weights needs-practice items more heavily", () => {
  const items = [{ topic: "A" }, { topic: "A" }, { topic: "B" }];
  const pool = buildWeightedPool(items, { 0: { needsPractice: true }, 1: { mastered: true } }, { mode: "adaptive", topic: "all" }, () => 0.99);
  assert.equal(pool.filter((id) => id === 0).length, 4);
  assert.equal(pool.filter((id) => id === 1).length, 1);
  assert.equal(pool.filter((id) => id === 2).length, 2);
});

test("review and topic modes filter the pool", () => {
  const items = [{ topic: "A" }, { topic: "B" }, { topic: "Vuorovaikutus" }];
  assert.deepEqual(buildWeightedPool(items, { 1: { needsPractice: true } }, { mode: "review", topic: "all" }, () => 0.5), [1]);
  assert.ok(buildWeightedPool(items, {}, { mode: "adaptive", topic: "A" }, () => 0.5).every((id) => id === 0));
  assert.ok(buildWeightedPool(items, {}, { mode: "patterns", topic: "all" }, () => 0.5).every((id) => id === 2));
});

test("three successful reviews master a sentence and clear its flag", () => {
  let record = { needsPractice: true, correctRuns: 0 };
  record = recordSuccess(record); record = recordSuccess(record); record = recordSuccess(record);
  assert.equal(record.mastered, true);
  assert.equal(record.needsPractice, false);
  assert.equal(record.attempts, 3);
});

test("spaced review grows intervals after successful recall", () => {
  const now = new Date("2026-01-01T12:00:00Z");
  const first = scheduleReview({}, 3, now);
  const second = scheduleReview(first, 3, now);
  const third = scheduleReview(second, 3, now);
  assert.deepEqual([first.interval, second.interval, third.interval], [1, 3, 7]);
  assert.equal(isReviewDue(first, new Date("2026-01-02T12:00:00Z")), true);
});

test("failed recall resets repetitions and schedules a quick retry", () => {
  const result = scheduleReview({ repetitions: 4, interval: 12 }, 0, new Date("2026-01-01T12:00:00Z"));
  assert.equal(result.repetitions, 0);
  assert.equal(result.interval, 0);
});

test("readiness uses recent bounded practice results", () => {
  assert.equal(readinessScore({ writing: [20, 40, 60, 80, 100, 100] }), 76);
  assert.equal(readinessScore({}), 0);
});

test("readiness requires enough relevant evidence and uses descriptive levels", () => {
  assert.deepEqual(readinessLevel([100, 100]), { label: "Not assessed", score: 0, assessed: false });
  assert.equal(readinessLevel([40, 50, 60]).label, "Developing");
  assert.equal(readinessLevel([60, 70, 75]).label, "Consistent");
  assert.equal(readinessLevel([80, 90, 100]).label, "Strong in practice");
});

test("dateKey uses a stable local YYYY-MM-DD format", () => {
  assert.equal(dateKey(new Date(2026, 0, 9)), "2026-01-09");
});
