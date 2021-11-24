package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.model.Superviseur;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.GestionnaireRepository;
import com.group1.stagesWs.repositories.MoniteurRepository;
import com.group1.stagesWs.repositories.NotificationRepository;
import com.group1.stagesWs.repositories.SuperviseurRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class NotificationService extends SessionManager<Notification> {

  private final EtudiantRepository etudiantRepository;

  private final MoniteurRepository moniteurRepository;

  private final SuperviseurRepository superviseurRepository;

  private final GestionnaireRepository gestionnaireRepository;

  private final NotificationRepository notificationRepository;

  public NotificationService(
      EtudiantRepository etudiantRepository,
      MoniteurRepository moniteurRepository,
      SuperviseurRepository superviseurRepository,
      GestionnaireRepository gestionnaireRepository,
      NotificationRepository notificationRepository) {
    this.etudiantRepository = etudiantRepository;
    this.moniteurRepository = moniteurRepository;
    this.superviseurRepository = superviseurRepository;
    this.gestionnaireRepository = gestionnaireRepository;
    this.notificationRepository = notificationRepository;
  }

  public boolean saveNotificationEtudiant(Notification notification, int etudiantId) {
    notification = saveNotification(notification);
    Optional<Etudiant> etudiant = etudiantRepository.findById(etudiantId);
    if (etudiant.isPresent()) {
      List<Notification> etudiantNotifications = etudiant.get().getNotifications();
      etudiantNotifications.add(notification);
      etudiant = Optional.of(etudiantRepository.save(etudiant.get()));
      if (!etudiant.isEmpty()) {
        return true;
      }
    }
    return false;
  }

  public boolean saveNotificationSuperviseur(Notification notification, int superviseurId) {
    notification = saveNotification(notification);
    Optional<Superviseur> superviseur = superviseurRepository.findById(superviseurId);
    if (superviseur.isPresent()) {
      List<Notification> superviseurNotifications = superviseur.get().getNotifications();
      superviseurNotifications.add(notification);
      superviseur = Optional.of(superviseurRepository.save(superviseur.get()));
      if (!superviseur.isEmpty()) {
        return true;
      }
    }
    return false;
  }

  public boolean saveNotificationMoniteur(Notification notification, int moniteurId) {
    notification = saveNotification(notification);
    Optional<Moniteur> moniteur = moniteurRepository.findById(moniteurId);
    if (moniteur.isPresent()) {
      List<Notification> moniteurNotifications = moniteur.get().getNotifications();
      moniteurNotifications.add(notification);
      moniteur = Optional.of(moniteurRepository.save(moniteur.get()));
      if (!moniteur.isEmpty()) {
        return true;
      }
    }
    return false;
  }

  public boolean saveNotificationGestionnaire(Notification notification) {
    notification = saveNotification(notification);
    List<Gestionnaire> listGestionnaires = gestionnaireRepository.findAll();
    if (listGestionnaires.size() > 0) {
      for (Gestionnaire gestionnaire : listGestionnaires) {
        List<Notification> gestionnaireNotifications = gestionnaire.getNotifications();
        gestionnaireNotifications.add(notification);
        gestionnaire = gestionnaireRepository.save(gestionnaire);
        if (gestionnaire == null) {
          return false;
        }
        return true;
      }
    }
    return false;
  }

  public List<Notification> getNotificationsEtudiant(int etudiantId) {
    Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(etudiantId);
    if (optionalEtudiant.isPresent()) {
      return getListForCurrentSession(optionalEtudiant.get().getNotifications());
    }
    return List.of();
  }

  public List<Notification> getNotificationsSuperviseur(int superviseurId) {
    Optional<Superviseur> optionalSuperviseur = superviseurRepository.findById(superviseurId);
    if (optionalSuperviseur.isPresent()) {
      return getListForCurrentSession(optionalSuperviseur.get().getNotifications());
    }
    return List.of();
  }

  public List<Notification> getNotificationsMoniteur(int moniteurId) {
    Optional<Moniteur> optionalMoniteur = moniteurRepository.findById(moniteurId);
    if (optionalMoniteur.isPresent()) {
      return getListForCurrentSession(optionalMoniteur.get().getNotifications());
    }
    return List.of();
  }

  public List<Notification> getNotificationsGestionnaire() {
    List<Gestionnaire> gestionnaires = gestionnaireRepository.findAll();
    if (!gestionnaires.isEmpty()) {
      return getListForCurrentSession(gestionnaires.get(0).getNotifications());
    }
    return List.of();
  }

  public Notification saveNotification(Notification notification) {
    return notificationRepository.save(notification);
  }

  @Override
  public List<Notification> getListForCurrentSession(List<Notification> listNotif) {
    List<Notification> listNotificationCurrentSession = new ArrayList<>();
    for (Notification notif : listNotif) {
      if (notif.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession())) {
        listNotificationCurrentSession.add(notif);
      }
    }
    return listNotificationCurrentSession;
  }
}
