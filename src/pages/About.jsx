import React from 'react';
import { FiAward, FiUsers, FiSmile, FiGlobe } from 'react-icons/fi';
import '../styles/About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero секция */}
            <section className="about-hero glass">
                <div className="about-hero-content">
                    <h1 className="gradient-text">О Parfume & Co</h1>
                    <p>Мы создаем уникальный опыт в мире ароматов, предлагая только оригинальную парфюмерию от ведущих брендов мира</p>
                </div>
            </section>

            {/* Статистика */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card glass">
                        <FiUsers className="stat-icon" />
                        <div className="stat-number">0+</div>
                        <div className="stat-label">Довольных клиентов</div>
                    </div>
                    <div className="stat-card glass">
                        <FiAward className="stat-icon" />
                        <div className="stat-number">0+</div>
                        <div className="stat-label">Лет опыта</div>
                    </div>
                    <div className="stat-card glass">
                        <FiGlobe className="stat-icon" />
                        <div className="stat-number">0+</div>
                        <div className="stat-label">Брендов</div>
                    </div>
                    <div className="stat-card glass">
                        <FiSmile className="stat-icon" />
                        <div className="stat-number">0%</div>
                        <div className="stat-label">Положительных отзывов</div>
                    </div>
                </div>
            </section>

            {/* История */}
            <section className="story-section glass">
                <div className="story-content">
                    <h2 className="section-title gradient-text">Наша История</h2>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="year">2025</div>
                            <div className="event">
                                <h3>Основание компании</h3>
                                <p>Начало пути с небольшого магазина в центре города</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="year">2025</div>
                            <div className="event">
                                <h3>Расширение ассортимента</h3>
                                <p>Партнерство с ведущими мировыми брендами</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="year">2025</div>
                            <div className="event">
                                <h3>Запуск онлайн-магазина</h3>
                                <p>Выход на всероссийский рынок</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="year">2025</div>
                            <div className="event">
                                <h3>Новая эра</h3>
                                <p>Редизайн и улучшение клиентского опыта</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ценности */}
            <section className="values-section">
                <h2 className="section-title gradient-text">Наши Ценности</h2>
                <div className="values-grid">
                    <div className="value-card glass">
                        <h3>Качество</h3>
                        <p>Мы гарантируем подлинность каждого флакона и работаем только с проверенными поставщиками</p>
                    </div>
                    <div className="value-card glass">
                        <h3>Экспертиза</h3>
                        <p>Наши консультанты - настоящие знатоки парфюмерии, готовые помочь с выбором</p>
                    </div>
                    <div className="value-card glass">
                        <h3>Сервис</h3>
                        <p>Индивидуальный подход к каждому клиенту и быстрая доставка по всей России</p>
                    </div>
                    <div className="value-card glass">
                        <h3>Инновации</h3>
                        <p>Постоянное развитие и внедрение новых технологий для улучшения покупательского опыта</p>
                    </div>
                </div>
            </section>

            {/* Команда */}
            <section className="team-section glass">
                <h2 className="section-title gradient-text">Наша Команда</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/images/team/member1.jpg" alt="CEO" />
                        </div>
                        <h3>Бондарчук Максим</h3>
                        <p className="position">CEO</p>
                    </div>
                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/images/team/member2.jpg" alt="Креативный директор" />
                        </div>
                        <h3>Бондарчук Максим</h3>
                        <p className="position">Креативный директор</p>
                    </div>
                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/images/team/member3.jpg" alt="Главный парфюмер" />
                        </div>
                        <h3>Бондарчук Максим</h3>
                        <p className="position">Главный парфюмер</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
