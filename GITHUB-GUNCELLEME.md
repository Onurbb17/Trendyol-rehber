# GitHub'a Güncelleme Rehberi

Bu rehber, Trendyol Rehber projenizi GitHub'a nasıl güncelleyeceğinizi adım adım açıklar.

---

## Ön Koşullar

- **Git** bilgisayarınızda yüklü olmalı ([İndir](https://git-scm.com/downloads))
- **GitHub hesabınız** olmalı
- Proje klasöründe **Git** başlatılmış olmalı (bu proje zaten klonlandığı için hazır)

---

## Yöntem 1: Terminal (Komut Satırı) ile Güncelleme

### Adım 1: Proje Klasörüne Gidin

```bash
cd "/Users/onursivritas/Desktop/adsız klasör 2"
```

### Adım 2: Değişiklikleri Kontrol Edin

```bash
git status
```

Bu komut, hangi dosyaların değiştiğini gösterir.

### Adım 3: Tüm Değişiklikleri Ekleyin

```bash
git add .
```

Veya sadece belirli dosyaları eklemek isterseniz:

```bash
git add dist/blog.html dist/blog-data.js dist/sitemap.xml dist/robots.txt dist/404.html vercel.json
```

### Adım 4: Commit (Kayıt) Oluşturun

```bash
git commit -m "v1.1: Blog düzeltmeleri, arama özelliği, SEO ve 404 sayfası eklendi"
```

`-m` sonrasındaki mesaj, yaptığınız değişiklikleri özetler. İstediğiniz gibi yazabilirsiniz.

### Adım 5: GitHub'a Gönderin (Push)

```bash
git push origin main
```

**Not:** Eğer `main` yerine `master` branch kullanıyorsanız:

```bash
git push origin master
```

### İlk Kez Push Yapıyorsanız

GitHub kimlik doğrulaması isteyebilir. İki yöntem vardır:

1. **HTTPS:** Kullanıcı adı ve şifre (veya Personal Access Token) girin
2. **SSH:** SSH anahtarınızı GitHub'a eklemeniz gerekir

---

## Yöntem 2: Cursor / VS Code ile Güncelleme

1. Sol taraftaki **Source Control** (veya Git) ikonuna tıklayın
2. Değişen dosyalar listelenecek
3. Her dosyanın yanındaki **+** ile stage edin veya "Stage All Changes" ile hepsini ekleyin
4. Üstteki mesaj kutusuna commit mesajı yazın (örn: "Blog geliştirmeleri")
5. **✓ Commit** butonuna tıklayın
6. **Sync** veya **Push** butonuna tıklayarak GitHub'a gönderin

---

## Yöntem 3: GitHub Desktop ile Güncelleme

1. [GitHub Desktop](https://desktop.github.com/) indirip kurun
2. **File → Add Local Repository** ile proje klasörünü ekleyin
3. Sol tarafta değişikliklerinizi görün
4. Sol altta **Summary** ve **Description** alanlarını doldurun
5. **Commit to main** butonuna tıklayın
6. Üstteki **Push origin** butonuna tıklayın

---

## Vercel Otomatik Deploy

GitHub repo'nuz Vercel'e bağlıysa:

- `git push` yaptığınızda Vercel **otomatik olarak** yeni sürümü yayınlar
- Birkaç dakika içinde trendyolrehber.com güncellenmiş olur

---

## Sık Karşılaşılan Sorunlar

### "Permission denied" veya "Authentication failed"

- GitHub şifreniz yerine **Personal Access Token** kullanmanız gerekebilir
- GitHub → Settings → Developer settings → Personal access tokens
- Yeni token oluşturup şifre yerine onu kullanın

### "Updates were rejected" hatası

Uzaktaki repo'da sizin bilmediğiniz değişiklikler varsa:

```bash
git pull origin main
# Çakışma varsa çözün, sonra:
git push origin main
```

### Branch adı farklıysa

Hangi branch'te olduğunuzu görmek için:

```bash
git branch
```

`main` veya `master` yazacaktır. Push yaparken doğru branch adını kullanın.

---

## Özet Komutlar (Hızlı Güncelleme)

Tüm değişiklikleri tek seferde göndermek için:

```bash
cd "/Users/onursivritas/Desktop/adsız klasör 2"
git add .
git commit -m "Proje güncellemesi"
git push origin main
```
