package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.model.Contrat;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.repositories.ContratRepository;
import com.group1.stagesWs.repositories.EtudiantRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ContratService extends SessionManager<Contrat> {

  private final ContratRepository contratRepository;
  private final EtudiantRepository etudiantRepository;

  private final EvaluationService evaluationService;

  public ContratService(
      ContratRepository contratRepository,
      EtudiantRepository etudiantRepository,
      EvaluationService evaluationService) {
    this.contratRepository = contratRepository;
    this.etudiantRepository = etudiantRepository;
    this.evaluationService = evaluationService;
  }

  public Optional<Contrat> saveContrat(Contrat contrat) {
    return Optional.of(contratRepository.save(contrat));
  }

  public List<Contrat> getAllMoniteurContrats(String moniteurCourriel) {
    return getListForCurrentSession(
        contratRepository.findAllByMoniteurCourrielIgnoreCase(moniteurCourriel));
  }

  public List<Contrat> getAllSuperviseurEtudiantContrats(String superviseurCourriel) {
    return getListForCurrentSession(
        contratRepository.findAllByEtudiantSuperviseurCourrielIgnoreCase(superviseurCourriel));
  }

  public List<Contrat> getMoniteurContratsToEvaluate(String moniteurCourriel) {
    List<Contrat> alreadyEvaluated =
        evaluationService.getAllCurrentEtudiantEvals().stream()
            .map(EvaluationEtudiant::getContrat)
            .collect(Collectors.toList());
    return getListForCurrentSession(
        contratRepository.findAllByMoniteurCourrielIgnoreCase(moniteurCourriel).stream()
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
            .filter(contrat -> !alreadyEvaluated.contains(contrat))
            .collect(Collectors.toList()));
  }

  @Override
  public List<Contrat> getListForCurrentSession(List<Contrat> listContrat) {
    return listContrat.stream()
        .filter(
            contrat -> contrat.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession()))
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
    return contratRepository.findContratByEtudiant(etudiant);
  }
}
