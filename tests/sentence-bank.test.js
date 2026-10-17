const test = require("node:test");
const assert = require("node:assert/strict");
const { buildExpansion } = require("../sentence-bank.js");

test("expanded bank adds exactly 900 sentences", () => {
  assert.equal(buildExpansion().length, 900);
});

test("all expanded sentences have stable unique IDs and translations", () => {
  const sentences = buildExpansion();
  assert.equal(new Set(sentences.map((item) => item.id)).size, 900);
  assert.ok(sentences.every((item) => item.fi && item.en && item.topic));
});

test("expanded bank balances all ten practice topics", () => {
  const counts = buildExpansion().reduce((result, item) => {
    result[item.topic] = (result[item.topic] || 0) + 1;
    return result;
  }, {});
  assert.equal(Object.keys(counts).length, 10);
  assert.ok(Object.values(counts).every((count) => count === 90));
});
