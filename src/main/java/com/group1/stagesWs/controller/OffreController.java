package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.*;
import com.group1.stagesWs.service.OffreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OffreController {

    Logger logger = LoggerFactory.getLogger(OffreController.class);

    @Autowired
    private OffreService service;

    @PostMapping(path = "/stage/offre")
    public ResponseEntity<Offre> createOffre(@RequestBody Offre offre) {
        logger.info("post - createTodo " + offre);
        return service.addOffre(offre)
                .map(offre1 -> ResponseEntity.status(HttpStatus.CREATED).body(offre1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
