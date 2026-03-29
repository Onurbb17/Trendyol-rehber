# Build scriptleri

| Script | Açıklama |
|--------|-----------|
| `generate-blog-pages.js` | `dist/blog-data.js` okuyup `dist/blog/{id}.html` statik sayfalarını üretir. |
| `generate-sitemap.js` | `dist` içindeki HTML’leri tarayıp `dist/sitemap.xml` yazar (404, index-original, dizine-ekle hariç). |

Kök dizinden:

```bash
npm run generate:blog
npm run generate:sitemap
npm run generate   # ikisini arka arkaya
```

`blog-data.js` içeriğini değiştirdikten sonra `npm run generate` çalıştırın.
