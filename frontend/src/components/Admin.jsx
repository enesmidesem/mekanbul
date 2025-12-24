import React, { useState, useEffect } from "react";
import VenueDataService from "../services/VenueDataService";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import Rating from "./Rating";
import FoodAndDrinkList from "./FoodAndDrinkList";

const Admin = () => {
  const [venues, setVenues] = useState([]);
  const [countdown, setCountdown] = useState(10); // Geri sayım için state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);

  // 10 saniye hareketsizlik sonrası oturumdan atma
  useEffect(() => {
    let inactivityTimer;
    let countdownInterval;

    const logoutUser = () => {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      alert("Güvenlik gereği 10 saniye hareketsiz kaldığınız için çıkış yapıldı.");
    };

    const resetTimer = () => {
      // Önceki timer'ları temizle
      clearTimeout(inactivityTimer);
      clearInterval(countdownInterval);
      
      // Sayacı sıfırla
      setCountdown(10);
      
      // Yeni geri sayımı başlat
      let timeLeft = 10;
      countdownInterval = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
      
      // 10 saniye sonra çıkış yap
      inactivityTimer = setTimeout(logoutUser, 10000);
    };

    // Olay dinleyicilerini ekle
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // İlk açılışta sayacı başlat
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownInterval);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isLoggedIn || !user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    retrieveVenues();
  }, [user, isLoggedIn, navigate]);

  const retrieveVenues = () => {
    VenueDataService.getAllAdmin()
      .then((response) => {
        setVenues(response.data);
      })
      .catch((e) => {
        console.log(e);
        if(e.response && e.response.status === 401) {
            navigate("/login");
        }
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu mekanı kalıcı olarak silmek istediğinize emin misiniz?")) {
      try {
        const token = localStorage.getItem("token");
        await VenueDataService.removeVenue(id, token);
        setVenues(venues.filter((venue) => venue._id !== id));
        alert("Mekan silindi.");
      } catch (error) {
        console.error("Silme hatası:", error);
        alert("Hata: Mekan silinemedi. Yetkiniz bitmiş olabilir.");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px", minHeight: "80vh" }}>
      
      {/* Başlık ve Buton */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          color: '#333', 
          fontWeight: '400',
          fontSize: '32px',
          marginBottom: '5px',
          borderBottom: '2px solid #dc3545',
          paddingBottom: '10px',
          width: '100%'
        }}>
          Yönetici <span style={{ fontWeight: '300', color: '#999', fontSize: '24px' }}>Mekanlarınızı Yönetin! ( {countdown} sn)</span>
        </h2>
        <div style={{ marginTop: '20px' }}>
          <button 
            className="btn btn-success"
            onClick={() => navigate("/admin/add")}
          >
             + Mekan Ekle
          </button>
        </div>
      </div>
      
      {venues.length > 0 ? (
        <div className="list-group">
          {venues.map((venue) => (
            <div key={venue._id} className="col-xs-12 col-sm-12" style={{ marginBottom: '15px' }}>
              <div className="col-xs-12 list-group-item" style={{ position: 'relative' }}>
                <h4 
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/venue/${venue._id}`)}
                >
                  <span style={{ color: '#dc3545', textDecoration: 'none', fontWeight: '500' }}>
                    {venue.name}
                  </span>{" "}
                  <Rating rating={venue.rating} />
                </h4>
                
                <div style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Mekan detayına gitmesini engelle
                      navigate(`/admin/update/${venue._id}`);
                    }}
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      backgroundColor: '#007bff',
                      borderColor: '#007bff'
                    }}
                  >
                    Güncelle
                  </button>
                  
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Mekan detayına gitmesini engelle
                      handleDelete(venue._id);
                    }}
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      backgroundColor: '#dc3545',
                      borderColor: '#dc3545'
                    }}
                  >
                    Sil
                  </button>
                </div>
                
                {/* Mekan adresi */}
                <p className="address">{venue.address}</p>
                
                {/* Yiyecek ve içecek listesi */}
                {venue.foodanddrink && venue.foodanddrink.length > 0 && (
                  <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center">
            Yükleniyor veya henüz mekan eklenmemiş.
        </div>
      )}
    </div>
  );
};

export default Admin;