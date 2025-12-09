import { forwardRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = forwardRef(function Header({ pageType = 'home', currentPage = '' }, ref) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(currentPage);

  const handleNavClick = (section) => {
    if (window.location.pathname === '/') {
      // Если мы на главной - скроллим к секции с отступом
      const element = document.getElementById(section);
      if (element) {
        const headerHeight = 96; // Высота хедера
        const offset = headerHeight - 60; // Отступ сверху
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Если не на главной - переходим на главную и затем скроллим
      navigate('/');
      // Даем время на загрузку главной страницы
      setTimeout(() => {
        const element = document.getElementById(section);
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
      }, 100);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveSection('');
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };


useEffect(() => {
  if (window.location.pathname !== '/') return;

  const sections = [
    { id: 'routes-section', name: 'routes' },
    { id: 'places-section', name: 'places' },
    { id: 'photobank-section', name: 'photobank' },
    { id: 'news-section', name: 'news' }
  ];

  const handleScroll = () => {
    const headerHeight = 96;
    const triggerOffset = headerHeight - 20;

    // если вверху — нет активной секции
    if (window.scrollY < 150) {
      setActiveSection('');
      return;
    }

    let current = '';

    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const rect = el.getBoundingClientRect();

      if (rect.top <= triggerOffset) {
        current = sec.name;
      }
    });

    if (current !== activeSection) {
      setActiveSection(current);
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}, [activeSection]);


  return (
    <header className="site-header" ref={ref}>
      <div className="container header__content">
        <button 
          className="logo" 
          onClick={handleLogoClick}
          aria-label="Маршрутка логотип"
          style={{ 
            background: 'none', 
            border: 'none', 
            fontFamily: '"Rowdies", sans-serif',
            fontSize: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: 0
          }}
        >
          МАРШРУТКА
        </button>
        <nav className="main-nav" aria-label="Главное меню">
          <button 
            className={`nav-link ${activeSection === 'routes' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('routes');
              handleNavClick('routes-section');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-light)',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit'
            }}
          >
            Маршруты
          </button>
          <button 
            className={`nav-link ${activeSection === 'places' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('places');
              handleNavClick('places-section');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-light)',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit'
            }}
          >
            Популярные места
          </button>
          <button 
            className={`nav-link ${activeSection === 'photobank' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('photobank');
              handleNavClick('photobank-section');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-light)',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit'
            }}
          >
            Фотобанк
          </button>
          <button 
            className={`nav-link ${activeSection === 'news' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('news');
              handleNavClick('news-section');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-light)',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit'
            }}
          >
            Новости
          </button>
          <button 
            className={`nav-link ${window.location.pathname === '/favorites' ? 'active' : ''}`}
            onClick={() => navigate('/favorites')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-light)',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit'
            }}
          >
            Избранное
          </button>
        </nav>
        {/*<form className="search" role="search" onSubmit={handleSearch}>
          <label className="visually-hidden" htmlFor="header-search">Поиск по сайту</label>
          <input 
            id="header-search" 
            type="search" 
            name="q" 
            placeholder="Поиск..." 
          />
          <button type="submit" aria-label="Найти">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </form> */}
      </div>
    </header>
  );
});

export default Header;