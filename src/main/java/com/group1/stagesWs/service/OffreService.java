package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.model.*;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.MoniteurRepository;
import com.group1.stagesWs.repositories.OffreRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class OffreService extends SessionManager<Offre> {

  private final OffreRepository offreRepository;
  private final EtudiantRepository etudiantRepository;
  private final MoniteurRepository moniteurRepository;
  private final UserService userService;
  private final NotificationService notificationService;

  public OffreService(
      OffreRepository offreRepository,
      EtudiantRepository etudiantRepository,
      MoniteurRepository moniteurRepository,
      UserService userService,
      NotificationService notificationService) {
    this.offreRepository = offreRepository;
    this.etudiantRepository = etudiantRepository;
    this.moniteurRepository = moniteurRepository;
    this.userService = userService;
    this.notificationService = notificationService;
  }

  private void sendNotificationListEtudiantWhitelist(Offre offre){
    if(offre.isValid()) {
      Set<Etudiant> etudiants = offre.getWhitelist();
      for (Etudiant etudiant : etudiants) {
        notificationService.saveNotificationEtudiant(
            new Notification("Il y a une nouvelle offre qui vous êtes disponible.\n"
                + " L'offre est " + offre.getTitre() + " de l'entreprise " + offre.getEntreprise(),
                NotifStatus.ALERT), etudiant.getId());
      }
    }
  }

  public List<Offre> getAllOffres() {
    List<Offre> listAllOffres = offreRepository.findAll();
    return getListForCurrentSession(listAllOffres);
  }

  public List<Offre> getAllOffresAllSession() {
    return offreRepository.findAll();
  }

  public List<Offre> getEtudiantOffres(String etudiantEmail) {
    Etudiant etudiant = etudiantRepository.findEtudiantByCourrielIgnoreCase(etudiantEmail);
    return getListForCurrentSession(offreRepository.findAllByWhitelistContainsAndIsValidTrue(etudiant));
  }

  public List<Offre> getMoniteurOffres(String email) {
    Moniteur moniteur = moniteurRepository.findMoniteurByCourrielIgnoreCase(email);
    return getListForCurrentSession(offreRepository.findAllByMoniteur(moniteur));
  }

  public Optional<Offre> addOffre(Offre offre, String email) {
    var userOptional = userService.findUserByCourriel(email);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      if (user instanceof Moniteur) {
        offre.setMoniteur((Moniteur) user);
      } else if (user instanceof Gestionnaire) {
        offre.setGestionnaire((Gestionnaire) user);
      }
    }
    sendNotificationListEtudiantWhitelist(offre);
    return Optional.of(offreRepository.save(offre));
  }

  public Optional<Offre> applyForOffre(int id, String email) {
    Optional<Offre> offreOptional = offreRepository.findById(id);
    if (offreOptional.isEmpty()) {
      return offreOptional;
    }

    Optional<Etudiant> etudiantOptional =
        Optional.ofNullable(etudiantRepository.findEtudiantByCourrielIgnoreCase(email));
    if (etudiantOptional.isEmpty()) {
      return Optional.empty();
    }

    Offre offre = offreOptional.get();
    Etudiant etudiant = etudiantOptional.get();

    Set<Etudiant> applicants = offre.getApplicants();
    applicants.add(etudiant);
    offre.setApplicants(applicants);

    if(offre.getMoniteur() != null) {
      notificationService.saveNotificationMoniteur(
          new Notification(
              "L'etudiant "
                  + etudiant.getPrenom()
                  + " "
                  + etudiant.getNom()
                  + " a applique a votre offre: "
                  + offre.getTitre(),
              NotifStatus.ALERT),
          offre.getMoniteur().getId());
    }
    return Optional.of(offreRepository.save(offre));
  }

  public List<Offre> getOffreValide() {
    List<Offre> listOffre = offreRepository.findAllByIsValidTrue();
    return getListForCurrentSession(listOffre);
  }

  public List<Offre> getOffreInvalide() {
    List<Offre> listOffre = offreRepository.findAllByIsValidFalse();
    return getListForCurrentSession(listOffre);
  }

  @Override
  public List<Offre> getListForCurrentSession(List<Offre> listOffre) {
    List<Offre> listOffreCurrentSession = new ArrayList<>();
    for (Offre offre : listOffre) {
      if (offre.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession())) {
        listOffreCurrentSession.add(offre);
      }
    }
    return listOffreCurrentSession;
  }
}
