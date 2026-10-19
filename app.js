"use strict";

const STORAGE_KEYS = {
  residents: "bergfrieden.residents.v1",
  cards: "bergfrieden.cards.v1",
  sessions: "bergfrieden.sessions.v1",
  sound: "bergfrieden.sound.v1"
};

const cardImagePaths = {
  apfel: "./images/cards/apfel.jpg",
  tee: "./images/cards/tee.jpg",
  kamillentee: "./images/cards/kamillentee.svg",
  samowar: "./images/cards/samowar.svg",
  birke: "./images/cards/birke.svg",
  schal: "./images/cards/schal.svg",
  katze: "./images/cards/katze.jpg",
  hund: "./images/cards/hund.jpg",
  brot: "./images/cards/brot.jpg",
  wasser: "./images/cards/wasser.jpg",
  suppe: "./images/cards/suppe.jpg",
  milch: "./images/cards/milch.jpg",
  blume: "./images/cards/blume.jpg",
  garten: "./images/cards/garten.svg",
  sonne: "./images/cards/sonne.jpg",
  haus: "./images/cards/haus.jpg",
  foto: "./images/cards/foto.jpg",
  handarbeit: "./images/cards/handarbeit.svg",
  musik: "./images/cards/musik.jpg",
  waerme: "./images/cards/waerme.svg",
  schmerz: "./images/cards/schmerz.jpg",
  toilette: "./images/cards/toilette.svg"
};

const categories = ["Essen & Trinken", "Alltag", "Natur & Tiere", "Kleidung", "Wohlbefinden"];
const demoResident = {
  id: "demo-kai",
  name: "Kai Röhner",
  room: "12",
  unit: "Wohnbereich 1",
  avatar: "👤",
  note: "",
  color: "sage"
};

const starterCards = [
  ["apfel", "Essen & Trinken", "Apfel", "яблоко", "JAH-blah-kuh", "🍎", "Ein Apfel, den Sie vielleicht aus dem Garten kennen.", "Was haben Sie früher gern aus Äpfeln gemacht?", ["яблоко", "яблочки"]],
  ["tee", "Essen & Trinken", "Tee", "чай", "tschai", "🍵", "Eine warme Tasse Tee für eine kleine Pause.", "Welchen Tee trinken Sie am liebsten?", ["чай"]],
  ["kamillentee", "Essen & Trinken", "Kamillentee", "ромашковый чай", "rah-MASH-kuh-vy tschai", "🌼", "Kamillentee duftet mild und blumig.", "Trinken Sie gern Kamillentee?", ["ромашковый чай", "ромашка"]],
  ["samowar", "Essen & Trinken", "Samowar", "самовар", "sah-mah-VAR", "🫖", "Ein Samowar hält das Wasser für Tee warm.", "Kennen Sie einen Samowar aus Ihrer Familie?", ["самовар"]],
  ["birke", "Natur & Tiere", "Birke", "берёза", "bee-RJOH-zah", "🌳", "Eine Birke hat einen hellen Stamm und zarte Blätter.", "Gab es in Ihrer Heimat viele Birken?", ["берёза", "береза"]],
  ["schal", "Kleidung", "Schal", "шарф", "sharf", "🧣", "Ein weicher Schal wärmt den Hals.", "Welche Farbe mögen Sie bei Schals?", ["шарф"]],
  ["katze", "Natur & Tiere", "Katze", "кошка", "KOSH-kah", "🐈", "Katzen schnurren, wenn sie sich wohlfühlen.", "Hatten Sie früher eine Katze?", ["кошка", "кот"]],
  ["hund", "Natur & Tiere", "Hund", "собака", "sah-BAH-kah", "🐕", "Ein Hund freut sich oft über einen Spaziergang.", "Hatten Sie einmal einen Hund?", ["собака", "пёс"]],
  ["brot", "Essen & Trinken", "Brot", "хлеб", "khlyeb", "🍞", "Frisches Brot duftet besonders gut.", "Welches Brot essen Sie gern?", ["хлеб"]],
  ["wasser", "Essen & Trinken", "Wasser", "вода", "vah-DAH", "💧", "Ein Glas Wasser tut gut.", "Möchten Sie ein Glas Wasser?", ["вода", "воды"]],
  ["suppe", "Essen & Trinken", "Suppe", "суп", "soop", "🍲", "Eine warme Suppe kann ein wohltuendes Essen sein.", "Welche Suppe mögen Sie besonders gern?", ["суп", "супчик"]],
  ["milch", "Essen & Trinken", "Milch", "молоко", "mah-lah-KOH", "🥛", "Milch wird zum Beispiel für Kakao verwendet.", "Haben Sie als Kind gern Milch getrunken?", ["молоко"]],
  ["blume", "Natur & Tiere", "Blume", "цветок", "tsvye-TOK", "🌷", "Eine Blume bringt Farbe in den Raum.", "Welche Blumen gefallen Ihnen?", ["цветок", "цветы"]],
  ["garten", "Natur & Tiere", "Garten", "сад", "sat", "🌻", "Im Garten wachsen Blumen, Kräuter und Gemüse.", "Haben Sie gern im Garten gearbeitet?", ["сад", "огород"]],
  ["sonne", "Natur & Tiere", "Sonne", "солнце", "SOLN-tse", "☀️", "Die Sonne wärmt das Gesicht.", "Genießen Sie gern die Sonne?", ["солнце"]],
  ["haus", "Alltag", "Haus", "дом", "dom", "🏡", "Ein Haus ist ein vertrauter Ort zum Wohnen.", "Wo haben Sie früher gewohnt?", ["дом", "дома"]],
  ["foto", "Alltag", "Foto", "фотография", "fah-tah-GRAH-fee-yah", "📷", "Ein Foto hält einen schönen Moment fest.", "Möchten Sie von einer Erinnerung erzählen?", ["фотография", "фото"]],
  ["handarbeit", "Alltag", "Handarbeit", "рукоделие", "roo-kah-DYE-lee-ye", "🧶", "Beim Stricken und Nähen entstehen schöne Dinge.", "Haben Sie früher gestrickt oder genäht?", ["рукоделие", "вязание"]],
  ["musik", "Alltag", "Musik", "музыка", "MOO-zy-kah", "🎵", "Musik kann Erinnerungen und Gefühle wecken.", "Welche Musik hören Sie gern?", ["музыка"]],
  ["waerme", "Wohlbefinden", "Wärme", "тепло", "tib-LOH", "🧤", "Eine Decke kann für angenehme Wärme sorgen.", "Ist Ihnen angenehm warm?", ["тепло", "тёплый"]],
  ["schmerz", "Wohlbefinden", "Schmerzen", "боль", "bol", "🩹", "Bitte sagen Sie uns, wenn Sie Schmerzen haben.", "Haben Sie gerade Schmerzen?", ["боль", "болит"]],
  ["toilette", "Wohlbefinden", "Toilette", "туалет", "too-ah-LYET", "🚻", "Das Wort hilft, einen wichtigen Wunsch mitzuteilen.", "Möchten Sie zur Toilette gehen?", ["туалет"]]
].map(([id, category, de, ru, latin, emoji, note, question, synonyms]) => ({
  id, category, de, ru, latin, emoji, note, question, synonyms, imageUrl: cardImagePaths[id] || ""
}));

const quickPhrases = [
  { de: "Möchten Sie etwas trinken?", ru: "Хотите что-нибудь выпить?", latin: "Khotite chto-nibud' vypit'?" },
  { de: "Haben Sie Schmerzen?", ru: "Вы испытываете боль?", latin: "Vy ispytyvayete bol'?" },
  { de: "Ist Ihnen kalt?", ru: "Вам холодно?", latin: "Vam kholodno?" },
  { de: "Möchten Sie zur Toilette?", ru: "Вам нужно в туалет?", latin: "Vam nuzhno v tualet?" },
  { de: "Alles ist gut, ich bin da.", ru: "Всё хорошо, я рядом.", latin: "Vsyo khorosho, ya ryadom." }
];

function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.error(`Lokale Daten "${key}" konnten nicht gelesen werden.`, error);
    showToast("Gespeicherte Daten konnten nicht gelesen werden. Bitte prüfen Sie den Gerätespeicher.");
    return fallback;
  }
}

const storedResidents = readStored(STORAGE_KEYS.residents, [demoResident]);
const formerResident = storedResidents.find(resident =>
  resident.id === "demo-valentina" || resident.id === "demo-kai"
  || resident.name === "Valentina Müller" || resident.name === "Kai Roehner"
);
const residents = storedResidents.map(resident => {
  if (resident.id !== "demo-valentina" && resident.id !== "demo-kai"
    && resident.name !== "Valentina Müller" && resident.name !== "Kai Roehner") return resident;
  return {
    ...resident,
    name: "Kai Röhner",
    avatar: resident.avatar === "👵" ? "👤" : resident.avatar,
    note: resident.note?.startsWith("Beispielprofil:") ? "" : resident.note
  };
});
const formerResidentIndex = residents.findIndex(resident => resident.id === formerResident?.id);
if (formerResidentIndex > 0) {
  residents.unshift(residents.splice(formerResidentIndex, 1)[0]);
}
const residentsNeedMigration = residents.some((resident, index) => resident !== storedResidents[index]);

const state = {
  residents,
  cards: readStored(STORAGE_KEYS.cards, starterCards),
  sessions: readStored(STORAGE_KEYS.sessions, []),
  sound: readStored(STORAGE_KEYS.sound, true) !== false,
  screen: "home",
  category: "Alle",
  cardIndex: 0,
  cardSearch: "",
  cardFilter: "Alle",
  selectedAvatar: "👤",
  quizMode: "word-picture",
  quiz: null,
  quizScore: 0,
  quizStreak: 0,
  dailyReportDate: localDateString(),
  learningStep: 0,
  tutorialStep: 0,
  chat: [],
  recognition: null,
  recognitionStartedAt: 0,
  nativeSpeakCallback: null,
  installPrompt: null
};
if (residentsNeedMigration) persist(STORAGE_KEYS.residents, state.residents);
state.cards = state.cards.map(card => ({
  ...card,
  imageUrl: cardImagePaths[card.id]?.endsWith(".svg") && card.imageUrl === `./images/cards/${card.id}.jpg`
    ? cardImagePaths[card.id]
    : card.imageUrl || cardImagePaths[card.id] || ""
}));

function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Lokale Daten "${key}" konnten nicht gespeichert werden.`, error);
    showToast("Speichern auf diesem Gerät ist fehlgeschlagen. Bitte prüfen Sie den verfügbaren Speicherplatz.");
  }
}

function showToast(message) {
  const region = document.getElementById("toast-region");
  if (!region) return;
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  region.append(item);
  window.setTimeout(() => item.remove(), 4200);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function activeResident() {
  return state.residents[0] || null;
}

function getResident(id) {
  return state.residents.find(resident => resident.id === id);
}

function currentCards() {
  const visible = state.cards.filter(card => state.category === "Alle" || card.category === state.category);
  if (visible.length === 0) return [];
  if (state.cardIndex >= visible.length) state.cardIndex = 0;
  return visible;
}

function getCurrentCard() {
  const cards = currentCards();
  return cards[state.cardIndex] || null;
}

function residentLogs() {
  const resident = activeResident();
  return state.sessions.filter(session => session.residentId === (resident && resident.id));
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dailyLogs(residentId = activeResident()?.id, dateValue = localDateString()) {
  if (!residentId || !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) return [];
  const [year, month, day] = dateValue.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  if (selectedDate.getFullYear() !== year || selectedDate.getMonth() !== month - 1 || selectedDate.getDate() !== day) return [];
  return state.sessions.filter(session => {
    const time = new Date(session.time);
    return session.residentId === residentId && localDateString(time) === dateValue;
  });
}

function weekStartDate(offset = 0) {
  const monday = new Date();
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7) + offset * 7);
  return monday;
}

function weeklyLogs(residentId = activeResident()?.id, offset = 0) {
  if (!residentId) return [];
  const monday = weekStartDate(offset);
  const nextMonday = new Date(monday);
  nextMonday.setDate(nextMonday.getDate() + 7);
  return state.sessions.filter(session => {
    const time = new Date(session.time);
    return session.residentId === residentId && time >= monday && time < nextMonday;
  });
}

function residentProgress(residentId) {
  const logs = state.sessions.filter(session => session.residentId === residentId);
  const points = logs.reduce((total, session) => total + 5 + (session.correct ? 5 : 0), 0);
  return { logs, points, level: Math.floor(points / 50) + 1, levelProgress: points % 50 * 2 };
}

function cardPhoto(card, className) {
  const imageUrl = card.imageUrl || cardImagePaths[card.id || card.cardId] || "";
  return imageUrl
    ? `<img class="${className}" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(card.de)}" loading="lazy">`
    : `<div class="${className} photo-missing" role="img" aria-label="Kein Foto für ${escapeHtml(card.de)}">Foto fehlt</div>`;
}

function residentGreeting() {
  const resident = activeResident();
  if (!resident) return "Guten Tag!";
  return `Guten Tag, ${resident.name}!`;
}

function render() {
  renderHeader();
  renderNavigation();
  const root = document.getElementById("screen");
  const screens = {
    home: renderHome,
    pictures: renderPictures,
    game: renderGame,
    dialogue: renderDialogue,
    journal: renderJournal,
    cards: renderCards,
    residents: renderResidents
  };
  root.innerHTML = (screens[state.screen] || renderHome)();
  if (state.screen === "game" && !state.quiz) newQuizQuestion();
}

function renderHeader() {
  const resident = activeResident();
  const topProfile = document.getElementById("top-profile");
  const soundSwitch = document.getElementById("sound-switch");
  document.getElementById("sound-label").textContent = state.sound ? "Ton an" : "Ton aus";
  soundSwitch.setAttribute("aria-checked", String(state.sound));
  soundSwitch.setAttribute("aria-label", state.sound ? "Audioeffekte stummschalten" : "Audioeffekte einschalten");
  const installButton = document.getElementById("install-app");
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  installButton.hidden = isStandalone || (!state.installPrompt && !isIosSafari());
  topProfile.innerHTML = resident
    ? `<span class="avatar">${escapeHtml(resident.avatar)}</span><span>${escapeHtml(resident.name.split(" ")[0])}</span>`
    : `<span class="avatar">＋</span><span>Bewohner wählen</span>`;
  const mini = document.getElementById("sidebar-resident");
  mini.innerHTML = resident
    ? `<div class="resident-inline"><span class="avatar">${escapeHtml(resident.avatar)}</span><span><strong>${escapeHtml(resident.name)}</strong><small>Zimmer ${escapeHtml(resident.room || "–")} · aktiv</small></span></div>`
    : `<div class="resident-inline"><span class="avatar">＋</span><span><strong>Kein Profil ausgewählt</strong><small>Bewohnerprofil hinzufügen</small></span></div>`;
}

function renderNavigation() {
  document.querySelectorAll(".nav-item[data-screen]").forEach(button => {
    button.classList.toggle("active", button.dataset.screen === state.screen);
    if (button.dataset.screen === state.screen) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
}

function renderHome() {
  const resident = activeResident();
  const logs = dailyLogs(resident?.id);
  const week = weeklyLogs();
  const progress = resident ? residentProgress(resident.id) : { points: 0, level: 1, levelProgress: 0 };
  const uniqueCards = new Set(logs.map(item => item.cardId));
  const correct = logs.filter(item => item.correct).length;
  const accuracy = logs.length ? Math.round(correct / logs.length * 100) : 0;
  const date = new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  const residentLine = resident
    ? `<div class="hero-resident"><span class="avatar">${escapeHtml(resident.avatar)}</span><span>Zimmer ${escapeHtml(resident.room || "–")} · ${escapeHtml(resident.unit || "Zum Bergfrieden")}</span><span class="pill">Heute · ${escapeHtml(date)}</span></div>`
    : `<div class="hero-resident"><span class="pill">Heute · ${escapeHtml(date)}</span></div>`;
  return `
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">Alten- & Pflegeheim · Zum Bergfrieden</p>
        <h1>${escapeHtml(residentGreeting())}</h1>
        ${residentLine}
        <p class="subtle">Schön, dass Sie da sind. Mit vertrauten Bildern und Worten entsteht Raum für Begegnung.</p>
        <div class="hero-actions">
          <button class="button button-light" data-action="navigate" data-screen="pictures">▧ &nbsp;Übung beginnen</button>
          <button class="button button-quiet" data-action="door">↗ &nbsp;Tor öffnen</button>
        </div>
      </div>
    </section>
    ${resident ? `<section class="learning-progress panel"><div class="panel-heading"><div><p class="eyebrow">Dein Lernweg</p><h3>Level ${progress.level} · ${progress.points} Lernpunkte</h3></div><span class="pill">${week.length} Übungen diese Woche</span></div><div class="progress-track progress-track-large"><div class="progress-fill" style="width:${progress.levelProgress}%"></div></div><div class="progress-caption"><span>${progress.levelProgress}% bis Level ${progress.level + 1}</span><span>${Math.min(week.length, 5)} / 5 Wochensterne</span></div><div class="week-stars" aria-label="${Math.min(week.length, 5)} von 5 Wochensternen">${Array.from({ length: 5 }, (_, index) => `<span class="${week.length > index ? "earned" : ""}">★</span>`).join("")}</div></section>` : ""}
    <div class="stat-row">
      <div class="stat-card"><span class="stat-icon">🌿</span><span><strong>${uniqueCards.size}<small class="muted"> / ${state.cards.length}</small></strong><small>Bildkarten geübt</small></span></div>
      <div class="stat-card"><span class="stat-icon">👏</span><span><strong>${logs.length ? `${accuracy}%` : "–"}</strong><small>Erfolgsquote heute</small></span></div>
      <div class="stat-card"><span class="stat-icon">💬</span><span><strong>${logs.length}</strong><small>Übungsreaktionen</small></span></div>
    </div>
    <section class="weekly-report panel"><div><p class="eyebrow">Tagesübersicht für die Urkunde</p><h2>${logs.length ? `${logs.length} ${logs.length === 1 ? "Übung" : "Übungen"} heute` : "Noch keine Übungen heute"}</h2><p class="subtle small">${correct} ${correct === 1 ? "Wort erkannt" : "Wörter erkannt"} · ${uniqueCards.size} verschiedene Bildkarten</p></div><button class="button button-small" data-action="daily-certificate" data-date="${localDateString()}" ${logs.length ? "" : "disabled"}>Tagesurkunde ansehen / drucken</button></section>
    <div class="section-title-row"><h2>Was möchten Sie gemeinsam tun?</h2></div>
    <div class="action-grid">
      <button class="action-card" data-action="navigate" data-screen="pictures"><span class="action-icon">🖼️</span><strong>Bild-Aktivierung</strong><small>Sehen, hören und ins Gespräch kommen</small></button>
      <button class="action-card" data-action="navigate" data-screen="game"><span class="action-icon">🎯</span><strong>Wort-Spiel</strong><small>Wörter spielerisch wiedererkennen</small></button>
      <button class="action-card" data-action="navigate" data-screen="dialogue"><span class="action-icon">💬</span><strong>Dolmetscher</strong><small>Hilfreiche Pflege-Phrasen auf Russisch</small></button>
      <button class="action-card" data-action="navigate" data-screen="journal"><span class="action-icon">📖</span><strong>Pflege-Tagebuch</strong><small>Übungen ansehen und SIS-Text erstellen</small></button>
    </div>
    <div class="two-col">
      <section class="panel">
        <div class="panel-heading"><h3>Ein kleiner Impuls für heute</h3><span class="pill">✨ Gemeinsam</span></div>
        <div class="today-note">„Ein vertrauter Duft, ein Bild oder ein Wort kann eine ganze Geschichte öffnen.“<br><br>Geben Sie Zeit zum Antworten. Jede Reaktion ist wertvoll – ganz ohne Leistungsdruck.</div>
      </section>
      <section class="panel">
        <div class="panel-heading"><h3>Aktives Bewohnerprofil</h3><button class="text-button" data-action="navigate" data-screen="residents">Verwalten →</button></div>
        ${resident ? `<div class="resident-inline"><span class="avatar">${escapeHtml(resident.avatar)}</span><span><strong>${escapeHtml(resident.name)}</strong><small>Zimmer ${escapeHtml(resident.room || "–")} · ${escapeHtml(resident.unit || "Zum Bergfrieden")}</small></span></div><div class="divider"></div><p class="small muted">${escapeHtml(resident.note || "Noch keine Biografie-Notiz hinterlegt.")}</p>` : `<p class="subtle">Fügen Sie zuerst ein Bewohnerprofil hinzu.</p><button class="button button-small" data-action="navigate" data-screen="residents">＋ Profil erstellen</button>`}
      </section>
    </div>`;
}

function categoryTabs(selected, actionName) {
  return `<div class="category-tabs" role="group" aria-label="Kategorien"><button class="category-tab ${selected === "Alle" ? "active" : ""}" data-action="${actionName}" data-category="Alle">Alle</button>${categories.map(category => `<button class="category-tab ${selected === category ? "active" : ""}" data-action="${actionName}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}</div>`;
}

function renderPictures() {
  const card = getCurrentCard();
  const cards = currentCards();
  const steps = ["Ansehen", "Anhören", "Nachsprechen", "Geschafft"];
  const learningStep = Math.min(state.learningStep, steps.length - 1);
  if (!card) return `<div class="page-heading"><div><p class="eyebrow">Gemeinsam entdecken</p><h1>Bild-Aktivierung</h1><p class="subtle">Wählen Sie eine Karte im Karten-Studio aus.</p></div><button class="button" data-action="navigate" data-screen="cards">Karten-Studio öffnen</button></div><div class="empty-state"><div class="empty-icon">🖼️</div><strong>Keine Bildkarten in dieser Kategorie</strong>Erstellen Sie eine Karte oder wählen Sie eine andere Kategorie.</div>`;
  return `
    <div class="page-heading"><div><p class="eyebrow">Sehen · Hören · Erinnern</p><h1>Bild-Aktivierung</h1><p class="subtle">Ein Bild, ein Wort und eine gemeinsame Erinnerung – ganz in Ihrem Tempo.</p></div><span class="pill">${state.cardIndex + 1} von ${cards.length} Karten</span></div>
    ${categoryTabs(state.category, "category")}
    <div class="lesson-progress" aria-label="Übungsschritt ${learningStep + 1} von ${steps.length}">${steps.map((step, index) => `<div class="lesson-step ${index < learningStep ? "complete" : ""} ${index === learningStep ? "current" : ""}"><span>${index < learningStep ? "✓" : index + 1}</span><small>${step}</small></div>`).join("")}</div>
    <div class="picture-layout">
      <article class="picture-display">
        <div class="picture-art">${cardPhoto(card, "picture-photo")}</div>
        <div class="picture-copy"><p class="eyebrow">${escapeHtml(card.category)}</p><h2>${escapeHtml(card.de)}</h2><div class="ru-word" lang="ru">${escapeHtml(card.ru)}</div><div class="ru-translation">Deutsch: ${escapeHtml(card.de)}</div><div class="transliteration">${escapeHtml(card.latin || "")}</div></div>
        <div class="picture-controls"><button class="button button-outline button-small" data-action="card-prev" aria-label="Vorherige Karte">← Zurück</button><button class="button button-outline button-small" data-action="card-random">⤨ Zufall</button><button class="button button-outline button-small" data-action="card-next">Weiter →</button><span class="spacer"></span><button class="button button-icon button-outline" data-action="bell" aria-label="Glocke läuten">🔔</button></div>
      </article>
      <section class="panel word-list">
        <div><p class="eyebrow">Schritt ${learningStep + 1} von ${steps.length} · ${steps[learningStep]}</p><h2>${learningStep === 0 ? escapeHtml(card.de) : learningStep === 1 ? "Hören Sie genau hin" : learningStep === 2 ? "Jetzt sind Sie dran" : "Prima geübt!"}</h2><p class="subtle small">${learningStep === 0 ? "Das russische Wort bedeutet auf Deutsch:" : learningStep === 1 ? `Russisch: ${escapeHtml(card.ru)} — Deutsch: ${escapeHtml(card.de)}` : learningStep === 2 ? `Sprechen Sie „${escapeHtml(card.ru)}“ nach. Das bedeutet „${escapeHtml(card.de)}“.` : `Sie haben „${escapeHtml(card.ru)}“ (${escapeHtml(card.de)}) geübt.`}</p></div>
        ${learningStep === 0 ? `<div class="word-hint"><strong>Erinnerungsfrage</strong><br>${escapeHtml(card.question || "Woran erinnert Sie dieses Bild?")}</div>` : ""}
        <div class="recognition-status" id="recognition-status" role="status">Wählen Sie eine Sprechweise oder hören Sie einfach zu.</div>
        ${learningStep === 1 ? `<div class="toolbar" style="margin:0"><button class="button button-small" data-action="speak-card" data-speed="normal">Russisch anhören</button><button class="button button-outline button-small" data-action="speak-card" data-speed="slow">Langsam anhören</button></div>` : ""}
        ${learningStep === 2 ? `<button class="mic-button" id="mic-button" data-action="recognize"><span class="voice-indicator">●</span> Antwort sprechen</button><div class="voice-meter" id="voice-meter" role="img" aria-label="Mikrofon wartet"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><button class="button button-outline button-small" data-action="complete-practice">Ohne Mikrofon als geübt markieren</button><p class="small muted" style="margin:0">Die Spracherkennung läuft im Browser. Ihre Aufnahme wird nicht gespeichert.</p>` : ""}
        <div class="toolbar lesson-controls" style="margin:0">${learningStep > 0 && learningStep < 3 ? `<button class="button button-outline button-small" data-action="lesson-prev">← Zurück</button>` : ""}${learningStep === 3 ? `<button class="button" data-action="card-next">Nächste Bildkarte →</button>` : learningStep < 2 ? `<button class="button" data-action="lesson-next">${learningStep === 0 ? "Weiter zum Anhören" : "Gehört — weiter"} →</button>` : ""}</div>
      </section>
    </div>`;
}

function gameCardPool() {
  return state.cards.length > 1 ? state.cards : state.cards.slice();
}

function newQuizQuestion() {
  const pool = gameCardPool();
  if (!pool.length) {
    state.quiz = null;
    return;
  }
  const target = pool[Math.floor(Math.random() * pool.length)];
  const distractors = pool.filter(card => card.id !== target.id);
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  state.quiz = {
    target,
    options: [target, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5),
    answered: false,
    selectedId: ""
  };
}

function renderGame() {
  if (state.cards.length < 2) return `<div class="page-heading"><div><p class="eyebrow">Spielerisch üben</p><h1>Wort-Spiel</h1></div></div><div class="empty-state"><div class="empty-icon">🎯</div><strong>Zum Spielen werden mindestens zwei Karten benötigt.</strong>Fügen Sie Karten im Karten-Studio hinzu.</div>`;
  if (!state.quiz) newQuizQuestion();
  const quiz = state.quiz;
  const target = quiz.target;
  const wordPicture = state.quizMode === "word-picture";
  const prompt = wordPicture
    ? `<div class="quiz-target" lang="ru">${escapeHtml(target.ru)}<small>Deutsch: ${escapeHtml(target.de)} · Tippen Sie auf das passende Bild.</small><button class="text-button" data-action="speak-text" data-text="${escapeHtml(target.ru)}" data-language="ru-RU">Russisch anhören</button></div>`
    : `<div class="quiz-target">${escapeHtml(target.de)}<small>Wie heißt das auf Russisch?</small></div>${cardPhoto(target, "quiz-photo")}`;
  const answers = quiz.options.map(option => {
    const isSelected = quiz.answered && option.id === quiz.selectedId;
    const isCorrect = option.id === target.id;
    const resultClass = quiz.answered && isCorrect ? "correct" : isSelected ? "wrong" : "";
    const resultLabel = quiz.answered
      ? (isSelected ? (isCorrect ? "aria-label=\"Richtige Antwort\"" : "aria-label=\"Falsche Antwort\"") : isCorrect ? "aria-label=\"Richtige Antwort\"" : "")
      : "";
    return wordPicture
      ? `<button class="answer-option ${resultClass}" ${resultLabel} data-action="answer" data-id="${escapeHtml(option.id)}" ${quiz.answered ? "disabled" : ""}>${cardPhoto(option, "answer-photo")}<span class="answer-ru">${escapeHtml(option.de)}</span><small>${escapeHtml(option.category)}</small></button>`
      : `<button class="answer-option ${resultClass}" ${resultLabel} data-action="answer" data-id="${escapeHtml(option.id)}" ${quiz.answered ? "disabled" : ""}><span class="answer-ru" lang="ru">${escapeHtml(option.ru)}</span><small>Deutsch: ${escapeHtml(option.de)} · ${escapeHtml(option.latin || "")}</small></button>`;
  }).join("");
  return `
    <div class="page-heading"><div><p class="eyebrow">Ein kleines Spiel für zwischendurch</p><h1>Wort-Spiel</h1><p class="subtle">Gemeinsam raten, lachen und neue Wörter entdecken.</p></div></div>
    <div class="quiz-top"><div class="category-tabs"><button class="category-tab ${wordPicture ? "active" : ""}" data-action="quiz-mode" data-mode="word-picture">Wort zu Bild</button><button class="category-tab ${!wordPicture ? "active" : ""}" data-action="quiz-mode" data-mode="picture-word">Bild zu Wort</button></div><div class="quiz-score"><span>⭐ ${state.quizScore}</span><span>🔥 Serie ${state.quizStreak}</span></div></div>
    <section class="quiz-question">${wordPicture ? prompt : prompt}</section>
    <div class="quiz-answers">${answers}</div>
    <div class="toolbar" style="justify-content:space-between"><p class="recognition-status">${quiz.answered ? (quiz.selectedId === target.id ? `Sehr schön! „${escapeHtml(target.ru)}“ heißt „${escapeHtml(target.de)}“.` : `Das richtige Wort war „${escapeHtml(target.ru)}“ – auf Deutsch: „${escapeHtml(target.de)}“. Weiterüben macht Freude.`) : "Einfach ausprobieren – Fehler sind beim Lernen ganz normal."}</p>${quiz.answered ? `<button class="button button-small" data-action="quiz-next">Nächste Runde →</button>` : ""}</div>`;
}

function renderDialogue() {
  const messages = state.chat.map(message => `<div class="chat-message ${message.type}">${escapeHtml(message.text)}${message.translation ? `<small lang="ru">${escapeHtml(message.translation.ru)}<br><span>Deutsch: ${escapeHtml(message.translation.de)}</span><br><span>${escapeHtml(message.translation.latin)}</span><button class="text-button" data-action="speak-text" data-text="${escapeHtml(message.translation.ru)}" data-language="ru-RU">Russisch anhören</button></small>` : ""}</div>`).join("");
  return `
    <div class="page-heading"><div><p class="eyebrow">Verständigung im Pflegealltag</p><h1>Dolmetscher</h1><p class="subtle">Wichtige Sätze zum Vorlesen – Deutsch und Russisch, mit Lautschrift.</p></div><span class="pill">Deutsch · Русский</span></div>
    <section class="panel">
      <div class="panel-heading"><h3>Pflege-Schnellkarten</h3><span class="small muted">Tippen zum Übersetzen & Vorlesen</span></div>
      <div class="quick-phrases">${quickPhrases.map((phrase, index) => `<button class="phrase-chip" data-action="quick-phrase" data-index="${index}">${escapeHtml(phrase.de)}</button>`).join("")}</div>
      <div class="chat-window" id="chat-window">${messages || `<div class="empty-state" style="border:0;padding:32px 10px"><div class="empty-icon">💬</div><strong>Was möchten Sie sagen?</strong>Wählen Sie eine Schnellkarte oder geben Sie einen Satz ein.</div>`}</div>
      <form class="compose-row" id="dialogue-form"><input class="field" name="phrase" aria-label="Deutschen Satz eingeben" placeholder="Einen Pflege-Satz eingeben …" maxlength="240" required><button class="button" type="submit">Übersetzen ↗</button></form>
      <p class="translation-note">Die Übersetzungen stammen aus einem kleinen, geprüften Pflege-Wortschatz auf diesem Gerät. Für nicht hinterlegte freie Sätze zeigt die App bewusst keine unbestätigte Übersetzung an.</p>
    </section>`;
}

function renderJournal() {
  const logs = residentLogs().slice().reverse();
  const dayLogs = dailyLogs(activeResident()?.id, state.dailyReportDate);
  const daySuccesses = dayLogs.filter(log => log.correct).length;
  const dayLabel = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date(`${state.dailyReportDate}T12:00:00`));
  const currentWeek = weeklyLogs();
  const previousWeek = weeklyLogs(activeResident()?.id, -1);
  const weekOffset = currentWeek.length ? 0 : previousWeek.length ? -1 : 0;
  const week = weeklyLogs(activeResident()?.id, weekOffset);
  const weeklySuccesses = week.filter(log => log.correct).length;
  const practicedDays = new Set(week.map(log => new Date(log.time).toDateString())).size;
  const weekStart = weekStartDate(weekOffset);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekLabel = `${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(weekStart)} – ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(weekEnd)}`;
  const categoriesWithLogs = categories.map(category => {
    const related = logs.filter(log => log.category === category);
    const rate = related.length ? Math.round(related.filter(log => log.correct).length / related.length * 100) : 0;
    return `<div class="chart-row"><span>${escapeHtml(category)}</span><div class="progress-track"><div class="progress-fill" style="width:${rate}%"></div></div><strong>${related.length ? `${rate}%` : "–"}</strong></div>`;
  }).join("");
  const list = logs.length ? `<div class="log-list">${logs.slice(0, 30).map(log => `<div class="log-item">${cardPhoto(log, "log-photo")}<span><strong>${escapeHtml(log.de)} <span class="muted" lang="ru">· ${escapeHtml(log.ru)}</span></strong><small>Deutsch: ${escapeHtml(log.de)} · ${escapeHtml(new Intl.DateTimeFormat("de-DE", { dateStyle: "short", timeStyle: "short" }).format(new Date(log.time)))} · ${escapeHtml(log.category)} · ${log.responseMs ? `${Math.round(log.responseMs / 1000)} Sek.` : "Reaktionszeit nicht erfasst"}</small></span><span class="result">${log.correct ? "✓ erkannt" : "Geübt"}</span></div>`).join("")}</div>` : `<div class="empty-state"><div class="empty-icon">📖</div><strong>Noch keine Übungseinträge</strong>Eine Antwort bei der Bild-Aktivierung wird hier lokal protokolliert.</div>`;
  const resident = activeResident();
  return `
    <div class="page-heading"><div><p class="eyebrow">Beobachten · Festhalten · Weitergeben</p><h1>Pflege-Tagebuch</h1><p class="subtle">Übungsverlauf und kopierfertiger Gesprächsimpuls für die SIS-Dokumentation.</p></div><span class="pill">${resident ? escapeHtml(resident.name) : "Kein Profil ausgewählt"}</span></div>
    <section class="weekly-report panel"><div><p class="eyebrow">Übersicht für die Urkunde</p><h2>${dayLogs.length ? `${dayLogs.length} ${dayLogs.length === 1 ? "Übung" : "Übungen"} am ${escapeHtml(dayLabel)}` : `Keine Übungen am ${escapeHtml(dayLabel)}`}</h2><p class="subtle small">${daySuccesses} ${daySuccesses === 1 ? "Wort erkannt" : "Wörter erkannt"} · ${new Set(dayLogs.map(log => log.cardId)).size} verschiedene Bildkarten</p></div><div class="toolbar" style="margin:0"><label class="form-field"><span class="field-label">Übungstag wählen</span><input class="field" id="daily-report-date" type="date" value="${escapeHtml(state.dailyReportDate)}"></label><button class="button button-small" data-action="daily-certificate" data-date="${escapeHtml(state.dailyReportDate)}" ${dayLogs.length ? "" : "disabled"}>Tagesurkunde ansehen / drucken</button></div></section>
    <section class="weekly-report panel"><div><p class="eyebrow">${weekOffset === -1 ? "Deine letzte Übungswoche" : "Deine Woche"} · ${escapeHtml(weekLabel)}</p><h2>${week.length ? `${week.length} Übungen geschafft` : "Deine erste Übung wartet"}</h2><p class="subtle small">${practicedDays} ${practicedDays === 1 ? "Tag" : "Tage"} geübt · ${weeklySuccesses} Wörter erkannt · ${Math.min(week.length, 5)} von 5 Wochensternen</p><div class="week-stars">${Array.from({ length: 5 }, (_, index) => `<span class="${week.length > index ? "earned" : ""}">★</span>`).join("")}</div></div><div class="toolbar" style="margin:0"><button class="button button-small" data-action="weekly-certificate" data-week-offset="${weekOffset}" ${week.length ? "" : "disabled"}>Wochenurkunde drucken</button>${currentWeek.length && previousWeek.length ? `<button class="button button-small button-outline" data-action="weekly-certificate" data-week-offset="-1">Vorwoche drucken</button>` : ""}</div></section>
    <div class="two-col" style="margin-top:0"><section class="panel"><div class="panel-heading"><h3>Kategorien im Überblick</h3><span class="small muted">${logs.length} Reaktionen</span></div><div class="chart-bars">${categoriesWithLogs}</div></section><section class="panel"><div class="panel-heading"><h3>Dokumentation vorbereiten</h3><span class="pill">SIS · Entwurf</span></div><p class="subtle small">Der Text ist ein Gesprächsentwurf und muss von einer Pflegefachkraft geprüft und an die tatsächliche Beobachtung angepasst werden.</p><button class="button button-small" data-action="copy-sis">▣ SIS-Text kopieren</button><div id="sis-preview" class="today-note" style="margin-top:14px">${escapeHtml(makeSisText())}</div></section></div>
    <div class="section-title-row"><h2>Übungshistorie</h2><span class="small muted">Nur für das aktive Profil</span></div>${list}`;
}

function makeSisText() {
  const resident = activeResident();
  if (!resident) return "Kein Bewohnerprofil ausgewählt. Bitte zuerst ein Profil hinzufügen.";
  const logs = residentLogs();
  if (!logs.length) {
    return `Themenfeld 1 – Kognition und Kommunikation: ${resident.name} wurde eine Bild- und Wortaktivierung mit deutsch-russischem Wortschatz angeboten. Reaktionen und Unterstützungsbedarf bitte nach der tatsächlichen Beobachtung ergänzen.`;
  }
  const successes = logs.filter(log => log.correct).length;
  const words = [...new Set(logs.map(log => `${log.de} (${log.ru})`))].slice(0, 8);
  const day = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date());
  return `Themenfeld 1 – Kognition und Kommunikation: Am ${day} nahm ${resident.name} an einer Bild- und Wortaktivierung mit deutsch-russischem Wortschatz teil. ${logs.length} Reaktionen wurden in der App protokolliert; ${successes} Antworten wurden als Worterkennung zugeordnet. Geübte Begriffe: ${words.join(", ")}. Die Dokumentation ist ein Entwurf und vor Übernahme fachlich zu prüfen und um die persönliche Beobachtung zu ergänzen.`;
}

function visibleCards() {
  const query = state.cardSearch.trim().toLocaleLowerCase("de-DE");
  return state.cards.filter(card => {
    const matchesCategory = state.cardFilter === "Alle" || card.category === state.cardFilter;
    const haystack = `${card.de} ${card.ru} ${card.latin} ${card.category}`.toLocaleLowerCase("de-DE");
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderCards() {
  const cards = visibleCards();
  return `
    <div class="page-heading"><div><p class="eyebrow">Wortschatz für den Alltag</p><h1>Karten-Studio</h1><p class="subtle">${state.cards.length} Bildkarten · Eigene Karten lassen sich hier ergänzen.</p></div><button class="button" data-action="add-card">＋ Karte erstellen</button></div>
    <div class="toolbar"><input id="card-search" class="search-input" type="search" placeholder="Deutsch oder Russisch suchen …" value="${escapeHtml(state.cardSearch)}" aria-label="Bildkarten suchen"></div>
    ${categoryTabs(state.cardFilter, "card-filter")}
    ${cards.length ? `<div class="category-card-grid">${cards.map(card => `<article class="small-card"><div class="small-card-art">${cardPhoto(card, "picture-photo")}</div><div class="small-card-body"><strong>${escapeHtml(card.de)}</strong><span class="ru" lang="ru">${escapeHtml(card.ru)}</span><small>Deutsch: ${escapeHtml(card.de)} · ${escapeHtml(card.category)} · ${escapeHtml(card.latin || "")}</small><div class="toolbar" style="margin:10px 0 0"><button class="button button-small button-outline" data-action="edit-card" data-id="${escapeHtml(card.id)}">Bearbeiten</button>${!starterCards.some(item => item.id === card.id) ? `<button class="button button-small button-outline" data-action="delete-card" data-id="${escapeHtml(card.id)}">Entfernen</button>` : ""}</div></div></article>`).join("")}</div>` : `<div class="empty-state"><div class="empty-icon">🔎</div><strong>Keine passenden Bildkarten</strong>Ändern Sie den Suchbegriff oder fügen Sie eine neue Karte hinzu.</div>`}`;
}

function renderResidents() {
  const residentCards = state.residents.length ? `<div class="resident-grid">${state.residents.map(resident => {
    const progress = residentProgress(resident.id);
    const week = weeklyLogs(resident.id);
    return `<article class="resident-card ${activeResident()?.id === resident.id ? "selected" : ""}"><div class="resident-card-head"><span class="avatar">${escapeHtml(resident.avatar)}</span><span><strong>${escapeHtml(resident.name)}</strong><small>Zimmer ${escapeHtml(resident.room || "–")} · ${escapeHtml(resident.unit || "Zum Bergfrieden")}</small></span>${activeResident()?.id === resident.id ? `<span class="pill" style="margin-left:auto">Aktiv</span>` : ""}</div><p class="resident-note">${escapeHtml(resident.note || "Noch keine biografischen Notizen hinterlegt.")}</p><div class="resident-learning"><strong>Level ${progress.level} · ${progress.points} Lernpunkte</strong><div class="progress-track"><div class="progress-fill" style="width:${progress.levelProgress}%"></div></div><small>${progress.logs.length} Übungen insgesamt · ${week.length} diese Woche</small></div><div class="resident-actions">${activeResident()?.id !== resident.id ? `<button class="button button-small" data-action="select-resident" data-id="${escapeHtml(resident.id)}">Profil auswählen</button>` : `<button class="button button-small button-outline" data-action="edit-resident" data-id="${escapeHtml(resident.id)}">Bearbeiten</button>`}<button class="button button-small button-outline" data-action="delete-resident" data-id="${escapeHtml(resident.id)}">Entfernen</button></div></article>`;
  }).join("")}</div>` : `<div class="empty-state"><div class="empty-icon">🌱</div><strong>Noch kein Bewohnerprofil angelegt</strong>Fügen Sie ein Profil hinzu. Angaben und Übungsprotokolle bleiben in diesem Browser.</div>`;
  return `
    <div class="page-heading"><div><p class="eyebrow">Persönlich begleiten</p><h1>Bewohnerprofile</h1><p class="subtle">Wechseln Sie zwischen Profilen. Übungsprotokolle werden dem jeweils aktiven Profil zugeordnet.</p></div><button class="button" data-action="add-resident">＋ Profil erstellen</button></div>
    <div class="privacy-banner"><span>🔒</span><span><strong>Datenschutz:</strong> Profile werden ausschließlich lokal in diesem Browser gespeichert. Vermeiden Sie besonders sensible Angaben und beachten Sie die Datenschutzregeln Ihrer Einrichtung.</span></div>
    <div class="section-title-row"><h2>Profile</h2><span class="small muted">${state.residents.length} ${state.residents.length === 1 ? "Bewohnerin" : "Bewohnende"}</span></div>${residentCards}`;
}

function renderModal(content, className = "") {
  const root = document.getElementById("modal-root");
  root.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal ${className}" role="dialog" aria-modal="true">${content}</section></div>`;
  const firstField = root.querySelector("input, textarea, button");
  if (firstField) firstField.focus();
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}

function openTutorial() {
  state.tutorialStep = 0;
  renderTutorialStep();
}

function renderTutorialStep() {
  const steps = [
    ["Bewohnerprofil auswählen", "Ein Profil ordnet Übungen, Lernpunkte und Wochenberichte richtig zu. Jedes Bewohnerprofil hat einen eigenen gespeicherten Lernverlauf."],
    ["Deutsche Bedeutung lesen", "Auf jeder Lernkarte steht die deutsche Übersetzung direkt klein beim russischen Wort. Sie müssen kein Russisch können, um die Übung anzuleiten."],
    ["Russisch anhören", "Im zweiten Schritt können Sie das russische Wort in normaler oder langsamer Aussprache anhören. Die Vorlesefunktion nutzt die Stimme Ihres Geräts."],
    ["Gemeinsam nachsprechen", "Im dritten Schritt kann die Bewohnerin oder der Bewohner das Wort sprechen. Der bewegte Balken zeigt an, wann das Mikrofon zuhört. Das Mikrofon ist optional."],
    ["Fortschritt feiern", "Übungen werden dem aktiven Profil zugeordnet. Die Tagesurkunde fasst alle Übungen eines gewählten Tages zusammen und kann im Tagebuch oder auf der Übersicht gedruckt werden. Zusätzlich gibt es eine Wochenurkunde."]
  ];
  const index = Math.max(0, Math.min(state.tutorialStep, steps.length - 1));
  const [title, description] = steps[index];
  renderModal(`
    <button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>
    <p class="eyebrow">Willkommen am Bergfrieden · Schritt ${index + 1} von ${steps.length}</p><h2>${title}</h2><p class="modal-lead">${description}</p>
    <div class="tutorial-progress" aria-label="Tutorial-Fortschritt">${steps.map((step, stepIndex) => `<span class="${stepIndex <= index ? "complete" : ""}"></span>`).join("")}</div>
    <p class="small muted">Die App ersetzt weder professionelle Dolmetschdienste noch die Pflegedokumentation.</p>
    <div class="toolbar tutorial-controls">${index > 0 ? `<button class="button button-outline" data-action="tutorial-prev">← Zurück</button>` : ""}<button class="button" data-action="${index === steps.length - 1 ? "tutorial-finish" : "tutorial-next"}">${index === steps.length - 1 ? "Fertig" : "Weiter →"}</button></div>`);
}

function markTutorialSeen() {
  try {
    localStorage.setItem("bergfrieden.tutorialSeen.v1", "true");
  } catch (error) {
    console.error("Der Tutorial-Status konnte nicht gespeichert werden.", error);
    showToast("Der Tutorial-Status konnte nicht gespeichert werden.");
  }
  closeModal();
}

function certificateMarkup({ resident, titleRu, titleDe, subtitleRu, subtitleDe, detailRu, detailDe, points, timeRu, timeDe }) {
  return `<section class="certificate-print">
    <div class="certificate-mark">ДОМ ПРЕСТАРЕЛЫХ «ZUM BERGFRIEDEN»</div><small class="certificate-translation" lang="de">Alten- &amp; Pflegeheim Zum Bergfrieden</small>
    <p class="eyebrow" lang="ru">Мост языка · Диплом</p><small class="certificate-translation" lang="de">Sprachbrücke · Lernurkunde</small>
    <h1 lang="ru">${escapeHtml(titleRu)}</h1><small class="certificate-translation" lang="de">${escapeHtml(titleDe)}</small>
    <p class="certificate-subtitle" lang="ru">${escapeHtml(subtitleRu)}</p><small class="certificate-translation" lang="de">${escapeHtml(subtitleDe)}</small>
    <p class="certificate-recipient-label" lang="ru">Для</p><small class="certificate-translation" lang="de">Für</small>
    <div class="certificate-recipient">${escapeHtml(resident?.name || "Участник / участница")}</div>
    <p class="certificate-detail" lang="ru">${escapeHtml(detailRu)}</p><small class="certificate-translation" lang="de">${escapeHtml(detailDe)}</small>
    <div class="certificate-award" lang="ru">★ Набрано баллов: ${escapeHtml(String(points))} ★</div><small class="certificate-translation" lang="de">★ Gesammelte Lernpunkte: ${escapeHtml(String(points))} ★</small>
    <p class="certificate-date" lang="ru">Дата: ${escapeHtml(timeRu)}</p><small class="certificate-translation" lang="de">Datum: ${escapeHtml(timeDe)}</small>
    <p class="certificate-footer" lang="ru">Учимся с радостью — шаг за шагом, в своем темпе.</p><small class="certificate-translation" lang="de">Mit Freude gelernt – in kleinen Schritten, im eigenen Tempo.</small>
  </section>`;
}

function showDailyCertificate(dateValue = localDateString()) {
  const resident = activeResident();
  const sessions = dailyLogs(resident?.id, dateValue);
  if (!resident || !sessions.length) {
    showToast("Für diesen Tag ist im aktiven Bewohnerprofil keine Übung gespeichert.");
    return;
  }
  const successes = sessions.filter(session => session.correct).length;
  const points = sessions.reduce((total, session) => total + 5 + (session.correct ? 5 : 0), 0);
  const date = new Date(`${dateValue}T12:00:00`);
  const dayRu = new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(date);
  const dayDe = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
  const germanWords = [...new Set(sessions.map(session => session.de))];
  const russianWords = [...new Set(sessions.map(session => session.ru))];
  renderModal(`<button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>${certificateMarkup({
    resident,
    titleRu: "Диплом за день",
    titleDe: "Tagesurkunde",
    subtitleRu: `Все упражнения за ${dayRu}`,
    subtitleDe: `Alle Übungen vom ${dayDe}`,
    detailRu: `Упражнений: ${sessions.length} · Распознано слов: ${successes} · Изученные слова: ${russianWords.join(", ")}`,
    detailDe: `Übungen: ${sessions.length} · Wörter erkannt: ${successes} · Geübte Wörter: ${germanWords.join(", ")}`,
    points,
    timeRu: dayRu,
    timeDe: dayDe
  })}<div class="toolbar certificate-actions"><button class="button" data-action="print-certificate">Tagesurkunde drucken</button><button class="button button-outline" data-action="close-modal">Schließen</button></div>`);
}

function showWeeklyCertificate(offset = 0) {
  const resident = activeResident();
  const sessions = weeklyLogs(resident?.id, offset);
  if (!resident || !sessions.length) {
    showToast("Für die Wochenurkunde muss mindestens eine Übung im aktiven Bewohnerprofil gespeichert sein.");
    return;
  }
  const successes = sessions.filter(session => session.correct).length;
  const days = new Set(sessions.map(session => new Date(session.time).toDateString())).size;
  const points = sessions.reduce((total, session) => total + 5 + (session.correct ? 5 : 0), 0);
  const rangeStart = weekStartDate(offset);
  const rangeEnd = new Date(rangeStart);
  rangeEnd.setDate(rangeEnd.getDate() + 6);
  const rangeRu = `${new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(rangeStart)} – ${new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(rangeEnd)}`;
  const rangeDe = `${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(rangeStart)} – ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(rangeEnd)}`;
  const today = new Date();
  renderModal(`<button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>${certificateMarkup({
    resident,
    titleRu: "Диплом за неделю",
    titleDe: "Wochenurkunde",
    subtitleRu: `Ваш путь к новым словам · ${rangeRu}`,
    subtitleDe: `Dein Lernweg · ${rangeDe}`,
    detailRu: `Упражнений: ${sessions.length} · Дней занятий: ${days} · Распознано слов: ${successes}`,
    detailDe: `${sessions.length} Übungen an ${days} ${days === 1 ? "Tag" : "Tagen"} · ${successes} Wörter erkannt`,
    points,
    timeRu: new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(today),
    timeDe: new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(today)
  })}<div class="toolbar certificate-actions"><button class="button" data-action="print-certificate">Wochenurkunde drucken</button><button class="button button-outline" data-action="close-modal">Schließen</button></div>`);
}

function openDoor() {
  renderModal(`
    <button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>
    <img class="door-welcome-image" src="./brand-logo.png" alt="Logo des Pflegeheims Zum Bergfrieden mit Hausillustration">
    <p class="eyebrow">Alten- & Pflegeheim</p><h2>Willkommen zum Bergfrieden</h2>
    <p class="modal-lead">Ein freundlicher Gruß und ein vertrauter Einstieg in die gemeinsame Aktivierung.</p>
    <div class="door-actions"><button class="button" data-action="door-bell">Klingel läuten</button><button class="button button-outline" data-action="door-enter">Weiter zur Übersicht</button></div>
    <div class="divider"></div><p class="small muted">Mikrofonzugriff wird erst angefragt, wenn Sie in einer Übung auf das Mikrofon tippen.</p>`, "door-modal");
}

function openResidentForm(resident) {
  const editing = Boolean(resident);
  const current = resident || { name: "", room: "", unit: "", note: "", avatar: state.selectedAvatar || "👵" };
  state.selectedAvatar = current.avatar;
  const avatars = ["👤", "👵", "🧕", "🌸", "☕", "🏡", "🐱", "🧣", "🌻", "👴", "🌿", "🕊️", "💐"];
  renderModal(`
    <button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>
    <p class="eyebrow">Bewohnerverwaltung</p><h2>${editing ? "Profil bearbeiten" : "Neues Profil"}</h2>
    <p class="modal-lead">Erfassen Sie nur Informationen, die für die Aktivierung nötig sind.</p>
    <form id="resident-form" data-edit-id="${editing ? escapeHtml(resident.id) : ""}">
      <div class="form-grid">
        <label class="form-field"><span class="field-label">Name *</span><input class="field" name="name" required maxlength="70" value="${escapeHtml(current.name)}" placeholder="Vor- und Nachname"></label>
        <label class="form-field"><span class="field-label">Zimmer</span><input class="field" name="room" maxlength="20" value="${escapeHtml(current.room)}" placeholder="z. B. 12"></label>
        <label class="form-field full"><span class="field-label">Station / Wohnbereich</span><input class="field" name="unit" maxlength="70" value="${escapeHtml(current.unit)}" placeholder="z. B. Wohnbereich 1"></label>
        <div class="form-field full"><span class="field-label">Avatar</span><div class="avatar-options">${avatars.map(avatar => `<button type="button" class="avatar-choice ${current.avatar === avatar ? "selected" : ""}" data-action="choose-avatar" data-avatar="${avatar}" aria-label="Avatar ${avatar}" aria-pressed="${current.avatar === avatar}">${avatar}</button>`).join("")}</div></div>
        <label class="form-field full"><span class="field-label">Biografische Notiz (optional)</span><textarea class="textarea" name="note" maxlength="280" placeholder="Themen, die gern im Gespräch aufgegriffen werden …">${escapeHtml(current.note)}</textarea></label>
      </div>
      <div class="divider"></div><button class="button" type="submit">${editing ? "Änderungen speichern" : "Profil erstellen"}</button>
    </form>`);
}

function openCardForm(card) {
  const editing = Boolean(card);
  const current = card || { id: "", de: "", ru: "", latin: "", category: categories[0], emoji: "", note: "", question: "", imageUrl: "" };
  renderModal(`
    <button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>
    <p class="eyebrow">Karten-Studio</p><h2>${editing ? "Bildkarte bearbeiten" : "Neue Bildkarte"}</h2><p class="modal-lead">Ein russisches Wort, die Lautschrift und eine persönliche Frage machen die Karte lebendig.</p>
    <form id="card-form" data-edit-id="${editing ? escapeHtml(card.id) : ""}">
      <div class="form-grid">
        <label class="form-field"><span class="field-label">Begriff auf Deutsch *</span><input class="field" name="de" required maxlength="70" value="${escapeHtml(current.de)}"></label>
        <label class="form-field"><span class="field-label">Russisch (кириллица) *</span><input class="field" name="ru" required maxlength="70" value="${escapeHtml(current.ru)}"></label>
        <label class="form-field"><span class="field-label">Lautschrift</span><input class="field" name="latin" maxlength="80" value="${escapeHtml(current.latin)}" placeholder="z. B. yah-blah-kuh"></label>
        <label class="form-field"><span class="field-label">Kategorie</span><select class="select" name="category">${categories.map(category => `<option ${current.category === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select></label>
        <label class="form-field full"><span class="field-label">Foto-URL oder lokales Foto *</span><input class="field" name="imageUrl" type="text" inputmode="url" maxlength="500" value="${escapeHtml(current.imageUrl)}" placeholder="https://…" required><small class="muted">Bitte ein echtes Foto verwenden. Eigene Fotos müssen über https:// erreichbar sein.</small></label>
        <label class="form-field full"><span class="field-label">Gesprächsimpuls</span><input class="field" name="question" maxlength="160" value="${escapeHtml(current.question)}" placeholder="Woran erinnert Sie dieses Bild?"></label>
        <label class="form-field full"><span class="field-label">Hinweis für die Betreuung</span><textarea class="textarea" name="note" maxlength="240">${escapeHtml(current.note)}</textarea></label>
        <label class="form-field full"><span class="field-label">Weitere erkannte Varianten (mit Komma trennen)</span><input class="field" name="synonyms" maxlength="160" value="${escapeHtml((current.synonyms || []).join(", "))}" placeholder="Synonyme in kyrillischer Schrift"></label>
      </div><div class="divider"></div><button class="button" type="submit">${editing ? "Karte speichern" : "Karte hinzufügen"}</button>
    </form>`);
}

function navigate(screen) {
  if (!["home", "pictures", "game", "dialogue", "journal", "cards", "residents"].includes(screen)) return;
  state.screen = screen;
  if (screen === "game") newQuizQuestion();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function logPractice(card, correct, responseMs) {
  const resident = activeResident();
  if (!resident) {
    showToast("Bitte zuerst ein Bewohnerprofil auswählen, damit die Übung zugeordnet werden kann.");
    return null;
  }
  const session = {
    id: makeId(),
    residentId: resident.id,
    cardId: card.id,
    de: card.de,
    ru: card.ru,
    category: card.category,
    emoji: card.emoji,
    imageUrl: card.imageUrl || cardImagePaths[card.id] || "",
    correct,
    responseMs: Math.max(0, responseMs || 0),
    time: new Date().toISOString()
  };
  state.sessions.push(session);
  persist(STORAGE_KEYS.sessions, state.sessions);
  return session;
}

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function isIosSafari() {
  const agent = window.navigator.userAgent;
  const isAppleMobile = /iPad|iPhone|iPod/.test(agent) || (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  return isAppleMobile && !window.navigator.userAgent.includes("CriOS") && !window.navigator.userAgent.includes("FxiOS") && !window.navigator.userAgent.includes("EdgiOS");
}

function showInstallHelp() {
  if (isIosSafari()) {
    renderModal(`
      <button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>
      <p class="eyebrow">Auf dem iPhone installieren</p><h2>Zum Home-Bildschirm hinzufügen</h2>
      <p class="modal-lead">Safari öffnen und die Sprachbrücke wie eine App direkt auf dem iPhone starten:</p>
      <div class="tutorial-steps">
        <div class="tutorial-step"><span class="step-number">1</span><span><strong>Seite in Safari öffnen</strong><p>Die Installationsfunktion gibt es nur in Safari – nicht in der eingebetteten Vorschau oder im Dateibetrachter.</p></span></div>
        <div class="tutorial-step"><span class="step-number">2</span><span><strong>Teilen antippen</strong><p>Das Teilen-Symbol (Quadrat mit Pfeil nach oben) in der Safari-Werkzeugleiste antippen.</p></span></div>
        <div class="tutorial-step"><span class="step-number">3</span><span><strong>„Zum Home-Bildschirm“ wählen</strong><p>Falls nötig in der Liste nach unten scrollen. Anschließend „Hinzufügen“ antippen.</p></span></div>
      </div>
      <div class="divider"></div><p class="small muted">Für Installation, Mikrofon und Offline-Nutzung muss die Seite über eine sichere HTTPS-Adresse geöffnet werden.</p>`);
    return;
  }
  renderModal(`
    <button class="modal-close" data-action="close-modal" aria-label="Schließen">×</button>
    <p class="eyebrow">Sprachbrücke installieren</p><h2>Wie eine App starten</h2>
    <p class="modal-lead">Öffnen Sie die Seite über HTTPS. Wählen Sie dann im Browser „Installieren“ oder „App installieren“. Die Bezeichnung und Verfügbarkeit hängen vom verwendeten Browser ab.</p>
    <div class="privacy-banner"><span>🔒</span><span>Nach der ersten Installation bleiben App-Oberfläche und Bildkarten auch ohne Internet verfügbar.</span></div>`);
}

async function installApp() {
  if (!state.installPrompt) {
    showInstallHelp();
    return;
  }
  state.installPrompt.prompt();
  const result = await state.installPrompt.userChoice;
  state.installPrompt = null;
  if (result.outcome === "accepted") showToast("Installation gestartet. Die App finden Sie anschließend auf Ihrem Gerät.");
  renderHeader();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    if (window.isSecureContext) console.info("Offline-Speicherung wird von diesem Browser nicht unterstützt.");
    return;
  }
  if (!window.isSecureContext) {
    console.info("Offline-Installieren benötigt HTTPS oder localhost.");
    return;
  }
  const serviceWorkerUrl = new URL("./service-worker.js", document.baseURI);
  const scopeUrl = new URL("./", document.baseURI);
  navigator.serviceWorker.register(serviceWorkerUrl, { scope: scopeUrl.pathname })
    .then(() => showToast("Offline-Nutzung ist eingerichtet."))
    .catch(error => {
      console.error("Die Offline-Funktion konnte nicht eingerichtet werden.", error);
      showToast("Offline-Betrieb konnte nicht eingerichtet werden. Bitte prüfen Sie den Webserver.");
    });
}

function speak(text, language = "ru-RU", rate = 0.9, onEnd) {
  if (!state.sound) {
    showToast("Audio ist stummgeschaltet. Schalten Sie den Ton oben wieder ein.");
    return false;
  }
  const nativeSpeak = window.webkit?.messageHandlers?.bergfriedenSpeak;
  if (nativeSpeak) {
    state.nativeSpeakCallback = onEnd || null;
    nativeSpeak.postMessage({ text, language, rate });
    return true;
  }
  if (!("speechSynthesis" in window)) {
    showToast("Sprachausgabe wird von diesem Browser nicht unterstützt.");
    return false;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = rate;
  utterance.onerror = event => {
    if (event.error !== "canceled" && event.error !== "interrupted") showToast("Die Sprachausgabe konnte nicht gestartet werden.");
  };
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
  return true;
}

function playBell() {
  if (!state.sound) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    showToast("Tonausgabe wird von diesem Browser nicht unterstützt.");
    return;
  }
  try {
    const context = new AudioContextClass();
    [880, 1174.66, 1567.98].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.13);
      gain.gain.exponentialRampToValueAtTime(0.13, context.currentTime + index * 0.13 + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.13 + 0.65);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(context.currentTime + index * 0.13);
      oscillator.stop(context.currentTime + index * 0.13 + 0.68);
    });
    window.setTimeout(() => context.close(), 1200);
  } catch (error) {
    console.error("Der Glockenton konnte nicht abgespielt werden.", error);
    showToast("Der Glockenton konnte nicht abgespielt werden.");
  }
}

function playApplause() {
  if (!state.sound) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    showToast("Tonausgabe wird von diesem Browser nicht unterstützt.");
    return;
  }
  try {
    const context = new AudioContextClass();
    const duration = 0.075;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let index = 0; index < samples.length; index++) {
      const fade = 1 - index / samples.length;
      samples[index] = (Math.random() * 2 - 1) * fade;
    }
    for (let index = 0; index < 15; index++) {
      const start = context.currentTime + index * 0.095 + Math.random() * 0.035;
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      source.buffer = buffer;
      filter.type = "bandpass";
      filter.frequency.value = 900 + Math.random() * 1400;
      filter.Q.value = 0.8;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start(start);
    }
    window.setTimeout(() => context.close(), 1900);
  } catch (error) {
    console.error("Der Applaus konnte nicht abgespielt werden.", error);
    showToast("Der Applaus konnte nicht abgespielt werden.");
  }
}

function beginRecognition() {
  if (!activeResident()) {
    showToast("Bitte zuerst ein Bewohnerprofil auswählen.");
    return;
  }
  const button = document.getElementById("mic-button");
  const status = document.getElementById("recognition-status");
  if (!button || !status) return;
  const nativeSpeech = window.webkit?.messageHandlers?.bergfriedenSpeech;
  if (nativeSpeech) {
    state.recognitionStartedAt = Date.now();
    button.classList.add("listening");
    document.getElementById("voice-meter")?.classList.add("active");
    button.innerHTML = "<span>🔴</span> Ich höre zu …";
    status.textContent = "Sprechen Sie jetzt ein Wort auf Russisch. Die Erkennung erfolgt nach Möglichkeit direkt auf diesem iPhone.";
    nativeSpeech.postMessage({ locale: "ru-RU" });
    return;
  }
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    showToast("Diese Spracherkennung ist in diesem Browser nicht verfügbar. Nutzen Sie Chrome oder Edge und tippen Sie auf ein gesprochenes Wort in der Unterhaltung.");
    return;
  }
  const recognition = new Recognition();
  recognition.lang = "ru-RU";
  recognition.continuous = false;
  recognition.interimResults = true;
  state.recognition = recognition;
  state.recognitionStartedAt = Date.now();
  button.classList.add("listening");
  document.getElementById("voice-meter")?.classList.add("active");
  button.innerHTML = "<span>🔴</span> Ich höre zu …";
  status.textContent = "Sprechen Sie jetzt ein Wort auf Russisch. Die Erkennung läuft nur während dieser Übung.";
  let resultHandled = false;
  recognition.onresult = event => {
    if (resultHandled || !button.isConnected) return;
    const results = Array.from(event.results).filter(result => result.isFinal);
    if (!results.length) return;
    const transcript = results.map(result => result[0].transcript).join(" ").trim().toLocaleLowerCase("ru-RU");
    if (!transcript) return;
    resultHandled = true;
    showRecognitionResult(transcript);
  };
  recognition.onerror = event => {
    button.classList.remove("listening");
    document.getElementById("voice-meter")?.classList.remove("active");
    button.innerHTML = "<span>🎙️</span> Antwort sprechen";
    status.textContent = event.error === "not-allowed"
      ? "Mikrofonzugriff wurde verweigert. Erlauben Sie den Zugriff in den Browser-Einstellungen."
      : event.error === "no-speech"
        ? "Es wurde nichts erkannt. Sie können es noch einmal versuchen."
        : `Spracherkennung fehlgeschlagen (${event.error}).`;
    if (event.error !== "no-speech" && event.error !== "aborted") showToast(status.textContent);
  };
  recognition.onend = () => {
    document.getElementById("voice-meter")?.classList.remove("active");
    if (!button.isConnected || !button.classList.contains("listening")) return;
    button.classList.remove("listening");
    button.innerHTML = "<span>🎙️</span> Antwort sprechen";
    if (!resultHandled) status.textContent = "Die Aufnahme wurde beendet. Sie können es noch einmal versuchen.";
  };
  try {
    recognition.start();
  } catch (error) {
    console.error("Die Spracherkennung konnte nicht gestartet werden.", error);
    button.classList.remove("listening");
    document.getElementById("voice-meter")?.classList.remove("active");
    button.innerHTML = "<span>🎙️</span> Antwort sprechen";
    status.textContent = "Mikrofon konnte nicht gestartet werden. Prüfen Sie die Berechtigung und versuchen Sie es erneut.";
  }
}

function showRecognitionResult(transcript) {
  const card = getCurrentCard();
  const button = document.getElementById("mic-button");
  const status = document.getElementById("recognition-status");
  if (!card || !button || !status || state.screen !== "pictures") return;
  const normalized = transcript.trim().toLocaleLowerCase("ru-RU");
  if (!normalized) return;
  const candidates = [card.ru, ...(card.synonyms || [])].map(value => value.toLocaleLowerCase("ru-RU"));
  const cleanTranscript = normalized.replace(/[.,!?…:;«»"'()[\]{}]/g, " ").replace(/\s+/g, " ").trim();
  const matched = candidates.some(candidate => {
    const cleanCandidate = candidate.replace(/[.,!?…:;«»"'()[\]{}]/g, " ").replace(/\s+/g, " ").trim();
    return cleanTranscript === cleanCandidate || cleanTranscript.startsWith(`${cleanCandidate} `)
      || cleanTranscript.endsWith(` ${cleanCandidate}`) || cleanTranscript.includes(` ${cleanCandidate} `);
  });
  const session = logPractice(card, matched, Date.now() - state.recognitionStartedAt);
  if (!session) return;
  const feedback = matched
    ? `Richtig erkannt! „${card.ru}“ heißt auf Deutsch „${card.de}“.`
    : `Noch nicht richtig erkannt. Das russische Wort ist „${card.ru}“ und bedeutet „${card.de}“.`;
  state.learningStep = matched ? 3 : 2;
  render();
  const updatedStatus = document.getElementById("recognition-status");
  if (updatedStatus) updatedStatus.textContent = feedback;
  const retryButton = document.getElementById("mic-button");
  if (retryButton && !matched) retryButton.innerHTML = "<span>🎙️</span> Noch einmal sprechen";
  if (state.sound) speak(feedback, "de-DE", 0.9);
  if (matched) { playApplause(); vibrate(); }
  if (matched) {
    window.setTimeout(() => {
      if (state.screen !== "pictures" || getCurrentCard()?.id !== card.id) return;
      const cards = currentCards();
      if (!cards.length) return;
      state.cardIndex = (state.cardIndex + 1) % cards.length;
      state.learningStep = 0;
      render();
      const nextCard = getCurrentCard();
      const nextStatus = document.getElementById("recognition-status");
      if (nextStatus && nextCard) nextStatus.textContent = `Richtig erkannt! Als Nächstes: „${nextCard.de}“.`;
    }, 1400);
  }
}

window.addEventListener("bergfrieden-speech-result", event => {
  showRecognitionResult(event.detail?.transcript || "");
});

window.addEventListener("bergfrieden-speech-error", event => {
  const button = document.getElementById("mic-button");
  const status = document.getElementById("recognition-status");
  if (button) {
    button.classList.remove("listening");
    button.innerHTML = "<span>🎙️</span> Antwort sprechen";
  }
  document.getElementById("voice-meter")?.classList.remove("active");
  if (status) status.textContent = event.detail?.message || "Die Spracherkennung konnte nicht gestartet werden.";
  showToast(status?.textContent || "Die Spracherkennung konnte nicht gestartet werden.");
});

window.addEventListener("bergfrieden-speech-end", () => {
  const callback = state.nativeSpeakCallback;
  state.nativeSpeakCallback = null;
  if (callback) callback();
});

function vibrate() {
  if (typeof navigator.vibrate === "function") navigator.vibrate(35);
}

function submitPhrase(de) {
  const phrase = quickPhrases.find(item => item.de.toLocaleLowerCase("de-DE") === de.trim().toLocaleLowerCase("de-DE"));
  if (!phrase) return false;
  state.chat.push({ type: "staff", text: de }, { type: "russian", text: phrase.ru, translation: phrase });
  render();
  const chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;
  speak(phrase.ru, "ru-RU", 0.88);
  return true;
}

function findPhrase(text) {
  const normalized = text.toLocaleLowerCase("de-DE");
  const direct = quickPhrases.find(item => item.de.toLocaleLowerCase("de-DE") === normalized);
  if (direct) return direct;
  const matches = [
    { terms: ["trink", "durst", "wasser", "getränk"], phrase: 0 },
    { terms: ["schmerz", "weh", "weh tun"], phrase: 1 },
    { terms: ["kalt", "frieren"], phrase: 2 },
    { terms: ["toilette", "wc", "urin", "bad"], phrase: 3 },
    { terms: ["alles gut", "bin da", "keine angst"], phrase: 4 }
  ];
  const found = matches.find(entry => entry.terms.some(term => normalized.includes(term)));
  return found ? quickPhrases[found.phrase] : null;
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (button.classList.contains("modal-backdrop") && event.target !== button) return;
  switch (action) {
    case "navigate": navigate(button.dataset.screen); break;
    case "install-app": installApp(); break;
    case "toggle-sound":
      state.sound = !state.sound;
      if (!state.sound && "speechSynthesis" in window) window.speechSynthesis.cancel();
      if (!state.sound) {
        state.nativeSpeakCallback = null;
        window.webkit?.messageHandlers?.bergfriedenSpeak?.postMessage({ text: "", language: "ru-RU", rate: 0 });
      }
      persist(STORAGE_KEYS.sound, state.sound);
      renderHeader();
      showToast(state.sound ? "Audioeffekte eingeschaltet." : "Audioeffekte stummgeschaltet.");
      break;
    case "door": openDoor(); break;
    case "door-bell":
      playBell();
      closeModal();
      navigate("home");
      showToast("Willkommen am Bergfrieden! Die Übersicht ist geöffnet.");
      break;
    case "door-enter": closeModal(); navigate("home"); break;
    case "tutorial": openTutorial(); break;
    case "tutorial-next": state.tutorialStep += 1; renderTutorialStep(); break;
    case "tutorial-prev": state.tutorialStep = Math.max(0, state.tutorialStep - 1); renderTutorialStep(); break;
    case "tutorial-finish": markTutorialSeen(); break;
    case "weekly-certificate": showWeeklyCertificate(Number(button.dataset.weekOffset || 0)); break;
    case "daily-certificate": showDailyCertificate(button.dataset.date || localDateString()); break;
    case "print-certificate": window.print(); break;
    case "close-modal": closeModal(); break;
    case "category":
      state.category = button.dataset.category;
      state.cardIndex = 0;
      state.learningStep = 0;
      render();
      break;
    case "card-filter":
      state.cardFilter = button.dataset.category;
      render();
      break;
    case "card-prev": state.cardIndex = (state.cardIndex - 1 + currentCards().length) % currentCards().length; state.learningStep = 0; render(); break;
    case "card-next": state.cardIndex = (state.cardIndex + 1) % currentCards().length; state.learningStep = 0; render(); break;
    case "lesson-next": state.learningStep = Math.min(3, state.learningStep + 1); render(); break;
    case "lesson-prev": state.learningStep = Math.max(0, state.learningStep - 1); render(); break;
    case "complete-practice": {
      const session = logPractice(getCurrentCard(), false, 0);
      if (session) {
        state.learningStep = 3;
        render();
        const status = document.getElementById("recognition-status");
        if (status) status.textContent = "Als geübt gespeichert. Die Tagesübersicht enthält alle Übungen dieses Tages.";
      }
      break;
    }
    case "card-random":
      if (currentCards().length > 1) {
        const prior = state.cardIndex;
        while (prior === state.cardIndex) state.cardIndex = Math.floor(Math.random() * currentCards().length);
      }
      state.learningStep = 0;
      render();
      break;
    case "speak-card": {
      const card = getCurrentCard();
      if (!card) break;
      const speed = button.dataset.speed;
      if (speed === "repeat") {
        const status = document.getElementById("recognition-status");
        const started = speak(card.ru, "ru-RU", 0.67, () => {
          if (state.screen === "pictures") window.setTimeout(beginRecognition, 450);
        });
        if (started) {
          status.textContent = "Hören Sie das Wort. Danach öffnet sich das Mikrofon für Ihre Antwort.";
        }
      } else speak(card.ru, "ru-RU", speed === "slow" ? 0.62 : 0.9);
      break;
    }
    case "recognize": beginRecognition(); break;
    case "bell": playBell(); break;
    case "quiz-mode":
      state.quizMode = button.dataset.mode;
      newQuizQuestion();
      render();
      break;
    case "answer": {
      if (!state.quiz || state.quiz.answered) break;
      const selectedId = button.dataset.id;
      const correct = selectedId === state.quiz.target.id;
      state.quiz.answered = true;
      state.quiz.selectedId = selectedId;
      if (correct) {
        state.quizScore += 10;
        state.quizStreak += 1;
        if (state.sound) playApplause();
        vibrate();
      } else state.quizStreak = 0;
      const session = logPractice(state.quiz.target, correct, 0);
      render();
      const feedback = correct
        ? `Richtig! „${state.quiz.target.ru}“ heißt „${state.quiz.target.de}“.`
        : `Nicht richtig. Das richtige Wort ist „${state.quiz.target.ru}“ – „${state.quiz.target.de}“.`;
      const status = document.querySelector(".quiz-question")?.parentElement?.querySelector(".recognition-status");
      if (status) status.textContent = feedback;
      if (session && state.sound) speak(feedback, "de-DE", 0.9);
      break;
    }
    case "quiz-next": newQuizQuestion(); render(); break;
    case "quick-phrase": submitPhrase(quickPhrases[Number(button.dataset.index)].de); break;
    case "speak-text": speak(button.dataset.text, button.dataset.language || "ru-RU"); break;
    case "copy-sis": copyText(makeSisText()); break;
    case "add-resident": openResidentForm(); break;
    case "edit-resident": openResidentForm(getResident(button.dataset.id)); break;
    case "choose-avatar":
      state.selectedAvatar = button.dataset.avatar;
      document.querySelectorAll(".avatar-choice").forEach(option => {
        const selected = option.dataset.avatar === state.selectedAvatar;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      break;
    case "select-resident":
      state.residents = [getResident(button.dataset.id), ...state.residents.filter(resident => resident.id !== button.dataset.id)];
      persist(STORAGE_KEYS.residents, state.residents);
      navigate("home");
      showToast(`Profil von ${state.residents[0].name} ist jetzt aktiv.`);
      break;
    case "delete-resident": deleteResident(button.dataset.id); break;
    case "add-card": openCardForm(); break;
    case "edit-card": openCardForm(state.cards.find(card => card.id === button.dataset.id)); break;
    case "delete-card": deleteCard(button.dataset.id); break;
    case "backdrop-close": if (event.target === button) closeModal(); break;
    default: break;
  }
}

function deleteResident(id) {
  const resident = getResident(id);
  if (!resident) return;
  if (!window.confirm(`Profil von ${resident.name} entfernen? Übungseinträge bleiben lokal erhalten.`)) return;
  state.residents = state.residents.filter(item => item.id !== id);
  persist(STORAGE_KEYS.residents, state.residents);
  render();
  showToast("Bewohnerprofil entfernt. Vorhandene Übungseinträge wurden beibehalten.");
}

function deleteCard(id) {
  const card = state.cards.find(item => item.id === id);
  if (!card) return;
  if (!window.confirm(`Bildkarte „${card.de}“ entfernen?`)) return;
  state.cards = state.cards.filter(item => item.id !== id);
  persist(STORAGE_KEYS.cards, state.cards);
  if (state.cardIndex >= currentCards().length) state.cardIndex = Math.max(0, currentCards().length - 1);
  render();
  showToast(`Bildkarte „${card.de}“ wurde entfernt.`);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(
      () => showToast("SIS-Entwurf in die Zwischenablage kopiert."),
      error => {
        console.error("Kopieren in die Zwischenablage fehlgeschlagen.", error);
        showToast("Kopieren fehlgeschlagen. Markieren Sie den Text und kopieren Sie ihn manuell.");
      }
    );
    return;
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  showToast(copied ? "SIS-Entwurf in die Zwischenablage kopiert." : "Kopieren nicht verfügbar. Markieren Sie den Text und kopieren Sie ihn manuell.");
}

document.addEventListener("click", handleClick);

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  state.installPrompt = event;
  renderHeader();
});

window.addEventListener("appinstalled", () => {
  state.installPrompt = null;
  renderHeader();
  showToast("Die Sprachbrücke wurde auf diesem Gerät installiert.");
});

document.addEventListener("submit", event => {
  if (event.target.id === "resident-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = String(form.get("name") || "").trim();
    if (!name) {
      showToast("Bitte geben Sie einen Namen ein.");
      return;
    }
    const editId = event.target.dataset.editId;
    const existing = editId ? getResident(editId) : null;
    const resident = {
      id: editId || makeId(),
      name,
      room: String(form.get("room") || "").trim(),
      unit: String(form.get("unit") || "").trim(),
      note: String(form.get("note") || "").trim(),
      avatar: state.selectedAvatar,
      color: existing?.color || "sage"
    };
    state.residents = existing
      ? state.residents.map(item => item.id === editId ? resident : item)
      : [resident, ...state.residents];
    persist(STORAGE_KEYS.residents, state.residents);
    closeModal();
    render();
    showToast(existing ? "Bewohnerprofil aktualisiert." : "Bewohnerprofil erstellt und aktiviert.");
  }
  if (event.target.id === "card-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    const de = String(form.get("de") || "").trim();
    const ru = String(form.get("ru") || "").trim();
    if (!de || !ru) {
      showToast("Bitte füllen Sie den deutschen und russischen Begriff aus.");
      return;
    }
    const url = String(form.get("imageUrl") || "").trim();
    if (!url || (!/^https:\/\//i.test(url) && !Object.values(cardImagePaths).includes(url))) {
      showToast("Bitte verwenden Sie eine sichere https://-Foto-URL oder ein lokales App-Foto.");
      return;
    }
    const editId = event.target.dataset.editId;
    const existing = editId ? state.cards.find(card => card.id === editId) : null;
    const card = {
      id: editId || makeId(),
      de,
      ru,
      latin: String(form.get("latin") || "").trim(),
      category: String(form.get("category") || categories[0]),
      emoji: "",
      imageUrl: url,
      note: String(form.get("note") || "").trim(),
      question: String(form.get("question") || "").trim(),
      synonyms: String(form.get("synonyms") || "").split(",").map(value => value.trim()).filter(Boolean)
    };
    state.cards = existing ? state.cards.map(item => item.id === editId ? card : item) : [...state.cards, card];
    persist(STORAGE_KEYS.cards, state.cards);
    closeModal();
    render();
    showToast(existing ? "Bildkarte aktualisiert." : "Neue Bildkarte hinzugefügt.");
  }
  if (event.target.id === "dialogue-form") {
    event.preventDefault();
    const form = new FormData(event.target);
    const text = String(form.get("phrase") || "").trim();
    if (!text) return;
    const translation = findPhrase(text);
    if (translation) {
      state.chat.push({ type: "staff", text }, { type: "russian", text: translation.ru, translation });
      render();
      const chatWindow = document.getElementById("chat-window");
      chatWindow.scrollTop = chatWindow.scrollHeight;
      speak(translation.ru, "ru-RU", 0.88);
    } else {
      state.chat.push({ type: "staff", text });
      render();
      const chatWindow = document.getElementById("chat-window");
      chatWindow.scrollTop = chatWindow.scrollHeight;
      showToast("Für diesen Satz ist keine geprüfte Übersetzung hinterlegt. Bitte wählen Sie eine Schnellkarte.");
    }
  }
});

document.addEventListener("input", event => {
  if (event.target.id === "card-search") {
    const position = event.target.selectionStart;
    state.cardSearch = event.target.value;
    const root = document.getElementById("screen");
    const cursor = position;
    root.innerHTML = renderCards();
    const replacement = document.getElementById("card-search");
    replacement.focus();
    replacement.setSelectionRange(cursor, cursor);
  }
});

document.addEventListener("change", event => {
  if (event.target.id === "daily-report-date") {
    state.dailyReportDate = event.target.value || localDateString();
    render();
  }
});

document.addEventListener("error", event => {
  if (event.target instanceof HTMLImageElement && ["picture-photo", "answer-photo", "quiz-photo", "log-photo"].some(className => event.target.classList.contains(className))) {
    const placeholder = document.createElement("div");
    placeholder.className = `${event.target.className} photo-missing`;
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", `Foto konnte nicht geladen werden: ${event.target.alt}`);
    placeholder.textContent = "Foto konnte nicht geladen werden";
    event.target.replaceWith(placeholder);
    showToast("Ein Foto konnte nicht geladen werden. Bitte prüfen Sie die Bilddatei oder Foto-URL.");
  }
}, true);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

render();
registerServiceWorker();
try {
  window.setTimeout(openDoor, 0);
} catch (error) {
  console.error("Das Willkommensfenster konnte nicht beim App-Start geöffnet werden.", error);
  showToast("Das Willkommensfenster konnte nicht automatisch geöffnet werden. Nutzen Sie „Tor öffnen“.");
}
