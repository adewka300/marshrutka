import './PlacesPages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

function ParksPage() {
  const navigate = useNavigate();

  // Функция для возврата на главную страницу в секцию "Популярные места"
  const handleBackToPlaces = () => {
    // Переходим на главную страницу
    navigate('/');
    
    // Даем время на загрузку страницы, затем скроллим к секции
    setTimeout(() => {
      const element = document.getElementById('places-section');
      if (element) {
        const headerHeight = 96; // Высота хедера
        const offset = headerHeight - 70; // Отступ сверху
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); // 100мс обычно достаточно
  };

  // Данные парков
  const parks = [
    {
      id: 1,
      title: "Парк Горького",
      description: `Характеристика: парк Горького — главный парк Москвы, сочетающий историческое наследие и современную инфраструктуру. Здесь сохранились элементы первоначального ландшафтного дизайна 1920-х годов, включая знаменитые входные арки и фонтаны.

Площадь: 219 гектаров
Инфраструктура: летние кинотеатры, спортивные площадки, лодочная станция, рестораны, детские городки, зоны для пикников и зимний каток.
Адрес: Крымский Вал, 9, Москва`,
      image: "/assets/images/pg.jpg",
      icon: "🌳"
    },
    {
      id: 2,
      title: "Царицыно",
      description: `Характеристика: Царицыно — дворцово-парковый ансамбль в неоготическом стиле, построенный для императрицы Екатерины II. Парк сохранил историческую планировку XVIII века и является памятником садово-паркового искусства.
Площадь: 405 гектаров
Инфраструктура: музей-заповедник, оранжереи, концертный зал, лодочная станция, рестораны в исторических зданиях, детские площадки.
Адрес: Дольская ул., 1, Москва`,
      image: "/assets/images/tsar.jpeg",
      icon: "🏰"
    },
    {
      id: 3,
      title: "Зарядье",
      description: `Характеристика: современный парк, построенный на месте снесённой гостиницы "Россия". Сочетает инновационные технологии с природными ландшафтами и уникальной архитектурой.

Площадь: 13 гектаров
Инфраструктура: медиацентр, концертный зал, подземный музей, рестораны, лектории, научно-познавательный центр "Заповедное посольство".
Адрес: ул. Варварка, 6, стр. 1, Москва`,
      image: "/assets/images/zaryad.jpg",
      icon: "🌉"
    }
  ];

  return (
    <div className="page page--places">
      <Header currentPage="places" />
      
      <main className="page-wrapper">
        <section className="places-hero">
          <div className="places-container">
            <div className="places-hero-title-group">
              <button 
                className="places-hero-subtitle"
                onClick={handleBackToPlaces}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div className="places-hero-arrow">
                  <svg width="70" height="33" viewBox="0 0 70 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 16.5H65" stroke="var(--banner-color)" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M58 9L65 16.5L58 24" stroke="var(--banner-color)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="places-hero-subtitle-text">Популярные места</span>
              </button>
              <h1 className="places-hero-title font-kankin">ПАРКИ</h1>
            </div>
          </div>
        </section>
        
        <section className="places-content">
          <div className="places-container">
            {/* Карточки парков */}
            {parks.map((park, index) => (
              <div key={park.id} className="place-card">
                <div className="place-card__title-section">
                  <div className="place-card__icon">
                    <span className="place-card__icon-emoji">{park.icon}</span>
                  </div>
                  <h2 className="place-card__title font-georgia">{park.title}</h2>
                </div>
                
                <div className="place-card__content">
                  <div className="place-card__image-wrapper">
                    <img 
                      src={park.image} 
                      alt={park.title} 
                      className="place-card__image" 
                    />
                  </div>
                  
                  <div className="place-card__description">
                    <div className="place-card__description-content">
                      {park.description.split('\n').map((line, idx) => (
                        <p key={idx} className="place-card__description-line">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <p className="places-page-footer-text font-kankin">
              Исследуйте самые красивые парки Москвы — от исторических ансамблей до современных ландшафтных проектов
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ParksPage;