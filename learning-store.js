(function () {
  "use strict";
  const key = "nappara-course-v2";
  const skills = ["reading", "listening", "writing", "speaking"];
  const fresh = () => ({ schema: 2, attempts: [], completed: {}, drafts: {}, support: {}, visited: {}, feedback: {}, settings: { pair: "speaking-writing", minutes: 15 }, daily: {}, cursor: { unitId: bridgeUnits[0].id, step: 0 }, baseline: {} });
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (saved?.schema === 2) {
        const result = fresh();
        for (const field of ["completed", "drafts", "support", "visited", "feedback", "settings", "daily", "cursor", "baseline"]) {
          if (saved[field] && typeof saved[field] === "object" && !Array.isArray(saved[field])) result[field] = { ...result[field], ...saved[field] };
        }
        result.attempts = Array.isArray(saved.attempts) ? saved.attempts.filter(item => item && skills.includes(item.skill) && typeof item.taskId === "string" && typeof item.sourceId === "string" && Number.isFinite(Date.parse(item.at))) : [];
        return result;
      }
      const legacy = JSON.parse(localStorage.getItem("nappara-bridge-v1") || "{}");
      return { ...fresh(), ...GameCore.migrateBridgeProgress(legacy, originalBridgeIds) };
    } catch { return fresh(); }
  }
  let state = load();
  let activeAt = null;
  let cleanupRecording = () => {};
  function notice(text) { const node = document.querySelector("#ykiStatus"); if (node) node.textContent = text; }
  function save() {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { notice("Browser storage is unavailable or full. Export your work to keep it."); }
    window.dispatchEvent(new Event("learning-evidence"));
  }
  function trackTime() {
    const now = Date.now();
    if (activeAt !== null) {
      const today = GameCore.dateKey();
      state.daily[today] = (Number(state.daily[today]) || 0) + Math.min(60, Math.max(0, (now - activeAt) / 1000));
    }
    activeAt = now;
  }
  document.addEventListener("input", () => { trackTime(); save(); });
  document.addEventListener("click", () => { trackTime(); save(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) { trackTime(); activeAt = null; save(); } });
  function record(input) {
    const attempt = GameCore.createLearningAttempt(state.attempts, input);
    if (!skills.includes(attempt.skill)) return null;
    state.attempts.push(attempt); save(); return attempt;
  }
  function expose(sourceId, skill) {
    const id = `${sourceId}:${skill}`;
    const first = !state.visited[id]; state.visited[id] = true; save(); return first;
  }
  function escape(text) { const node = document.createElement("span"); node.textContent = String(text ?? ""); return node.innerHTML; }
  function download(name, text, type = "text/plain;charset=utf-8") {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement("a"); link.href = url; link.download = name; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function profileMarkup() {
    const evidence = GameCore.summarizeEvidence(state.attempts);
    return skills.map(skill => {
      const item = evidence[skill];
      const target = String(state.settings.pair).split("-").includes(skill);
      return `<article class="evidence-card"><h4>${skill}${target ? " · target pair" : ""}</h4><strong>${item.attempts} attempts · ${item.sources} distinct sources</strong><p>First encounters: ${item.unseen}<br>With support: ${item.supported}<br>Without support: ${item.independent}<br>Delayed successes: ${item.delayed}<br>Tutor-reviewed samples: ${item.reviewed}</p></article>`;
    }).join("");
  }
  function renderProfile() {
    const host = document.querySelector("#skillBars");
    if (host) host.innerHTML = profileMarkup();
    const total = document.querySelector("#readinessTotal");
    if (total) total.textContent = `${state.attempts.length} attempts`;
    const note = document.querySelector("#readinessNote");
    if (note) note.textContent = "Evidence of practice, not a B1 assessment. Without support does not mean correct. Delayed success requires an objective check or tutor review on changed material at least a day later.";
  }
  function stopRecording() { cleanupRecording(); cleanupRecording = () => {}; }
  function attachRecorder(host, taskId) {
    stopRecording();
    let alive = true, recorder = null, stream = null, url = null, chunks = [];
    const panel = document.createElement("div"); panel.className = "local-recorder";
    panel.innerHTML = `<p>Speak aloud, or make a local recording to review. Recording is optional.</p><button type="button" class="secondary-action record-local">Record my answer</button><p class="recorder-note" role="status"></p><div class="recorder-playback"></div>`;
    host.append(panel);
    const button = panel.querySelector("button");
    const note = panel.querySelector(".recorder-note");
    const endTracks = () => stream?.getTracks().forEach(track => track.stop());
    cleanupRecording = () => { alive = false; if (recorder?.state === "recording") recorder.stop(); endTracks(); if (url) URL.revokeObjectURL(url); };
    button.onclick = async () => {
      if (recorder?.state === "recording") { recorder.stop(); return; }
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { note.textContent = "Recording is unavailable. Speak aloud and use the written notes instead."; return; }
      button.disabled = true;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!alive) { endTracks(); return; }
        chunks = []; recorder = new MediaRecorder(stream);
        recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
        recorder.onstop = () => {
          endTracks(); if (!alive) return;
          if (url) URL.revokeObjectURL(url);
          url = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }));
          const playback = panel.querySelector(".recorder-playback"); playback.replaceChildren();
          const audio = document.createElement("audio"); audio.controls = true; audio.src = url;
          const link = document.createElement("a"); link.href = url; link.download = `${taskId}.${recorder.mimeType.includes("mp4") ? "m4a" : recorder.mimeType.includes("ogg") ? "ogg" : "webm"}`; link.textContent = "Download recording for tutor review";
          playback.append(audio, link); button.textContent = "Record again";
          note.textContent = "Recording stays on this device. Download before leaving this activity; it is not saved with your course drafts.";
        };
        recorder.start(); button.textContent = "Stop recording"; note.textContent = "Recording locally. Press Stop when finished.";
      } catch { endTracks(); if (alive) note.textContent = "Microphone access is unavailable. You can speak aloud and use notes."; }
      finally { if (alive) button.disabled = false; }
    };
  }
  window.LearningStore = { get state() { return state; }, save, record, expose, escape, download, notice, profileMarkup, renderProfile, attachRecorder, stopRecording,
    reset() { stopRecording(); state = fresh(); save(); },
    export() { download("nappara-course-progress.json", JSON.stringify(state, null, 2), "application/json"); } };
  window.addEventListener("learning-evidence", renderProfile);
})();
