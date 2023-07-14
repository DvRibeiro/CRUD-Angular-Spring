package com.davir.crudspring.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data //Data -> equivalente aos getters & setters (lombok)
@Entity //Especifica a classe como uma entidade (mapeamento database)
public class Course {
    
    @Id //anotação chave primária
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private long id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 200, nullable = false)
    private String category;

    @Column(length = 200, nullable = false)
    private String price;
}
