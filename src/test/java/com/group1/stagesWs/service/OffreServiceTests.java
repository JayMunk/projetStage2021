package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.MoniteurRepository;
import com.group1.stagesWs.repositories.OffreRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class OffreServiceTests {
  @Mock private OffreRepository offreRepository;

  @Mock private EtudiantRepository etudiantRepository;

  @Mock private MoniteurRepository moniteurRepository;

  @Mock private UserService userService;

  @Mock private NotificationService notificationService;

  @InjectMocks private OffreService service;

  @Test
  void testGetAllOffres() {
    // Arrange
    List<Offre> expected = getOffres(); // Les offres de bases contienne la session actuelle
    expected
        .get(0)
        .setSession(
            "AUT-2021"); // Changement de la session a une sesion differente que la session actuelle
    when(offreRepository.findAll()).thenReturn(expected);

    // Act
    List<Offre> returned = service.getAllOffres();

    // Assert
    assertThat(returned)
        .hasSize(
            expected.size()
                - 1); // Retour de la liste sans l'offre qui n'est pas dans la session actuelle
  }

  @Test
  void testGetAllOffresAllSession() {
    // Arrange
    List<Offre> expected = getOffres(); // Les offres de bases contienne la session actuelle
    expected
        .get(0)
        .setSession(
            "HIVER-2021"); // Changement de la session a une sesion differente que la session
                           // actuelle
    when(offreRepository.findAll()).thenReturn(expected);

    // Act
    List<Offre> returned = service.getAllOffresAllSession();

    // Assert
    assertThat(returned)
        .isEqualTo(
            expected); // Retour de la liste sans l'offre qui n'est pas dans la session actuelle
  }

  @Test
  void testGetEtudiantOffres() {
    // Arrange
    Etudiant expectedEtudiant = getEtudiant();
    List<Offre> expected = getOffres();
    when(etudiantRepository.findEtudiantByCourrielIgnoreCase(any(String.class)))
        .thenReturn(expectedEtudiant);
    when(offreRepository.findAllByWhitelistContainsAndIsValidTrue(any(Etudiant.class)))
        .thenReturn(expected);

    // Act
    List<Offre> returned = service.getEtudiantOffres(expectedEtudiant.getCourriel());

    // Assert
    assertThat(returned).isEqualTo(expected);
  }

  @Test
  void testGetMoniteurOffres() {
    // Arrange
    Moniteur moniteur = new Moniteur();
    List<Offre> expected = getOffres();
    when(moniteurRepository.findMoniteurByCourrielIgnoreCase(any(String.class)))
        .thenReturn(moniteur);
    when(offreRepository.findAllByMoniteur(any(Moniteur.class))).thenReturn(expected);

    // Act
    List<Offre> returned = service.getMoniteurOffres("moniteur@example.com");

    // Assert
    assertThat(returned.size()).isEqualTo(3);
  }

  @Test
  void testAddOffre() {
    // Arrange
    Offre expected = getOffre();
    when(userService.findUserByCourriel(any(String.class))).thenReturn(Optional.empty());
    when(offreRepository.save(expected)).thenReturn(expected);

    // Act
    Optional<Offre> returned = service.addOffre(expected, "moniteur@example.com");

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  //    @Test
  //    void testUpdateOffre() {
  //        //Arrange
  //        Offre expected = getOffre();
  //        when(offreRepository.findById(any(Integer.class))).thenReturn(Optional.of(expected));
  //        when(offreRepository.save(any(Offre.class))).thenReturn(expected);
  //
  //        //Act
  //        Optional<Offre> returned = service.updateOffre(1, expected);
  //
  //        //Assert
  //        assertThat(returned).isPresent();
  //        var actual = returned.get();
  //        assertThat(actual.getId()).isEqualTo(1);
  //    }

  @Test
  void testApplyForOffre() {
    // Arrange
    Etudiant etudiant = getEtudiant();
    Offre expected = getOffre();
    expected.setMoniteur(new Moniteur());
    when(offreRepository.findById(any(Integer.class))).thenReturn(Optional.of(expected));
    when(etudiantRepository.findEtudiantByCourrielIgnoreCase(any(String.class)))
        .thenReturn(etudiant);
    when(offreRepository.save(any(Offre.class))).thenReturn(expected);
    //        doNothing().when(emailService).sendEtudiantEmailCVRejected(expected);
    when(notificationService.saveNotificationMoniteur(any(Notification.class), anyInt()))
        .thenReturn(true);

    // Act
    Optional<Offre> returned = service.applyForOffre(expected.getId(), etudiant.getCourriel());

    // Assert
    assertThat(returned).isPresent();
    var actual = returned.get();
    assertThat(actual.getApplicants()).contains(etudiant);
  }

  private Offre getOffre() {
    return new Offre(
        "Developpeur Java",
        "Developpeur Java sur un projet de banque",
        "Banque NCA",
        false,
        "1345 Boul Leger Saint-Jean",
        "2022-1-05",
        "2022-4-05",
        13,
        "9:00 a 5:00",
        40,
        22);
  }

  private List<Offre> getOffres() {
    return List.of(getOffre(), getOffre(), getOffre());
  }

  private Etudiant getEtudiant() {
    return new Etudiant(
        "Pascal",
        "Bourgoin",
        "test@test.com",
        "password",
        "123456789",
        "technique",
        "addy 123",
        "123456",
        true,
        true);
  }

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
    List<Offre> returned = service.getOffreValide();

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
    List<Offre> returned = service.getOffreInvalide();

    // Assert
    assertThat(returned.size())
        .isEqualTo(2 - 1);
  }
}
