package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.model.Whitelist;
import com.group1.stagesWs.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StageController {

    @Autowired
    private StageService service;

    @GetMapping(path = "/stage/offres")
    public ResponseEntity<List<Offre>> getAllOffres() {
        return new ResponseEntity<>(service.getAllOffres(), HttpStatus.OK);
    }

    @GetMapping(path = "/stage/offres/{courriel}")
    public ResponseEntity<List<Offre>> getEtudiantOffres(@PathVariable String courriel) {
        return new ResponseEntity<>(service.getEtudiantOffres(courriel), HttpStatus.OK);
    }

    @PostMapping(path = "/stage/offre")
    public ResponseEntity<Offre> saveOffre(@RequestBody Offre offre) {
        return service.saveOffre(offre)
                .map(offre1 -> ResponseEntity.status(HttpStatus.OK).body(offre1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping(path = "/stage/whitelist")
    public ResponseEntity<Whitelist> saveWhitelist(@RequestBody Whitelist whitelist) {
        return service.saveWhitelist(whitelist)
                .map(whitelist1 -> ResponseEntity.status(HttpStatus.OK).body(whitelist1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
