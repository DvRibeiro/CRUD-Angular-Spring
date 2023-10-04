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

import com.davir.crudspring.model.Client;
import com.davir.crudspring.repository.ClientRepository;
import com.davir.crudspring.repository.SaleRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/clients")
@AllArgsConstructor
public class ClientsController {

    private final ClientRepository clientRepository;
    private final SaleRepository saleRepository;


    //primeiro método 'GET'
    @GetMapping
    public List<Client> list() {
        return clientRepository.findAll();
        //método findAll() incluso no JpaRepository
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> findById(@PathVariable Long id) {
        return clientRepository.findById(id)
            .map(recordFound -> ResponseEntity.ok().body(recordFound))
            .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Client create(@RequestBody Client client) {
       return clientRepository.save(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client client) {
        return clientRepository.findById(id)
            .map(recordFound -> {
                recordFound.setName(client.getName());
                recordFound.setEmail(client.getEmail());
                recordFound.setBirthDate(client.getBirthDate());
                Client updated = clientRepository.save(recordFound);
                return ResponseEntity.ok().body(updated);
            })
            .orElse(ResponseEntity.notFound().build());    
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if(saleRepository.existsByClientId(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).<Void>build();
        } else {
            return clientRepository.findById(id)
            .map(recordFound -> {
                clientRepository.deleteById(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
        }
    }
    
    
}
