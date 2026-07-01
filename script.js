
function __lf(s,w,h){var n=0,x=String(s);for(var i=0;i<x.length;i++){n=(n*31+x.charCodeAt(i))>>>0;}return 'https://loremflickr.com/'+w+'/'+h+'/tattoo?lock='+(n%100000);}
function __av(s){return 'https://i.pravatar.cc/200?u=ironink'+encodeURIComponent(String(s));}
/* ===================== IRON & INK — script.js ===================== */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  const hamburger = $('#hamburger');
  const nav = $('#main-nav');
  function closeNav() {
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', (e) => { if (e.target.tagName === 'A') closeNav(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });

  /* ===================== (a) PORTFOLIO GALLERY ===================== */
  const works = [
    { seed: 'ii-bw1', cat: 'blackwork', title: 'Ornamental sleeve', artist: 'Mara Voss', tall: true },
    { seed: 'ii-fl1', cat: 'fineline', title: 'Botanical fine-line', artist: 'Theo Kane' },
    { seed: 'ii-re1', cat: 'realism', title: 'Portrait, forearm', artist: 'Priya Raman' },
    { seed: 'ii-tr1', cat: 'traditional', title: 'Bold traditional panther', artist: 'Dex Holloway' },
    { seed: 'ii-bw2', cat: 'blackwork', title: 'Geometric backpiece', artist: 'Mara Voss' },
    { seed: 'ii-pi1', cat: 'piercing', title: 'Curated ear stack', artist: 'Nadia Birk', tall: true },
    { seed: 'ii-fl2', cat: 'fineline', title: 'Script & dotwork', artist: 'Joss Pell' },
    { seed: 'ii-re2', cat: 'realism', title: 'Black & grey lion', artist: 'Priya Raman' },
    { seed: 'ii-tr2', cat: 'traditional', title: 'Swallow & rose', artist: 'Dex Holloway' },
    { seed: 'ii-bw3', cat: 'blackwork', title: 'Negative-space mandala', artist: 'Mara Voss' },
    { seed: 'ii-fl3', cat: 'fineline', title: 'Micro floral', artist: 'Theo Kane', tall: true },
    { seed: 'ii-pi2', cat: 'piercing', title: 'Septum & bridge', artist: 'Nadia Birk' },
  ];
  const catLabel = { blackwork: 'Blackwork', fineline: 'Fine line', realism: 'Realism', traditional: 'Traditional', piercing: 'Piercing' };
  const gallery = $('#gallery');
  works.forEach((w, i) => {
    const fig = document.createElement('button');
    fig.type = 'button';
    fig.className = 'gallery-item' + (w.tall ? ' tall' : '');
    fig.dataset.cat = w.cat;
    fig.dataset.index = i;
    fig.setAttribute('aria-label', `View ${w.title} by ${w.artist}`);
    const h = w.tall ? 1000 : 600;
    fig.innerHTML =
      `<img src="${__lf(w.seed, 600, h)}" width="600" height="${h}" alt="${w.title} tattoo by ${w.artist}" loading="lazy" />` +
      `<figcaption><span class="cat-tag">${catLabel[w.cat]}</span>${w.title} · ${w.artist}</figcaption>`;
    gallery.appendChild(fig);
  });

  // filters
  $$('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.filter').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      $$('.gallery-item').forEach((item) => {
        item.classList.toggle('hide', !(f === 'all' || item.dataset.cat === f));
      });
    });
  });

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('#lb-img'), lbCap = $('#lb-cap');
  let visible = [], pos = 0, lastFocus = null;
  function openLB(index) {
    visible = $$('.gallery-item').filter((el) => !el.classList.contains('hide'));
    pos = visible.findIndex((el) => Number(el.dataset.index) === index);
    if (pos < 0) pos = 0;
    lastFocus = document.activeElement;
    renderLB();
    lb.hidden = false;
    $('#lb-close').focus();
  }
  function renderLB() {
    const w = works[Number(visible[pos].dataset.index)];
    const h = w.tall ? 1400 : 1000;
    lbImg.src = `${__lf(w.seed, 1100, h)}`;
    lbImg.alt = `${w.title} tattoo by ${w.artist}`;
    lbCap.textContent = `${catLabel[w.cat]} — ${w.title} · ${w.artist}`;
  }
  function closeLB() { lb.hidden = true; if (lastFocus) lastFocus.focus(); }
  function step(d) { pos = (pos + d + visible.length) % visible.length; renderLB(); }
  gallery.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) openLB(Number(item.dataset.index));
  });
  $('#lb-close').addEventListener('click', closeLB);
  $('#lb-prev').addEventListener('click', () => step(-1));
  $('#lb-next').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* ===================== ARTISTS ===================== */
  const artists = [
    { seed: 'ii-mara', name: 'Mara Voss', role: 'Blackwork · Ornamental', bio: 'Founder and lead artist. Mara built Iron & Ink around bold, architectural blackwork — mandalas, ornamental sleeves and negative-space pieces that read clean from across a room.', tags: ['Blackwork', 'Ornamental', 'Geometric'] },
    { seed: 'ii-theo', name: 'Theo Kane', role: 'Fine line · Botanical', bio: 'Theo is our delicate-touch specialist. Single-needle florals, micro-realism and the kind of fine-line work that still looks crisp ten years on. Books out months ahead — for good reason.', tags: ['Fine line', 'Floral', 'Micro'] },
    { seed: 'ii-priya', name: 'Priya Raman', role: 'Realism · Black & grey', bio: 'Portraits, animals and photo-real black & grey. Priya trained as an illustrator before tattooing and it shows in every gradient. Patient, precise, and brilliant with skin tones.', tags: ['Realism', 'Black & grey', 'Portrait'] },
    { seed: 'ii-dex', name: 'Dex Holloway', role: 'Traditional · Bold', bio: 'Old-school done right. Dex lays in saturated, high-contrast traditional that ages like leather — panthers, roses, swallows and lettering with proper weight.', tags: ['Traditional', 'Colour', 'Lettering'] },
    { seed: 'ii-joss', name: 'Joss Pell', role: 'Fine line · Lettering', bio: 'Script, dotwork and clean fine-line. Joss is the person you want for meaningful text, fingerprint pieces and minimal designs that need to sit perfectly.', tags: ['Lettering', 'Dotwork', 'Minimal'] },
    { seed: 'ii-nadia', name: 'Nadia Birk', role: 'Piercing · Curated ears', bio: 'Our resident piercer and APP-standard pro. Nadia builds curated ear stacks, does precise body work and stocks implant-grade titanium and solid-gold jewellery.', tags: ['Piercing', 'Curated ear', 'Jewellery'] },
  ];
  const ag = $('#artist-grid');
  artists.forEach((a) => {
    const card = document.createElement('article');
    card.className = 'artist-card reveal';
    card.innerHTML =
      `<div class="artist-photo"><img src="https://loremflickr.com/500/625/tattoo?lock=6730" width="500" height="625" alt="Portrait of tattoo artist ${a.name}" loading="lazy" /></div>` +
      `<div class="artist-body"><h3>${a.name}</h3><p class="artist-role">${a.role}</p><p>${a.bio}</p>` +
      `<div class="artist-tags">${a.tags.map((t) => `<span>${t}</span>`).join('')}</div></div>`;
    ag.appendChild(card);
  });

  /* ===================== REVIEWS ===================== */
  const reviews = [
    { n: 'Liv Townsend', r: 5, src: 'Google', t: 'Mara designed a full ornamental sleeve for me over four sittings. The line work is unreal and it healed perfectly. Spotless studio, zero ego, properly professional.' },
    { n: 'Jordan Eke', r: 5, src: 'Treatwell', t: 'Priya did a portrait of my grandad in black & grey and I genuinely teared up. The detail is photographic. Could not recommend this place more.' },
    { n: 'Amira S.', r: 5, src: 'Google', t: 'Got my ears curated by Nadia. She talked me through every placement, used implant-grade titanium and it was painless. Healed beautifully.' },
    { n: 'Ben Carroll', r: 4, src: 'Google', t: 'Theo nailed a fine-line botanical on my forearm. Booked months out but worth the wait. Knocked a star only because parking nearby is a nightmare.' },
    { n: 'Sasha Klein', r: 5, src: 'Treatwell', t: 'Dex did a traditional swallow and rose — bold, saturated, exactly the brief. The consultation was free and they took the time to get the design right.' },
    { n: 'Marcus O.', r: 5, src: 'Google', t: 'Cleanest studio I have ever been in. New needles out of the packet in front of you, everything autoclaved. You can tell hygiene is taken seriously here.' },
    { n: 'Priya N.', r: 5, src: 'Google', t: 'Joss did delicate script down my spine. The aftercare advice was clear and the healing was smooth. Will be back for my next one.' },
    { n: 'Tom Fielding', r: 5, src: 'Treatwell', t: 'Cover-up of an old holiday tattoo and you genuinely cannot tell anything was there before. Mara is a wizard. Worth every penny.' },
    { n: 'Erin Walsh', r: 4, src: 'Google', t: 'Lovely studio, talented artists and a calm vibe. Deposit system is fair. Only reason for 4 stars is they book up so fast it is hard to get in.' },
  ];
  const initials = (n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const starRow = (r) => Array.from({ length: 5 }, (_, i) => i < r ? '★' : '<span class="off">★</span>').join('');
  const wall = $('#review-wall');
  reviews.forEach((rv) => {
    const card = document.createElement('article');
    card.className = 'review-card reveal';
    card.innerHTML =
      `<div class="stars" aria-label="${rv.r} out of 5 stars">${starRow(rv.r)}</div>` +
      `<blockquote>"${rv.t}"</blockquote>` +
      `<div class="review-meta"><span class="review-avatar" aria-hidden="true">${initials(rv.n)}</span>` +
      `<span><span class="review-name">${rv.n}</span><br /><span class="review-src">via ${rv.src}</span></span></div>`;
    wall.appendChild(card);
  });

  /* ===================== AFTERCARE FAQ ===================== */
  const faqs = [
    { q: 'Is everything single-use and sterile?', a: 'Yes. Every needle, tube and ink cap is single-use and opened in front of you, then dropped in a sharps bin after your session. All reusable tools are autoclave-sterilised. We are registered and inspected by Manchester City Council under the Local Government (Miscellaneous Provisions) Act 1982.' },
    { q: 'How do I look after a fresh tattoo?', a: 'We apply a breathable second-skin dressing. Leave it on for 24 hours, then remove it gently in a warm shower. Wash twice a day with fragrance-free soap, pat dry, and apply a thin layer of aftercare balm. Most pieces heal in 2–3 weeks.' },
    { q: 'What should I avoid while it heals?', a: 'No swimming pools, saunas, hot tubs or sea for two weeks. Keep it out of direct sun, do not pick or scratch the scabs, and avoid tight clothing rubbing the area. Once healed, daily SPF keeps the colours sharp for life.' },
    { q: 'How old do I have to be?', a: 'You must be 18 or over — it is a criminal offence in the UK to tattoo a minor, even with parental consent. Please bring valid photo ID (passport or driving licence) to every appointment.' },
    { q: 'Does it hurt, and can I numb it?', a: 'Everyone is different and placement matters — ribs and feet sting more than forearms. You are welcome to use a quality numbing cream applied before you arrive; tell your artist if you do so they can plan around it.' },
    { q: 'How do deposits and cancellations work?', a: 'A non-refundable deposit secures your slot and comes off your final price. You can reschedule once with 48+ hours notice and carry the deposit over. No-shows or late cancellations forfeit the deposit so we can pay the artist for the held time.' },
    { q: 'Can you cover or rework an old tattoo?', a: 'Often, yes. Bring photos to a free consultation and we will tell you honestly what is possible — cover-up, rework or laser-fade-then-retattoo. Darker, larger and bolder designs cover best.' },
  ];
  const faqWrap = $('#faq');
  faqs.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    const id = 'faq-a-' + i;
    item.innerHTML =
      `<h3 style="margin:0"><button class="faq-q" aria-expanded="false" aria-controls="${id}"><span>${f.q}</span><span class="plus" aria-hidden="true"></span></button></h3>` +
      `<div class="faq-a" id="${id}" role="region"><div class="faq-a-inner">${f.a}</div></div>`;
    faqWrap.appendChild(item);
  });
  faqWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const panel = $('.faq-a', item);
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
  });

  /* ===================== SCROLL REVEAL ===================== */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('in'));
  }

  /* ===================== VALIDATION HELPERS ===================== */
  function setErr(input, msg) {
    const span = $(`.err[data-for="${input.id}"]`);
    if (span) span.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ---------- booking form ---------- */
  const bookForm = $('#book-form');
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    const name = $('#bf-name'), email = $('#bf-email'), phone = $('#bf-phone'),
      artist = $('#bf-artist'), date = $('#bf-date'), style = $('#bf-style');
    [name, email, phone, artist, date, style].forEach((f) => setErr(f, ''));

    if (!name.value.trim()) { setErr(name, 'Please enter your name'); ok = false; }
    if (!emailRe.test(email.value)) { setErr(email, 'Enter a valid email'); ok = false; }
    if (phone.value && !/^[+\d][\d\s()-]{6,}$/.test(phone.value)) { setErr(phone, 'Enter a valid phone'); ok = false; }
    if (!artist.value) { setErr(artist, 'Pick an artist'); ok = false; }
    if (!date.value) { setErr(date, 'Choose a date'); ok = false; }
    else {
      const chosen = new Date(date.value); chosen.setHours(0, 0, 0, 0);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (chosen < today) { setErr(date, 'Pick a future date'); ok = false; }
    }
    if (!style.value) { setErr(style, 'Pick a style'); ok = false; }

    if (!ok) { bookForm.querySelector('[aria-invalid="true"]').focus(); return; }

    const success = $('#book-success');
    bookForm.querySelector('button[type="submit"]').disabled = true;
    success.hidden = false;
    success.textContent = `Thanks ${name.value.trim().split(' ')[0]} — we'll be in touch within one working day to confirm your consultation.`;
    success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });

  /* ===================== DEPOSIT MODAL ===================== */
  const modal = $('#deposit-modal');
  const depForm = $('#deposit-form');
  const depBody = $('#deposit-body');
  let depLastFocus = null;
  const originalDepHTML = depBody.innerHTML;

  function openModal() {
    depLastFocus = document.activeElement;
    modal.hidden = false;
    $('#deposit-close').focus();
  }
  function closeModal() {
    modal.hidden = true;
    if (depBody.innerHTML !== originalDepHTML) { depBody.innerHTML = originalDepHTML; bindDeposit(); }
    if (depLastFocus) depLastFocus.focus();
  }
  $('#deposit-open').addEventListener('click', openModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.id === 'deposit-close') closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  function bindDeposit() {
    const close = $('#deposit-close');
    if (close) close.addEventListener('click', closeModal);
    const amount = $('#dep-amount'), card = $('#dep-card'), exp = $('#dep-exp'), cvc = $('#dep-cvc'),
      cardName = $('#dep-name'), payAmt = $('#dep-pay-amt'), form = $('#deposit-form');
    if (!form) return;

    const syncAmt = () => { payAmt.textContent = '£' + amount.value; };
    amount.addEventListener('change', syncAmt); syncAmt();

    // formatting
    card.addEventListener('input', () => {
      let v = card.value.replace(/\D/g, '').slice(0, 16);
      card.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
    exp.addEventListener('input', () => {
      let v = exp.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
      exp.value = v;
    });
    cvc.addEventListener('input', () => { cvc.value = cvc.value.replace(/\D/g, '').slice(0, 4); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      [cardName, card, exp, cvc].forEach((f) => setErr(f, ''));
      if (!cardName.value.trim()) { setErr(cardName, 'Name required'); ok = false; }
      const digits = card.value.replace(/\s/g, '');
      if (digits.length < 13 || !luhn(digits)) { setErr(card, 'Enter a valid card number'); ok = false; }
      const m = exp.value.match(/^(\d{2})\/(\d{2})$/);
      if (!m) { setErr(exp, 'MM/YY'); ok = false; }
      else {
        const mm = +m[1], yy = +m[2];
        const now = new Date();
        const expDate = new Date(2000 + yy, mm, 0, 23, 59, 59);
        if (mm < 1 || mm > 12) { setErr(exp, 'Bad month'); ok = false; }
        else if (expDate < now) { setErr(exp, 'Card expired'); ok = false; }
      }
      if (!/^\d{3,4}$/.test(cvc.value)) { setErr(cvc, '3–4 digits'); ok = false; }
      if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }

      // simulate processing → receipt
      const btn = $('#dep-pay');
      btn.disabled = true; btn.textContent = 'Processing…';
      setTimeout(() => {
        const ref = 'II-' + Date.now().toString(36).toUpperCase().slice(-6);
        depBody.innerHTML =
          `<button class="modal-close" id="deposit-close" aria-label="Close">✕</button>` +
          `<div class="dep-receipt">` +
          `<div class="dep-check" aria-hidden="true">✓</div>` +
          `<h2>Deposit confirmed</h2>` +
          `<p>We've taken a <strong>£${amount.value}</strong> deposit and emailed your receipt.</p>` +
          `<p class="ref">REF ${ref}</p>` +
          `<p>It'll be deducted from your final price. See you at the studio.</p>` +
          `<p class="modal-lock">Demo only — no real card was charged.</p>` +
          `<button class="btn btn-primary btn-block" id="dep-done" style="margin-top:1rem">Done</button>` +
          `</div>`;
        $('#deposit-close').addEventListener('click', closeModal);
        $('#dep-done').addEventListener('click', closeModal);
        $('#deposit-close').focus();
      }, reduce ? 0 : 850);
    });
  }
  function luhn(num) {
    let sum = 0, alt = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let d = +num[i];
      if (alt) { d *= 2; if (d > 9) d -= 9; }
      sum += d; alt = !alt;
    }
    return sum % 10 === 0;
  }
  bindDeposit();
})();
