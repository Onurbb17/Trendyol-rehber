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
    { href: 'index.html', text: 'Ana Sayfa', key: 'home' },
    {
      href: 'trendyol-rehber.html',
      text: 'Rehberler',
      key: 'guide',
      children: [
        { href: 'trendyol-satici-rehberi.html', text: 'Satıcı Rehberi' },
        { href: 'trendyol-satis-nasil-yapilir.html', text: 'Satış Nasıl Yapılır' },
        { href: 'trendyol-satici-basvurusu.html', text: 'Başvuru Şartları' }
      ]
    },
    {
      href: 'trendyol-araclari.html',
      text: 'Araçlar',
      key: 'tools',
      children: [
        { href: 'trendyol-komisyon-hesaplama.html', text: 'Komisyon Hesaplama' },
        { href: 'kargo-desi-hesaplama.html', text: 'Kargo Desi Hesaplama' },
        { href: 'kargo-fiyatlari.html', text: 'Kargo Fiyatları' }
      ]
    },
    {
      href: 'trendyol-sorunlar.html',
      text: 'Sorun & Çözümler',
      key: 'issues',
      children: [
        { href: 'trendyol-hata-cozumleri.html', text: 'Hata & Çözümleri' },
        { href: 'trendyol-urun-reddi.html', text: 'Ürün Reddi' },
        { href: 'trendyol-ceza-puani.html', text: 'Ceza Puanı' },
        { href: 'trendyol-hesap-kapanir-mi.html', text: 'Hesap Kapanır mı?' }
      ]
    },
    { href: 'trendyol-haberler.html', text: 'Güncellemeler', key: 'updates' },
    { href: 'blog.html', text: 'Blog', key: 'blog' }
  ];
  var NAV_ICON_SVGS = {
    home: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.5L12 4L20 10.5V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V10.5Z" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15.5C9.8 16.3 11 16.8 12.3 16.8C13.45 16.8 14.5 16.4 15.3 15.7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    guide: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="14" height="15" rx="2.3" stroke="currentColor" stroke-width="1.9"/><path d="M8 9H14M8 12H14M8 15H12" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M18 8.5C19.7 8.5 21 9.8 21 11.5V17.5C21 19.2 19.7 20.5 18 20.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    tools: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 6.5A4.2 4.2 0 1 0 17.8 9.8L20.6 12.6A1.4 1.4 0 0 1 20.6 14.6L14.6 20.6A1.4 1.4 0 0 1 12.6 20.6L9.8 17.8A4.2 4.2 0 1 0 6.5 14.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.4" cy="14.6" r="0.8" fill="currentColor"/></svg>',
    issues: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21Z" stroke="currentColor" stroke-width="1.9"/><path d="M12 7.8V12.3" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="12" cy="16.2" r="0.9" fill="currentColor"/></svg>',
    updates: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.4" stroke="currentColor" stroke-width="1.9"/><path d="M7.5 3.8V7.2M16.5 3.8V7.2M3.5 10.2H20.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="8.6" cy="14.2" r="1" fill="currentColor"/><circle cx="12" cy="14.2" r="1" fill="currentColor"/><circle cx="15.4" cy="14.2" r="1" fill="currentColor"/></svg>',
    blog: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 5.5H14.8C17.9 5.5 20.5 8.1 20.5 11.2V18.5H9.8C6.7 18.5 4.2 16 4.2 12.9V6.8C4.2 6.1 4.8 5.5 5.5 5.5Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M8 10H14.5M8 13.3H12.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="18.6" cy="6.2" r="1.8" stroke="currentColor" stroke-width="1.9"/></svg>'
  };

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
      ':root{' +
        '--trh-primary:#ff6b35;' +
        '--trh-primary-2:#f7931e;' +
        '--trh-ink:#111827;' +
        '--trh-muted:#6b7280;' +
        '--trh-line:#e5e7eb;' +
        '--trh-sidebar-bg:#0f1b33;' +
        '--trh-sidebar-surface:#162646;' +
        '--trh-sidebar-ink:#e7efff;' +
        '--trh-sidebar-active:#274c86;' +
      '}' +
      'body{' +
        'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","Helvetica Neue",Helvetica,Arial,sans-serif;' +
        '-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;' +
        'background:' +
          'radial-gradient(1200px 400px at 5% -10%, rgba(255,107,53,0.10), transparent 60%),' +
          'radial-gradient(1200px 400px at 95% -10%, rgba(247,147,30,0.10), transparent 60%),' +
          '#f9fafb;' +
      '}' +
      'button,input,select,textarea{' +
        'font-family:inherit;' +
      '}' +
      'body.trh-has-sidebar{' +
        'padding-left:260px;' +
      '}' +
      'h1,h2,h3{letter-spacing:-0.01em;}' +
      'a{transition:color .2s ease,opacity .2s ease;}' +
      'main article, .container, .blog-container, .home-card, .blog-card, .most-viewed-card{' +
        'box-shadow:0 8px 24px rgba(17,24,39,0.04);' +
      '}' +
      '.trh-surface{' +
        'background:#fff;border:1px solid var(--trh-line);border-radius:16px;' +
        'box-shadow:0 8px 24px rgba(17,24,39,0.05);' +
      '}' +
      '.trh-universal-header{' +
        'position:fixed;left:0;top:0;bottom:0;z-index:1200;width:260px;' +
        'background:var(--trh-sidebar-bg);' +
        'backdrop-filter:blur(8px);' +
        '-webkit-backdrop-filter:blur(8px);' +
        'border-right:1px solid #2a3347;' +
        'box-shadow:8px 0 24px rgba(17,24,39,0.08);overflow-y:auto;' +
      '}' +
      '.trh-universal-header .trh-top-accent{' +
        'display:none;' +
      '}' +
      '.trh-header-shell{' +
        'max-width:none;margin:0;padding:0.9rem 0.7rem;' +
        'display:flex;align-items:stretch;justify-content:flex-start;gap:0.7rem;flex-direction:column;' +
      '}' +
      '.trh-brand,.header-logo{' +
        'display:inline-flex;align-items:center;justify-content:flex-start;gap:0.55rem;padding:0.45rem 0.5rem;border-radius:10px;width:100%;' +
        'color:#ffb16e;text-decoration:none;font-weight:700;font-size:1.05rem;letter-spacing:0.01em;position:relative;overflow:hidden;' +
      '}' +
      '.trh-brand:hover,.header-logo:hover{background:rgba(255,255,255,0.06);}' +
      '.trh-brand-text{' +
        'display:inline-block;font-weight:800;letter-spacing:0.015em;' +
        'background:linear-gradient(120deg,#ffd7a8 0%,#ffb16e 28%,#ffe8cc 45%,#ffb16e 62%,#ffc488 100%);' +
        '-webkit-background-clip:text;background-clip:text;color:transparent;' +
        'background-size:220% 100%;animation:trhBrandShine 6.2s ease-in-out infinite;' +
        'text-shadow:0 0 18px rgba(255,177,110,0.12);' +
      '}' +
      '.trh-brand:hover .trh-brand-text,.header-logo:hover .trh-brand-text{' +
        'animation-duration:2.8s;' +
      '}' +
      '@keyframes trhBrandShine{' +
        '0%{background-position:0% 50%;}' +
        '50%{background-position:100% 50%;}' +
        '100%{background-position:0% 50%;}' +
      '}' +
      '.trh-brand::before,.header-logo::before{' +
        'content:"";width:26px;height:26px;flex:0 0 26px;border-radius:8px;' +
        'background:url("/favicon.ico") center/contain no-repeat;' +
        'box-shadow:0 2px 8px rgba(17,24,39,0.12);' +
      '}' +
      '.trh-brand:hover,.header-logo:hover{color:#ffb884;}' +
      '.trh-nav{' +
        'display:flex;align-items:flex-start;gap:0.24rem;flex-wrap:nowrap;flex-direction:column;' +
        'padding:0.45rem;border:1px solid #2a3d63;border-radius:16px;background:var(--trh-sidebar-surface);' +
        'width:100%;min-width:0;box-shadow:0 10px 30px rgba(17,24,39,0.07);' +
      '}' +
      '.trh-nav a,.trh-nav-link{' +
        'position:relative;display:inline-flex;align-items:center;justify-content:flex-start;width:100%;padding:0.54rem 0.82rem;border-radius:11px;' +
        'font-size:0.87rem;text-decoration:none;color:var(--trh-sidebar-ink) !important;font-weight:600;transition:all .2s ease;gap:0.62rem;' +
      '}' +
      '.trh-nav-item{width:100%;}' +
      '.trh-nav-main{width:100%;}' +
      '.trh-nav-icon{' +
        'width:19px;height:19px;flex:0 0 19px;display:inline-block;opacity:0.95;' +
      '}' +
      '.trh-nav a::after,.trh-nav-link::after{' +
        'content:"";position:absolute;left:0.38rem;right:auto;top:0.46rem;bottom:0.46rem;width:2px;' +
        'border-radius:99px;background:linear-gradient(135deg,#ff8f42,#ffc078);' +
        'transform:scaleY(0);transform-origin:center;transition:transform .2s ease;opacity:0.9;' +
      '}' +
      '.trh-nav a:hover,.trh-nav-link:hover{' +
        'background:#21365c !important;color:#ffffff !important;transform:translateX(1px);' +
      '}' +
      '.trh-nav a:hover::after,.trh-nav-link:hover::after{' +
        'transform:scaleY(1);' +
      '}' +
      '.trh-nav a.trh-current,.trh-nav-link.trh-current{' +
        'background:var(--trh-sidebar-active) !important;color:#fff !important;font-weight:700;box-shadow:0 10px 20px rgba(39,76,134,0.38);' +
      '}' +
      '.trh-nav a.trh-current::after,.trh-nav-link.trh-current::after{' +
        'display:none;' +
      '}' +
      '.trh-submenu{' +
        'width:100%;display:none;flex-direction:column;gap:0.14rem;padding:0.06rem 0 0.16rem 1.95rem;' +
      '}' +
      '.trh-submenu a,.trh-sub-link{' +
        'padding:0.34rem 0.5rem;border-radius:8px;font-size:0.78rem;font-weight:500;' +
        'color:#c7d7ff !important;background:rgba(255,255,255,0.02);' +
      '}' +
      '.trh-submenu a::after,.trh-sub-link::after{' +
        'display:none !important;' +
      '}' +
      '.trh-submenu a:hover,.trh-sub-link:hover{' +
        'background:#1d3157 !important;color:#ffffff !important;transform:none;' +
      '}' +
      '.trh-submenu a.trh-sub-current,.trh-sub-link.trh-sub-current{' +
        'background:#21365c !important;color:#ffffff !important;' +
      '}' +
      '.trh-nav-item:hover .trh-submenu,.trh-nav-item:focus-within .trh-submenu{' +
        'display:flex;' +
      '}' +
      '.trh-universal-header .mega-dropdown{' +
        'background:var(--trh-sidebar-surface) !important;border:1px solid #2a3d63 !important;' +
        'box-shadow:0 12px 26px rgba(5,10,20,0.35) !important;' +
      '}' +
      '.trh-universal-header .mega-dropdown a{' +
        'color:var(--trh-sidebar-ink) !important;' +
      '}' +
      '.trh-universal-header .mega-dropdown a:hover{' +
        'background:#21365c !important;color:#ffffff !important;' +
      '}' +
      '.trh-universal-header .mega-dropdown .mega-title{' +
        'color:#94aedf !important;' +
      '}' +
      '.trh-universal-header .nav-menu.open{' +
        'background:var(--trh-sidebar-surface) !important;border-bottom:1px solid #2a3d63 !important;' +
      '}' +
      '.trh-modern-footer{' +
        'background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;' +
        'padding:1rem 1.1rem !important;margin:1.2rem auto 0;max-width:1200px;' +
        'box-shadow:0 6px 20px rgba(17,24,39,0.04);' +
      '}' +
      '.trh-modern-footer a{padding:0.3rem 0.55rem;border-radius:999px;}' +
      '.trh-modern-footer a:hover{background:#fff4ed;color:#ff6b35 !important;}' +
      '.home-card,.blog-card,.most-viewed-card{' +
        'transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease;' +
      '}' +
      '.home-card:hover,.blog-card:hover,.most-viewed-card:hover{' +
        'transform:translateY(-4px);box-shadow:0 12px 28px rgba(17,24,39,0.10);' +
      '}' +
      '#root img[alt="Trendyol Kar Hesaplayıcı Logo"],' +
      '#root header img[src*="logo-"],' +
      '#root header img.h-12.w-12{' +
        'display:none !important;' +
      '}' +
      '@media (max-width:760px){' +
        'body.trh-has-sidebar{padding-left:0;}' +
        '.trh-universal-header{position:sticky;left:auto;top:0;bottom:auto;width:auto;border-right:none;border-bottom:1px solid #e5e7eb;box-shadow:0 6px 18px rgba(17,24,39,0.06);overflow:visible;}' +
        '.trh-universal-header .trh-top-accent{display:block;height:3px;background:linear-gradient(135deg,#ff6b35,#f7931e);}' +
        '.trh-header-shell{padding:0.62rem 0.8rem;}' +
        '.trh-brand,.header-logo{font-size:0.98rem;}' +
        '.trh-nav{width:100%;justify-content:flex-start;border-radius:14px;min-width:unset;padding:0.38rem;}' +
        '.trh-nav a,.trh-nav-link{font-size:0.8rem;padding:0.4rem 0.6rem;}' +
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
    ensureStandardHeaderLinks(nav);
    ensureHeaderNavIcons(nav);
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
    normalizeLegacyInlineNavStyles(nav);
    ensureStandardHeaderLinks(nav);

    alignSidebarHeaderBlocks(header, shell, nav);
    ensureHeaderNavIcons(nav);
  }

  function normalizeLegacyInlineNavStyles(nav) {
    if (!nav) return;
    nav.removeAttribute('style');
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].removeAttribute('style');
    }
  }

  function ensureStandardHeaderLinks(nav) {
    if (!nav) return;
    while (nav.firstChild) {
      nav.removeChild(nav.firstChild);
    }
    for (var i = 0; i < HEADER_LINKS.length; i++) {
      var item = document.createElement('div');
      item.className = 'trh-nav-item';

      var link = document.createElement('a');
      link.href = HEADER_LINKS[i].href;
      link.textContent = HEADER_LINKS[i].text;
      link.className = 'trh-nav-main';
      link.setAttribute('data-nav-key', HEADER_LINKS[i].key);
      item.appendChild(link);

      var children = HEADER_LINKS[i].children || [];
      if (children.length) {
        var submenu = document.createElement('div');
        submenu.className = 'trh-submenu';
        for (var j = 0; j < children.length; j++) {
          var childLink = document.createElement('a');
          childLink.href = children[j].href;
          childLink.textContent = children[j].text;
          childLink.className = 'trh-sub-link';
          submenu.appendChild(childLink);
        }
        item.appendChild(submenu);
      }
      nav.appendChild(item);
    }
  }

  function ensureUnifiedHeader() {
    ensureGlobalUiStyles();
    var header = document.querySelector('body > header');
    if (!header) {
      header = createFallbackHeader();
      decorateHeaderBrandText(header);
      markActiveNavLink(header.querySelector('.trh-nav'));
      ensureSidebarLayoutClass();
      return;
    }
    normalizeExistingHeader(header);
    decorateHeaderBrandText(header);
    markActiveNavLink(header.querySelector('.trh-nav'));
    ensureSidebarLayoutClass();
  }

  function hasLink(container, href) {
    return !!container.querySelector('a[href="' + href + '"]');
  }

  function getHeaderNavKey(anchor) {
    if (!anchor) return '';
    var explicit = anchor.getAttribute('data-nav-key');
    if (explicit) return explicit;
    var href = (anchor.getAttribute('href') || '').toLowerCase();
    for (var i = 0; i < HEADER_LINKS.length; i++) {
      if (href.indexOf(HEADER_LINKS[i].href.toLowerCase()) !== -1) {
        return HEADER_LINKS[i].key;
      }
    }
    return '';
  }

  function ensureHeaderNavIcons(nav) {
    if (!nav) return;
    var links = nav.querySelectorAll('.trh-nav-main');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var key = getHeaderNavKey(link);
      if (!key || !NAV_ICON_SVGS[key]) continue;
      if (link.querySelector('.trh-nav-icon')) continue;
      var iconWrap = document.createElement('span');
      iconWrap.className = 'trh-nav-icon';
      iconWrap.innerHTML = NAV_ICON_SVGS[key];
      link.insertBefore(iconWrap, link.firstChild);
      link.setAttribute('data-nav-key', key);
    }
  }

  function alignSidebarHeaderBlocks(header, shell, nav) {
    if (!header || !shell || !nav) return;
    var brand = header.querySelector('.trh-brand, .header-logo, a[class*="logo"]');
    if (!brand) {
      brand = document.createElement('a');
      brand.className = 'trh-brand';
      brand.href = 'index.html';
      brand.textContent = 'Trendyol Rehber';
      shell.insertBefore(brand, shell.firstChild);
    }
    if (brand.parentNode !== shell) {
      shell.insertBefore(brand, shell.firstChild);
    }
    if (nav.parentNode !== shell) {
      shell.appendChild(nav);
    }
    if (brand && shell.firstElementChild !== brand) {
      shell.insertBefore(brand, shell.firstChild);
    }
    if (brand && nav.previousElementSibling !== brand) {
      shell.insertBefore(nav, brand.nextElementSibling);
    }
  }

  function decorateHeaderBrandText(header) {
    if (!header) return;
    var brands = header.querySelectorAll('.trh-brand, .header-logo');
    for (var i = 0; i < brands.length; i++) {
      var brand = brands[i];
      if (brand.querySelector('.trh-brand-text')) continue;
      var label = (brand.textContent || '').trim();
      if (!label) continue;
      brand.textContent = '';
      var text = document.createElement('span');
      text.className = 'trh-brand-text';
      text.textContent = label;
      brand.appendChild(text);
    }
  }

  function getCurrentPageName() {
    var path = (window.location && window.location.pathname) ? window.location.pathname : '';
    var name = path.split('/').pop() || '';
    return name ? name.toLowerCase() : 'index.html';
  }

  function markActiveNavLink(nav) {
    if (!nav) return;
    var currentPage = getCurrentPageName();
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = (link.getAttribute('href') || '').toLowerCase();
      var hrefPage = href.split('/').pop();
      link.classList.remove('trh-current');
      link.classList.remove('trh-sub-current');
      if (!hrefPage) continue;
      if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'index.html')) {
        if (link.classList.contains('trh-sub-link')) {
          link.classList.add('trh-sub-current');
          var parentItem = link.closest('.trh-nav-item');
          var parentLink = parentItem ? parentItem.querySelector('.trh-nav-main') : null;
          if (parentLink) parentLink.classList.add('trh-current');
        } else {
          link.classList.add('trh-current');
        }
      }
    }
  }

  function ensureSidebarLayoutClass() {
    if (!document.body) return;
    document.body.classList.add('trh-has-sidebar');
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

  function enhancePageSurfaces() {
    var blocks = document.querySelectorAll('main article, main section, .container');
    for (var i = 0; i < blocks.length; i++) {
      var el = blocks[i];
      if (!el.classList.contains('trh-surface')) {
        if (el.querySelectorAll && el.querySelectorAll('p,li,h2').length > 2) {
          el.classList.add('trh-surface');
        }
      }
    }
  }

  function enhanceFooters() {
    var footers = document.querySelectorAll('footer');
    for (var i = 0; i < footers.length; i++) {
      footers[i].classList.add('trh-modern-footer');
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

  function ensureRootSeoHeading() {
    var desired = 'Trendyol Kar Hesaplama Aracı';
    var desiredSubtitle = 'Trendyol komisyon, kargo ve net kar hesaplama aracı';
    var applyHeading = function() {
      var heading = document.querySelector('#root header h1');
      var subtitle = document.querySelector('#root header p.text-sm');
      if (!heading) return false;
      if (heading.textContent !== desired) {
        heading.textContent = desired;
      }
      if (subtitle && subtitle.textContent !== desiredSubtitle) {
        subtitle.textContent = desiredSubtitle;
      }
      return true;
    };
    if (applyHeading()) return;
    var tries = 0;
    var timer = setInterval(function() {
      tries++;
      if (applyHeading() || tries > 20) {
        clearInterval(timer);
      }
    }, 250);
  }


  function ensureRootFooterLogo() {
    var applyLogo = function() {
      var logos = document.querySelectorAll('#root footer img[alt="Logo"], #root footer img[src*="logo-"]');
      if (!logos.length) return false;
      for (var i = 0; i < logos.length; i++) {
        logos[i].src = '/favicon.ico';
        logos[i].alt = 'Trendyol Rehber Logosu';
        logos[i].style.objectFit = 'contain';
        logos[i].style.borderRadius = '6px';
      }
      return true;
    };
    if (applyLogo()) return;
    var tries = 0;
    var timer = setInterval(function() {
      tries++;
      if (applyLogo() || tries > 24) {
        clearInterval(timer);
      }
    }, 250);
  }

  function init() {
    ensureUnifiedHeader();
    ensureRootSeoHeading();
    ensureRootFooterLogo();
    enhancePageSurfaces();
    enhanceFooters();
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
