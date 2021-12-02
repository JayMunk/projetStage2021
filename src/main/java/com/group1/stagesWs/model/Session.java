package com.group1.stagesWs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Session {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String nomSession;

  public Session() {
  }

  public Session(String nomSession) {
    this.nomSession = nomSession;
  }
}
