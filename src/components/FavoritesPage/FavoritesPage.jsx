import { useState } from 'react';
import './FavoritesPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useFavorites } from '../../hooks/useFavorites';
import { routesData } from '../../data/routes';

function FavoritesPage() {
  const { 
    removeFromFavorites,
    favorites // Берем favorites напрямую
  } = useFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  
  // Функция для правильного склонения слова "маршрут"
  function getRouteWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'маршрутов';
    }
    
    if (lastDigit === 1) {
      return 'маршрут';
    }
    
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'маршрута';
    }
    
    return 'маршрутов';
  }

  // Фильтруем маршруты на основе favorites
  const favoriteRoutes = routesData.filter(route => 
    favorites.includes(route.id)
  );
  
  // Фильтрация по поисковому запросу
  const filteredRoutes = favoriteRoutes.filter(route =>
    route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRemove = (routeId) => {
    removeFromFavorites(routeId);
  };

  const handleViewRoute = (routeId) => {
    window.location.href = `/route/${routeId}`;
  };

  console.log('FavoritesPage render - favorites:', favorites, 'favoriteRoutes:', favoriteRoutes.length);

  return (
    <div className="page page--favorites">
      <Header currentPage="favorites" />
      
      <main className="page-wrapper">
        <section className="favorites-hero">
          <div className="favorites-container">
            <div className="favorites-hero-title-group">
              <h1 className="favorites-hero-title font-kankin">ИЗБРАННОЕ</h1>
              <p className="favorites-hero-subtitle">
                {favoriteRoutes.length === 0 
                  ? "Ваша личная коллекция маршрутов по Москве" 
                  : `Ваша коллекция: ${favoriteRoutes.length} ${getRouteWord(favoriteRoutes.length)}`}
              </p>
            </div>
          </div>
        </section>
        
        <section className="favorites-content">
          <div className="favorites-container">
            {/* Поисковая строка - показываем только если есть маршруты */}
            {favoriteRoutes.length > 0 && (
              <div className="favorites-search">
                <div className="favorites-search__input-wrapper">
                  <input 
                    type="text" 
                    className="favorites-search__input" 
                    placeholder="Найти маршрут по названию или описанию..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            )}
            
            {/* Сетка избранных маршрутов или сообщение о пустой коллекции */}
            {favoriteRoutes.length === 0 ? (
              <div className="favorites-empty">
                <h2 className="favorites-empty-title font-kankin">В избранном пока нет маршрутов</h2>
                <p className="favorites-empty-text font-kankin">
                  Добавляйте сюда понравившиеся маршруты на странице маршрута
                </p>
              </div>
            ) : filteredRoutes.length === 0 ? (
              <div className="favorites-empty">
                <h2 className="favorites-empty-title font-kankin">Ничего не найдено</h2>
                <p className="favorites-empty-text font-kankin">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            ) : (
              <div className="favorites-grid">
                {filteredRoutes.map((route) => (
                  <div key={route.id} className="favorites-card">
                    <div className="favorites-card__image-wrapper">
                      <img 
                        src={route.image} 
                        alt={route.title} 
                        className="favorites-card__image" 
                      />
                    </div>
                    
                    <div className="favorites-card__content">
                      <div className="favorites-card__header">
                        <h3 className="favorites-card__title font-kankin">{route.title}</h3>
                      </div>
                      
                      <p className="favorites-card__description font-kankin">
                        {route.description}
                      </p>
                      
                      {/* Кнопки действий */}
                      <div className="favorites-card__actions">
                        <button 
                          className="favorites-card__button favorites-card__button--view"
                          onClick={() => handleViewRoute(route.id)}
                        >
                          Посмотреть маршрут
                        </button>
                        <button 
                          className="favorites-card__button favorites-card__button--delete"
                          onClick={() => handleRemove(route.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Текст внизу страницы - показываем только если есть маршруты */}
            {favoriteRoutes.length > 0 && (
              <p className="favorites-page-footer-text font-kankin">
                Ваши сохраненные маршруты хранятся здесь. Вы можете добавлять новые или удалять старые.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesPage;