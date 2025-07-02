import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    return (
        <Router>
            <CartProvider>
                <div className="app">
                    <Header />
                    <main className="main-content">
                        <AppRoutes />
                    </main>
                    <Footer />
                </div>
            </CartProvider>
        </Router>
    );
}

export default App; 