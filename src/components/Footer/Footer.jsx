function Footer() {
  const handleSocialClick = (platform) => {
    console.log(`Social link clicked: ${platform}`);
  };

  return (
    <footer className="site-footer">
      <div className="container footer__content">
        <div className="footer__brand">
          <p className="footer__logo">МАРШРУТКА</p>
          <a className="footer__phone" href="tel:+79007778800">8 900 777 88 00</a>
          <p className="footer__caption">круглосуточный телефон call-центра</p>
          <div className="footer__socials">
            <button 
              onClick={() => handleSocialClick('vk')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-light)',
                fontSize: '16px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit'
              }}
              aria-label="Мы во ВКонтакте"
            >
              vk
            </button>
            <button 
              onClick={() => handleSocialClick('tg')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-light)',
                fontSize: '16px',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit'
              }}
              aria-label="Мы в Telegram"
            >
              Telegram
            </button>
          </div>
        </div>
        <div className="footer__contacts">
          <p className="footer__heading">Контакты</p>
          <p className="footer__description">
            для связи с нами Вы можете<br />воспользоваться следующими способами
          </p>
          <div className="footer__contact-block">
            <p>8 900 777 88 00</p>
            <p className="footer__note">Для связи с нами</p>
          </div>
          <div className="footer__contact-block">
            <p>marshrutka@mail.ru</p>
            <p className="footer__note">Для запросов СМИ</p>
          </div>
          <div className="footer__payments">
            <span>VISA</span>
            <span>МИР</span>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>"ООО Маршрутка". Все права защищены 2025</p>
      </div>
    </footer>
  );
}

export default Footer;