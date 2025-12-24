// Gerekli bileşenleri ve kütüphaneleri içe aktar
import Header from "./Header"; // Sayfa başlığı bileşeni
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // Router hook'ları
import VenueDataService from "../services/VenueDataService"; // API servisi
import { useDispatch, useSelector } from "react-redux"; // Redux state yönetimi
import Modal from "./Modal"; // Modal bileşeni


// Yorum ekleme sayfası bileşeni
function AddComment() {
  // URL'den mekan ID'sini al (örn: /venue/123/comment/new -> id = 123)
  const { id } = useParams();
  
  // Bir önceki sayfadan gelen bilgiyi almak için kullanılır (mekan adı vb.)
  const location = useLocation();
  
  // Redux kullanımı - State'i güncellemek için
  const dispatch = useDispatch(); 
  
  // Sayfa yönlendirme işlemleri için kullanılır
  const navigate = useNavigate();

// Giriş yapan kullanıcı bilgisi 
  const user = useSelector((state) => state.user);
  
  // Modal gösterimi için state
  const [showModal, setShowModal] = useState(false);

  // Modal kapatma fonksiyonu
  const handleModalClose = () => {
    setShowModal(false);
    navigate(`/venue/${id}`); // Slide'daki gibi template literal kullanımı
  };

  // Form gönderildiğinde çalışan fonksiyon
  const onSubmit = (evt) => {
    evt.preventDefault(); // Sayfanın yenilenmesini engelle

    // Kullanıcının giriş yapıp yapmadığını kontrol et
    const token = localStorage.getItem("token");
    
    // Form alanlarının dolu olup olmadığını kontrol et
    if(evt.target.elements.author.value && 
      evt.target.elements.text.value && 
      evt.target.elements.rating.value){
        // Yeni yorum objesi oluştur
        let newComment = {
          author: evt.target.elements.author.value, // Yorum yazarı
          text: evt.target.elements.text.value, // Yorum metni
          rating: evt.target.elements.rating.value // Yorum puanı
        }       

        VenueDataService.addComment(id, newComment, token)
        .then((response) => {
          // Yorum başarıyla eklendiğinde Redux state'i güncelle
          dispatch({type:"ADD_COMMENT_SUCCESS"});
          setShowModal(true); // Modal'ı göster
          
          // Yorum eklendikten sonra mekan detay sayfasına yönlendir
          // navigate("/venue/"+id);
        })
        .catch((e) => {
          console.log(e);
          alert("Yorum eklenirken bir hata oluştu!"); // Hata durumunda uyarı göster
        });
      }
  };

  
  return (
    <>
      {/* Sayfa başlığı - Önceki sayfadan gelen mekan adını göster */}
      <Header headerText={location.state.name} motto=" mekanına yorum yap" />
      
      <div className="row">
        <div className="col-xs-12 col-md-6">
          {/* Yorum ekleme formu */}
          <form
            className="form-horizontal"
            id="yorumEkle"
            onSubmit={(evt) => onSubmit(evt)}
          >
            {/* İsim alanı */}
            <div className="form-group">
              <label className="col-sm-2 control-label">İsim:</label>
              <div className="col-sm-10">
                <input type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  value={user ? user.name : ""} // Değeri Redux'tan gelen isim olsun
                  readOnly // Kullanıcı değiştiremesin
                />
              </div>
            </div>
            
            {/* Puan seçimi (1-5 arası) */}
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">
                Puan:
              </label>
              <div className="col-xs-12 col-sm-2">
                <select
                  className="form-control input-sm"
                  id="rating"
                  name="rating"
                >
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </select>
              </div>
            </div>
            
            {/* Yorum metni alanı */}
            <div className="form-group">
              <label className="col-sm-2 control-label">Yorum:</label>
              <div className="col-sm-10">
                <textarea
                  className="review form-control"
                  name="text"
                  rows={5}
                />
              </div>
            </div>
            
            {/* Form gönderme butonu */}
            <button className="btn btn-default pull-right">Yorum Ekle</button>
          </form>
        </div>      
      </div>
      <Modal
        show={showModal}
        onClose={handleModalClose}
        title="Tebrikler!"
        message="Yorumunuz yayınlandı!"
      />
    </>
  );
}

// Bileşeni dışa aktar
export default AddComment;