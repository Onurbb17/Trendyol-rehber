# Trendyol Satıcı Rehberi (trendyolrehber.com)

Statik site: kar hesaplayıcı, rehber sayfaları, blog ve SEO dosyaları. Deploy hedefi `dist/`.

## Klasör yapısı

```
├── dist/                 # Canlı site çıktısı (Vercel outputDirectory)
│   ├── index.html
│   ├── blog.html
│   ├── blog-data.js      # Blog içerik kaynağı
│   ├── blog/             # Statik blog makaleleri (generator ile üretilir)
│   ├── assets/           # JS/CSS bundle + logo
│   ├── css/              # Ek stiller (ör. blog-article.css)
│   ├── sitemap.xml       # npm run generate:sitemap ile güncellenir
│   └── …                 # Diğer HTML sayfaları
├── docs/                 # Rehberler, SEO/AdSense notları, GitHub talimatları
├── scripts/              # Blog sayfası ve sitemap üretim scriptleri
├── package.json          # npm run generate*
└── vercel.json           # Vercel yönlendirme / çıktı klasörü
```

Detaylı doküman listesi: [docs/README.md](docs/README.md).

## Komutlar

```bash
npm run generate       # blog HTML + sitemap
npm run build          # aynı (Vercel “Build Command” için önerilen)
npm run generate:blog
npm run generate:sitemap
```

Vercel: **Build Command** = `npm run build`, **Output Directory** = `dist` (her dağıtımda sitemap ve blog sayfaları yenilenir).

Script açıklamaları: [scripts/README.md](scripts/README.md).

## Yerel önizleme

```bash
cd dist && python3 -m http.server 8000
# http://localhost:8000
```

## Özellikler (özet)

- Blog arama, statik `blog/*.html` URL’leri, iç bağlantılar
- `sitemap.xml`, `robots.txt`, çoğu sayfada şema / OG meta
- Vercel: `outputDirectory: dist` (bkz. `vercel.json`)

## GitHub güncelleme

Adımlar: [docs/GITHUB-GUNCELLEME.md](docs/GITHUB-GUNCELLEME.md).

---

**Not:** `dist/` içindeki çok sayıda `.html` dosyası kasıtlıdır; her biri kendi URL’sine karşılık gelir (alt klasöre taşımak tüm iç linkleri ve sitemap’i değiştirir).
