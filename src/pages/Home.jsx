import '../styles/Home.css';
import '../styles/animations.css';
import { Link } from "react-router-dom";
import ProductSlider from '../components/ProductSlider';
import { FiArrowRight, FiPackage, FiRefreshCcw, FiShield } from 'react-icons/fi';
import { useEffect, useRef } from 'react';

function Home() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="home">
      {/* БАННЕР */}
      <section className="hero glass">
        <div className="hero-background"></div>
          <div className="hero-content">
            <h1 className="hero-title">Parfume & Co</h1>
            <p className="hero-subtitle">Твоя история начинается с аромата</p>
          <Link to="/catalog" className="explore-btn">
            Исследовать ароматы
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="features scroll-reveal">
        <div className="features-grid">
          <div className="feature-card glass hover-lift">
            <FiPackage className="feature-icon" />
            <h3>Бесплатная доставка</h3>
            <p>При заказе от 5000 ₽</p>
          </div>
          <div className="feature-card glass hover-lift">
            <FiRefreshCcw className="feature-icon" />
            <h3>Возврат и обмен</h3>
            <p>14 дней на проверку</p>
          </div>
          <div className="feature-card glass hover-lift">
            <FiShield className="feature-icon" />
            <h3>Гарантия качества</h3>
            <p>Только оригинальная продукция</p>
          </div>
        </div>
      </section>

      {/* КАТЕГОРИИ */}
      <section className="categories">
        <h2 className="section-title gradient-text scroll-reveal">Выбери свой аромат</h2>
        <div className="category-grid">
          <Link to="/catalog?gender=men" className="category-card glass scroll-reveal hover-scale">
            <div className="category-image men-perfume"></div>
            <div className="category-content">
              <span className="category-icon">♂</span>
              <h3>Мужские</h3>
              <p>Элегантность и характер</p>
            </div>
          </Link>
          <Link to="/catalog?gender=women" className="category-card glass scroll-reveal hover-scale">
            <div className="category-image women-perfume"></div>
            <div className="category-content">
              <span className="category-icon">♀</span>
              <h3>Женские</h3>
              <p>Изысканность и шарм</p>
            </div>
          </Link>
          <Link to="/catalog?gender=unisex" className="category-card glass scroll-reveal hover-scale">
            <div className="category-image unisex-perfume"></div>
            <div className="category-content">
              <span className="category-icon">⚥</span>
              <h3>Унисекс</h3>
              <p>Вне границ</p>
            </div>
          </Link>
        </div>
      </section>

      {/* СЛАЙДЕР ПОПУЛЯРНЫХ */}
      <section className="popular-section scroll-reveal">
        <h2 className="section-title gradient-text">Популярные ароматы</h2>
        <ProductSlider />
      </section>
      
      {/* КОЛЛЕКЦИИ */}
      <section className="collections scroll-reveal">
        <h2 className="section-title gradient-text">Специальные коллекции</h2>
        <div className="collections-grid">
          <Link to="/catalog?collection=summer" className="collection-card glass hover-scale">
            <div className="collection-image summer">
              <div className="collection-overlay"></div>
            </div>
            <div className="collection-content">
              <h3>Летняя коллекция</h3>
              <p>Свежие и легкие ароматы</p>
              <span className="collection-link">Смотреть коллекцию <FiArrowRight /></span>
            </div>
          </Link>
          <Link to="/catalog?collection=luxury" className="collection-card glass hover-scale">
            <div className="collection-image luxury">
              <div className="collection-overlay"></div>
            </div>
            <div className="collection-content">
              <h3>Премиум</h3>
              <p>Эксклюзивные ароматы</p>
              <span className="collection-link">Смотреть коллекцию <FiArrowRight /></span>
            </div>
          </Link>
        </div>
      </section>

      {/* ПОДПИСКА */}
      <section className="newsletter-section glass scroll-reveal">
        <div className="newsletter-content">
          <h2>Получайте новости и специальные предложения</h2>
          <p>Подпишитесь на нашу рассылку и получите скидку 10% на первый заказ</p>
          <form className="newsletter-form">
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Ваш email" 
                required 
                className="glass"
              />
              <button type="submit" className="submit-btn pulse">
                Подписаться <FiArrowRight />
              </button>
            </div>
            <label className="privacy-label">
              <input type="checkbox" required />
              <span>Я согласен(на) с политикой конфиденциальности</span>
            </label>
          </form>
        </div>
        <div className="newsletter-decoration"></div>
      </section>
    </div>
  );
}

export default Home;
