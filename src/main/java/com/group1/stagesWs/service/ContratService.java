package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Contrat;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.repositories.ContratRepository;
import com.group1.stagesWs.repositories.EtudiantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContratService extends SessionManager<Contrat> {

  private final ContratRepository contratRepository;
  private final EtudiantRepository etudiantRepository;
  private final EvaluationService evaluationService;

  private final NotificationService notificationService;

  public ContratService(
      ContratRepository contratRepository,
      EtudiantRepository etudiantRepository,
      EvaluationService evaluationService,
      NotificationService notificationService) {
    this.contratRepository = contratRepository;
    this.etudiantRepository = etudiantRepository;
    this.evaluationService = evaluationService;
    this.notificationService = notificationService;
  }

  public Optional<Contrat> saveContrat(Contrat contrat) {
    Optional<Contrat> checkContrat = contratRepository.findById(contrat.getId());
    if (checkContrat.isEmpty()) {
      notificationService.saveNotificationEtudiant(new Notification(
              "Vous devez signez le contrat de stage de l'offre " + contrat.getOffre().getTitre()
                  + " de l'entreprise " + contrat.getOffre().getEntreprise() + " le plus tôt possible.",
              NotifStatus.URGENT),
          contrat.getEtudiant().getId());

      notificationService.saveNotificationMoniteur(new Notification(
              "Vous devez signez le contrat de " + contrat.getEtudiant().getPrenom() + " " + contrat
                  .getEtudiant().getNom() + " de votre offre " + contrat.getOffre().getTitre()
                  + " le plus tôt possible.",
              NotifStatus.URGENT),
          contrat.getMoniteur().getId());

      notificationService.saveNotificationGestionnaire(new Notification(
          "Vous devez signez le contrat de " + contrat.getEtudiant().getPrenom() + " " + contrat
              .getEtudiant().getNom() + " de l'offre " + contrat.getOffre().getTitre()
              + " avec l'entreprise " + contrat.getOffre().getEntreprise() +
              " le plus tôt possible.",
          NotifStatus.URGENT));
    }
    return Optional.of(contratRepository.save(contrat));
  }

  public List<Contrat> getMoniteurContratsToEvaluate(String moniteurCourriel) {
    List<Contrat> alreadyEvaluated =
        evaluationService.getAllCurrentEtudiantEvals().stream()
            .map(EvaluationEtudiant::getContrat)
            .collect(Collectors.toList());
    return getListForCurrentSession(
        contratRepository.findAllByMoniteurCourrielIgnoreCase(moniteurCourriel).stream()
            .filter(contrat -> contrat.getSession()
                .equals(SessionManager.CURRENT_SESSION.getNomSession()))
            .filter(contrat -> !alreadyEvaluated.contains(contrat))
            .collect(Collectors.toList()));
  }

  public List<Contrat> getSuperviseurContratsToEvaluate(String superviseurCourriel) {
    List<Contrat> alreadyEvaluated =
        evaluationService.getAllCurrentEntrepriseEvals().stream()
            .map(EvaluationEntreprise::getContrat)
            .collect(Collectors.toList());
    return getListForCurrentSession(
        contratRepository
            .findAllByEtudiantSuperviseurCourrielIgnoreCase(superviseurCourriel)
            .stream()
            .filter(contrat -> contrat.getSession()
                .equals(SessionManager.CURRENT_SESSION.getNomSession()))
            .filter(contrat -> !alreadyEvaluated.contains(contrat))
            .collect(Collectors.toList()));
  }

  @Override
  public List<Contrat> getListForCurrentSession(List<Contrat> listContrat) {
    return listContrat.stream()
        .filter(
            contrat -> contrat.getSession().equals(CURRENT_SESSION.getNomSession()))
        .collect(Collectors.toList());
  }

  public List<Contrat> getAllContrats() {
    List<Contrat> listAllContrats = contratRepository.findAll();
    return getListForCurrentSession(listAllContrats);
  }

  public List<Contrat> getContratsByMoniteurEmail(String moniteurEmail) {
    List<Contrat> listAllContrats =
        contratRepository.findAllByMoniteurCourrielIgnoreCase(moniteurEmail);
    return getListForCurrentSession(listAllContrats);
  }

  public Contrat getContratsByEtudiantEmail(String etudiantEmail) {
    Etudiant etudiant = etudiantRepository.findEtudiantByCourrielIgnoreCase(etudiantEmail);
    Contrat contrat = contratRepository.findContratByEtudiant(etudiant);
    if (contrat != null) {
      if (contrat.getSession().equals(CURRENT_SESSION.getNomSession())) {
        return contrat;
      }
    }
    return null;
  }
}
