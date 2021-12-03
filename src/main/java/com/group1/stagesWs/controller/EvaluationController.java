package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.service.EvaluationService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/evaluations")
public class EvaluationController {

  private final EvaluationService service;

  public EvaluationController(EvaluationService service) {
    this.service = service;
  }

  @PostMapping("/entreprise")
  public ResponseEntity<EvaluationEntreprise> saveEvaluationEntreprise(
      @RequestBody EvaluationEntreprise evaluation) {
    return ResponseEntity.ok(service.save(evaluation));
  }

  @PostMapping("/etudiant")
  public ResponseEntity<EvaluationEtudiant> saveEvaluationEtudiant(
      @RequestBody EvaluationEtudiant evaluation) {
    return ResponseEntity.ok(service.save(evaluation));
  }

  @GetMapping("/entreprise")
  public ResponseEntity<List<EvaluationEntreprise>> getAllCurrentEvaluationsEntreprise() {
    return ResponseEntity.ok(service.getAllCurrentEntrepriseEvals());
  }

  @GetMapping("/etudiant")
  public ResponseEntity<List<EvaluationEtudiant>> getAllCurrentEvaluationsEtudiant() {
    return ResponseEntity.ok(service.getAllCurrentEtudiantEvals());
  }

  @GetMapping("/entreprise/allSessions")
  public ResponseEntity<List<EvaluationEntreprise>> getAllEvaluationsEntreprise() {
    return ResponseEntity.ok(service.getAllEntrepriseEvals());
  }

  @GetMapping("/etudiant/allSessions")
  public ResponseEntity<List<EvaluationEtudiant>> getAllEvaluationsEtudiant() {
    return ResponseEntity.ok(service.getAllEtudiantEvals());
  }

  @GetMapping("/entreprise/{id}")
  public ResponseEntity<EvaluationEntreprise> getEvaluationEntreprise(@PathVariable int id) {
    return service
        .getEntrepriseEval(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/etudiant/{id}")
  public ResponseEntity<EvaluationEtudiant> getEvaluationEtudiant(@PathVariable int id) {
    return service
        .getEtudiantEval(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
