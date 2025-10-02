import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from './pages/Profile';
import ScrollToTop from "./components/ScrollToTop";

// Импорт стилей
import './styles/variables.css';
import './styles/fonts.css';
import './styles/App.css';
import './styles/animations.css';

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    const { isAuthenticated } = useAuth();
    
    return (
        <Router>
            <div className="app">
                <ScrollToTop />
                <Header />
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route 
                            path="/checkout" 
                            element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/profile" 
                            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;