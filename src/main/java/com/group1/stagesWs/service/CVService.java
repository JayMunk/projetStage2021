package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.repositories.CVRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CVService extends SessionManager<CV> {

  private final CVRepository cvRepository;

  private final EmailService emailService;

  private final NotificationService notificationService;

  public CVService(
      CVRepository cvRepository,
      EmailService emailService,
      NotificationService notificationService) {
    this.cvRepository = cvRepository;
    this.emailService = emailService;
    this.notificationService = notificationService;
  }

  public Optional<CV> saveCV(CV cv) {
    Optional<CV> optionalCV = Optional.of(cvRepository.save(cv));
    if (optionalCV.isPresent()) {
      emailService.sendGestionnaireEmailCVAjouter();
      notificationService.saveNotificationGestionnaire(
          new Notification(
              "Il y a un nouveau cv a verifier de l'etudiant : "
                  + cv.getEtudiant().getPrenom()
                  + " "
                  + cv.getEtudiant().getNom(),
              NotifStatus.ALERT));
    }
    return optionalCV;
  }

  public List<CV> getAllCVEtudiant(int id) {
    List<CV> listCVEtudiantCurrentSession = cvRepository.findCVByEtudiantId(id);
    return getListForCurrentSession(listCVEtudiantCurrentSession);
  }

  public Boolean deleteCV(int id) {
    return cvRepository.deleteCVById(id);
  }

  public byte[] generateCVPDF(byte[] bArray, String fileName) {
    try {
      return bArray;
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    return null;
  }

  public Optional<CV> acceptCV(CV cv) {
    cv.setStatus(Status.ACCEPTED);
    emailService.sendEtudiantEmailCVAccepted(cv);
    notificationService.saveNotificationEtudiant(
        new Notification("Votre cv " + cv.getNom() + " a été accepté", NotifStatus.ALERT),
        cv.getEtudiant().getId());
    return Optional.of(cvRepository.save(cv));
  }

  public Optional<CV> rejectCV(CV cv) {
    cv.setStatus(Status.REJECTED);
    emailService.sendEtudiantEmailCVRejected(cv);
    notificationService.saveNotificationEtudiant(
        new Notification("Votre cv " + cv.getNom() + " a été rejeté", NotifStatus.ALERT),
        cv.getEtudiant().getId());
    return Optional.of(cvRepository.save(cv));
  }

  public Optional<CV> getCVById(int id) {
    return cvRepository.findById(id);
  }

  public List<CV> getAllCVs() {
    List<CV> listAllCV =
        cvRepository.findAll(Sort.by(Sort.Order.asc("status"), Sort.Order.desc("dateSoumission")));
    return getListForCurrentSession(listAllCV);
  }

  public List<CV> getAllCVsAllSession() {
    return cvRepository.findAll(
        Sort.by(Sort.Order.asc("status"), Sort.Order.desc("dateSoumission")));
  }

  public List<CV> getCVPendingEtRejected() {
    List<CV> listPending = cvRepository.findCVByStatus(Status.PENDING);
    List<CV> listRejected = cvRepository.findCVByStatus(Status.REJECTED);
    listPending.addAll(listRejected);

    return listPending;
  }

  @Override
  public List<CV> getListForCurrentSession(List<CV> listCV) {
    List<CV> listCVCurrentSession = new ArrayList<>();
    for (CV cv : listCV) {
      if (cv.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession())) {
        listCVCurrentSession.add(cv);
      }
    }
    return listCVCurrentSession;
  }
}
