import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Footer.css';
import { FiArrowRight } from 'react-icons/fi';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscriptionStatus('Спасибо за подписку!');
    setEmail('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика подписки
    console.log('Подписка на email:', email);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Parfume & Co</h3>
          <p>Твоя история начинается с аромата.</p>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>

        <div className="footer-nav">
          <h4>Навигация</h4>
          <Link to="/catalog">Каталог</Link>
          <Link to="/new">Новинки</Link>
          <Link to="/brands">Бренды</Link>
          <Link to="/sale">Акции</Link>
          <Link to="/about">О нас</Link>
        </div>

        <div className="footer-nav">
          <h4>Информация</h4>
          <Link to="/delivery">Доставка</Link>
          <Link to="/payment">Оплата</Link>
          <Link to="/returns">Возврат</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-contact">
          <h4>Подпишитесь на новости</h4>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="footer-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-newsletter-input"
                placeholder="Ваш email"
                required
              />
              <button type="submit" className="footer-newsletter-button">
                <FiArrowRight />
              </button>
            </div>
          </form>
          {subscriptionStatus && (
            <p className="subscription-status">{subscriptionStatus}</p>
          )}
          <div className="contact-info">
            <p>+79276107218</p>
            <p>info@parfume-co.ru</p>
            <p>Самара, Молодежная 2</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Parfume & Co. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
