(function () {
  "use strict";
  const store = LearningStore;
  const h = store.escape;
  const steps = ["Model", "Build", "Change details", "Role-play", "Independent", "Real-life mission", "Review later"];
  let unitId = store.state.cursor.unitId;
  let step = Math.max(0, Math.min(6, Number(store.state.cursor.step) || 0));
  let mode = "course", sourceIndex = 0, sourceSkill = "reading", baselineStep = 0;
  let checkpoint = null;
  let timer = null;
  const sourceAudio = new Map();
  function status(text) { store.notice(text); }
  function header(title, kicker = "CITIZENSHIP · LEARN BY DOING") {
    document.querySelector("#ykiKicker").textContent = kicker;
    document.querySelector("#ykiTitle").textContent = title;
    document.querySelector("#ykiTimer").textContent = "At your pace";
    status("");
  }
  function clear() {
    clearInterval(timer); timer = null; store.stopRecording(); window.speechSynthesis?.cancel();
    document.querySelectorAll("audio").forEach(audio => audio.pause());
    sourceAudio.forEach(url => URL.revokeObjectURL(url)); sourceAudio.clear();
  }
  function speak(text, rate = 0.85) {
    if (!("speechSynthesis" in window)) { status("Synthetic audio is unavailable. Use the text instead; listening practice with text counts as supported."); return Promise.resolve(false); }
    speechSynthesis.cancel();
    return new Promise(resolve => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fi-FI"; utterance.rate = rate;
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang.toLowerCase().startsWith("fi")) || null;
      utterance.onend = () => resolve(true);
      utterance.onerror = () => { status("Finnish synthetic audio could not play. Use the text for supported practice, or try a device with a Finnish voice."); resolve(false); };
      speechSynthesis.speak(utterance);
    });
  }
  function content() { return document.querySelector("#ykiContent"); }
  function bind(selector, action) { const node = content().querySelector(selector); if (node) node.onclick = action; }
  function support(taskId) { store.state.support[taskId] = true; store.save(); }
  function watchHelp(host, taskId) { host.querySelectorAll("details[data-support]").forEach(detail => detail.addEventListener("toggle", () => { if (detail.open) support(taskId); })); }
  function saveDraft(taskId, value) { store.state.drafts[taskId] = value; store.save(); }
  function textExport(taskId, prompt, value, otherHelp = false) { store.download(`${taskId}.txt`, `Näppärä practice sample\nTask: ${prompt}\n\nMy response:\n${value}\n\nTutor: Is the meaning clear? Are the requested points covered? What one thing should I improve?\nSupport used: ${store.state.support[taskId] || otherHelp ? "yes" : "no"}`); }
  function checkMarkup(items) { return `<div class="check-list">${items.map((text, index) => `<label><input type="checkbox" data-self-check="${index}"> ${h(text)}</label>`).join("")}</div>`; }

  function show() {
    clear(); mode = "course";
    let unit = bridgeUnits.find(item => item.id === unitId) || bridgeUnits[0]; unitId = unit.id;
    store.state.cursor = { unitId, step }; store.save();
    header("Small steps, real situations");
    const recommendation = GameCore.suggestLearning(bridgeUnits, store.state.attempts, store.state.completed);
    const recommendedUnit = bridgeUnits.find(item => item.id === recommendation.unitId);
    const elapsed = Math.floor((Number(store.state.daily[GameCore.dateKey()]) || 0) / 60);
    content().innerHTML = `<div class="course-dashboard"><p>Build toward YKI grade 3 through practical actions. Keep practising all four skills. Course completion is not a B1 assessment.</p>
      <div class="course-settings"><label>Citizenship target pair<select id="targetPair"><option value="speaking-writing">Speaking + writing</option><option value="listening-writing">Listening + writing</option><option value="reading-speaking">Reading + speaking</option></select></label><label>Daily practice goal<select id="minuteGoal"><option value="10">10 minutes</option><option value="15">15 minutes</option><option value="25">25 minutes</option></select></label></div>
      <p>${elapsed} / ${Number(store.state.settings.minutes) || 15} active minutes today. Time is counted between actions, with idle gaps capped at one minute.</p>
      <div class="task-footer"><button type="button" class="primary-action" id="startingCheck">Starting check · 4 skills</button><button type="button" class="secondary-action" id="sourcePractice">Read & listen · 20 sources</button><button type="button" class="secondary-action" id="courseCheckpoint">Unseen checkpoint</button></div>
      <div class="lesson-tip"><strong>Today's sequence: review → one lesson → one independent mission</strong><p>Suggested: ${h(recommendedUnit?.title)}. ${h(recommendation.reason)}.</p><button type="button" class="secondary-action" id="recommended">Open suggested practice</button></div>
      <details><summary>My starting check & tutor feedback</summary><p>${["reading", "listening", "writing", "speaking"].map(skill => `${skill}: ${h(store.state.baseline[skill] || "not tried")}`).join(" · ")}</p><p>No starting-check result is a CEFR diagnosis. Start with Foundations if you need help forming short sentences.</p><div id="tutorReview"></div></details>
      <details><summary>My saved work</summary><button type="button" class="secondary-action" id="exportProgress">Export drafts & progress</button><button type="button" class="secondary-action" id="resetProgress">Reset course data</button><span id="resetActions"></span><p>Course drafts and reflection stay in this browser. Existing typing and earlier YKI practice history are separate.</p></details></div>
      <p><strong>${Object.keys(store.state.completed).filter(id => bridgeUnits.some(item => item.id === id)).length} / ${bridgeUnits.length} units visited through a mission</strong> · Review evidence is tracked separately.</p>
      <div class="bridge-units" aria-label="Course units">${bridgeUnits.map((item, index) => `<button type="button" class="secondary-action" data-unit="${h(item.id)}" ${item.id === unitId ? 'aria-current="step"' : ""}>${index + 1}. ${h(item.title)}${store.state.completed[item.id] ? " ✓" : ""}<small>${h(item.stage)}</small></button>`).join("")}</div>
      <h3 tabindex="-1" id="unitTitle">${bridgeUnits.indexOf(unit) + 1}. ${h(unit.title)}</h3><p class="lesson-tip">${h(unit.tip)}</p>
      <div class="lesson-steps" aria-label="Lesson steps">${steps.map((label, index) => `<button type="button" data-bridge-step="${index}" aria-current="${index === step ? "step" : "false"}" class="${index === step ? "is-current" : ""}">${index + 1}. ${label}</button>`).join("")}</div>
      <div id="bridgeActivity"></div><div class="task-footer"><button type="button" class="secondary-action" id="bridgeBack" ${step === 0 ? "disabled" : ""}>Back</button><button type="button" class="primary-action" id="bridgeNext" ${step === 6 ? "hidden" : ""}>Next step</button></div>`;
    const pair = content().querySelector("#targetPair"); pair.value = store.state.settings.pair;
    pair.onchange = () => { store.state.settings.pair = pair.value; store.save(); };
    const minutes = content().querySelector("#minuteGoal"); minutes.value = String(store.state.settings.minutes);
    minutes.onchange = () => { store.state.settings.minutes = Number(minutes.value); store.save(); };
    bind("#startingCheck", () => { baselineStep = 0; showBaseline(); });
    bind("#sourcePractice", showSources); bind("#courseCheckpoint", showCheckpointStart);
    bind("#recommended", () => { unitId = recommendation.unitId; step = recommendation.step; show(); focusUnit(); });
    bind("#exportProgress", () => store.export());
    bind("#resetProgress", () => {
      content().querySelector("#resetActions").innerHTML = '<button type="button" class="secondary-action" id="confirmReset">Confirm reset of course drafts and evidence</button><button type="button" class="secondary-action" id="cancelReset">Keep my work</button>';
      bind("#confirmReset", () => { store.reset(); unitId = bridgeUnits[0].id; step = 0; show(); });
      bind("#cancelReset", () => { content().querySelector("#resetActions").replaceChildren(); });
    });
    content().querySelectorAll("[data-unit]").forEach(button => button.onclick = () => { unitId = button.dataset.unit; step = 0; show(); focusUnit(); });
    content().querySelectorAll("[data-bridge-step]").forEach(button => button.onclick = () => { step = Number(button.dataset.bridgeStep); show(); focusActivity(); });
    bind("#bridgeBack", () => { step--; show(); focusActivity(); });
    bind("#bridgeNext", () => { step++; show(); focusActivity(); });
    renderTutorReview(); renderUnit(unit);
  }
  function focusUnit() { content().querySelector("#unitTitle")?.focus(); }
  function focusActivity() { const activity = content().querySelector("#bridgeActivity"); activity.tabIndex = -1; activity.focus(); }
  function renderTutorReview() {
    const samples = store.state.attempts.filter(item => ["writing", "speaking"].includes(item.skill) && item.reviewSource === "self").slice(-15);
    const host = content().querySelector("#tutorReview");
    if (!samples.length) { host.textContent = "After saving a spoken or written attempt, you can record feedback received from a tutor here."; return; }
    host.innerHTML = `<label>Sample reviewed by a tutor<select id="reviewSample">${samples.map(item => `<option value="${h(item.id)}">${h(item.taskId)} · ${h(item.skill)} · ${h(item.at.slice(0, 10))}</option>`).join("")}</select></label><label>Feedback received<textarea class="yki-textarea" id="reviewNotes"></textarea></label><label><input type="checkbox" id="reviewClear">Tutor said the meaning was clear and the task was fulfilled</label><button type="button" class="secondary-action" id="saveTutorReview">Save received tutor feedback</button><p>This stores feedback you received; the site does not verify or provide a tutor assessment.</p><ul>${Object.entries(store.state.feedback).map(([id, note]) => `<li>${h(id)}: ${h(note)}</li>`).join("")}</ul>`;
    bind("#saveTutorReview", () => {
      const sample = samples.find(item => item.id === content().querySelector("#reviewSample").value);
      const notes = content().querySelector("#reviewNotes").value.trim();
      if (!notes) { status("Add the feedback you received first."); return; }
      store.state.feedback[sample.id] = notes;
      // Assess the original performance time, not when feedback was entered. Review is not another attempt.
      const index = store.state.attempts.findIndex(item => item.id === sample.id);
      const reviewed = GameCore.createLearningAttempt(store.state.attempts.slice(0, index), { ...sample, reviewSource: "tutor", success: content().querySelector("#reviewClear").checked }, new Date(sample.at));
      store.state.attempts[index] = reviewed;
      store.save(); status("Tutor feedback saved separately from your self-reflection."); renderTutorReview();
    });
  }
  function renderUnit(unit) {
    const host = content().querySelector("#bridgeActivity");
    const prior = store.state.attempts.filter(item => item.unitId === unit.id && ["transfer", "review", "independent"].includes(item.type));
    const variant = step === 5 ? 0 : prior.length % 2;
    const taskId = step === 5 ? `${unit.id}:mission` : `${unit.id}:${step}:${variant}`;
    if (step === 0) {
      host.innerHTML = `<p>Read, listen, and act out the meaning. Audio here is synthetic, not a native-speaker recording.</p>${unit.lines.map(([fi, en], index) => `<article class="bridge-example"><p class="model-finnish" lang="fi">${h(fi)}</p><button type="button" class="secondary-action" data-listen="${index}">Listen slowly</button><details><summary>Show translation</summary><p>${h(en)}</p></details></article>`).join("")}`;
      host.querySelectorAll("[data-listen]").forEach(button => button.onclick = () => speak(unit.lines[Number(button.dataset.listen)][0], 0.75));
    } else if (step === 1) {
      let order = unit.chunks.map((_, index) => index).reverse();
      host.innerHTML = '<p>Build the model message. Move the phrase cards with the buttons, then say the whole sentence aloud.</p><ol id="phraseCards" class="phrase-cards"></ol><button type="button" class="primary-action" id="checkBuild">Check order</button>';
      const render = (focusIndex = null, direction = null) => {
        host.querySelector("#phraseCards").innerHTML = order.map((chunk, index) => `<li><span lang="fi">${h(unit.chunks[chunk])}</span><button type="button" class="secondary-action" data-move="${index}" data-direction="-1" aria-label="Move phrase ${index + 1} left" ${index === 0 ? "disabled" : ""}>←</button><button type="button" class="secondary-action" data-move="${index}" data-direction="1" aria-label="Move phrase ${index + 1} right" ${index === order.length - 1 ? "disabled" : ""}>→</button></li>`).join("");
        host.querySelectorAll("[data-move]").forEach(button => button.onclick = () => {
          const from = Number(button.dataset.move), direction = Number(button.dataset.direction), to = from + direction;
          [order[from], order[to]] = [order[to], order[from]]; render(to, direction); status(`Phrase moved to position ${to + 1}.`);
        });
        if (focusIndex !== null) {
          const preferred = host.querySelector(`[data-move="${focusIndex}"][data-direction="${direction}"]:not(:disabled)`);
          (preferred || host.querySelector(`[data-move="${focusIndex}"]:not(:disabled)`))?.focus();
        }
      };
      render(); bind("#checkBuild", () => status(order.every((chunk, index) => chunk === index) ? "The model is in order. Now change the details so it becomes your message." : "Compare with the Model step and try moving a phrase again."));
    } else if (step === 2) {
      host.innerHTML = `<p>Change at least two details from the model: person, place, reason, time, or quantity. Read both versions aloud. Use the grammar note above.</p><p lang="fi">${h(unit.lines[2][0])}</p>${unit.id === "appointments" ? '<div class="calendar-activity"><label>Day<select id="appointmentDay"><option>torstaina</option><option>perjantaina</option><option>maanantaina</option></select></label><label>Time<select id="appointmentTime"><option>aamulla</option><option>iltapäivällä</option><option>kello kahdelta</option></select></label><p id="appointmentPreview" lang="fi"></p></div>' : ""}<label for="changedMessage">My changed message</label><textarea class="yki-textarea" id="changedMessage"></textarea><button type="button" class="secondary-action" id="saveChanged">Save my version</button>`;
      const input = host.querySelector("#changedMessage"); input.value = store.state.drafts[taskId] || ""; input.oninput = () => saveDraft(taskId, input.value);
      bind("#saveChanged", () => status(GameCore.normalize(input.value) ? "Version saved. Try using it in the role-play next." : "Write your changed message first."));
      if (unit.id === "appointments") {
        const preview = () => { host.querySelector("#appointmentPreview").textContent = `Sopisiko aika ${host.querySelector("#appointmentDay").value} ${host.querySelector("#appointmentTime").value}?`; };
        host.querySelectorAll("select").forEach(select => select.onchange = preview); preview();
      }
    } else if (step === 3) {
      host.innerHTML = `<p>Act out both sides. Read or say your opening message, then choose the response you receive.</p><p>${h(unit.variants[variant])}</p><div class="task-footer"><button type="button" class="secondary-action" id="roleRefusal">They refuse the first plan</button><button type="button" class="secondary-action" id="roleQuestion">They ask a follow-up</button></div><p id="roleReply" class="source-card" lang="fi"></p><button type="button" class="secondary-action" id="listenReply">Hear response · synthetic audio</button><label for="roleAnswer">My reply: acknowledge, explain, or offer another option</label><textarea class="yki-textarea" id="roleAnswer"></textarea><button type="button" class="secondary-action" id="saveRole">Save rehearsal</button>`;
      let reply = unit.replies[0]; const replyHost = host.querySelector("#roleReply"); replyHost.textContent = reply;
      bind("#roleRefusal", () => { reply = unit.replies[0]; replyHost.textContent = reply; });
      bind("#roleQuestion", () => { reply = unit.replies[1]; replyHost.textContent = reply; });
      bind("#listenReply", () => speak(reply));
      const input = host.querySelector("#roleAnswer"); input.value = store.state.drafts[taskId] || ""; input.oninput = () => saveDraft(taskId, input.value);
      bind("#saveRole", () => status(input.value.trim() ? "Rehearsal saved. Try the independent task without the model next." : "Say a reply, then add short notes before saving."));
    } else {
      const review = GameCore.learningReview(store.state.attempts, unit.id);
      const reviewNotice = step === 6 ? `<p class="lesson-tip">${review ? `Next review: ${h(new Date(review.dueAt).toLocaleDateString())}. ${h(review.reason)}.` : "Save an independent attempt first, then come back another day."} Today's self-reflection is separate from a delayed, checked success.</p>` : "";
      const prompt = step === 5 ? unit.mission : unit.variants[variant];
      host.innerHTML = `${reviewNotice}<p class="task-prompt">${h(prompt)}</p><p>${step === 5 ? "Use an ordinary real situation or a home simulation. You may stay seated and imagine the objects. Afterwards, describe what happened in Finnish." : "Use familiar words and your own details. Try without looking at the model. You can ask for help whenever you need it."}</p><button type="button" class="secondary-action" id="hearPrompt">Hear model sentences · counts as support</button><label>Skill to practise<select id="productionSkill"><option value="writing">Writing</option><option value="speaking">Speaking</option></select></label><label for="independentDraft">My Finnish response or spoken-answer notes</label><textarea class="yki-textarea" id="independentDraft" lang="fi"></textarea><div id="unitRecorder"></div><details data-support><summary>Show building blocks · counts as support</summary>${unit.lines.map(([fi]) => `<p lang="fi">${h(fi)}</p>`).join("")}</details>${checkMarkup(unit.check)}<label><input type="checkbox" id="outsideHelp">I used other help or read my answer aloud from notes</label><label>How did it feel?<select id="taskDifficulty"><option value="okay">Manageable</option><option value="hard">I need more practice</option></select></label><div class="task-footer"><button type="button" class="primary-action" id="saveIndependent">Save reflection${step === 5 ? " &complete mission" : ""}</button><button type="button" class="secondary-action" id="exportSample">Download for tutor</button></div><p>Checks are your reflection. The site does not judge grammar, intelligibility, or task success.</p><div id="unitSaved"></div>${step === 6 ? '<h4>Check understanding with changed material</h4><label>Review skill<select id="reviewSkill"><option value="reading">Reading</option><option value="listening">Listening</option></select></label><div id="reviewSource"></div>' : ""}`;
      const draft = host.querySelector("#independentDraft"); draft.value = store.state.drafts[taskId] || "";
      draft.oninput = () => saveDraft(taskId, draft.value);
      const skill = host.querySelector("#productionSkill");
      const sourceId = step === 5 ? `${unit.id}-mission` : `${unit.id}-scenario-${variant}`;
      let firstExposure = store.expose(sourceId, skill.value);
      const otherHelp = host.querySelector("#outsideHelp"); otherHelp.checked = Boolean(store.state.support[taskId]);
      otherHelp.onchange = () => { if (otherHelp.checked) support(taskId); };
      skill.onchange = () => {
        firstExposure = store.expose(sourceId, skill.value);
        store.stopRecording(); host.querySelector("#unitRecorder").replaceChildren();
        if (skill.value === "speaking") store.attachRecorder(host.querySelector("#unitRecorder"), taskId);
      };
      // Hearing the example sentences is support, unlike listening to task instructions.
      bind("#hearPrompt", () => { support(taskId); speak(unit.lines.map(line => line[0]).join(" ")); status("You requested model sentences; this attempt is labelled supported."); });
      watchHelp(host, taskId);
      if (step === 6) {
        const renderReview = () => {
          const skill = host.querySelector("#reviewSkill").value;
          const sources = courseSources.filter(source => source.topic === unit.topic);
          const attempts = store.state.attempts.filter(item => item.unitId === unit.id && item.skill === skill);
          const source = sources[attempts.length % sources.length];
          renderSource(host.querySelector("#reviewSource"), source, skill, { type: "review", unitId: unit.id, onDone: () => { renderReview(); status("Review saved. A delayed success needs another changed task at least a day after an earlier independent success."); } });
        };
        host.querySelector("#reviewSkill").onchange = renderReview; renderReview();
      }
      bind("#exportSample", () => textExport(taskId, prompt, draft.value, otherHelp.checked));
      bind("#saveIndependent", () => {
        if (!GameCore.normalize(draft.value)) { status("Add your answer or a few notes about what you said first."); return; }
        const missing = [...host.querySelectorAll("[data-self-check]")].filter(check => !check.checked).length;
        const attempt = store.record({ taskId, sourceId, unitId: unit.id, variant, skill: skill.value, unseen: firstExposure,
          type: step === 5 ? "transfer" : step === 6 ? "review" : "independent", supported: store.state.support[taskId] || host.querySelector("#outsideHelp").checked,
          reviewSource: "self", difficulty: missing ? "hard" : host.querySelector("#taskDifficulty").value });
        if (step === 5) store.state.completed[unit.id] = true;
        store.save(); host.querySelector("#saveIndependent").disabled = true;
        host.querySelector("#unitSaved").innerHTML = `<p>Saved as ${attempt.supported ? "supported" : "without support"} self-reflection. ${missing ? "Revisit the unchecked points." : "A tutor can help check clarity and task fulfilment."}</p><button type="button" class="secondary-action" id="continueUnit">${step === 5 ? "Next course unit" : "Continue"}</button>`;
        bind("#continueUnit", () => { if (step === 5) { unitId = bridgeUnits[(bridgeUnits.indexOf(unit) + 1) % bridgeUnits.length].id; step = 0; } else step = Math.min(6, step + 1); show(); focusUnit(); });
        status("Reflection saved. Course completion and checked language evidence are separate.");
      });
    }
  }

  function showBaseline() {
    clear(); mode = "baseline"; header("Find a comfortable starting point", "STARTING CHECK · NO TIMER");
    const skill = ["reading", "listening", "writing", "speaking"][baselineStep];
    if (!skill) { show(); status("Starting check saved. Choose Foundations for short sentences, or continue to the next practical unit. Keep practising each skill."); return; }
    const source = courseSources[baselineStep === 0 ? 0 : 2];
    content().innerHTML = `<p>Step ${baselineStep + 1} of 4 · ${skill}. This helps you choose support; it does not assign a CEFR level.</p><details><summary>English instructions</summary><p>${baselineStep < 2 ? "Understand the message and answer the question. You may use the text if audio is unavailable." : "Introduce yourself, describe a normal day, and give a reason you study Finnish. Use short sentences. For speaking, say it aloud and add brief notes."}</p></details><div id="baselineTask"></div><div class="task-footer"><button type="button" class="secondary-action" id="baselineSkip">I need help · skip this task</button><button type="button" class="secondary-action" id="baselineExit">Return to course</button></div>`;
    bind("#baselineExit", show);
    bind("#baselineSkip", () => { store.state.baseline[skill] = "needs support"; store.save(); baselineStep++; showBaseline(); });
    const host = content().querySelector("#baselineTask");
    if (baselineStep < 2) {
      renderSource(host, source, skill, { type: "starting-check", onDone: result => { store.state.baseline[skill] = result.supported ? "tried with support" : result.success ? "message understood on this task" : "needs more practice"; store.save(); baselineStep++; showBaseline(); } });
    } else {
      const taskId = `baseline-${skill}`;
      const firstExposure = store.expose(taskId, skill);
      host.innerHTML = '<p class="task-prompt" lang="fi">Kerro itsestäsi, tavallisesta päivästäsi ja siitä, miksi opiskelet suomea.</p><label for="baselineAnswer">My Finnish response or spoken notes</label><textarea class="yki-textarea" id="baselineAnswer"></textarea><div id="baselineRecorder"></div><label><input type="checkbox" id="baselineHelp">I needed help or read from notes when speaking</label><label><input type="checkbox" id="baselineManaged">I could communicate those ideas</label><button type="button" class="primary-action" id="baselineSave">Save reflection & continue</button>';
      const draft = host.querySelector("#baselineAnswer"); draft.value = store.state.drafts[taskId] || ""; draft.oninput = () => saveDraft(taskId, draft.value);
      if (skill === "speaking") store.attachRecorder(host.querySelector("#baselineRecorder"), taskId);
      bind("#baselineSave", () => {
        if (!GameCore.normalize(draft.value)) { status("Write an answer or short notes first, or choose Skip."); return; }
        const supported = host.querySelector("#baselineHelp").checked;
        const managed = host.querySelector("#baselineManaged").checked;
        store.record({ taskId, sourceId: taskId, skill, type: "starting-check", supported, unseen: firstExposure, reviewSource: "self", difficulty: managed ? "okay" : "hard" });
        store.state.baseline[skill] = supported ? "needed support" : managed ? "self-reported manageable" : "needs more practice"; store.save(); baselineStep++; showBaseline();
      });
    }
    focusTask();
  }

  function renderSource(host, source, skill, options = {}) {
    const taskId = `${options.type || "source"}-${source.id}-${skill}`;
    const supportKey = `${source.id}:${skill}`;
    const firstExposure = store.expose(source.id, skill);
    let supported = Boolean(store.state.support[supportKey]), played = false, submitted = false;
    host.innerHTML = `${skill === "reading" ? `<p class="source-card" lang="fi">${h(source.text)}</p>` : `<button type="button" class="primary-action" data-play-source>Play synthetic Finnish audio</button><p>Browser TTS · practice audio. Native-speaker recordings are not bundled.</p><label>Optional local recording of this same text<input type="file" data-local-audio accept="audio/*"></label><div data-local-player></div><details data-transcript><summary>Show transcript · counts as support</summary><p lang="fi">${h(source.text)}</p></details>`}
      <form data-source-form>${source.questions.map((question, index) => `<fieldset><legend lang="fi">${index + 1}. ${h(question.prompt)}</legend>${question.options.map((option, answer) => `<label class="source-choice"><input type="radio" name="q${index}" value="${answer}" required> <span lang="fi">${h(option)}</span></label>`).join("")}</fieldset>`).join("")}<button type="submit" class="primary-action">Check answers</button></form><div data-source-result></div>`;
    if (skill === "listening") {
      host.querySelector("[data-play-source]").onclick = async () => {
        if (!("speechSynthesis" in window)) { status("Synthetic audio is unavailable. Open the transcript for supported practice."); return; }
        played = await speak(source.text);
      };
      host.querySelector("[data-transcript]").addEventListener("toggle", event => { if (event.target.open) { supported = true; support(supportKey); } });
      const local = host.querySelector("[data-local-audio]");
      local.onchange = () => {
        const file = local.files[0]; if (!file) return;
        if (sourceAudio.has(source.id)) URL.revokeObjectURL(sourceAudio.get(source.id));
        const url = URL.createObjectURL(file); sourceAudio.set(source.id, url);
        const audio = document.createElement("audio"); audio.controls = true; audio.src = url; audio.onended = () => { played = true; }; audio.onerror = () => { played = false; status("Local audio could not play. Use the transcript for supported practice."); };
        host.querySelector("[data-local-player]").replaceChildren(audio); status("Local recording selected. It is not uploaded; use a recording of the displayed transcript.");
      };
    }
    host.querySelector("[data-source-form]").onsubmit = event => {
      event.preventDefault(); if (submitted) return;
      if (skill === "listening" && !played && !supported) { status("Listen first or open the transcript for supported practice."); return; }
      submitted = true;
      const choices = source.questions.map((_, index) => Number(new FormData(event.target).get(`q${index}`)));
      const correct = source.questions.filter((question, index) => choices[index] === question.answer).length;
      const result = store.record({ taskId, sourceId: source.id, unitId: options.unitId, skill, type: options.type || "source", supported, unseen: firstExposure, success: correct === source.questions.length, reviewSource: "objective", difficulty: correct === source.questions.length ? "okay" : "hard" });
      delete store.state.support[supportKey]; store.save();
      host.querySelectorAll("input, button[type=submit]").forEach(node => { node.disabled = true; });
      host.querySelector("[data-source-result]").innerHTML = `<p>${correct} / ${source.questions.length} correct · ${supported ? "supported" : "without support"}. ${result.unseen ? "First encounter with this source in this skill." : "Repeated source; not new breadth of evidence."}</p><ul>${source.questions.map((question, index) => `<li>${choices[index] === question.answer ? "✓" : "Try again later"} <span lang="fi">${h(question.rationale)}</span></li>`).join("")}</ul><button type="button" class="primary-action" data-source-continue>Continue</button>`;
      host.querySelector("[data-source-continue]").onclick = () => options.onDone?.(result);
      status("Answers checked. Review each explanation before continuing.");
    };
  }

  function showSources() {
    clear(); mode = "sources"; header("Read and listen for an action", "COMPREHENSION · MULTIPLE SOURCES");
    const source = courseSources[sourceIndex];
    content().innerHTML = `<div class="course-settings"><label>Source<select id="sourceSelect">${courseSources.map((item, index) => `<option value="${index}">${h(item.topic)} · ${index + 1}</option>`).join("")}</select></label><label>Skill<select id="sourceSkill"><option value="reading">Reading</option><option value="listening">Listening</option></select></label></div><p>Answer for purpose, detail, and the next action. Repeating a source is useful review; it does not count as a new source.</p><div id="sourceActivity"></div><button type="button" class="secondary-action" id="sourceBack">Return to course</button>`;
    const select = content().querySelector("#sourceSelect"); select.value = String(sourceIndex); select.onchange = () => { sourceIndex = Number(select.value); showSources(); };
    const skill = content().querySelector("#sourceSkill"); skill.value = sourceSkill; skill.onchange = () => { sourceSkill = skill.value; showSources(); };
    bind("#sourceBack", show);
    renderSource(content().querySelector("#sourceActivity"), source, sourceSkill, { onDone: () => { sourceIndex = (sourceIndex + 1) % courseSources.length; showSources(); } });
    focusTask();
  }

  function showCheckpointStart() {
    clear(); mode = "checkpoint"; header("An independent four-skill checkpoint", "HELD-OUT PRACTICE · NOT AN OFFICIAL YKI TEST");
    const seen = new Set([...Object.keys(store.state.visited), ...store.state.attempts.filter(item => item.type === "checkpoint").map(item => item.sourceId)]);
    const next = checkpointSets.find(set => !seen.has(`checkpoint-${set.id}-reading`) && !seen.has(`checkpoint-${set.id}-listening`) && !seen.has(`checkpoint-${set.id}-writing`) && !seen.has(`checkpoint-${set.id}-speaking`));
    content().innerHTML = `<p>These scenarios are separate from the teaching material. Read, listen, write, and speak. No model answers are shown during an attempt. You may stop at any time.</p><p>${next ? "A fresh set is available." : "All three sets have been encountered. A repeat is useful practice, but it is no longer unseen."} Checkpoints are short samples, not a full YKI simulation or pass prediction.</p><label><input type="checkbox" id="timedCheckpoint">Use a 15-minute time limit for this checkpoint</label><div class="task-footer"><button type="button" class="primary-action" id="startHeldout">Start checkpoint</button><button type="button" class="secondary-action" id="cancelHeldout">Return to course</button></div>`;
    bind("#cancelHeldout", show);
    bind("#startHeldout", () => {
      checkpoint = { set: next || checkpointSets[0], step: 0, deadline: content().querySelector("#timedCheckpoint").checked ? Date.now() + 15 * 60000 : null };
      showCheckpointTask();
    });
    focusTask();
  }
  function checkpointClock() {
    clearInterval(timer);
    if (!checkpoint?.deadline) return;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((checkpoint.deadline - Date.now()) / 1000));
      document.querySelector("#ykiTimer").textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
      if (!seconds) {
        clearInterval(timer); timer = null; store.stopRecording(); window.speechSynthesis?.cancel();
        content().innerHTML = '<p>Checkpoint time is up. Your draft and submitted attempts are saved. Unfinished tasks have not been graded or counted.</p><button type="button" class="secondary-action" id="timeoutExport">Export saved work</button><button type="button" class="primary-action" id="timeoutReturn">Return to course</button>';
        bind("#timeoutExport", () => store.export()); bind("#timeoutReturn", show);
        status("Checkpoint ended. Review your saved work before trying another set.");
      }
    };
    tick(); if (Date.now() < checkpoint.deadline) timer = setInterval(tick, 1000);
  }
  function showCheckpointTask() {
    clear(); mode = "checkpoint";
    if (checkpoint.step >= 4) {
      header("Checkpoint saved", "PRACTICE EVIDENCE");
      const difficulties = store.state.attempts.filter(item => item.type === "checkpoint" && item.difficulty === "hard").slice(-4);
      content().innerHTML = `<div class="skill-bars">${store.profileMarkup()}</div><p>Next action: ${difficulties.length ? "revisit a practical unit in the skills you found hard, then try a changed scenario another day." : "take one spoken or written sample to a tutor and ask what to improve."} Self-reflection and checked comprehension remain separate.</p><button type="button" class="primary-action" id="checkpointDone">Return to course</button>`;
      bind("#checkpointDone", show); return;
    }
    const skill = ["reading", "listening", "writing", "speaking"][checkpoint.step];
    const taskId = `checkpoint-${checkpoint.set.id}-${skill}`;
    store.state.visited[taskId] = true; store.save();
    header(`Checkpoint ${checkpoint.step + 1} / 4 · ${skill}`, "INDEPENDENT PRACTICE");
    content().innerHTML = '<div id="checkpointActivity"></div><button type="button" class="secondary-action" id="leaveCheckpoint">Leave checkpoint · keep saved work</button>';
    bind("#leaveCheckpoint", show);
    const host = content().querySelector("#checkpointActivity");
    if (["reading", "listening"].includes(skill)) {
      const task = checkpoint.set[skill];
      renderSource(host, { id: taskId, text: task.text, questions: [{ prompt: task.question, options: task.options, answer: task.answer, rationale: task.options[task.answer] }] }, skill, { type: "checkpoint", onDone: () => { checkpoint.step++; showCheckpointTask(); } });
    } else {
      const firstExposure = store.expose(taskId, skill);
      host.innerHTML = `<p class="task-prompt" lang="fi">${h(checkpoint.set[skill])}</p><label for="checkpointAnswer">My Finnish answer or spoken-answer notes</label><textarea class="yki-textarea" id="checkpointAnswer"></textarea><div id="checkpointRecorder"></div><label><input type="checkbox" id="checkpointHelp">I used help or read from notes while speaking</label>${checkMarkup(["I communicated the requested points", "My meaning would be clear to the recipient", "I have one thing to improve"])}<div class="task-footer"><button type="button" class="primary-action" id="checkpointSave">Save reflection & continue</button><button type="button" class="secondary-action" id="checkpointExport">Download for tutor</button></div><p>The checklist is self-reflection. Your language is not graded by the site.</p>`;
      const input = host.querySelector("#checkpointAnswer"); input.value = store.state.drafts[taskId] || ""; input.oninput = () => saveDraft(taskId, input.value);
      const helped = host.querySelector("#checkpointHelp"); helped.checked = Boolean(store.state.support[taskId]); helped.onchange = () => { if (helped.checked) support(taskId); };
      if (skill === "speaking") store.attachRecorder(host.querySelector("#checkpointRecorder"), taskId);
      bind("#checkpointExport", () => textExport(taskId, checkpoint.set[skill], input.value, helped.checked));
      bind("#checkpointSave", () => {
        if (!GameCore.normalize(input.value)) { status("Add an answer or notes first. You may leave the checkpoint without a result."); return; }
        const complete = [...host.querySelectorAll("[data-self-check]")].every(node => node.checked);
        store.record({ taskId, sourceId: taskId, skill, type: "checkpoint", supported: helped.checked || store.state.support[taskId], unseen: firstExposure, reviewSource: "self", difficulty: complete ? "okay" : "hard" });
        checkpoint.step++; showCheckpointTask();
      });
    }
    checkpointClock();
    focusTask();
  }
  function focusTask() { const title = document.querySelector("#ykiTitle"); title.tabIndex = -1; title.focus({ preventScroll: true }); }
  window.BridgeCourse = { show, showSources, showCheckpointStart, stop: clear };
})();
