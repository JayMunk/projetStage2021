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
    Optional<CV> checkCV = cvRepository.findById(cv.getId());
    Optional<CV> optionalCV = Optional.of(cvRepository.save(cv));
    setCVOnlyDefaultCV(optionalCV.get());
    if (optionalCV.isPresent()) {
      emailService.sendGestionnaireEmailCVAjouter();
      if(checkCV.isEmpty())
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

  public void setCVOnlyDefaultCV(CV cv){
    List<CV> listCVEtudiant = getAllCVEtudiant(cv.getEtudiant().getId());
    for(CV cvEtudiant : listCVEtudiant){
      if(cvEtudiant.getId() != cv.getId()) {
        cvEtudiant.setDefaultCV(false);
        cvRepository.save(cvEtudiant);
      }else{
        cv.setDefaultCV(true);
        cvRepository.save(cv);
      }
    }
  }

  public List<CV> getAllCVEtudiant(int id) {
    List<CV> listCVEtudiantCurrentSession = cvRepository.findCVByEtudiantId(id);
    return getListForCurrentSession(listCVEtudiantCurrentSession);
  }

  public void deleteCV(int id) {
    cvRepository.deleteById(id);
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
    List<CV> both = new ArrayList<>();
    both.addAll(listPending);
    both.addAll(listRejected);

    return getListForCurrentSession(both);
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
