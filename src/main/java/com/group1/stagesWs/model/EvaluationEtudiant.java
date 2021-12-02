package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class EvaluationEtudiant implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private int[] evaluationGrid;
  private String moniteurFonction;
  private String commentairesProductivite;
  private String commentairesTravail;
  private String commentairesRelations;
  private String commentairesAttitude;
  private String commentairesGlobale;
  private boolean communiqueAuStagiaire;
  private double heuresEncadrementParSemaine;
  private boolean garderStagiaire;
  private String commentairesFormation;
  private LocalDate dateCreation;
  private String session;

  @OneToOne private Contrat contrat;

  public EvaluationEtudiant() {
    this.dateCreation = LocalDate.now();
    this.evaluationGrid = new int[23];
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
  }
}
