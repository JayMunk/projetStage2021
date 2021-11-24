package com.group1.stagesWs.service;

import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.repositories.GestionnaireRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private final JavaMailSender emailSender;
  private final GestionnaireRepository gestionnaireRepository;

  public EmailService(JavaMailSender emailSender, GestionnaireRepository gestionnaireRepository) {
    this.emailSender = emailSender;
    this.gestionnaireRepository = gestionnaireRepository;
  }

  public void sendGestionnaireEmailCVAjouter() {
    SimpleMailMessage message = new SimpleMailMessage();
    String[] emailArray = getAllGestionnairesEmail().toArray(new String[0]);
    message.setTo(emailArray);
    message.setSubject("Un nouveau CV à été ajouté sur la plateforme OSEVM");
    message.setText(
        "Un nouveau CV a été ajouté. Veuillez vous connecter à l'application OSE version meilleur pour voir les CV.");
    emailSender.send(message);
  }

  public void sendEtudiantEmailCVAccepted(CV cv) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(getEtudiantEmailByCV(cv));
    message.setSubject("Votre CV à été accepté sur la plateforme OSEVM");
    message.setText(
        "Votre CV "
            + cv.getNom()
            + " a été accepté. Veuillez vous connecter à l'application OSE version meilleur pour voir le statut de votre CV.");
    emailSender.send(message);
  }

  public void sendEtudiantEmailCVRejected(CV cv) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(getEtudiantEmailByCV(cv));
    message.setSubject("Votre CV à été rejeté sur la plateforme OSEVM");
    message.setText(
        "Votre CV "
            + cv.getNom()
            + " a été rejeté. Veuillez vous connecter à l'application OSE version meilleur pour voir le statut de votre CV.");
    emailSender.send(message);
  }

  private List<String> getAllGestionnairesEmail() {
    List<Gestionnaire> gestionnaireList = gestionnaireRepository.findAll();
    List<String> emailList = new ArrayList<>();
    for (Gestionnaire gestionnaire : gestionnaireList) {
      emailList.add(gestionnaire.getCourriel());
    }
    return emailList;
  }

  private String getEtudiantEmailByCV(CV cv) {
    return cv.getEtudiant().getCourriel();
  }
}
