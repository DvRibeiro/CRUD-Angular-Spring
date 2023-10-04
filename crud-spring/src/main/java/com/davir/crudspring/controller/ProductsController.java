package com.davir.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davir.crudspring.model.Product;
import com.davir.crudspring.repository.ProductRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductsController {

    private final ProductRepository productRepository;

    //primeiro método 'GET'
    @GetMapping
    public List<Product> list() {
        return productRepository.findAll();
        //método findAll() incluso no JpaRepository
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        return productRepository.findById(id)
            .map(record -> ResponseEntity.ok().body(record))
            .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Product create(@RequestBody Product product) {
       return productRepository.save(product);
    }
    
    
}
