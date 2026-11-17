import * as THREE from 'three';

/* =========================================================
   PROJECT DATA — edit titles / text here
   ========================================================= */
const M = 'media/';
const PROJECTS = [
  { id:'showreel', hidden:true, cat:'', title:'AJK Showreel', client:'AJK Visual Studio', type:'Showreel', year:'2026',
    desc:'A quick cut through our recent work — brand films, mashups, titles and 3D.',
    media:[{v:'hero-loop'}] },
  { id:'agafi-desire', layout:'wide', cat:'Commercial', title:'The Art of Desire', client:'AGAFI Group', type:'Brand Film · 4K', year:'2026',
    cover:'agafi-desire-poster.jpg', preview:'agafi-desire-preview.mp4',
    desc:'A sensual, slow-burn luxury brand film for AGAFI Group — shot, edited and graded for a cinema-grade 4K master.',
    media:[{v:'agafi-desire'}] },
  { id:'sfc-mashup', layout:'half', cat:'Fan Club', title:'SFC UAE — Final Mashup', client:'Suriya Fans Club UAE', type:'Mashup · Edit · Color', year:'2026',
    cover:'sfc-mashup-poster.jpg', preview:'sfc-mashup-preview.mp4',
    desc:'A three-minute, high-energy mashup celebrating Suriya, built for the big screen with a matching cinematic title and key art.',
    media:[{v:'sfc-mashup'},{i:'sfc-blockbuster'}] },
  { id:'agafi-retail', layout:'half', cat:'Commercial', title:'Built To Move', client:'AGAFI Group', type:'Retail Commercial · 4K', year:'2026',
    cover:'agafi-retail-poster.jpg', preview:'agafi-retail-preview.mp4',
    desc:'A fast-cut retail commercial for AGAFI Group — rhythm, motion and product, finished in 4K.',
    media:[{v:'agafi-retail'}] },
  { id:'mfc-athimanoharam', layout:'third', cat:'Fan Club', title:'Athimanoharam — 6.5M Views', client:'Mohanlal Fans Club UAE', type:'Vertical Reel', year:'2026',
    cover:'mfc-athimanoharam-poster.jpg', preview:'mfc-athimanoharam-preview.mp4',
    desc:'A vertical reel edit for Mohanlal Fans Club UAE that crossed 6.5 million views.',
    media:[{v:'mfc-athimanoharam', vert:true}] },
  { id:'hala-mohanlal', layout:'third', cat:'Fan Club', title:'Hala Mohanlal', client:'Hala Mohanlal UAE', type:'Event Reel · Posters', year:'2026',
    cover:'hala-reel-poster.jpg', preview:'hala-reel-preview.mp4',
    desc:'Event reel and a full poster campaign for Hala Mohanlal UAE — Ladies Wing, Team Tharuni and The Dance Junction.',
    media:[{v:'hala-reel', vert:true},{i:'hala-ladies-wing'},{i:'hala-tharuni'},{i:'hala-dance-junction'}] },
  { id:'mfc-bigmashup', layout:'third', cat:'Design', title:'Big Mashup — Key Art', client:'Mohanlal Fans Club UAE', type:'Posters · 4K Key Art', year:'2026',
    cover:'mfc-mashup-effects-thumb.webp',
    desc:'Movie-style key art for the Big Mashup premiere — 4K posters plus feed and story formats.',
    media:[{i:'mfc-mashup-effects'},{i:'mfc-mashup-og'},{i:'mfc-poster-v2'},{i:'mfc-post'},{i:'mfc-story'}] },
  { id:'ajk-logo', layout:'half', cat:'VFX', title:'AJK Logo Reveal', client:'AJK Visual Studio', type:'3D · Blender', year:'2026',
    cover:'ajk-logo-poster.jpg', preview:'ajk-logo-preview.mp4',
    desc:'Our own studio identity brought to life — a gold 3D logo animation built and rendered in Blender.',
    media:[{v:'ajk-logo'}] },
  { id:'sfc-title', layout:'half', cat:'VFX', title:'Cinematic Title', client:'Suriya Fans Club UAE', type:'Title Design · VFX', year:'2026',
    cover:'sfc-title-poster.jpg', preview:'sfc-title-preview.mp4',
    desc:'A cinematic title sequence for Suriya Fans Club UAE — type, light and atmosphere.',
    media:[{v:'sfc-title'}] },
  { id:'agafi-brooch', layout:'half', cat:'Design', title:'AGAFI Signature Brooch', client:'AGAFI Group', type:'Product Design · Visuals', year:'2026',
    cover:'brooch-01-thumb.webp',
    desc:'Signature lapel brooch and emblem pins for AGAFI — designed and visualised across eight styles, from mirror gold to black enamel.',
    media:['01','02','03','04','05','06','07','08'].map(n=>({i:'brooch-'+n})) },
  { id:'agafi-identity', layout:'half', cat:'Design', title:'AGAFI Creative Identity', client:'AGAFI Creative', type:'Logo · Brand Identity', year:'2026',
    cover:'logo-agafi-thumb.webp', contain:true,
    desc:'A metallic gold wordmark and monogram for AGAFI Creative.',
    media:[{i:'logo-agafi', full:true}] },
];

/* =========================================================
   SMOOTH SCROLL
   ========================================================= */
gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis = new Lenis({ lerp: 0.085, smoothWheel: !reduce });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
lenis.stop();
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = a.getAttribute('href'); if (t.length < 2) return;
  e.preventDefault(); lenis.scrollTo(t === '#top' ? 0 : t, { offset: -20, duration: 1.8 });
}));

/* =========================================================
   REVEALS (mask / up / fade)
   ========================================================= */
const revealIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target;
  el.style.setProperty('--rv-delay', (+(el.dataset.delay || 0) / 1000) + 's');
  el.setAttribute('data-rv', '');
  revealIO.unobserve(el);
}), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
const observeReveals = root => root.querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => {
  if (!el.closest('.hero')) revealIO.observe(el);
});

/* statement — words light up while scrolling */
const statement = document.querySelector('[data-words]');
const words = statement.textContent.trim().split(/\s+/);
statement.innerHTML = words.map(w => `<span>${w}</span>`).join(' ');
const wordEls = [...statement.children];
ScrollTrigger.create({ trigger: statement, start: 'top 82%', end: 'bottom 45%', scrub: true,
  onUpdate: s => { const n = Math.round(s.progress * wordEls.length); wordEls.forEach((w, i) => w.toggleAttribute('data-lit', i < n)); } });

/* =========================================================
   WEBGL STAGE (hero) — video + spotlight shader + gold dust
   ========================================================= */
const DPR = Math.min(devicePixelRatio, 2);
const stageCanvas = document.getElementById('stage');
const heroVideo = document.getElementById('heroVideo');
let stage = null;

function initStage() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: stageCanvas, antialias: false, powerPreference: 'high-performance' }); }
  catch (e) { document.documentElement.classList.add('no-webgl'); return null; }
  renderer.setPixelRatio(Math.min(DPR, 1.5));
  renderer.autoClear = false;

  const tex = new THREE.VideoTexture(heroVideo);
  tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter;

  const u = {
    uVideo: { value: tex }, uRes: { value: new THREE.Vector2(1, 1) }, uVidRes: { value: new THREE.Vector2(1280, 720) },
    uMouse: { value: new THREE.Vector2(.66, .58) }, uTime: { value: 0 }, uMove: { value: 0 }, uScroll: { value: 0 }, uIntro: { value: 0 },
  };
  const quadScene = new THREE.Scene(), quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: /* glsl */`
      precision highp float;
      uniform sampler2D uVideo; uniform vec2 uRes, uVidRes, uMouse;
      uniform float uTime, uMove, uScroll, uIntro;
      varying vec2 vUv;
      vec2 cover(vec2 uv){
        float sa = uRes.x/uRes.y, va = uVidRes.x/uVidRes.y;
        vec2 s = sa > va ? vec2(1., va/sa) : vec2(sa/va, 1.);
        return (uv - .5) * s + .5;
      }
      float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      void main(){
        vec2 uv = vUv;
        float aspect = uRes.x / uRes.y;
        vec2 d = (uv - uMouse) * vec2(aspect, 1.);
        float dist = length(d);
        vec2 n = normalize(d + 1e-5);
        vec2 vuv = cover((uv - .5) * (1. - uScroll * .14) + .5);
        // ripple that follows the cursor
        vuv += n * sin(dist * 34. - uTime * 4.) * .007 * smoothstep(.42, 0., dist) * uMove;
        // chromatic split
        vec2 ca = n * (.0012 + .005 * uMove * smoothstep(.5, 0., dist));
        vec3 col = vec3(texture2D(uVideo, vuv + ca).r, texture2D(uVideo, vuv).g, texture2D(uVideo, vuv - ca).b);
        // warm cinematic grade
        float l = dot(col, vec3(.299, .587, .114));
        col = mix(vec3(l), col, .78) * vec3(1.05, 1., .9);
        // stage spotlight
        float spot = smoothstep(.65, 0., dist);
        col *= .4 + .95 * spot;
        col += vec3(.79, .67, .47) * .11 * smoothstep(.32, 0., dist);
        // scrims: left + bottom for the headline
        col *= mix(.42, 1., smoothstep(0., .7, uv.x));
        col *= mix(.35, 1., smoothstep(0., .5, uv.y));
        col *= 1. - smoothstep(.55, 1.25, length((uv - .5) * vec2(aspect * .75, 1.)));
        // film grain
        col += (hash(uv * uRes + fract(uTime * 7.) * 91.) - .5) * .055;
        col *= uIntro * (1. - uScroll * .7);
        gl_FragColor = vec4(col, 1.);
      }`,
    depthTest: false, depthWrite: false,
  })));

  // floating gold dust in the light
  const dustScene = new THREE.Scene();
  const dustCam = new THREE.PerspectiveCamera(40, 1, .1, 50); dustCam.position.z = 8;
  const N = innerWidth < 760 ? 500 : 1200, p = new Float32Array(N * 3), sd = new Float32Array(N);
  for (let i = 0; i < N; i++) { p[i*3] = (Math.random() - .5) * 16; p[i*3+1] = (Math.random() - .5) * 10; p[i*3+2] = (Math.random() - .5) * 6; sd[i] = Math.random(); }
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.BufferAttribute(p, 3)); dg.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));
  const du = { uTime: u.uTime, uMouse3: { value: new THREE.Vector3() }, uIntro: u.uIntro, uPR: { value: renderer.getPixelRatio() } };
  dustScene.add(new THREE.Points(dg, new THREE.ShaderMaterial({
    uniforms: du, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */`
      uniform float uTime, uPR; uniform vec3 uMouse3; attribute float aSeed; varying float vA;
      void main(){
        vec3 q = position;
        q.y = mod(q.y + uTime * (.05 + aSeed * .12) + 5., 10.) - 5.;
        q.x += sin(uTime * .3 + aSeed * 20.) * .3;
        float near = smoothstep(3.2, 0., distance(q.xy, uMouse3.xy));
        vA = (.12 + near * .9) * (.4 + aSeed * .6);
        vec4 mv = modelViewMatrix * vec4(q, 1.);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (2. + aSeed * 4. + near * 3.) * uPR * (6. / -mv.z);
      }`,
    fragmentShader: /* glsl */`
      uniform float uIntro; varying float vA;
      void main(){ float d = length(gl_PointCoord - .5); if (d > .5) discard;
        gl_FragColor = vec4(.86, .74, .52, smoothstep(.5, 0., d) * vA * uIntro); }`,
  })));

  const target = new THREE.Vector2(.66, .58), last = new THREE.Vector2(.66, .58);
  let hasPointer = false, move = 0;
  stageCanvas.parentElement.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const r = stageCanvas.getBoundingClientRect();
    target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    hasPointer = true;
  });

  function resize() {
    const w = stageCanvas.clientWidth, h = stageCanvas.clientHeight;
    renderer.setSize(w, h, false);
    u.uRes.value.set(w, h);
    dustCam.aspect = w / h; dustCam.updateProjectionMatrix();
  }
  heroVideo.addEventListener('loadedmetadata', () => u.uVidRes.value.set(heroVideo.videoWidth, heroVideo.videoHeight));
  resize(); addEventListener('resize', resize);

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? heroVideo.play().catch(() => {}) : heroVideo.pause(); }).observe(stageCanvas);

  return {
    u,
    render(t) {
      if (!visible) return;
      u.uTime.value = t;
      if (!hasPointer) target.set(.62 + Math.sin(t * .35) * .2, .55 + Math.cos(t * .27) * .14);
      const m = u.uMouse.value;
      m.lerp(target, .06);
      move += (Math.min(1, last.distanceTo(m) * 60) - move) * .08;
      last.copy(m);
      u.uMove.value = move;
      const visH = 2 * dustCam.position.z * Math.tan(THREE.MathUtils.degToRad(20));
      du.uMouse3.value.set((m.x - .5) * visH * dustCam.aspect, (m.y - .5) * visH, 0);
      renderer.clear();
      renderer.render(quadScene, quadCam);
      renderer.render(dustScene, dustCam);
    }
  };
}

const clock = new THREE.Clock();
function tick() {
  requestAnimationFrame(tick);
  stage?.render(clock.getElapsedTime());
}

/* =========================================================
   PRELOADER → HERO
   ========================================================= */
const identVideo = document.getElementById('identVideo');
const videoReady = new Promise(r => { if (heroVideo.readyState >= 2) r(); heroVideo.addEventListener('loadeddata', r, { once: true }); setTimeout(r, 2500); });
const identReady = new Promise(r => { if (identVideo.readyState >= 2) r(); identVideo.addEventListener('loadeddata', r, { once: true }); setTimeout(r, 2500); });
const pageReady = new Promise(r => { if (document.readyState === 'complete') return r(); addEventListener('load', r); setTimeout(r, 2500); });   // don't wait for big videos

// loader: the AJK logo reveals itself, the name types in, a gold line draws
const nameEl = document.querySelector('.loader-name');
nameEl.innerHTML = nameEl.textContent.split('').map(c => c === ' ' ? '<span>&nbsp;</span>' : `<span>${c}</span>`).join('');
const loaderIn = new Promise(r => {
  setTimeout(r, 3600);   // timer backup: always open the site after the logo moment
  gsap.timeline({ onComplete: r })
    .fromTo('.loader-mark', { clipPath: 'inset(50% 0% 50% 0%)', scale: 1.25, filter: 'blur(14px) brightness(2)' },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, filter: 'blur(0px) brightness(1)', duration: 1.6, ease: 'expo.out' })
    .from('.loader-name span', { yPercent: 110, opacity: 0, duration: .9, stagger: .035, ease: 'expo.out' }, '-=.9')
    .to('.loader-line', { scaleX: 1, duration: 1, ease: 'expo.inOut' }, '-=.7')
    .to('.loader-tag', { opacity: 1, duration: .8 }, '-=.5')
    .to({}, { duration: .6 });   // hold on the logo for a beat
});

Promise.all([videoReady, identReady, pageReady, loaderIn]).then(() => {
  stage = initStage();
  heroVideo.play().catch(() => {});
  tick();
  intro();
});

// curtains open: logo pushes toward camera, panels part, site appears
function intro() {
  gsap.timeline()
    .to('.loader-center', { scale: 1.12, opacity: 0, filter: 'blur(8px)', duration: .8, ease: 'power3.in' })
    .to('.lp-top', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' }, '-=.2')
    .to('.lp-bot', { yPercent: 100, duration: 1.2, ease: 'expo.inOut' }, '<')
    .set('#loader', { display: 'none' });
  if (stage) gsap.to(stage.u.uIntro, { value: 1, duration: 2.4, ease: 'power2.out', delay: .7 });
  // studio logo film starts from the beginning as the hero opens
  identVideo.currentTime = 0; identVideo.play().catch(() => {});
  gsap.fromTo('.hero-ident', { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: 2, ease: 'expo.out', delay: 1 });
  gsap.to('.hero-ident', { yPercent: -25, opacity: 0, ease: 'none', immediateRender: false,
    scrollTrigger: { trigger: '.hero', start: '20% top', end: 'bottom top', scrub: true } });
  setTimeout(revealHero, 900);
}
// plays the reveal once and holds on the gold logo; replays when you scroll back up to it
let identLeft = false;
new IntersectionObserver(([e]) => {
  if (!e.isIntersecting) { identLeft = true; identVideo.pause(); return; }
  if (identLeft && identVideo.ended) identVideo.currentTime = 0;
  identLeft = false;
  if (!identVideo.ended) identVideo.play().catch(() => {});
}).observe(identVideo);

function revealHero() {
  document.querySelectorAll('.hero [data-reveal]').forEach(el => {
    el.style.setProperty('--rv-delay', (+(el.dataset.delay || 0) / 1000) + 's'); el.setAttribute('data-rv', '');
  });
  observeReveals(document);
  lenis.start();
  gsap.fromTo('.nav', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' });
  if (stage) gsap.to(stage.u.uScroll, { value: 1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-body', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true } });
}

/* =========================================================
   WORK GRID
   ========================================================= */
const grid = document.getElementById('grid');
const layoutClass = { wide: 'card wide', half: 'card', third: 'card third' };
const GRID = PROJECTS.filter(p => !p.hidden);
grid.innerHTML = GRID.map((p, i) => `
  <article class="${layoutClass[p.layout]}" data-id="${p.id}" data-cat="${p.cat}" data-cursor="View" data-reveal="up" data-delay="${(i % 3) * 90}">
    <div class="card-media">
      <img src="${M + p.cover}" alt="${p.title} — ${p.client}" loading="lazy" ${p.contain ? 'style="object-fit:contain;padding:12%"' : ''}>
      ${p.preview ? `<video muted loop playsinline preload="none" data-src="${M + p.preview}"></video>` : ''}
    </div>
    <div class="card-meta"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${p.title}</h3><p><b>${p.client}</b>${p.type}</p></div>
  </article>`).join('');

const cats = ['All', ...new Set(GRID.map(p => p.cat))];
const filters = document.getElementById('filters');
filters.innerHTML = cats.map((c, i) => `<button class="${i ? '' : 'on'}" data-f="${c}">${c}</button>`).join('');
filters.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  filters.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  grid.querySelectorAll('.card').forEach(c => c.classList.toggle('hide', b.dataset.f !== 'All' && c.dataset.cat !== b.dataset.f));
  ScrollTrigger.refresh();
});

grid.querySelectorAll('.card').forEach(card => {
  const vid = card.querySelector('video');
  card.addEventListener('mouseenter', () => {
    if (!vid) return;
    if (!vid.src) { vid.src = vid.dataset.src; vid.addEventListener('playing', () => vid.classList.add('ready'), { once: true }); }
    vid.play().catch(() => {});
  });
  card.addEventListener('mouseleave', () => vid?.pause());
  card.addEventListener('click', () => openProject(card.dataset.id));
});

/* =========================================================
   PROJECT OVERLAY
   ========================================================= */
const overlay = document.getElementById('overlay'), ovInner = document.getElementById('ovInner');
overlay.setAttribute('data-lenis-prevent', '');
function openProject(id) {
  const p = PROJECTS.find(x => x.id === id); if (!p) return;
  const items = p.media.map((m, i) => m.v
    ? `<div class="${m.vert ? 'vert' : 'full'}"><video controls playsinline preload="metadata" poster="${M}${m.v}-poster.jpg" src="${M}${m.v}.mp4"></video></div>`
    : `<div class="${m.full || p.media.length === 1 ? 'full' : ''}"><img src="${M}${m.i}.webp" alt="${p.title} ${i + 1}" loading="lazy"></div>`).join('');
  ovInner.innerHTML = `
    <div class="ov-head"><span class="eyebrow">${p.client}</span><h2>${p.title}</h2></div>
    <div class="ov-info">
      <div><span class="eyebrow quiet">Client</span><b>${p.client}</b></div>
      <div><span class="eyebrow quiet">Work</span><b>${p.type}</b></div>
      <div><span class="eyebrow quiet">Year</span><b>${p.year}</b></div>
      <p>${p.desc}</p>
    </div>
    <div class="ov-media">${items}</div>`;
  overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); overlay.scrollTop = 0;
  document.body.classList.add('locked'); lenis.stop();
  gsap.from('.ov-head > *, .ov-info, .ov-media > *', { y: 50, opacity: 0, duration: 1.1, stagger: .06, ease: 'expo.out', delay: .1 });
  ovInner.querySelector('video')?.play().catch(() => {});
  setCursor(null);
}
function closeProject() {
  overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked'); lenis.start();
  setTimeout(() => { ovInner.innerHTML = ''; }, 500);
}
document.getElementById('ovClose').addEventListener('click', closeProject);
addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeProject(); });

/* =========================================================
   SCROLL EXTRAS
   ========================================================= */
gsap.fromTo('.founder-media img', { yPercent: -6 }, { yPercent: 6, ease: 'none',
  scrollTrigger: { trigger: '.founder', start: 'top bottom', end: 'bottom top', scrub: true } });
document.querySelectorAll('.svc-card').forEach(c => c.addEventListener('pointermove', e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count, dec = +(el.dataset.dec || 0), o = { v: 0 };
  gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => el.textContent = o.v.toFixed(dec) });
});
const nav = document.querySelector('.nav');
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => nav.classList.toggle('scrolled', s.scroll() > 60) });

/* =========================================================
   CURSOR
   ========================================================= */
const cursor = document.getElementById('cursor'), cursorText = document.getElementById('cursorText');
const cpos = { x: innerWidth / 2, y: innerHeight / 2 }, ct = { ...cpos };
addEventListener('pointermove', e => { ct.x = e.clientX; ct.y = e.clientY; });
gsap.ticker.add(() => { cpos.x += (ct.x - cpos.x) * .2; cpos.y += (ct.y - cpos.y) * .2; cursor.style.transform = `translate(${cpos.x}px,${cpos.y}px)`; });
function setCursor(text) { cursor.classList.toggle('big', !!text); cursorText.textContent = text || ''; }
document.addEventListener('pointerover', e => {
  const t = e.target.closest('[data-cursor]');
  setCursor(t && !overlay.classList.contains('open') ? t.dataset.cursor : null);
});

/* =========================================================
   CONTACT FORM (Web3Forms → Gmail)
   ========================================================= */
const form = document.getElementById('contactForm');
const cfStatus = document.getElementById('cfStatus'), cfSend = document.getElementById('cfSend');
form.addEventListener('submit', async e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    const bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
    f.closest('.cf').classList.toggle('err', bad); if (bad) ok = false;
  });
  if (!ok) { cfStatus.className = 'cf-status bad'; cfStatus.textContent = 'Please fill in the highlighted fields.'; return; }
  if (form.access_key.value.startsWith('YOUR_')) { cfStatus.className = 'cf-status bad'; cfStatus.textContent = 'The form is not connected yet — please use WhatsApp for now.'; return; }
  cfSend.disabled = true; cfStatus.className = 'cf-status'; cfStatus.textContent = 'Sending…';
  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    form.reset();
    cfStatus.className = 'cf-status ok'; cfStatus.textContent = 'Thank you — your message is on its way. We usually reply within a day.';
  } catch (err) {
    cfStatus.className = 'cf-status bad'; cfStatus.textContent = 'Something went wrong. Please try again in a moment.';
  } finally { cfSend.disabled = false; }
});
form.querySelectorAll('[required]').forEach(f => f.addEventListener('input', () => f.closest('.cf').classList.remove('err')));

/* =========================================================
   MISC
   ========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();
const clockEl = document.getElementById('clock');
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' });
const updClock = () => clockEl.textContent = `${fmt.format(new Date())} GST`;
updClock(); setInterval(updClock, 30000);
