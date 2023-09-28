package com.davir.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import jakarta.persistence.*;
import java.util.Date; // Import the java.util.Date class
import java.util.List;


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

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Sale> sales;

    // Getter method for birthDate
    public Date getBirthDate() {
        return birthDate;
    }

    // Setter method for birthDate
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
}
