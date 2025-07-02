import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiArrowRight, FiCreditCard, FiMapPin, FiTruck } from 'react-icons/fi';
import '../styles/Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, userEmail } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState({
    street: '',
    house: '',
    apartment: '',
    city: 'Москва',
    zipCode: '',
    comment: ''
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Загрузка сохраненных адресов пользователя
      const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
      const userAddresses = addresses.filter(addr => addr.user === userEmail);
      setSavedAddresses(userAddresses);
      
      // Если есть сохраненные адреса, выбираем первый по умолчанию
      if (userAddresses.length > 0) {
        const defaultAddress = userAddresses.find(addr => addr.isDefault) || userAddresses[0];
        setSelectedAddress(defaultAddress);
        setAddress(defaultAddress);
      }
    }
  }, [isAuthenticated, userEmail]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isDeliveryFree = subtotal >= 5000;
  const baseDeliveryCost = deliveryMethod === 'courier' ? 300 : 200;
  const deliveryCost = isDeliveryFree ? 0 : baseDeliveryCost;
  const total = subtotal + deliveryCost;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr);
    setAddress(addr);
  };

  const handleSubmitOrder = () => {
    // Сохраняем новый адрес, если пользователь этого хочет
    if (isAuthenticated && address.saveAddress && !selectedAddress) {
      const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
      const newAddress = {
        ...address,
        id: Date.now(),
        user: userEmail
      };

      if (newAddress.isDefault) {
        // Убираем флаг по умолчанию у других адресов
        addresses.forEach(addr => {
          if (addr.user === userEmail) {
            addr.isDefault = false;
          }
        });
      }

      addresses.push(newAddress);
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      user: userEmail,
      items: cartItems,
      subtotal: subtotal,
      deliveryCost: deliveryCost,
      total: total,
      status: 'pending',
      date: new Date().toISOString(),
      address: selectedAddress || address,
      deliveryMethod,
      paymentMethod,
      isDeliveryFree,
      statusHistory: [
        {
          status: 'pending',
          date: new Date().toISOString(),
          comment: 'Заказ создан'
        }
      ]
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    clearCart();
    navigate('/profile');
  };

  const renderCartItems = () => (
    <div className="cart-items">
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="item-image" />
          <div className="item-info">
            <h3>{item.name}</h3>
            <p className="item-brand">{item.brand}</p>
            <p className="item-volume">{item.volume}</p>
          </div>
          <div className="item-quantity">
            <button 
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              className="quantity-btn"
            >
              <FiMinus />
            </button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              className="quantity-btn"
            >
              <FiPlus />
            </button>
          </div>
          <div className="item-price">
            {new Intl.NumberFormat('ru-RU').format(item.price * item.quantity)} ₽
          </div>
          <button 
            className="remove-btn"
            onClick={() => handleRemoveItem(item.id)}
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
    </div>
  );

  const renderDelivery = () => (
    <div className="delivery-section">
      <div className="delivery-methods">
        <h3>Способ доставки</h3>
        <div className="delivery-info">
          {isDeliveryFree ? (
            <p className="free-delivery-message">Бесплатная доставка!</p>
          ) : (
            <p className="delivery-threshold">
              Добавьте товаров еще на {new Intl.NumberFormat('ru-RU').format(5000 - subtotal)} ₽ для бесплатной доставки
            </p>
          )}
        </div>
        <div className="methods-grid">
          <label className="method-card">
            <input
              type="radio"
              name="delivery"
              value="courier"
              checked={deliveryMethod === 'courier'}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
            <div className="method-content">
              <FiTruck className="method-icon" />
              <div className="method-info">
                <h4>Курьером</h4>
                <p>Доставка до двери</p>
                <span className="method-price">
                  {isDeliveryFree ? 'Бесплатно' : '300 ₽'}
                </span>
              </div>
            </div>
          </label>
          <label className="method-card">
            <input
              type="radio"
              name="delivery"
              value="pickup"
              checked={deliveryMethod === 'pickup'}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
            <div className="method-content">
              <FiMapPin className="method-icon" />
              <div className="method-info">
                <h4>Самовывоз</h4>
                <p>Из пункта выдачи</p>
                <span className="method-price">
                  {isDeliveryFree ? 'Бесплатно' : '200 ₽'}
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {isAuthenticated && savedAddresses.length > 0 && (
        <div className="saved-addresses">
          <h3>Сохраненные адреса</h3>
          <div className="addresses-grid">
            {savedAddresses.map((addr, index) => (
              <label key={index} className="address-card">
                <input
                  type="radio"
                  name="saved-address"
                  checked={selectedAddress === addr}
                  onChange={() => handleAddressSelect(addr)}
                />
                <div className="address-content">
                  <h4>{addr.type || 'Адрес ' + (index + 1)}</h4>
                  <p>{addr.street}, д. {addr.house}{addr.apartment ? ', кв. ' + addr.apartment : ''}</p>
                  <p>{addr.city}, {addr.zipCode}</p>
                  {addr.isDefault && <span className="default-badge">По умолчанию</span>}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="address-form">
        <h3>{savedAddresses.length > 0 ? 'Новый адрес доставки' : 'Адрес доставки'}</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Улица</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => {
                setAddress({...address, street: e.target.value});
                setSelectedAddress(null);
              }}
              placeholder="Введите улицу"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Дом</label>
              <input
                type="text"
                value={address.house}
                onChange={(e) => {
                  setAddress({...address, house: e.target.value});
                  setSelectedAddress(null);
                }}
                placeholder="Номер дома"
              />
            </div>
            <div className="form-group">
              <label>Квартира</label>
              <input
                type="text"
                value={address.apartment}
                onChange={(e) => {
                  setAddress({...address, apartment: e.target.value});
                  setSelectedAddress(null);
                }}
                placeholder="Номер квартиры"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Город</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => {
                  setAddress({...address, city: e.target.value});
                  setSelectedAddress(null);
                }}
                placeholder="Город"
              />
            </div>
            <div className="form-group">
              <label>Индекс</label>
              <input
                type="text"
                value={address.zipCode}
                onChange={(e) => {
                  setAddress({...address, zipCode: e.target.value});
                  setSelectedAddress(null);
                }}
                placeholder="Почтовый индекс"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Комментарий к доставке</label>
            <textarea
              value={address.comment}
              onChange={(e) => {
                setAddress({...address, comment: e.target.value});
                setSelectedAddress(null);
              }}
              placeholder="Дополнительная информация для курьера"
            />
          </div>
          {isAuthenticated && (
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={address.saveAddress}
                  onChange={(e) => setAddress({...address, saveAddress: e.target.checked})}
                />
                <span>Сохранить адрес</span>
              </label>
              {address.saveAddress && (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={address.isDefault}
                    onChange={(e) => setAddress({...address, isDefault: e.target.checked})}
                  />
                  <span>Сделать адресом по умолчанию</span>
                </label>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="payment-section">
      <h3>Способ оплаты</h3>
      <div className="payment-methods">
        <label className="payment-method">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="method-content">
            <FiCreditCard className="method-icon" />
            <div className="method-info">
              <h4>Банковской картой</h4>
              <p>Visa, MasterCard, МИР</p>
            </div>
          </div>
        </label>
      </div>

      <div className="order-summary">
        <h3>Ваш заказ</h3>
        <div className="summary-items">
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
              <span>{new Intl.NumberFormat('ru-RU').format(item.price * item.quantity)} ₽</span>
            </div>
          ))}
        </div>
        <div className="summary-delivery">
          <span>Доставка</span>
          <span>{new Intl.NumberFormat('ru-RU').format(deliveryCost)} ₽</span>
        </div>
        <div className="summary-total">
          <span>Итого</span>
          <span>{new Intl.NumberFormat('ru-RU').format(total)} ₽</span>
        </div>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={48} />
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
        <button onClick={() => navigate('/catalog')} className="continue-shopping">
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-text">Корзина</span>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-text">Доставка</span>
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-text">Оплата</span>
        </div>
      </div>

      <div className="cart-content">
        {step === 1 && renderCartItems()}
        {step === 2 && renderDelivery()}
        {step === 3 && renderPayment()}

        <div className="cart-footer">
          <div className="cart-total">
            <div className="total-row">
              <span>Товары ({cartItems.length})</span>
              <span>{new Intl.NumberFormat('ru-RU').format(subtotal)} ₽</span>
            </div>
            {step > 1 && (
              <div className="total-row">
                <span>Доставка</span>
                <span>{new Intl.NumberFormat('ru-RU').format(deliveryCost)} ₽</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>Итого</span>
              <span>{new Intl.NumberFormat('ru-RU').format(total)} ₽</span>
            </div>
          </div>

          <div className="cart-actions">
            {step > 1 && (
              <button 
                className="back-btn"
                onClick={() => setStep(step - 1)}
              >
                <FiArrowLeft /> Назад
              </button>
            )}
            {step < 3 ? (
              <button 
                className="next-btn"
                onClick={() => setStep(step + 1)}
              >
                Далее <FiArrowRight />
              </button>
            ) : (
              <button 
                className="checkout-btn"
                onClick={handleSubmitOrder}
              >
                Оформить заказ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
