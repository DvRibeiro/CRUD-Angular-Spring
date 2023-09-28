package com.davir.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davir.crudspring.model.Client;
import com.davir.crudspring.repository.ClientRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/clients")
@AllArgsConstructor
public class ClientsController {

    private final ClientRepository clientRepository;

    //primeiro método 'GET'
    @GetMapping
    public List<Client> list() {
        return clientRepository.findAll();
        //método findAll() incluso no JpaRepository
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Client create(@RequestBody Client client) {
       return clientRepository.save(client);
    }
    
    
}
