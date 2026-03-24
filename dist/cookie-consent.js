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
