import React, { useState, useEffect } from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.new.css';

const ProductCard = ({ product }) => {
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('ProductCard received product:', product);
    }, [product]);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 2000);
    };

    const handleCardClick = () => {
        console.log('Navigating to product with ID:', product.id);
        navigate(`/product/${product.id}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };
//proverka
    if (!product) {
        console.warn('ProductCard: No product data provided');
        return null;
    }

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="product-image">
                {!imageLoaded && (
                    <div className="image-skeleton" />
                )}
                <img 
                    src={product.image} 
                    alt={product.name}
                    onLoad={handleImageLoad}
                />
                <button className="favorite-button" onClick={handleFavoriteClick}>
                    <FiHeart />
                </button>
                {showAddedMessage && (
                    <div className="added-message">
                        Добавлено в корзину
                    </div>
                )}
            </div>
            
            <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-meta">
                    <span className="product-volume">{product.volume}</span>
                </div>
            </div>

            <div className="product-price">
                {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
            </div>
            
            <button className="add-to-cart" onClick={handleAddToCart}>
                <FiShoppingBag />
                В корзину
            </button>
        </div>
    );
};

export default ProductCard;
