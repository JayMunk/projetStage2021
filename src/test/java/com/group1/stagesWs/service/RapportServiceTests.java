package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.repositories.CVRepository;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.OffreRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class RapportServiceTests {



  @InjectMocks
  private RapportService rapportService;

  @InjectMocks
  private CVService cvService;

  @InjectMocks
  private UserService userService;



//  @Test
//  void testGetAllCvRejectEtPending() {
//    // Arrange
//    CV cv1 = getCV(); // Constructeur met leur session par defaut a la session actuelle
//    CV cv2 = getCV(); // Constructeur met leur session par defaut a la session actuelle
//
//    cv1.setStatus(Status.PENDING);
//    cv2.setStatus(Status.REJECTED);
//    List<CV> listCv = List.of(cv1, cv2);
//
//    when(cvService.getCVPendingEtRejected()).thenReturn(listCv);
//    // Act
//    List<CV> returned = cvService.getCVPendingEtRejected();
//
//    // Assert
//    assertThat(returned.size())
//        .isEqualTo(2);
//  }

  @Test
  void testGetAllEtudiantsPasDeCv() {
    // Arrange
    CV cv1 = getCV();
    Etudiant etudiant1 = getEtudiant();
    cv1.setEtudiant(etudiant1);

    CV cv2= getCV();
    Etudiant etudiant2 = getEtudiant();
    cv2.setEtudiant(etudiant2);

    List<Etudiant> listEtudiant = List.of(etudiant1,etudiant2);
    List<CV> listCv = List.of(cv1,cv2);


    when(userService.getAllEtudiants()).thenReturn(listEtudiant);
    when(cvService.getAllCVs()).thenReturn(listCv);
    // Act
    List<Etudiant> returned = rapportService.getListEtudiantsPasCv();

    // Assert
    assertThat(returned.size())
        .isEqualTo(0);
  }

  private Offre getOffre() {
    Offre offre = new Offre();
    offre.setTitre("test");
    return offre;
  }

  private Etudiant getEtudiant() {
    Etudiant etudiant = new Etudiant();
    etudiant.setPrenom("testPrenom");
    etudiant.setNom("testNom");
    return etudiant;
  }

  private CV getCV() {
    CV cv = new CV();
    cv.setNom("cvTest.pdf");
    return cv;
  }

}
