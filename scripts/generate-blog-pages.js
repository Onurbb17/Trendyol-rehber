/**
 * Statik blog makale sayfaları üretir: dist/blog/{id}.html
 * Çalıştır: node scripts/generate-blog-pages.js
 */
const fs = require('fs');
const path = require('path');
const { blogPosts } = require('../dist/blog-data.js');

const OUT_DIR = path.join(__dirname, '../dist/blog');
const BASE = 'https://trendyolrehber.com';

function truncateForMeta(text, max) {
  if (!text) return '';
  const t = String(text).trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trim() + '…';
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cleanContent(html) {
  let h = html;
  h = h.replace(/<div class="back-to-home">[\s\S]*?<\/div>/gi, '');
  h = h.replace(
    /href="(?!https?:\/\/|\/\/|mailto:|#|tel:|\.\.\/)([a-zA-Z0-9\-]+\.html)"/g,
    'href="../$1"'
  );
  return h.trim();
}

/** In-article AdSense: makalenin başında, ilk iki paragraftan sonra (2. </p>); kenar çubuğu değil */
function injectInArticleAd(html) {
  const pushTag =
    '<script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>';
  const adBlock =
    '<div class="blog-in-article-ad" aria-label="Reklam">' +
    '<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-9409905856635578" data-ad-slot="2171871029"></ins>' +
    '</div>' +
    pushTag;
  const re = /<\/p>/gi;
  let m;
  let n = 0;
  let cut = -1;
  while ((m = re.exec(html)) !== null) {
    n += 1;
    if (n === 2) {
      cut = m.index + m[0].length;
      break;
    }
  }
  if (cut >= 0) {
    return html.slice(0, cut) + '\n' + adBlock + '\n' + html.slice(cut);
  }
  const one = /<\/p>/i.exec(html);
  if (one) {
    const idx = one.index + one[0].length;
    return html.slice(0, idx) + '\n' + adBlock + '\n' + html.slice(idx);
  }
  const h1 = /<\/h1>/i.exec(html);
  if (h1) {
    const idx = h1.index + h1[0].length;
    return html.slice(0, idx) + '\n' + adBlock + '\n' + html.slice(idx);
  }
  return adBlock + '\n' + html;
}

function getRelated(current, all, n) {
  const others = all.filter((p) => p.id !== current.id);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, n);
}

function buildPage(post, allPosts) {
  const related = getRelated(post, allPosts, 3);
  const desc = truncateForMeta(post.excerpt, 155);
  const canonical = `${BASE}/blog/${post.id}.html`;
  const content = injectInArticleAd(cleanContent(post.content));

  const relatedHtml =
    related.length > 0
      ? `<aside class="blog-related" aria-labelledby="related-h">
  <h2 id="related-h">İlgili yazılar</h2>
  <ul>
${related
  .map(
    (p) =>
      `    <li><a href="${p.id}.html">${escapeHtml(p.title)}</a> <span style="color:#8fa8d4;font-size:0.8rem;">(${escapeHtml(p.category)})</span></li>`
  )
  .join('\n')}
  </ul>
</aside>`
      : '';

  const guidesHtml = `<section class="blog-more-guides" aria-labelledby="guides-h">
  <h2 id="guides-h">Rehber ve araçlar</h2>
  <ul>
    <li><a href="../trendyol-rehber.html">Trendyol rehber merkezi</a> — tüm rehberler</li>
    <li><a href="../trendyol-araclari.html">Kar, komisyon ve desi hesaplayıcılar</a></li>
    <li><a href="../trendyol-komisyon-hesaplama.html">Komisyon hesaplama rehberi</a></li>
    <li><a href="../index.html">Trendyol kar hesaplama aracı</a></li>
    <li><a href="../blog.html">Blog ana sayfa</a> — tüm yazılar</li>
  </ul>
</section>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: desc,
    url: canonical,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    isPartOf: {
      '@type': 'Blog',
      name: 'Trendyol Satıcı Rehberi - E-ticaret Blog',
      url: `${BASE}/blog.html`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Trendyol Rehber',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/favicon.ico` }
    },
    author: { '@type': 'Organization', name: 'Trendyol Rehber' },
    articleSection: post.category,
    inLanguage: 'tr-TR'
  };

  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${escapeAttr(desc)}" />
  <title>${escapeHtml(post.title)} | Trendyol Blog Rehberi</title>
  <link rel="canonical" href="${canonical}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${escapeAttr(post.title + ' | Trendyol Blog')}" />
  <meta property="og:description" content="${escapeAttr(desc)}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${BASE}/blog-hero-trendyolrehber.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <meta name="google-adsense-account" content="ca-pub-9409905856635578" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9409905856635578" crossorigin="anonymous"></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-X0F2HEPCC1"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-X0F2HEPCC1");</script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <link rel="stylesheet" crossorigin href="../assets/index-BehjH3cC.css" />
  <link rel="stylesheet" href="../css/blog-article.css" />
</head>
<body class="bg-gray-50">
  <div class="blog-static-wrap">
    <nav class="blog-static-breadcrumb" aria-label="Gezinti">
      <a href="../index.html">Ana sayfa</a> › <a href="../blog.html">Blog</a> › <span>${escapeHtml(post.title)}</span>
    </nav>
    <article class="blog-article">
${content}
      <div class="back-to-home">
        <a href="../blog.html" class="back-btn">← Blog listesine dön</a>
      </div>
    </article>
${relatedHtml}
${guidesHtml}
    <div class="blog-display-ad" aria-label="Reklam">
      <!-- görüntülü -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-9409905856635578"
           data-ad-slot="2255764955"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    <footer class="blog-static-footer trh-modern-footer">
      <a href="../trendyol-rehber.html">Trendyol Rehber</a>
      <a href="../gizlilik-politikasi.html">Gizlilik Politikası</a>
      <a href="../cerez-politikasi.html">Çerez Politikası</a>
      <a href="../kullanim-kosullari.html">Kullanım Koşulları</a>
      <a href="../iletisim.html">İletişim</a>
    </footer>
  </div>
  <script src="../cookie-consent.js"></script>
</body>
</html>`;
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

let count = 0;
for (const post of blogPosts) {
  const file = path.join(OUT_DIR, `${post.id}.html`);
  fs.writeFileSync(file, buildPage(post, blogPosts), 'utf8');
  count++;
  console.log('Yazıldı:', path.relative(path.join(__dirname, '..'), file));
}
console.log('Tamam:', count, 'sayfa');
