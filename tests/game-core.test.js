const test = require("node:test");
const assert = require("node:assert/strict");
const { normalize, calculateStats, identifyMistypedWords, sentenceId, buildWeightedPool, recordSuccess, dateKey } = require("../game-core.js");

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

test("dateKey uses a stable local YYYY-MM-DD format", () => {
  assert.equal(dateKey(new Date(2026, 0, 9)), "2026-01-09");
});
