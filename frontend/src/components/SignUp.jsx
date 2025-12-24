import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Backend'e Kayıt İsteği atar
      const response = await VenueDataService.signup(user); 

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const decodedUser = jwtDecode(response.data.token);
        
        dispatch({ type: "SIGNUP_SUCCESS", payload: decodedUser });
        dispatch({ type: "LOGIN_SUCCESS", payload: decodedUser });

        navigate("/");
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Kayıt oluşturulamadı. Lütfen bilgileri kontrol edin.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white text-center">Kayıt Ol</div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Ad Soyad:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">E-posta (Kullanıcı Adı):</label>
                  <input
                    type="text"   //burayı email yaparsak @ işareti kontrolünü otomatik yapıyor sonra emaile çevirebilirsin
                    name="email"
                    className="form-control"
                    value={user.email}
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
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Kayıt Ol
                </button>
              </form>
              <div className="mt-3 text-center">
                Zaten üye misiniz? <NavLink to="/login" className="text-success fw-bold">Giriş Yap</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;