import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';
import { Link } from 'react-router-dom';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="checkout-page success">
        <div className="success-box">
          <div className="checkmark">✔</div>
          <h2>Спасибо за заказ!</h2>
          <p>Мы свяжемся с вами в ближайшее время 😊</p>
          <Link to="/catalog" className="back-to-shop">← Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Оформление заказа</h2>

      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Адрес доставки"
              value={form.address}
              onChange={handleChange}
              required
            />
            <p className="checkout-total">Итого к оплате: {total} ₽</p>
            <button type="submit" className="confirm-btn">Подтвердить заказ</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;
