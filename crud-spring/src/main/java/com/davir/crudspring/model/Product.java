package com.davir.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private long id;

    @Column(length = 200, nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private double price;

    @ManyToMany(mappedBy = "products")
    private List<Sale> sales;
}
