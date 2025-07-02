import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Валидация
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (formData.password.length < 6) {
            setError('Пароль должен содержать минимум 6 символов');
            return;
        }

        try {
            // Здесь будет запрос к API для регистрации
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка регистрации');
            }

            const data = await response.json();
            
            // Сохраняем токен в localStorage
            localStorage.setItem('token', data.token);
            
            // Перенаправляем на главную страницу
            navigate('/');
        } catch (err) {
            setError('Произошла ошибка при регистрации. Попробуйте позже.');
        }
    };

    return (
        <div className="register-page">
            <div className="register-container glass">
                <div className="register-content">
                    <h1 className="gradient-text">Создать аккаунт</h1>
                    <p className="register-subtitle">
                        Присоединяйтесь к нам и откройте мир изысканных ароматов
                    </p>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="name-group">
                            <div className="form-group">
                                <div className="input-icon">
                                    <FiUser />
                                </div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Имя"
                                    autoComplete="given-name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <div className="input-icon">
                                    <FiUser />
                                </div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Фамилия"
                                    autoComplete="family-name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-icon">
                                <FiMail />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="input-icon">
                                <FiLock />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Пароль"
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <div className="form-group">
                            <div className="input-icon">
                                <FiLock />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Подтвердите пароль"
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="register-button">
                            Зарегистрироваться
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>Уже есть аккаунт?</p>
                        <Link to="/login" className="login-link">
                            Войти
                        </Link>
                    </div>
                </div>

                <div className="register-decoration">
                    <div className="decoration-circle"></div>
                    <div className="decoration-line"></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
