package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Superviseur;
import com.group1.stagesWs.model.User;
import com.group1.stagesWs.service.UserService;
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
@RequestMapping("/user")
public class UserController {

  Logger logger = LoggerFactory.getLogger(UserController.class);

  private final UserService service;

  public UserController(UserService service) {
    this.service = service;
  }

  @PostMapping(path = "/etudiant")
  public ResponseEntity<Etudiant> createEtudiant(@RequestBody Etudiant etudiant) {
    logger.info("post - createEtudiant " + etudiant);
    return service
        .addEtudiant(etudiant)
        .map(etudiant1 -> ResponseEntity.status(HttpStatus.CREATED).body(etudiant1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  // login
  @GetMapping("/{email}/{password}")
  public ResponseEntity<User> login(
      @PathVariable("email") String email, @PathVariable("password") String password) {
    return service
        .login(email, password)
        .map(etudiant1 -> ResponseEntity.status(HttpStatus.OK).body(etudiant1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  @GetMapping("/{email}")
  public ResponseEntity<User> findUserByEmail(@PathVariable("email") String email) {
    return service
        .findUserByCourriel(email)
        .map(user1 -> ResponseEntity.status(HttpStatus.OK).body(user1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  /*
  IF ETUDIANT HAS CONTRAT THEN ACCES CONTRAT AND RETURN MONITEUR
      @GetMapping("/moniteur/{id}")
      public ResponseEntity<User> findMoniteurByEtudiantId(@PathVariable("id") int id) {
          return service.findMoniteurByEtudiantId(id)
                  .map(moniteur1 -> ResponseEntity.status(HttpStatus.OK).body(moniteur1))
                  .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
      }
  */

  // Create Moniteur
  @PostMapping(path = "/moniteur")
  public ResponseEntity<Moniteur> addMoniteur(@RequestBody Moniteur moniteur) {
    return service
        .addMoniteur(moniteur)
        .map(moniteur1 -> ResponseEntity.status(HttpStatus.CREATED).body(moniteur1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  @PostMapping("/superviseur")
  public ResponseEntity<Superviseur> addSuperviseur(@RequestBody Superviseur superviseur) {
    return service
        .addSuperviseur(superviseur)
        .map(superviseur1 -> ResponseEntity.status(HttpStatus.CREATED).body(superviseur1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  @GetMapping(path = "/superviseurs")
  public ResponseEntity<List<Superviseur>> getAllSuperviseurs() {
    return new ResponseEntity<>(service.getAllSuperviseurs(), HttpStatus.OK);
  }

  @GetMapping(path = "/moniteurs")
  public ResponseEntity<List<Moniteur>> getAllMoniteurs() {
    return new ResponseEntity<>(service.getAllMoniteurs(), HttpStatus.OK);
  }

  @GetMapping(path = "/moniteurs/allSession")
  public ResponseEntity<List<Moniteur>> getAllMoniteursAllSession() {
    return new ResponseEntity<>(service.getAllMoniteursAllSession(), HttpStatus.OK);
  }

  @GetMapping(path = "/etudiants")
  public ResponseEntity<List<Etudiant>> getAllEtudiants() {
    return new ResponseEntity<>(service.getAllEtudiants(), HttpStatus.OK);
  }

  //    @GetMapping(path = "/superviseur/{idSuperviseur}/etudiants")
  //    public ResponseEntity<List<Etudiant>>
  // getAllEtudiantsForSuperviseur(@PathVariable("idSuperviseur") int idSuperviseur) {
  //        logger.info("get - getAllEtudiantsForSuperviseur " + idSuperviseur);
  //        return new ResponseEntity<>(service.getAllEtudiantsForSuperviseur(idSuperviseur),
  // HttpStatus.OK);
  //    }

  @GetMapping(path = "/etudiants/allSession")
  public ResponseEntity<List<Etudiant>> getAllEtudiantsAllSession() {
    return new ResponseEntity<>(service.getAllEtudiantsAllSession(), HttpStatus.OK);
  }

  @GetMapping(path = "/superviseurs/allSession")
  public ResponseEntity<List<Superviseur>> getAllSuperviseursAllSession() {
    return new ResponseEntity<>(service.getAllSuperviseursAllSession(), HttpStatus.OK);
  }

  @GetMapping(path = "/etudiants/nosuperviseur")
  public ResponseEntity<List<Etudiant>> getAllEtudiantsWithoutSuperviseur() {
    return new ResponseEntity<>(service.getAllEtudiantsWithoutSuperviseur(), HttpStatus.OK);
  }

  @PostMapping(path = "/superviseur/{superviseurId}/etudiants")
  public ResponseEntity<Superviseur> saveListeEtudiantsSuperviseur(
      @RequestBody List<Etudiant> listeEtudiants, @PathVariable int superviseurId) {
    return service
        .addListeEtudiantSuperviseur(superviseurId, listeEtudiants)
        .map(superviseur1 -> ResponseEntity.status(HttpStatus.OK).body(superviseur1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  @GetMapping(path = "/superviseur/etudiants/{idSuperviseur}")
  public ResponseEntity<List<Etudiant>> getAllEtudiantBySuperviseur(
      @PathVariable int idSuperviseur) {
    return new ResponseEntity<>(service.getAllEtudiantsBySuperviseur(idSuperviseur), HttpStatus.OK);
  }

  @GetMapping(path = "/gestionnaires")
  public ResponseEntity<List<Gestionnaire>> getGestionnaire() {
    return new ResponseEntity<>(service.getAllGestionnaires(), HttpStatus.OK);
  }

  @GetMapping(path = "/etudiant/{id}")
  public ResponseEntity<Etudiant> getEtudiant(@PathVariable("id") int id) {
    return new ResponseEntity<>(service.getEtudiant(id), HttpStatus.OK);
  }

  @GetMapping(path = "/moniteur/{id}")
  public ResponseEntity<Moniteur> getMoniteur(@PathVariable("id") int id) {
    return new ResponseEntity<>(service.getMoniteur(id), HttpStatus.OK);
  }
}
