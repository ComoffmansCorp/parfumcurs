import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiEdit2, FiMapPin, FiCreditCard } from 'react-icons/fi';
import '../styles/Profile.css';

function Profile() {
  const { userEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({
    name: 'Иван Иванов',
    email: userEmail,
    phone: '+7 (999) 123-45-67',
    avatar: null
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Дом',
      address: 'ул. Примерная, д. 1, кв. 1',
      city: 'Москва',
      isDefault: true
    }
  ]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Загрузка заказов
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders
      .filter(order => order.user === userEmail)
      .map(order => ({
        ...order,
        statusHistory: order.statusHistory || [
          { status: order.status, date: order.date, comment: 'Заказ создан' }
        ]
      }))
      .reverse();
    setOrders(userOrders);

    // Загрузка избранного
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getOrderStatus = (status) => {
    const statuses = {
      'pending': { text: 'В обработке', color: '#f0ad4e', icon: 'FiClock' },
      'confirmed': { text: 'Подтвержден', color: '#5bc0de', icon: 'FiCheck' },
      'shipped': { text: 'Отправлен', color: '#0275d8', icon: 'FiTruck' },
      'delivered': { text: 'Доставлен', color: '#5cb85c', icon: 'FiPackage' },
      'cancelled': { text: 'Отменён', color: '#d9534f', icon: 'FiX' }
    };
    return statuses[status] || statuses.pending;
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const renderProfile = () => (
    <div className="profile-section">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {profile.name.charAt(0)}
              </div>
            )}
            <label className="avatar-upload">
              <FiEdit2 />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </label>
          </div>
        </div>
        <div className="profile-info">
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="section-title">
          <h4>Адреса доставки</h4>
          <button className="add-button">+ Добавить адрес</button>
        </div>
        <div className="addresses-grid">
          {addresses.map(address => (
            <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
              <div className="address-header">
                <span className="address-type">{address.type}</span>
                {address.isDefault && <span className="default-badge">По умолчанию</span>}
              </div>
              <p className="address-text">{address.address}</p>
              <p className="address-city">{address.city}</p>
              <div className="address-actions">
                <button className="edit-button"><FiEdit2 /> Изменить</button>
                {!address.isDefault && <button className="delete-button">Удалить</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-section">
      {orders.length === 0 ? (
        <div className="empty-state">
          <FiPackage size={48} />
          <p>У вас пока нет заказов</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-number">Заказ #{order.id}</span>
                  <span className="order-date">{formatDate(order.date)}</span>
                </div>
                <div className="order-status" style={{ 
                  backgroundColor: getOrderStatus(order.status).color + '20',
                  color: getOrderStatus(order.status).color 
                }}>
                  {getOrderStatus(order.status).text}
                </div>
              </div>

              <div className="order-progress">
                {order.statusHistory.map((status, index) => (
                  <div key={index} className="status-item">
                    <div className="status-dot" style={{
                      backgroundColor: getOrderStatus(status.status).color
                    }} />
                    <div className="status-info">
                      <span className="status-date">{formatDate(status.date)}</span>
                      <span className="status-text">{status.comment}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-items">
              {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-brand">{item.brand}</p>
                      <p className="item-quantity">{item.quantity} шт.</p>
                    </div>
                    <p className="item-price">{new Intl.NumberFormat('ru-RU').format(item.price)} ₽</p>
                  </div>
              ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Итого:</span>
                  <span className="total-amount">
                    {new Intl.NumberFormat('ru-RU').format(order.total)} ₽
                  </span>
                </div>
                <div className="order-actions">
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <button className="cancel-button">Отменить заказ</button>
                  )}
                  <button className="reorder-button">Повторить заказ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderFavorites = () => (
    <div className="favorites-section">
      {favorites.length === 0 ? (
        <div className="empty-state">
          <FiHeart size={48} />
          <p>В избранном пока пусто</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(item => (
            <div key={item.id} className="favorite-card">
              <img src={item.image} alt={item.name} />
              <div className="favorite-info">
                <h4>{item.name}</h4>
                <p className="price">{item.price} ₽</p>
              </div>
              <button className="add-to-cart-button">В корзину</button>
            </div>
          ))}
          </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="settings-group">
        <h4>Личные данные</h4>
        <div className="settings-form">
          <div className="form-group">
            <label>Имя</label>
            <input type="text" value={profile.name} onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={profile.email} disabled />
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input type="tel" value={profile.phone} onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h4>Уведомления</h4>
        <div className="settings-options">
          <label className="switch-label">
            <span>Email-рассылка</span>
            <div className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </div>
          </label>
          <label className="switch-label">
            <span>SMS-уведомления</span>
            <div className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </div>
          </label>
        </div>
      </div>

      <button className="save-settings">Сохранить изменения</button>
    </div>
  );

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <nav className="profile-nav">
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser /> Профиль
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiPackage /> Заказы
          </button>
          <button
            className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <FiHeart /> Избранное
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings /> Настройки
          </button>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut /> Выйти
        </button>
      </aside>

      <main className="profile-content">
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'favorites' && renderFavorites()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
}

export default Profile;
