const test = require("node:test");
const assert = require("node:assert/strict");
const { performance } = require("node:perf_hooks");
const { buildWeightedPool } = require("../game-core.js");

test("adaptive queue scales comfortably to 1,000 sentences", () => {
  const sentences = Array.from({ length: 1000 }, (_, index) => ({ id: index, topic: `Topic ${index % 10}` }));
  const progress = Object.fromEntries(sentences.map((_, index) => [index, { needsPractice: index % 10 === 0, mastered: index % 3 === 0 }]));
  const started = performance.now();
  const pool = buildWeightedPool(sentences, progress, { mode: "adaptive", topic: "all" }, () => 0.5);
  const elapsed = performance.now() - started;
  assert.equal(pool.length, 1900);
  assert.ok(elapsed < 100, `queue construction took ${elapsed.toFixed(1)} ms`);
});

test("queue construction remains linear at 10,000 sentences", () => {
  const makeBank = (size) => Array.from({ length: size }, (_, index) => ({ id: index, topic: "YKI" }));
  const startSmall = performance.now(); buildWeightedPool(makeBank(1000), {}, {}, () => 0.5); const small = performance.now() - startSmall;
  const startLarge = performance.now(); const pool = buildWeightedPool(makeBank(10000), {}, {}, () => 0.5); const large = performance.now() - startLarge;
  assert.equal(pool.length, 20000);
  assert.ok(large < Math.max(250, small * 30), `scaling regressed: 1k=${small.toFixed(1)} ms, 10k=${large.toFixed(1)} ms`);
});
