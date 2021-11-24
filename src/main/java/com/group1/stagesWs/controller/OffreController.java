package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.service.OffreService;
import java.util.List;
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

  // Create new offre, include author's email in request path
  @PostMapping("/{authorEmail}")
  public ResponseEntity<Offre> addOffre(
      @RequestBody Offre offre, @PathVariable String authorEmail) {
    return service
        .addOffre(offre, authorEmail)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  //    @PutMapping("/{id}")
  //    public ResponseEntity<Offre> updateOffre(@PathVariable int id, @RequestBody Offre offre) {
  //        return service.updateOffre(id, offre)
  //                .map(ResponseEntity::ok)
  //                .orElse(ResponseEntity.notFound().build());
  //    }

  @PostMapping("/{id}/apply")
  public ResponseEntity<Offre> applyForOffre(@PathVariable int id, @RequestBody String email) {
    return service
        .applyForOffre(id, email)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.internalServerError().build());
  }
}
