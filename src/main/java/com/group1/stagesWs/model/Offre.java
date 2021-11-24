package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import lombok.Data;

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
  private String horaire;
  private double nbTotalHeuresParSemaine;
  private double tauxHoraire;
  private String session;

  @ManyToOne private Gestionnaire gestionnaire;

  @ManyToOne private Moniteur moniteur;

  @ManyToMany private Set<Etudiant> whitelist;

  @ManyToMany private Set<Etudiant> applicants;

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
      String horaire,
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
    this.horaire = horaire;
    this.nbTotalHeuresParSemaine = nbTotalHeuresParSemaine;
    this.tauxHoraire = tauxHoraire;
    this.whitelist = new HashSet<>();
    this.applicants = new HashSet<>();
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
  }
}
