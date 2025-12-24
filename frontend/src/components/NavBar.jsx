// React Router'dan NavLink ve useNavigate'i içe aktar
import { NavLink, useNavigate } from "react-router-dom";
// Redux kancalarını içe aktar (State'ten veri çekmek ve aksiyon göndermek için)
import { useSelector, useDispatch } from "react-redux";

// Navigasyon çubuğu (navbar) bileşeni
function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 // State'i parça parça çekiyoruz, böylece gereksiz render önleniyor
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);

  // 2. Çıkış Yapma Fonksiyonu
  const handleLogout = () => {
    // Tarayıcı hafızasından token'ı sil
    localStorage.removeItem("token");
    // Redux state'ini sıfırla (Reducer'ındaki LOGOUT case'i çalışır)
    dispatch({ type: "LOGOUT" });
    // Kullanıcıyı ana sayfaya yönlendir
    navigate("/");
  };

  return (
    <div className="navbar-default navbar navbar-fixed-top">
      <div className="container">
        {/* Navbar başlık bölümü */}
        <div className="navbar-header">
          <NavLink className="navbar-brand" to="/">Mekanbul</NavLink>
          
          {/* Mobil cihazlar için hamburger menü butonu */}
          <button
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-main"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        
        {/* Menü öğeleri */}
        <div id="navbar-main" className="navbar-collapse collapse">
          
          {/* SOL TARAFTAKİ LİNKLER */}
          <ul className="nav navbar-nav">
            <li>
              <NavLink to="/about">Hakkında</NavLink> 
            </li>
            {/* Eğer kullanıcı giriş yapmışsa VE rolü 'admin' ise Yönetici linkini göster */}
            {isLoggedIn && user && user.role === "admin" && (
              <li>
                <NavLink to="/admin">Yönetici</NavLink>
              </li>
            )}
          </ul>

          {/* SAĞ TARAFTAKİ LİNKLER (Giriş/Çıkış Bölümü) */}
          <ul className="nav navbar-nav navbar-right">
            {isLoggedIn ? (
              // --- DURUM A: Kullanıcı Giriş Yapmışsa ---
              <>
                {/* Kullanıcı Adını Göster (Tıklanamaz link görünümünde) */}
                <li>
                  <a style={{ cursor: "default", fontWeight: "bold" }}>
                    Hoşgeldin, {user.name}
                  </a>
                </li>
                {/* Çıkış Yap Butonu */}
                <li>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-link navbar-btn"
                    style={{ textDecoration: 'none', color: '#777', fontWeight: 'bold' }}
                  >
                    Çıkış Yap
                  </button>
                </li>
              </>
            ) : (
              // --- DURUM B: Kullanıcı Giriş Yapmamışsa ---
              <>
                <li>
                  <NavLink to="/login">Giriş Yap</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Kayıt Ol</NavLink>
                </li>
              </>
            )}
          </ul>

        </div>
      </div>
    </div>
  );
}

// Bileşeni dışa aktar
export default NavBar;