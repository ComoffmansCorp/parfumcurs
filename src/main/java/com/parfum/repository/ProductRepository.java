package com.parfum.repository;

import com.parfum.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByBrand(String brand);
    List<Product> findByGender(String gender);
    List<Product> findByPopularTrue();
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
} 