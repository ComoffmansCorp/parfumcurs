import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiStar, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import '../styles/Product.css';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        // Находим продукт по ID
        const foundProduct = products.find(p => p.id === Number(id));
        
        if (foundProduct) {
            setProduct(foundProduct);
        }
        setLoading(false);
    }, [id]);

    // Обработчик добавления в корзину
    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            setShowAddedMessage(true);
            
            // Скрываем сообщение через 2 секунды
            setTimeout(() => {
                setShowAddedMessage(false);
            }, 2000);
        }
    };

    // Получаем количество этого товара в корзине
    const getQuantityInCart = () => {
        const cartItem = cartItems.find(item => item.id === Number(id));
        return cartItem ? cartItem.quantity : 0;
    };

    // Если продукт не найден, показываем сообщение об ошибке
    if (!loading && !product) {
        return (
            <div className="product-error">
                <h2>Товар не найден</h2>
                <p>К сожалению, данный товар не существует или был удален.</p>
                <button onClick={() => navigate('/catalog')} className="back-button">
                    <FiArrowLeft />
                    <span>Вернуться в каталог</span>
                </button>
            </div>
        );
    }

    // Показываем загрузку
    if (loading || !product) {
        return <div className="product-loading">Загрузка...</div>;
    }

    return (
        <div className="product-page">
            <div className="product-container">
                <Link to="/catalog" className="back-link">
                    <FiArrowLeft />
                    <span>Вернуться в каталог</span>
                </Link>

                <div className="product-layout">
                    {/* Галерея изображений */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                    </div>

                    {/* Информация о продукте */}
                    <div className="product-details">
                        <div className="product-header">
                            <span className="product-brand">{product.brand}</span>
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-subtitle">
                                {product.type} · {product.volume}
                            </div>
                        </div>

                        {/* Рейтинг */}
                        <div className="product-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar 
                                        key={i}
                                        className={i < Math.floor(product.rating) ? 'star active' : 'star'}
                                    />
                                ))}
                            </div>
                            <span className="rating-text">
                                {product.rating} · {product.reviews} отзывов
                            </span>
                        </div>

                        {/* Цена и покупка */}
                        <div className="purchase-section">
                            <div className="price-block">
                                <span className="price">{product.price.toLocaleString()} ₽</span>
                                <span className="price-note">
                                    {product.price >= 5000 ? 'Бесплатная доставка' : 'Доставка от 300 ₽'}
                                </span>
                            </div>
                            <button 
                                className="buy-button" 
                                onClick={handleAddToCart}
                            >
                                <FiShoppingBag />
                                <span>
                                    {getQuantityInCart() > 0 
                                        ? `В корзине (${getQuantityInCart()})` 
                                        : 'Добавить в корзину'
                                    }
                                </span>
                            </button>
                        </div>

                        {/* Описание */}
                        <div className="description-section">
                            <h2>Описание</h2>
                            <p>{product.description}</p>
                        </div>

                        {/* Пирамида аромата */}
                        {product.scentPyramid && (
                            <div className="fragrance-section">
                                <h2>Пирамида аромата</h2>
                                <div className="fragrance-pyramid">
                                    <div className="note-group">
                                        <h3>Верхние ноты</h3>
                                        <div className="notes">
                                            {product.scentPyramid.top.map(note => (
                                                <span key={note} className="note">{note}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="note-group">
                                        <h3>Ноты сердца</h3>
                                        <div className="notes">
                                            {product.scentPyramid.middle.map(note => (
                                                <span key={note} className="note">{note}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="note-group">
                                        <h3>Базовые ноты</h3>
                                        <div className="notes">
                                            {product.scentPyramid.base.map(note => (
                                                <span key={note} className="note">{note}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Характеристики */}
                        <div className="specs-section">
                            <h2>Характеристики</h2>
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <span className="spec-label">Бренд</span>
                                    <span className="spec-value">{product.brand}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Год выпуска</span>
                                    <span className="spec-value">{product.year}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Объём</span>
                                    <span className="spec-value">{product.volume}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Тип аромата</span>
                                    <span className="spec-value">{product.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Уведомление о добавлении в корзину */}
            {showAddedMessage && (
                <div className="cart-notification">
                    Товар добавлен в корзину
                </div>
            )}
        </div>
    );
};

export default Product; 