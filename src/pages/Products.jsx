import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/ProductGrid.css';

const Products = ({ products }) => {
    const [sortBy, setSortBy] = useState('popularity');

    return (
        <div className="products-container">
            <div className="products-header">
                <div className="products-count">
                    Найдено: {products.length} товаров
                </div>
                <select 
                    className="products-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="popularity">По популярности</option>
                    <option value="price-asc">По возрастанию цены</option>
                    <option value="price-desc">По убыванию цены</option>
                    <option value="name">По названию</option>
                </select>
            </div>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products; 