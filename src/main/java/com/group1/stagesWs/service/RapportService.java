package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Contrat;
import com.group1.stagesWs.model.Entrevue;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.model.Superviseur;
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
public class RapportService {

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
      if (listGeneric.get(i) instanceof Etudiant) {
        Etudiant genericItemEtudiant = (Etudiant) listGeneric.get(i);
        String string =
            i
                + 1 + ". "
                + " prénom: "
                + genericItemEtudiant.getPrenom()
                + " | "
                + "nom: "
                + genericItemEtudiant.getNom()
                + " | "
                + "courriel: "
                + genericItemEtudiant.getCourriel()
                + " | "
                + "matricule: "
                + genericItemEtudiant.getNumMatricule()
                + " | "
                + "date creation: "
                + genericItemEtudiant.getDateCreation()
                + "\n";
        paraList.add(string + "\n");
      }
      if (listGeneric.get(i) instanceof Offre) {
        Offre genericItemOffre = (Offre) listGeneric.get(i);
        String string =
            i
                + 1 + ". "
                + "titre: "
                + genericItemOffre.getTitre()
                + " | "
                + "date debut: "
                + genericItemOffre.getDateDebut()
                + " | "
                + "date fin: "
                + genericItemOffre.getDateFin()
                + " | "
                + "nombre total de semaines: "
                + genericItemOffre.getNbTotalSemaine()
                + "\n";

        paraList.add(string + "\n");
      }

      if (listGeneric.get(i) instanceof CV) {
        CV genericItemCV = (CV) listGeneric.get(i);
        String string =
                i
                + 1
                + "."
                + " prénom: "
                + genericItemCV.getEtudiant().getPrenom()
                + " | "
                + "nom: "
                + genericItemCV.getEtudiant().getNom()
                + " | "
                + "titre du cv: "
                + genericItemCV.getNom()
                + " | "
                + "statut: "
                + genericItemCV.getStatus()
                + "\n";
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
    return generatePDF(offreService.getOffreValide(), "Liste des offres valides"); //tester
  }

  public byte[] getOffresInvalidPDF() throws Exception {
    return generatePDF(offreService.getOffreInvalide(), "Liste des offres invalide"); //tester
  }

  public byte[] getEtudiantsInscrientPDF() throws Exception {
    return generatePDF(userService.getAllEtudiants(), "Liste des étudiants inscrient"); //tester
  }

  public byte[] getCvPendingEtRejectedPDF() throws Exception {
    return generatePDF(cvService.getCVPendingEtRejected(), "Listes des cvs pending et rejected");
  }

  public List<Etudiant> getListEtudiantsPasCv() {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<CV> listCv = cvService.getAllCVs();
    Set<Etudiant> listEtudiantCv = new HashSet<>();

    for (CV cv : listCv) {
      listEtudiantCv.add(cv.getEtudiant());
    }
    listEtudiant.removeAll(listEtudiantCv);
    return listEtudiant;
  }


  public byte[] getEtudiantsNoCv() throws Exception {

    return generatePDF(getListEtudiantsPasCv(), "List des étudiants n'ayant pas de cv");
  }

  public List<Etudiant> getListEtudiantEnAttenteEntrevue() {
    List<Entrevue> listEntrevue = entrevueService.getAllEntrevuesQuiArrive();
    return listEntrevue.stream()
        .filter(entrevue -> entrevue.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession()))
        .map(Entrevue::getEtudiant)
        .collect(Collectors.toList());
  }

  public byte[] getEtudiantEnAttenteEntrevue() throws Exception {
    return generatePDF(getListEtudiantEnAttenteEntrevue(),
        "List d'étudiants qui attendent pour leur entrevue");
  }

  public List<Etudiant> getListEtudiantSansEtrenvue() {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<Entrevue> listEntrevue = entrevueService.getAllEntrevues();
    Set<Etudiant> listEtudiantAvecEntrevue = listEntrevue.stream().map(Entrevue::getEtudiant).collect(Collectors.toSet());

    listEtudiant.removeAll(listEtudiantAvecEntrevue);
    return listEtudiant;
  }

  public byte[] getEtudiantsSansEntrevue() throws Exception {

    return generatePDF(getListEtudiantSansEtrenvue(), "List des étudiants n'ayant pas d'entrevue");
  }

  public List<Etudiant> getListEtudiantEnAttenteDeReponse() {
    List<Entrevue> listEntrevue = entrevueService.getAllEntrevuesPasse();
    return listEntrevue.stream()
        .map(Entrevue::getEtudiant)
        .collect(Collectors.toList());
  }

  public byte[] getEtudiantEnAttenteReponse() throws Exception {

    return generatePDF(
        getListEtudiantEnAttenteDeReponse(),
        "List d'étudiants qui attendent une reponse du moniteur");
  }

  public List<Etudiant> getListEtudiantTrouveStage() {
    List<Entrevue> listEntrevue = entrevueService.getEntrevuesAccepted();
    return listEntrevue.stream()
        .map(Entrevue::getEtudiant)
        .collect(Collectors.toList());
  }

  public byte[] getEtudiantTrouveStage() throws Exception {

    return generatePDF(
        getListEtudiantTrouveStage(), "List d'étudiants qui ont été accepté pour un stage");
  }

  public List<Etudiant> getListEtudiantPasEvaluationMoniteur() {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<Etudiant> listEtudiantEvaluer =
        evaluationService.getAllCurrentEtudiantEvals().stream()
            .map(EvaluationEtudiant::getContrat)
            .map(Contrat::getEtudiant)
            .collect(Collectors.toList());
    return listEtudiant.stream()
        .filter(etudiant -> !listEtudiantEvaluer.contains(etudiant))
        .collect(Collectors.toList());
  }


  public byte[] getEtudiantsNoEvaluationMoniteur() throws Exception {

    return generatePDF(getListEtudiantPasEvaluationMoniteur(),
        "List des étudiants n'ayant pas d'évalution du moniteur");
  }

  public List<Etudiant> getEtudiantsPasEntreprisEvaluationSuperviseur() {
    List<Etudiant> listEtudiant = userService.getAllEtudiants();
    List<Etudiant> listEtudiantEvaluer =
        evaluationService.getAllCurrentEntrepriseEvals().stream()
            .map(EvaluationEntreprise::getContrat)
            .map(Contrat::getEtudiant)
            .collect(Collectors.toList());
    return listEtudiant.stream()
        .filter(etudiant -> !listEtudiantEvaluer.contains(etudiant))
        .collect(Collectors.toList());
  }

  public byte[] getEtudiantsNoEntrepriseEvalueSuperviseur() throws Exception {

    return generatePDF(
        getEtudiantsPasEntreprisEvaluationSuperviseur(),
        "List des étudiants dont le superviseur n'as pas encore évalué l'entreprise");
  }

}
