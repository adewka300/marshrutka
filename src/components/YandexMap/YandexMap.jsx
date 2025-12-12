import { useEffect, useRef, useState, useCallback } from 'react';
import './YandexMap.css';

function YandexMap({ routePoints, routeTitle }) {
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const placemarks = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const isMounted = useRef(true);
  const initAttempts = useRef(0);
  const maxInitAttempts = 3;

    const getYandexMapsUrl = useCallback(() => {
    if (!routePoints || routePoints.length === 0) return 'https://yandex.ru/maps';
    
    const coordinates = routePoints
        .map(point => {
        const [lat, lon] = point.coordinates;
        return `${lat},${lon}`;
        })
        .join('~');
    
    // Добавляем "текущее местоположение" как первую точку
    return `https://yandex.ru/maps/?mode=routes&rtext=~${coordinates}&rtt=pd`;
    }, [routePoints]);
    
  // Основная функция инициализации карты
  const initMap = useCallback(() => {
    if (!isMounted.current) return;
    
    initAttempts.current += 1;
    
    // Проверяем максимальное количество попыток
    if (initAttempts.current > maxInitAttempts) {
      console.error('Max init attempts reached');
      setMapError('Не удалось загрузить карту');
      setIsLoading(false);
      return;
    }

    // Проверяем что контейнер существует в DOM
    if (!mapContainerRef.current) {
      console.warn('Map container ref is null, retrying...');
      setTimeout(initMap, 300);
      return;
    }

    // Проверяем что элемент отрендерен и имеет размеры
    const container = mapContainerRef.current;
    const isVisible = container.offsetWidth > 0 && container.offsetHeight > 0;
    
    if (!isVisible) {
      console.warn('Map container is not visible yet, retrying...');
      setTimeout(initMap, 500);
      return;
    }

    // Проверяем загружен ли API Яндекс Карт
    if (!window.ymaps) {
      console.warn('Yandex Maps API not loaded yet, retrying...');
      setTimeout(initMap, 500);
      return;
    }

    try {
      const { ymaps } = window;
      const container = mapContainerRef.current;

      // Уничтожаем предыдущую карту если есть
      if (mapInstance.current) {
        try {
          mapInstance.current.destroy();
        } catch (e) {
          console.warn('Error destroying previous map:', e);
        }
        mapInstance.current = null;
      }

      // Очищаем метки
      placemarks.current = [];

      // Создаем новую карту
      mapInstance.current = new ymaps.Map(container, {
        center: routePoints[0].coordinates,
        zoom: 13,
        controls: ['zoomControl', 'fullscreenControl']
      });

      // Добавляем поведение
      mapInstance.current.behaviors.enable(['scrollZoom', 'multiTouch']);

      // Добавляем метки
      routePoints.forEach((point, index) => {
        const placemark = new ymaps.Placemark(
          point.coordinates,
          {
            balloonContentHeader: `<strong>${point.name}</strong>`,
            balloonContentBody: point.description || '',
            hintContent: point.name
          },
          {
            preset: 'islands#blueCircleDotIcon',
            iconColor: '#7f2720'
          }
        );

        mapInstance.current.geoObjects.add(placemark);
        placemarks.current.push(placemark);
      });

      // Устанавливаем границы чтобы вместить все точки
      if (routePoints.length > 1) {
        const bounds = mapInstance.current.geoObjects.getBounds();
        if (bounds) {
          mapInstance.current.setBounds(bounds, {
            checkZoomRange: true,
            zoomMargin: 50
          });
        }
      }

      setIsLoading(false);
      setMapError(null);
      initAttempts.current = 0;

    } catch (error) {
      console.error('Error initializing Yandex Map:', error);
      
      if (initAttempts.current < maxInitAttempts) {
        setTimeout(initMap, 1000);
      } else {
        setMapError('Ошибка при загрузке карты');
        setIsLoading(false);
      }
    }
  }, [routePoints]);

  // Функция загрузки скрипта Яндекс Карт
  const loadYandexMapsScript = useCallback(() => {
    // Если API уже загружен
    if (window.ymaps) {
      setTimeout(initMap, 100);
      return;
    }

    // Если скрипт уже загружается
    if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
      const checkInterval = setInterval(() => {
        if (window.ymaps && isMounted.current) {
          clearInterval(checkInterval);
          setTimeout(initMap, 100);
        }
      }, 100);
      return;
    }

    // Загружаем скрипт
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=4e4b758a-20db-4be8-beed-7a83a31124d4&lang=ru_RU';
    script.async = true;
    
    script.onload = () => {
      if (isMounted.current) {
        window.ymaps.ready(() => {
          if (isMounted.current) {
            setTimeout(initMap, 100);
          }
        });
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Yandex Maps script');
      if (isMounted.current) {
        setMapError('Не удалось загрузить Яндекс Карты');
        setIsLoading(false);
      }
    };
    
    document.head.appendChild(script);
  }, [initMap]);

  // Основной эффект для инициализации - УПРОЩЕННЫЙ БЕЗ OBSERVER
  useEffect(() => {
    isMounted.current = true;
    initAttempts.current = 0;
    
    if (!routePoints || routePoints.length === 0) {
      setIsLoading(false);
      return;
    }

    // Просто загружаем сразу с небольшой задержкой для гарантии рендера DOM
    const timer = setTimeout(() => {
      if (isMounted.current) {
        loadYandexMapsScript();
      }
    }, 300);

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
      
      // Очищаем карту
      if (mapInstance.current) {
        try {
          mapInstance.current.destroy();
        } catch (e) {
          // Игнорируем ошибки
        }
        mapInstance.current = null;
      }
      placemarks.current = [];
    };
  }, [routePoints, loadYandexMapsScript]);

  const handleOpenInYandexMaps = () => {
    window.open(getYandexMapsUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleRetry = () => {
    if (isMounted.current) {
      setIsLoading(true);
      setMapError(null);
      initAttempts.current = 0;
      
      // Сбрасываем контейнер
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
      
      setTimeout(loadYandexMapsScript, 100);
    }
  };

  // Если нет точек маршрута
  if (!routePoints || routePoints.length === 0) {
    return (
      <div className="route-map">
        <div className="route-map__header">
          <h2 className="route-map__title">Маршрут на карте</h2>
        </div>
        <div className="route-map__container">
          <div className="route-map__no-points">
            <p>Точки маршрута не указаны</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="route-map">
      <div className="route-map__header">
        <h2 className="route-map__title">{routeTitle || 'Маршрут на карте'}</h2>
        <button 
          className="route-map__external-button button button--secondary"
          onClick={handleOpenInYandexMaps}
          type="button"
          disabled={isLoading || mapError}
        >
          Открыть в Яндекс.Картах
          <svg className="route-map__external-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M5.5 4H12V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      
      <div className="route-map__container">
        {/* Всегда рендерим контейнер карты с минимальной высотой */}
        <div 
          ref={mapContainerRef}
          className="route-map__yandex-container"
          style={{ 
            minHeight: '500px',
            visibility: isLoading ? 'hidden' : 'visible'
          }}
        />
        
        {isLoading && !mapError && (
          <div className="route-map__loading-overlay">
            <div className="route-map__loading-spinner"></div>
            <p>Загружаем карту...</p>
          </div>
        )}
        
        {mapError && (
          <div className="route-map__error-overlay">
            <p>{mapError}</p>
            <button 
              className="route-map__retry-button button button--primary"
              onClick={handleRetry}
              type="button"
            >
              Попробовать снова
            </button>
          </div>
        )}
        
        <div className="route-map__points-list">
          <div className="route-map__points-header">
            <h3 className="route-map__points-title">Точки маршрута:</h3>
          </div>
          <ul className="route-map__points">
            {routePoints.map((point, index) => (
              <li key={`${point.name}-${index}`} className="route-map__point">
                <div className="route-map__point-marker">
                  <span className="route-map__point-number">{index + 1}</span>
                </div>
                <div className="route-map__point-content">
                  <h4 className="route-map__point-name">{point.name}</h4>
                  {point.description && (
                    <p className="route-map__point-description">{point.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default YandexMap;