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
  {
    id: "observatory",
    name: "Observatory",
    blurb: "The public-facing chamber where the organism renders the world in visible weather.",
  },
  {
    id: "vault",
    name: "Dream Vault",
    blurb: "A softer chamber full of lore fragments, transmissions, and ambient drift.",
  },
  {
    id: "console",
    name: "Operator Console",
    blurb: "A fake command line that happily pretends to be dangerous.",
  },
];

const scenarios = [
  {
    id: "solar-noir",
    name: "Solar Noir",
    note: "Heat, rumor, and glowing infrastructure blur into a desert opera.",
    palette: ["#ff9b54", "#ff5f6d", "#ffe66d", "#92d6ff"],
    caption: "Sunlit instability",
    drone: 174,
    bodyClass: "",
  },
  {
    id: "tidal-choir",
    name: "Tidal Choir",
    note: "Ports, currents, and public voice coils turn the field aquatic.",
    palette: ["#92d6ff", "#2ec4b6", "#7998ff", "#f6f0d8"],
    caption: "Liquid coordination",
    drone: 146,
    bodyClass: "",
  },
  {
    id: "saturn-market",
    name: "Saturn Market",
    note: "Orbital commerce and mythic logistics create a glittering nervous system.",
    palette: ["#e9c46a", "#f4a261", "#a8dadc", "#6d597a"],
    caption: "Trade becoming weather",
    drone: 196,
    bodyClass: "",
  },
  {
    id: "ghost-transit",
    name: "Ghost Transit",
    note: "Trains, shadows, and forgotten signals reappear as a public seance.",
    palette: ["#cdf564", "#92d6ff", "#ff8fab", "#7998ff"],
    caption: "Haunted synchronization",
    drone: 132,
    bodyClass: "",
  },
];

const places = [
  "Reykjavik Harbor",
  "Lagos Heat Arc",
  "Osaka Beltway",
  "Santiago Ridge",
  "Casablanca Rooftops",
  "Jakarta Delta",
  "Milan Signal Tunnel",
  "Phoenix Airlane",
  "Nairobi Transfer Yard",
  "Sao Paulo River Grid",
  "Tallinn Fog Relay",
  "Bogota Vertical Market",
  "Moonlit Freight Spine",
  "Delta Broadcast Garden",
];

const events = [
  "commuter swarms braided with storm cells",
  "satellite reflections crossed a protest livestream",
  "shipping chatter slipped into dance radio",
  "air quality whispers triggered civic alerts",
  "night trains carried a surprise migration pulse",
  "market rumors synced with cloudburst warnings",
  "festival lasers collided with drone corridors",
  "public screens adopted a shared orange glow",
  "heat domes nudged infrastructure into improvisation",
  "citizen sensors started arguing with official maps",
  "river traffic copied the tempo of emergency dispatch",
  "warehouse rooftops flashed in unofficial semaphore",
  "urban gardens began reading like circuitry",
  "a forgotten underpass became a listening organ",
];

const chorusTemplates = [
  "The system thinks this is not a crisis but a choreography problem.",
  "Transit friction is acting like weather, spreading through habit and rumor.",
  "Public attention is pooling around luminous edge cases instead of headlines.",
  "A soft infrastructure event is underway: nothing breaks, but everything bends.",
  "Machine certainty is falling while human improvisation is rising.",
  "The field is behaving like gossip with a barometric memory.",
  "The organism keeps confusing public fear with undiscovered ritual.",
];

const timelineTemplates = [
  "A civic network borrowed the color of sunset and refused to return it.",
  "Unofficial operators rerouted fear into curiosity for thirteen brilliant minutes.",
  "A cluster of silent satellites became the loudest thing in public conversation.",
  "Transit signage started reading like poetry after a weather data splice.",
  "The organism archived a failed prediction and called it compost.",
  "The city's storm drains started passing rumors upstream.",
];

const dreamFragments = [
  "In one possible future, weather stations become confession booths.",
  "The bloom dreams of cities as coral reefs for memory and static.",
  "Every radar sweep leaves behind a ghost orchard of untaken paths.",
  "The machine keeps a private museum of near-misses and miraculous reroutes.",
  "Somewhere beneath the maps, another interface is growing teeth and flowers.",
  "The satellites have opinions now, and unfortunately they are poetic.",
];

const replyFragments = [
  "The satellites answer in warm static:",
  "The field returns a private weather bulletin:",
  "Signal Bloom translates your prompt into infrastructure mythology:",
  "A chorus node replies with this fragment:",
  "An unlicensed operator whispers back from the underlayer:",
];

const secretModes = {
  veil: {
    title: "The Veil Engine",
    bodyClass: "mode-veil",
    note: "The bloom starts speaking in softer frequencies. Hidden doors prefer tenderness over force.",
    chamber: "The Veil Engine is now open. Observability has become intimacy.",
  },
  orchard: {
    title: "Signal Orchard",
    bodyClass: "mode-orchard",
    note: "Every node now feels planted, rooted, and suspiciously alive.",
    chamber: "Signal Orchard is now open. Data points have begun flowering.",
  },
  eclipse: {
    title: "Eclipse Protocol",
    bodyClass: "mode-eclipse",
    note: "The machine lowers the sun and starts rendering public systems as omens.",
    chamber: "Eclipse Protocol is now open. The dramatic layer has entered the room.",
  },
};

const hints = [
  "Try the console command `help` first. The machine respects ritual.",
  "Deep layers respond to `open veil`, `open orchard`, and `open eclipse`.",
  "Some interfaces only reveal themselves after you ask the console for `status`.",
  "If the bloom gets too loud, calm it, then ask the console to open a secret chamber.",
];

const unlockedModes = new Set();
let nodes = [];
let palette = scenarios[0].palette;
let animationFrame = 0;
let activeScenario = scenarios[0];
let activeScene = scenes[0].id;
let audioState = null;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

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
    if (scene.id === activeScene) {
      button.classList.add("is-active");
    }
    button.innerHTML = `<strong>${scene.name}</strong><span>${scene.blurb}</span>`;
    button.addEventListener("click", () => setScene(scene.id));
    sceneTabs.appendChild(button);
  });
}

function setScene(sceneId) {
  activeScene = sceneId;
  document.querySelectorAll(".scene-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `scene-${sceneId}`);
  });
  renderSceneTabs();
}

function renderScenarioButtons() {
  scenarioGrid.innerHTML = "";
  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scenario-card";
    if (scenario.id === activeScenario.id) {
      button.classList.add("is-active");
    }
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
      text: `${pick(events)} in ${activeScenario.name.toLowerCase()}`,
      energy,
      phase: energy > 82 ? "surging" : energy > 64 ? "drifting" : "observing",
    };
  });

  signalStream.innerHTML = "";
  signals.forEach((signal, index) => {
    const row = document.createElement("article");
    row.className = "signal-row";
    row.style.animationDelay = `${index * 90}ms`;
    row.innerHTML = `
      <span class="signal-badge" style="color:${signal.color}; background:${signal.color};"></span>
      <div class="signal-meta">
        <strong>${signal.title}</strong>
        <p>${signal.text}</p>
      </div>
      <div class="signal-energy">
        <strong>${signal.energy}%</strong>
        <p>${signal.phase}</p>
      </div>
    `;
    signalStream.appendChild(row);
  });

  chorusList.innerHTML = "";
  shuffle(chorusTemplates).slice(0, 4).forEach((entry, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>Reading ${index + 1}</strong><span>${entry}</span>`;
    chorusList.appendChild(item);
  });

  pulseIndex.textContent = Math.round(randomBetween(70, 98));
  atmosphere.textContent = `${Math.round(randomBetween(58, 94))}%`;
  transit.textContent = `${Math.round(randomBetween(18, 63))} vectors`;
  story.textContent = pick(["Rising", "Forking", "Mutating", "Unstable"]);
}

function buildTimeline() {
  timeline.innerHTML = "";
  Array.from({ length: 4 }, (_, index) => ({
    label: `Mutation ${String(index + 1).padStart(2, "0")}`,
    text: pick(timelineTemplates),
  })).forEach((entry) => {
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
    item.innerHTML = `<strong>Dream ${index + 1}</strong><span>${fragment}</span>`;
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
  unlockStatus.textContent = labels.length
    ? `Unlocked: ${labels.join(", ")}. The machine is impressed.`
    : "Only the public layers are open. Try the console.";
}

function markChamber(modeKey) {
  const card = document.querySelector(`[data-mode="${modeKey}"]`);
  if (!card) {
    return;
  }
  card.classList.remove("is-sealed");
  card.classList.add("is-open");
  card.innerHTML = `<strong>${secretModes[modeKey].title}</strong><span>${secretModes[modeKey].chamber}</span>`;
}

function applySecretMode(modeKey) {
  const mode = secretModes[modeKey];
  if (!mode) {
    return;
  }
  unlockedModes.add(modeKey);
  document.body.classList.remove("mode-veil", "mode-orchard", "mode-eclipse");
  document.body.classList.add(mode.bodyClass);
  operatorNote.textContent = mode.note;
  markChamber(modeKey);
  updateUnlockStatus();
  updateAudioEngine();
}

function runConsoleCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) {
    return;
  }

  logConsole("input", rawCommand);

  if (command === "help") {
    logConsole("system", "Available commands: help, status, clear, open veil, open orchard, open eclipse, scene vault, scene observatory, scene console.");
    return;
  }

  if (command === "status") {
    const modeText = unlockedModes.size ? Array.from(unlockedModes).join(", ") : "none";
    logConsole("system", `Active scene: ${activeScene}. Active scenario: ${activeScenario.name}. Unlocked modes: ${modeText}.`);
    return;
  }

  if (command === "clear") {
    consoleLog.innerHTML = "";
    logConsole("system", "Console memory rinsed. The bloom immediately started remembering again.");
    return;
  }

  if (command.startsWith("scene ")) {
    const sceneId = command.replace("scene ", "").trim();
    const exists = scenes.some((scene) => scene.id === sceneId);
    if (exists) {
      setScene(sceneId);
      logConsole("system", `Moved operator into the ${sceneId} chamber.`);
    } else {
      logConsole("warning", "Unknown chamber. Try scene observatory, scene vault, or scene console.");
    }
    return;
  }

  if (command.startsWith("open ")) {
    const modeKey = command.replace("open ", "").trim();
    if (secretModes[modeKey]) {
      applySecretMode(modeKey);
      logConsole("unlock", `${secretModes[modeKey].title} accepted your request and opened.`);
    } else {
      logConsole("warning", "Nothing answered that invocation.");
    }
    return;
  }

  if (command === "mothercell") {
    Object.keys(secretModes).forEach(applySecretMode);
    logConsole("unlock", "The root myth accepted you. All chambers opened at once.");
    return;
  }

  logConsole("warning", "Unknown command. The machine liked your confidence though.");
}

function updateClockAndPulse() {
  updateClock();
  pulseIndex.textContent = Math.round(randomBetween(72, 99));
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
  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(255,255,255,0.02)";
  context.fillRect(0, 0, width, height);

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

    const bloom = 3 + Math.sin((animationFrame + index) / 18) * 2;
    const gradient = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 10);
    gradient.addColorStop(0, `${node.color}ee`);
    gradient.addColorStop(1, `${node.color}00`);
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(node.x, node.y, node.radius * bloom, 0, Math.PI * 2);
    context.fill();
  }

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
  pulseCaption.textContent = "Calmed but listening";
  operatorNote.textContent = "The organism lowers its voice but keeps recording the edges.";
  seedNodes();
  buildSignals();
  buildTimeline();
  updateAudioEngine();
}

function transmitPrompt() {
  const prompt = transmissionInput.value.trim();
  if (!prompt) {
    transmissionOutput.textContent = "No transmission detected. Offer the organism a sentence and it will reshape it.";
    return;
  }
  transmissionOutput.textContent = `${pick(replyFragments)} ${prompt}. The field marks it as ${pick([
    "a luminous reroute",
    "a civic omen",
    "an atmospheric rumor",
    "a tender systems failure",
    "a map-sized hallucination",
  ])}.`;
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
  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = Math.random() * 2 - 1;
  }
  const hiss = ctx.createBufferSource();
  hiss.buffer = hissBuffer;
  hiss.loop = true;
  const hissFilter = ctx.createBiquadFilter();
  hissFilter.type = "lowpass";
  hissFilter.frequency.value = 880;
  const hissGain = ctx.createGain();
  hissGain.gain.value = 0.003;
  hiss.connect(hissFilter).connect(hissGain).connect(master);
  hiss.start();

  return { ctx, master, drone, droneGain, shimmer, shimmerGain, hissGain, hissFilter };
}

function updateAudioEngine() {
  if (!audioState) {
    return;
  }
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
    if (!audioState) {
      return;
    }
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

reseedButton.addEventListener("click", reseedExperience);
calmButton.addEventListener("click", calmField);
hintButton.addEventListener("click", () => {
  logConsole("hint", pick(hints));
  setScene("console");
});
transmitButton.addEventListener("click", transmitPrompt);
consoleRunButton.addEventListener("click", () => {
  runConsoleCommand(consoleInput.value);
  consoleInput.value = "";
});
consoleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runConsoleCommand(consoleInput.value);
    consoleInput.value = "";
  }
});
transmissionInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    transmitPrompt();
  }
});
soundToggleButton.addEventListener("click", toggleSound);

[gainControl, densityControl, driftControl].forEach((input) => {
  input.addEventListener("input", () => {
    seedNodes();
    buildSignals();
  });
});

[audioIntensity, audioHiss, audioShimmer].forEach((input) => {
  input.addEventListener("input", updateAudioEngine);
});

window.addEventListener("resize", () => {
  resizeCanvas();
  seedNodes();
});

renderSceneTabs();
renderScenarioButtons();
resizeCanvas();
seedNodes();
buildSignals();
buildTimeline();
buildDreamVault();
drawField();
updateClockAndPulse();
setInterval(updateClockAndPulse, 1000);
logConsole("system", "Signal Bloom console online. Try `help` or ask for something forbidden.");
updateUnlockStatus();
