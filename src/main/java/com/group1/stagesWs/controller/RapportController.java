package com.group1.stagesWs.controller;

import com.group1.stagesWs.service.RapportService;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/rapport")
public class RapportController {

  private final RapportService rapportService;

  public RapportController(RapportService rapportService) throws Exception {
    this.rapportService = rapportService;
  }

  @GetMapping(path = "/pdf/offresValide")
  public void getOffresValidPDF(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream = new ByteArrayInputStream(rapportService.getOffresValidPDF());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/offresInvalid")
  public void getOffresInvalidPDF(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream = new ByteArrayInputStream(rapportService.getOffresInvalidPDF());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudiantsInscrient")
  public void getEtudiantsInscrientPDF(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream = new ByteArrayInputStream(rapportService.getEtudiantsInscrientPDF());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/cvPendingRejected")
  public void getCvPendingEtRejectedPDF(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream =
          new ByteArrayInputStream(rapportService.getCvPendingEtRejectedPDF());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudiantsSansCv")
  public void getEtudiantsNoCv(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream = new ByteArrayInputStream(rapportService.getEtudiantsNoCv());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudiantsSansEntrevue")
  public void getEtudiantsSansEntrevue(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream = new ByteArrayInputStream(rapportService.getEtudiantsSansEntrevue());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudiantsAttenteEntrevue")
  public void getEtudiantEnAttenteEntrevue(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream =
          new ByteArrayInputStream(rapportService.getEtudiantEnAttenteEntrevue());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudianntsAttenteReponse")
  public void getEtudiantEnAttenteReponse(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream =
          new ByteArrayInputStream(rapportService.getEtudiantEnAttenteReponse());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudiantsTrouveStage")
  public void getEtudiantTrouveStage(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream = new ByteArrayInputStream(rapportService.getEtudiantTrouveStage());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudiantsNoEvaluationMoniteur")
  public void getEtudiantsNoEvaluationMoniteur(HttpServletResponse response) throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream =
          new ByteArrayInputStream(rapportService.getEtudiantsNoEvaluationMoniteur());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping(path = "/pdf/etudiantsNoEntrepriseEvalueSuperviseur")
  public void getEtudiantsNoEntrepriseEvalueSuperviseur(HttpServletResponse response)
      throws Exception {
    try {
      response.setContentType("application/pdf");
      InputStream inputStream =
          new ByteArrayInputStream(rapportService.getEtudiantsNoEntrepriseEvalueSuperviseur());
      IOUtils.copy(inputStream, response.getOutputStream());
      ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
