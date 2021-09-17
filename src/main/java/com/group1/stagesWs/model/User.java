package com.group1.stagesWs.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@MappedSuperclass
@Data
public class 5User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String prenom;
    private String nom;
    private String courriel;
    private String password;
    private String numTelephone;

    private boolean isVerifier;
    private LocalDate dateCreation;


    public User(){

    }

    public User(String prenom, String nom, String courriel, String password, String numTelephone) {
        this.prenom = prenom;
        this.nom = nom;
        this.courriel = courriel;
        this.password = password;
        this.numTelephone = numTelephone;
        this.isVerifier = false;
        this.dateCreation = LocalDate.now();
    }
}
