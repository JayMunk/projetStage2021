package com.group1.stagesWs.model;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.NotifStatus;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Notification implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String content;
  private NotifStatus
      status; // A CHANGER -Veux rendre le type un enum contenant tous les types de categories de
  // notif.
  private boolean isChecked;

  private String session;

  public Notification() {
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
    this.isChecked = false;
  }

  public Notification(String contenu, NotifStatus status) {
    this.content = contenu;
    this.status = status;
    this.isChecked = false;
    this.session = SessionManager.CURRENT_SESSION.getNomSession();
  }
}
