package com.group1.stagesWs.model;

import com.group1.stagesWs.enums.UserType;
import java.io.Serializable;
import javax.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Moniteur extends User implements Serializable {

  private String nomEntreprise;
  private String adresseEntreprise;

  public Moniteur() {
    role = UserType.MONITEUR;
  }

  public Moniteur(
      String prenom,
      String nom,
      String courriel,
      String password,
      String numTelephone,
      String nomEntreprise,
      String adresseEntreprise) {
    super(prenom, nom, courriel, password, numTelephone, UserType.MONITEUR);
    this.nomEntreprise = nomEntreprise;
    this.adresseEntreprise = adresseEntreprise;
  }
}
