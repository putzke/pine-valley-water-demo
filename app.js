(function () {
  'use strict';

  /* ---------- Language (English / Spanish) ---------- */
  var ES = {
    demoStrong: 'Demostración conceptual.',
    demoText: 'Preparada por Sunrise Engineering y Black & Veatch para mostrar cómo mantendríamos informada a la comunidad. No es el sitio web oficial del Distrito.',
    demoLink: 'Acerca de este concepto',
    brandSub: 'Proyecto de Suministro de Agua',
    navNeed: 'La necesidad', navRoute: 'Ruta', navCost: 'Costo', navAquifer: 'Acuífero',
    navLand: 'Propietarios', navBuild: 'Construcción', navFaq: 'Sus preguntas',
    heroEyebrow: 'Condados de Iron y Beaver, Utah',
    heroTitle: 'Agua confiable para Cedar City, Enoch y Kanarraville durante los próximos 50 años y más.',
    heroLead: 'El Proyecto de Suministro de Agua de Pine Valley llevará los derechos de agua existentes del Distrito desde Pine Valley hasta el Valle de Cedar City, junto con conservación, recarga y reutilización. Aquí encontrará lo que se planea, cuánto cuesta, cómo se protegerá el acuífero y cómo puede participar.',
    heroCta1: 'Haga una pregunta', heroCta2: 'Vea la ruta',
    stat1: 'acres-pie por año de agua autorizada', stat2: 'pozos de producción',
    stat3: 'millas de tubería subterránea', stat4: 'tanque de almacenamiento subterráneo',
    needH: 'Por qué el valle necesita agua nueva',
    needLead: 'Se extrae agua del acuífero del Valle de Cedar City más rápido de lo que la naturaleza lo recarga. El Plan Estatal de Manejo de Aguas Subterráneas reducirá el bombeo gradualmente. Al mismo tiempo, la población crece.',
    fig1: 'Agua subterránea extraída frente al rendimiento seguro (acres-pie por año)',
    fig2: 'Demanda proyectada del Distrito y clientes clave (acres-pie por año)',
    consH: 'La conservación es lo primero, pero no basta por sí sola',
    consLead: 'El Registro de Decisión determinó que la conservación sola no cierra la brecha: el uso por persona tendría que bajar a entre 62 y 112 galones diarios, según el crecimiento. El Distrito ya está haciendo su parte.',
    routeH: 'Por dónde pasaría la tubería',
    routeLead: 'El agua viajaría desde pozos en Pine Valley, en el condado de Beaver, hacia el sur por terrenos federales, estatales y privados, hasta el Valle de Cedar City. Elija una categoría para ver lo que cruza la ruta y con quién coordinamos.',
    crossH: 'Lo que debe cruzar la ruta',
    costH: 'Cómo se pagará',
    costLead: 'El Distrito ha dicho que ninguna fuente única cubrirá el proyecto. El plan es combinar primero las fuentes de menor costo para que menos recaiga en las facturas mensuales de agua. Publicaremos aquí las cifras finales en cada punto de control de costos.',
    costQ1: '¿Qué significará esto para mi factura?',
    aqH: 'Proteger el acuífero y mostrarle los datos',
    aqLead: 'El Registro de Decisión exige monitoreo y manejo adaptativo mientras el proyecto opere. Aquí aparecerían las lecturas, en lenguaje sencillo, para que no tenga que buscar en informes técnicos.',
    lH: 'Si la tubería cruza su propiedad',
    lLead: 'Usted sabrá de nosotros primero, en persona o por teléfono, antes de que llegue una cuadrilla de topografía o una carta a su puerta. Así funcionaría el proceso.',
    cH: 'Qué esperar durante la construcción',
    cLead: 'Cuando empiece la obra, esta página será el primer lugar para consultar: qué ocurre esta semana, dónde y a quién llamar. Los avisos se publican en inglés y en español.',
    fH: 'Sus preguntas, respondidas y con seguimiento',
    fLead: 'En 2021, los residentes hicieron 126 preguntas en una reunión comunitaria y las respuestas quedaron en un PDF. Aquí cada pregunta se registra, se responde en lenguaje sencillo y se fecha, y mostramos lo que aún está en trabajo.',
    iH: 'Participe a su manera'
  };
  var EN = {};
  var langBtn = document.getElementById('langBtn');
  var nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(function (n) { EN[n.getAttribute('data-i18n')] = n.innerHTML; });

  function setLang(code) {
    document.documentElement.lang = code;
    nodes.forEach(function (n) {
      var k = n.getAttribute('data-i18n');
      var v = code === 'es' ? ES[k] : EN[k];
      if (v !== undefined) n.innerHTML = v;
    });
    if (code === 'es') {
      langBtn.textContent = 'English';
      langBtn.setAttribute('aria-label', 'Switch to English');
      langBtn.setAttribute('data-lang', 'en');
    } else {
      langBtn.textContent = 'Español';
      langBtn.setAttribute('aria-label', 'Cambiar a español');
      langBtn.setAttribute('data-lang', 'es');
    }
    var note = document.getElementById('esNote');
    if (note) note.hidden = code !== 'es';
    try { localStorage.setItem('pvwsp-lang', code); } catch (e) {}
  }
  langBtn.addEventListener('click', function () { setLang(langBtn.getAttribute('data-lang')); });
  try { if (localStorage.getItem('pvwsp-lang') === 'es') setLang('es'); } catch (e) {}

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- Crossing tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function activate(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { activate(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); activate(tabs[(i + 1) % tabs.length]); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); activate(tabs[(i - 1 + tabs.length) % tabs.length]); }
    });
  });

  /* ---------- Sample monitoring chart ---------- */
  var chart = document.getElementById('wellChart');
  var wellSel = document.getElementById('wellSel');
  var SERIES = [
    { base: 0, amp: 2.2, drift: -0.03, phase: 0.0 },
    { base: -2, amp: 3.0, drift: -0.05, phase: 1.2 },
    { base: 1, amp: 1.6, drift: -0.02, phase: 2.1 }
  ];
  var ACTION = -15;
  function drawChart(idx) {
    var s = SERIES[idx], W = 640, H = 260, L = 52, R = 16, T = 18, B = 40;
    var months = 36, pts = [];
    for (var i = 0; i < months; i++) {
      pts.push(s.base + s.amp * Math.sin(i / 12 * 2 * Math.PI + s.phase) + s.drift * i);
    }
    var yMin = -20, yMax = 6;
    function x(i) { return L + (W - L - R) * i / (months - 1); }
    function y(v) { return T + (H - T - B) * (yMax - v) / (yMax - yMin); }
    var g = '', v;
    for (v = -20; v <= 5; v += 5) {
      g += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#e3e8ea"/>' +
           '<text x="' + (L - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end" font-size="12" fill="#4f5f6a">' + v + '</text>';
    }
    var yrs = ['Year 1', 'Year 2', 'Year 3'];
    for (i = 0; i < 3; i++) {
      g += '<text x="' + x(i * 12 + 5.5) + '" y="' + (H - 14) + '" text-anchor="middle" font-size="12" fill="#4f5f6a">' + yrs[i] + '</text>';
    }
    var path = pts.map(function (p, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(p).toFixed(1); }).join(' ');
    var last = pts[pts.length - 1];
    chart.innerHTML =
      '<title>Sample water level, ' + wellSel.options[idx].text + '</title>' +
      '<desc>Sample data only. Water level stays above the action level of ' + ACTION + ' feet over three years.</desc>' + g +
      '<text x="14" y="' + (T + 90) + '" transform="rotate(-90 14 ' + (T + 90) + ')" text-anchor="middle" font-size="12" fill="#4f5f6a">Feet vs. baseline (sample)</text>' +
      '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(ACTION) + '" y2="' + y(ACTION) + '" stroke="#b5532a" stroke-width="2" stroke-dasharray="6 5"/>' +
      '<text x="' + (W - R) + '" y="' + (y(ACTION) - 6) + '" text-anchor="end" font-size="12" font-weight="700" fill="#b5532a">Action level</text>' +
      '<path d="' + path + '" fill="none" stroke="#1d7a8c" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<circle cx="' + x(months - 1) + '" cy="' + y(last) + '" r="5" fill="#1d7a8c" stroke="#fff" stroke-width="2"/>';
  }
  wellSel.addEventListener('change', function () { drawChart(+wellSel.value); });
  drawChart(0);

  /* ---------- FAQ ---------- */
  var FAQ = [
    { t: 'Cost', s: 'ans', q: 'How much will this add to my monthly water bill?',
      a: 'In 2021 the District estimated that if only current users repaid the project it would add roughly $45 to $60 a month. The project will be financed through a mix of grants, loans, impact fees, user fees and property taxes, and a detailed financial plan was still in progress. Rate increases target upper tiers, so indoor use stays at lower rates.' },
    { t: 'Cost', s: 'ans', q: 'Is the total cost updated for inflation?',
      a: 'In 2021 the District said inflation had not been added to the 2019 estimate and that the latest estimate was in the EIS review. We would post each updated estimate here with a short explanation of what changed.' },
    { t: 'Growth and conservation', s: 'ans', q: 'Why not stop or slow new building until the water problem is solved?',
      a: 'The District said a moratorium could raise home prices and hurt the economy, and that growth pays impact fees for infrastructure. Cedar City and Enoch require developers to bring water rights or pay for them. Water rights are becoming scarcer and costlier, which will itself limit how fast the valley grows.' },
    { t: 'Growth and conservation', s: 'ans', q: 'What is the District doing to conserve water?',
      a: 'More than 2,000 acres of irrigation pivots have been converted to low-pressure systems. Seven recharge facilities have added more than 14,000 acre-feet since 2016. An effluent reuse project with Cedar City and Enoch is in preparation, and the District offers free home irrigation audits and Localscapes classes.' },
    { t: 'Growth and conservation', s: 'ans', q: 'Can we conserve our way out of the problem?',
      a: 'The BLM Record of Decision found that conservation alone cannot overcome the deficit. Per-person use would need to fall to between 62 and 112 gallons per day, depending on how fast the area grows.' },
    { t: 'Water and aquifer', s: 'ans', q: 'Will pumping in Pine Valley hurt springs or nearby wells?',
      a: 'The District has said it will avoid impacts to senior water right holders, including spring flows, and that senior rights would be made whole. USGS data indicate the mountain and valley aquifers are hydraulically separate. Monitoring and an Adaptive Management Plan are part of the approval, and this site would publish the readings.' },
    { t: 'Water and aquifer', s: 'ans', q: 'What if there is less water than expected?',
      a: 'The District cites 17,700 acre-feet per year of net recharge in Pine Valley, compared with 15,000 acre-feet per year of decreed rights. It said that if less water exists, the infrastructure will be adjusted. Monitoring results will show how the aquifer responds.' },
    { t: 'Water and aquifer', s: 'ans', q: 'Will the water be treated with fluoride?',
      a: 'The District does not add fluoride. Natural fluoride would appear in testing. Chlorine is likely to be added as a disinfectant.' },
    { t: 'Environment', s: 'ans', q: 'How will wildlife and cultural resources be protected?',
      a: 'The BLM prepared a Biological Assessment, and cultural resource surveys are available on the BLM website. The project may benefit greater sage-grouse by adding water sources and meadows. Tribal consultation was handled by the BLM, and the District has said it is willing to meet with tribes directly.' },
    { t: 'Environment', s: 'open', q: 'How will the project affect Great Basin National Park?',
      a: 'This question was not answered at the 2021 meeting. We have logged it for the District and the project hydrologists. An answer, with the source data, will be posted here.' },
    { t: 'Agriculture', s: 'ans', q: 'Will farmers be able to use Pine Valley water?',
      a: 'Water will be available to subscribers, likely irrigation companies and municipalities. About 75 percent of valley water use today is agricultural.' },
    { t: 'Project basics', s: 'ans', q: 'Who will the project serve?',
      a: 'The project is designed to serve Cedar City, Enoch and Kanarraville. Each community decides whether to participate.' },
    { t: 'Project basics', s: 'ans', q: 'How will leaks be prevented?',
      a: 'Through construction inspections and modern leak-detection technology. We would publish inspection and testing milestones during construction.' },
    { t: 'Project basics', s: 'open', q: 'Why not build a reservoir on Coal Creek instead?',
      a: 'The District said flash floods and high dissolved solids make surface reservoirs difficult, and that early dams silted in within one to two years, so it is recharging the underground aquifer instead. A related 2021 question about a Coal Creek well and pipeline was not answered, and we have logged it.' }
  ];
  var topics = ['All'].concat(FAQ.map(function (f) { return f.t; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
  var current = 'All', query = '';
  var list = document.getElementById('faqList');
  var filters = document.getElementById('faqFilters');
  var search = document.getElementById('faqSearch');

  filters.innerHTML = topics.map(function (t) {
    return '<button type="button" aria-pressed="' + (t === 'All') + '" data-t="' + t + '">' + t + '</button>';
  }).join('');
  filters.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    current = b.getAttribute('data-t');
    Array.prototype.forEach.call(filters.children, function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
    render();
  });
  search.addEventListener('input', function () { query = search.value.trim().toLowerCase(); render(); });

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render() {
    var items = FAQ.filter(function (f) {
      return (current === 'All' || f.t === current) && (!query || (f.q + ' ' + f.a).toLowerCase().indexOf(query) > -1);
    });
    var html = items.map(function (f) {
      var tag = f.s === 'ans' ? '<span class="tag ans">Answered</span>' : '<span class="tag open">Being answered</span>';
      return '<details class="faq"><summary><span>' + esc(f.q) + '</span></summary><div class="faq-body"><p>' + tag + '<span class="src">' + esc(f.t) + ' &middot; from the 2021 community meeting</span></p><p>' + esc(f.a) + '</p></div></details>';
    }).join('');
    list.innerHTML = html || '<p class="empty">No questions match. Ask a new question below and we will log it and answer it here.</p>';
    var cnt = document.getElementById('faqCount');
    if (cnt) cnt.textContent = items.length + ' of ' + FAQ.length + ' shown';
  }
  render();
  var esNote = document.createElement('p');
  esNote.id = 'esNote'; esNote.className = 'src-line'; esNote.hidden = true;
  esNote.textContent = 'Las respuestas de esta sección se publicarían también en español. Esta demostración muestra el texto en inglés.';
  list.parentNode.insertBefore(esNote, list.nextSibling);
  var cnt = document.createElement('p');
  cnt.id = 'faqCount'; cnt.className = 'src-line'; cnt.setAttribute('aria-live', 'polite');
  list.parentNode.insertBefore(cnt, list);
  render();

  /* ---------- Demonstration forms (nothing is sent) ---------- */
  function demoForm(formId, noteId, fields, msg) {
    var f = document.getElementById(formId), note = document.getElementById(noteId);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = fields.every(function (n) { return f.elements[n].value.trim(); });
      note.className = 'form-note' + (ok ? ' ok' : '');
      note.textContent = ok ? msg : 'Please complete the required fields.';
      if (ok) f.reset();
    });
  }
  demoForm('landForm', 'landNote', ['n', 'c'], 'Thank you. In the live site, your named contact would call you within one business day. (Demonstration only. Nothing was sent.)');
  demoForm('askForm', 'askNote', ['q'], 'Thank you. In the live site, your question would be logged, assigned and answered here. (Demonstration only. Nothing was sent.)');
})();
