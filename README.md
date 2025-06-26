# Trendyol Satıcı Rehberi - Blog Entegrasyonu

Bu proje, mevcut Trendyol kar hesaplayıcı uygulamasına blog bölümü eklenmiş güncellenmiş versiyonudur.

## 🚀 Yeni Özellikler

### Blog Bölümü
- **4 adet SEO dostu blog yazısı** içeren kapsamlı rehber sayfası
- **Responsive tasarım** - mobil ve masaüstü uyumlu
- **Tema uyumlu tasarım** - mevcut projenin renk şeması ve stiline uygun
- **Interaktif navigasyon** - blog yazıları arasında kolay geçiş

### Blog Yazıları
1. **Trendyol'da Nasıl Hesap Açılır? Adım Adım Rehber**
   - Hesap açma süreci
   - Gerekli belgeler
   - Onay süreci

2. **Trendyol Kar Hesaplama: Doğru Fiyatlandırma Stratejileri**
   - Komisyon hesaplama
   - Maliyet optimizasyonu
   - Rekabetçi fiyatlandırma

3. **Ürün Listeleme ve Optimizasyon Teknikleri**
   - SEO optimizasyonu
   - Görsel optimizasyonu
   - Kategori seçimi

4. **Satış Artırma Stratejileri ve Pazarlama İpuçları**
   - Reklam sistemleri
   - Müşteri deneyimi
   - Kampanya stratejileri

### Entegrasyon Özellikleri
- **Floating Blog Butonu** - sağ alt köşede sabit blog erişim butonu
- **CTA Bölümü** - ana sayfada blog rehberine yönlendiren çağrı-eylem bölümü
- **Çapraz Bağlantılar** - blog yazılarından kar hesaplayıcıya yönlendirmeler

## 📁 Dosya Yapısı

```
dist/
├── index.html              # Ana sayfa (blog butonu eklenmiş)
├── blog.html               # Blog ana sayfası ve tüm yazılar
├── index-original.html     # Orijinal ana sayfa (yedek)
├── assets/
│   ├── index-BehjH3cC.css  # Stil dosyası
│   ├── index-DCTaKFmQ.js   # JavaScript dosyası
│   └── logo-K4BhMvNr.png   # Logo dosyası
└── favicon.ico             # Site ikonu
```

## 🛠️ Kurulum ve Kullanım

### Yerel Test
```bash
cd dist
python -m http.server 8000
# Tarayıcıda http://localhost:8000 adresini açın
```

### Vercel Deployment
1. `dist` klasörünü Vercel'e yükleyin
2. Build ayarlarını yapılandırın:
   - Build Command: (boş bırakın)
   - Output Directory: `dist`
   - Install Command: (boş bırakın)

## 🎨 Tasarım Özellikleri

- **Renk Paleti**: Turuncu gradyan (#ff6b35 - #f7931e) ana tema
- **Typography**: Modern, okunabilir font seçimleri
- **Layout**: Grid tabanlı responsive tasarım
- **Animasyonlar**: Hover efektleri ve geçiş animasyonları
- **Icons**: Emoji tabanlı görsel öğeler

## 📱 Responsive Özellikler

- **Desktop**: Tam özellikli grid layout
- **Tablet**: Uyarlanabilir grid sistemi
- **Mobile**: Tek sütun layout, dokunmatik optimizasyonu

## 🔗 Navigasyon

- Ana sayfa → Blog sayfası (floating buton ve CTA bölümü)
- Blog listesi → Bireysel yazılar (JavaScript tabanlı)
- Blog yazıları → Ana sayfa (geri dönüş butonları)
- Blog yazıları → Kar hesaplayıcı (CTA butonları)

## 📈 SEO Optimizasyonu

- **Meta Tags**: Her sayfa için optimize edilmiş meta açıklamaları
- **Keywords**: E-ticaret ve Trendyol odaklı anahtar kelimeler
- **Content Structure**: H1, H2, H3 hiyerarşisi
- **Internal Linking**: Sayfalar arası çapraz bağlantılar

## 🚀 Deployment Notları

- Tüm dosyalar statik HTML/CSS/JS olarak hazırlanmıştır
- Herhangi bir backend gereksinimine ihtiyaç yoktur
- CDN ve static hosting servisleri ile uyumludur
- Vercel, Netlify, GitHub Pages gibi platformlarda çalışır

## 📞 Destek

Herhangi bir sorun yaşarsanız veya ek özellik talepleriniz varsa lütfen iletişime geçin.

---

**Geliştirici**: Onurbb1717  
**Versiyon**: 1.0  
**Tarih**: 26 Haziran 2025

