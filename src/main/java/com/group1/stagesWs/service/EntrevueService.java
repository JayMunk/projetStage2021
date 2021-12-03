package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.Entrevue;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.repositories.EntrevueRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class EntrevueService extends SessionManager<Entrevue> {

  private final EntrevueRepository entrevueRepository;
  private final NotificationService notificationService;

  public EntrevueService(
      EntrevueRepository entrevueRepository, NotificationService notificationService) {
    this.entrevueRepository = entrevueRepository;
    this.notificationService = notificationService;
  }

  public Optional<Entrevue> saveEntrevue(Entrevue entrevue) {
    notificationService.saveNotificationEtudiant(
        new Notification(
            "Vous etes convoque a une entrevue le : "
                + entrevue.getDate()
                + " avec le moniteur "
                + entrevue.getMoniteur().getPrenom()
                + " "
                + entrevue.getMoniteur().getNom(),
            NotifStatus.URGENT),
        entrevue.getEtudiant().getId());
    return Optional.of(entrevueRepository.save(entrevue));
  }

  public List<Entrevue> getAllEntrevuesSession() {
    List<Entrevue> listEntrevueCurrentSession = entrevueRepository.findAll();
    return getListForCurrentSession(listEntrevueCurrentSession);
  }

  public List<Entrevue> getAllEntrevueEtudiant(int id) {
    List<Entrevue> listEtudiantCurrentSession = entrevueRepository.findEntrevueByEtudiantId(id);
    return getListForCurrentSession(listEtudiantCurrentSession);
  }

  public List<Entrevue> getAllEntrevueMoniteur(int id) {
    List<Entrevue> listMoniteurCurrentSession = entrevueRepository.findEntrevueByMoniteurId(id);
    return getListForCurrentSession(listMoniteurCurrentSession);
  }

  public List<Entrevue> getAllEntrevuesQuiArrive() {
    return entrevueRepository.findAllByDateAfter(LocalDate.now());
  }

  public List<Entrevue> getAllEntrevuesPasse() {
    return entrevueRepository.findAllByDateBefore(LocalDate.now());
  }

  public List<Entrevue> getAllEntrevues() { //tested
    return entrevueRepository.findAll();
  } //tested

  public List<Entrevue> getEntrevuesAccepted() {
    List<Entrevue> listEntrevuesAccepted = entrevueRepository.findEntrevueByStatus(Status.ACCEPTED);
    return listEntrevuesAccepted;
  }

  @Override
  public List<Entrevue> getListForCurrentSession(List<Entrevue> listEntrevue) {
    List<Entrevue> listEntrevueCurrentSession = new ArrayList<>();
    for (Entrevue entrevue : listEntrevue) {
      if (entrevue.getSession() == SessionManager.CURRENT_SESSION.getNomSession()) {
        listEntrevueCurrentSession.add(entrevue);
      }
    }
    return listEntrevueCurrentSession;
  }
}
