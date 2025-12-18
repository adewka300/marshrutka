import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react'; 

import './styles/global.css';
// Только 404 оставляем обычным импортом 
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

// --- Lazy импорты для ВСЕХ страниц ---
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const FavoritesPage = lazy(() => import('./components/FavoritesPage/FavoritesPage'));
const RoutePage = lazy(() => import('./components/RoutePage/RoutePage'));
const RoutePage2 = lazy(() => import('./components/RoutePage/RoutePage2'));
const RoutePage3 = lazy(() => import('./components/RoutePage/RoutePage3'));
const RoutePage4 = lazy(() => import('./components/RoutePage/RoutePage4'));
const RoutePage5 = lazy(() => import('./components/RoutePage/RoutePage5'));
const NewsPage = lazy(() => import('./components/NewsPage/NewsPage'));
const PhotobankPage = lazy(() => import('./components/PhotobankPage/PhotobankPage'));
const ParksPage = lazy(() => import('./components/PlacesPages/ParksPage'));
const RestaurantsPage = lazy(() => import('./components/PlacesPages/RestaurantsPage'));
const MuseumsPage = lazy(() => import('./components/PlacesPages/MuseumsPage'));



// --- Инстант-скролл наверх ---
function ScrollToTopInstant() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

// --- Хук для предзагрузки главных страниц ---
const usePreloadMainPages = () => {
  useEffect(() => {
    // Предзагружаем главную и избранное сразу после загрузки основного бандла
    const preloadPages = () => {
      // Небольшая задержка, чтобы не блокировать рендеринг
      setTimeout(() => {
        // Эти импорты будут запущены, но не отрендерены
        import('./components/HomePage/HomePage');
        import('./components/FavoritesPage/FavoritesPage');
      }, 1000);
    };
    
    preloadPages();
  }, []);
};

// --- Fallback компонент для загрузки ---
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    backgroundColor: '#f8f9fa',
    gap: '20px'
  }}>
    {/* Спиннер */}
    <div style={{
      width: '60px',
      height: '60px',
      border: '6px solid #e0e0e0',
      borderTop: '6px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    
    {/* Текст */}
    <div style={{
      fontSize: '18px',
      color: '#333',
      fontWeight: '500',
      fontFamily: 'Arial, sans-serif'
    }}>
      Загрузка страницы...
    </div>
    
    {/* Стили для анимации */}
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  usePreloadMainPages(); // Используем хук для предзагрузки
  
  return (
    <Router>
      <ScrollToTopInstant />  

      <div className="App">
        {/* Обёртываем Routes в Suspense */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Все страницы теперь lazy */}
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/route/1" element={<RoutePage />} />
            <Route path="/route/2" element={<RoutePage2 />} />
            <Route path="/route/3" element={<RoutePage3 />} />
            <Route path="/route/4" element={<RoutePage4 />} />
            <Route path="/route/5" element={<RoutePage5 />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/photobank" element={<PhotobankPage />} />
            <Route path="/places/parks" element={<ParksPage />} />
            <Route path="/places/restaurants" element={<RestaurantsPage />} />
            <Route path="/places/museums" element={<MuseumsPage />} />
            
            {/* 404 - обычный импорт */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;