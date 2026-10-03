(function () {
  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Reviews ---------- */
  var data = window.SITE_REVIEWS;
  if (!data) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function stars(rating) {
    var s = el('span', 'stars');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', rating.toFixed(1) + ' out of 5 stars');
    var f = el('span', 'fill');
    f.style.setProperty('--r', rating);
    s.appendChild(f);
    return s;
  }
  function link(href, text) {
    var a = el('a', null, text);
    a.href = href; a.target = '_blank'; a.rel = 'noopener';
    return a;
  }
  var rated = data.platforms.filter(function (p) {
    return typeof p.rating === 'number' && typeof p.count === 'number';
  });
  var total = rated.reduce(function (t, p) { return t + p.count; }, 0);
  var avg = total ? rated.reduce(function (t, p) { return t + p.rating * p.count; }, 0) / total : null;

  /* Overall summary (reviews page) */
  var overall = document.getElementById('overall-score');
  if (overall) {
    var left = el('div');
    if (avg) {
      left.appendChild(el('div', 'big', avg.toFixed(1)));
      left.appendChild(stars(avg));
      left.appendChild(el('div', 'caption', total + ' reviews across ' + rated.map(function (p) { return p.name; }).join(' & ')));
    } else {
      left.appendChild(el('div', 'big', data.fallbackTotalText.split(' ')[0]));
      left.appendChild(el('div', 'caption', 'reviews on Google & JustDial'));
    }
    overall.prepend(left);
  }

  /* Per-platform cards (reviews page) */
  var wrap = document.getElementById('platforms');
  if (wrap) {
    data.platforms.forEach(function (p) {
      var card = el('article', 'platform');
      var name = el('div', 'p-name');
      var dot = el('span', 'p-dot'); dot.style.background = p.color;
      name.appendChild(dot); name.appendChild(document.createTextNode(p.name));
      card.appendChild(name);
      if (typeof p.rating === 'number') {
        var score = el('div', 'p-score');
        score.appendChild(el('span', 'p-num', p.rating.toFixed(1)));
        score.appendChild(stars(p.rating));
        card.appendChild(score);
        if (typeof p.count === 'number') card.appendChild(el('div', 'p-count', p.count + ' reviews on ' + p.name));
      } else {
        card.appendChild(el('p', 'p-note', 'See the current rating and every review on our ' + p.name + ' page.'));
      }
      var links = el('div', 'p-links');
      links.appendChild(link(p.readUrl, 'Read reviews'));
      if (p.writeUrl) links.appendChild(link(p.writeUrl, 'Write a review'));
      card.appendChild(links);
      wrap.appendChild(card);
    });
  }

  /* Snapshot (home page) */
  var snap = document.getElementById('snapshot');
  if (snap) {
    data.platforms.forEach(function (p) {
      var a = el('a', 'snap');
      a.href = p.readUrl; a.target = '_blank'; a.rel = 'noopener';
      if (typeof p.rating === 'number') {
        a.appendChild(el('span', 'p-num', p.rating.toFixed(1)));
        a.appendChild(stars(p.rating));
        a.appendChild(el('span', 'label', p.name));
        if (typeof p.count === 'number') a.appendChild(el('span', 'sub', p.count + ' reviews'));
      } else {
        a.appendChild(el('span', 'label', p.name));
        a.appendChild(el('span', 'sub', 'Read our reviews on ' + p.name));
      }
      snap.appendChild(a);
    });
  }

  /* Testimonials (reviews page) */
  var tWrap = document.getElementById('testimonials');
  if (tWrap) {
    if (!data.testimonials.length) {
      var note = el('p', 'empty-note', 'Read what families say in their own words on our ');
      note.appendChild(link(data.platforms[0].readUrl, 'Google'));
      note.appendChild(document.createTextNode(' and '));
      note.appendChild(link(data.platforms[1] ? data.platforms[1].readUrl : data.platforms[0].readUrl, 'JustDial'));
      note.appendChild(document.createTextNode(' pages.'));
      tWrap.replaceWith(note);
    } else {
      data.testimonials.forEach(function (t) {
        var f = el('figure', 'quote');
        if (typeof t.rating === 'number') f.appendChild(stars(t.rating));
        var q = el('blockquote', null, '“' + t.text + '”');
        f.appendChild(q);
        var cap = el('figcaption');
        cap.appendChild(el('b', null, t.name));
        cap.appendChild(document.createTextNode([t.place, t.platform ? 'via ' + t.platform : '', t.date].filter(Boolean).join(' · ')));
        f.appendChild(cap);
        tWrap.appendChild(f);
      });
    }
  }

  var upd = document.getElementById('reviews-updated');
  if (upd && data.lastUpdated) upd.textContent = 'Ratings last checked: ' + data.lastUpdated;
})();
