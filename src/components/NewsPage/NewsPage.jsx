import './NewsPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function NewsPage() {
  return (
    <div className="page page--news">
      <Header currentPage="news" />
      
      <main className="page-wrapper">
        <section className="news-hero">
          <div className="news-container">
            <div className="news-hero-title-group">
              <h2 className="news-hero-title font-kankin">НОВОСТИ</h2>
              <p className="news-hero-subtitle">Интересные новости на каждый день!</p>
            </div>
            
            <div className="news-hero-banner">
              <p className="font-kankin">Открытие новых мест и анонсы мероприятий — собрали главные новости для путешественников</p>
            </div>
          </div>
        </section>
        
        <div className="news-content">
          <div className="news-container">
            <div className="news-article-card">
              <div className="news-article-card__image-wrapper">
                <img src="/assets/images/news_1.png" alt="Туристический объект" className="news-article-card__image" />
              </div>
              <div className="news-article-card__content">
                <h3 className="news-article-card__title font-kankin">Марк Шагал</h3>
                <p className="news-article-card__text font-kankin">
                Крупная выставка Марка Шагала откроется в Пушкинском музее 11 декабря. Экспозиция представит «русский» период творчества художника — от ранних витебских работ до полотен, где уже проявляется его уникальный стиль. Включает живопись, графику и архивные материалы, многие из которых ранее не выставлялись. Выставку дополнят лекции и встречи с искусствоведами.
                </p>
              </div>
            </div>
            
            <div className="news-article-card news-article-card--reverse">
              <div className="news-article-card__image-wrapper">
                <img src="/assets/images/news_2.png" alt="Туристический объект" className="news-article-card__image" />
              </div>
              <div className="news-article-card__content">
                <h3 className="news-article-card__title font-kankin">Kaifuso</h3>
                <p class="news-article-card__text font-kankin">
                 В Москве открылся новый ресторан Kaifuso — концептуальное заведение, в котором современная японская кухня встречается с авторским подходом и неожиданными акцентами.
                </p>
                <p class="news-article-card__text font-kankin">
                  Проект продолжает серию гастрономических инициатив команды Новикова и занимает особое место благодаря сочетанию традиций, эстетики и инноваций.
                </p>
                <p class="news-article-card__text font-kankin">
                На стендах представлены разнообразные направления — живопись, графика, скульптура, объекты, мультимедиа и текстиль — от «медитативных пейзажей» до «цифрового барокко», создавая широкий срез актуального искусства.
                </p>
                <p class="news-article-card__text font-kankin">
                Гостям предлагают меню, основанное на идее сезонности: изысканные сашими, фирменные роллы, горячие блюда с акцентом на текстуру, а также уникальные позиции, созданные специально для Kaifuso. В коктейльной карте — авторские напитки, вдохновлённые японской культурой и традиционными вкусами.
                </p>
              </div>
            </div>
            
            <div className="news-article-card">
              <div className="news-article-card__image-wrapper">
                <img src="/assets/images/news_3.jpg" alt="Туристический объект" className="news-article-card__image" />
              </div>
              <div className="news-article-card__content">
                <h3 className="news-article-card__title font-kankin">|catalog|</h3>
                <p className="news-article-card__text font-kankin">
                С 28 по 30 ноября 2025 года в Москве состоялся четвертый выпуск ярмарки современного искусства |catalog| — теперь на новой площадке: жилом квартале «Золотой» на Софийской набережной.
                </p>
              <p className="news-article-card__text font-kankin">
                В этом году в ярмарке участвуют около 60 российских галерей, среди которых XL Галерея, pop/off/art, Ruarts Gallery, a-s-t-r-a и многие другие. 
              </p>  
              <p class="news-article-card__text font-kankin">
                На стендах представлены разнообразные направления — живопись, графика, скульптура, объекты, мультимедиа и текстиль — от «медитативных пейзажей» до «цифрового барокко», создавая широкий срез актуального искусства.
              </p>
              <p class="news-article-card__text font-kankin">
              Особое внимание уделено теме «искусство как часть повседневной жизни»: ярмарка исследует, как коллекционирование и меценатство становятся естественными практиками и образом жизни.
              </p>
              <p class="news-article-card__text font-kankin">
                Каждая галерея привела «основной состав» авторов и вывела на рынок как минимум одно новое имя — благодаря чему выставка превращается в важный «барометр» искусства.
              </p>
              
              </div>
            </div>
            
            <p className="news-page-footer-text font-kankin">Все новости на сегодня. Приходите завтра.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NewsPage;