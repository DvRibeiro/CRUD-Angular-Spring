package com.davir.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import jakarta.persistence.*;

@Data
@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private long id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 200, nullable = false)
    private String email;

    @Column(length = 200, nullable = false)
    private String birthDate; // Alterado o tipo para String

    // @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    // private List<Sale> sales;

    // Getter method for birthDate
    public String getBirthDate() {
        return birthDate;
    }

    // Setter method for birthDate
    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }
}
