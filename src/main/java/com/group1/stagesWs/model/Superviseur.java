package com.group1.stagesWs.model;

import com.group1.stagesWs.enums.UserType;
import java.io.Serializable;
import javax.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Superviseur extends User implements Serializable {

  private String departement;
  private String specialite;

  public Superviseur() {
    role = UserType.SUPERVISEUR;
  }

  public Superviseur(
      String prenom,
      String nom,
      String courriel,
      String password,
      String numTelephone,
      String departement,
      String specialite) {
    super(prenom, nom, courriel, password, numTelephone, UserType.SUPERVISEUR);
    this.departement = departement;
    this.specialite = specialite;
  }
}
