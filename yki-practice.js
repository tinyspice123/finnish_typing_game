(function () {
  "use strict";

  const STORAGE_KEY = "nappara-yki-v1";
  const { scheduleReview, isReviewDue, normalize } = GameCore;
  const writingTasks = [
    { id: "w-landlord", topic: "Asuminen", register: "Formal message", minutes: 8, prompt: "Keittiön hana vuotaa. Kirjoita viesti vuokranantajalle.", points: ["Kerro, mikä ongelma on.", "Kerro, milloin ongelma alkoi.", "Pyydä korjausta ja ehdota sopivaa aikaa."], keys: ["hana", "vuotaa", "alk", "korja", "sopi"], model: "Hei,\n\nKeittiöni hana on vuotanut eilisestä lähtien. Vettä valuu jatkuvasti, vaikka hana on kiinni. Voisitteko järjestää korjauksen mahdollisimman pian? Olen kotona huomenna kello 16 jälkeen.\n\nYstävällisin terveisin,\nAlex" },
    { id: "w-cancel", topic: "Vuorovaikutus", register: "Polite message", minutes: 6, prompt: "Et pääse sovittuun tapaamiseen. Kirjoita viesti henkilölle, jonka kanssa sovit tapaamisen.", points: ["Pahoittele ja kerro, ettet pääse.", "Kerro lyhyesti syy.", "Ehdota kahta uutta aikaa."], keys: ["anteeksi", "valitettavasti", "koska", "sopis", "aika"], model: "Hei! Valitettavasti en pääse huomiseen tapaamiseen, koska lapseni on sairastunut. Olen pahoillani muutoksesta. Sopisiko sinulle torstaina kello 15 tai perjantaina aamupäivällä?" },
    { id: "w-complaint", topic: "Palvelut", register: "Formal complaint", minutes: 10, prompt: "Tilasit verkkokaupasta takin, mutta sait väärän koon. Kirjoita reklamaatio.", points: ["Kerro, mitä tilasit ja mitä sait.", "Mainitse tilausnumero 5482.", "Kerro, miten haluat asian ratkaistavan."], keys: ["tilasin", "koko", "5482", "vaiht", "palaut"], model: "Hei,\n\nTilasin verkkokaupastanne mustan takin koossa M, mutta paketissa oli koko S. Tilausnumeroni on 5482. Haluaisin vaihtaa takin oikeaan kokoon ilman lisäkuluja. Voisitteko lähettää palautusohjeet?\n\nYstävällisin terveisin" },
    { id: "w-opinion", topic: "Ympäristö", register: "Opinion text", minutes: 12, prompt: "Pitäisikö keskustassa rajoittaa yksityisautoilua? Kirjoita mielipiteesi.", points: ["Ilmaise mielipiteesi selvästi.", "Anna vähintään kaksi perustelua.", "Mainitse myös vastakkainen näkökulma."], keys: ["mielestäni", "koska", "lisäksi", "toisaalta", "siksi"], model: "Mielestäni yksityisautoilua pitäisi rajoittaa keskustassa. Ensinnäkin ilmanlaatu paranisi ja melu vähenisi. Lisäksi kävely ja pyöräily olisivat turvallisempia. Toisaalta auto on joillekin välttämätön, joten liikuntarajoitteisille pitäisi taata pääsy keskustaan. Siksi rajoitukset kannattaa toteuttaa vähitellen." }
  ];
  const phraseTasks = [
    { id: "p-request", before: "Kirjoitat virallisen pyynnön: ", gap: "____ lähettää minulle kirjallisen vahvistuksen?", answer: "Voisitteko", options: ["Voisitteko", "Haluatko", "Pitäisitkö"], note: "Voisitteko…? is a safe, polite structure for formal requests." },
    { id: "p-opinion", before: "Esität tasapainoisen mielipiteen: ", gap: "____ ehdotuksessa on hyviä puolia, mutta se maksaa paljon.", answer: "Mielestäni", options: ["Mielestäni", "Valitettavasti", "Esimerkiksi"], note: "Mielestäni introduces your own opinion clearly." },
    { id: "p-contrast", before: "Näytät asian toisen puolen: ", gap: "Pyöräily on edullista. ____, talvella se voi olla hankalaa.", answer: "Toisaalta", options: ["Toisaalta", "Sen vuoksi", "Ensinnäkin"], note: "Toisaalta introduces a contrasting viewpoint." },
    { id: "p-reason", before: "Perustelet yhteydenoton: ", gap: "Otan yhteyttä, ____ laskussa on virhe.", answer: "koska", options: ["koska", "vaikka", "jotta"], note: "Koska gives the reason; jotta expresses a purpose." },
    { id: "p-solution", before: "Ehdotat ratkaisua: ", gap: "____, että tapaamme ensi viikon maanantaina.", answer: "Ehdotan", options: ["Ehdotan", "Väitän", "Muistan"], note: "Ehdotan, että… is useful in both speaking and writing tasks." },
    { id: "p-concession", before: "Yhdistät kaksi vastakkaista asiaa: ", gap: "____ palvelu oli hidasta, työntekijä oli ystävällinen.", answer: "Vaikka", options: ["Vaikka", "Koska", "Jotta"], note: "Vaikka creates an although-clause; the main clause does not need silti, but it may be used." }
  ];
  const speakingTasks = [
    { id: "s-health", topic: "Terveys", prep: 30, seconds: 60, prompt: "Soitat terveyskeskukseen. Kuvaile oireesi, kerro kuinka kauan ne ovat kestäneet ja pyydä aikaa lääkärille.", checks: ["Kuvailin oireet", "Kerroin, milloin ne alkoivat", "Pyysin aikaa", "Puhuin kokonaisilla lauseilla"] },
    { id: "s-late", topic: "Työ", prep: 20, seconds: 45, prompt: "Jätä esihenkilöllesi viesti: myöhästyt töistä noin puoli tuntia. Selitä syy ja kerro, milloin saavut.", checks: ["Tervehdin", "Kerroin myöhästymisestä", "Annoin syyn", "Kerroin saapumisajan"] },
    { id: "s-opinion", topic: "Yhteiskunta", prep: 40, seconds: 90, prompt: "Kerro mielipiteesi: pitäisikö joukkoliikenteen olla nykyistä halvempaa? Anna kaksi perustelua ja huomioi toinen näkökulma.", checks: ["Ilmaisin mielipiteen", "Annoin kaksi perustelua", "Käytin yhdistäviä sanoja", "Huomioin toisen näkökulman"] }
  ];
  const comprehensionTasks = [
    { id: "r-library", skill: "reading", topic: "Palvelut", source: "Kirjasto suljetaan keskiviikkona henkilökunnan koulutuksen vuoksi jo kello 16. Omatoimikirjasto palvelee rekisteröityneitä asiakkaita normaalisti kello 21:een asti. Palautusluukku on käytössä koko illan.", question: "Miten rekisteröitynyt asiakas voi käyttää kirjastoa kello 18?", options: ["Hän voi käyttää omatoimikirjastoa.", "Hänen täytyy odottaa torstaihin.", "Hän voi käyttää vain palautusluukkua."], answer: 0, explanation: "Henkilökunta lähtee kello 16, mutta omatoimikirjasto on auki rekisteröityneille asiakkaille kello 21:een." },
    { id: "r-rent", skill: "reading", topic: "Asuminen", source: "Vuokra nousee 1. tammikuuta alkaen 25 euroa kuukaudessa. Korotus perustuu vuokrasopimuksessa mainittuun elinkustannusindeksiin. Jos teillä on kysyttävää, ottakaa yhteyttä isännöitsijään viimeistään 15. joulukuuta.", question: "Miksi vuokra nousee?", options: ["Asuntoon tehdään remontti.", "Korotus perustuu sopimuksen indeksiin.", "Isännöitsijä on vaihtunut."], answer: 1, explanation: "Ilmoituksessa sanotaan suoraan, että korotus perustuu elinkustannusindeksiin." },
    { id: "l-train", skill: "listening", topic: "Matkailu", source: "Huomio, matkustajat. Turkuun kello seitsemäntoista kaksikymmentä lähtevä juna on noin kaksikymmentä minuuttia myöhässä teknisen vian vuoksi. Juna lähtee poikkeuksellisesti raiteelta kahdeksan.", question: "Mikä matkustajan pitää huomata?", options: ["Juna on peruttu.", "Lähtöaika ja raide ovat muuttuneet.", "Juna lähtee tavalliselta raiteelta."], answer: 1, explanation: "Juna myöhästyy noin 20 minuuttia ja lähtee poikkeuksellisesti raiteelta 8." },
    { id: "l-appointment", skill: "listening", topic: "Terveys", source: "Hei, täällä on Keskustan hammashoitola. Huominen aikasi on jouduttu siirtämään hammaslääkärin sairastumisen vuoksi. Uusi aika on ensi viikon tiistaina kello 10. Jos aika ei sovi, soita meille ennen perjantaita.", question: "Mitä asiakkaan pitää tehdä, jos uusi aika ei sovi?", options: ["Tulla huomenna paikalle.", "Vastata sähköpostilla tiistaina.", "Soittaa ennen perjantaita."], answer: 2, explanation: "Viestissä pyydetään soittamaan ennen perjantaita, jos uusi aika ei sovi." }
  ];

  const vocabulary = {
    "Everyday Finnish": [
      ["sopia", "to suit; to agree", "Sopisiko sinulle huomenna?"],
      ["tarvita", "to need", "Tarvitsen apua tämän asian kanssa."],
      ["mahdollisimman pian", "as soon as possible", "Voisitteko vastata mahdollisimman pian?"],
      ["valitettavasti", "unfortunately", "Valitettavasti en pääse tapaamiseen."],
      ["sen vuoksi", "because of that", "Olen sairaana ja sen vuoksi jään kotiin."],
      ["ottaa yhteyttä", "to contact", "Otan yhteyttä asiakaspalveluun."]
    ],
    "Housing": [
      ["vuokranantaja", "landlord", "Kirjoitan viestin vuokranantajalle."],
      ["hana vuotaa", "the tap is leaking", "Keittiön hana vuotaa."],
      ["korjaus", "repair", "Pyydän korjausta mahdollisimman pian."],
      ["vuokrasopimus", "rental agreement", "Tarkistan asian vuokrasopimuksesta."],
      ["korotus", "increase", "Vuokran korotus alkaa tammikuussa."],
      ["isännöitsijä", "property manager", "Ota yhteyttä isännöitsijään."]
    ],
    "Services": [
      ["reklamaatio", "complaint", "Kirjoitan tuotteesta reklamaation."],
      ["väärä koko", "wrong size", "Sain takin väärässä koossa."],
      ["vaihtaa", "to exchange; change", "Haluaisin vaihtaa tuotteen."],
      ["palautusohjeet", "return instructions", "Lähettäkää minulle palautusohjeet."],
      ["henkilökunta", "staff", "Henkilökunta auttaa asiakkaita."],
      ["olla käytössä", "to be available/in use", "Palautusluukku on käytössä illalla."]
    ],
    "Health and work": [
      ["oire", "symptom", "Kuvailen oireeni hoitajalle."],
      ["kestää", "to last", "Oireet ovat kestäneet kolme päivää."],
      ["varata aika", "to book an appointment", "Haluaisin varata ajan lääkärille."],
      ["myöhästyä", "to be late", "Myöhästyn töistä puoli tuntia."],
      ["esihenkilö", "supervisor", "Jätän viestin esihenkilölleni."],
      ["saapua", "to arrive", "Saavun työpaikalle kello yhdeksän."]
    ],
    "Opinions": [
      ["mielestäni", "in my opinion", "Mielestäni joukkoliikenteen pitäisi olla halvempaa."],
      ["ensinnäkin", "firstly", "Ensinnäkin se vähentäisi liikennettä."],
      ["lisäksi", "in addition", "Lisäksi ilmanlaatu paranisi."],
      ["toisaalta", "on the other hand", "Toisaalta auto on joillekin välttämätön."],
      ["vaikka", "although; even though", "Vaikka palvelu oli hidasta, se oli ystävällistä."],
      ["ehdottaa", "to suggest", "Ehdotan, että tapaamme maanantaina."]
    ]
  };

  const courseLessons = {
    "Everyday Finnish": { description: "Build the core verbs and polite expressions that appear across every practice area.", model: "Valitettavasti en pääse tapaamiseen. Otan sinuun yhteyttä mahdollisimman pian, jotta voimme sopia uuden ajan.", translation: "Unfortunately, I cannot attend the meeting. I will contact you as soon as possible so that we can agree on a new time.", next: "phrases" },
    "Housing": { description: "Handle a repair problem and understand common housing notices.", model: "Hei, keittiöni hana vuotaa. Ongelma alkoi eilen. Voisitteko järjestää korjauksen mahdollisimman pian?", translation: "Hello, my kitchen tap is leaking. The problem began yesterday. Could you arrange a repair as soon as possible?", next: "writing" },
    "Services": { description: "Ask for help, return a product, and understand service information.", model: "Tilasin takin koossa M, mutta sain väärän koon. Haluaisin vaihtaa tuotteen. Voisitteko lähettää palautusohjeet?", translation: "I ordered a coat in size M, but received the wrong size. I would like to exchange the product. Could you send the return instructions?", next: "writing" },
    "Health and work": { description: "Explain symptoms, book an appointment, and report that you will be late.", model: "Minulla on ollut selkäkipua kolme päivää. Haluaisin varata ajan lääkärille mahdollisimman pian.", translation: "I have had back pain for three days. I would like to book a doctor's appointment as soon as possible.", next: "speaking" },
    "Opinions": { description: "Give a clear opinion, support it, and acknowledge another viewpoint.", model: "Mielestäni joukkoliikenteen pitäisi olla halvempaa. Ensinnäkin se vähentäisi liikennettä. Toisaalta muutos maksaisi kaupungille paljon.", translation: "In my opinion, public transport should be cheaper. Firstly, it would reduce traffic. On the other hand, the change would cost the city a lot.", next: "speaking" }
  };

  const taskHelp = {
    "w-landlord": "Your kitchen tap is leaking. Write to your landlord. Say what is wrong, when it began, and ask for a repair while suggesting a suitable time.",
    "w-cancel": "You cannot attend an agreed meeting. Apologize, briefly explain why, and suggest two new times.",
    "w-complaint": "You ordered a coat online but received the wrong size. Write a complaint mentioning what happened, order number 5482, and the solution you want.",
    "w-opinion": "Give your opinion on limiting private cars in the city centre. Include two reasons and acknowledge the opposite point of view.",
    "p-request": "Choose the phrase that makes this a polite formal request: asking someone to send written confirmation.",
    "p-opinion": "Choose the phrase that clearly introduces your own opinion.",
    "p-contrast": "Choose the linking word that introduces the other side of an argument.",
    "p-reason": "Choose the conjunction that gives the reason for contacting someone.",
    "p-solution": "Choose the verb used to propose a solution or plan.",
    "p-concession": "Choose the conjunction meaning 'although' or 'even though'.",
    "s-health": "Call a health centre. Describe your symptoms, say how long they have lasted, and ask for a doctor's appointment.",
    "s-late": "Leave your supervisor a message saying you will be about 30 minutes late. Explain why and say when you will arrive.",
    "s-opinion": "Say whether public transport should be cheaper. Give two reasons and mention another point of view.",
    "r-library": "The question asks: How can a registered customer use the library at 18:00? Look for what remains available after staff leave.",
    "r-rent": "The question asks: Why is the rent increasing? Find the sentence that states the reason for the increase.",
    "l-train": "The question asks: What must the passenger notice? Listen for changes to the journey details.",
    "l-appointment": "The question asks: What should the customer do if the new appointment time is unsuitable? Listen for the requested action and deadline."
  };

  const ui = {
    workspace: document.querySelector("#ykiWorkspace"), typing: document.querySelector("#typingPractice"), content: document.querySelector("#ykiContent"),
    kicker: document.querySelector("#ykiKicker"), title: document.querySelector("#ykiTitle"), timer: document.querySelector("#ykiTimer"), status: document.querySelector("#ykiStatus"),
    total: document.querySelector("#readinessTotal"), bars: document.querySelector("#skillBars"), note: document.querySelector("#readinessNote")
  };
  let state = load();
  let timerId = null;
  const attemptHelp = new Set();
  const attemptUnseen = new Map();

  function load() {
    const fallback = { schema: 2, reviews: {}, results: { writing: [], speaking: [], reading: [], listening: [] }, completed: {}, help: {}, courses: {} };
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.schema !== 2) return { ...fallback, reviews: saved.reviews || {}, completed: saved.completed || {}, help: saved.help || {} };
      return { ...fallback, ...saved, results: { ...fallback.results, ...(saved.results || {}) } };
    } catch { return fallback; }
  }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function sample(items) {
    const due = items.filter((item) => isReviewDue(state.reviews[item.id]));
    const unseen = items.filter((item) => !state.reviews[item.id]);
    const pool = due.length ? due : unseen.length ? unseen : items;
    return pool[Math.floor(Math.random() * pool.length)];
  }
  function addResult(skill, score, id, rating, evidence = {}) {
    // Preserve old history, but never turn heuristic scores or reflection into proficiency.
    LearningStore.record({ taskId: id, sourceId: id, skill, unseen: attemptUnseen.get(id), supported: attemptHelp.has(id), reviewSource: ["reading", "listening"].includes(skill) ? "objective" : "self", success: ["reading", "listening"].includes(skill) ? score === 100 : null, difficulty: rating < 2 ? "hard" : "okay", ...evidence });
    state.completed[id] = (state.completed[id] || 0) + 1;
    state.reviews[id] = scheduleReview(state.reviews[id], attemptHelp.has(id) ? 1 : rating);
    save(); renderReadiness();
  }
  function recordReview(id, rating) {
    state.completed[id] = (state.completed[id] || 0) + 1;
    state.reviews[id] = scheduleReview(state.reviews[id], rating);
    save(); renderReadiness();
  }
  function setHeader(kicker, title, timed) { ui.kicker.textContent = kicker; ui.title.textContent = title; ui.timer.textContent = timed || "Untimed"; ui.status.textContent = ""; }
  function clearTimer() { clearInterval(timerId); timerId = null; }
  function startTimer(seconds, done) {
    clearTimer(); let left = seconds;
    const tick = () => { ui.timer.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`; if (left-- <= 0) { clearTimer(); done?.(); } };
    tick(); timerId = setInterval(tick, 1000);
  }
  function meta(topic, label) { return `<div class="task-meta"><span>${topic}</span><span>${label}</span></div>`; }
  function safe(text) { const node = document.createElement("div"); node.textContent = text; return node.innerHTML; }
  function helpMarkup(task, inMock = false) {
    if (inMock || !taskHelp[task.id]) return "";
    const panelId = `help-${task.id}`;
    return `<div class="learning-help"><button class="secondary-action help-button" type="button" aria-expanded="false" aria-controls="${panelId}">Help me understand</button><div class="help-panel" id="${panelId}" hidden><strong>In plain English</strong><p>${safe(taskHelp[task.id])}</p><small>Try answering in Finnish. Using help is part of learning.</small></div></div>`;
  }
  function attachHelp(task) {
    const button = document.querySelector(".help-button");
    const panel = document.querySelector(".help-panel");
    if (!button || !panel) return;
    button.onclick = () => {
      const show = panel.hidden;
      panel.hidden = !show;
      button.setAttribute("aria-expanded", String(show));
      button.textContent = show ? "Hide help" : "Help me understand";
      if (show) { state.help[task.id] = true; attemptHelp.add(task.id); LearningStore.state.support[task.id] = true; LearningStore.save(); save(); }
    };
  }

  function showLearn(selectedTopic = Object.keys(vocabulary)[0], step = 0) {
    clearTimer();
    setHeader("GUIDED COURSES", "Learn it before you are tested");
    const topics = Object.keys(vocabulary);
    const lesson = courseLessons[selectedTopic];
    const courseNav = `<div class="course-list" role="list" aria-label="Available courses">${topics.map((topic) => `<button type="button" class="course-card${topic === selectedTopic ? " is-current" : ""}" data-course="${safe(topic)}"><span>${state.courses[topic] ? "✓ Complete" : "3 short lessons"}</span><strong>${safe(topic)}</strong><small>${safe(courseLessons[topic].description)}</small></button>`).join("")}</div>`;
    const steps = `<div class="lesson-steps" aria-label="Course lessons">${["Words", "In context", "Ready check"].map((label, index) => `<button type="button" data-step="${index}" class="${step === index ? "is-current" : ""}" aria-current="${step === index ? "step" : "false"}"><span>${index + 1}</span>${label}</button>`).join("")}</div>`;
    let lessonContent = "";
    if (step === 0) lessonContent = `<div class="learn-controls"><p>Reveal each meaning, then read the Finnish example aloud.</p><button class="secondary-action" id="revealAll" type="button">Reveal all meanings</button></div><div class="vocab-grid">${vocabulary[selectedTopic].map(([word, meaning, example], index) => `<article class="vocab-card"><div class="vocab-card-top"><strong lang="fi">${safe(word)}</strong><button type="button" class="reveal-word" aria-expanded="false" aria-controls="vocab-${index}">Reveal</button></div><div id="vocab-${index}" hidden><p class="vocab-meaning"><span class="visually-hidden">English: </span>${safe(meaning)}</p><p class="vocab-example" lang="fi">${safe(example)}</p></div></article>`).join("")}</div><div class="learn-next"><button class="primary-action" type="button" data-course-step="1">Next: see it in context</button></div>`;
    if (step === 1) lessonContent = `<div class="model-lesson"><p class="eyebrow">MODEL FINNISH</p><p class="model-finnish" lang="fi">${safe(lesson.model)}</p><button class="secondary-action" id="showCourseTranslation" type="button" aria-expanded="false">Show translation</button><p class="course-translation" id="courseTranslation" hidden>${safe(lesson.translation)}</p><div class="lesson-tip"><strong>Notice the reusable structure</strong><p>Read the model twice. Then cover it and say the main idea in your own words. You do not need to memorize every word.</p></div></div><div class="learn-next"><button class="primary-action" type="button" data-course-step="2">Next: ready check</button><button class="secondary-action" type="button" data-course-step="0">Back to words</button></div>`;
    if (step === 2) lessonContent = `<div class="ready-check"><p class="eyebrow">QUICK SELF-CHECK</p><h3>Can you do these without looking?</h3><div class="check-list">${["I recognize the six key words", "I understand the model text", "I can reuse at least one phrase in my own answer"].map((item) => `<label><input type="checkbox" class="course-check"> <span>${item}</span></label>`).join("")}</div><p class="ready-note" id="courseReadyNote">Tick all three when you feel ready. You can repeat any lesson first.</p><button class="primary-action" id="completeCourse" type="button" disabled>Complete course</button></div><div class="learn-next"><button class="secondary-action" type="button" data-course-step="1">Back to model</button></div>`;
    ui.content.innerHTML = `<p class="learn-intro">Each course gives you the essential vocabulary and a model answer before practice. English stays hidden until you ask for it.</p>${courseNav}<section class="course-lesson" aria-labelledby="courseTitle"><p class="eyebrow">${state.courses[selectedTopic] ? "COURSE COMPLETE · REVIEW ANY TIME" : "CURRENT COURSE"}</p><h3 id="courseTitle">${safe(selectedTopic)}</h3><p>${safe(lesson.description)}</p>${steps}${lessonContent}</section>`;
    document.querySelectorAll("[data-course]").forEach((button) => button.onclick = () => showLearn(button.dataset.course, 0));
    document.querySelectorAll("[data-step], [data-course-step]").forEach((button) => button.onclick = () => showLearn(selectedTopic, Number(button.dataset.step ?? button.dataset.courseStep)));
    const revealButtons = [...document.querySelectorAll(".reveal-word")];
    revealButtons.forEach((button) => button.onclick = () => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const show = panel.hidden;
      panel.hidden = !show; button.setAttribute("aria-expanded", String(show)); button.textContent = show ? "Hide" : "Reveal";
    });
    if (document.querySelector("#revealAll")) document.querySelector("#revealAll").onclick = () => revealButtons.forEach((button) => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      panel.hidden = false; button.setAttribute("aria-expanded", "true"); button.textContent = "Hide";
    });
    const translationButton = document.querySelector("#showCourseTranslation");
    if (translationButton) translationButton.onclick = () => { const translation = document.querySelector("#courseTranslation"); const show = translation.hidden; translation.hidden = !show; translationButton.setAttribute("aria-expanded", String(show)); translationButton.textContent = show ? "Hide translation" : "Show translation"; };
    const checks = [...document.querySelectorAll(".course-check")];
    const complete = document.querySelector("#completeCourse");
    checks.forEach((check) => check.onchange = () => { complete.disabled = !checks.every((item) => item.checked); });
    if (complete) complete.onclick = () => { state.courses[selectedTopic] = true; save(); ui.status.textContent = `${selectedTopic} course complete. Your practice is ready.`; switchView(lesson.next); };
  }

  function showWriting(task = sample(writingTasks)) {
    attemptUnseen.set(task.id, LearningStore.expose(task.id, "writing"));
    attemptHelp.delete(task.id);
    setHeader("ACTIVE RECALL", "Write from a real situation", `Suggested: ${task.minutes} min · untimed`);
    ui.content.innerHTML = `${meta(task.topic, task.register)}<p class="task-prompt" lang="fi">${task.prompt}</p><ul class="task-details">${task.points.map((p) => `<li>${p}</li>`).join("")}</ul><textarea class="yki-textarea" id="ykiAnswer" lang="fi" placeholder="Kirjoita vastauksesi suomeksi…" aria-label="Your Finnish response"></textarea><div class="task-footer"><button class="primary-action" id="checkWriting">Check my response</button><button class="secondary-action" id="showModel">Show model</button><span class="word-count" id="wordCount">0 words</span></div><div id="taskFeedback"></div>`;
    document.querySelector("#ykiAnswer").insertAdjacentHTML("beforebegin", helpMarkup(task));
    attachHelp(task);
    const answer = document.querySelector("#ykiAnswer");
    answer.value = LearningStore.state.drafts[task.id] || "";
    if (LearningStore.state.support[task.id]) attemptHelp.add(task.id);
    answer.addEventListener("input", () => { document.querySelector("#wordCount").textContent = `${normalize(answer.value).split(" ").filter(Boolean).length} words`; LearningStore.state.drafts[task.id] = answer.value; LearningStore.save(); });
    document.querySelector("#showModel").onclick = () => { state.help[task.id] = true; attemptHelp.add(task.id); LearningStore.state.support[task.id] = true; LearningStore.save(); save(); showWritingFeedback(task, answer.value, true); };
    document.querySelector("#checkWriting").onclick = () => showWritingFeedback(task, answer.value, false);
  }
  function showWritingFeedback(task, answer, usedHelp) {
    if (!normalize(answer) && !usedHelp) { ui.status.textContent = "Write a response first. Keywords alone are not an assessment of communication."; return; }
    const alternatives = {
      "w-landlord": "Hei! Keittiön hana on rikki. Se alkoi vuotaa eilen. Voisiko joku tulla korjaamaan sen huomenna iltapäivällä?",
      "w-cancel": "Hei! Anteeksi, en voi tulla huomenna, sillä olen sairas. Voimmeko tavata torstaina kolmelta tai perjantaina aamulla?",
      "w-complaint": "Hei! Tilauksessa 5482 piti olla M-kokoinen takki, mutta sain koon S. Voinko vaihtaa sen? Pyydän ohjeita palautukseen.",
      "w-opinion": "Minusta keskustassa voisi olla vähemmän autoja, koska melu vähenisi ja kävely olisi turvallisempaa. Jotkut kuitenkin tarvitsevat autoa. Heille pitää järjestää toimiva ratkaisu."
    };
    document.querySelector("#taskFeedback").innerHTML = `<div class="feedback-panel"><h3>Review what you communicated</h3><p>Automatic observation: ${normalize(answer).split(" ").filter(Boolean).length} words written. Length and keywords do not tell us whether the message works.</p><p>Self-reflection: read each point and decide whether your recipient would understand it. Your wording can differ from the examples.</p><div class="check-list">${task.points.map((p) => `<label><input type="checkbox" class="writing-check"> <span>${p}</span></label>`).join("")}</div><label><input type="checkbox" id="writingOutsideHelp">I used other help</label><details><summary>Compare possible answers after submission</summary><div class="model-answer" lang="fi">${safe(task.model)}</div><h4>Another way to communicate it</h4><p lang="fi">${safe(alternatives[task.id] || task.model)}</p></details><button type="button" class="secondary-action" id="exportWriting">Download answer for tutor review</button><p>Tutor feedback is separate: download your sample, ask whether the meaning is clear and the requested points are covered, then record received feedback in the bridge course.</p><div class="rating-row"><span>How independent was this?</span><button class="rating-button" data-rate="1">Needed help</button><button class="rating-button" data-rate="2">Mostly mine</button><button class="rating-button" data-rate="3">Confident</button></div></div>`;
    document.querySelector("#exportWriting").onclick = () => LearningStore.download(`${task.id}.txt`, `Task: ${task.prompt}\n\n${answer}\n\nTutor: Is the meaning clear? Are the requested points covered? What should I improve?`);
    document.querySelector("#taskFeedback details").addEventListener("toggle", event => { if (event.target.open) { attemptHelp.add(task.id); LearningStore.state.support[task.id] = true; LearningStore.save(); } });
    document.querySelectorAll("[data-rate]").forEach((button) => button.onclick = () => {
      if (!normalize(answer)) { ui.status.textContent = "Write your own response first, then check it to save a reflection."; return; }
      if (usedHelp || Number(button.dataset.rate) < 3 || document.querySelector("#writingOutsideHelp").checked) attemptHelp.add(task.id);
      const checked = [...document.querySelectorAll(".writing-check")].every(item => item.checked);
      const rating = checked ? Number(button.dataset.rate) : 1;
      addResult("writing", 0, task.id, rating);
      document.querySelectorAll("[data-rate]").forEach(item => { item.disabled = true; });
      LearningStore.state.drafts[`${task.id}:submitted:${Date.now()}`] = answer;
      delete LearningStore.state.drafts[task.id]; delete LearningStore.state.support[task.id]; LearningStore.save();
      ui.status.textContent = "Self-reflection saved. This task is scheduled for review.";
      const next = document.createElement("button"); next.type = "button"; next.className = "primary-action"; next.textContent = "Next writing task"; next.onclick = () => showWriting(); document.querySelector("#taskFeedback").append(next);
    });
  }

  function showPhrases(task = sample(phraseTasks)) {
    setHeader("USEFUL STRUCTURES", "Build an answer that flows");
    ui.content.innerHTML = `${meta("B1–B2", "Phrase training")}<p class="task-prompt">${task.before}<span class="phrase-blank">${task.gap}</span></p><div class="answer-grid">${task.options.map((option) => `<button class="answer-option" data-option="${safe(option)}">${option}</button>`).join("")}</div><div id="taskFeedback"></div>`;
    document.querySelector(".answer-grid").insertAdjacentHTML("beforebegin", helpMarkup(task));
    attachHelp(task);
    document.querySelectorAll("[data-option]").forEach((button) => button.onclick = () => {
      const correct = button.dataset.option === task.answer;
      document.querySelectorAll("[data-option]").forEach((item) => { item.disabled = true; if (item.dataset.option === task.answer) item.classList.add("correct"); });
      if (!correct) button.classList.add("wrong");
      document.querySelector("#taskFeedback").innerHTML = `<div class="feedback-panel"><h3>${correct ? "Hyvä!" : `Answer: ${task.answer}`}</h3><p>${task.note}</p><button class="primary-action" id="nextPhrase">Next phrase</button></div>`;
      recordReview(task.id, correct ? 3 : 1);
      document.querySelector("#nextPhrase").onclick = () => showPhrases();
    });
  }

  function showSpeaking(task = sample(speakingTasks)) {
    attemptUnseen.set(task.id, LearningStore.expose(task.id, "speaking"));
    attemptHelp.delete(task.id); LearningStore.stopRecording();
    setHeader("SPEAKING", "Say it in your own words");
    ui.content.innerHTML = `${meta(task.topic, `${task.seconds} second suggested response`)}<p class="task-prompt" lang="fi">${task.prompt}</p><div class="recorder-actions"><button class="primary-action" id="startSpeakingPrep">Start optional preparation timer</button><button class="secondary-action" id="skipRecording">Reflect on my response</button></div><div id="localSpeakingRecorder"></div><div id="recordingResult"></div>`;
    document.querySelector(".recorder-actions").insertAdjacentHTML("beforebegin", helpMarkup(task));
    attachHelp(task);
    LearningStore.attachRecorder(document.querySelector("#localSpeakingRecorder"), task.id);
    document.querySelector("#startSpeakingPrep").onclick = () => startTimer(task.prep, () => { ui.timer.textContent = "Ready to speak"; });
    document.querySelector("#skipRecording").onclick = () => speakingChecklist(task);
  }
  function speakingChecklist(task, replace = true) {
    const host = document.querySelector("#recordingResult");
    const checklist = `<div class="feedback-panel"><h3>Reflect on your response</h3><p>This is your reflection, not a speaking score. Speak aloud first, then add brief notes.</p><label for="speakingNotes">What I said</label><textarea id="speakingNotes" class="yki-textarea" lang="fi"></textarea><div class="check-list">${task.checks.map((p) => `<label><input type="checkbox" class="speak-check"> <span>${p}</span></label>`).join("")}</div><label><input type="checkbox" id="speakingUsedHelp">I used help or read from notes</label><button class="primary-action" id="saveSpeaking">Save reflection</button><button class="secondary-action" id="exportSpeaking">Download notes for tutor</button></div>`;
    if (replace) host.innerHTML = checklist; else host.insertAdjacentHTML("beforeend", checklist);
    document.querySelector("#exportSpeaking").onclick = () => LearningStore.download(`${task.id}.txt`, `${task.prompt}\n\n${document.querySelector("#speakingNotes").value}`);
    document.querySelector("#saveSpeaking").onclick = () => {
      if (!normalize(document.querySelector("#speakingNotes").value)) { ui.status.textContent = "Add a few notes about what you said first."; return; }
      if (document.querySelector("#speakingUsedHelp").checked) attemptHelp.add(task.id);
      const count = document.querySelectorAll(".speak-check:checked").length; const score = Math.round(count / task.checks.length * 100);
      LearningStore.state.drafts[task.id] = document.querySelector("#speakingNotes").value;
      addResult("speaking", 0, task.id, score >= 75 ? 3 : score >= 50 ? 2 : 1);
      document.querySelector("#saveSpeaking").disabled = true;
      ui.status.textContent = "Reflection saved. Try the prompt again later and improve one thing.";
      const next = document.createElement("button"); next.type = "button"; next.className = "primary-action"; next.textContent = "Next speaking task"; next.onclick = () => showSpeaking(); host.append(next);
    };
  }

  function renderReadiness() {
    LearningStore.renderProfile();
  }
  function switchView(view) {
    clearTimer(); BridgeCourse.stop(); window.speechSynthesis?.cancel?.();
    document.querySelectorAll("[data-yki-view]").forEach((button) => button.classList.toggle("is-active", button.dataset.ykiView === view));
    ui.typing.hidden = view !== "typing"; ui.workspace.hidden = view === "typing";
    if (view === "bridge") BridgeCourse.show(); else if (view === "learn") showLearn(); else if (view === "writing") showWriting(); else if (view === "phrases") showPhrases(); else if (view === "speaking") showSpeaking(); else if (view === "comprehension") BridgeCourse.showSources(); else if (view === "mock") BridgeCourse.showCheckpointStart();
  }

  document.querySelectorAll("[data-yki-view]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.ykiView)));
  renderReadiness();
  switchView("bridge");
})();
