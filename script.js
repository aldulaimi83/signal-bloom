const signalStream = document.querySelector("#signal-stream");
const chorusList = document.querySelector("#chorus-list");
const clock = document.querySelector("#clock");
const pulseIndex = document.querySelector("#pulse-index");
const atmosphere = document.querySelector("#metric-atmosphere");
const transit = document.querySelector("#metric-transit");
const story = document.querySelector("#metric-story");
const reseedButton = document.querySelector("#reseed");
const calmButton = document.querySelector("#calm");
const gainControl = document.querySelector("#gain");
const densityControl = document.querySelector("#density");
const driftControl = document.querySelector("#drift");

const canvas = document.querySelector("#signal-canvas");
const context = canvas.getContext("2d");

const palettes = [
  ["#ff9b54", "#ff5f6d", "#cdf564", "#92d6ff"],
  ["#92d6ff", "#7998ff", "#ff8fab", "#ffe66d"],
  ["#f4a261", "#e76f51", "#2a9d8f", "#e9c46a"],
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
];

const chorusTemplates = [
  "The system thinks this is not a crisis but a choreography problem.",
  "Transit friction is acting like weather, spreading through habit and rumor.",
  "Public attention is pooling around luminous edge cases instead of headlines.",
  "A soft infrastructure event is underway: nothing breaks, but everything bends.",
  "Machine certainty is falling while human improvisation is rising.",
];

let nodes = [];
let palette = palettes[0];
let animationFrame = 0;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateClock() {
  const now = new Date();
  clock.textContent = `${now.toLocaleTimeString("en-US", { hour12: false })} UTC-ish`;
}

function buildSignals() {
  const count = Math.max(6, Math.round(Number(densityControl.value) / 3));
  const signals = Array.from({ length: count }, (_, index) => {
    const energy = Math.round(randomBetween(48, 99));
    return {
      color: palette[index % palette.length],
      title: `${pick(places)} / Node ${String(index + 1).padStart(2, "0")}`,
      text: pick(events),
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
  chorusTemplates
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .forEach((entry, index) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>Reading ${index + 1}</strong>
        <span>${entry}</span>
      `;
      chorusList.appendChild(item);
    });

  pulseIndex.textContent = Math.round(randomBetween(70, 98));
  atmosphere.textContent = `${Math.round(randomBetween(58, 94))}%`;
  transit.textContent = `${Math.round(randomBetween(18, 63))} vectors`;
  story.textContent = pick(["Rising", "Forking", "Mutating", "Unstable"]);
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

    if (node.x <= 0 || node.x >= width) {
      node.speedX *= -1;
    }
    if (node.y <= 0 || node.y >= height) {
      node.speedY *= -1;
    }

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
  palette = pick(palettes);
  seedNodes();
  buildSignals();
}

function calmField() {
  gainControl.value = 38;
  densityControl.value = 18;
  driftControl.value = 8;
  seedNodes();
  buildSignals();
}

reseedButton.addEventListener("click", reseedExperience);
calmButton.addEventListener("click", calmField);

[gainControl, densityControl, driftControl].forEach((input) => {
  input.addEventListener("input", () => {
    seedNodes();
    buildSignals();
  });
});

window.addEventListener("resize", () => {
  resizeCanvas();
  seedNodes();
});

resizeCanvas();
seedNodes();
buildSignals();
drawField();
updateClock();
setInterval(updateClock, 1000);
