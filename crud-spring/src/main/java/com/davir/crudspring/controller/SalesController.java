package com.davir.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davir.crudspring.model.Sale;
import com.davir.crudspring.repository.SaleRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/sales")
@AllArgsConstructor
public class SalesController {

    private final SaleRepository saleRepository;

    //primeiro método 'GET'
    @GetMapping
    public List<Sale> list() {
        return saleRepository.findAll();
        //método findAll() incluso no JpaRepository
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sale> findById(@PathVariable Long id) {
        return saleRepository.findById(id)
            .map(recordFound -> ResponseEntity.ok().body(recordFound))
            .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Sale create(@RequestBody Sale sale) {
       return saleRepository.save(sale);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sale> update(@PathVariable Long id, @RequestBody Sale sale) {
        return saleRepository.findById(id)
            .map(recordFound -> {
                recordFound.setClient(sale.getClient());
                recordFound.setProducts(sale.getProducts());
                Sale updated = saleRepository.save(recordFound);
                return ResponseEntity.ok().body(updated);
            })
            .orElse(ResponseEntity.notFound().build());    
    }
    
}
