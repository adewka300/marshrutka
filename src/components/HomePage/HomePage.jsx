import { useEffect, useRef, useState } from 'react';
import React from 'react';
import './HomePage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const totalRoutes = 5;

  useEffect(() => {
    const header = headerRef.current;
    const hero = heroRef.current;
    
    if (!header || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle('site-header--solid', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToRoutes = () => {
    const element = document.getElementById('routes-section');
    if (element) {
      const headerHeight = 96;
      const offset = headerHeight - 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleRouteCardClick = (routeId) => {
    navigate(`/route/${routeId}`);
  };

  const handlePrevRoute = () => {
    if (currentRouteIndex > 0) {
      setCurrentRouteIndex(prev => prev - 1);
    }
  };

  const handleNextRoute = () => {
    if (currentRouteIndex < totalRoutes - 3) {
      setCurrentRouteIndex(prev => prev + 1);
    }
  };

  const handlePhotobankClick = () => {
    navigate('/photobank', { replace: true });
    window.scrollTo(0, 0);
  };

  const handleAllNewsClick = () => {
  navigate('/news'); 
  window.scrollTo(0, 0);
};

const handleParksClick = () => {
  navigate('/places/parks');
};

const handleRestaurantsClick = () => {
  navigate('/places/restaurants');
};

const handleMuseumsClick = () => {
  navigate('/places/museums');
};

  // 5 отдельных карточек с РАЗНЫМИ данными
  const routeCards = [
    { 
    id: 1, 
    title: "Москва<br>за выходные", 
    description: "Откройте главное и необычное за один уикенд",
    image: "/assets/images/mesto_1.png"
  },
  { 
    id: 2, 
    title: "Москва<br>за 3 дня", 
    description: "Влюбиться в город с первого взгляда",
    image: "/assets/images/mesto_2.png"
  },
  { 
    id: 3, 
    title: "Москва<br>за 5 дней", 
    description: "От величия архитектуры до камерных пространств",
    image: "/assets/images/mesto_3.png"
  },
    { 
      id: 4, 
      title: "Москва<br>за 7 дней", 
      description: "Семь дней истории, прогулок и маленьких открытий",
      image: "/assets/images/mesto_4.png"
    },
    { 
      id: 5, 
      title: "Москва<br>за 10 дней", 
      description: "Исследуйте Москву во всем многообразии",
      image: "/assets/images/mesto_5.png"
    }
  ];

  return (
    <div className="page page--home">
      <Header 
        ref={headerRef} 
        pageType="home" 
        currentPage="" 
      />
      
      <main>
        <section className="home-hero" ref={heroRef}>
          <div className="home-hero__image">
            <img src="/assets/images/hero.jpg" alt="Москва на рассвете" />
          </div>
          <div className="container home-hero__content">
            <div>
              <p className="home-hero__eyebrow">Маршрутка<br />по Москве</p>
              <p className="home-hero__lead">Маршруты для тех, кто <br/>хочет увидеть больше — <br/>выберите свой</p>
              <button 
                className="button button--primary button--solid" 
                type="button"
                onClick={scrollToRoutes}
              >
                Присоединиться
              </button>
            </div>
          </div>
        </section>

       <section id="routes-section" className="home-section home-section--routes">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>Маршруты</h2>
                <p>Прогулки, которые меняют представление о столице</p>
              </div>
            </div>
            <div className="routes-carousel">
              <div className="cards-row cards-row--routes">
                {routeCards.slice(currentRouteIndex, currentRouteIndex + 3).map((route) => (
                  <article 
                    key={route.id}
                    className="route-card"
                    onClick={() => handleRouteCardClick(route.id)}
                  >
                    <figure>
                      <img src={route.image} alt={route.title.replace('<br>', ' ')} />
                      <figcaption>
                        <strong>
                          {route.title.split('<br>').map((part, index, array) => (
                            <React.Fragment key={index}>
                              {part}
                              {index < array.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </strong>
                        <span>{route.description}</span>
                      </figcaption>
                    </figure>
                  </article>
                ))}
              </div>
            </div>
            
            {/* Стрелка "Назад" - показывается только если есть куда листать */}
            {currentRouteIndex > 0 && (
              <button 
                className="slider-button slider-button--prev"
                type="button" 
                aria-label="Предыдущий маршрут"
                onClick={handlePrevRoute}
              >
                <img src="/assets/icons/chevron.svg" alt="" aria-hidden="true" />
              </button>
            )}
            
            {/* Стрелка "Вперед" - показывается только если есть куда листать */}
            {currentRouteIndex < totalRoutes - 3 && (
              <button 
                className="slider-button slider-button--next"
                type="button" 
                aria-label="Следующий маршрут"
                onClick={handleNextRoute}
              >
                <img src="/assets/icons/chevron.svg" alt="" aria-hidden="true" />
              </button>
            )}
             {/* <-- Вставляем индикатор прогресса/точки сюда --> */}
          <div className="routes-dots">
          {Array.from({ length: totalRoutes - 2 }).map((_, idx) => (
            <div
              key={idx}
              className={`routes-dots__dot ${idx === currentRouteIndex ? 'active' : ''}`}
              onClick={() => setCurrentRouteIndex(idx)} // <-- при клике переключаемся на этот индекс
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
          </div>
        </section>

        <section id="places-section" className="home-section home-section--places">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>Популярные места</h2>
              </div>
            </div>
            <div className="cards-row cards-row--places">
              <article 
                className="place-card"
                onClick={handleParksClick}
              >
                <figure>
                  <img src="/assets/images/place_1.png" alt="Парки" />
                  <figcaption>
                    <strong>Парки</strong>
                  </figcaption>
                </figure>
              </article>
              <article 
                className="place-card"
                onClick={handleRestaurantsClick}
              >
                <figure>
                  <img src="/assets/images/place_2.png" alt="Рестораны" />
                  <figcaption>
                    <strong>Рестораны</strong>
                  </figcaption>
                </figure>
              </article>
              <article 
                className="place-card"
                onClick={handleMuseumsClick}
              >
                <figure>
                  <img src="/assets/images/place_3.png" alt="Музеи" />
                  <figcaption>
                    <strong>Музеи</strong>
                  </figcaption>
                </figure>
                
              </article>
            </div>
          </div>
        </section>

        <section id="photobank-section" className="home-section home-section--photobank">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>Фотобанк</h2>
                <p>Бесплатные изображения туристических объектов и природы со всей Москвы</p>
              </div>
            </div>
            <div className="photobank-preview">
              <figure className="pb-card">
                <img src="/assets/images/foto1.png" alt="Фотография 1" />
              </figure>
              <figure className="pb-card">
                <img src="/assets/images/foto2.png" alt="Фотография 2" />
              </figure>
              <figure className="pb-card">
                <img src="/assets/images/foto3.png" alt="Фотография 3" />
              </figure>
              <div className="pb-card-wrapper">
                <figure className="pb-card pb-card--button">
                  <img src="/assets/images/foto4.png" alt="Фотография 4" />
                </figure>
                <button 
                  className="button button--outline photobank-button" 
                  type="button"
                  onClick={handlePhotobankClick}
                >
                  Перейти
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="news-section" className="home-section home-section--news">
          <div className="container">
            <div className="section-header section-header--with-link">
              <div>
                <h2>Новости</h2>
                <p>Ваш гид по культурным новостям столицы </p>
              </div>
              <button 
                className="news-link"
                onClick={handleAllNewsClick}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: 'inherit',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '20px',
                  color: 'var(--text-dark)',
                  textDecoration: 'none'
                }}
              >
                все новости
                <img src="/assets/icons/arrow.png" alt="" aria-hidden="true" />
              </button>
            </div>
            <div className="news-board">
              <figure className="news-board__cover">
                <img src="/assets/images/hero.jpg" alt="Красная площадь" />
              </figure>
              <div className="news-board__list">
                <article className="news-item">
                  <h3>Обертон</h3>
                  <p>Новая ярмарка графики <br/>от Cosmoscow </p>
                </article>
                <article className="news-item">
                  <h3>Navka Arena</h3>
                  <p>Открылась новая крытая ледовая арена</p>
                </article>
                <article className="news-item">
                <h3>Kaifuso</h3>
                  <p>Открытие нового ресторана Новикова</p>
                </article>
                <article className="news-item">
                  <h3>|catalog|</h3>
                  <p>Ярмарка современного искусства</p>
                </article>
                <article className="news-item">
                  <h3>Дом музыки</h3>
                  <p>Владимир Спиваков, Денис Мацуев и НФОР 17 декабря в «Доме музыки» представят «Концерты Бетховена»</p>
                </article>
                <article className="news-item">
                  <h3>Марк Шагал</h3>
                  <p>
                  В Пушкинском музее 11 декабря стартует масштабная выставка, посвященная «русскому» периоду творчества Шагала.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;