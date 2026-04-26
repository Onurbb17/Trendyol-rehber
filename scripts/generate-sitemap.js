/**
 * dist içindeki tüm HTML sayfalarını tarar, dist/sitemap.xml üretir.
 * Çalıştır: node scripts/generate-sitemap.js
 */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '../dist');
const OUT = path.join(DIST, 'sitemap.xml');
const BASE = 'https://trendyolrehber.com';

const EXCLUDE = new Set(['404.html', 'index-original.html', 'dizine-ekle.html']);

function walkHtml(dir, rootDir = dir) {
  const out = [];
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      out.push(...walkHtml(full, rootDir));
    } else if (name.isFile() && name.name.endsWith('.html')) {
      const rel = path.relative(rootDir, full).split(path.sep).join('/');
      if (EXCLUDE.has(rel)) continue;
      out.push({ rel, mtime: fs.statSync(full).mtime });
    }
  }
  return out;
}

/** Vercel cleanUrls: kanonik URL'ler sondaki .html olmadan (GSC yinelenen URL birleşimi). */
function toLoc(rel) {
  if (rel === 'index.html') return `${BASE}/`;
  const noExt = rel.replace(/\.html$/i, '');
  return `${BASE}/${noExt}`;
}

function lastmod(d) {
  return d.toISOString().slice(0, 10);
}

function priority(rel) {
  if (rel === 'index.html') return '1.0';
  if (
    rel === 'blog.html' ||
    rel === 'trendyol-satici-rehberi.html' ||
    rel === 'trendyol-rehber.html'
  ) {
    return '0.95';
  }
  if (rel.startsWith('blog/')) return '0.82';
  if (
    ['gizlilik-politikasi.html', 'cerez-politikasi.html', 'kullanim-kosullari.html', 'hakkimizda.html'].includes(
      rel
    )
  ) {
    return '0.5';
  }
  if (rel === 'iletisim.html') return '0.55';
  if (rel === 'sss.html') return '0.7';
  if (
    [
      'trendyol-ceza-puani.html',
      'trendyol-ceza-puani-dusurme.html',
      'trendyol-urun-askiya-alindi.html',
      'trendyol-hesap-kapanir-mi.html'
    ].includes(rel)
  ) {
    return '0.75';
  }
  return '0.8';
}

function changefreq(rel) {
  if (
    rel === 'index.html' ||
    rel === 'blog.html' ||
    rel === 'trendyol-rehber.html' ||
    rel === 'trendyol-satici-rehberi.html'
  ) {
    return 'weekly';
  }
  return 'monthly';
}

function sortKey(rel) {
  if (rel === 'index.html') return '0';
  if (rel === 'blog.html') return '1';
  return '2' + rel;
}

const files = walkHtml(DIST).sort((a, b) => sortKey(a.rel).localeCompare(sortKey(b.rel)));

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;
for (const { rel, mtime } of files) {
  const loc = toLoc(rel);
  xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod(mtime)}</lastmod>
    <changefreq>${changefreq(rel)}</changefreq>
    <priority>${priority(rel)}</priority>
  </url>
`;
}
xml += '</urlset>\n';

fs.writeFileSync(OUT, xml, 'utf8');
console.log('Sitemap:', files.length, 'URL →', path.relative(path.join(__dirname, '..'), OUT));
