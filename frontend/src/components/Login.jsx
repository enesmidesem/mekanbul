import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Sayfa yönlendirmesi için
import VenueDataService from "../services/VenueDataService";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode"; // Token çözümlemek için

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cred, setCred] = useState({
    email: "asy1",
    password: "asy1",
  });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Backend'e istek at
      const response = await VenueDataService.login(cred);
      
      if (response.data.token) {
        // Token'ı localStorage'a kaydet
        localStorage.setItem("token", response.data.token);

        // Token'ı çözümle
        const user = jwtDecode(response.data.token);

        // Redux'a kullanıcıyı gönder
        dispatch({ type: "LOGIN_SUCCESS", payload: user });

        // Yönlendirme
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Giriş yapılamadı. E-posta veya şifre hatalı.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white text-center">Giriş Yap</div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">E-posta:</label>
                  <input
                    type="text"    //burayı email yaparsak @ işareti kontrolünü otomatik yapıyor sonra emaile çevirebilirsin
                    name="email"
                    className="form-control"
                    value={cred.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Şifre:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={cred.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Giriş Yap
                </button>
              </form>
              <div className="mt-3 text-center">
                Üye değil misiniz? <NavLink to="/signup" className="text-danger fw-bold">Kayıt Ol</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;