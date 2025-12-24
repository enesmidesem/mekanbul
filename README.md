# 🏢 MEKANBUL

MERN Stack (MongoDB, Express.js, React, Node.js) teknolojileri ile geliştirilmiş konum tabanlı mekan bulma ve yönetim uygulaması.

## 🌐 Canlı Adresler

- **Frontend:** https://mekanbul-frontend-delta.vercel.app/
- **Backend API:** https://mekanbul-backend-seven-self.vercel.app/

## 📝 Proje Hakkında

Kullanıcıların bulundukları konuma yakın mekanları keşfetmelerine, mekanlar hakkında yorum yapmalarına ve puanlama yapmalarına olanak sağlayan web uygulaması. Admin paneli ile tam mekan yönetimi desteği.

## ✨ Özellikler

**Kullanıcı:**
- 📍 Konum bazlı mekan arama
- 🔍 Mekan filtreleme
- ⭐ Mekan detayları ve harita görünümü
- 💬 Yorum ve puanlama
- 🔐 JWT Authentication

**Admin:**
- ➕ Mekan ekleme/düzenleme/silme
- 📊 Tüm mekanları yönetme
- ⏱️ 10 saniye hareketsizlik güvenliği

## 🛠️ Teknolojiler

**Frontend:** React, Redux, React Router, Axios, Bootstrap  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT

## 📁 Proje Yapısı

```
mekanbul/
├── backend/           # Express API
│   ├── app_api/
│   │   ├── config/   # DB & Passport
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   └── app.js
├── frontend/          # React App
│   └── src/
│       ├── components/
│       ├── services/
│       └── redux/
└── README.md
```

## 👤 Admin Kullanıcısı

**Admin:**
- Kullanıcı Adı: `asy1`
- Şifre: `asy1`

## 🔗 API Endpoints

**Public:**
- `GET /api/venues?lat=X&long=Y` - Mekanları listele
- `GET /api/venues/:id` - Mekan detayı
- `POST /api/login` - Giriş
- `POST /api/signup` - Kayıt

**Protected (JWT Token):**
- `POST /api/venues` - Mekan ekle
- `PUT /api/venues/:id` - Mekan güncelle
- `DELETE /api/venues/:id` - Mekan sil
- `POST /api/venues/:id/comments` - Yorum ekle
- `GET /api/admin/venues` - Admin: Tüm mekanlar


## 📸 Postman API Test Ekran Görüntüleri

### 1. Signup - Yeni Kullanıcı Kaydı
![Signup](https://github.com/user-attachments/assets/64828bad-086a-4a0b-8ba7-6b3c798950ca)

### 2. Login - Giriş Yapma
![Login](https://github.com/user-attachments/assets/5d7442c9-b99d-40e2-a59a-2c4ff542f25d)

### 3. Add Venue - Yeni Mekan Ekleme (Admin)
![Add Venue](https://github.com/user-attachments/assets/b5d47116-d91b-448c-b836-40095f29f825)

### 4. Add Comment - Yorum Ekleme
![Add Comment](https://github.com/user-attachments/assets/6e669041-08ee-49cc-9b64-4dd356ad5963)

### 5. Update Venue - Mekan Güncelleme (Admin)
![Update Venue](https://github.com/user-attachments/assets/6d2e5396-1331-4bd1-bb61-80a530c16185)

### 6. Update Comment - Yorum Güncelleme
![Update Comment](https://github.com/user-attachments/assets/235d03f0-dfb5-4a1d-9952-ea7d8c3ce9f5)

### 7. Get Venue - Belirli Mekanı Getirme
![Get Venue](https://github.com/user-attachments/assets/0bcc8295-a1aa-461b-af68-cf072ee13a39)

### 8. Get Comment - Belirli Yorumu Getirme
![Get Comment]("https://github.com/user-attachments/assets/7967b1d5-974f-4c82-b93e-940b268b0fb8)

### 9. List Nearly Venues - Yakındaki Mekanları Listeleme
![List Nearly Venues](https://github.com/user-attachments/assets/493773fa-5384-478c-9ae3-834633a00eab)

### 10. Delete Comment - Yorum Silme
![Delete Comment](https://github.com/user-attachments/assets/a0bbebc1-c535-4b52-b6a6-ccdf23b71017)

### 11. Delete Venue - Mekan Silme 
![Delete Venue](https://github.com/user-attachments/assets/41dfcd20-0dd1-427a-8197-4ff51de7b88f)




## 🚀 Kurulum

### Backend:
```bash
cd backend
npm install
# .env dosyasını oluştur (MONGODB_URI, JWT_SECRET)
npm start
```

### Frontend:
```bash
cd frontend
npm install
npm start
```

## 📦 Deployment

Vercel üzerinde yayınlanmıştır. Backend ve Frontend ayrı Vercel projeleri olarak deploy edilmiştir.
