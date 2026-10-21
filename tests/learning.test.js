const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { createLearningAttempt, summarizeEvidence, learningReview, suggestLearning, migrateBridgeProgress } = require("../game-core.js");
const time = new Date("2026-10-01T12:00:00Z");
const input = { taskId: "appointments-a", sourceId: "scenario-a", unitId: "appointments", skill: "writing", reviewSource: "self", success: true };

test("self-confidence and keyword-style claims never create checked success", () => {
  const attempt = createLearningAttempt([], input, time);
  assert.equal(attempt.success, null);
  assert.equal(attempt.delayed, false);
  assert.equal(summarizeEvidence([attempt]).writing.delayed, 0);
});

test("replaying the same source increases attempts, not breadth or first encounters", () => {
  const first = createLearningAttempt([], input, time);
  const replay = createLearningAttempt([first], { ...input, taskId: "different-question-same-source" }, time);
  const stats = summarizeEvidence([first, replay]).writing;
  assert.equal(stats.attempts, 2);
  assert.equal(stats.sources, 1);
  assert.equal(stats.unseen, 1);
});

test("inspected but unsubmitted material is not counted as an unseen encounter", () => {
  const exposed = createLearningAttempt([], { ...input, unseen: false }, time);
  assert.equal(exposed.unseen, false);
  assert.equal(summarizeEvidence([exposed]).writing.unseen, 0);
});

test("delayed success needs checked independent performance on changed material after a day", () => {
  const first = createLearningAttempt([], { ...input, reviewSource: "tutor" }, time);
  const later = new Date("2026-10-02T12:00:01Z");
  const changed = { ...input, taskId: "appointments-b", sourceId: "scenario-b", reviewSource: "tutor" };
  assert.equal(createLearningAttempt([first], changed, later).delayed, true);
  assert.equal(createLearningAttempt([first], { ...changed, supported: true }, later).delayed, false);
  assert.equal(createLearningAttempt([first], { ...changed, sourceId: first.sourceId }, later).delayed, false);
  assert.equal(createLearningAttempt([first], { ...changed, reviewSource: "self" }, later).delayed, false);
  assert.equal(createLearningAttempt([first], changed, new Date("2026-10-01T13:00:00Z")).delayed, false);
  assert.equal(createLearningAttempt([{ ...first, supported: true }], changed, later).delayed, false);
});

test("failed, supported, and reflected attempts are reviewed earlier than checked successes", () => {
  const self = createLearningAttempt([], input, time);
  const success = createLearningAttempt([], { ...input, reviewSource: "objective" }, time);
  const supported = createLearningAttempt([], { ...input, supported: true, reviewSource: "objective" }, time);
  assert.equal(learningReview([self], "appointments", new Date("2026-10-02T12:00:00Z")).due, true);
  assert.equal(learningReview([supported], "appointments", new Date("2026-10-02T12:00:00Z")).due, true);
  assert.equal(learningReview([success], "appointments", new Date("2026-10-02T12:00:00Z")).due, false);
});

test("daily suggestions explain due review and do not equate completed units with mastery", () => {
  const units = [{ id: "introductions" }, { id: "appointments" }];
  assert.equal(suggestLearning(units, [], {}).unitId, "introductions");
  const history = [createLearningAttempt([], { ...input, supported: true }, time)];
  const due = suggestLearning(units, history, { introductions: true, appointments: true }, new Date("2026-10-03T12:00:00Z"));
  assert.equal(due.unitId, "appointments");
  assert.equal(due.step, 6);
  assert.match(due.reason, /support/);
});

test("legacy course drafts and completion migrate to stable IDs without inventing evidence", () => {
  const saved = { "done-0": true, "draft-1": "Tarvitsen apua.", "draft-2": 99 };
  const next = migrateBridgeProgress(saved, ["introductions", "ask-help", "appointments"]);
  assert.equal(next.completed.introductions, true);
  assert.equal(next.drafts["ask-help:4:0"], "Tarvitsen apua.");
  assert.equal(Object.keys(next.drafts).length, 1);
  assert.equal(next.attempts, undefined);
});

const source = fs.readFileSync(require.resolve("../app.js"), "utf8").split("const { normalize,")[0];
const context = { SentenceBank: { buildExpansion: () => [] } };
vm.runInNewContext(`${source}\nglobalThis.course = { bridgeUnits, originalBridgeIds, courseSources, checkpointSets, starterSentences };`, context);
const course = context.course;

test("curriculum covers eighteen stable units with actions, changed scenarios, and home missions", () => {
  assert.equal(course.bridgeUnits.length, 18);
  assert.equal(new Set(course.bridgeUnits.map(unit => unit.id)).size, 18);
  for (const unit of course.bridgeUnits) {
    assert.equal(unit.lines.length, 3);
    assert.equal(unit.variants.length, 2);
    assert.notEqual(unit.variants[0], unit.variants[1]);
    assert.ok(unit.mission && unit.tip && unit.chunks.length >= 2 && unit.check.length >= 3);
    assert.ok(unit.lines.every(([fi, en]) => fi && en));
  }
  assert.equal(course.starterSentences.length, 54);
});

test("comprehension offers twenty distinct sources and three unambiguous answer keys per source", () => {
  assert.equal(course.courseSources.length, 20);
  assert.equal(new Set(course.courseSources.map(item => item.id)).size, 20);
  const topics = new Set(course.courseSources.map(item => item.topic));
  assert.equal(topics.size, 10);
  for (const item of course.courseSources) {
    assert.equal(item.questions.length, 3);
    for (const question of item.questions) {
      assert.ok(question.options[question.answer]);
      assert.ok(question.rationale.length > question.options[question.answer].length);
      assert.match(question.rationale, /“.+”/);
      assert.notEqual(question.options[0], question.options[1]);
    }
  }
});

test("checkpoint source texts and prompts are held out from instructional tasks", () => {
  const teaching = course.bridgeUnits.flatMap(unit => [unit.task, ...unit.variants, ...unit.lines.map(line => line[0])]).concat(course.courseSources.map(item => item.text));
  assert.equal(course.checkpointSets.length, 3);
  for (const set of course.checkpointSets) {
    for (const item of [set.reading.text, set.listening.text, set.writing, set.speaking]) assert.ok(!teaching.includes(item));
  }
});
