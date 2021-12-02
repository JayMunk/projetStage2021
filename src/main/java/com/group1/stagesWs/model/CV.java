package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.Status;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class CV implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String nom;

  private LocalDate dateSoumission;
  private Status status;
  private String session;
  private boolean defaultCV;

  @Lob
  private byte[] data;

  @ManyToOne
  private Etudiant etudiant;

  public CV() {
    this.dateSoumission = LocalDate.now();
    this.defaultCV = true;
    this.status = Status.PENDING;
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
  }
}
