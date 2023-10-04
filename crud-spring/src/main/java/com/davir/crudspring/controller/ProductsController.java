package com.davir.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davir.crudspring.model.Product;
import com.davir.crudspring.repository.ProductRepository;
import com.davir.crudspring.repository.SaleRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductsController {

    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;


    //primeiro método 'GET'
    @GetMapping
    public List<Product> list() {
        return productRepository.findAll();
        //método findAll() incluso no JpaRepository
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        return productRepository.findById(id)
            .map(recordFound -> ResponseEntity.ok().body(recordFound))
            .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Product create(@RequestBody Product product) {
       return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product) {
        return productRepository.findById(id)
            .map(recordFound -> {
                recordFound.setName(product.getName());
                recordFound.setPrice(product.getPrice());
                Product updated = productRepository.save(recordFound);
                return ResponseEntity.ok().body(updated);
            })
            .orElse(ResponseEntity.notFound().build());    
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return productRepository.findById(id)
            .map(recordFound -> {
                productRepository.deleteById(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}

    

