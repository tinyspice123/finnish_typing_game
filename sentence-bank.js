(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.SentenceBank = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const frames = [
    { fi: (x) => `Haluan keskustella tästä aiheesta: ${x}.`, en: (x) => `I want to discuss this topic: ${x}.` },
    { fi: (x) => `Tarvitsen lisätietoa seuraavasta asiasta: ${x}.`, en: (x) => `I need more information about the following matter: ${x}.` },
    { fi: (x) => `Minun on tärkeää ymmärtää tämä asia: ${x}.`, en: (x) => `It is important for me to understand this matter: ${x}.` },
    { fi: (x) => `Voisitteko neuvoa minua tässä asiassa: ${x}?`, en: (x) => `Could you advise me about this matter: ${x}?` },
    { fi: (x) => `Olen etsinyt tietoa tästä aiheesta: ${x}.`, en: (x) => `I have been looking for information about this topic: ${x}.` },
    { fi: (x) => `Tämä aihe vaikuttaa monen ihmisen arkeen: ${x}.`, en: (x) => `This topic affects many people's everyday lives: ${x}.` },
    { fi: (x) => `Haluaisin kuulla muiden kokemuksia tästä aiheesta: ${x}.`, en: (x) => `I would like to hear other people's experiences of this topic: ${x}.` },
    { fi: (x) => `Mielestäni tästä asiasta pitäisi keskustella enemmän: ${x}.`, en: (x) => `In my opinion, this matter should be discussed more: ${x}.` },
    { fi: (x) => `Kirjoitan palautetta seuraavasta asiasta: ${x}.`, en: (x) => `I am writing feedback about the following matter: ${x}.` }
  ];

  const topics = [
    { topic: "Tausta", items: [
      ["sopeutuminen uuteen kotimaahan", "adapting to a new home country"],
      ["suomen kielen oppiminen aikuisena", "learning Finnish as an adult"],
      ["oman kulttuurin ja suomalaisen kulttuurin yhdistäminen", "combining one's own culture with Finnish culture"],
      ["uusien ystävien löytäminen", "finding new friends"],
      ["perheen merkitys arjessa", "the importance of family in everyday life"],
      ["omat vahvuudet ja tulevaisuuden tavoitteet", "personal strengths and future goals"],
      ["vapaa-ajan harrastukset ja kiinnostuksen kohteet", "leisure activities and interests"],
      ["kotoutuminen paikalliseen yhteisöön", "integrating into the local community"],
      ["monikielisyys perheessä", "multilingualism in the family"],
      ["elämänmuutokset ja niihin sopeutuminen", "life changes and adapting to them"]
    ]},
    { topic: "Asuminen", items: [
      ["kohtuuhintaisen vuokra-asunnon löytäminen", "finding an affordable rental apartment"],
      ["vuokrasopimuksen ehdot ja irtisanomisaika", "rental agreement terms and the notice period"],
      ["asunnon viat ja yhteydenotto huoltoyhtiöön", "faults in an apartment and contacting maintenance"],
      ["naapureiden aiheuttama melu", "noise caused by neighbors"],
      ["taloyhtiön yhteiset tilat ja säännöt", "shared facilities and rules of a housing company"],
      ["muuttoilmoituksen tekeminen", "submitting a notification of move"],
      ["kodin sähkön- ja vedenkulutus", "household electricity and water consumption"],
      ["jätteiden lajittelu kotona", "sorting household waste"],
      ["asuinalueen turvallisuus ja viihtyisyys", "the safety and comfort of a residential area"],
      ["asunnon ostaminen ja asuntolainan hakeminen", "buying a home and applying for a mortgage"]
    ]},
    { topic: "Palvelut", items: [
      ["viallisen tuotteen palauttaminen kauppaan", "returning a defective product to a shop"],
      ["ajan varaaminen asiakaspalvelusta", "booking an appointment with customer service"],
      ["verkkokaupan toimitusongelma", "an online shop delivery problem"],
      ["pankkitilin avaaminen ja verkkopankin käyttö", "opening a bank account and using online banking"],
      ["kadonneen paketin selvittäminen", "investigating a missing parcel"],
      ["tuotteen takuu ja kuluttajan oikeudet", "a product warranty and consumer rights"],
      ["hintojen ja palveluehtojen vertaileminen", "comparing prices and service terms"],
      ["reklamaation kirjoittaminen yritykselle", "writing a complaint to a company"],
      ["sähköisen tunnistautumisen ongelmat", "problems with electronic identification"],
      ["hyvän asiakaspalvelun merkitys", "the importance of good customer service"]
    ]},
    { topic: "Kulttuuri", items: [
      ["kirjaston palvelut ja tapahtumat", "library services and events"],
      ["paikalliset juhlat ja perinteet", "local celebrations and traditions"],
      ["museoiden saavutettavuus", "museum accessibility"],
      ["harrastusten vaikutus hyvinvointiin", "the effect of hobbies on wellbeing"],
      ["suomalainen sauna- ja mökkikulttuuri", "Finnish sauna and cottage culture"],
      ["kulttuuritapahtumien lippujen hinnat", "ticket prices for cultural events"],
      ["lasten ja nuorten harrastusmahdollisuudet", "recreational opportunities for children and young people"],
      ["taiteen merkitys yhteiskunnassa", "the importance of art in society"],
      ["urheiluseurojen vapaaehtoistoiminta", "volunteer work in sports clubs"],
      ["eri kulttuurien kohtaaminen arjessa", "different cultures meeting in everyday life"]
    ]},
    { topic: "Matkailu", items: [
      ["julkisen liikenteen aikataulut ja reitit", "public transport timetables and routes"],
      ["myöhästyneen junan lipun korvaaminen", "compensation for a delayed train ticket"],
      ["kadonneiden matkatavaroiden etsiminen", "looking for lost luggage"],
      ["hotellihuoneen varaaminen ja peruuttaminen", "booking and cancelling a hotel room"],
      ["matkavakuutuksen ehdot", "travel insurance terms"],
      ["turvallinen pyöräily kaupungissa", "safe cycling in the city"],
      ["esteetön matkustaminen", "accessible travel"],
      ["kotimaanmatkailun hyödyt", "the benefits of domestic tourism"],
      ["ympäristöystävälliset matkustustavat", "environmentally friendly ways to travel"],
      ["ruuhka-ajan liikenneongelmat", "rush-hour traffic problems"]
    ]},
    { topic: "Terveys", items: [
      ["lääkäriajan varaaminen terveyskeskuksesta", "booking a doctor's appointment at a health center"],
      ["oireiden kuvaileminen vastaanotolla", "describing symptoms at an appointment"],
      ["lääkkeiden turvallinen käyttö", "the safe use of medication"],
      ["mielenterveyspalvelujen saatavuus", "the availability of mental health services"],
      ["liikunnan vaikutus terveyteen", "the effect of exercise on health"],
      ["terveellinen ja monipuolinen ruokavalio", "a healthy and varied diet"],
      ["unen merkitys jaksamiselle", "the importance of sleep for coping"],
      ["työterveyshuollon palvelut", "occupational healthcare services"],
      ["sairauslomasta ilmoittaminen", "reporting sick leave"],
      ["työn ja vapaa-ajan tasapaino", "the balance between work and free time"]
    ]},
    { topic: "Työ", items: [
      ["työpaikkailmoituksen ymmärtäminen", "understanding a job advertisement"],
      ["ansioluettelon ja työhakemuksen kirjoittaminen", "writing a CV and job application"],
      ["työhaastatteluun valmistautuminen", "preparing for a job interview"],
      ["työsopimuksen ehdot ja koeaika", "employment contract terms and the probationary period"],
      ["etätyön hyödyt ja haasteet", "the benefits and challenges of remote work"],
      ["hyvä yhteistyö työpaikalla", "good cooperation in the workplace"],
      ["ammatillinen koulutus ja työharjoittelu", "vocational education and work placement"],
      ["palautteen antaminen ja vastaanottaminen", "giving and receiving feedback"],
      ["työturvallisuus ja perehdytys", "occupational safety and orientation"],
      ["jatkuva oppiminen työelämässä", "continuous learning in working life"]
    ]},
    { topic: "Ympäristö", items: [
      ["ilmastonmuutoksen vaikutukset Suomessa", "the effects of climate change in Finland"],
      ["julkisen liikenteen päästöjen vähentäminen", "reducing public transport emissions"],
      ["energian säästäminen kotona", "saving energy at home"],
      ["luonnon monimuotoisuuden suojeleminen", "protecting biodiversity"],
      ["muovin ja pakkausjätteen vähentäminen", "reducing plastic and packaging waste"],
      ["lähiruoan ja sesonkituotteiden ostaminen", "buying local and seasonal food"],
      ["jokaisenoikeudet ja luonnossa liikkuminen", "everyman's rights and accessing nature"],
      ["kaupunkien viheralueiden merkitys", "the importance of urban green spaces"],
      ["tavaroiden korjaaminen ja kierrättäminen", "repairing and recycling goods"],
      ["yritysten ympäristövastuu", "corporate environmental responsibility"]
    ]},
    { topic: "Yhteiskunta", items: [
      ["kunnan päätöksenteko ja palvelut", "municipal decision-making and services"],
      ["äänioikeus ja vaaleihin osallistuminen", "the right to vote and participating in elections"],
      ["verojen merkitys hyvinvointipalveluille", "the importance of taxes for welfare services"],
      ["yhdenvertaisuus ja syrjinnän ehkäiseminen", "equality and preventing discrimination"],
      ["luotettavan uutisen tunnistaminen", "recognizing a reliable news story"],
      ["vapaaehtoistyöhön osallistuminen", "participating in volunteer work"],
      ["viranomaisen päätöksestä valittaminen", "appealing an authority's decision"],
      ["sananvapaus ja vastuu omista sanoista", "freedom of speech and responsibility for one's words"],
      ["julkisten palvelujen digitalisoituminen", "the digitalization of public services"],
      ["kansalaisten mahdollisuudet vaikuttaa", "citizens' opportunities to influence decisions"]
    ]},
    { topic: "Vuorovaikutus", items: [
      ["kohtelias pyyntö ja sen perusteleminen", "a polite request and explaining its reasons"],
      ["oman mielipiteen ilmaiseminen selkeästi", "expressing one's opinion clearly"],
      ["eriävän mielipiteen esittäminen rakentavasti", "expressing disagreement constructively"],
      ["epäselvän asian tarkistaminen", "checking something unclear"],
      ["tapaamisen peruuttaminen ja uuden ajan ehdottaminen", "cancelling a meeting and suggesting a new time"],
      ["viralliseen viestiin vastaaminen", "responding to a formal message"],
      ["palautteen ja reklamaation kirjoittaminen", "writing feedback and a complaint"],
      ["anteeksipyynnön esittäminen", "making an apology"],
      ["ratkaisun ehdottaminen ongelmatilanteessa", "suggesting a solution to a problem"],
      ["keskustelun yhteenveto ja jatkotoimista sopiminen", "summarizing a discussion and agreeing on next steps"]
    ]}
  ];

  function buildExpansion() {
    return topics.flatMap((group, topicIndex) => group.items.flatMap(([fi, en], itemIndex) => frames.map((frame, frameIndex) => ({
      id: `yki-${topicIndex}-${itemIndex}-${frameIndex}`,
      topic: group.topic,
      fi: frame.fi(fi),
      en: frame.en(en)
    }))));
  }

  return { buildExpansion };
});
