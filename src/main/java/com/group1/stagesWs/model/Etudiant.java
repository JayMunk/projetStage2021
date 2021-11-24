package com.group1.stagesWs.model;

import com.group1.stagesWs.enums.UserType;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Etudiant extends User implements Serializable {

  private String programme;
  private String adresse;
  private String numMatricule;

  private boolean hasLicense;
  private boolean hasVoiture;

  @ManyToOne
  @JoinColumn(name = "superviseur_id")
  private Superviseur superviseur;

  public Etudiant() {
    role = UserType.ETUDIANT;
  }

  public Etudiant(
      String prenom,
      String nom,
      String courriel,
      String password,
      String numTelephone,
      String programme,
      String adresse,
      String numMatricule,
      boolean hasLicense,
      boolean hasVoiture) {
    super(prenom, nom, courriel, password, numTelephone, UserType.ETUDIANT);
    this.programme = programme;
    this.adresse = adresse;
    this.numMatricule = numMatricule;
    this.hasLicense = hasLicense;
    this.hasVoiture = hasVoiture;
  }
}
