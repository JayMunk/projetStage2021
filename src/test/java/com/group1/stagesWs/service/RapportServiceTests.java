package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.model.User;
import com.group1.stagesWs.repositories.CVRepository;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.OffreRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
public class RapportServiceTests {

  @Mock
  private OffreRepository offreRepository;

  @Mock
  private EtudiantRepository etudiantRepository;

  @InjectMocks
  private OffreService offreService;

  @InjectMocks
  private UserService userService;

  @Test
  void testGetAllOffresValide() {
    // Arrange
    Offre offre1 = getOffre(); // Constructeur met leur session par defaut a la session actuelle
    Offre offre2 = getOffre(); // Constructeur met leur session par defaut a la session actuelle
    Offre offre3 = getOffre(); // Constructeur met leur session par defaut a la session actuelle
    offre1.setValid(true);
    offre2.setValid(true);
    offre3.setValid(true);


    offre3.setSession("AUT-2021");

    List<Offre> listOffre = List.of(offre1, offre2, offre3);
    when(offreRepository.findAllByIsValidTrue()).thenReturn(listOffre);

    // Act
    List<Offre> returned = offreService.getOffreValide();

    // Assert
    assertThat(returned.size())
        .isEqualTo(3 - 1);
  }

  @Test
  void testGetAllOffresInvalide() {
    // Arrange
    Offre offre1 = getOffre(); // Constructeur met leur session par defaut a la session actuelle
    Offre offre2 = getOffre(); // Constructeur met leur session par defaut a la session actuelle

    offre1.setValid(false);
    offre2.setValid(false);


    offre2.setSession("AUT-2021");

    List<Offre> listOffre = List.of(offre1, offre2);
    when(offreRepository.findAllByIsValidFalse()).thenReturn(listOffre);

    // Act
    List<Offre> returned = offreService.getOffreInvalide();

    // Assert
    assertThat(returned.size())
        .isEqualTo(2 - 1);
  }

  @Test
  void testGetAllEtudiantsInscrient() {
    // Arrange
    Etudiant etudiant1 = getEtudiant(); // Constructeur met leur session par defaut a la session actuelle
    Etudiant etudiant2 = getEtudiant(); // Constructeur met leur session par defaut a la session actuelle
    Etudiant etudiant3 = getEtudiant(); // Constructeur met leur session par defaut a la session actuelle


    etudiant3.setSession("AUT-2021");

    List<Etudiant> listEtudiant = List.of(etudiant1, etudiant2,etudiant3);
    when(etudiantRepository.findAll()).thenReturn(listEtudiant);

    // Act
    List<Etudiant> returned = userService.getAllEtudiants();

    // Assert
    assertThat(returned.size())
        .isEqualTo(3 - 1);
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


}
