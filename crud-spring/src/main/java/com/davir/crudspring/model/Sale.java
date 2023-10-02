package com.davir.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;


    @ManyToMany
    @JoinTable(
             name = "sale_product",
             joinColumns = @JoinColumn(name = "sale_id"),
             inverseJoinColumns = @JoinColumn(name = "product_id")
     )
     private List<Product> products;
 
     public List<Product> getProduct() {
        return products;
    }

}
