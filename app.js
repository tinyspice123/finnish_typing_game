const coreSentences = [
  // Minä ja taustani — I and my background
  { topic: "Tausta", fi: "Olen asunut Suomessa jo viisi vuotta.", en: "I have lived in Finland for five years already." },
  { topic: "Tausta", fi: "Muutin Suomeen työn ja perheen takia.", en: "I moved to Finland because of work and family." },
  { topic: "Tausta", fi: "Äidinkieleni on englanti, mutta opiskelen suomea joka päivä.", en: "My native language is English, but I study Finnish every day." },
  { topic: "Tausta", fi: "Vapaa-ajallani luen, liikun ja tapaan ystäviä.", en: "In my free time I read, exercise, and meet friends." },
  { topic: "Tausta", fi: "Minulle on tärkeää viettää aikaa perheeni kanssa.", en: "It is important to me to spend time with my family." },
  { topic: "Tausta", fi: "Opin parhaiten, kun käytän kieltä arjen tilanteissa.", en: "I learn best when I use the language in everyday situations." },
  { topic: "Tausta", fi: "Tavoitteeni on puhua suomea rohkeasti ja sujuvasti.", en: "My goal is to speak Finnish confidently and fluently." },
  { topic: "Tausta", fi: "Aluksi suomalaiset tavat tuntuivat minusta vierailta.", en: "At first, Finnish customs felt unfamiliar to me." },
  { topic: "Tausta", fi: "Nykyään tunnen kuuluvani paikalliseen yhteisöön.", en: "Nowadays I feel that I belong to the local community." },
  { topic: "Tausta", fi: "Haluaisin tulevaisuudessa jatkaa opintojani Suomessa.", en: "In the future, I would like to continue my studies in Finland." },

  // Koti ja asuminen — Home and housing
  { topic: "Asuminen", fi: "Asun vuokra-asunnossa rauhallisella alueella.", en: "I live in a rental apartment in a quiet area." },
  { topic: "Asuminen", fi: "Vuokrasopimus on voimassa toistaiseksi.", en: "The rental agreement is valid until further notice." },
  { topic: "Asuminen", fi: "Keittiön hana vuotaa, joten otan yhteyttä huoltoyhtiöön.", en: "The kitchen tap is leaking, so I will contact the maintenance company." },
  { topic: "Asuminen", fi: "Naapurit pitävät joskus kovaa ääntä myöhään illalla.", en: "The neighbors sometimes make a lot of noise late at night." },
  { topic: "Asuminen", fi: "Taloyhtiön sauna pitää varata etukäteen.", en: "The housing company's sauna must be booked in advance." },
  { topic: "Asuminen", fi: "Muuttopäivänä ystävät auttoivat kantamaan huonekaluja.", en: "On moving day, friends helped carry the furniture." },
  { topic: "Asuminen", fi: "Etsin asuntoa, josta on hyvät julkiset yhteydet keskustaan.", en: "I am looking for an apartment with good public transport connections to the center." },
  { topic: "Asuminen", fi: "Sähkölasku on noussut viime talvesta huomattavasti.", en: "The electricity bill has risen considerably since last winter." },
  { topic: "Asuminen", fi: "Lajittelemme kotona biojätteen, kartongin ja muovin.", en: "At home, we sort biowaste, cardboard, and plastic." },
  { topic: "Asuminen", fi: "Mielestäni kaikilla pitäisi olla oikeus kohtuuhintaiseen asuntoon.", en: "In my opinion, everyone should have the right to affordable housing." },

  // Kaupat ja palvelut — Shops and services
  { topic: "Palvelut", fi: "Haluaisin palauttaa tämän tuotteen, koska se on viallinen.", en: "I would like to return this product because it is defective." },
  { topic: "Palvelut", fi: "Voinko maksaa laskun verkkopankissa ilman palvelumaksua?", en: "Can I pay the bill online without a service fee?" },
  { topic: "Palvelut", fi: "Tarvitsen kuitin, jotta voin hakea korvausta.", en: "I need the receipt so that I can apply for reimbursement." },
  { topic: "Palvelut", fi: "Paketti voidaan noutaa postista henkilöllisyystodistuksella.", en: "The parcel can be collected from the post office with an identity document." },
  { topic: "Palvelut", fi: "Asiakaspalveluun oli pitkä jono, mutta asia ratkesi nopeasti.", en: "There was a long queue for customer service, but the issue was resolved quickly." },
  { topic: "Palvelut", fi: "Tilasin tuotteen verkosta, mutta sain väärän koon.", en: "I ordered the product online, but I received the wrong size." },
  { topic: "Palvelut", fi: "Onko tällä laitteella kahden vuoden takuu?", en: "Does this device have a two-year warranty?" },
  { topic: "Palvelut", fi: "Haluaisin varata ajan kampaajalle ensi perjantaiksi.", en: "I would like to book a hairdresser's appointment for next Friday." },
  { topic: "Palvelut", fi: "Vertailen hintoja ennen kuin teen suuren ostoksen.", en: "I compare prices before making a large purchase." },
  { topic: "Palvelut", fi: "Palvelu oli ystävällistä, vaikka liikkeessä oli kiire.", en: "The service was friendly even though the shop was busy." },

  // Kulttuuri ja vapaa-aika — Culture and leisure
  { topic: "Kulttuuri", fi: "Kirjastosta voi lainata kirjojen lisäksi myös työkaluja.", en: "In addition to books, you can also borrow tools from the library." },
  { topic: "Kulttuuri", fi: "Kävin viikonloppuna konsertissa, joka ylitti odotukseni.", en: "I went to a concert at the weekend that exceeded my expectations." },
  { topic: "Kulttuuri", fi: "Suomalainen saunakulttuuri oli minulle uusi kokemus.", en: "Finnish sauna culture was a new experience for me." },
  { topic: "Kulttuuri", fi: "Paikallinen urheiluseura järjestää toimintaa kaikenikäisille.", en: "The local sports club organizes activities for people of all ages." },
  { topic: "Kulttuuri", fi: "Museoon on vapaa pääsy kuukauden ensimmäisenä perjantaina.", en: "Admission to the museum is free on the first Friday of the month." },
  { topic: "Kulttuuri", fi: "Harrastus auttaa minua rentoutumaan työpäivän jälkeen.", en: "A hobby helps me relax after the workday." },
  { topic: "Kulttuuri", fi: "Pidän elokuvista, jotka herättävät ajatuksia ja keskustelua.", en: "I like films that provoke thought and discussion." },
  { topic: "Kulttuuri", fi: "Kaupungin tapahtumissa tutustuu helposti uusiin ihmisiin.", en: "At city events, it is easy to meet new people." },
  { topic: "Kulttuuri", fi: "Juhannusta vietetään usein mökillä luonnon keskellä.", en: "Midsummer is often celebrated at a cottage surrounded by nature." },
  { topic: "Kulttuuri", fi: "Kulttuuripalvelujen pitäisi olla kaikkien saavutettavissa.", en: "Cultural services should be accessible to everyone." },

  // Matkustaminen — Travel
  { topic: "Matkailu", fi: "Juna myöhästyi teknisen vian vuoksi puoli tuntia.", en: "The train was delayed by half an hour due to a technical fault." },
  { topic: "Matkailu", fi: "Missä voin vaihtaa bussia samalla matkalipulla?", en: "Where can I change buses with the same ticket?" },
  { topic: "Matkailu", fi: "Unohdin laukkuni junaan ja ilmoitin siitä löytötavarapalveluun.", en: "I left my bag on the train and reported it to lost property." },
  { topic: "Matkailu", fi: "Kannattaa tarkistaa aikataulu ennen asemalle lähtemistä.", en: "It is worth checking the timetable before leaving for the station." },
  { topic: "Matkailu", fi: "Varasin hotellihuoneen kahdeksi yöksi merinäköalalla.", en: "I booked a hotel room with a sea view for two nights." },
  { topic: "Matkailu", fi: "Lentoni peruttiin, joten pyysin lipusta hyvitystä.", en: "My flight was cancelled, so I asked for a refund for the ticket." },
  { topic: "Matkailu", fi: "Pyöräily on edullinen ja ympäristöystävällinen tapa liikkua.", en: "Cycling is an affordable and environmentally friendly way to get around." },
  { topic: "Matkailu", fi: "Voisitteko neuvoa, miten pääsen täältä kaupungintalolle?", en: "Could you advise me how to get from here to the town hall?" },
  { topic: "Matkailu", fi: "Ruuhka-aikaan matkaan kannattaa varata tavallista enemmän aikaa.", en: "During rush hour, you should allow more time than usual for the journey." },
  { topic: "Matkailu", fi: "Matkavakuutus korvasi rikkoutuneen matkalaukun.", en: "The travel insurance compensated for the damaged suitcase." },

  // Terveys ja hyvinvointi — Health and wellbeing
  { topic: "Terveys", fi: "Haluaisin varata ajan lääkärille jatkuvan selkäkivun vuoksi.", en: "I would like to book a doctor's appointment because of persistent back pain." },
  { topic: "Terveys", fi: "Oireet alkoivat kolme päivää sitten ja ovat pahentuneet.", en: "The symptoms began three days ago and have become worse." },
  { topic: "Terveys", fi: "Lääke pitää ottaa kahdesti päivässä ruoan kanssa.", en: "The medicine must be taken twice a day with food." },
  { topic: "Terveys", fi: "Säännöllinen liikunta parantaa sekä mielialaa että unen laatua.", en: "Regular exercise improves both mood and sleep quality." },
  { topic: "Terveys", fi: "Jos vointisi huononee, ota yhteyttä päivystykseen.", en: "If your condition gets worse, contact emergency care." },
  { topic: "Terveys", fi: "Sairauslomatodistus täytyy toimittaa työnantajalle.", en: "The sick leave certificate must be submitted to the employer." },
  { topic: "Terveys", fi: "Yritän syödä monipuolisesti ja nukkua riittävästi.", en: "I try to eat a varied diet and get enough sleep." },
  { topic: "Terveys", fi: "Mielenterveydestä on yhtä tärkeää huolehtia kuin fyysisestä terveydestä.", en: "It is just as important to take care of mental health as physical health." },
  { topic: "Terveys", fi: "Apteekista neuvottiin kysymään asiasta ensin lääkäriltä.", en: "The pharmacy advised me to ask a doctor about it first." },
  { topic: "Terveys", fi: "Työn ja vapaa-ajan välinen tasapaino vaikuttaa hyvinvointiin.", en: "The balance between work and free time affects wellbeing." },

  // Työ ja koulutus — Work and education
  { topic: "Työ", fi: "Haen tehtävää, jossa voin hyödyntää aikaisempaa kokemustani.", en: "I am applying for a position where I can use my previous experience." },
  { topic: "Työ", fi: "Työhaastattelussa minulta kysyttiin vahvuuksistani ja tavoitteistani.", en: "At the job interview, I was asked about my strengths and goals." },
  { topic: "Työ", fi: "Määräaikainen työsopimukseni päättyy elokuun lopussa.", en: "My fixed-term employment contract ends at the end of August." },
  { topic: "Työ", fi: "Voisimmeko keskustella mahdollisuudesta tehdä etätyötä?", en: "Could we discuss the possibility of working remotely?" },
  { topic: "Työ", fi: "Ilmoitin esihenkilölle, etten pääse huomenna töihin.", en: "I informed my supervisor that I cannot come to work tomorrow." },
  { topic: "Työ", fi: "Hyvässä työyhteisössä kaikkien mielipiteitä kuunnellaan.", en: "In a good work community, everyone's opinions are heard." },
  { topic: "Työ", fi: "Kurssi antaa valmiuksia jatko-opintoihin ja työelämään.", en: "The course provides skills for further studies and working life." },
  { topic: "Työ", fi: "Palautin tehtävän ajoissa, vaikka se oli melko vaativa.", en: "I submitted the assignment on time even though it was quite demanding." },
  { topic: "Työ", fi: "Ammatillinen koulutus yhdistää teoriaa ja käytännön harjoittelua.", en: "Vocational education combines theory and practical training." },
  { topic: "Työ", fi: "Jatkuva oppiminen on nykyään tärkeä osa työelämää.", en: "Continuous learning is now an important part of working life." },

  // Ympäristö — Environment
  { topic: "Ympäristö", fi: "Ilmastonmuutos vaikuttaa Suomen luontoon monella tavalla.", en: "Climate change affects Finland's natural environment in many ways." },
  { topic: "Ympäristö", fi: "Julkisen liikenteen kehittäminen vähentää liikenteen päästöjä.", en: "Developing public transport reduces traffic emissions." },
  { topic: "Ympäristö", fi: "Pyrin välttämään turhaa kulutusta ja korjaamaan vanhoja tavaroita.", en: "I try to avoid unnecessary consumption and repair old items." },
  { topic: "Ympäristö", fi: "Roskat kuuluvat roskakoriin, eivät luontoon.", en: "Litter belongs in a bin, not in nature." },
  { topic: "Ympäristö", fi: "Kaupunki aikoo rakentaa alueelle uuden pyörätien.", en: "The city plans to build a new cycle path in the area." },
  { topic: "Ympäristö", fi: "Lähiruoan ostaminen voi tukea paikallisia tuottajia.", en: "Buying local food can support local producers." },
  { topic: "Ympäristö", fi: "Luonnossa liikkuminen kuuluu jokaisenoikeuksiin, mutta ympäristöä pitää kunnioittaa.", en: "Accessing nature is part of everyman's rights, but the environment must be respected." },
  { topic: "Ympäristö", fi: "Kotitaloudet voivat säästää energiaa pienillä arjen valinnoilla.", en: "Households can save energy through small everyday choices." },
  { topic: "Ympäristö", fi: "Metsät ovat tärkeitä sekä taloudelle että luonnon monimuotoisuudelle.", en: "Forests are important both for the economy and biodiversity." },
  { topic: "Ympäristö", fi: "Ympäristövastuu kuuluu ihmisille, yrityksille ja päättäjille.", en: "Environmental responsibility belongs to individuals, companies, and decision-makers." },

  // Yhteiskunta — Society
  { topic: "Yhteiskunta", fi: "Kunnan palveluista löytyy tietoa kaupungin verkkosivuilta.", en: "Information about municipal services can be found on the city's website." },
  { topic: "Yhteiskunta", fi: "Jokaisella täysi-ikäisellä kansalaisella on oikeus äänestää vaaleissa.", en: "Every adult citizen has the right to vote in elections." },
  { topic: "Yhteiskunta", fi: "Viranomaisen päätöksestä voi usein valittaa määräajan kuluessa.", en: "An authority's decision can often be appealed within a specified period." },
  { topic: "Yhteiskunta", fi: "Verovaroilla rahoitetaan muun muassa koulutusta ja terveydenhuoltoa.", en: "Tax revenue finances education and healthcare, among other things." },
  { topic: "Yhteiskunta", fi: "Luotettavan uutisen lähde ja julkaisupäivä kannattaa tarkistaa.", en: "It is worth checking the source and publication date of a reliable news story." },
  { topic: "Yhteiskunta", fi: "Yhdenvertaisuus tarkoittaa, että kaikkia kohdellaan samanarvoisesti.", en: "Equality means that everyone is treated as having equal value." },
  { topic: "Yhteiskunta", fi: "Vapaaehtoistyö on yksi tapa osallistua yhteiskunnan toimintaan.", en: "Volunteering is one way to participate in society." },
  { topic: "Yhteiskunta", fi: "Jos en ymmärrä virallista kirjettä, pyydän siihen neuvontaa.", en: "If I do not understand an official letter, I ask for advice about it." },
  { topic: "Yhteiskunta", fi: "Sananvapauteen liittyy myös vastuu omista sanoista.", en: "Freedom of speech also involves responsibility for one's words." },
  { topic: "Yhteiskunta", fi: "Aktiivinen kansalainen seuraa yhteisiä asioita ja osallistuu keskusteluun.", en: "An active citizen follows public affairs and participates in discussion." },

  // Asiointi ja vuorovaikutus — Practical communication
  { topic: "Vuorovaikutus", fi: "Anteeksi, voisitteko toistaa viimeisen kohdan hitaammin?", en: "Excuse me, could you repeat the last part more slowly?" },
  { topic: "Vuorovaikutus", fi: "En ole aivan samaa mieltä, koska tilanteessa on muitakin näkökulmia.", en: "I do not completely agree because there are other perspectives on the situation." },
  { topic: "Vuorovaikutus", fi: "Ymmärsinkö oikein, että hakemus pitää lähettää perjantaihin mennessä?", en: "Did I understand correctly that the application must be sent by Friday?" },
  { topic: "Vuorovaikutus", fi: "Valitettavasti en pääse sovittuun tapaamiseen.", en: "Unfortunately, I cannot attend the agreed appointment." },
  { topic: "Vuorovaikutus", fi: "Sopisiko sinulle jokin toinen aika ensi viikolla?", en: "Would another time next week suit you?" },
  { topic: "Vuorovaikutus", fi: "Kiitos viestistä, vastaan kysymyksiinne mahdollisimman pian.", en: "Thank you for your message; I will answer your questions as soon as possible." },
  { topic: "Vuorovaikutus", fi: "Haluaisin antaa palautetta saamastani palvelusta.", en: "I would like to give feedback about the service I received." },
  { topic: "Vuorovaikutus", fi: "Voisitteko lähettää minulle kirjallisen vahvistuksen sähköpostitse?", en: "Could you send me written confirmation by email?" },
  { topic: "Vuorovaikutus", fi: "Mielestäni ehdotuksessa on sekä hyviä että huonoja puolia.", en: "In my opinion, the proposal has both advantages and disadvantages." },
  { topic: "Vuorovaikutus", fi: "Toivon, että asia voidaan ratkaista mahdollisimman pian.", en: "I hope that the matter can be resolved as soon as possible." }
];

const sentences = [...coreSentences, ...SentenceBank.buildExpansion()];

const { normalize, calculateStats, identifyMistypedWords, sentenceId, buildWeightedPool, recordSuccess, dateKey } = GameCore;
const $ = (selector) => document.querySelector(selector);
const STORAGE_KEY = "nappara-learning-v2";
const glossary = {
  Suomessa: ["Suomi", "in Finland"], suomea: ["suomi", "Finnish (partitive)"], yhteisöön: ["yhteisö", "into a community"],
  vuokra-asunnossa: ["vuokra-asunto", "in a rental apartment"], huoltoyhtiöön: ["huoltoyhtiö", "maintenance company"], taloyhtiön: ["taloyhtiö", "housing company"],
  viallinen: ["viallinen", "defective"], kuitti: ["kuitti", "receipt"], korvausta: ["korvaus", "reimbursement"], takuu: ["takuu", "warranty"],
  saavutettavissa: ["saavutettava", "accessible"], harrastus: ["harrastus", "hobby"], juhannusta: ["juhannus", "Midsummer"],
  myöhästyi: ["myöhästyä", "was delayed"], löytötavarapalveluun: ["löytötavarapalvelu", "lost property service"], ruuhka-aikaan: ["ruuhka-aika", "during rush hour"],
  oireet: ["oire", "symptoms"], päivystykseen: ["päivystys", "emergency care"], hyvinvointiin: ["hyvinvointi", "to wellbeing"],
  työhaastattelussa: ["työhaastattelu", "at a job interview"], määräaikainen: ["määräaikainen", "fixed-term"], esihenkilölle: ["esihenkilö", "to a supervisor"],
  ympäristöystävällinen: ["ympäristöystävällinen", "environmentally friendly"], jokaisenoikeuksiin: ["jokaisenoikeudet", "everyman's rights"], monimuotoisuudelle: ["monimuotoisuus", "for biodiversity"],
  viranomaisen: ["viranomainen", "authority's"], määräajan: ["määräaika", "time limit"], yhdenvertaisuus: ["yhdenvertaisuus", "equality"], sananvapauteen: ["sananvapaus", "to freedom of speech"],
  valitettavasti: ["valitettavasti", "unfortunately"], vahvistuksen: ["vahvistus", "confirmation"], näkökulmia: ["näkökulma", "perspectives"]
};

const elements = {
  sentence: $("#sentence"), translation: $("#translation"), translationWrap: $("#translationWrap"), translationButton: $("#translationButton"), translationButtonLabel: $("#translationButtonLabel"),
  speakButton: $("#speakButton"), shuffleButton: $("#shuffleButton"), practiceButton: $("#practiceButton"), practiceButtonLabel: $("#practiceButtonLabel"), input: $("#typingInput"), inputWrap: $("#inputWrap"),
  feedback: $("#feedback"), progress: $("#progressBar"), wpm: $("#wpm"), accuracy: $("#accuracy"), time: $("#time"), streak: $("#streak"), round: $("#roundNumber"), total: $("#roundTotal"),
  completed: $("#completedCount"), bestWpm: $("#bestWpm"), mastered: $("#masteredCount"), reset: $("#resetButton"), topic: $("#topicBadge"), mode: $("#modeSelect"), topicSelect: $("#topicSelect"),
  listeningPrompt: $("#listeningPrompt"), wordCard: $("#wordCard"), wordForm: $("#wordForm"), wordBase: $("#wordBase"), wordMeaning: $("#wordMeaning"), dictionaryLink: $("#dictionaryLink"), saveWord: $("#saveWordButton"), closeWord: $("#closeWordCard"),
  goalButton: $("#goalButton"), goalValue: $("#goalValue"), goalFraction: $("#goalFraction"), goalProgress: $("#goalProgress"), weekChart: $("#weekChart"), savedWords: $("#savedWords"), savedWordCount: $("#savedWordCount"), mistakeList: $("#mistakeList")
};

let state = loadState();
const sentenceById = new Map(sentences.map((sentence, index) => [sentenceId(sentence, index), sentence]));
let order = [];
let roundIndex = 0;
let startedAt = null;
let timerId = null;
let completed = 0;
let streak = 0;
let locked = false;
let selectedWord = null;
let roundMistakes = new Set();

function loadState() {
  try { return { progress: {}, words: {}, mistakes: {}, daily: {}, goal: 10, bestWpm: 0, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return { progress: {}, words: {}, mistakes: {}, daily: {}, goal: 10, bestWpm: 0 }; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function currentId() { return order[roundIndex]; }
function current() { return sentenceById.get(currentId()); }
function formatTime(seconds) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`; }
function cleanWord(word) { return word.replace(/[^a-zäöå-]/gi, ""); }

function createOrder() {
  clearInterval(timerId); timerId = null; startedAt = null;
  order = buildWeightedPool(sentences, state.progress, { mode: elements.mode.value, topic: elements.topicSelect.value });
  roundIndex = 0;
  elements.total.textContent = String(order.length).padStart(2, "0");
  if (!order.length) {
    elements.feedback.textContent = "No sentences are marked yet. Choose Adaptive mix and mark one with Needs practice.";
    locked = true; elements.input.value = ""; elements.input.disabled = true; elements.speakButton.disabled = true; elements.practiceButton.disabled = true; elements.shuffleButton.disabled = true;
    elements.sentence.classList.remove("is-hidden"); elements.sentence.textContent = "Your review list is empty.";
    elements.translationWrap.hidden = true; elements.translation.textContent = ""; elements.listeningPrompt.hidden = true; elements.wordCard.hidden = true;
    elements.round.textContent = "00";
    return false;
  }
  elements.speakButton.disabled = false; elements.practiceButton.disabled = false; elements.shuffleButton.disabled = false;
  return true;
}

function renderSentence(value = "", force = false) {
  if (elements.mode.value === "listening" && !locked) return;
  const target = current().fi;
  const typedWords = normalize(value).split(" ").filter(Boolean);
  const targetWords = normalize(target).split(" ").filter(Boolean);
  const partialIndex = value && !/\s$/.test(value) ? typedWords.length - 1 : -1;
  if (force || elements.sentence.dataset.sentenceId !== String(currentId())) {
    const fragment = document.createDocumentFragment();
    target.split(/(\s+)/).forEach((part) => {
      if (/^\s+$/.test(part)) { fragment.append(document.createTextNode(part)); return; }
      const word = document.createElement("button");
      word.type = "button"; word.className = "word"; word.dataset.word = cleanWord(part); word.title = "Open vocabulary card"; word.lang = "fi"; word.textContent = part; fragment.append(word);
    });
    elements.sentence.replaceChildren(fragment); elements.sentence.dataset.sentenceId = String(currentId());
  }
  elements.sentence.querySelectorAll(".word").forEach((word, wordIndex) => {
    word.classList.remove("correct", "incorrect", "current");
    if (wordIndex < typedWords.length) {
      if (wordIndex === partialIndex && targetWords[wordIndex]?.startsWith(typedWords[wordIndex])) word.classList.add("current");
      else word.classList.add(typedWords[wordIndex] === targetWords[wordIndex] ? "correct" : "incorrect");
    }
    else if (wordIndex === typedWords.length) word.classList.add("current");
  });
}

function syncPracticeButton() {
  const marked = Boolean(state.progress[currentId()]?.needsPractice);
  elements.practiceButton.setAttribute("aria-pressed", String(marked));
  elements.practiceButtonLabel.textContent = marked ? "Marked for practice" : "Needs practice";
  elements.practiceButton.querySelector("span").textContent = marked ? "★" : "☆";
}

function loadRound() {
  if (!order.length) return;
  locked = false; startedAt = null; roundMistakes = new Set(); clearInterval(timerId); timerId = null;
  elements.input.value = ""; elements.input.disabled = false; elements.inputWrap.classList.remove("complete");
  elements.feedback.textContent = elements.mode.value === "listening" ? "Press the audio button, then type what you hear." : "Timer starts with your first keystroke.";
  elements.feedback.className = ""; elements.progress.style.width = "0%"; elements.wpm.textContent = "0"; elements.accuracy.textContent = "100"; elements.time.textContent = "0:00";
  elements.round.textContent = String(roundIndex + 1).padStart(2, "0"); elements.translation.textContent = current().en; elements.topic.textContent = current().topic;
  elements.translationWrap.hidden = true; elements.translationButton.setAttribute("aria-expanded", "false"); elements.translationButtonLabel.textContent = "Show translation";
  elements.wordCard.hidden = true; elements.sentence.classList.toggle("is-hidden", elements.mode.value === "listening"); elements.listeningPrompt.hidden = elements.mode.value !== "listening";
  syncPracticeButton(); renderSentence("", true); elements.input.focus();
}

function updateStats() {
  if (!startedAt) return;
  const elapsed = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
  const stats = calculateStats(elements.input.value, current().fi, elapsed);
  elements.time.textContent = formatTime(elapsed); elements.accuracy.textContent = stats.accuracy; elements.wpm.textContent = stats.wpm;
  elements.progress.style.width = `${Math.min(100, (normalize(elements.input.value).length / normalize(current().fi).length) * 100)}%`;
}

function captureCurrentMistakes(includeLastWord = false) {
  const value = elements.input.value;
  const typed = normalize(value).split(" ").filter(Boolean);
  const expected = normalize(current().fi).split(" ").filter(Boolean);
  const hasFinishedLast = /\s$/.test(value) || includeLastWord;
  const completedCount = hasFinishedLast ? typed.length : Math.max(0, typed.length - 1);
  identifyMistypedWords(typed.slice(0, completedCount).join(" "), expected.slice(0, completedCount).join(" ")).forEach((word) => roundMistakes.add(word));
  if (!hasFinishedLast && typed.length) {
    const index = typed.length - 1;
    if (expected[index] && !expected[index].startsWith(typed[index])) roundMistakes.add(expected[index]);
  }
}

function saveCurrentMistakes() {
  if (!order.length || !roundMistakes.size) return;
  roundMistakes.forEach((word) => { state.mistakes[word] = (state.mistakes[word] || 0) + 1; });
  roundMistakes.clear(); saveState(); renderDashboard();
}

function completeRound() {
  if (locked) return;
  locked = true; clearInterval(timerId); updateStats();
  const id = currentId(); const roundWpm = Number(elements.wpm.textContent); const today = dateKey();
  state.progress[id] = recordSuccess(state.progress[id]);
  saveCurrentMistakes();
  state.daily[today] = (state.daily[today] || 0) + 1; state.bestWpm = Math.max(state.bestWpm, roundWpm); saveState();
  completed++; streak++; elements.completed.textContent = completed; elements.streak.textContent = streak;
  elements.progress.style.width = "100%"; elements.inputWrap.classList.add("complete"); elements.feedback.textContent = "Hyvä! Press Enter for the next sentence."; elements.feedback.className = "success";
  if (elements.mode.value === "listening") { elements.sentence.classList.remove("is-hidden"); renderSentence(elements.input.value, true); }
  renderDashboard(); syncPracticeButton(); if (navigator.vibrate) navigator.vibrate(35);
}

function nextRound() {
  if (!locked && elements.input.value) captureCurrentMistakes(true);
  saveCurrentMistakes();
  roundIndex++;
  if (roundIndex >= order.length) createOrder();
  loadRound();
}

function openWordCard(word) {
  selectedWord = cleanWord(word); if (!selectedWord) return;
  const found = glossary[selectedWord] || glossary[Object.keys(glossary).find((key) => key.toLowerCase() === selectedWord.toLowerCase())];
  elements.wordForm.textContent = selectedWord; elements.wordBase.textContent = found?.[0] || "Not available in the offline glossary";
  elements.wordMeaning.textContent = found?.[1] || "This word is not in the small offline glossary yet. Use the full dictionary entry below.";
  elements.dictionaryLink.href = `https://en.wiktionary.org/wiki/${encodeURIComponent(selectedWord.toLocaleLowerCase("fi-FI"))}#Finnish`;
  elements.saveWord.classList.toggle("saved", Boolean(state.words[selectedWord])); elements.saveWord.textContent = state.words[selectedWord] ? "Saved ✓" : "Save word"; elements.wordCard.hidden = false;
}

function renderDashboard() {
  const today = dateKey(); const todayCount = state.daily[today] || 0; const goal = state.goal || 10;
  elements.bestWpm.textContent = state.bestWpm || 0; elements.mastered.textContent = Object.values(state.progress).filter((item) => item.mastered).length;
  elements.goalValue.textContent = goal; elements.goalFraction.textContent = `${todayCount} / ${goal}`; elements.goalProgress.style.width = `${Math.min(100, todayCount / goal * 100)}%`;
  elements.weekChart.replaceChildren();
  for (let offset = 6; offset >= 0; offset--) {
    const day = new Date(); day.setDate(day.getDate() - offset); const count = state.daily[dateKey(day)] || 0;
    const dayName = day.toLocaleDateString("en", { weekday: "short" });
    const bar = document.createElement("div"); bar.className = `day-bar${offset === 0 ? " today" : ""}`; bar.title = `${dayName}: ${count} sentences`; bar.setAttribute("role", "listitem"); bar.setAttribute("aria-label", `${dayName}: ${count} completed sentences`);
    const column = document.createElement("i"); column.style.height = `${Math.max(4, Math.min(52, count / Math.max(goal, 1) * 52))}px`;
    const label = document.createElement("span"); label.textContent = `${dayName.slice(0, 1)} · ${count}`; bar.append(column, label); elements.weekChart.append(bar);
  }
  const words = Object.keys(state.words); elements.savedWordCount.textContent = `${words.length} saved`; elements.savedWords.replaceChildren();
  if (!words.length) elements.savedWords.innerHTML = '<p class="empty-message">Click a word in a sentence to save it.</p>';
  else words.forEach((word) => { const button = document.createElement("button"); button.className = "word-chip"; button.textContent = `${word} ×`; button.title = "Remove saved word"; button.onclick = () => { delete state.words[word]; saveState(); renderDashboard(); }; elements.savedWords.append(button); });
  const mistakes = Object.entries(state.mistakes).sort((a, b) => b[1] - a[1]).slice(0, 5); elements.mistakeList.replaceChildren();
  if (!mistakes.length) elements.mistakeList.innerHTML = '<p class="empty-message">Mistyped words will appear here.</p>';
  else mistakes.forEach(([word, count]) => { const row = document.createElement("div"); row.className = "mistake-row"; row.innerHTML = `<strong></strong><span>${count} ${count === 1 ? "mistake" : "mistakes"}</span>`; row.querySelector("strong").textContent = word; elements.mistakeList.append(row); });
}

[...new Set(sentences.map((item) => item.topic))].sort().forEach((topic) => { const option = document.createElement("option"); option.value = option.textContent = topic; elements.topicSelect.append(option); });
elements.input.addEventListener("input", () => {
  if (!startedAt && elements.input.value.length) { startedAt = Date.now(); timerId = setInterval(updateStats, 500); }
  captureCurrentMistakes(false);
  renderSentence(elements.input.value); updateStats(); if (normalize(elements.input.value) === normalize(current().fi)) completeRound();
});
elements.input.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); if (locked) nextRound(); } });
elements.sentence.addEventListener("click", (event) => { const word = event.target.closest(".word"); if (word) openWordCard(word.dataset.word); });
elements.closeWord.addEventListener("click", () => { elements.wordCard.hidden = true; });
elements.saveWord.addEventListener("click", () => { if (!selectedWord) return; if (state.words[selectedWord]) delete state.words[selectedWord]; else state.words[selectedWord] = true; saveState(); openWordCard(selectedWord); renderDashboard(); });
elements.practiceButton.addEventListener("click", () => { const id = currentId(); const record = state.progress[id] || {}; record.needsPractice = !record.needsPractice; record.correctRuns = 0; record.mastered = false; state.progress[id] = record; saveState(); syncPracticeButton(); renderDashboard(); });
elements.translationButton.addEventListener("click", () => { const show = elements.translationWrap.hidden; elements.translationWrap.hidden = !show; elements.translationButton.setAttribute("aria-expanded", String(show)); elements.translationButtonLabel.textContent = show ? "Hide translation" : "Show translation"; });
elements.speakButton.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) { elements.feedback.textContent = "Speech is not supported by this browser."; return; }
  speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(current().fi); utterance.lang = "fi-FI"; utterance.rate = 0.88;
  utterance.voice = speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith("fi")) || null;
  utterance.onstart = () => elements.speakButton.classList.add("speaking"); utterance.onend = utterance.onerror = () => elements.speakButton.classList.remove("speaking"); speechSynthesis.speak(utterance);
});
elements.shuffleButton.addEventListener("click", () => { streak = 0; elements.streak.textContent = streak; nextRound(); });
[elements.mode, elements.topicSelect].forEach((control) => control.addEventListener("change", () => { if (elements.mode.value === "patterns") elements.topicSelect.value = "all"; if (createOrder()) loadRound(); }));
elements.goalButton.addEventListener("click", () => { const goals = [5, 10, 20, 30]; state.goal = goals[(goals.indexOf(state.goal) + 1) % goals.length]; saveState(); renderDashboard(); });
elements.reset.addEventListener("click", () => { completed = 0; streak = 0; elements.completed.textContent = "0"; elements.streak.textContent = "0"; if (createOrder()) loadRound(); });

createOrder(); renderDashboard(); loadRound();
