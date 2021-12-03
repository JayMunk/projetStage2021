package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.repositories.EvaluationEntrepriseRepository;
import com.group1.stagesWs.repositories.EvaluationEtudiantRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class EvaluationService{

  private final EvaluationEntrepriseRepository entrepriseEvalRepo;
  private final EvaluationEtudiantRepository etudiantEvalRepo;

  public EvaluationService(
      EvaluationEntrepriseRepository entrepriseEvalRepo,
      EvaluationEtudiantRepository etudiantEvalRepo) {
    this.entrepriseEvalRepo = entrepriseEvalRepo;
    this.etudiantEvalRepo = etudiantEvalRepo;
  }

  public EvaluationEntreprise save(EvaluationEntreprise evaluation) {
    return entrepriseEvalRepo.save(evaluation);
  }

  public EvaluationEtudiant save(EvaluationEtudiant evaluation) {
    return etudiantEvalRepo.save(evaluation);
  }

  public List<EvaluationEntreprise> getAllCurrentEntrepriseEvals() {
    return entrepriseEvalRepo.findAllBySession(SessionManager.CURRENT_SESSION.getNomSession());
  }

  public List<EvaluationEtudiant> getAllCurrentEtudiantEvals() {
    return etudiantEvalRepo.findAllBySession(SessionManager.CURRENT_SESSION.getNomSession());
  }

  public List<EvaluationEntreprise> getAllEntrepriseEvals() {
    return entrepriseEvalRepo.findAll().stream()
        .filter(evaluationEntreprise -> evaluationEntreprise.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession()))
        .collect(Collectors.toList());
  }

  public List<EvaluationEtudiant> getAllEtudiantEvals() {
    return etudiantEvalRepo.findAll().stream()
        .filter(evaluationEntreprise -> evaluationEntreprise.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession()))
        .collect(Collectors.toList());
  }

  public Optional<EvaluationEntreprise> getEntrepriseEval(int id) {
    Optional<EvaluationEntreprise> evaluationEntreprise = entrepriseEvalRepo.findById(id);
    if(evaluationEntreprise.get().getSession().equals(SessionManager.CURRENT_SESSION.getNomSession())) {
      return evaluationEntreprise;
    }
    return Optional.empty();
  }

  public Optional<EvaluationEtudiant> getEtudiantEval(int id) {
    Optional<EvaluationEtudiant> evaluationEtudiant = etudiantEvalRepo.findById(id);
    if(evaluationEtudiant.get().getSession().equals(SessionManager.CURRENT_SESSION.getNomSession())){
      return evaluationEtudiant;
    }
    return Optional.empty();
  }
}
