package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Offre implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String titre;
  private String description;
  private String entreprise;
  private boolean isValid;
  private String adresse;
  private String dateDebut;
  private String dateFin;
  private int nbTotalSemaine;
  private LocalTime horaireDebut;
  private LocalTime horaireFin;
  private double nbTotalHeuresParSemaine;
  private double tauxHoraire;
  private String session;

  @ManyToOne
  private Gestionnaire gestionnaire;

  @ManyToOne
  private Moniteur moniteur;

  @ManyToMany
  private Set<Etudiant> whitelist;

  @ManyToMany
  private Set<Etudiant> applicants;

  public Offre() {
    this.whitelist = new HashSet<>();
    this.applicants = new HashSet<>();
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
  }

  public Offre(
      String titre,
      String description,
      String entreprise,
      boolean isValid,
      String adresse,
      String dateDebut,
      String dateFin,
      int nbTotalSemaine,
      LocalTime horaireDebut,
      LocalTime horaireFin,
      double nbTotalHeuresParSemaine,
      double tauxHoraire) {
    this.titre = titre;
    this.description = description;
    this.entreprise = entreprise;
    this.isValid = isValid;
    this.adresse = adresse;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.nbTotalSemaine = nbTotalSemaine;
    this.horaireDebut = horaireDebut;
    this.horaireFin = horaireFin;
    this.nbTotalHeuresParSemaine = nbTotalHeuresParSemaine;
    this.tauxHoraire = tauxHoraire;
    this.whitelist = new HashSet<>();
    this.applicants = new HashSet<>();
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
  }
}
