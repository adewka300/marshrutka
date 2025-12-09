import './PlacesPages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

function MuseumsPage() {
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

  // Данные музеев
  const museums = [
    {
      id: 1,
      title: "Третьяковская галерея",
      description: `Характеристика: главный музей национального русского искусства, основанный купцом Павлом Третьяковым в 1856 году.
Коллекция: более 180 тысяч произведений русского искусства XI-XXI веков.
Особенность: знаменитая "Троица" Андрея Рублева, картины Репина, Сурикова, Васнецова.
Адрес: Лаврушинский пер., 10, Москва`,
      image: "/assets/images/tret.jpg",
      icon: "🎨"
    },
    {
      id: 2,
      title: "Государственный исторический музей",
      description: `Характеристика: крупнейший исторический музей России, расположенный на Красной площади.
Коллекция: более 5 миллионов экспонатов от древности до XX века.
Особенность: парадные сени с росписями по эскизам Васнецова, коллекция оружия, драгоценностей, рукописей.
Адрес: Красная пл., 1, Москва`,
      image: "/assets/images/gosist.jpg",
      icon: "🏛️"
    },
    {
      id: 3,
      title: "Пушкинский музей",
      description: `Характеристика: музей зарубежного искусства, один из крупнейших в России.
Коллекция: произведения искусства с древнейших времен до наших дней, коллекция импрессионистов.
Особенность: галерея искусства стран Европы и Америки XIX-XX веков, регулярные крупные выставки.
Адрес: ул. Волхонка, 12, Москва`,
      image: "/assets/images/pushkinmus.jpg",
      icon: "📚"
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
              <h1 className="places-hero-title font-kankin">МУЗЕИ</h1>
            </div>
          </div>
        </section>
        
        <section className="places-content">
          <div className="places-container">
            {/* Карточки музеев */}
            {museums.map((museum) => (
              <div key={museum.id} className="place-card">
                <div className="place-card__title-section">
                  <div className="place-card__icon">
                    <span className="place-card__icon-emoji">{museum.icon}</span>
                  </div>
                  <h2 className="place-card__title font-georgia">{museum.title}</h2>
                </div>
                
                <div className="place-card__content">
                  <div className="place-card__image-wrapper">
                    <img 
                      src={museum.image} 
                      alt={museum.title} 
                      className="place-card__image" 
                    />
                  </div>
                  
                  <div className="place-card__description">
                    <div className="place-card__description-content">
                      {museum.description.split('\n').map((line, idx) => (
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
              Погрузитесь в мир искусства и истории в лучших музеях Москвы — от классических собраний до современных экспозиций
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MuseumsPage;