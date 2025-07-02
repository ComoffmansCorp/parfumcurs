import { createContext, useContext, useEffect, useState } from 'react';

// создаём контекст
const CartContext = createContext();

// хук, чтобы проще использовать
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Загрузка из localStorage при старте
    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) setCartItems(JSON.parse(stored));
    }, []);

    // Сохраняем в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Добавление товара
    const addToCart = (product) => {
        setCartItems((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, {...product, quantity: 1 }];
        });
    };

    // Удаление одного товара
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Очистить корзину
    const clearCart = () => {
        setCartItems([]);
    };

    return ( <
        CartContext.Provider value = {
            { cartItems, addToCart, removeFromCart, clearCart } } > { children } <
        /CartContext.Provider>
    );
}