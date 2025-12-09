import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="page page--not-found">
      <Header pageType="notfound" currentPage="" />
      
      <main className="not-found-main">
        <div className="container">
          <div className="not-found-content">  
            {/* Основной контент */}
            <div className="not-found-text">
              <h1 className="not-found-title">
                <span className="not-found-number">404</span>
                <span className="not-found-message">Маршрут не найден</span>
              </h1>
              
              <p className="not-found-description">
                Кажется, вы свернули не туда. Эта страница, как несуществующий маршрут 
                автобуса — она никуда не ведет. Но не расстраивайтесь, мы поможем вам 
                вернуться на правильный путь!
              </p>
              
              <div className="not-found-actions">
                <button 
                  className="button button--primary not-found-button"
                  onClick={handleGoHome}
                >
                  Вернуться на главную
                </button>
                
                <p className="not-found-hint">
                  Или воспользуйтесь навигацией выше, чтобы найти нужный маршрут
                </p>
              </div>
            </div>
            
            {/* Декоративные элементы */}
            <div className="not-found-icons">
              <div className="icon-bus">🚌</div>
              <div className="icon-map">🗺️</div>
              <div className="icon-sign">🪧</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundPage;