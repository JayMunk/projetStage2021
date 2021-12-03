package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.service.CVService;
import com.group1.stagesWs.service.OffreService;
import com.group1.stagesWs.service.RapportService;
import com.group1.stagesWs.service.UserService;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
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
  private final OffreService offreService;
  private final UserService userService;
  private final CVService cvService;

  public RapportController(RapportService rapportService,
      OffreService offreService, UserService userService,
      CVService cvService) throws Exception {
    this.rapportService = rapportService;
    this.offreService = offreService;
    this.userService = userService;
    this.cvService = cvService;
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

  @GetMapping(path = "/pdf/etudiantsAttenteReponse")
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

  @GetMapping(path= "/list/offresValide")
  public ResponseEntity<List<Offre>> getListOffresValide() {
    return new ResponseEntity(offreService.getOffreValide(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/offresInvalide")
  public ResponseEntity<List<Offre>> getListOffresInvalide() {
    return new ResponseEntity(offreService.getOffreInvalide(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsInscrient")
  public ResponseEntity<List<Etudiant>> getListEtudiantsInscrient() {
    return new ResponseEntity(userService.getAllEtudiants(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/cvPendingEtRejected")
  public ResponseEntity<List<CV>> getListCvPendingEtRejected() {
    return new ResponseEntity(cvService.getCVPendingEtRejected(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsPasDeCv")
  public ResponseEntity<List<Etudiant>> getListEtudiantsPasDeCv() {
    return new ResponseEntity(rapportService.getListEtudiantsPasCv(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsSansEntrevue")
  public ResponseEntity<List<Etudiant>> getListEtudiantSansEtrenvue() {
    return new ResponseEntity(rapportService.getListEtudiantSansEtrenvue(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsEnAttenteEntrevue")
  public ResponseEntity<List<Etudiant>> getListEtudiantEnAttenteEntrevue() {
    return new ResponseEntity(rapportService.getListEtudiantEnAttenteEntrevue(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsEnAttenteDeReponse")
  public ResponseEntity<List<Etudiant>> getListEtudiantEnAttenteDeReponse() {
    return new ResponseEntity(rapportService.getListEtudiantEnAttenteDeReponse(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsTrouveStage")
  public ResponseEntity<List<Etudiant>> getListEtudiantTrouveStage() {
    return new ResponseEntity(rapportService.getListEtudiantTrouveStage(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsPasEvaluationMoniteur")
  public ResponseEntity<List<Etudiant>> getListEtudiantPasEvaluationMoniteur() {
    return new ResponseEntity(rapportService.getListEtudiantPasEvaluationMoniteur(), HttpStatus.OK);
  }

  @GetMapping(path= "/list/etudiantsPasEntrepriseEvaluationSuerviseur")
  public ResponseEntity<List<Etudiant>> getEtudiantsPasEntreprisEvaluationSuperviseur() {
    return new ResponseEntity(rapportService.getEtudiantsPasEntreprisEvaluationSuperviseur(), HttpStatus.OK);
  }

}
