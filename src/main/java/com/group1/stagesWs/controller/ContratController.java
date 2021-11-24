package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.Contrat;
import com.group1.stagesWs.service.ContratService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/contrats")
public class ContratController {

  Logger logger = LoggerFactory.getLogger(ContratController.class);

  private final ContratService contratService;

  public ContratController(ContratService contratService) {
    this.contratService = contratService;
  }

  @GetMapping
  public ResponseEntity<List<Contrat>> getAllContrats() {
    return ResponseEntity.ok(contratService.getAllContrats());
  }

  @GetMapping("/moniteur/{moniteurEmail}")
  public ResponseEntity<List<Contrat>> getContratsByMoniteurEmail(
      @PathVariable("moniteurEmail") String moniteurEmail) {
    return ResponseEntity.ok(contratService.getContratsByMoniteurEmail(moniteurEmail));
  }

  @GetMapping("/etudiant/{etudiantEmail}")
  public ResponseEntity<Contrat> getContratsByEtudiantEmail(
      @PathVariable("etudiantEmail") String etudiantEmail) {
    logger.info("get - getContratsByEtudiantEmail " + etudiantEmail);
    return ResponseEntity.ok(contratService.getContratsByEtudiantEmail(etudiantEmail));
  }

  @PostMapping
  public ResponseEntity<Contrat> saveContrat(@RequestBody Contrat contrat) {
    logger.info("post - createContrat " + contrat);
    return contratService
        .saveContrat(contrat)
        .map(contrat1 -> ResponseEntity.status(HttpStatus.CREATED).body(contrat1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  @GetMapping("/moniteur/courriel/{courriel}")
  public ResponseEntity<List<Contrat>> getAllMoniteurContrats(@PathVariable String courriel) {
    return ResponseEntity.ok(contratService.getAllMoniteurContrats(courriel));
  }

  @GetMapping("/superviseur/courriel/{courriel}")
  public ResponseEntity<List<Contrat>> getAllSuperviseurEtudiantContrats(
      @PathVariable String courriel) {
    return ResponseEntity.ok(contratService.getAllSuperviseurEtudiantContrats(courriel));
  }

  @GetMapping("/moniteur/courriel/{courriel}/toEvaluate")
  public ResponseEntity<List<Contrat>> getMoniteurContratsToEvaluate(
      @PathVariable String courriel) {
    return ResponseEntity.ok(contratService.getMoniteurContratsToEvaluate(courriel));
  }

  @GetMapping("/superviseur/courriel/{courriel}/toEvaluate")
  public ResponseEntity<List<Contrat>> getSuperviseurContratsToEvaluate(
      @PathVariable String courriel) {
    return ResponseEntity.ok(contratService.getSuperviseurContratsToEvaluate(courriel));
  }
}
