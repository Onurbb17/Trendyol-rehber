(function() {
  var COOKIE_CONSENT_KEY = 'trendyolrehber_cookie_consent';
  var CONSENT_EXPIRY_DAYS = 365;
  var TRUST_LINKS = [
    { href: 'iletisim.html', text: 'İletişim' },
    { href: 'gizlilik-politikasi.html', text: 'Gizlilik Politikası' },
    { href: 'cerez-politikasi.html', text: 'Çerez Politikası' },
    { href: 'kullanim-kosullari.html', text: 'Kullanım Koşulları' }
  ];
  var BRAND_URL = 'https://e-ciro.com';
  var HEADER_LINKS = [
    { href: 'index.html', text: 'Ana Sayfa' },
    { href: 'trendyol-rehber.html', text: 'Rehberler' },
    { href: 'trendyol-araclari.html', text: 'Araçlar' },
    { href: 'trendyol-haberler.html', text: 'Güncellemeler' },
    { href: 'blog.html', text: 'Blog' }
  ];

  function getConsent() {
    try {
      return localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(accepted) {
    try {
      var expiry = new Date();
      expiry.setDate(expiry.getDate() + CONSENT_EXPIRY_DAYS);
      localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? 'accepted' : 'declined');
      localStorage.setItem(COOKIE_CONSENT_KEY + '_date', expiry.toISOString());
    } catch (e) {}
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  function showBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'flex';
    }
  }

  function createBanner() {
    if (document.getElementById('cookie-consent-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = 
      '<div class="cookie-consent-content">' +
        '<p class="cookie-consent-text">Bu site deneyiminizi iyileştirmek ve reklamları kişiselleştirmek için çerezler kullanır. ' +
        '<a href="gizlilik-politikasi.html">Gizlilik Politikası</a> ve ' +
        '<a href="cerez-politikasi.html">Çerez Politikası</a></p>' +
        '<div class="cookie-consent-buttons">' +
          '<button id="cookie-accept" class="cookie-btn cookie-btn-accept">Kabul Et</button>' +
          '<button id="cookie-decline" class="cookie-btn cookie-btn-decline">Reddet</button>' +
        '</div>' +
      '</div>';

    var style = document.createElement('style');
    style.textContent = 
      '#cookie-consent-banner {' +
        'position: fixed; bottom: 0; left: 0; right: 0;' +
        'background: #1f2937; color: #f9fafb; padding: 1rem 1.5rem;' +
        'box-shadow: 0 -4px 20px rgba(0,0,0,0.15); z-index: 9999;' +
        'display: flex; align-items: center; justify-content: center;' +
        'flex-wrap: wrap; gap: 1rem;' +
      '}' +
      '.cookie-consent-content { max-width: 900px; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }' +
      '.cookie-consent-text { margin: 0; font-size: 0.9rem; flex: 1; min-width: 200px; }' +
      '.cookie-consent-text a { color: #f7931e; }' +
      '.cookie-consent-buttons { display: flex; gap: 0.75rem; }' +
      '.cookie-btn { padding: 0.5rem 1.25rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 0.9rem; }' +
      '.cookie-btn-accept { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; }' +
      '.cookie-btn-decline { background: #4b5563; color: white; }' +
      '@media (max-width: 600px) { .cookie-consent-content { flex-direction: column; } }';

    document.head.appendChild(style);
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').onclick = function() {
      setConsent(true);
      hideBanner();
    };
    document.getElementById('cookie-decline').onclick = function() {
      setConsent(false);
      hideBanner();
    };
  }

  function ensureGlobalUiStyles() {
    if (document.getElementById('trh-global-ui-style')) return;
    var style = document.createElement('style');
    style.id = 'trh-global-ui-style';
    style.textContent =
      '.trh-universal-header{' +
        'position:sticky;top:0;z-index:1200;' +
        'background:rgba(255,255,255,0.92);' +
        'backdrop-filter:blur(8px);' +
        '-webkit-backdrop-filter:blur(8px);' +
        'border-bottom:1px solid #e5e7eb;' +
        'box-shadow:0 6px 18px rgba(17,24,39,0.06);' +
      '}' +
      '.trh-universal-header .trh-top-accent{' +
        'height:3px;background:linear-gradient(135deg,#ff6b35,#f7931e);' +
      '}' +
      '.trh-header-shell{' +
        'max-width:1200px;margin:0 auto;padding:0.7rem 1rem;' +
        'display:flex;align-items:center;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;' +
      '}' +
      '.trh-brand{' +
        'color:#ff6b35;text-decoration:none;font-weight:700;font-size:1.05rem;letter-spacing:0.01em;' +
      '}' +
      '.trh-brand:hover{color:#e55a2b;}' +
      '.trh-nav{display:flex;align-items:center;gap:0.35rem 0.5rem;flex-wrap:wrap;}' +
      '.trh-nav a,.trh-nav-link{' +
        'display:inline-flex;align-items:center;padding:0.42rem 0.72rem;border-radius:999px;' +
        'font-size:0.86rem;text-decoration:none;color:#4b5563;font-weight:600;transition:all .2s;' +
      '}' +
      '.trh-nav a:hover,.trh-nav-link:hover{background:#fff4ed;color:#ff6b35;}' +
      '@media (max-width:760px){' +
        '.trh-header-shell{padding:0.62rem 0.8rem;}' +
        '.trh-brand{font-size:0.98rem;}' +
        '.trh-nav a,.trh-nav-link{font-size:0.8rem;padding:0.38rem 0.62rem;}' +
      '}';
    document.head.appendChild(style);
  }

  function createFallbackHeader() {
    var header = document.createElement('header');
    header.className = 'trh-universal-header trh-injected-header';
    header.innerHTML =
      '<div class="trh-top-accent"></div>' +
      '<div class="trh-header-shell">' +
        '<a class="trh-brand" href="index.html">Trendyol Rehber</a>' +
        '<nav class="trh-nav" aria-label="Site Navigasyonu"></nav>' +
      '</div>';
    var nav = header.querySelector('.trh-nav');
    for (var i = 0; i < HEADER_LINKS.length; i++) {
      var link = document.createElement('a');
      link.href = HEADER_LINKS[i].href;
      link.textContent = HEADER_LINKS[i].text;
      nav.appendChild(link);
    }
    document.body.insertBefore(header, document.body.firstChild);
    return header;
  }

  function normalizeExistingHeader(header) {
    if (!header) return;
    header.classList.add('trh-universal-header');

    var accent = header.querySelector('.trh-top-accent');
    if (!accent) {
      accent = document.createElement('div');
      accent.className = 'trh-top-accent';
      header.insertBefore(accent, header.firstChild);
    }

    var shell = header.querySelector('.trh-header-shell');
    if (!shell) {
      shell = document.createElement('div');
      shell.className = 'trh-header-shell';
      var children = Array.prototype.slice.call(header.children);
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child === accent || child === shell) continue;
        shell.appendChild(child);
      }
      header.appendChild(shell);
    }

    var nav = header.querySelector('nav') || header.querySelector('.nav-menu') || header.querySelector('ul');
    if (nav && !nav.classList.contains('trh-nav')) {
      nav.classList.add('trh-nav');
    }

    if (nav && nav.querySelectorAll('a').length < 3) {
      for (var i = 0; i < HEADER_LINKS.length; i++) {
        if (hasLink(nav, HEADER_LINKS[i].href)) continue;
        var nLink = document.createElement('a');
        nLink.href = HEADER_LINKS[i].href;
        nLink.textContent = HEADER_LINKS[i].text;
        nav.appendChild(nLink);
      }
    }
  }

  function ensureUnifiedHeader() {
    ensureGlobalUiStyles();
    var header = document.querySelector('body > header');
    if (!header) {
      createFallbackHeader();
      return;
    }
    normalizeExistingHeader(header);
  }

  function hasLink(container, href) {
    return !!container.querySelector('a[href="' + href + '"]');
  }

  function cloneAnchorStyle(sourceAnchor, targetAnchor) {
    if (!sourceAnchor) return;
    if (sourceAnchor.className) targetAnchor.className = sourceAnchor.className;
    var style = sourceAnchor.getAttribute('style');
    if (style) targetAnchor.setAttribute('style', style);
  }

  function injectTrustLinksInto(container) {
    if (!container) return;
    var sampleLink = container.querySelector('a');
    TRUST_LINKS.forEach(function(item) {
      if (hasLink(container, item.href)) return;
      var link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.text;
      cloneAnchorStyle(sampleLink, link);
      container.appendChild(link);
    });
  }

  function ensureTrustLinks() {
    var candidates = document.querySelectorAll('footer .flex, footer .footer-links, footer');
    var seen = new Set();
    for (var i = 0; i < candidates.length; i++) {
      var container = candidates[i];
      if (seen.has(container)) continue;
      seen.add(container);
      if (!container.querySelector('a')) continue;
      injectTrustLinksInto(container);
    }
  }

  function ensureBrandAttribution() {
    var footers = document.querySelectorAll('footer');
    for (var i = 0; i < footers.length; i++) {
      var footer = footers[i];
      if (footer.querySelector('[data-brand-attribution="true"]')) continue;

      var line = document.createElement('p');
      line.setAttribute('data-brand-attribution', 'true');
      line.style.margin = '0.75rem 0 0';
      line.style.fontSize = '0.82rem';
      line.style.color = '#6b7280';

      var textStart = document.createTextNode('Bu proje, ');
      var brandLink = document.createElement('a');
      brandLink.href = BRAND_URL;
      brandLink.target = '_blank';
      brandLink.rel = 'noopener noreferrer';
      brandLink.textContent = 'e-ciro.com';
      brandLink.style.color = '#ff6b35';
      brandLink.style.textDecoration = 'none';
      var textEnd = document.createTextNode(' ürünüdür ve topluluğa yardımcı olmak amacıyla hazırlanmıştır.');

      line.appendChild(textStart);
      line.appendChild(brandLink);
      line.appendChild(textEnd);
      footer.appendChild(line);
    }
  }

  function init() {
    ensureUnifiedHeader();
    ensureTrustLinks();
    ensureBrandAttribution();
    if (getConsent() === null) {
      createBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
