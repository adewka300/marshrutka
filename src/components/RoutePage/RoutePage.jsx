import { useEffect, useState } from 'react';
import './RoutePage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RouteMap from '../RouteMap/RouteMap'; // Импортируем новый компонент
import { useFavorites } from '../../hooks/useFavorites';
import { routesData } from '../../data/routes';

function RoutePage() {
  const routeId = 1;
  const { addToFavorites, removeFromFavorites, isFavorite, favorites } = useFavorites();
  
  const [isRouteFavorite, setIsRouteFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const favoriteStatus = isFavorite(routeId);
    setIsRouteFavorite(favoriteStatus);
  }, [routeId, isFavorite, favorites]);

  const handleFavoriteToggle = () => {
    if (isRouteFavorite) {
      removeFromFavorites(routeId);
    } else {
      addToFavorites(routeId);
    }
  };

  const currentRoute = routesData.find(route => route.id === routeId) || routesData[0];

  // Функция для форматирования описания с абзацами
  const formatDescription = (text) => {
    if (!text) return '';
    
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      const cleanParagraph = paragraph.trim().replace(/\s+/g, ' ');
      
      const style = index < paragraphs.length - 1 
        ? { marginBottom: '1.5em' } 
        : { marginBottom: '0' };
      
      return <p key={index} style={style} dangerouslySetInnerHTML={{ __html: cleanParagraph }} />;
    });
  };

  return (
    <div className="page">
      <Header currentPage="routes" />
      
      <main>
        <section className="hero">
          <div className="hero__image">
            <img src={currentRoute.image} alt={`Маршрут ${currentRoute.title}`} />
          </div>
          <div className="container hero__content">
            <h1>{currentRoute.title}</h1>
            <p>{currentRoute.description}</p>
            <button 
              className={`button ${isRouteFavorite ? 'button--secondary' : 'button--primary'}`} 
              type="button"
              onClick={handleFavoriteToggle}
            >
              {isRouteFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            </button>
          </div>
        </section>

        {/* Дни маршрута */}
        {currentRoute.days.map((day, index) => (
          <section key={index} className="day-block">
            <div className="container day-block__content">
              <div className="day-block__text">
                <p className="day-block__title">{day.title}</p>
                {formatDescription(day.description)}
              </div>
              <figure className={`day-block__media ${index % 2 === 0 ? 'day-block__media--tall' : 'day-block__media--wide'}`}>
                <img src={day.image} alt={day.title} />
              </figure>
            </div>
          </section>
        ))}

        {/* Добавляем карты с переключателем дней */}
        {currentRoute.days.some(day => day.routePoints && day.routePoints.length > 0) && (
          <section className="route-maps-section">
            <div className="container">
              <RouteMap 
                routeDays={currentRoute.days}
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default RoutePage;