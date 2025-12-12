import { useState, useEffect } from 'react';
import DaySwitcher from '../DaySwitcher/DaySwitcher';
import YandexMap from '../YandexMap/YandexMap';
import './RouteMap.css';

function RouteMap({ routeDays }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  
  useEffect(() => {
    // При изменении routeDays сбрасываем на первый день
    setActiveDayIndex(0);
  }, [routeDays]);
  
  if (!routeDays || routeDays.length === 0) return null;
  
  const hasMultipleDays = routeDays.length > 1;
  const activeDay = routeDays[activeDayIndex];
  
  // Проверяем есть ли точки в текущем дне
  const hasRoutePoints = activeDay.routePoints && activeDay.routePoints.length > 0;
  
  // Если только один день без точек
  if (!hasMultipleDays && !hasRoutePoints) {
    return (
      <div className="route-map-container route-map-container--single">
        <div className="route-map-single">
          <div className="route-map-single__no-data">
            <p>Для этого маршрута точки на карте не указаны</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Если только один день с точками
  if (!hasMultipleDays && hasRoutePoints) {
    return (
      <div className="route-map-container route-map-container--single">
        <div className="route-map-single">
          <div className="route-map-single__header">
            <h2 className="route-map-single__title">Маршрут на карте</h2>
          </div>
          <YandexMap 
            routePoints={activeDay.routePoints}
            routeTitle={activeDay.title}
            key={`map-single-${activeDay.title}`}
          />
        </div>
      </div>
    );
  }
  
  // Если несколько дней
  return (
    <div className="route-map-container">
      {/* ДОБАВЛЕН ЗАГОЛОВОК "Маршрут на карте" */}
      <div className="route-map-container__title-section">
        <h2 className="route-map-container__title">Маршрут на карте</h2>
      </div>
      
      <DaySwitcher 
        days={routeDays}
        activeDayIndex={activeDayIndex}
        onDayChange={setActiveDayIndex}
      />
      
      <div className="route-map-day">
        <div className="route-map-day__header">
        </div>
        
        <div className="route-map-day__content">
          {hasRoutePoints ? (
            <YandexMap 
              routePoints={activeDay.routePoints}
              routeTitle={`${activeDay.title}`}
              key={`map-day-${activeDayIndex}`}
            />
          ) : (
            <div className="route-map-day__no-points">
              <p>Для этого дня маршрута точки не указаны</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RouteMap;