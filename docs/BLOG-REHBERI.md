# Trendyol Rehber - Blog Yayınlama Rehberi

Bu rehber, projenize nasıl yeni blog yazıları ekleyeceğinizi adım adım açıklar.

## Blog Nasıl Çalışıyor?

- **blog.html**: Blog listesi ve yazıları gösteren ana sayfa
- **blog-data.js**: Tüm blog yazılarının içeriğini içeren veri dosyası
- Yeni blog eklemek için sadece `blog-data.js` dosyasına yeni bir girdi eklemeniz yeterli

---

## Yeni Blog Yazısı Ekleme Adımları

### 1. blog-data.js Dosyasını Açın

`dist/blog-data.js` dosyasını bir metin editörü ile açın.

### 2. Yeni Blog Nesnesi Ekleyin

`blogPosts` dizisinin içine (virgülle ayırarak) aşağıdaki şablonu kullanarak yeni bir blog ekleyin:

```javascript
{
  id: 'benzersiz-url-id',           // Örn: 'yeni-konum' - URL'de kullanılır, tire ile yazın
  title: 'Blog Başlığı',            // Görünen başlık
  excerpt: 'Kısa özet (1-2 cümle)', // Kartlarda gösterilen özet
  readTime: '5 dk okuma',           // Tahmini okuma süresi
  category: 'Kategori Adı',         // Örn: Rehber, Pazarlama, SEO
  icon: '📝',                       // Emoji ikon (📊 💰 📦 🚀 🔍 📞 🚚 📈 vb.)
  content: `
    <h1>Sayfa Başlığı</h1>
    
    <p>Paragraf metni...</p>
    
    <h2>Alt Başlık</h2>
    
    <ul>
      <li>Madde 1</li>
      <li>Madde 2</li>
    </ul>
    
    <div class="highlight-box">
      <p><strong>İpucu:</strong> Önemli bilgi kutusu</p>
    </div>
    
    <div class="cta-box">
      <h3>Kar Hesaplayıcıya Yönlendirme</h3>
      <p>Açıklama metni</p>
      <a href="index.html" class="cta-btn">Kar Hesaplayıcıya Git</a>
    </div>
    
    <div class="back-to-home">
      <a href="#" class="back-btn" onclick="showBlogList()">← Blog Listesine Dön</a>
    </div>
  `
}
```

### 3. Önemli Kurallar

| Kural | Açıklama |
|-------|----------|
| **id** | Benzersiz olmalı, sadece küçük harf ve tire (-) kullanın |
| **content** | HTML kullanabilirsiniz. Tırnak içinde `\'` kullanın (örn: `Trendyol\'da`) |
| **Kaçış** | İçerikte `"` yerine `\"` kullanın |
| **Virgül** | Her blog nesnesinden sonra virgül (,) ekleyin (son öğe hariç) |

### 4. Kullanılabilir HTML Sınıfları

- `highlight-box` - Sarı uyarı/ipucu kutusu
- `cta-box` - Turuncu çağrı-eylem kutusu
- `cta-btn` - Beyaz buton (cta-box içinde)
- `back-btn` - Gri "Geri Dön" butonu

### 5. Örnek: Yeni Blog Ekleme

```javascript
// blog-data.js içinde, mevcut bir blogdan sonra virgül ekleyip:

{
  id: 'trendyol-stok-yonetimi',
  title: 'Trendyol Stok Yönetimi: Akıllı Stok Kontrolü',
  excerpt: 'Stok takibi ve otomasyon ile satışlarınızı kaçırmayın.',
  readTime: '6 dk okuma',
  category: 'Operasyon',
  icon: '📦',
  content: `
    <h1>Trendyol Stok Yönetimi</h1>
    <p>Stok yönetimi e-ticarette kritik öneme sahiptir...</p>
    <div class="cta-box">
      <h3>Karlılığınızı Hesaplayın!</h3>
      <a href="index.html" class="cta-btn">Kar Hesaplayıcıya Git</a>
    </div>
    <div class="back-to-home">
      <a href="#" class="back-btn" onclick="showBlogList()">← Blog Listesine Dön</a>
    </div>
  `
}
```

---

## Vercel'e Yayınlama

Değişikliklerinizi yaptıktan sonra:

1. **Git ile push edin:**
   ```bash
   git add dist/blog-data.js
   git commit -m "Yeni blog yazısı eklendi"
   git push origin main
   ```

2. Vercel otomatik olarak yeni sürümü yayınlayacaktır (GitHub entegrasyonu varsa).

3. **Manuel deploy** için: Vercel dashboard'dan "Redeploy" yapın veya `dist` klasörünü tekrar yükleyin.

---

## Doğrudan Link ile Blog Açma

Bir blog yazısına doğrudan link vermek için:

```
https://trendyolrehber.com/blog.html#blog-id
```

Örnek: `https://trendyolrehber.com/blog.html#kar-hesaplama`

---

## Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| Blog listesi boş | Tarayıcı konsolunda (F12) hata var mı kontrol edin. `blog-data.js` yükleniyor mu? |
| "Devamını Oku" çalışmıyor | `id` değerinin benzersiz olduğundan emin olun |
| İçerik bozuk görünüyor | `content` içindeki tırnak kaçışlarını (`\'`, `\"`) kontrol edin |
| En Çok Görüntülenen boş | `blog.html` içindeki `getBlogPostById()` ID'lerinin mevcut bloglarda olduğundan emin olun |
