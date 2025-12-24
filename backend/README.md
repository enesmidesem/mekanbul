# Mekanbul Backend

🔗 **Demo:** <a href="https://mekanbul-backend-kohl.vercel.app/" target="_blank">https://mekanbul-backend-kohl.vercel.app/</a>

Bu repo, **mekanbul-backend** uygulamasının basit bir **Node.js**, **Express** ve **Mongoose** kullanılarak geliştirilmiş backend uygulamasıdır.

---

## Kısa Açıklama

Bu backend API'sinin temel özellikleri şunlardır:

* **Mekan (Venue) Verileri Yönetimi:** API, mekan verileri üzerinde **listeleme**, **ekleme**, **görüntüleme**, **güncelleme** ve **silme** (CRUD) işlemlerini gerçekleştirir.
* **Veritabanı:** **MongoDB Cloud** (Atlas) servisini kullanır. Veritabanı bağlantı bilgileri ve şema detayları için: (`app_api/models/db.js`).

---

## Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

1. Projenin bulunduğu dizine gidin:

```bash
cd /path/to/backend 
# Veya projenizin yerel yolu
```

2. Gerekli tüm Node.js bağımlılıklarını (dependencies) yükleyin:

```bash
npm install
```

---

## Uygulamayı Çalıştırma

Bağımlılıklar yüklendikten sonra, uygulamayı başlatmak için aşağıdaki komutu kullanın:

```bash
npm start
```

---

## API Endpoints

Uygulama aşağıdaki rota (route) ve HTTP metotlarını destekler:

* **Yakındaki mekanı listele:** `GET /api/venues`
* **Yeni mekan ekle:** `POST /api/venues`
* **Mekan detayını getir:** `GET /api/venues/:venueid`
* **Mekanı güncelle:** `PUT /api/venues/:venueid`
* **Mekanı sil:** `DELETE /api/venues/:venueid`
* **Yorum ekle (mekana):** `POST /api/venues/:venueid/comments`
* **Yorum getir:** `GET /api/venues/:venueid/comments/:commentid`
* **Yorum güncelle:** `PUT /api/venues/:venueid/comments/:commentid`
* **Yorum sil:** `DELETE /api/venues/:venueid/comments/:commentid`

---

## Postman Test Sonucu

Aşağıda Postman ile alınmış test sonuçlarının ekran görüntüsü bulunmaktadır:

<img width="2557" height="1393" alt="AddVenue" src="https://github.com/user-attachments/assets/042553d3-902b-44c4-aa81-462871d916d5" />

<img width="2559" height="1393" alt="AddComment" src="https://github.com/user-attachments/assets/b88a0d3c-86e8-48b9-b34e-df0cbacdc7dc" />

<img width="2559" height="1393" alt="UpdateVenue" src="https://github.com/user-attachments/assets/b8cc2914-a22d-47d0-b546-efc5abdd086b" />

<img width="2559" height="1390" alt="UpdateComment" src="https://github.com/user-attachments/assets/82b04857-d81a-4761-a8f7-e6f618e77654" />

<img width="2555" height="1390" alt="GetVenue" src="https://github.com/user-attachments/assets/207a5d3d-e1e2-4359-8c55-52a6f90436cc" />

<img width="2559" height="1392" alt="GetComment" src="https://github.com/user-attachments/assets/f59b2d4b-93f7-479e-bec1-9ebce8e3c422" />

<img width="2559" height="1390" alt="ListNearlyVenues" src="https://github.com/user-attachments/assets/a96deabd-9461-4f39-9c65-9ca8f4f36ca7" />

<img width="2559" height="1390" alt="DeleteComment" src="https://github.com/user-attachments/assets/a5377496-07be-48c6-9448-ab235143447d" />

<img width="2559" height="1390" alt="DeleteVenue" src="https://github.com/user-attachments/assets/b1be5c13-de64-4e7c-ba4c-c266eedd66b5" />
