(function () {
"use strict";

/* ================= data ================= */
const BR = {
  tools:  { name: "工具与方法", en: "Tools & Methods",        color: "#9be08a" },
  found:  { name: "基础",       en: "Foundations",            color: "#7fa6ff" },
  vision: { name: "视觉与生成", en: "Vision & Generation",    color: "#4fe0d0" },
  lang:   { name: "语言与智能", en: "Language & Intelligence", color: "#b993ff" },
  cross:  { name: "交叉应用",   en: "AI × Science",           color: "#ff8fc8" },
  decide: { name: "学习与决策", en: "Learning & Decision",    color: "#ffbe5c" },
  robot:  { name: "机器人",     en: "Robotics",               color: "#ff7f6e" }
};
const ORDER = ["tools", "found", "vision", "lang", "cross", "decide", "robot"];
const DOMS = (window.RA_DOMAINS || []).slice().sort((a, b) => a.id.localeCompare(b.id));
const byId = {};
DOMS.forEach(d => (byId[d.id] = d));
document.getElementById("count").textContent = DOMS.length;

/* ================= layout ================= */
const R1 = 320, R2 = 640, RL = 830;
const P = (r, a) => [r * Math.cos(a), r * Math.sin(a)];
const f1 = n => n.toFixed(1);
function curve(r0, a0, r1, a1) {
  const m = (r0 + r1) / 2;
  const [x0, y0] = P(r0, a0), [c1x, c1y] = P(m, a0), [c2x, c2y] = P(m, a1), [x1, y1] = P(r1, a1);
  return `M${f1(x0)},${f1(y0)} C${f1(c1x)},${f1(c1y)} ${f1(c2x)},${f1(c2y)} ${f1(x1)},${f1(y1)}`;
}
const groups = ORDER.map(id => ({ id, b: BR[id], ds: DOMS.filter(d => d.branch === id) })).filter(g => g.ds.length);
const GAP = 1.1;
const total = groups.reduce((s, g) => s + g.ds.length + GAP, 0);
const UNIT = (2 * Math.PI) / total;
let cursor = -Math.PI / 2 - ((groups[0].ds.length + GAP) * UNIT) / 2;
groups.forEach(g => {
  const span = (g.ds.length + GAP) * UNIT;
  const start = cursor + (GAP * UNIT) / 2;
  g.ang = cursor + span / 2;
  [g.x, g.y] = P(R1, g.ang);
  g.ds.forEach((d, i) => {
    d.ang = start + (i + 0.5) * UNIT;
    [d.x, d.y] = P(R2, d.ang);
    d.color = g.b.color;
    const lv = (d.leaves || []).slice(0, 12);
    const spread = UNIT * 0.88;
    d.leafAng = lv.map((_, j) => d.ang - spread / 2 + (spread * (j + 0.5)) / lv.length);
  });
  cursor += span;
});

/* ================= svg build ================= */
const svg = document.getElementById("map");
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

let defs = "";
groups.forEach(g => {
  defs += `<radialGradient id="neb-${g.id}"><stop offset="0" stop-color="${g.b.color}" stop-opacity=".17"/><stop offset=".55" stop-color="${g.b.color}" stop-opacity=".05"/><stop offset="1" stop-color="${g.b.color}" stop-opacity="0"/></radialGradient>`;
  defs += `<radialGradient id="orb-${g.id}" cx=".35" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="${g.b.color}"/><stop offset="1" stop-color="${g.b.color}" stop-opacity=".55"/></radialGradient>`;
});
defs += `<radialGradient id="coreG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#c9d2ff"/><stop offset=".6" stop-color="#5a4ce0" stop-opacity=".6"/><stop offset="1" stop-color="#1a1450" stop-opacity="0"/></radialGradient>`;
$("defs").innerHTML = defs;

let neb = "", orbits = "", links = "", leaves = "", hubs = "", doms = "";
groups.forEach((g, gi) => {
  const [nx, ny] = P((R1 + R2) / 2 + 40, g.ang);
  const nr = Math.max(320, g.ds.length * 105);
  neb += `<circle class="nebula" cx="${f1(nx)}" cy="${f1(ny)}" r="${nr}" fill="url(#neb-${g.id})"/>`;
});
[R1, R2, RL - 20].forEach(r => (orbits += `<circle class="orbit" r="${r}"/>`));

groups.forEach((g, gi) => {
  const c = g.b.color;
  links += `<path class="link l0" data-b="${g.id}" pathLength="1" style="--c:${c};--dl:${(gi * 0.06).toFixed(2)}s" d="${curve(46, g.ang - 0.42, R1 - 26, g.ang)}"/>`;
  const w = 26 + g.b.name.length * 21;
  hubs += `<g class="hub" data-b="${g.id}" style="--c:${c}" transform="translate(${f1(g.x)},${f1(g.y)})"><g class="orb" style="--dl:${(0.25 + gi * 0.06).toFixed(2)}s"><g class="hs"><rect class="pill" x="${-w / 2}" y="-24" width="${w}" height="48" rx="24"/><text class="t1" y="2">${g.b.name}</text><text class="t2" y="16">${g.b.en}</text></g></g></g>`;
  g.ds.forEach((d, i) => {
    const dl = 0.45 + gi * 0.06 + i * 0.04;
    links += `<path class="link l1" data-b="${g.id}" data-d="${d.id}" pathLength="1" style="--c:${c};--dl:${dl.toFixed(2)}s" d="${curve(R1 + 26, g.ang, R2 - 26, d.ang)}"/>`;
    let lf = `<g class="leafg" data-d="${d.id}" style="--c:${c}">`;
    (d.leaves || []).slice(0, 12).forEach((t, j) => {
      const a = d.leafAng[j];
      lf += `<path class="link l2" pathLength="1" style="--c:${c};--dl:${(dl + 0.3).toFixed(2)}s" d="${curve(R2 + 26, d.ang, RL - 4, a)}"/>`;
      let deg = (a * 180) / Math.PI;
      const flip = Math.cos(a) < 0;
      lf += `<g class="leaf" transform="rotate(${f1(deg)}) translate(${RL},0)${flip ? " rotate(180)" : ""}"><circle r="2.4"/><text x="${flip ? -8 : 8}" text-anchor="${flip ? "end" : "start"}">${esc(t)}</text></g>`;
    });
    leaves += lf + "</g>";
    doms += `<g class="dom" data-d="${d.id}" style="--c:${c}" transform="translate(${f1(d.x)},${f1(d.y)})"><g class="orb" style="--dl:${(dl + 0.1).toFixed(2)}s"><circle class="halo" r="40"/><circle class="ring" r="31"/><circle class="body" r="22" fill="url(#orb-${g.id})"/><text class="num">${d.id}</text><text class="name" y="54">${esc(d.name)}</text></g></g>`;
  });
});
$("nebula").innerHTML = neb;
$("orbits").innerHTML = orbits;
$("links").innerHTML = links;
$("leaves").innerHTML = leaves;
$("hubs").innerHTML = hubs;
$("doms").innerHTML = doms;
$("core").innerHTML = `<circle r="120" fill="url(#coreG)" opacity=".55"/><circle class="core-ring" r="62"/><circle class="core-ring" r="84" style="animation-direction:reverse"/><circle r="40" fill="#0b0d22" stroke="rgba(255,255,255,.55)"/><text class="core-t">AI</text>`;

/* legend */
$("legend").innerHTML = groups
  .map(g => `<button data-b="${g.id}" style="--c:${g.b.color}"><i></i>${g.b.name}<small>${g.ds.length}</small></button>`)
  .join("");

/* ================= view / pan / zoom ================= */
let W = innerWidth, H = innerHeight;
const view = { x: W / 2, y: H / 2, k: 0.5 };
const clampK = k => Math.max(0.12, Math.min(12, k));
const vp = $("vp");
function fitView() {
  const top = W < 900 ? 110 : 70;
  const R = R2 + 120;
  const k = clampK(Math.min(W / (2 * R), (H - top - 40) / (2 * R)) || 0.3);
  return { k, x: W / 2, y: top + (H - top - 40) / 2 };
}
function apply() {
  if (!isFinite(view.k) || !isFinite(view.x) || !isFinite(view.y)) Object.assign(view, fitView());
  vp.setAttribute("transform", `translate(${f1(view.x)},${f1(view.y)}) scale(${view.k.toFixed(4)})`);
  svg.classList.toggle("lod", view.k > 0.82);
  svg.style.setProperty("--ts", Math.max(1, Math.min(1.9, 0.8 / view.k)).toFixed(3));
  drawStars();
}
let tw = null;
const ease = {
  inOut: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  inExpo: t => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  outExpo: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  out: t => 1 - Math.pow(1 - t, 3)
};
function tween(to, dur, ez, done) {
  if (tw) cancelAnimationFrame(tw.raf);
  const from = { ...view }, t0 = performance.now();
  // interpolate in log-zoom space anchored on world point at screen center for smooth flights
  const lk0 = Math.log(from.k), lk1 = Math.log(to.k);
  const c0 = { x: (W / 2 - from.x) / from.k, y: (H / 2 - from.y) / from.k };
  const c1 = { x: (W / 2 - to.x) / to.k, y: (H / 2 - to.y) / to.k };
  tw = {};
  const step = now => {
    const t = Math.min(1, (now - t0) / dur), e = (ez || ease.inOut)(t);
    const k = Math.exp(lk0 + (lk1 - lk0) * e);
    const cx = c0.x + (c1.x - c0.x) * e, cy = c0.y + (c1.y - c0.y) * e;
    view.k = k; view.x = W / 2 - cx * k; view.y = H / 2 - cy * k;
    apply();
    if (t < 1) tw.raf = requestAnimationFrame(step);
    else { tw = null; done && done(); }
  };
  tw.raf = requestAnimationFrame(step);
}
function focusOn(wx, wy, k, dur) {
  tween({ k, x: W / 2 - wx * k, y: H / 2 - wy * k }, dur || 900);
}

const ptrs = new Map();
let drag = null, pinch = null, moved = 0, downTarget = null;
svg.addEventListener("pointerdown", e => {
  svg.setPointerCapture(e.pointerId);
  touched = true;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (tw) { cancelAnimationFrame(tw.raf); tw = null; }
  if (ptrs.size === 1) {
    drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    moved = 0;
    downTarget = e.target.closest(".dom,.hub");
  } else if (ptrs.size === 2) {
    const [a, b] = [...ptrs.values()];
    pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: view.k, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, vx: view.x, vy: view.y };
    drag = null; moved = 99;
  }
});
svg.addEventListener("pointermove", e => {
  if (ptrs.has(e.pointerId)) ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinch && ptrs.size === 2) {
    const [a, b] = [...ptrs.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    const k = Math.min(4.5, clampK(pinch.k * (d / pinch.d)));
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    view.x = mx - ((pinch.mx - pinch.vx) * k) / pinch.k;
    view.y = my - ((pinch.my - pinch.vy) * k) / pinch.k;
    view.k = k; apply(); return;
  }
  if (drag) {
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    moved = Math.max(moved, Math.hypot(dx, dy));
    if (moved > 4) { svg.classList.add("drag"); view.x = drag.vx + dx; view.y = drag.vy + dy; apply(); hideTip(); }
  } else hover(e);
});
function endPtr(e) {
  ptrs.delete(e.pointerId);
  if (ptrs.size < 2) pinch = null;
  if (drag && moved <= 4 && downTarget) {
    if (downTarget.classList.contains("dom")) warpTo(byId[downTarget.dataset.d]);
    else focusBranch(downTarget.dataset.b);
  }
  if (ptrs.size === 0) { drag = null; svg.classList.remove("drag"); }
}
svg.addEventListener("pointerup", endPtr);
svg.addEventListener("pointercancel", endPtr);
svg.addEventListener("pointerleave", () => { if (!drag) { hideTip(); clearHL(); } });
svg.addEventListener("wheel", e => {
  e.preventDefault();
  if (tw) { cancelAnimationFrame(tw.raf); tw = null; }
  touched = true;
  const f = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0016));
  const k = Math.min(4.5, clampK(view.k * f)), r = k / view.k;
  view.x = e.clientX - (e.clientX - view.x) * r;
  view.y = e.clientY - (e.clientY - view.y) * r;
  view.k = k; apply();
  $("hint").style.opacity = 0;
}, { passive: false });

/* ================= hover / highlight ================= */
const tip = $("tip");
let hlId = null;
function clearHL() {
  if (!hlId) return;
  svg.classList.remove("focus");
  svg.querySelectorAll(".hl").forEach(n => n.classList.remove("hl"));
  svg.querySelectorAll(".leafg.on").forEach(n => n.classList.remove("on"));
  hlId = null;
}
function hover(e) {
  const t = e.target.closest && e.target.closest(".dom");
  if (!t) { hideTip(); clearHL(); return; }
  const d = byId[t.dataset.d];
  if (hlId !== d.id) {
    clearHL(); hlId = d.id;
    svg.classList.add("focus");
    t.classList.add("hl");
    svg.querySelector(`.hub[data-b="${d.branch}"]`).classList.add("hl");
    svg.querySelectorAll(`.link.l0[data-b="${d.branch}"], .link.l1[data-d="${d.id}"]`).forEach(n => n.classList.add("hl"));
    const lg = svg.querySelector(`.leafg[data-d="${d.id}"]`);
    lg.classList.add("on");
    lg.querySelectorAll(".link").forEach(n => n.classList.add("hl"));
    tip.style.setProperty("--c", d.color);
    tip.innerHTML = `<b>${d.id} · ${esc(d.name)}</b>${esc(d.tagline)}<em>点击跃迁进入 →</em>`;
  }
  const x = Math.min(e.clientX + 18, W - 320), y = Math.min(e.clientY + 18, H - 140);
  tip.style.left = x + "px"; tip.style.top = y + "px";
  tip.classList.add("on");
}
function hideTip() { tip.classList.remove("on"); }
function focusBranch(id) {
  const g = groups.find(g => g.id === id);
  const [x, y] = P((R1 + RL) / 2, g.ang);
  const k = Math.min(1.25, Math.min(W, H) / (g.ds.length * 150 + 520));
  focusOn(x, y, Math.max(k, 0.55), 1000);
}
$("legend").addEventListener("click", e => { const b = e.target.closest("button"); if (b) focusBranch(b.dataset.b); });
$("btnFit").addEventListener("click", () => tween(fitView(), 1000));
$("btnRandom").addEventListener("click", () => warpTo(DOMS[Math.floor(Math.random() * DOMS.length)]));

/* ================= search ================= */
const q = $("q");
function search(s) {
  s = s.trim().toLowerCase();
  svg.querySelectorAll(".dom.match").forEach(n => n.classList.remove("match"));
  if (!s) { svg.classList.remove("searching"); return []; }
  const hits = DOMS.filter(d => [d.id, d.name, d.en, d.tagline, ...(d.leaves || []), ...(d.keywords || [])].join(" ").toLowerCase().includes(s));
  svg.classList.add("searching");
  hits.forEach(d => svg.querySelector(`.dom[data-d="${d.id}"]`).classList.add("match"));
  return hits;
}
q.addEventListener("input", () => search(q.value));
q.addEventListener("keydown", e => {
  if (e.key === "Enter") { const h = search(q.value); if (h.length) { q.blur(); warpTo(h[0]); } }
  if (e.key === "Escape") { q.value = ""; search(""); q.blur(); }
});

/* ================= starfield ================= */
const sc = $("stars"), sx = sc.getContext("2d");
let STARS = [];
function seedStars() {
  const n = Math.round((W * H) / 2600);
  STARS = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() * 0.9 + 0.1, r: Math.random() * 1.2 + 0.2, p: Math.random() * 6.28 }));
}
let starT = 0;
function drawStars() {
  const dpr = devicePixelRatio || 1;
  sx.setTransform(dpr, 0, 0, dpr, 0, 0);
  sx.clearRect(0, 0, W, H);
  const g = sx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
  g.addColorStop(0, "#0b0c22"); g.addColorStop(1, "#04050d");
  sx.fillStyle = g; sx.fillRect(0, 0, W, H);
  for (const s of STARS) {
    const px = ((s.x * W + view.x * s.z * 0.06) % W + W) % W;
    const py = ((s.y * H + view.y * s.z * 0.06) % H + H) % H;
    const a = 0.35 + 0.45 * Math.sin(starT * 0.0012 * (1 + s.z) + s.p) * s.z + 0.2;
    sx.globalAlpha = Math.max(0.08, Math.min(1, a));
    sx.fillStyle = s.z > 0.85 ? "#cfd8ff" : "#ffffff";
    sx.beginPath(); sx.arc(px, py, s.r * s.z + 0.2, 0, 6.283); sx.fill();
  }
  sx.globalAlpha = 1;
}
function twinkle(t) { starT = t; if (!document.hidden && !panelOpen) drawStars(); setTimeout(() => requestAnimationFrame(twinkle), 80); }

let touched = false;
function resize() {
  const oW = W, oH = H;
  W = innerWidth; H = innerHeight;
  if (oW > 50 && oH > 50 && isFinite(view.k)) {
    // keep the same world point at screen center
    view.x += (W - oW) / 2; view.y += (H - oH) / 2;
  }
  if (!touched && !panelOpen && !tw && W > 50) Object.assign(view, fitView());
  const dpr = devicePixelRatio || 1;
  [sc, wc].forEach(c => { c.width = W * dpr; c.height = H * dpr; });
  seedStars(); apply();
}

/* ================= warp ================= */
const wc = $("warp"), wx = wc.getContext("2d");
let warp = null;
function startWarp(ox, oy, color, dir, dur) {
  const parts = Array.from({ length: 520 }, () => ({ a: Math.random() * 6.283, z: Math.random() * 0.95 + 0.05, w: Math.random() }));
  warp = { t0: performance.now(), last: performance.now(), ox, oy, color, dir, dur, parts };
  wc.classList.add("on");
  requestAnimationFrame(tickWarp);
}
function tickWarp(now) {
  if (!warp) return;
  const { t0, dur, parts, color, dir } = warp;
  const t = Math.min(1, (now - t0) / dur), dt = Math.min(50, now - warp.last) / 1000;
  warp.last = now;
  const dpr = devicePixelRatio || 1;
  wx.setTransform(dpr, 0, 0, dpr, 0, 0);
  wx.clearRect(0, 0, W, H);
  const e = ease.inOut(Math.min(1, t * 1.4));
  const ox = warp.ox + (W / 2 - warp.ox) * e, oy = warp.oy + (H / 2 - warp.oy) * e;
  const sp = dir > 0 ? 0.15 + 3.2 * t * t : 0.15 + 2.6 * (1 - t) * (1 - t);
  const F = Math.max(W, H) * 0.05;
  wx.lineCap = "round";
  for (const p of parts) {
    p.z -= dir * sp * dt;
    if (p.z <= 0.02) { p.z = 1; p.a = Math.random() * 6.283; }
    if (p.z > 1) { p.z = 0.03; p.a = Math.random() * 6.283; }
    const r = F / p.z, r0 = F / (p.z + sp * 0.09 * (dir > 0 ? 1 : -1));
    const ca = Math.cos(p.a), sa = Math.sin(p.a);
    const alpha = Math.min(1, (1 - p.z) * 1.3) * (dir > 0 ? Math.min(1, t * 3) : Math.min(1, (1 - t) * 2.5));
    wx.strokeStyle = p.w > 0.55 ? color : "#ffffff";
    wx.globalAlpha = alpha;
    wx.lineWidth = 0.6 + (1 - p.z) * 2.2;
    wx.beginPath(); wx.moveTo(ox + ca * r0, oy + sa * r0); wx.lineTo(ox + ca * r, oy + sa * r); wx.stroke();
  }
  wx.globalAlpha = 1;
  if (t < 1) requestAnimationFrame(tickWarp);
  else { warp = null; wc.classList.remove("on"); }
}
function flash(color) {
  const f = $("flash");
  f.style.setProperty("--c", color);
  f.classList.remove("go"); void f.offsetWidth; f.classList.add("go");
}

/* ================= panel ================= */
const panel = $("panel");
let panelOpen = false, cur = null, busy = false;
function warpTo(d) {
  if (!d || busy) return;
  busy = true; hideTip(); clearHL();
  if (panelOpen) { hopTo(d); return; }
  const sxp = view.x + d.x * view.k, syp = view.y + d.y * view.k;
  document.documentElement.style.setProperty("--c", d.color);
  startWarp(sxp, syp, d.color, 1, 1350);
  svg.classList.add("warping");
  const tk = 9;
  tween({ k: tk, x: W / 2 - d.x * tk, y: H / 2 - d.y * tk }, 1250, ease.inExpo);
  setTimeout(() => flash(d.color), 950);
  setTimeout(() => { openPanel(d); busy = false; }, 1120);
}
function openPanel(d) {
  render(d);
  panel.classList.remove("closing");
  panel.classList.add("open");
  document.body.classList.add("reading");
  panel.setAttribute("aria-hidden", "false");
  panelOpen = true;
  history.replaceState(null, "", "#/" + d.id);
}
function closePanel() {
  if (!panelOpen || busy) return;
  busy = true;
  const d = cur;
  panel.classList.add("closing");
  setTimeout(() => {
    panel.classList.remove("open", "closing");
    document.body.classList.remove("reading");
    panel.setAttribute("aria-hidden", "true");
    panelOpen = false;
    svg.classList.remove("warping");
    startWarp(W / 2, H / 2, d.color, -1, 900);
    const k = Math.max(fitView().k * 1.7, 0.95);
    const [x, y] = P(R2 + 70, d.ang);
    tween({ k, x: W / 2 - x * k, y: H / 2 - y * k }, 1100, ease.outExpo, () => (busy = false));
    history.replaceState(null, "", location.pathname + location.search);
  }, 380);
}
function hopTo(d) {
  panel.classList.add("hopping");
  startWarp(W / 2, H / 2, d.color, 1, 750);
  setTimeout(() => {
    document.documentElement.style.setProperty("--c", d.color);
    render(d);
    $("pScroll").scrollTop = 0;
    history.replaceState(null, "", "#/" + d.id);
    const tk = 9; view.k = tk; view.x = W / 2 - d.x * tk; view.y = H / 2 - d.y * tk; apply();
    requestAnimationFrame(() => panel.classList.remove("hopping"));
    busy = false;
  }, 420);
}
$("btnBack").addEventListener("click", closePanel);
const neighbor = s => DOMS[(DOMS.indexOf(cur) + s + DOMS.length) % DOMS.length];
$("btnPrev").addEventListener("click", () => warpTo(neighbor(-1)));
$("btnNext").addEventListener("click", () => warpTo(neighbor(1)));
addEventListener("keydown", e => {
  if (e.target === q) return;
  if (e.key === "/" && !panelOpen) { e.preventDefault(); q.focus(); }
  if (!panelOpen) return;
  if (e.key === "Escape") closePanel();
  if (e.key === "ArrowLeft") warpTo(neighbor(-1));
  if (e.key === "ArrowRight") warpTo(neighbor(1));
});

const SECS = [
  ["ov", "领域综述"], ["fr", "最前沿在做什么"], ["id", "有品味的 idea"], ["pre", "入场需要什么"],
  ["how", "大家怎么做"], ["fit", "适合你吗"], ["trial", "两周试错路线"], ["pp", "必读论文"]
];
const METERS = ["入门门槛", "算力需求", "拥挤程度", "产业需求"];
const scholar = t => "https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + t + '"');
function paperList(arr) {
  return `<ul class="papers">${(arr || []).map(p => `<li><div class="yr">${p[2]}</div><div><a href="${scholar(p[0])}" target="_blank" rel="noopener">${esc(p[0])}</a><div class="meta">${esc(p[1])} · ${esc(p[3])}</div>${p[4] ? `<div class="why">${p[4]}</div>` : ""}</div></li>`).join("")}</ul>`;
}
function sec(id, n, title, lead, body) {
  return `<section class="sec" id="s-${id}"><h3><small>${String(n).padStart(2, "0")}</small>${title}</h3>${lead ? `<p class="lead">${lead}</p>` : ""}${body}</section>`;
}
function render(d) {
  cur = d;
  const b = BR[d.branch];
  panel.style.setProperty("--c", d.color);
  $("crumb").innerHTML = `AI / ${b.name} / <b>${d.id} ${esc(d.name)}</b>`;
  $("prevName").textContent = neighbor(-1).name;
  $("nextName").textContent = neighbor(1).name;
  $("toc").innerHTML = SECS.map((s, i) => `<a href="#s-${s[0]}" data-s="${s[0]}"><small>${String(i + 1).padStart(2, "0")}</small>${s[1]}</a>`).join("");
  const m = d.meters || [3, 3, 3, 3];
  const S = d.setup || {};
  let h = `<header class="hero"><div class="bignum">${d.id}</div><div class="kicker">${b.name} · ${b.en}</div><h2>${esc(d.name)}</h2><div class="en">${esc(d.en)}</div><p class="tag">${d.tagline}</p>
    <div class="meters">${METERS.map((l, i) => `<div class="meter"><span>${l}</span><b>${m[i]}/5</b><div class="dots">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= m[i] ? "f" : ""}"></i>`).join("")}</div></div>`).join("")}</div>
    <div class="chips">${(d.leaves || []).map(t => `<span>${esc(t)}</span>`).join("")}</div></header>`;
  h += sec("ov", 1, "领域综述", "这个领域在解决什么、怎么走到今天、现在的格局。", (d.overview || []).map(p => `<p>${p}</p>`).join(""));
  h += sec("fr", 2, "最前沿在做什么", "截至 2026 年的主线与热点。", `<div class="grid2">${(d.frontier || []).map(f => `<div class="card"><h4>${f[0]}</h4><p>${f[1]}</p></div>`).join("")}</div>`);
  h += sec("id", 3, "现在还能做的、有品味的 idea", "标准：问题本身重要、可证伪、不靠堆算力、做完能改变别人的做法。", (d.ideas || []).map((x, i) => `<div class="idea"><div class="n">${String(i + 1).padStart(2, "0")}</div><div><h4>${x[0]}</h4><dl><dt>为什么有品味</dt><dd>${x[1]}</dd><dt>最小实验</dt><dd>${x[2]}</dd></dl></div></div>`).join(""));
  const pre = d.prereq || {};
  h += sec("pre", 4, "入场需要什么", "缺一项「必须」就先补，否则会在复现阶段卡很久。", `<div class="grid2"><div><p class="colhead">必须掌握</p><ul class="checks">${(pre.must || []).map(x => `<li>${x}</li>`).join("")}</ul></div><div><p class="colhead">加分项</p><ul class="checks nice">${(pre.nice || []).map(x => `<li>${x}</li>`).join("")}</ul></div></div>`);
  const rows = [["典型数据", S.data], ["典型算力", S.compute], ["代码底座", S.code], ["基准与指标", S.bench], ["大家在改什么", S.improve], ["发表去处", S.venue]].filter(r => r[1]);
  h += sec("how", 5, "大家怎么做", "行业默认配置：数据多大、用多少卡、在哪个代码上改、改什么。", `<table class="spec">${rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</table><p class="colhead" style="margin-top:30px">一篇典型论文的生产流程</p><ol class="steps">${(d.recipe || []).map(x => `<li>${x}</li>`).join("")}</ol>`);
  const fit = d.fit || {};
  h += sec("fit", 6, "适合你吗", "快速自检，省掉沉没成本。", `<div class="fit"><div class="y"><h4>适合你，如果</h4><ul>${(fit.yes || []).map(x => `<li>${x}</li>`).join("")}</ul></div><div class="n"><h4>慎入，如果</h4><ul>${(fit.no || []).map(x => `<li>${x}</li>`).join("")}</ul></div></div>`);
  h += sec("trial", 7, "两周试错路线", "做完这些，你就能判断要不要继续投入。", `<ol class="trial">${(d.trial || []).map(t => `<li><b>${t[0]}</b>${t[1]}</li>`).join("")}</ol>`);
  h += sec("pp", 8, "必读论文", "标题链接到 Google Scholar 检索。先读经典建立坐标系，再读前沿找空白。", `<div class="ptabs"><h4>经典 · 建立坐标系</h4></div>${paperList(d.classic)}<div class="ptabs"><h4>前沿 · 找空白</h4></div>${paperList(d.recent)}`);
  h += `<div class="foot">内容截至 2026 年中，数据规模与算力为量级参考，实际以原论文为准。发现错误或想补充？欢迎在 <a style="color:var(--c)" href="https://github.com/Wang-auspicious/ResAIrch" target="_blank" rel="noopener">GitHub</a> 提 Issue / PR。</div>`;
  $("doc").innerHTML = h;
  setupToc();
}
let io = null;
function setupToc() {
  if (io) io.disconnect();
  const links = [...$("toc").querySelectorAll("a")];
  links.forEach(a => a.addEventListener("click", e => { e.preventDefault(); $("s-" + a.dataset.s).scrollIntoView({ behavior: "smooth" }); }));
  io = new IntersectionObserver(es => {
    es.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.id.slice(2);
        links.forEach(a => a.classList.toggle("on", a.dataset.s === id));
      }
    });
  }, { root: $("pScroll"), rootMargin: "-20% 0px -70% 0px" });
  $("doc").querySelectorAll(".sec").forEach(s => io.observe(s));
}

/* ================= boot ================= */
addEventListener("resize", () => { resize(); if (!panelOpen) apply(); });
resize();
Object.assign(view, fitView());
const intro = { ...view };
view.k = intro.k * 0.55; apply();
tween(intro, 1800, ease.out);
requestAnimationFrame(twinkle);
const m = location.hash.match(/^#\/(\d+)/);
if (m && byId[m[1]]) setTimeout(() => warpTo(byId[m[1]]), 900);
setTimeout(() => ($("hint").style.opacity = 0.6), 6000);
})();
