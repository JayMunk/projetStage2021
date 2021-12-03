package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.Entrevue;
import com.group1.stagesWs.service.EntrevueService;
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
@RequestMapping("/entrevue")
public class EntrevueController {

  private final EntrevueService entrevueService;

  @PostMapping("")
  public ResponseEntity<Entrevue> saveEntrevue(@RequestBody Entrevue entrevue) {
    return entrevueService
        .saveEntrevue(entrevue)
        .map(entrevue1 -> ResponseEntity.status(HttpStatus.CREATED).body(entrevue1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  public EntrevueController(EntrevueService entrevueService) {
    this.entrevueService = entrevueService;
  }

  @GetMapping(path = "/etudiant/{id}")
  public ResponseEntity<List<Entrevue>> getAllEntrevuesByEtudiant(@PathVariable("id") int id) {
    return new ResponseEntity<>(entrevueService.getAllEntrevueEtudiant(id), HttpStatus.OK);
  }

  @GetMapping(path = "/moniteur/{id}")
  public ResponseEntity<List<Entrevue>> getAllEntrevuesByMoniteur(@PathVariable("id") int id) {
    return new ResponseEntity<>(entrevueService.getAllEntrevueMoniteur(id), HttpStatus.OK);
  }

  @GetMapping(path = "")
  public ResponseEntity<List<Entrevue>> getAllEntrevuesSession() {
    return new ResponseEntity<>(entrevueService.getAllEntrevuesSession(),HttpStatus.OK);
  }
}
