# ADR 0001: Build an action-based bridge toward YKI grade 3

Date: 2026-10-21

Status: Accepted; software implementation completed locally, with external content and learning validation outstanding. No deployment is implied by this record.

## Implementation record

Implemented on 2026-10-21:

- 18 units across all ten topic groups. Each has a model, accessible phrase construction, changed details, branching rehearsal, independent production, a home/real-life mission, and delayed review. The appointment unit includes a calendar activity.
- Four-skill starting check, citizenship target-pair selection, daily time goals, and explained review/lesson suggestions.
- 54 starter typing sentences, preserving the original bank and optional English help.
- 20 comprehension sources with three questions each and supporting-text explanations. Source IDs are explicit and stable. Browser TTS is labelled synthetic; local recordings can be selected without uploading.
- Three held-out four-skill checkpoint sets. Exposure is tracked before submission, and repeated material is not labelled unseen. Optional timing starts with the explicit Start action.
- Writing keyword percentages removed. Self-reflection, objective comprehension checks, and tutor feedback are separate. Existing numeric YKI history is preserved but excluded from the new evidence profile.
- Separate skill evidence counts, support and exposure tracking across reloads, changed-material delayed-success rules, and review recommendations in `game-core.js`.
- Versioned local course state, migration of the six original course drafts/completions, reset/export controls, sample downloads, optional local audio recording/download, and received tutor-feedback entry. Unit completion alone is not treated as language mastery.
- Automated regression checks for learning evidence and course content, plus desktop/narrow-mobile browser checks covering course flows, audio failure, mic denial, persistence, and keyboard focus.

External work still required before describing this as a validated B1 course:

1. Obtain permission-cleared recordings by multiple Finnish speakers and review every transcript/question with a competent Finnish speaker. Local-file playback and TTS do not fulfil the native-recording requirement.
2. Have a qualified Finnish/YKI teacher review the curriculum, held-out tasks, and feedback rubrics against official samples. No such professional review has occurred.
3. Run the appointment-unit learner pilot with unfamiliar tasks before, after, and after a delay. Browser regression checks verify software behaviour, not learning outcomes. Expand or revise content based on that evidence.

The decision and acceptance criteria below remain the guide for that validation. The original assessment table records the situation that motivated this change; it is not an inventory of the current implementation.

## Context and assessment

The learner wants Finnish citizenship and finds the current practice too hard. They prefer learning by doing (kinaesthetic activities). This review covers the local source and newly added bridge course, not a verified production deployment or an assessment of the learner's Finnish.

**Decision: treat Näppärä as a practice companion, not a complete route from beginner Finnish to B1 or a pass predictor.** The new bridge reduces the initial difficulty, but six short units cannot establish independent B1 competence across unfamiliar situations. No estimate of time to B1 is justified without a starting-level assessment.

For citizenship, OPH currently lists grade 3 or higher in one accepted pair: speaking + writing; listening comprehension + writing; or reading comprehension + speaking. The learner must participate in all four subtests to receive the certificate. Grade 3 corresponds to B1. These are language-evidence requirements, not all citizenship eligibility requirements. Verify official requirements again when booking/applying.

At grade 3, the official speaking criteria allow errors and a noticeable accent when the meaning remains understandable. Teaching should therefore reward accomplishing the task and repairing misunderstandings, rather than memorising sophisticated model language.

## Evidence from this repository

| Area | Current implementation | Implication |
| --- | --- | --- |
| Entry difficulty | 18 new starter sentences, followed by the existing 1,000-sentence bank; easy typing is the default | A gentler entry, but the gap between starter and full bank remains large. Labels are teaching stages, not validated CEFR ratings. |
| Bridge course | Six units, each with examples, exact recall, one two-choice question, and an own-answer checklist | Useful introduction; little evidence of transfer, retention, or independent listening/speaking. Steps can be skipped and completion is self-reported. |
| Existing lessons | Five topic courses: vocabulary, model context, ready checklist | More content, but no systematic prerequisite map or graded progression into independent performance. |
| Writing | Four tasks; keyword-substring and length heuristic in `scoreKeywords` | Correct alternatives can be missed; irrelevant keyword lists can score well. The displayed percentage does not measure communicative quality. |
| Speaking | Three prompts; local recording and learner checkboxes | Helpful rehearsal, but no external evidence of intelligibility or successful interaction. |
| Understanding | Two reading and two listening tasks in the main practice bank | Repeated answers rapidly become memorised. Topic and question coverage is too narrow. |
| Listening audio | Browser speech synthesis | Useful support; Finnish voice availability varies. Does not expose the learner to enough human voices, reduced everyday speech, or natural conversation. |
| Mock checkpoint | Same fixed four tasks, drawn from practice material | Measures familiarity as well as skill. It is not an unseen YKI simulation. |
| Review and mastery | Course checklists, confidence-based review, typing marked mastered after three completions | Activity/completion must be distinguished from retained independent language ability. |
| Practice profile | Recent heuristic scores and self-ratings averaged into descriptive labels | Cannot justify a B1 claim or citizenship readiness; evidence types are not comparable. |

## Decision

Keep the site buildless, accessible, static, and local-first. Build a structured action-based curriculum with fading support, delayed retrieval, and unfamiliar transfer tasks. Keep reusable progression and assessment rules in `game-core.js`; keep Finnish/English sentence pairs in `app.js`.

Honour the learner's preference for practical activity without assigning a fixed learning-style identity. Research does not establish that matching instruction to a labelled learning style improves learning. Use activity to practise the target language, and retain listening, reading, writing, and speaking. Measure whether activities improve independent performance for this learner.

### P0: Make the learning path and feedback trustworthy

1. Add a low-pressure starting check for all four skills with optional English instructions. Identify missing prerequisites without treating a small task set as a CEFR diagnosis. Let the learner choose a citizenship target pair while continuing to practise all skills.
2. Replace the writing coverage percentage with a task-specific checklist and examples of alternative successful answers. Separate automatic observations, learner reflection, and tutor feedback. Keyword matches must not become readiness evidence.
3. Show evidence counts by skill: unseen attempts, supported attempts, independent attempts, delayed successful attempts, and externally reviewed samples. Do not merge these into a single pass-readiness number.
4. Explain that the mock is a short practice checkpoint. Introduce held-out tasks before using it to judge transfer. Keep completion and demonstrated competence separate.

Acceptance: an irrelevant keyword list cannot receive a successful communicative assessment; hints remain available but supported attempts are labelled; the dashboard never labels the learner B1 based on typing or self-checks.

### P1: Build a coherent progression through doing

Develop approximately 18–24 units as an initial content target, then expand based on evidence of gaps. This quantity is a planning choice, not a validated dose sufficient for B1. Cover personal life, housing, shopping, health, work/study, travel, leisure, public services, environment, and everyday opinions.

Each unit should teach one communicative action and a small set of useful structures:

1. **Act with a model:** listen/read and imitate a short interaction.
2. **Build:** arrange phrase cards to construct a meaningful message. Use buttons with move-left/move-right controls so keyboard and touch users have equal access; dragging is optional.
3. **Change the details:** replace the time, symptom, product, reason, or proposed solution. Explain the relevant Finnish forms in context.
4. **Respond:** complete a branching role-play where the first suggestion is refused or the other person asks a follow-up question.
5. **Do it independently:** hear an unseen prompt and speak or write without the model. Allow support, but record that it was used.
6. **Transfer:** do a safe, ordinary real-world task or equivalent home simulation, then report what happened in Finnish.
7. **Retrieve later:** revisit with changed details on another day before marking independent retention.

Example appointment unit: arrange a mock calendar; move an appointment after hearing a time; say why you cannot attend; propose another time; respond when it is unavailable; write the confirmation from memory. A home version with a friend or imaginary receptionist must always be available. Do not make unnecessary calls to health services for practice.

Include short, contextual lessons on questions and negation, present/past forms, common location/direction forms, quantities, polite requests, and linking ideas with koska, mutta, sitten, and siksi. Teach recognition first, then supported use, then new combinations. Avoid requiring perfect grammar to complete a communication task.

Acceptance: every unit contains an independent response and an altered scenario; every physical/drag activity has a seated keyboard alternative; supported completion cannot silently count as independent mastery.

### P1: Improve listening and feedback

Add permission-cleared recordings with multiple Finnish speakers, transcripts, and answer rationales. Begin with clear short speech, then introduce natural speed, common spoken forms, and distractors. Reveal transcripts and English only on request. Keep TTS as a fallback and label it as synthetic practice audio.

Use several questions per source that assess purpose, detail, and required action. Track distinct sources so replaying one source does not inflate breadth of evidence. Require content review by a competent Finnish speaker.

Offer a learner-controlled text export and downloadable recording for review by a tutor or language partner. Do not upload recordings, add accounts, or introduce AI assessment services without separate explicit approval. A tutor can assess whether meaning is clear, the requested points are covered, and the language works in context.

Acceptance: a learner can practise offline-style local interactions without microphone access; recording stays local; there are multiple unseen sources per topic and skill before making progress claims.

### P2: Adaptive daily practice and authentic checkpoints

Choose review from observed difficulty, support usage, and delayed retrieval in `game-core.js`. Prefer a short daily sequence of review, one practical lesson, and one independent transfer attempt. Offer time-based goals alongside sentence counts. Preserve the timer rule: typing starts timing on the first keystroke; independent timed checkpoints require an explicit start action.

Create held-out checkpoint sets with balanced topics and all four skills. Do not expose model answers until the attempt is submitted. Show strengths, recurring problems, and the next suggested practice action, not a probability of passing. Validate content and rubrics against official examples with a qualified Finnish/YKI teacher.

Acceptance: checkpoint items do not duplicate instructional items; a strong result requires evidence across unfamiliar tasks and days; a learner can inspect why the next lesson was suggested.

## Architecture and data

- Preserve existing local progress; use versioned course records and stable content IDs rather than array positions in the expanded course.
- Store attempts with task ID, skill, timestamp, support used, attempt type, and review source. Minimise personal data; provide reset/export controls for course drafts.
- Keep curriculum presentation separate from reusable scheduling and progression rules. Add focused unit tests for transfer, supported/independent distinctions, and review eligibility.
- Static audio assets increase download size; load them on demand. Hosting remains GitHub Pages without a build step.
- No new analytics, remote storage, accounts, or automatic audio upload.

## Alternatives considered

- **More typing sentences only:** easy to add, but does not close interaction, comprehension, or spontaneous production gaps.
- **Drag-and-drop everywhere:** active clicking is not evidence of learning; use manipulation only when it helps assemble meaning and always offer accessible controls.
- **Immediate AI scoring:** could support feedback, but introduces accuracy, privacy, cost, and network dependencies. Defer pending explicit approval and an evaluation against qualified human ratings.
- **Claim the course guarantees a pass:** unjustified; personal progress and YKI performance need independent evidence.

## Validation and rollout

Ship P0 first, then pilot a complete appointment unit before expanding the curriculum. Compare this learner's performance on new prompts before and after the unit and again after a delay. Track support needed and task success locally, not just enjoyment or completion speed. Seek qualified feedback on spoken/written samples and revisit the design if transfer does not improve.

Check desktop and narrow mobile layouts, keyboard-only navigation, visible focus, live feedback, hidden translations, audio unavailable/permission denied cases, reload persistence, and Finnish characters. Run `npm test` for learning-logic changes. Course completion alone must never unlock a claim of B1 proficiency.

## Sources

Checked 2026-10-21:

- [OPH: citizenship language evidence and accepted YKI pairs](https://www.oph.fi/en/education-and-qualifications/demonstrating-your-language-proficiency-when-applying-finnish)
- [OPH: selecting the YKI level; grade 3 is B1](https://www.oph.fi/en/education-and-qualifications/selecting-right-yki-test-test-days)
- [OPH: official speaking assessment criteria, including level 3](https://www.oph.fi/sites/default/files/documents/Speaking_criteria.pdf)
- [EEF: learning styles evidence](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/learning-styles). This evidence summary primarily concerns school education; it does not establish the best individual method for an adult Finnish learner.
