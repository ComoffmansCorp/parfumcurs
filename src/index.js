import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // 👈 импорт контекста авторизации

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* 👈 сначала AuthProvider */}
      <CartProvider> {/* 👈 потом CartProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);


