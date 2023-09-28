package com.davir.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Sale create(@RequestBody Sale sale) {
       return saleRepository.save(sale);
    }
    
    
}
