const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const signUp = async function (req, res) {
  console.log("Kayıt İsteği (SignUp) Geldi. Body:", req.body); // Debug için: Gelen veriyi konsola yazdıralım
  // Validasyon: Alanlar boş mu?
  if (!req.body.name || !req.body.email || !req.body.password) {   
    createResponse(res, 400, { status: "Tüm alanlar gerekli" });
    return; 
  }
  // Yeni kullanıcı oluşturma
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role || "user";
  user.setPassword(req.body.password); // Şifreyi şifrele (hashle)
  try {
    await user.save();
    let generatedToken = user.generateToken();
    createResponse(res, 200, { token: generatedToken });
  } catch (error) {
    createResponse(res, 400, { status: "Kayıt başarısız" });
  }
};

const login = function (req, res) {
  // Hata ayıklama için log
  console.log("Login İsteği Geldi:", req.body);

  if (!req.body.email || !req.body.password) {
    createResponse(res, 400, { status: "Tüm alanlar gerekli" });
    return;
  }

  passport.authenticate("local", (err, user, info) => {
    // Veritabanı hatası var mı?
    if (err) {
      return createResponse(res, 404, { status: "Veritabanı hatası", error: err });
    }
    // Kullanıcı başarıyla doğrulandı mı?
    if (user) {
      let generatedToken = user.generateToken();
      createResponse(res, 200, { token: generatedToken });
    } 
    // Kullanıcı bulunamadı veya şifre yanlış
    else {
      createResponse(res, 400, {
        status: "Kullanıcı adı ya da şifre hatalı",
      });
    }
  })(req, res);
};

module.exports = {
  signUp,
  login,
};
