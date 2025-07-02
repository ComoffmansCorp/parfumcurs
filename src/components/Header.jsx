import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';
import { useState, useRef, useEffect } from 'react';
import { FiShoppingCart, FiUser, FiPackage, FiMenu } from 'react-icons/fi';
import logo from '../assets/images/logo.svg';

function Header() {
  const { cartItems } = useCart();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="Parfume & Co Logo" className="logo-icon" />
          <span className="logo-text">Parfume & Co</span>
        </Link>

        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu />
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>О нас</Link>
          <Link to="/contacts" onClick={() => setMenuOpen(false)}>Контакты</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <FiUser /> Личный кабинет
              </Link>

              <button className="auth-btn" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <div className="auth-dropdown-wrapper" ref={dropdownRef}>
              <button 
                className="auth-btn" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FiUser /> Вход / Регистрация
              </button>
              {dropdownOpen && (
                <div className="auth-dropdown open">
                  <Link to="/login" onClick={() => {
                    setMenuOpen(false);
                    setDropdownOpen(false);
                  }}>Войти</Link>
                  <Link to="/register" onClick={() => {
                    setMenuOpen(false);
                    setDropdownOpen(false);
                  }}>Регистрация</Link>
                </div>
              )}
            </div>
          )}

          <Link to="/cart" className="cart-icon" onClick={() => setMenuOpen(false)}>
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
