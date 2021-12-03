package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.service.OffreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/offres")
public class OffreController {

  private final OffreService service;

  public OffreController(OffreService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Offre>> getAllOffres() {
    return ResponseEntity.ok(service.getAllOffres());
  }

  @GetMapping("/allSession")
  public ResponseEntity<List<Offre>> getAllOffresAllSession() {
    return ResponseEntity.ok(service.getAllOffresAllSession());
  }

  @GetMapping("/etudiant/{email}")
  public ResponseEntity<List<Offre>> getEtudiantOffres(@PathVariable String email) {
    return ResponseEntity.ok(service.getEtudiantOffres(email));
  }

  @GetMapping("/moniteur/{email}")
  public ResponseEntity<List<Offre>> getMoniteurOffres(@PathVariable String email) {
    return ResponseEntity.ok(service.getMoniteurOffres(email));
  }

  @PostMapping("/{authorEmail}")
  public ResponseEntity<Offre> addOffre(
      @RequestBody Offre offre, @PathVariable String authorEmail) {
    return service
        .addOffre(offre, authorEmail)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  @PostMapping("/{id}/apply")
  public ResponseEntity<Offre> applyForOffre(@PathVariable int id, @RequestBody String email) {
    return service
        .applyForOffre(id, email)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.internalServerError().build());
  }
}
