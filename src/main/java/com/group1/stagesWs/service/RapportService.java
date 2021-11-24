package com.group1.stagesWs.service;

import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Contrat;
import com.group1.stagesWs.model.Entrevue;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.model.User;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class RapportService<T> {

  private final OffreService offreService;
  private final CVService cvService;
  private final UserService userService;
  private final EntrevueService entrevueService;
  private final EvaluationService evaluationService;

  public RapportService(
      OffreService offreService,
      CVService cvService,
      UserService userService,
      EntrevueService entrevueService,
      EvaluationService evaluationService) {
    this.offreService = offreService;
    this.cvService = cvService;
    this.userService = userService;
    this.entrevueService = entrevueService;
    this.evaluationService = evaluationService;
  }

  public <T> byte[] generatePDF(List<T> listGeneric, String titre) throws Exception {
    String filePath = "delete.pdf";
    PdfWriter writer = new PdfWriter(filePath);
    PdfDocument pdf = new PdfDocument(writer);
    Document document = new Document(pdf);

    Paragraph para = new Paragraph(titre).setFontSize(20f);

    document.add(para);

    Paragraph paraSize = new Paragraph("Nombre total : " + listGeneric.size()).setFontSize(14f);

    document.add(paraSize);

    Paragraph paraList = new Paragraph();

    for (int i = 0; i < listGeneric.size(); i++) {
      if (listGeneric.get(i) instanceof User) {
        User genericItemEtudiant = (User) listGeneric.get(i);
        String string =
            i + 1 + ". " + genericItemEtudiant.getPrenom() + " " + genericItemEtudiant.getNom();
        paraList.add(string + "\n");
      }
      if (listGeneric.get(i) instanceof Offre) {
        Offre genericItemOffre = (Offre) listGeneric.get(i);
        String string =
            i + 1 + ". " + genericItemOffre.getTitre() + " " + genericItemOffre.getDescription();
        paraList.add(string + "\n");
      }

      if (listGeneric.get(i) instanceof CV) {
        CV genericItemCV = (CV) listGeneric.get(i);
        String string =
            i
                + 1
                + ". "
                + genericItemCV.getEtudiant().getPrenom()
                + " "
                + genericItemCV.getEtudiant().getNom()
                + " "
                + genericItemCV.getStatus();
        paraList.add(string + "\n");
      }
    }

    document.add(paraList);
    document.close();

    File file = new File(filePath);
    byte[] bytes = FileUtils.readFileToByteArray(file);

    file.delete();
    return bytes;
  }

  public byte[] getOffresValidPDF() throws Exception {
    return generatePDF(offreService.getOffreValide(), "Liste des offres valides");
  }

  public byte[] getOffresInvalidPDF() throws Exception {
    return generatePDF(offreService.getOffreInvalide(), "Liste des offres invalide");
  }

  public byte[] getEtudiantsInscrientPDF() throws Exception {
    return generatePDF(userService.getAllEtudiants(), "Liste des étudiants inscrient");
  }

  public byte[] getCvPendingEtRejectedPDF() throws Exception {
    return generatePDF(cvService.getCVPendingEtRejected(), "Listes des cvs pending et rejected");
  }

  public byte[] getEtudiantsNoCv() throws Exception {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<CV> listCv = cvService.getAllCVs();
    Set<Etudiant> listEtudiantCv = new HashSet<>();

    for (CV cv : listCv) {
      listEtudiantCv.add(cv.getEtudiant());
    }
    listEtudiant.removeAll(listEtudiantCv);

    return generatePDF(listEtudiant, "List des étudiants n'ayant pas de cv");
  }

  public byte[] getEtudiantEnAttenteEntrevue() throws Exception {
    List<Entrevue> listEntrevue = entrevueService.getAllEntrevuesQuiArrive();
    List<Etudiant> listEtudiantNoEntrevue =
        listEntrevue.stream().map(Entrevue::getEtudiant).collect(Collectors.toList());
    return generatePDF(listEtudiantNoEntrevue, "List d'étudiants qui attendent pour leur entrevue");
  }

  public byte[] getEtudiantsSansEntrevue() throws Exception {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<Entrevue> listEntrevue = entrevueService.getAllEntrevues();
    Set<Etudiant> listEtudiantAvecEntrevue = new HashSet<>();

    for (Entrevue entrevue : listEntrevue) {
      listEtudiantAvecEntrevue.add(entrevue.getEtudiant());
    }
    listEtudiant.removeAll(listEtudiantAvecEntrevue);

    return generatePDF(listEtudiant, "List des étudiants n'ayant pas d'entrevue");
  }

  public byte[] getEtudiantEnAttenteReponse() throws Exception {
    List<Entrevue> listEntrevue = entrevueService.getAllEntrevuesPasse();
    List<Etudiant> listEtudiantAttenteReponse =
        listEntrevue.stream()
            .filter(entrevue -> entrevue.getStatus().equals(Status.PENDING))
            .map(Entrevue::getEtudiant)
            .collect(Collectors.toList());
    return generatePDF(
        listEtudiantAttenteReponse, "List d'étudiants qui attendent une reponse du moniteur");
  }

  public byte[] getEtudiantTrouveStage() throws Exception {
    List<Entrevue> listEntrevue = entrevueService.getEntrevuesAccepted();
    List<Etudiant> listEtudiantTrouveStage =
        listEntrevue.stream().map(Entrevue::getEtudiant).collect(Collectors.toList());
    return generatePDF(
        listEtudiantTrouveStage, "List d'étudiants qui ont été accepté pour un stage");
  }

  public byte[] getEtudiantsNoEvaluationMoniteur() throws Exception {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<Etudiant> listEtudiantEvaluer =
        evaluationService.getAllCurrentEtudiantEvals().stream()
            .map(EvaluationEtudiant::getContrat)
            .map(Contrat::getEtudiant)
            .collect(Collectors.toList());
    List<Etudiant> listStream =
        listEtudiant.stream()
            .filter(etudiant -> !listEtudiantEvaluer.contains(etudiant))
            .collect(Collectors.toList());
    return generatePDF(listStream, "List des étudiants n'ayant pas d'évalution du moniteur");
  }

  public byte[] getEtudiantsNoEntrepriseEvalueSuperviseur() throws Exception {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<Etudiant> listEtudiantEvaluer =
        evaluationService.getAllCurrentEntrepriseEvals().stream()
            .map(EvaluationEntreprise::getContrat)
            .map(Contrat::getEtudiant)
            .collect(Collectors.toList());
    List<Etudiant> listStream =
        listEtudiant.stream()
            .filter(etudiant -> !listEtudiantEvaluer.contains(etudiant))
            .collect(Collectors.toList());
    return generatePDF(
        listStream, "List des étudiants dont le superviseur n'as pas encore évalué l'entreprise");
  }
}
