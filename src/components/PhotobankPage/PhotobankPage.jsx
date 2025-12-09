import { useState } from 'react';
import './PhotobankPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function PhotobankPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    // Блокируем скролл при открытии модального окна
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    // Восстанавливаем скролл
    document.body.style.overflow = 'auto';
  };

  // Данные фотографий
  const photos = [
    { id: 1, src: "/assets/images/foto6.png", alt: "Театр", className: "photo-card--tall" },
    { id: 2, src: "/assets/images/foto16.jpg", alt: "Москва вечер", className: "photo-card--wide" },
    { id: 3, src: "/assets/images/foto12.png", alt: "Стол", className: "" },
    { id: 4, src: "/assets/images/foto7.png", alt: "Ресторан стойка", className: "photo-card--tall" },
    { id: 5, src: "/assets/images/foto14.png", alt: "Красная Москва", className: "" },
    { id: 6, src: "/assets/images/foto18.jpg", alt: "Виж из окна", className: "" },
    { id: 7, src: "/assets/images/foto19.jpg", alt: "Ночь", className: "photo-card--wide" },
    { id: 8, src: "/assets/images/foto2.png", alt: "Большая глина", className: "" },
    { id: 9, src: "/assets/images/foto11.png", alt: "Третьяковская галерея", className: "photo-card--tall" },
    { id: 10, src: "/assets/images/foto9.png", alt: "Барная стойка", className: "" },
    { id: 11, src: "/assets/images/foto20.jpg", alt: "Рабочий Колхозница", className: "" },
    { id: 13, src: "/assets/images/foto13.png", alt: "Пешеходная зона", className: "" },
    { id: 14, src: "/assets/images/foto4.png", alt: "Пешеходная зона", className: "" },
    { id: 15, src: "/assets/images/foto21.jpg", alt: "Улица без людей", className: "" },
    { id: 16, src: "/assets/images/foto1.png", alt: "Ресторан", className: "" },
    { id: 17, src: "/assets/images/foto3.png", alt: "Высотное здание", className: "" },
    { id: 18, src: "/assets/images/foto8.png", alt: "Кремль", className: "" },
  ];

  return (
    <div className="page page--photobank">
      <Header pageType="photobank" currentPage="photobank" />
      
      <main>
        <section className="photobank-hero">
          <div className="container">
            <h1>ФОТОБАНК</h1>
            <p>Бесплатные изображения туристических объектов и природы со всей Москвы</p>
          </div>
        </section>

        <section className="photobank-gallery">
          <div className="container photobank-grid">
            {photos.map((photo) => (
              <figure 
                key={photo.id}
                className={`photo-card ${photo.className}`}
                onClick={() => handleImageClick(photo.src)}
              >
                <img src={photo.src} alt={photo.alt} />
              </figure>
            ))}
          </div>
        </section>
      </main>

      {/* Модальное окно для полноэкранного просмотра */}
      {selectedImage && (
        <div className="photo-modal" onClick={handleCloseModal}>
          <div className="photo-modal__content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="photo-modal__close"
              onClick={handleCloseModal}
              aria-label="Закрыть"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Полноэкранный просмотр" 
              className="photo-modal__image"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default PhotobankPage;