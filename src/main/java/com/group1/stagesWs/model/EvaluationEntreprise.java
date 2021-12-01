package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class EvaluationEntreprise implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private int numeroStage;
  private int[] evaluationGrid;
  private String commentaires;
  private int stagePrefere;
  private int nombreStagiaires;
  private boolean garderStagiaire;
  private boolean variableShifts;
  private double heuresEncadrementParSemaineMois1;
  private double heuresEncadrementParSemaineMois2;
  private double heuresEncadrementParSemaineMois3;
  private LocalDate dateCreation;
  private String session;

  @OneToOne private Contrat contrat;

  @ManyToOne private Superviseur superviseur;

  public EvaluationEntreprise() {
    this.dateCreation = LocalDate.now();
    this.evaluationGrid = new int[10];
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
  }
}
