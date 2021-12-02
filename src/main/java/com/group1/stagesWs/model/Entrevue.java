package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.Status;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Entrevue implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String titre;
  private LocalDate date;
  private LocalTime time;
  private String nomEntreprise;

  private Status status;

  private String session;

  @ManyToOne
  private Etudiant etudiant;

  @ManyToOne
  private Moniteur moniteur;

  public Entrevue() {
    session = SessionManager.CURRENT_SESSION.getNomSession();
    this.status = Status.PENDING;
  }

  public Entrevue(String titre, LocalDate date, LocalTime time,
      String nomEntreprise, Etudiant etudiant, Moniteur moniteur) {
    this.titre = titre;
    this.date = date;
    this.time = time;
    this.nomEntreprise = nomEntreprise;
    this.etudiant = etudiant;
    this.moniteur = moniteur;
  }
}
