package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.service.CVService;
import com.group1.stagesWs.service.EmailService;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    return cvService
        .saveCV(cv)
        .map(cv1 -> ResponseEntity.status(HttpStatus.CREATED).body(cv1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
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
      InputStream inputStream =
          new ByteArrayInputStream(cvService.generateCVPDF(cv.get().getData(), cv.get().getNom()));
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PostMapping("/accept")
  public ResponseEntity<CV> acceptCV(@RequestBody CV cv) {
    return cvService
        .acceptCV(cv)
        .map(cv1 -> ResponseEntity.status(HttpStatus.OK).body(cv1))
        .orElse(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  @PostMapping("/reject")
  public ResponseEntity<CV> rejectCV(@RequestBody CV cv) {
    return cvService
        .rejectCV(cv)
        .map(cv1 -> ResponseEntity.status(HttpStatus.OK).body(cv1))
        .orElse(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
  }

  @GetMapping
  public ResponseEntity<List<CV>> getAllCVs() {
    return new ResponseEntity<List<CV>>(cvService.getAllCVs(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<CV> getCV(@PathVariable int id) {
    return cvService
        .getCVById(id)
        .map(cv -> ResponseEntity.status(HttpStatus.OK).body(cv))
        .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @GetMapping("/allSession")
  public ResponseEntity<List<CV>> getAllCVsAllSession() {
    return new ResponseEntity<List<CV>>(cvService.getAllCVsAllSession(), HttpStatus.OK);
  }
}
