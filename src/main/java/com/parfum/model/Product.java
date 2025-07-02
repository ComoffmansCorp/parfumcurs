package com.parfum.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private BigDecimal price;

    private String image;

    @Column(nullable = false)
    private String gender;

    private String volume;

    @Column(name = "fragrance_type")
    private String fragranceType;

    private Integer year;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "is_popular")
    private boolean popular;

    @Embedded
    private ScentPyramid scentPyramid;

    private String collection;
} 