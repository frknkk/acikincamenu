# Medyaket Food Site

Modern ve responsive bir yemek şirketi web sitesi. Yönetim paneli sayesinde menüleri, kampanyaları ve site içeriğini kolayca yönetebilirsiniz.

## 🚀 Özellikler

- **Dinamik Menü Yönetimi:** Ürünleri ekleyin, düzenleyin, silin ve kategorilere ayırın.
- **Toplu Menü Yükleme:** Excel dosyası kullanarak yüzlerce ürünü tek seferde yükleyin.
- **Kampanya Yönetimi:** Görseller ve açıklamalarla kampanyalar oluşturun.
- **Yapay Zeka Desteği:** Kampanya açıklamalarını otomatik oluşturmak için Gemini AI entegrasyonu (API anahtarı gerektirir).
- **Tema Özelleştirme:** Yönetim panelinden sitenin ana rengini değiştirin.
- **Responsive Tasarım:** Mobil, tablet ve masaüstü uyumlu.
- **İletişim Entegrasyonu:** Tıklanabilir telefon numaraları ve harita bağlantıları.

## 🛠️ Kurulum

Projeyi bilgisayarınıza klonladıktan sonra aşağıdaki adımları izleyin:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

3. **Tarayıcıda Açın:**
   Terminalde belirtilen adrese gidin (genellikle `http://localhost:5173` veya `http://localhost:5174`).

## 🔐 Yönetim Paneli

Site içeriğini yönetmek için sayfanın en altındaki "Medyaket" yazısına tıklayarak yönetim paneline giriş yapabilirsiniz.

- **Varsayılan Şifre:** `kumru`

## 📂 Proje Yapısı

- `src/components`: Tüm React bileşenleri (AdminPanel, Menu, Hero, vb.)
- `src/context`: Uygulama durumu yönetimi (AppContext)
- `src/assets`: Görseller ve statik dosyalar

## 📝 Notlar

- Yapay zeka özelliklerini kullanmak için Yönetim Paneli > Genel Ayarlar kısmından kendi Gemini API anahtarınızı girmeniz gerekmektedir.
- Veriler tarayıcının `localStorage` alanında saklanır. Tarayıcı önbelleğini temizlerseniz veriler sıfırlanır.
