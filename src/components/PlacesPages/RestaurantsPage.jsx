import './PlacesPages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

function RestaurantsPage() {
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
    
  // Данные ресторанов
  const restaurants = [
    {
      id: 1,
      title: "White Rabbit",
      description: `Характеристика: легендарный ресторан на 16 этаже с панорамным видом на Москву. Входит в список The World's 50 Best Restaurants.
Кухня: современная русская кухня с авторским подходом.
Особенность: стеклянный купол, вращающийся на 360 градусов, винная карта на 4000 позиций.
Адрес: Смоленская пл., 3, Москва`,
      image: "/assets/images/wr.jpg",
      icon: "🍽️"
    },
    {
      id: 2,
      title: "Cafe Pushkin",
      description: `Характеристика: ресторан в стиле дворянской усадьбы XIX века, атмосфера пушкинской эпохи.
Кухня: классическая русская и европейская кухня.
Особенность: работает круглосуточно, библиотека с редкими книгами, кондитерская на первом этаже.
Адрес: Тверской бульвар, 26А, Москва`,
      image: "/assets/images/pushkin.png",
      icon: "🏛️"
    },
    {
      id: 3,
      title: "Turandot",
      description: `Характеристика: роскошный ресторан в стиле восточного дворца с интерьерами XVIII века.
Кухня: паназиатская, европейская, русская.
Особенность: концерты классической музыки, самый дорогой ресторан Москвы по стоимости отделки.
Адрес: Тверской бульвар, 26, стр. 3, Москва`,
      image: "/assets/images/tur.jpeg",
      icon: "🎭"
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
              <h1 className="places-hero-title font-kankin">РЕСТОРАНЫ</h1>
            </div>
          </div>
        </section>
        
        <section className="places-content">
          <div className="places-container">
            {/* Карточки ресторанов */}
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="place-card">
                <div className="place-card__title-section">
                  <div className="place-card__icon">
                    <span className="place-card__icon-emoji">{restaurant.icon}</span>
                  </div>
                  <h2 className="place-card__title font-georgia">{restaurant.title}</h2>
                </div>
                
                <div className="place-card__content">
                  <div className="place-card__image-wrapper">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.title} 
                      className="place-card__image" 
                    />
                  </div>
                  
                  <div className="place-card__description">
                    <div className="place-card__description-content">
                      {restaurant.description.split('\n').map((line, idx) => (
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
              Откройте для себя лучшие рестораны Москвы — от гастрономических шедевров до уютных исторических мест
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default RestaurantsPage;