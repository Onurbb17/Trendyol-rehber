# AdSense Onay Kontrol Listesi

Bu dosya, siteyi AdSense onayina hazir tutmak icin teknik ve icerik adimlarini listeler.

## 1) Teknik Durum (Bu Surumde Yapilanlar)

- `ads.txt` dogru formatta ve ana domainde yayinlanmis durumda.
- `www` -> apex (`trendyolrehber.com`) 308 yonlendirmesi aktif.
- Yeni guven sayfalari eklendi:
  - `dist/iletisim.html`
  - `dist/cerez-politikasi.html`
  - `dist/kullanim-kosullari.html`
- `sitemap.xml` guncellendi:
  - `index.html` duplicate girişi kaldirildi.
  - Yeni guven sayfalari eklendi.
  - Ince icerik 3 sayfa sitemap'ten cikarildi.
- `robots.txt` uzerinden yedek/yardimci sayfalar disallow edildi:
  - `index-original.html`
  - `dizine-ekle.html`

## 2) Ince Icerik / Noindex Kararlari (Uygulandi)

Asagidaki sayfalar "Icerik hazirlaniyor" oldugu icin gecici olarak `noindex, nofollow` yapildi:

- `dist/trendyol-2026-trendleri.html`
- `dist/trendyol-komisyon-degisiklikleri.html`
- `dist/trendyol-kargo-guncellemeleri.html`

## 3) Icerik Kalitesi (Yapilacaklar)

AdSense'in "dusuk degerli icerik" riskini azaltmak icin:

- En az 8 ana rehber sayfasini 1200+ kelimeye cikar.
- Her ana sayfada:
  - net problem tanimi,
  - adim adim cozum,
  - 1-2 gercek ornek senaryo,
  - son guncellenme tarihi
  alanlarini bulundur.
- "Icerik hazirlaniyor" metinli sayfa birakma:
  - ya tam icerik yaz
  - ya `noindex`te tut
  - ya ilgili guclu sayfaya 301 yonlendir.

## 4) Reklam Yogunlugu (Yapilan Duzenleme)

- Placeholder ad slot (`YOUR_ADSENSE_AD_SLOT_ID`) kodlari kaldirildi.
- `monetization.js` sadeleştirildi:
  - agresif affiliate/lead form bloklari kaldirildi,
  - icerik-oncelikli ic link bloklari birakildi.

## 5) Basvuru Oncesi Son Kontrol

1. Search Console'da sitemap tekrar gonder.
2. URL Inspection ile 5 kritik sayfayi canli test et:
   - `/`
   - `/trendyol-rehber.html`
   - `/trendyol-satici-rehberi.html`
   - `/gizlilik-politikasi.html`
   - `/iletisim.html`
3. Kapsam raporunda duplicate / soft-404 artisina bak.
4. Son buyuk guncellemeden sonra 7-10 gun stabil bekle.
5. Sonra AdSense tekrar inceleme istegi gonder.
