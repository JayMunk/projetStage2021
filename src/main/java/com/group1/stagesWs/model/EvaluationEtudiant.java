package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
public class EvaluationEtudiant implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private char[] evaluationGrid;
    private String moniteurFonction;
    private String commentairesProductivite;
    private String commentairesTravail;
    private String commentairesRelations;
    private String commentairesAttitude;
    private String commentairesGlobale;
    private boolean communiqueAuStagiaire;
    private double heuresEncadrementParSemaine;
    private String garderStagiaire;
    private String commentairesFormation;
    private LocalDate dateCreation;
    private String session;

    @OneToOne
    private Contrat contrat;

    public EvaluationEtudiant() {
        this.dateCreation = LocalDate.now();
        this.evaluationGrid = new char[23];
        this.session = SessionManager.CURRENT_SESSION.getNomSession();
    }
}
