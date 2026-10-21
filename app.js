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

const bridgeUnits = [
  { title: "Introduce yourself", tip: "Use olen for who you are, asun for where you live, and koska for a reason.", topic: "Tausta", task: "Introduce yourself: say where you live, what you do, and why you study Finnish.", check: ["I said where I live", "I described my daily life", "I gave a reason"], lines: [
    ["Asun Suomessa.", "I live in Finland."], ["Opiskelen suomea joka päivä.", "I study Finnish every day."], ["Opiskelen suomea, koska haluan puhua naapureiden kanssa.", "I study Finnish because I want to talk with my neighbours."]], question: "Miksi hän opiskelee suomea?", options: ["Hän haluaa puhua naapureiden kanssa.", "Hän haluaa ostaa auton."], answer: 0 },
  { title: "Ask for help", tip: "Tarvitsen means I need. Voitko…? is a useful way to ask someone for help.", topic: "Palvelut", task: "You do not understand a form. Ask for help, explain the problem, and ask the person to repeat something.", check: ["I asked for help", "I explained what I do not understand", "I asked for repetition"], lines: [
    ["Tarvitsen apua.", "I need help."], ["En ymmärrä tätä lomaketta.", "I do not understand this form."], ["Voitko sanoa uudestaan, koska en ymmärtänyt?", "Can you say it again because I did not understand?"]], question: "Mitä hän tarvitsee?", options: ["Uuden puhelimen.", "Apua lomakkeen kanssa."], answer: 1 },
  { title: "Book an appointment", tip: "Minulla on… describes what you have. Haluaisin… means I would like. Add when the problem started.", topic: "Terveys", task: "Call a health centre. Explain a symptom, say when it started, and ask for an appointment.", check: ["I described a symptom", "I said when it started", "I asked for an appointment"], lines: [
    ["Minulla on selkäkipua.", "I have back pain."], ["Kipu alkoi eilen.", "The pain started yesterday."], ["Haluaisin varata ajan lääkärille, koska selkäni on kipeä.", "I would like to book a doctor's appointment because my back hurts."]], question: "Milloin kipu alkoi?", options: ["Eilen.", "Viime viikolla."], answer: 0 },
  { title: "Change a plan", tip: "En pääse… means I cannot make it. Give a reason with koska, then suggest a new time with Sopisiko…?", topic: "Vuorovaikutus", task: "Write a message to a friend. Cancel tomorrow's meeting, give a reason, and suggest another day.", check: ["I cancelled the meeting", "I explained why", "I suggested a new time"], lines: [
    ["En pääse huomenna.", "I cannot make it tomorrow."], ["Olen sairas ja jään kotiin.", "I am ill and I am staying home."], ["Sopisiko sinulle perjantai, koska en pääse huomenna?", "Would Friday suit you, because I cannot make it tomorrow?"]], question: "Mitä päivää hän ehdottaa?", options: ["Maanantaita.", "Perjantaita."], answer: 1 },
  { title: "Explain a problem", tip: "Use mutta to explain what went wrong. Then say what you want to happen. Short, clear sentences are useful.", topic: "Asuminen", task: "Write to your landlord about a broken tap. Explain the problem, when it started, and when you can be home for a repair.", check: ["I explained the problem", "I said when it started", "I suggested a repair time"], lines: [
    ["Keittiön hana vuotaa.", "The kitchen tap is leaking."], ["Ongelma alkoi eilen illalla.", "The problem started yesterday evening."], ["Voitko tilata korjauksen? Olen kotona huomenna aamulla.", "Can you arrange a repair? I am home tomorrow morning."]], question: "Milloin hän on kotona?", options: ["Huomenna aamulla.", "Tänään illalla."], answer: 0 },
  { title: "Give an opinion", tip: "Start with Mielestäni…, explain with koska…, and add a concrete example. You can use familiar words.", topic: "Ympäristö", task: "Should bus tickets be cheaper? Say what you think, give a reason, and give an example from your life. Then say your answer aloud without reading it.", check: ["I gave my opinion", "I explained a reason", "I gave an example and spoke aloud"], lines: [
    ["Kuljen bussilla töihin.", "I take the bus to work."], ["Bussilippu on kallis.", "A bus ticket is expensive."], ["Mielestäni bussilippujen pitäisi olla halvempia, koska tarvitsen bussia joka päivä.", "I think bus tickets should be cheaper because I need the bus every day."]], question: "Miksi hän haluaa halvempia lippuja?", options: ["Hän ei käytä bussia.", "Hän tarvitsee bussia joka päivä."], answer: 1 }
];
bridgeUnits.push(
  { id: "daily-life", title: "Describe your day", topic: "Tausta", tip: "Use ensin (first), sitten (then), and illalla (in the evening). In negative sentences, use en + the verb stem: en mene.", task: "Tell a friend about a normal working day. Say what you do first, next, and in the evening.", check: ["I put events in order", "I described two activities", "I said what I do not do"], lines: [["Herään aamulla seitsemältä.", "I wake up at seven in the morning."], ["En mene töihin sunnuntaina.", "I do not go to work on Sundays."], ["Ensin syön aamupalaa, sitten lähden töihin.", "First I have breakfast, then I leave for work."]], question: "Mitä hän tekee ennen töihin lähtöä?", options: ["Syö aamupalaa.", "Menee nukkumaan."], answer: 0 },
  { id: "shopping", title: "Buy the right amount", topic: "Palvelut", tip: "After a number larger than one, use the singular partitive: kaksi omenaa. Ask the price with Paljonko… maksaa?", task: "At a market stall, ask for two apples and a kilo of potatoes. Ask the price and explain how you want to pay.", check: ["I asked for quantities", "I asked the price", "I explained payment"], lines: [["Haluaisin kaksi omenaa.", "I would like two apples."], ["Paljonko perunat maksavat?", "How much do the potatoes cost?"], ["Otan kilon perunoita ja maksan kortilla.", "I will take a kilo of potatoes and pay by card."]], question: "Miten hän maksaa?", options: ["Käteisellä.", "Kortilla."], answer: 1 },
  { id: "returns", title: "Return a purchase", topic: "Palvelut", tip: "Tilasin and sain describe past events. Haluaisin vaihtaa… politely explains the solution you want.", task: "A shirt you ordered is too small. Explain what you ordered, what went wrong, and the solution you want.", check: ["I described the purchase", "I explained the problem", "I requested a solution"], lines: [["Tilasin paidan verkosta.", "I ordered a shirt online."], ["Paita on liian pieni.", "The shirt is too small."], ["Haluaisin vaihtaa paidan suurempaan kokoon.", "I would like to exchange the shirt for a larger size."]], question: "Mitä hän haluaa tehdä?", options: ["Vaihtaa paidan.", "Ostaa kengät."], answer: 0 },
  { id: "directions", title: "Find your way", topic: "Matkailu", tip: "Missä? asks where something is. Mistä? asks where from. Mihin? asks where to. Contrast asemalla, asemalta, asemalle.", task: "Ask someone how to reach the station, check which bus to take, and repeat the directions in your own words.", check: ["I asked for directions", "I checked a bus or landmark", "I repeated the instructions"], lines: [["Missä rautatieasema on?", "Where is the railway station?"], ["Mene suoraan ja käänny vasemmalle.", "Go straight ahead and turn left."], ["Pääsenkö tällä bussilla asemalle?", "Can I get to the station on this bus?"]], question: "Mihin hän haluaa mennä?", options: ["Apteekkiin.", "Asemalle."], answer: 1 },
  { id: "travel-change", title: "Handle a travel change", topic: "Matkailu", tip: "Juna lähtee means the train departs. Juna lähti means it departed. Use joten to connect a problem to a consequence.", task: "Your bus was cancelled. Ask about the next departure, explain where you need to go, and tell a friend you will be late.", check: ["I explained the change", "I asked about another departure", "I informed a friend"], lines: [["Bussi on peruttu.", "The bus has been cancelled."], ["Milloin seuraava bussi lähtee?", "When does the next bus leave?"], ["Bussi ei tule, joten myöhästyn tapaamisesta.", "The bus is not coming, so I will be late for the meeting."]], question: "Miksi hän myöhästyy?", options: ["Bussi ei tule.", "Hän unohti avaimet."], answer: 0 },
  { id: "work", title: "Message your workplace", topic: "Työ", tip: "En pääse töihin describes being unable to attend. Pääsin töihin describes a past event. Add a reason and a practical next step.", task: "Tell your supervisor you cannot work tomorrow. Explain why and suggest how an urgent task could be handled.", check: ["I said when I cannot work", "I gave a reason", "I suggested a next step"], lines: [["En pääse huomenna töihin.", "I cannot come to work tomorrow."], ["Lapseni on sairas.", "My child is ill."], ["Voisiko kollegani hoitaa tämän tehtävän?", "Could my colleague take care of this task?"]], question: "Kuka voisi hoitaa tehtävän?", options: ["Naapuri.", "Kollega."], answer: 1 },
  { id: "study", title: "Arrange your studies", topic: "Työ", tip: "Voinko…? asks whether you can do something. Voisitko…? politely asks someone else. Use koska to explain why you need a change.", task: "Write to your teacher. Explain why your homework is late, ask for more time, and propose a new deadline.", check: ["I explained the delay", "I asked for more time", "I proposed a deadline"], lines: [["Tehtäväni ei ole vielä valmis.", "My assignment is not ready yet."], ["Tarvitsen kaksi päivää lisää aikaa.", "I need two more days."], ["Voinko palauttaa tehtävän perjantaina?", "Can I submit the assignment on Friday?"]], question: "Milloin hän haluaa palauttaa tehtävän?", options: ["Perjantaina.", "Maanantaina."], answer: 0 },
  { id: "leisure", title: "Make an invitation", topic: "Kulttuuri", tip: "Haluatko tulla…? invites someone. Kävin describes where you went. Add a place and time to make your invitation useful.", task: "Invite a friend to an activity. Explain what it is, suggest when and where to meet, and offer another plan if it rains.", check: ["I invited a friend", "I gave a place and time", "I offered an alternative"], lines: [["Haluatko tulla kävelylle?", "Would you like to go for a walk?"], ["Tavataan kirjaston edessä kuudelta.", "Let's meet in front of the library at six."], ["Jos sataa, voimme mennä kahvilaan.", "If it rains, we can go to a café."]], question: "Mitä he voivat tehdä, jos sataa?", options: ["Mennä uimaan.", "Mennä kahvilaan."], answer: 1 },
  { id: "services", title: "Use public services", topic: "Yhteiskunta", tip: "Minun täytyy… explains what you need to do. Ask Mitä tarvitsen mukaan? to check required documents.", task: "Ask a service desk how to renew a library card. Check the opening hours and what identification you need.", check: ["I explained what I need", "I asked about opening hours", "I checked documents"], lines: [["Minun täytyy uusia kirjastokorttini.", "I need to renew my library card."], ["Mihin aikaan kirjasto aukeaa?", "What time does the library open?"], ["Tarvitsenko henkilöllisyystodistuksen mukaan?", "Do I need to bring identification?"]], question: "Mitä hän haluaa uusia?", options: ["Kirjastokortin.", "Passin."], answer: 0 },
  { id: "neighbours", title: "Solve a shared problem", topic: "Asuminen", tip: "Voisimmeko…? suggests doing something together. Describe what happened without blame, then propose a practical agreement.", task: "Talk to a neighbour about noise at night. Explain when it happens, how it affects you, and suggest an agreement.", check: ["I described the problem politely", "I explained its effect", "I proposed an agreement"], lines: [["Illalla kuuluu kovaa musiikkia.", "There is loud music in the evening."], ["En saa nukuttua melun takia.", "I cannot sleep because of the noise."], ["Voisimmeko sopia, että musiikki hiljenee kymmeneltä?", "Could we agree to turn the music down at ten?"]], question: "Miksi musiikki on ongelma?", options: ["Hän haluaa tanssia.", "Hän ei saa nukuttua."], answer: 1 },
  { id: "environment", title: "Explain an everyday choice", topic: "Ympäristö", tip: "Vertailu: pyöräily on halvempaa kuin autoilu. Give a reason with koska and acknowledge a difficulty with mutta.", task: "Explain whether you prefer cycling or driving. Give two reasons and describe a situation where the other option is useful.", check: ["I stated my preference", "I gave two reasons", "I considered another situation"], lines: [["Pyöräilen usein kauppaan.", "I often cycle to the shop."], ["Pyöräily on halvempaa kuin autoilu.", "Cycling is cheaper than driving."], ["Talvella menen bussilla, koska tiet voivat olla liukkaita.", "In winter I take the bus because the roads can be slippery."]], question: "Miksi hän menee talvella bussilla?", options: ["Tiet voivat olla liukkaita.", "Pyöräily on kallista."], answer: 0 },
  { id: "tell-story", title: "Tell what happened", topic: "Tausta", tip: "Use past forms (menin, ostin, unohdin) to tell a short story. Ensin, sitten, and lopuksi help your listener follow it.", task: "Tell a friend about a recent day when something went wrong. Explain what happened, how you solved it, and how you felt afterwards.", check: ["I described a past event", "I explained the solution", "I described how I felt"], lines: [["Unohdin avaimeni kotiin.", "I left my keys at home."], ["Soitin ystävälle ja pyysin apua.", "I called a friend and asked for help."], ["Lopuksi pääsin sisään ja olin helpottunut.", "In the end I got inside and felt relieved."]], question: "Miltä hänestä tuntui lopuksi?", options: ["Vihaiselta.", "Helpottuneelta."], answer: 1 }
);
const originalBridgeIds = ["introductions", "ask-help", "appointments", "change-plan", "repairs", "opinions"];
const extendedScenarios = {
  "daily-life": ["Describe a normal Saturday to a new friend. Explain when you wake up, what you do next, and what you prefer not to do.", "Describe yesterday to a classmate. Explain how it differed from your usual day, and why.", "En pääse aamulla. Voimmeko tehdä sen illalla?", "Miksi pidät siitä päivästä?"],
  "shopping": ["At a market, buy three pears and half a kilo of carrots. Ask the price and whether you can pay by card.", "You are cooking for four people. Ask a seller for two kilos of potatoes, check the total price, and ask for a bag.", "Korttimaksu ei valitettavasti toimi. Käykö käteinen?", "Haluatko vielä jotain muuta?"],
  "returns": ["You bought shoes yesterday, but the sole is loose. Ask the shop to replace them and explain when you can visit.", "A lamp ordered online arrived broken. Write to the shop with order number 7621 and request a refund.", "Samaa tuotetta ei ole enää varastossa. Haluatko rahat takaisin?", "Milloin ostit tuotteen ja onko kuitti tallessa?"],
  "directions": ["Ask how to reach the pharmacy from the library. Check whether it is within walking distance and repeat the route.", "A visitor wants to get from the station to your home. Explain the route, a useful landmark, and what to do if they miss the bus.", "Tämä katu on suljettu. Voisitko tulla toista reittiä?", "Kuinka pitkä kävelymatka siitä on?"],
  "travel-change": ["Your train is delayed by forty minutes. Ask about a connecting bus and tell a friend your new arrival time.", "The bus stop by your home is closed. Ask where the temporary stop is and explain that you must reach work by nine.", "Sillä junalla et ehdi vaihtoon. Sopisiko myöhempi bussi?", "Mihin aikaan sinun täytyy olla perillä?"],
  "work": ["Your train is late and you will miss the start of a team meeting. Inform your supervisor, give an arrival time, and suggest a solution.", "You need to leave work early on Friday for a school meeting. Ask permission and explain how you will finish your tasks.", "Perjantai on kiireinen. Voisitko tehdä tunnit toisena päivänä?", "Kuka voisi hoitaa kiireelliset asiat sillä aikaa?"],
  "study": ["You missed Monday's lesson because you were ill. Ask your teacher what you missed and when you can submit the work.", "Your evening course overlaps with a new work shift. Ask about a morning group and explain when you can attend.", "Aamuryhmä on täynnä. Sopisiko verkkokurssi?", "Mihin aikaan pystyt osallistumaan?"],
  "leisure": ["Invite a friend to a free museum evening on Thursday. Suggest a meeting place and time, then offer an alternative day.", "Plan a picnic with a friend for Sunday. Explain what to bring and suggest a backup plan in case of rain.", "Torstai ei sovi minulle. Pääsisitkö viikonloppuna?", "Mitä minun kannattaa ottaa mukaan?"],
  "services": ["You moved to a new area. Ask a library how to get a card, when the desk is open, and what documents you need.", "You cannot use the online booking system for a public service. Explain the problem and ask how to book another way.", "Tänään ei ole vapaita aikoja. Sopisiko ensi keskiviikko?", "Oletko käyttänyt palvelua aikaisemmin?"],
  "neighbours": ["A neighbour keeps leaving a bicycle by the entrance. Explain why it is a problem and propose another storage place.", "You want to use the shared yard for a small birthday gathering. Ask a neighbour about the time, noise, and cleaning afterwards.", "Se paikka on jo käytössä. Voisitko ehdottaa toista?", "Miten varmistamme, ettei siitä tule haittaa muille?"],
  "environment": ["Explain whether you prefer buying second-hand or new clothes. Give two reasons and one exception.", "Your workplace wants to reduce waste. Propose a practical change, explain its benefits, and discuss a possible difficulty.", "Mutta se voi maksaa enemmän. Miten ratkaisisit sen?", "Voitko antaa esimerkin omasta arjestasi?"],
  "tell-story": ["Tell a friend about a time you missed a bus or train. Explain what led to it, what you did, and how the day ended.", "Describe your first day in a new job, class, or hobby. Tell what surprised you, how you asked for help, and what you learned.", "En ymmärtänyt, mitä tapahtui seuraavaksi. Voitko kertoa uudestaan?", "Mitä tekisit seuraavalla kerralla toisin?"]
};
const bridgeScenarios = [
  ["A new neighbour asks about your life. Introduce yourself, explain your daily routine, and ask them a question.", "A classmate asks why you came to Finland. Explain a reason, a past event, and a future plan.", "Mitä teet vapaa-ajalla?", "Entä mitä teit viime viikonloppuna?", "Write three notes about your room, then introduce your home to a friend or an imaginary visitor."],
  ["At a library, ask for help with a self-service machine. Explain what you tried and ask for a demonstration.", "At home, explain to a friend that you cannot fill in a course form. Ask two specific questions.", "Mitä kohtaa et ymmärrä?", "Voitko näyttää, missä ongelma on?", "Find an ordinary form or draw one. Explain two fields to a friend or an imaginary clerk."],
  ["Call a clinic: you have a cough that started on Monday. Ask for an appointment on Thursday afternoon.", "You have had a sore knee since Saturday. You are working on Tuesday morning. Ask for another appointment time.", "Torstai ei valitettavasti sovi. Sopisiko perjantai aamulla?", "Aamuaikoja ei ole. Pääsetkö keskiviikkona iltapäivällä?", "Draw a weekly calendar, move a pretend appointment, and tell a friend or imaginary receptionist why. Do not call a real clinic just for practice."],
  ["Cancel a Saturday lunch because you must work. Apologise and propose Sunday afternoon.", "You cannot attend a Tuesday class because your child is ill. Ask what you missed and propose a catch-up time.", "Sunnuntai ei sovi minulle. Kävisikö maanantai?", "Mihin aikaan pääsisit maanantaina?", "Move a pretend meeting on your calendar and leave a spoken message for a friend or imaginary listener."],
  ["Your bathroom light stopped working yesterday. Ask the housing maintenance service for a repair and offer two times.", "Your front door does not close properly. Explain when you noticed it and suggest when someone can inspect it.", "Huoltaja ei pääse aamulla. Oletko kotona iltapäivällä?", "Voitko kuvailla vikaa tarkemmin?", "Choose a household object and simulate reporting a fault. Show what is wrong and propose a repair time."],
  ["Should libraries open on Sundays? Give an opinion, two reasons, and an example.", "Should children use phones at school? Give an opinion and explain a benefit and a difficulty.", "Mutta kuka maksaa siitä?", "Miten se vaikuttaisi sinun arkeesi?", "Place two objects on a table to represent two choices. Explain which you prefer, then argue for the other choice."]
];
bridgeUnits.forEach((unit, index) => {
  unit.id ||= originalBridgeIds[index];
  unit.stage = index < 2 ? "Foundations" : index < 6 ? "Everyday actions" : index < 12 ? "Connect ideas" : "Independent situations";
  unit.variants = bridgeScenarios[index]?.slice(0, 2) || extendedScenarios[unit.id].slice(0, 2);
  unit.replies = bridgeScenarios[index]?.slice(2, 4) || extendedScenarios[unit.id].slice(2, 4);
  unit.mission = bridgeScenarios[index]?.[4] || `Use objects, a calendar, or a paper note to simulate this situation at home: ${unit.task} Explain afterwards what happened in Finnish. A seated or imaginary version works too.`;
  unit.chunks = unit.lines[2][0].split(/(?<=,)\s+|(?<=\.)\s+|\s+(?=koska\b|ja\b|sitten\b|joten\b)/).filter(Boolean);
  if (unit.chunks.length < 2) { const words = unit.lines[2][0].split(" "); const middle = Math.ceil(words.length / 2); unit.chunks = [words.slice(0, middle).join(" "), words.slice(middle).join(" ")]; }
});

// Two different sources per topic; each source has purpose, detail, and action questions.
const courseSources = [
  ["course-start", "Tausta", "Kurssi alkaa maanantaina kello yhdeksän. Ota mukaan vihko. Ilmoita opettajalle, jos et pääse paikalle.", "Kurssin aloituksesta.", "Maanantaina kello yhdeksän.", "Ottaa vihko mukaan.", "Lomamatkasta.", "Tiistaina kello kymmenen.", "Ostaa junalippu.", ["Kurssi alkaa maanantaina kello yhdeksän.", "Kurssi alkaa maanantaina kello yhdeksän.", "Ota mukaan vihko."]],
  ["neighbour-coffee", "Tausta", "Hei, olen uusi naapuri Aino. Muutin tänne lauantaina. Tule kahville sunnuntaina kello kaksi, jos sinulle sopii.", "Naapurin kutsusta.", "Sunnuntaina kello kaksi.", "Tulla kahville, jos aika sopii.", "Työhaastattelusta.", "Lauantaina kello neljä.", "Mennä työhaastatteluun.", ["Hei, olen uusi naapuri Aino.", "Tule kahville sunnuntaina kello kaksi, jos sinulle sopii.", "Tule kahville sunnuntaina kello kaksi, jos sinulle sopii."]],
  ["order-pickup", "Palvelut", "Tilauksesi on saapunut kauppaan. Voit noutaa sen perjantaihin asti. Ota tilausnumero mukaan ja näytä se kassalla.", "Tilauksen noutamisesta.", "Perjantaihin asti.", "Näyttää tilausnumero kassalla.", "Tilauksen perumisesta.", "Vain maanantaina.", "Lähettää tuote takaisin.", ["Tilauksesi on saapunut kauppaan.", "Voit noutaa sen perjantaihin asti.", "Ota tilausnumero mukaan ja näytä se kassalla."]],
  ["product-exchange", "Palvelut", "Ostitko väärän koon? Voit vaihtaa käyttämättömän tuotteen kahden viikon aikana. Ota kuitti mukaan myymälään.", "Tuotteen vaihtamisesta.", "Kahden viikon aikana.", "Ottaa kuitti mukaan.", "Uuden myymälän avaamisesta.", "Kuuden kuukauden aikana.", "Heittää kuitti pois.", ["Voit vaihtaa käyttämättömän tuotteen kahden viikon aikana.", "Voit vaihtaa käyttämättömän tuotteen kahden viikon aikana.", "Ota kuitti mukaan myymälään."]],
  ["dentist-change", "Terveys", "Täällä hammashoitola. Aikasi on siirretty torstaista perjantaihin kello kymmenen. Soita meille, jos uusi aika ei sovi.", "Ajan muuttamisesta.", "Perjantaina kello kymmenen.", "Soittaa, jos aika ei sovi.", "Lääkkeen hinnasta.", "Torstaina kello kahdeksan.", "Tulla vanhaan aikaan.", ["Aikasi on siirretty torstaista perjantaihin kello kymmenen.", "Aikasi on siirretty torstaista perjantaihin kello kymmenen.", "Soita meille, jos uusi aika ei sovi."]],
  ["clinic-arrival", "Terveys", "Vastaanotto on huomenna toisessa kerroksessa. Saavu viisitoista minuuttia ennen sovittua aikaa ja ilmoittaudu aulassa.", "Vastaanoton saapumisohjeista.", "Toisessa kerroksessa.", "Ilmoittautua aulassa.", "Apteekin tarjouksesta.", "Ensimmäisessä kerroksessa.", "Odottaa ulkona.", ["Vastaanotto on huomenna toisessa kerroksessa.", "Vastaanotto on huomenna toisessa kerroksessa.", "Saavu viisitoista minuuttia ennen sovittua aikaa ja ilmoittaudu aulassa."]],
  ["cinema-change", "Vuorovaikutus", "Hei! En pääse tänään elokuviin, koska olen töissä iltaan asti. Sopisiko sinulle lauantai? Vastaa huomenna, niin varaan liput.", "Tapaamisen siirtämisestä.", "Lauantaita.", "Vastata huomenna.", "Työpaikan vaihtamisesta.", "Maanantaita.", "Varata hotelli.", ["Hei!", "En pääse tänään elokuviin, koska olen töissä iltaan asti.", "Sopisiko sinulle lauantai?"]],
  ["party-reply", "Vuorovaikutus", "Kiitos kutsusta. Tulen juhliin mielelläni, mutta saavun vasta kuudelta. Kerro, voinko tuoda jotakin syötävää.", "Juhlakutsuun vastaamisesta.", "Kuudelta.", "Kertoa, tarvitaanko syötävää.", "Juhlien peruuttamisesta.", "Kolmelta.", "Perua koko juhla.", ["Kiitos kutsusta.", "Tulen juhliin mielelläni, mutta saavun vasta kuudelta.", "Kerro, voinko tuoda jotakin syötävää."]],
  ["water-cut", "Asuminen", "Vesi katkaistaan talossa tiistaina kello yhdeksästä kahteentoista putkityön vuoksi. Varaa juomavettä etukäteen.", "Vesikatkosta.", "Tiistaina kello yhdeksästä kahteentoista.", "Varata juomavettä.", "Sähkön hinnasta.", "Koko viikon ajan.", "Sulkea pankkitili.", ["Vesi katkaistaan talossa tiistaina kello yhdeksästä kahteentoista putkityön vuoksi.", "Vesi katkaistaan talossa tiistaina kello yhdeksästä kahteentoista putkityön vuoksi.", "Varaa juomavettä etukäteen."]],
  ["window-inspection", "Asuminen", "Huoltaja tulee tarkistamaan ikkunat keskiviikkona iltapäivällä. Jos et ole kotona, sovi uusi aika soittamalla huoltoyhtiöön.", "Ikkunoiden tarkistuksesta.", "Keskiviikkona iltapäivällä.", "Sopia uusi aika, jos ei ole kotona.", "Vuokran maksamisesta.", "Perjantaina aamulla.", "Maksaa uusi vuokra heti.", ["Huoltaja tulee tarkistamaan ikkunat keskiviikkona iltapäivällä.", "Huoltaja tulee tarkistamaan ikkunat keskiviikkona iltapäivällä.", "Jos et ole kotona, sovi uusi aika soittamalla huoltoyhtiöön."]],
  ["yard-cleanup", "Ympäristö", "Taloyhtiön pihalla kerätään roskia lauantaina kello kymmenen. Saat hanskat paikan päältä. Tule mukaan, vaikka ehtisit vain tunniksi.", "Pihan siivouksesta.", "Lauantaina kello kymmenen.", "Tulla mukaan siivoamaan.", "Auton korjauksesta.", "Sunnuntaina kello kaksi.", "Ostaa auto.", ["Taloyhtiön pihalla kerätään roskia lauantaina kello kymmenen.", "Taloyhtiön pihalla kerätään roskia lauantaina kello kymmenen.", "Tule mukaan, vaikka ehtisit vain tunniksi."]],
  ["plastic-sorting", "Ympäristö", "Muovipakkausten keräysastia on siirretty parkkipaikan viereen. Tyhjennä pakkaukset ennen keräykseen viemistä.", "Muovipakkausten lajittelusta.", "Parkkipaikan viereen.", "Tyhjentää pakkaukset.", "Bussireitin muutoksesta.", "Kirjaston sisälle.", "Jättää ruoka pakkauksiin.", ["Muovipakkausten keräysastia on siirretty parkkipaikan viereen.", "Muovipakkausten keräysastia on siirretty parkkipaikan viereen.", "Tyhjennä pakkaukset ennen keräykseen viemistä."]],
  ["bus-detour", "Matkailu", "Bussi neljä ei kulje torin kautta tänään katutöiden vuoksi. Käytä aseman pysäkkiä. Tavallinen reitti palaa käyttöön huomenna.", "Bussin poikkeusreitistä.", "Tänään.", "Käyttää aseman pysäkkiä.", "Junien lakosta.", "Koko ensi kuussa.", "Odottaa torilla.", ["Bussi neljä ei kulje torin kautta tänään katutöiden vuoksi.", "Bussi neljä ei kulje torin kautta tänään katutöiden vuoksi.", "Käytä aseman pysäkkiä."]],
  ["train-platform", "Matkailu", "Juna Ouluun lähtee tänään raiteelta kolme. Lähtöaika on viisitoista kolmekymmentä. Tarkista lipustasi oman vaunusi numero.", "Junan lähtötiedoista.", "Raiteelta kolme.", "Tarkistaa vaunun numero lipusta.", "Lennon peruuntumisesta.", "Raiteelta kahdeksan.", "Ostaa lentolippu.", ["Juna Ouluun lähtee tänään raiteelta kolme.", "Juna Ouluun lähtee tänään raiteelta kolme.", "Tarkista lipustasi oman vaunusi numero."]],
  ["shift-change", "Työ", "Huomisen työvuoro alkaa tuntia tavallista myöhemmin eli yhdeksältä. Ilmoita esihenkilölle tänään, jos muutos aiheuttaa ongelmia.", "Työvuoron muutoksesta.", "Yhdeksältä.", "Ilmoittaa ongelmista tänään.", "Palkankorotuksesta.", "Seitsemältä.", "Odottaa ensi viikkoon.", ["Huomisen työvuoro alkaa tuntia tavallista myöhemmin eli yhdeksältä.", "Huomisen työvuoro alkaa tuntia tavallista myöhemmin eli yhdeksältä.", "Ilmoita esihenkilölle tänään, jos muutos aiheuttaa ongelmia."]],
  ["assignment-deadline", "Työ", "Kurssin tehtävä palautetaan verkossa sunnuntaihin mennessä. Jos tarvitset lisäaikaa, lähetä opettajalle viesti ennen perjantaita.", "Tehtävän palauttamisesta.", "Sunnuntaihin mennessä.", "Pyytää lisäaikaa ennen perjantaita.", "Kurssin maksamisesta.", "Keskiviikkoon mennessä.", "Lopettaa kurssi.", ["Kurssin tehtävä palautetaan verkossa sunnuntaihin mennessä.", "Kurssin tehtävä palautetaan verkossa sunnuntaihin mennessä.", "Jos tarvitset lisäaikaa, lähetä opettajalle viesti ennen perjantaita."]],
  ["museum-tour", "Kulttuuri", "Museoon pääsee torstaina ilmaiseksi kello viiden jälkeen. Opastettu kierros alkaa kuudelta. Ilmoittaudu kierrokselle aulassa.", "Museovierailusta.", "Torstaina kello viiden jälkeen.", "Ilmoittautua kierrokselle aulassa.", "Kuntosalin remontista.", "Maanantaina aamulla.", "Varata aika lääkärille.", ["Museoon pääsee torstaina ilmaiseksi kello viiden jälkeen.", "Museoon pääsee torstaina ilmaiseksi kello viiden jälkeen.", "Ilmoittaudu kierrokselle aulassa."]],
  ["pool-closure", "Kulttuuri", "Uimahalli on lauantaina kiinni kilpailujen vuoksi. Sunnuntaina halli on auki normaalisti. Tarkista aukioloajat verkkosivulta.", "Uimahallin poikkeusaukiolosta.", "Lauantaina.", "Tarkistaa aukioloajat verkosta.", "Kirjaston maksuista.", "Perjantaina.", "Ostaa kirja.", ["Uimahalli on lauantaina kiinni kilpailujen vuoksi.", "Uimahalli on lauantaina kiinni kilpailujen vuoksi.", "Tarkista aukioloajat verkkosivulta."]],
  ["library-card", "Yhteiskunta", "Kirjastokortin uusimiseen tarvitset henkilöllisyystodistuksen. Palvelupiste on auki arkisin kello kymmenestä kuuteen. Käy palvelupisteessä uusimassa kortti.", "Kirjastokortin uusimisesta.", "Arkisin kello kymmenestä kuuteen.", "Käydä palvelupisteessä henkilöllisyystodistuksen kanssa.", "Passin postittamisesta.", "Vain sunnuntaisin.", "Lähettää kortti ulkomaille.", ["Kirjastokortin uusimiseen tarvitset henkilöllisyystodistuksen.", "Palvelupiste on auki arkisin kello kymmenestä kuuteen.", "Käy palvelupisteessä uusimassa kortti."]],
  ["service-move", "Yhteiskunta", "Palvelupiste muuttaa ensi maanantaina kadun toiselle puolelle. Vanhassa rakennuksessa ei ole silloin palvelua. Tule uuteen osoitteeseen varattuna aikana.", "Palvelupisteen muutosta.", "Ensi maanantaina.", "Tulla uuteen osoitteeseen.", "Puhelinlaskusta.", "Ensi jouluna.", "Odottaa vanhassa rakennuksessa.", ["Palvelupiste muuttaa ensi maanantaina kadun toiselle puolelle.", "Palvelupiste muuttaa ensi maanantaina kadun toiselle puolelle.", "Tule uuteen osoitteeseen varattuna aikana."]]
].map(([id, topic, text, purpose, detail, action, wrongPurpose, wrongDetail, wrongAction, evidence], index) => ({
  id, topic, text, audio: null,
  questions: [
    { prompt: "Mistä viestissä kerrotaan?", options: index % 2 ? [wrongPurpose, purpose] : [purpose, wrongPurpose], answer: index % 2, rationale: `“${evidence[0]}” establishes the purpose. The alternative describes a different situation.` },
    { prompt: "Mikä tieto vastaa viestiä?", options: index % 2 ? [detail, wrongDetail] : [wrongDetail, detail], answer: index % 2 ? 0 : 1, rationale: `The stated detail is “${evidence[1]}”. Compare the day, time, or place with the other option.` },
    { prompt: "Mitä vastaanottajan kannattaa tehdä?", options: index % 2 ? [wrongAction, action] : [action, wrongAction], answer: index % 2, rationale: `“${evidence[2]}” gives the next step. The other action is not requested.` }
  ]
}));

const checkpointSets = [
  { id: "housing-travel", reading: { text: "Pyykkitupa on suljettu maanantaina siivouksen vuoksi. Voit käyttää viereisen talon pyykkitupaa varaamalla ajan huoltoyhtiöstä.", question: "Miten voit pestä pyykkiä maanantaina?", options: ["Varaamalla ajan viereisen talon pyykkitupaan.", "Menemällä omaan pyykkitupaan ilman varausta."], answer: 0 }, listening: { text: "Hei, täällä on taksikeskus. Tilaamasi auto saapuu kymmenen minuuttia myöhässä. Odota pääoven luona. Kuljettaja soittaa, kun hän on perillä.", question: "Missä asiakkaan pitää odottaa?", options: ["Pysäkillä.", "Pääoven luona."], answer: 1 }, writing: "Kirjoita ystävälle: lainasit hänen pyöräänsä, mutta rengas puhkesi. Kerro mitä tapahtui, ehdota korjausta ja sovi palautuksesta.", speaking: "Soita majoituspaikkaan. Saavut vasta myöhään illalla. Selitä syy, kysy avaimen saamisesta ja varmista osoite." },
  { id: "work-services", reading: { text: "Haastattelu pidetään etänä keskiviikkona kello neljätoista. Liity lähettämämme linkin kautta viisi minuuttia aikaisemmin. Ilmoita heti, jos linkki ei toimi.", question: "Mitä pitää tehdä, jos linkki ei toimi?", options: ["Odottaa seuraavaan viikkoon.", "Ilmoittaa heti."], answer: 1 }, listening: { text: "Hei, tilaamasi silmälasit ovat valmiit. Voit hakea ne arkisin kello yhdeksästä viiteen. Lauantaina olemme kiinni. Ota vanhat lasisi mukaan säätöä varten.", question: "Mitä asiakkaan pitää ottaa mukaan?", options: ["Vanhat silmälasit.", "Junakortti."], answer: 0 }, writing: "Kirjoita kurssin järjestäjälle: haluat vaihtaa aamuryhmästä iltaryhmään. Kerro syy, kysy vapaista paikoista ja pyydä vahvistusta.", speaking: "Ystäväsi aikoo muuttaa toiselle paikkakunnalle. Vertaa kahta asuinaluetta, kerro oma mielipiteesi ja perustele se." },
  { id: "leisure-community", reading: { text: "Puiston talkoot siirtyvät sateen takia sunnuntaille. Aloitamme yhdeltätoista leikkipaikan vieressä. Ota omat työhanskat mukaan.", question: "Mikä muuttui?", options: ["Talkoiden päivä.", "Talkoiden tarkoitus."], answer: 0 }, listening: { text: "Huomio museovieraat. Viimeinen opastus alkaa puolen tunnin kuluttua aulasta. Kierros sisältyy pääsylipun hintaan. Jättäkää suuret laukut säilytykseen ennen kierrosta.", question: "Mitä pitää tehdä ennen kierrosta?", options: ["Maksaa erillinen opastusmaksu.", "Jättää suuret laukut säilytykseen."], answer: 1 }, writing: "Kirjoita kaupungille ehdotus uudesta harrastustoiminnasta alueellasi. Kerro kenelle se sopisi, miksi sitä tarvitaan ja missä sitä voisi järjestää.", speaking: "Kerro tilanteesta, jossa autoit toista ihmistä. Mitä tapahtui, mitä teit ja mitä opit kokemuksesta?" }
];

const starterSentences = bridgeUnits.flatMap(unit => unit.lines.map(([fi, en]) => ({ fi, en, topic: unit.topic, level: "starter" })));
const sentences = [...starterSentences, ...coreSentences, ...SentenceBank.buildExpansion()];

const { normalize, calculateStats, identifyMistypedWords, sentenceId, buildWeightedPool, recordSuccess, dateKey } = GameCore;
const $ = (selector) => document.querySelector(selector);
const STORAGE_KEY = "nappara-learning-v2";
const glossary = {
  Suomessa: ["Suomi", "in Finland"], suomea: ["suomi", "Finnish (partitive)"], yhteisöön: ["yhteisö", "into a community"],
  "vuokra-asunnossa": ["vuokra-asunto", "in a rental apartment"], huoltoyhtiöön: ["huoltoyhtiö", "maintenance company"], taloyhtiön: ["taloyhtiö", "housing company"],
  viallinen: ["viallinen", "defective"], kuitti: ["kuitti", "receipt"], korvausta: ["korvaus", "reimbursement"], takuu: ["takuu", "warranty"],
  saavutettavissa: ["saavutettava", "accessible"], harrastus: ["harrastus", "hobby"], juhannusta: ["juhannus", "Midsummer"],
  myöhästyi: ["myöhästyä", "was delayed"], löytötavarapalveluun: ["löytötavarapalvelu", "lost property service"], "ruuhka-aikaan": ["ruuhka-aika", "during rush hour"],
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
  order = buildWeightedPool(sentences, state.progress, { mode: elements.mode.value, topic: elements.topicSelect.value, level: $("#levelSelect").value });
  roundIndex = 0;
  elements.total.textContent = String(new Set(order).size).padStart(2, "0");
  if (!order.length) {
    elements.feedback.textContent = elements.mode.value === "review" ? "No marked sentences at this difficulty and topic. Try another difficulty or mark a sentence with Needs practice." : "No sentences match these settings. Choose another topic or difficulty.";
    locked = true; elements.input.value = ""; elements.input.disabled = true; elements.speakButton.disabled = true; elements.practiceButton.disabled = true; elements.shuffleButton.disabled = true;
    elements.sentence.classList.remove("is-hidden"); elements.sentence.textContent = "No matching sentences.";
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
[elements.mode, elements.topicSelect, $("#levelSelect")].forEach((control) => control.addEventListener("change", () => { if (elements.mode.value === "patterns") elements.topicSelect.value = "all"; if (createOrder()) loadRound(); }));
elements.goalButton.addEventListener("click", () => { const goals = [5, 10, 20, 30]; state.goal = goals[(goals.indexOf(state.goal) + 1) % goals.length]; saveState(); renderDashboard(); });
elements.reset.addEventListener("click", () => { completed = 0; streak = 0; elements.completed.textContent = "0"; elements.streak.textContent = "0"; if (createOrder()) loadRound(); });

createOrder(); renderDashboard(); loadRound();
