import React, { useState, useEffect } from 'react';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/Catalog.css';

const Catalog = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({
        brands: [],
        gender: [],
        priceRange: { min: 0, max: 30000 },
        types: []
    });
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popular');
    const [searchQuery, setSearchQuery] = useState('');

    // Получаем уникальные значения для фильтров
    const allBrands = [...new Set(products.map(p => p.brand))];
    const allTypes = [...new Set(products.map(p => p.type))];

    // Применение фильтров
    useEffect(() => {
        let result = [...products];

        // Поиск
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Бренды
        if (filters.brands.length > 0) {
            result = result.filter(p => filters.brands.includes(p.brand));
        }

        // Пол
        if (filters.gender.length > 0) {
            result = result.filter(p => filters.gender.includes(p.gender));
        }

        // Тип аромата
        if (filters.types.length > 0) {
            result = result.filter(p => filters.types.includes(p.type));
        }

        // Ценовой диапазон
        result = result.filter(p =>
            p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
        );

        // Сортировка
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default: // popular
                result.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(result);
    }, [filters, sortBy, searchQuery]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => {
            if (filterType === 'priceRange') {
                return { ...prev, [filterType]: value };
            }
            const updatedValues = prev[filterType].includes(value)
                ? prev[filterType].filter(v => v !== value)
                : [...prev[filterType], value];
            return { ...prev, [filterType]: updatedValues };
        });
    };

    const clearFilters = () => {
        setFilters({
            brands: [],
            gender: [],
            priceRange: { min: 0, max: 30000 },
            types: []
        });
        setSearchQuery('');
    };

    return (
        <div className="catalog-page">
            {/* Hero секция */}
            <section className="catalog-hero glass">
                <div className="catalog-hero-content">
                    <h1 className="gradient-text">Каталог ароматов</h1>
                    <p>Найдите свой идеальный аромат среди нашей коллекции</p>
                </div>
            </section>

            <div className="catalog-container">
                {/* Мобильные фильтры */}
                <button
                    className="mobile-filters-button glass"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FiFilter />
                    Фильтры
                </button>

                {/* Боковая панель с фильтрами */}
                <aside className={`filters-sidebar glass ${showFilters ? 'show' : ''}`}>
                    <div className="filters-header">
                        <h2>Фильтры</h2>
                        <button
                            className="close-filters"
                            onClick={() => setShowFilters(false)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className="filters-content">
                        {/* Поиск */}
                        <div className="filter-section">
                            <h3>Поиск</h3>
                            <input
                                type="text"
                                placeholder="Поиск по названию..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        {/* Бренды */}
                        <div className="filter-section">
                            <h3>Бренды</h3>
                            <div className="checkbox-group">
                                {allBrands.map(brand => (
                                    <label key={brand} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.brands.includes(brand)}
                                            onChange={() => handleFilterChange('brands', brand)}
                                        />
                                        {brand}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Пол */}
                        <div className="filter-section">
                            <h3>Пол</h3>
                            <div className="checkbox-group">
                                {['men', 'women', 'unisex'].map(gender => (
                                    <label key={gender} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.gender.includes(gender)}
                                            onChange={() => handleFilterChange('gender', gender)}
                                        />
                                        {gender === 'men' ? 'Мужской' :
                                         gender === 'women' ? 'Женский' : 'Унисекс'}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Тип аромата */}
                        <div className="filter-section">
                            <h3>Тип аромата</h3>
                            <div className="checkbox-group">
                                {allTypes.map(type => (
                                    <label key={type} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={filters.types.includes(type)}
                                            onChange={() => handleFilterChange('types', type)}
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Ценовой диапазон */}
                        <div className="filter-section">
                            <h3>Цена</h3>
                            <div className="price-range">
                                <input
                                    type="number"
                                    value={filters.priceRange.min}
                                    onChange={(e) => handleFilterChange('priceRange', {
                                        ...filters.priceRange,
                                        min: parseInt(e.target.value) || 0
                                    })}
                                    placeholder="От"
                                />
                                <span>—</span>
                                <input
                                    type="number"
                                    value={filters.priceRange.max}
                                    onChange={(e) => handleFilterChange('priceRange', {
                                        ...filters.priceRange,
                                        max: parseInt(e.target.value) || 30000
                                    })}
                                    placeholder="До"
                                />
                            </div>
                        </div>

                        <button className="clear-filters" onClick={clearFilters}>
                            Сбросить фильтры
                        </button>
                    </div>
                </aside>

                {/* Основной контент */}
                <main className="catalog-main">
                    {/* Сортировка и результаты */}
                    <div className="catalog-header glass">
                        <div className="results-count">
                            Найдено: {filteredProducts.length} товаров
                        </div>
                        <div className="sort-dropdown">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="popular">По популярности</option>
                                <option value="price-asc">Цена: по возрастанию</option>
                                <option value="price-desc">Цена: по убыванию</option>
                                <option value="name">По названию</option>
                                <option value="rating">По рейтингу</option>
                            </select>
                            <FiChevronDown className="select-icon" />
                        </div>
                    </div>

                    {/* Сетка товаров */}
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Сообщение, если ничего не найдено */}
                    {filteredProducts.length === 0 && (
                        <div className="no-results glass">
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить параметры фильтрации</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Catalog;
