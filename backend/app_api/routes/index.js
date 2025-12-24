var express= require('express');
var router=express.Router();
var venueController=require("../controller/VenueController");
var commentController=require("../controller/CommentController");
const ctrlAuth = require("../controller/Auth"); // ctrlAuth eklendi
const jwt= require('express-jwt');

const auth = jwt.expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
});

// Admin Check Middleware (Rol Kontrolü)
const adminCheck = (req, res, next) => {
    // req.auth, express-jwt tarafından oluşturulur
    if (!req.auth || req.auth.role !== 'admin') {
        return res.status(403).json({ "message": "Bu işlem için Admin yetkisi gereklidir!" });
    }
    next();
};

router
.route("/venues")
.get(venueController.listVenues)
.post(auth, adminCheck, venueController.addVenue); // Sadece Admin ekleyebilir

router
.route("/venues/:venueid")
.get(venueController.getVenue)
.put(auth, adminCheck, venueController.updateVenue) // Sadece Admin güncelleyebilir
.delete(auth, adminCheck, venueController.deleteVenue); // Sadece Admin silebilir

router
.route("/venues/:venueid/comments")
.post(auth, commentController.addComment); // Sadece giriş yapanlar yorum yapabilir

router
.route("/venues/:venueid/comments/:commentid")
.get(commentController.getComment)
.put(auth, adminCheck, commentController.updateComment)
.delete(auth, adminCheck, commentController.deleteComment);

router.post("/signup", ctrlAuth.signUp);
router.post("/login", ctrlAuth.login);

router
.route("/admin/venues") // Admin paneli tüm mekanları buradan çekecek
.get(auth, adminCheck, venueController.listAllVenues); // sadece Admin görebilir

module.exports=router;