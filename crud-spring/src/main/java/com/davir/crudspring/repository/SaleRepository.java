package com.davir.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.davir.crudspring.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Sale s WHERE s.client.id = :clientId")
    boolean existsByClientId(Long clientId);
    
}
