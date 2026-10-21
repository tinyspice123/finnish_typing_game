const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const browserScripts = ["game-core.js", "sentence-bank.js", "app.js", "learning-store.js", "bridge-course.js", "yki-practice.js"];

for (const filename of browserScripts) {
  test(`${filename} parses as valid JavaScript`, () => {
    const source = fs.readFileSync(path.join(root, filename), "utf8");
    assert.doesNotThrow(() => new vm.Script(source, { filename }));
  });
}
