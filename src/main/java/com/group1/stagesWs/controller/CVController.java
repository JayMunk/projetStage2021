package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.*;
import com.group1.stagesWs.service.CVService;
import com.group1.stagesWs.service.EmailService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cv")
public class CVController {

    private final CVService cvService;
    private final EmailService emailService;

    public CVController(CVService cvService, EmailService emailService) {
        this.cvService = cvService;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<CV> saveCV(@RequestBody CV cv) {
        Optional<CV> cvOptional = cvService.saveCV(cv);
        if (cvOptional.isPresent()) {
            emailService.sendGestionnaireEmailCVAjouter();
            return ResponseEntity.ok(cvOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping(path = "/etudiant/{id}")
    public ResponseEntity<List<CV>> getAllCVbyEtudiant(@PathVariable("id") int id) {
        return new ResponseEntity<>(cvService.getAllCVEtudiant(id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<Boolean> deleteCV(@PathVariable int id) {
        return new ResponseEntity<>(cvService.deleteCV(id), HttpStatus.OK);
    }

    @GetMapping(path = "/pdf/{id}")
    public void generatePDF(@PathVariable("id") int id, HttpServletResponse response) {
        try {
            response.setContentType("application/pdf");
            Optional<CV> cv = cvService.getCVById(id);
            InputStream inputStream = new ByteArrayInputStream(
                    cvService.generateCVPDF(cv.get().getData(), cv.get().getNom()));
            IOUtils.copy(inputStream, response.getOutputStream());
            ResponseEntity.status(HttpStatus.OK).build();
        } catch (IOException e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/accept")
    public ResponseEntity<CV> acceptCV(@RequestBody CV cv) {
        Optional<CV> cvOptional = cvService.acceptCV(cv);
        if (cvOptional.isPresent()) {
            emailService.sendEtudiantEmailCVAccepted(cv);
            return ResponseEntity.ok(cvOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/reject")
    public ResponseEntity<CV> rejectCV(@RequestBody CV cv) {
        Optional<CV> cvOptional = cvService.rejectCV(cv);
        if (cvOptional.isPresent()) {
            emailService.sendEtudiantEmailCVRejected(cv);
            return ResponseEntity.ok(cvOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<CV>> getAllCVs() {
        return new ResponseEntity<List<CV>>(cvService.getAllCVs(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CV> getCV(@PathVariable int id) {
        return cvService.getCVById(id)
                .map(cv -> ResponseEntity.status(HttpStatus.OK).body(cv))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/allSession")
    public ResponseEntity<List<CV>> getAllCVsAllSession() {
        return new ResponseEntity<List<CV>>(cvService.getAllCVsAllSession(), HttpStatus.OK);
    }
}