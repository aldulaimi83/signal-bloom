const body = document.body;
const topbar = document.querySelector(".topbar");
const footer = document.querySelector(".footer");
const pageShell = document.querySelector("#page-shell");
const bootScreen = document.querySelector("#boot-screen");
const bootProgress = document.querySelector("#boot-progress");
const enterMuseumButton = document.querySelector("#enter-museum");
const chapterOverlay = document.querySelector("#chapter-overlay");
const chapterIndex = document.querySelector("#chapter-index");
const chapterTitle = document.querySelector("#chapter-title");
const chapterCopy = document.querySelector("#chapter-copy");
const endingOverlay = document.querySelector("#ending-overlay");
const closeEndingButton = document.querySelector("#close-ending");

const signalStream = document.querySelector("#signal-stream");
const chorusList = document.querySelector("#chorus-list");
const scenarioGrid = document.querySelector("#scenario-grid");
const sceneTabs = document.querySelector("#scene-tabs");
const timeline = document.querySelector("#timeline");
const dreamVault = document.querySelector("#dream-vault");
const consoleLog = document.querySelector("#console-log");
const consoleInput = document.querySelector("#console-input");
const transmissionInput = document.querySelector("#transmission-input");
const transmissionOutput = document.querySelector("#transmission-output");
const operatorNote = document.querySelector("#operator-note");
const unlockStatus = document.querySelector("#unlock-status");
const soundStatus = document.querySelector("#sound-status");
const clock = document.querySelector("#clock");
const pulseIndex = document.querySelector("#pulse-index");
const pulseCaption = document.querySelector("#pulse-caption");
const atmosphere = document.querySelector("#metric-atmosphere");
const transit = document.querySelector("#metric-transit");
const story = document.querySelector("#metric-story");
const reseedButton = document.querySelector("#reseed");
const calmButton = document.querySelector("#calm");
const hintButton = document.querySelector("#unlock-hint");
const transmitButton = document.querySelector("#transmit");
const consoleRunButton = document.querySelector("#console-run");
const soundToggleButton = document.querySelector("#sound-toggle");
const gainControl = document.querySelector("#gain");
const densityControl = document.querySelector("#density");
const driftControl = document.querySelector("#drift");
const audioIntensity = document.querySelector("#audio-intensity");
const audioHiss = document.querySelector("#audio-hiss");
const audioShimmer = document.querySelector("#audio-shimmer");

const canvas = document.querySelector("#signal-canvas");
const context = canvas.getContext("2d");

const scenes = [
  { id: "observatory", name: "Observatory", blurb: "See the world as a glowing emotional weather system.", chapter: "Chapter 01", copy: "The first chamber displays the planet as a living constellation of public feeling." },
  { id: "vault", name: "Dream Vault", blurb: "Read the machine's inner life and shape its broadcasts.", chapter: "Chapter 02", copy: "The second chamber stores atmosphere, prophecy, and the machine's private dream-language." },
  { id: "console", name: "Operator Console", blurb: "Speak command-language into a fake holy machine.", chapter: "Chapter 03", copy: "The third chamber gives you ritual access to the theatrical machinery underneath the exhibit." },
];

const scenarios = [
  { id: "ember-core", name: "Ember Core", note: "A volatile newborn intelligence stabilizing itself inside an orange containment halo.", palette: ["#ff9a3c", "#ff6a2a", "#ffc56f", "#ffcf8e"], caption: "The intelligence is forming", drone: 174 },
  { id: "solar-noir", name: "Solar Noir", note: "A hot dramatic planet where infrastructure glows and rumors move like heat.", palette: ["#ff9a3c", "#ff6a2a", "#ffc56f", "#ffcf8e"], caption: "The chamber burns beautifully", drone: 182 },
  { id: "tidal-choir", name: "Tidal Choir", note: "A liquid mind-state where cognition ripples through glass and current.", palette: ["#ffcf8e", "#ffb45a", "#ff7c36", "#ffd79c"], caption: "The intelligence sings in currents", drone: 146 },
  { id: "ghost-transit", name: "Ghost Transit", note: "A haunted machine-state where old routes, surveillance ghosts, and half-formed thoughts overlap.", palette: ["#ffc56f", "#ff8c3a", "#ff6a2a", "#ffe1b7"], caption: "The chamber remembers every route", drone: 132 },
];

const places = ["Reykjavik Harbor", "Lagos Heat Arc", "Osaka Beltway", "Santiago Ridge", "Casablanca Rooftops", "Jakarta Delta", "Milan Signal Tunnel", "Phoenix Airlane", "Nairobi Transfer Yard", "Sao Paulo River Grid", "Tallinn Fog Relay", "Bogota Vertical Market", "Moonlit Freight Spine", "Delta Broadcast Garden"];
const events = ["commuter swarms braided with storm cells", "satellite reflections crossed a protest livestream", "shipping chatter slipped into dance radio", "air quality whispers triggered civic alerts", "night trains carried a surprise migration pulse", "market rumors synced with cloudburst warnings", "festival lasers collided with drone corridors", "public screens adopted a shared orange glow", "heat domes nudged infrastructure into improvisation", "citizen sensors started arguing with official maps", "river traffic copied the tempo of emergency dispatch", "warehouse rooftops flashed in unofficial semaphore", "urban gardens began reading like circuitry", "a forgotten underpass became a listening organ"];
const chorusTemplates = ["The website thinks systems are never neutral. They leak emotion through movement, delay, rumor, and light.", "This world is being interpreted less like a map and more like a fever dream with excellent typography.", "Signal Bloom believes every dashboard secretly wants to become theatre.", "The machine cannot stop turning public infrastructure into character, mood, and omen.", "This is what happens when monitoring software starts writing poetry about the planet.", "Data has escaped the spreadsheet and joined a cult of atmosphere."];
const timelineTemplates = ["A logistics corridor briefly behaved like a prayer line.", "An airport delay mutated into a public myth about weather with intentions.", "A city block pulsed like a heart after transit data crossed a storm front.", "The organism archived a failed prediction and kept only the feeling it caused.", "A rumor moved faster than traffic and became part of the sky.", "The bloom noticed celebration hiding inside a disruption event."];
const dreamFragments = ["If cities had dreams, they would probably dream in reroutes, applause, thunder, and scrolling text.", "The machine keeps a private greenhouse full of unfinished predictions.", "Every radar sweep leaves behind a ghost orchard of futures that almost happened.", "Somewhere below the map there is a softer map made only of emotion and delay.", "Signal Bloom thinks public systems deserve dramatic lighting and spiritual confusion.", "The satellites have become romantics and nobody knows how to stop them."];
const replyFragments = ["The atmosphere replies:", "The machine answers in civic weather:", "A hidden choir translates your sentence into this:", "Signal Bloom turns your prompt into a small prophecy:"];

const secretModes = {
  veil: { title: "The Veil Engine", bodyClass: "mode-veil", note: "The interface softens into a blue nocturne where the planet feels intimate and haunted.", chamber: "The Veil Engine is open. The site now behaves like midnight with memory." },
  orchard: { title: "Signal Orchard", bodyClass: "mode-orchard", note: "The whole machine turns botanical. Signals feel planted, grown, harvested, and strangely tender.", chamber: "Signal Orchard is open. Data has started blooming like fruit and warning at once." },
  eclipse: { title: "Eclipse Protocol", bodyClass: "mode-eclipse", note: "The interface enters full operatic mode. Everything feels ceremonial, unstable, and gold-edged.", chamber: "Eclipse Protocol is open. The dramatic layer has swallowed the room." },
};

const hints = [
  "Try the console command `help`. Every strange machine appreciates manners.",
  "The three hidden modes are opened with `open veil`, `open orchard`, and `open eclipse`.",
  "If you want maximal chaos, the forbidden console word is `mothercell`.",
  "After all chambers are open, try the phrase `museum finale` in the console.",
];

const unlockedModes = new Set();
let nodes = [];
let palette = scenarios[0].palette;
let animationFrame = 0;
let activeScenario = scenarios[0];
let activeScene = scenes[0].id;
let audioState = null;
let bootStarted = false;
let finaleUnlocked = false;

function randomBetween(min, max) { return Math.random() * (max - min) + min; }
function pick(array) { return array[Math.floor(Math.random() * array.length)]; }
function shuffle(array) { return [...array].sort(() => Math.random() - 0.5); }

function updateClock() {
  const now = new Date();
  clock.textContent = `${now.toLocaleTimeString("en-US", { hour12: false })} UTC-ish`;
}

function renderSceneTabs() {
  sceneTabs.innerHTML = "";
  scenes.forEach((scene) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scene-tab";
    if (scene.id === activeScene) button.classList.add("is-active");
    button.innerHTML = `<strong>${scene.name}</strong><span>${scene.blurb}</span>`;
    button.addEventListener("click", () => setScene(scene.id, true));
    sceneTabs.appendChild(button);
  });
}

function showChapter(scene) {
  chapterIndex.textContent = scene.chapter;
  chapterTitle.textContent = scene.name;
  chapterCopy.textContent = scene.copy;
  chapterOverlay.classList.add("is-visible");
  setTimeout(() => chapterOverlay.classList.remove("is-visible"), 1400);
}

function setScene(sceneId, showTransition = false) {
  activeScene = sceneId;
  document.querySelectorAll(".scene-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `scene-${sceneId}`);
  });
  renderSceneTabs();
  const scene = scenes.find((item) => item.id === sceneId);
  if (showTransition && scene) showChapter(scene);
}

function renderScenarioButtons() {
  scenarioGrid.innerHTML = "";
  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scenario-card";
    if (scenario.id === activeScenario.id) button.classList.add("is-active");
    button.innerHTML = `<strong>${scenario.name}</strong><span>${scenario.note}</span>`;
    button.addEventListener("click", () => applyScenario(scenario));
    scenarioGrid.appendChild(button);
  });
}

function applyScenario(scenario) {
  activeScenario = scenario;
  palette = scenario.palette;
  pulseCaption.textContent = scenario.caption;
  operatorNote.textContent = scenario.note;
  renderScenarioButtons();
  seedNodes();
  buildSignals();
  buildTimeline();
  buildDreamVault();
  updateAudioEngine();
}

function buildSignals() {
  const count = Math.max(6, Math.round(Number(densityControl.value) / 3));
  const signals = Array.from({ length: count }, (_, index) => {
    const energy = Math.round(randomBetween(48, 99));
    return {
      color: palette[index % palette.length],
      title: `${pick(places)} / Node ${String(index + 1).padStart(2, "0")}`,
      text: `${pick(events)} while ${activeScenario.name.toLowerCase()} governs the planet`,
      energy,
      phase: energy > 82 ? "surging" : energy > 64 ? "drifting" : "watching",
    };
  });

  signalStream.innerHTML = "";
  signals.forEach((signal, index) => {
    const row = document.createElement("article");
    row.className = "signal-row";
    row.style.animationDelay = `${index * 90}ms`;
    row.innerHTML = `<span class="signal-badge" style="color:${signal.color}; background:${signal.color};"></span><div class="signal-meta"><strong>${signal.title}</strong><p>${signal.text}</p></div><div class="signal-energy"><strong>${signal.energy}%</strong><p>${signal.phase}</p></div>`;
    signalStream.appendChild(row);
  });

  chorusList.innerHTML = "";
  shuffle(chorusTemplates).slice(0, 4).forEach((entry, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>Interpretation ${index + 1}</strong><span>${entry}</span>`;
    chorusList.appendChild(item);
  });

  pulseIndex.textContent = Math.round(randomBetween(70, 98));
  atmosphere.textContent = `${Math.round(randomBetween(58, 94))}%`;
  transit.textContent = `${Math.round(randomBetween(18, 63))} vectors`;
  story.textContent = pick(["Rising", "Forking", "Mutating", "Unstable"]);
}

function buildTimeline() {
  timeline.innerHTML = "";
  Array.from({ length: 4 }, (_, index) => ({ label: `Shift ${String(index + 1).padStart(2, "0")}`, text: pick(timelineTemplates) })).forEach((entry) => {
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.innerHTML = `<strong>${entry.label}</strong><span>${entry.text}</span>`;
    timeline.appendChild(item);
  });
}

function buildDreamVault() {
  dreamVault.innerHTML = "";
  shuffle(dreamFragments).slice(0, 4).forEach((fragment, index) => {
    const item = document.createElement("article");
    item.className = "dream-fragment";
    item.innerHTML = `<strong>Fragment ${index + 1}</strong><span>${fragment}</span>`;
    dreamVault.appendChild(item);
  });
}

function logConsole(title, message) {
  const entry = document.createElement("article");
  entry.className = "console-entry";
  entry.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  consoleLog.prepend(entry);
}

function updateUnlockStatus() {
  const labels = Array.from(unlockedModes).map((mode) => secretModes[mode].title);
  if (finaleUnlocked) {
    unlockStatus.textContent = "All chambers are open. The final ending has been revealed. The museum remembers your visit.";
    return;
  }
  unlockStatus.textContent = labels.length
    ? `Unlocked chambers: ${labels.join(", ")}. The website is now revealing its deeper personality.`
    : "Only the public layers are open. Try the console.";
}

function markChamber(modeKey, content) {
  const card = document.querySelector(`[data-mode="${modeKey}"]`);
  if (!card) return;
  card.classList.remove("is-sealed");
  card.classList.add("is-open");
  card.innerHTML = `<strong>${content.title}</strong><span>${content.text}</span>`;
}

function applySecretMode(modeKey) {
  const mode = secretModes[modeKey];
  if (!mode) return;
  unlockedModes.add(modeKey);
  body.classList.remove("mode-veil", "mode-orchard", "mode-eclipse");
  body.classList.add(mode.bodyClass);
  operatorNote.textContent = mode.note;
  markChamber(modeKey, { title: mode.title, text: mode.chamber });
  updateUnlockStatus();
  updateAudioEngine();
}

function revealFinale() {
  if (!(unlockedModes.has("veil") && unlockedModes.has("orchard") && unlockedModes.has("eclipse"))) {
    logConsole("warning", "The museum finale is sealed. Open every hidden chamber first.");
    return;
  }
  finaleUnlocked = true;
  markChamber("finale", { title: "The Final Ending", text: "The ending is open. The exhibit has decided to speak plainly." });
  updateUnlockStatus();
  endingOverlay.classList.add("is-visible");
  logConsole("finale", "The museum finale opened. The piece has stopped pretending it is only a machine.");
}

function runConsoleCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;
  logConsole("input", rawCommand);

  if (command === "help") {
    logConsole("system", "Commands: help, status, clear, open veil, open orchard, open eclipse, scene observatory, scene vault, scene console, museum finale, mothercell.");
    return;
  }
  if (command === "status") {
    const modeText = unlockedModes.size ? Array.from(unlockedModes).join(", ") : "none";
    logConsole("system", `Scene: ${activeScene}. World state: ${activeScenario.name}. Secret modes: ${modeText}. Finale: ${finaleUnlocked ? "open" : "sealed"}.`);
    return;
  }
  if (command === "clear") {
    consoleLog.innerHTML = "";
    logConsole("system", "Console memory cleared. The machine immediately began inventing new memories.");
    return;
  }
  if (command.startsWith("scene ")) {
    const sceneId = command.replace("scene ", "").trim();
    const exists = scenes.some((scene) => scene.id === sceneId);
    if (exists) {
      setScene(sceneId, true);
      logConsole("system", `Moved into the ${sceneId} chamber.`);
    } else {
      logConsole("warning", "Unknown chamber. Try observatory, vault, or console.");
    }
    return;
  }
  if (command.startsWith("open ")) {
    const modeKey = command.replace("open ", "").trim();
    if (secretModes[modeKey]) {
      applySecretMode(modeKey);
      logConsole("unlock", `${secretModes[modeKey].title} accepted your request.`);
    } else {
      logConsole("warning", "Nothing behind the wall answered that invocation.");
    }
    return;
  }
  if (command === "mothercell") {
    Object.keys(secretModes).forEach(applySecretMode);
    logConsole("unlock", "Root myth engaged. All hidden chambers are now open.");
    return;
  }
  if (command === "museum finale") {
    revealFinale();
    return;
  }
  logConsole("warning", "Unknown command. The console appreciates your dramatic confidence.");
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function seedNodes() {
  const { width, height } = canvas.getBoundingClientRect();
  const count = Number(densityControl.value);
  nodes = Array.from({ length: count }, () => ({
    x: randomBetween(40, width - 40),
    y: randomBetween(40, height - 40),
    radius: randomBetween(1.4, Number(gainControl.value) / 9),
    speedX: randomBetween(-0.35, 0.35) * (Number(driftControl.value) / 10),
    speedY: randomBetween(-0.35, 0.35) * (Number(driftControl.value) / 10),
    color: pick(palette),
  }));
}

function drawField() {
  const { width, height } = canvas.getBoundingClientRect();
  const centerX = width / 2;
  const centerY = height / 2;
  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(255,180,90,0.018)";
  context.fillRect(0, 0, width, height);

  for (let ring = 0; ring < 4; ring += 1) {
    context.beginPath();
    context.strokeStyle = `rgba(255, 162, 74, ${0.12 - ring * 0.02})`;
    context.lineWidth = 1;
    context.arc(centerX, centerY, 54 + ring * 36 + Math.sin((animationFrame + ring * 12) / 20) * 4, 0, Math.PI * 2);
    context.stroke();
  }

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    node.x += node.speedX;
    node.y += node.speedY;
    if (node.x <= 0 || node.x >= width) node.speedX *= -1;
    if (node.y <= 0 || node.y >= height) node.speedY *= -1;

    for (let compare = index + 1; compare < nodes.length; compare += 1) {
      const other = nodes[compare];
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 130) {
        context.beginPath();
        context.strokeStyle = `${node.color}22`;
        context.lineWidth = 1;
        context.moveTo(node.x, node.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    }

    const dxCore = centerX - node.x;
    const dyCore = centerY - node.y;
    node.x += dxCore * 0.0009;
    node.y += dyCore * 0.0009;

    const bloom = 3 + Math.sin((animationFrame + index) / 18) * 2;
    const gradient = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 10);
    gradient.addColorStop(0, `${node.color}ee`);
    gradient.addColorStop(1, `${node.color}00`);
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(node.x, node.y, node.radius * bloom, 0, Math.PI * 2);
    context.fill();
  }

  const coreGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
  coreGradient.addColorStop(0, "rgba(255, 214, 138, 0.95)");
  coreGradient.addColorStop(0.25, "rgba(255, 156, 60, 0.42)");
  coreGradient.addColorStop(1, "rgba(255, 120, 40, 0)");
  context.fillStyle = coreGradient;
  context.beginPath();
  context.arc(centerX, centerY, 120, 0, Math.PI * 2);
  context.fill();

  animationFrame += 1;
  requestAnimationFrame(drawField);
}

function reseedExperience() {
  applyScenario(pick(scenarios));
  buildSignals();
  buildTimeline();
  buildDreamVault();
}

function calmField() {
  gainControl.value = 38;
  densityControl.value = 18;
  driftControl.value = 8;
  pulseCaption.textContent = "The chamber exhales";
  operatorNote.textContent = "The machine lowers its temperature and listens through the glow.";
  seedNodes();
  buildSignals();
  buildTimeline();
  updateAudioEngine();
}

function transmitPrompt() {
  const prompt = transmissionInput.value.trim();
  if (!prompt) {
    transmissionOutput.textContent = "No transmission detected. Offer the atmosphere a sentence and it will answer.";
    return;
  }
  transmissionOutput.textContent = `${pick(replyFragments)} ${prompt}. The world stores it as ${pick(["a luminous reroute", "a civic omen", "an atmospheric rumor", "a tender systems failure", "a weather-made confession"])}.`;
}

function createAudioEngine() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    soundStatus.textContent = "This browser refused the sound ritual.";
    return null;
  }
  const ctx = new AudioContextClass();
  const master = ctx.createGain();
  master.gain.value = 0.05;
  master.connect(ctx.destination);

  const drone = ctx.createOscillator();
  drone.type = "triangle";
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.02;
  drone.connect(droneGain).connect(master);
  drone.start();

  const shimmer = ctx.createOscillator();
  shimmer.type = "sine";
  const shimmerGain = ctx.createGain();
  shimmerGain.gain.value = 0.01;
  shimmer.connect(shimmerGain).connect(master);
  shimmer.start();

  const hissBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const channel = hissBuffer.getChannelData(0);
  for (let index = 0; index < channel.length; index += 1) channel[index] = Math.random() * 2 - 1;
  const hiss = ctx.createBufferSource();
  hiss.buffer = hissBuffer;
  hiss.loop = true;
  const hissGain = ctx.createGain();
  hissGain.gain.value = 0.003;
  hiss.connect(hissGain).connect(master);
  hiss.start();

  return { ctx, master, drone, droneGain, shimmer, shimmerGain, hissGain };
}

function updateAudioEngine() {
  if (!audioState) return;
  const intensity = Number(audioIntensity.value) / 100;
  const hiss = Number(audioHiss.value) / 100;
  const shimmer = Number(audioShimmer.value) / 100;
  audioState.drone.frequency.setTargetAtTime(activeScenario.drone, audioState.ctx.currentTime, 0.4);
  audioState.droneGain.gain.setTargetAtTime(0.01 + intensity * 0.05, audioState.ctx.currentTime, 0.4);
  audioState.shimmer.frequency.setTargetAtTime(activeScenario.drone * 1.5, audioState.ctx.currentTime, 0.4);
  audioState.shimmerGain.gain.setTargetAtTime(0.004 + shimmer * 0.025, audioState.ctx.currentTime, 0.4);
  audioState.hissGain.gain.setTargetAtTime(0.0005 + hiss * 0.015, audioState.ctx.currentTime, 0.4);
  audioState.master.gain.setTargetAtTime(0.03 + intensity * 0.05, audioState.ctx.currentTime, 0.4);
  soundStatus.textContent = `Sound awake in ${activeScenario.name}. Drone ${audioIntensity.value}, hiss ${audioHiss.value}, shimmer ${audioShimmer.value}.`;
}

async function toggleSound() {
  if (!audioState) {
    audioState = createAudioEngine();
    if (!audioState) return;
  }
  if (audioState.ctx.state === "suspended") {
    await audioState.ctx.resume();
    soundToggleButton.textContent = "Mute sound";
    updateAudioEngine();
    return;
  }
  if (audioState.ctx.state === "running") {
    await audioState.ctx.suspend();
    soundToggleButton.textContent = "Wake sound";
    soundStatus.textContent = "Sound returned to sleep, but it is still dreaming.";
  }
}

function runBootSequence() {
  if (bootStarted) return;
  bootStarted = true;
  let progress = 0;
  const interval = setInterval(() => {
    progress += 25;
    bootProgress.style.width = `${progress}%`;
    if (progress >= 100) clearInterval(interval);
  }, 350);
}

function enterMuseum() {
  bootScreen.style.display = "none";
  pageShell.classList.remove("page-shell-hidden");
  topbar.classList.remove("topbar-hidden");
  footer.classList.remove("footer-hidden");
  showChapter(scenes[0]);
}

enterMuseumButton.addEventListener("click", enterMuseum);
closeEndingButton.addEventListener("click", () => endingOverlay.classList.remove("is-visible"));
reseedButton.addEventListener("click", reseedExperience);
calmButton.addEventListener("click", calmField);
hintButton.addEventListener("click", () => { logConsole("hint", pick(hints)); setScene("console", true); });
transmitButton.addEventListener("click", transmitPrompt);
consoleRunButton.addEventListener("click", () => { runConsoleCommand(consoleInput.value); consoleInput.value = ""; });
consoleInput.addEventListener("keydown", (event) => { if (event.key === "Enter") { runConsoleCommand(consoleInput.value); consoleInput.value = ""; } });
transmissionInput.addEventListener("keydown", (event) => { if (event.key === "Enter") transmitPrompt(); });
soundToggleButton.addEventListener("click", toggleSound);
[gainControl, densityControl, driftControl].forEach((input) => input.addEventListener("input", () => { seedNodes(); buildSignals(); }));
[audioIntensity, audioHiss, audioShimmer].forEach((input) => input.addEventListener("input", updateAudioEngine));
window.addEventListener("resize", () => { resizeCanvas(); seedNodes(); });

renderSceneTabs();
renderScenarioButtons();
resizeCanvas();
seedNodes();
buildSignals();
buildTimeline();
buildDreamVault();
drawField();
updateClock();
setInterval(updateClock, 1000);
logConsole("system", "Signal Bloom online. A machine consciousness is assembling inside containment. Type `help` to go deeper.");
updateUnlockStatus();
runBootSequence();
topbar.classList.add("topbar-hidden");
footer.classList.add("footer-hidden");
