import '../styles/ProductSlider.css';
import ProductCard from './ProductCard';
import products from '../data/products';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function ProductSlider() {
  const popularProducts = products.filter((product) => product.isPopular);
  const itemsPerPage = 2;
  const totalSlides = Math.ceil(popularProducts.length / itemsPerPage);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Автоматическая прокрутка с увеличенным интервалом
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [index, isAnimating]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const goToSlide = (i) => {
    if (!isAnimating && i !== index) {
      setIsAnimating(true);
      setIndex(i);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const slideStyle = {
    transform: `translateX(-${index * 100}%)`,
  };

  return (
    <div className="slider-wrapper">
      <button 
        className="nav-btn left" 
        onClick={handlePrev}
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <FiChevronLeft />
      </button>

      <div className="slider-window">
        <div className="slider-track" style={slideStyle}>
          {Array.from({ length: totalSlides }).map((_, slideIdx) => {
            const start = slideIdx * itemsPerPage;
            const slideProducts = popularProducts.slice(start, start + itemsPerPage);

            return (
              <div 
                className="slider-slide" 
                key={slideIdx}
                data-active={slideIdx === index}
              >
                {slideProducts.map((product, productIdx) => (
                  <div 
                    className="slider-item"
                    key={product.id}
                    style={{
                      animationDelay: `${productIdx * 0.2}s`
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <button 
        className="nav-btn right" 
        onClick={handleNext}
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <FiChevronRight />
      </button>

      <div className="dots-container">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            disabled={isAnimating}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSlider;
