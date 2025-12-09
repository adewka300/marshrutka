import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import './styles/global.css';
import HomePage from './components/HomePage/HomePage';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import RoutePage from './components/RoutePage/RoutePage';
import RoutePage2 from './components/RoutePage/RoutePage2';
import RoutePage3 from './components/RoutePage/RoutePage3';
import RoutePage4 from './components/RoutePage/RoutePage4';
import RoutePage5 from './components/RoutePage/RoutePage5';
import NewsPage from './components/NewsPage/NewsPage';
import PhotobankPage from './components/PhotobankPage/PhotobankPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ParksPage from './components/PlacesPages/ParksPage';
import RestaurantsPage from './components/PlacesPages/RestaurantsPage';
import MuseumsPage from './components/PlacesPages/MuseumsPage';

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

function App() {
  return (
    <Router>
      <ScrollToTopInstant />  

      <div className="App">
        <Routes>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
