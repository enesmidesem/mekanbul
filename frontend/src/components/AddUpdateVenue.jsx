import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { useSelector } from "react-redux"; 

const AddUpdateVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  

  // Form State
  const [venue, setVenue] = useState({
    name: "",
    address: "",
    foodanddrink: "",
    rating: "",
    lat: "",
    long: "",
    days1: "", open1: "", close1: "", isClosed1: false,
    days2: "", open2: "", close2: "", isClosed2: false
  });

  const [error, setError] = useState("");

  // Güvenlik Kontrolü
  useEffect(() => {
    if (!isLoggedIn || !user || user.role !== "admin") {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  // Veri çekme
  useEffect(() => {
    if (id) {
      getVenue(id);
    }
  }, [id]);

  const getVenue = (id) => {
    VenueDataService.getVenue(id)
      .then((response) => {
        const data = response.data;

        let vName = data.name || "";
        let vAddress = data.address || "";
        let vRating = data.rating || "";
        let vFood = "";
        let vLat = "";
        let vLong = "";
        
        let vDays1 = "", vOpen1 = "", vClose1 = "", vIsClosed1 = false;
        let vDays2 = "", vOpen2 = "", vClose2 = "", vIsClosed2 = false;

        if (Array.isArray(data.foodanddrink)) {
          vFood = data.foodanddrink.join(", ");
        } else {
          vFood = data.foodanddrink || "";
        }

        if (data.coordinates && Array.isArray(data.coordinates) && data.coordinates.length >= 2) {
          vLat = data.coordinates[0]; 
          vLong = data.coordinates[1];
        } else {
          vLat = data.lat || "";
          vLong = data.long || "";
        }

        if (data.hours && Array.isArray(data.hours) && data.hours.length > 0) {
          const h1 = data.hours[0];
          if (h1) {
            vDays1 = h1.day || h1.days || ""; 
            vOpen1 = h1.open || h1.opening || "";
            vClose1 = h1.close || h1.closing || "";
            vIsClosed1 = h1.isClosed || false;
          }
          const h2 = data.hours[1];
          if (h2) {
            vDays2 = h2.day || h2.days || "";
            vOpen2 = h2.open || h2.opening || "";
            vClose2 = h2.close || h2.closing || "";
            vIsClosed2 = h2.isClosed || false;
          }
        } 
        
        if (!vDays1 && data.days1) { 
           vDays1 = data.days1; vOpen1 = data.open1; vClose1 = data.close1; vIsClosed1 = data.isClosed1;
        }
        if (!vDays2 && data.days2) { 
           vDays2 = data.days2; vOpen2 = data.open2; vClose2 = data.close2; vIsClosed2 = data.isClosed2;
        }

        setVenue({
          name: vName,
          address: vAddress,
          rating: vRating,
          foodanddrink: vFood,
          lat: vLat,
          long: vLong,
          days1: vDays1, open1: vOpen1, close1: vClose1, isClosed1: vIsClosed1,
          days2: vDays2, open2: vOpen2, close2: vClose2, isClosed2: vIsClosed2
        });
      })
      .catch((e) => {
        console.error(e);
        setError("Veri çekilemedi.");
      });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setVenue({ ...venue, [name]: val });
  };

  const saveVenue = async (e) => {
  e.preventDefault();
  setError("");
  const token = localStorage.getItem("token");

  // Kapalı olan günler için açılış-kapanış saatlerini "Kapalı" yap
  const dataToSend = {
    ...venue,
    open1: venue.isClosed1 ? "Kapalı" : venue.open1,
    close1: venue.isClosed1 ? "Kapalı" : venue.close1,
    open2: venue.isClosed2 ? "Kapalı" : venue.open2,
    close2: venue.isClosed2 ? "Kapalı" : venue.close2,
  };

  try {
    if (id) {
      await VenueDataService.updateVenue(id, dataToSend, token);
      alert("Mekan başarıyla güncellendi.");
    } else {
      await VenueDataService.addVenue(dataToSend, token);
      alert("Yeni mekan başarıyla eklendi.");
    }
    navigate("/admin");
  } catch (err) {
    console.error(err);
    setError("İşlem başarısız. Lütfen bilgileri kontrol edin.");
  }
};

  return (
    <div className="container" style={{ marginTop: "100px", marginBottom: "50px" }}>
      {/* Başlık */}
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
          Yönetici <span style={{ fontWeight: '300', color: '#999', fontSize: '24px' }}>
            {id ? `${venue.name} mekanını güncelleyin!` : 'Yeni mekan ekleyin!'}
          </span>
        </h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={saveVenue}>
        {/* Ad */}
        <div className="mb-3">
          <label className="form-label fw-bold">Ad:</label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            value={venue.name} 
            onChange={handleInputChange} 
            required 
            style={{ maxWidth: '600px' }}
          />
        </div>

        {/* Adres */}
        <div className="mb-3">
          <label className="form-label fw-bold">Adres:</label>
          <input 
            type="text" 
            className="form-control" 
            name="address" 
            value={venue.address} 
            onChange={handleInputChange} 
            required 
            style={{ maxWidth: '600px' }}
          />
        </div>

        {/* İmkanlar */}
        <div className="mb-3">
          <label className="form-label fw-bold">İmkanlar:</label>
          <input 
            type="text" 
            className="form-control" 
            name="foodanddrink" 
            placeholder="çay, kahve, pasta" 
            value={venue.foodanddrink} 
            onChange={handleInputChange} 
            style={{ maxWidth: '600px' }}
          />
        </div>

        {/* Enlem (Latitude) */}
        <div className="mb-3">
          <label className="form-label fw-bold">Enlem (Latitude):</label>
          <input 
            type="text" 
            className="form-control" 
            name="lat" 
            value={venue.lat} 
            onChange={handleInputChange} 
            required 
            style={{ maxWidth: '600px' }}
          />
        </div>

        {/* Boylam (Longitude) */}
        <div className="mb-3">
          <label className="form-label fw-bold">Boylam (Longitude):</label>
          <input 
            type="text" 
            className="form-control" 
            name="long" 
            value={venue.long} 
            onChange={handleInputChange} 
            required 
            style={{ maxWidth: '600px' }}
          />
        </div>

        {/* Günler-1 */}
        <div className="mb-3">
          <label className="form-label fw-bold">Günler-1:</label>
          <input 
            type="text" 
            className="form-control" 
            name="days1" 
            placeholder="Pazartesi-Cuma" 
            value={venue.days1} 
            onChange={handleInputChange} 
            required 
            style={{ maxWidth: '600px' }}
          />
        </div>

        {/* Açılış & Kapanış-1 */}
        <div className="mb-3">
          <label className="form-label fw-bold">Açılış & Kapanış-1:</label>
          <div style={{ maxWidth: '600px' }}>
            <div className="form-check mb-2">
              <input 
                type="checkbox" 
                className="form-check-input" 
                name="isClosed1" 
                id="isClosed1"
                checked={venue.isClosed1} 
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isClosed1">
                Kapalı
              </label>
            </div>

            {/* Kapalı değilse input'ları göster */}
            {!venue.isClosed1 && (
              <>
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  name="open1" 
                  placeholder="9:00" 
                  value={venue.open1} 
                  onChange={handleInputChange} 
                  required 
                />
                <input 
                  type="text" 
                  className="form-control" 
                  name="close1" 
                  placeholder="23:00"
                  value={venue.close1} 
                  onChange={handleInputChange} 
                  required 
                />
              </>
            )}
          </div>
        </div>

       {/* Günler-2 */}
        <div className="mb-3">
          <label className="form-label fw-bold">Günler-2 (Opsiyonel):</label>
          <input 
            type="text" 
            className="form-control" 
            name="days2" 
            placeholder="Cumartesi-Pazar (boş bırakabilirsiniz)" 
            value={venue.days2} 
            onChange={handleInputChange} 
            // required KALDIRILDI
            style={{ maxWidth: '600px' }}
          />
        </div>

        {/* Açılış & Kapanış-2 */}
        <div className="mb-4">
          <label className="form-label fw-bold">Açılış & Kapanış-2 (Opsiyonel):</label>
          <div style={{ maxWidth: '600px' }}>
            {/* Kapalı Checkbox */}
            <div className="form-check mb-2">
              <input 
                type="checkbox" 
                className="form-check-input" 
                name="isClosed2" 
                id="isClosed2"
                checked={venue.isClosed2} 
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="isClosed2">
                Kapalı
              </label>
            </div>

            {/* Kapalı değilse input'ları göster */}
            {!venue.isClosed2 && (
              <>
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  name="open2" 
                  placeholder="11:00 (boş bırakabilirsiniz)" 
                  value={venue.open2} 
                  onChange={handleInputChange} 
                />
                <input 
                  type="text" 
                  className="form-control" 
                  name="close2" 
                  placeholder="15:00 (boş bırakabilirsiniz)"
                  value={venue.close2} 
                  onChange={handleInputChange} 
                />
              </>
            )}
          </div>
        </div>

        {/* Güncelle Butonu */}
        <div>
          <button 
            type="submit" 
            className="btn"
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '8px 24px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {id ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUpdateVenue;