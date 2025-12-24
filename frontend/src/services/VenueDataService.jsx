// HTTP istekleri için yapılandırılmış axios instance'ını içe aktar
import http from "./http-common";

// Mekan verileri için API servis sınıfı
// Backend API ile iletişim kurmak için kullanılır
class VenueDataService {
  // Yakındaki mekanları getir - Koordinatlara göre arama yapar
  // lat: Enlem (latitude)
  // long: Boylam (longitude)
  // Örnek: nearbyVenues(37.8322, 30.5247) -> /venues?lat=37.8322&long=30.5247
  nearbyVenues(lat, long) {
    return http.get(`/venues?lat=${lat}&long=${long}`);
  }
  
  // Belirli bir mekanı ID'ye göre getir
  // id: Mekan ID'si
  // Örnek: getVenue(123) -> /venues/123
  getVenue(id) {
    return http.get(`venues/${id}`);
  }

  // --- KORUMALI İŞLEMLER (Token Gerektirir) ---
  // Yeni mekan ekle - Kimlik doğrulama gerektirir
  // data: Eklenecek mekan bilgileri (name, address, coordinates vb.)
  // token: JWT token (kimlik doğrulama için)
  // Authorization header'ı ile token gönderilir
  // Örnek: addVenue({name: "Kafe", address: "İstanbul"}, "abc123token")
  addVenue(data, token) {
    return http.post("/venues", data, {
      headers: { Authorization: `Bearer ${token}` }, // Bearer token ile kimlik doğrulama
    });
  }
  
  // Yorum ekleme fonksiyonu (AddComment.jsx'te kullanılır)
  // Not: Bu fonksiyon şu an kodda yok ama AddComment.jsx'te kullanılıyor
  // Yorum ekleme 
  addComment(id, comment, token) {
    return http.post(`/venues/${id}/comments`, comment, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Admin sayfasındaki tüm mekanları listeleme 
  listAllVenues() {
    return http.get("/venues");
  }

  // Mekan güncelleme 
  updateVenue(id, data, token) {
    return http.put(`/venues/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Mekan silme 
  // Axios delete metodunda header config ikinci parametredir
  removeVenue(id, token) {
    return http.delete(`/venues/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // --- AUTH İŞLEMLERİ ---
  
  // Giriş yapma 
  login(data) {
    return http.post("/login", data);
  }

  // Kayıt olma 
  signup(data) {
    return http.post("/signup", data);
  }

  // Belirli bir yorumu getirme 
  getComment(venueID, commentID) {
    return http.get(`/venues/${venueID}/comments/${commentID}`);
  }

  // Yorum güncelleme 
  updateComment(venueID, commentID, data, token) {
     return http.put(`/venues/${venueID}/comments/${commentID}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  
  // Yorum silme 
  removeComment(venueID, commentID, token) {
    return http.delete(`/venues/${venueID}/comments/${commentID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Admin Paneli: Tüm mekanları getir (Token ile)
  getAllAdmin() {
    const token = localStorage.getItem("token");
    return http.get("/admin/venues", {
      headers: {
        Authorization: `Bearer ${token}` // Token'ı header'a ekliyoruz
      }
    });
  }
  
}

// Sınıfın bir instance'ını oluştur ve dışa aktar
// Bu sayede diğer dosyalarda doğrudan kullanılabilir
// Örnek: VenueDataService.getVenue(123)
export default new VenueDataService();
