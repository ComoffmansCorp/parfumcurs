import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock } from 'react-icons/fi';
import '../styles/Contact.css';

const Contacts = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь будет логика отправки формы
        console.log('Form data:', formData);
    };

    return (
        <div className="contact-page">
            {/* Hero секция */}
            <section className="contact-hero glass">
                <div className="contact-hero-content">
                    <h1 className="gradient-text">Свяжитесь с нами</h1>
                    <p>Мы всегда рады помочь вам с выбором аромата и ответить на любые вопросы</p>
                </div>
            </section>

            <div className="contact-container">
                {/* Контактная информация */}
                <div className="contact-info glass">
                    <h2>Наши контакты</h2>
                    <div className="info-items">
                        <div className="info-item">
                            <div className="info-icon">
                                <FiPhone />
                            </div>
                            <div className="info-content">
                                <h3>Телефон</h3>
                                <p>+7 (927) 610-72-18</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <FiMail />
                            </div>
                            <div className="info-content">
                                <h3>Email</h3>
                                <p>info@parfumeco.ru</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <FiMapPin />
                            </div>
                            <div className="info-content">
                                <h3>Адрес</h3>
                                <p>г. Самара, ул. Молодежная, 2</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <FiClock />
                            </div>
                            <div className="info-content">
                                <h3>Время работы</h3>
                                <p>Пн-Пт: 10:00 - 20:00</p>
                                <p>Сб-Вс: 11:00 - 18:00</p>
                            </div>
                        </div>
                    </div>

                    <div className="social-links">
                        <h3>Мы в соцсетях</h3>
                        <div className="social-buttons">
                            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="social-button">
                                Telegram
                            </a>
                            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="social-button">
                                VK
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-button">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Форма обратной связи */}
                <div className="contact-form-section glass">
                    <h2>Напишите нам</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ваше имя"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ваш email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Ваше сообщение..."
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-button">
                            <FiSend />
                            Отправить сообщение
                        </button>
                    </form>
                </div>
            </div>

            {/* Карта */}
            <section className="map-section glass">
                <h2>Как нас найти</h2>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2386.9169776873!2d50.12345678901234!3d53.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA3JzM0LjQiTiA1MMKwMDcnMzQuNCJF!5e0!3m2!1sru!2sru!4v1234567890123!5m2!1sru!2sru"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default Contacts;
