package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.Entrevue;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.repositories.EntrevueRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class EntrevueServiceTest {

  @Mock
  private EntrevueRepository entrevueRepository;

  @Mock
  private NotificationService notificationService;

  @InjectMocks
  private EntrevueService entrevueService;

  @Test
  void testSaveEntrevue() {
    // Arrange
    Entrevue expected = getEntrevue();
    expected.setMoniteur(new Moniteur());
    expected.setEtudiant(new Etudiant());
    when(entrevueRepository.save(any(Entrevue.class))).thenReturn(expected);
    when(notificationService.saveNotificationEtudiant(any(Notification.class), anyInt()))
        .thenReturn(true);

    // Act
    Optional<Entrevue> returned = entrevueService.saveEntrevue(expected);

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  void testGetAllEntrevuesSessions() {
    // Arrange
    Entrevue entrevue1 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle

    Entrevue entrevue2 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle

    Entrevue entrevue3 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle

    entrevue3.setSession(
        "AUT-2021");

    List<Entrevue> listEntrevue = List.of(entrevue1, entrevue2, entrevue3);
    when(entrevueRepository.findAll()).thenReturn(listEntrevue);

    // Act
    List<Entrevue> returned = entrevueService.getAllEntrevuesSession();

    // Assert
    assertThat(returned.size())
        .isEqualTo(3 - 1); // Retout des CV de la session actuelle seulement donc 2/3
  }

  @Test
  void testGetAllEntrevuEtudiant() {
    // Arrange
    Etudiant expectedEtudiant = new Etudiant();
    expectedEtudiant.setId(1);
    Entrevue expected = getEntrevue();
    expected.setEtudiant(expectedEtudiant);
    Entrevue expected2 = getEntrevue();
    expected2.setEtudiant(expectedEtudiant);


    when(entrevueRepository.findEntrevueByEtudiantId(any(Integer.class)))
        .thenReturn(List.of(expected, expected2));

    // Act
    List<Entrevue> returnedList = entrevueService.getAllEntrevueEtudiant(expectedEtudiant.getId());

    // Arrange
    assertThat(returnedList).hasSize(2);
  }

  @Test
  void testGetAllEntrevuMoniteur() {
    // Arrange
    Moniteur expectedMoniteur = new Moniteur();
    expectedMoniteur.setId(1);
    Entrevue expected = getEntrevue();
    expected.setMoniteur(expectedMoniteur);
    Entrevue expected2 = getEntrevue();
    expected2.setMoniteur(expectedMoniteur);

    when(entrevueRepository.findEntrevueByMoniteurId(any(Integer.class)))
        .thenReturn(List.of(expected, expected2));

    // Act
    List<Entrevue> returnedList = entrevueService.getAllEntrevueMoniteur(expectedMoniteur.getId());

    // Arrange
    assertThat(returnedList).hasSize(2);
  }

  @Test
  void testGetAllEntrevueQuiArrive() {
    // Arrange

    Entrevue expected = getEntrevue();
    expected.setDate(LocalDate.of(2021,12,16));
    Entrevue expected2 = getEntrevue();
    expected.setDate(LocalDate.of(2021,12,20));

    when(entrevueRepository.findAllByDateAfter(LocalDate.now()))
        .thenReturn(List.of(expected, expected2));

    // Act
    List<Entrevue> returnedList = entrevueService.getAllEntrevuesQuiArrive();

    // Arrange
    assertThat(returnedList).hasSize(2);
  }

  @Test
  void testGetAllEntrevuePasse() {
    // Arrange

    Entrevue expected = getEntrevue();
    expected.setDate(LocalDate.of(2021,11,16));
    Entrevue expected2 = getEntrevue();
    expected.setDate(LocalDate.of(2021,11,20));

    when(entrevueRepository.findAllByDateBefore(LocalDate.now()))
        .thenReturn(List.of(expected, expected2));

    // Act
    List<Entrevue> returnedList = entrevueService.getAllEntrevuesPasse();

    // Arrange
    assertThat(returnedList).hasSize(2);
  }


  @Test
  void testGetAllEntrevues() {
    // Arrange
    Entrevue entrevue1 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle

    Entrevue entrevue2 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle

    Entrevue entrevue3 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle

    List<Entrevue> listEntrevue = List.of(entrevue1, entrevue2, entrevue3);
    when(entrevueRepository.findAll()).thenReturn(listEntrevue);

    // Act
    List<Entrevue> returned = entrevueService.getAllEntrevues();

    // Assert
    assertThat(returned.size())
        .isEqualTo(3) ; // Retout des CV de la session actuelle seulement donc 2/3
  }

  @Test
  void testGetAllEntrevuesAccepted() {
    // Arrange
    Entrevue entrevue1 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle
    entrevue1.setStatus(Status.ACCEPTED);
    Entrevue entrevue2 = getEntrevue(); // Constructeur met leur session par defaut a la session actuelle
    entrevue2.setStatus(Status.ACCEPTED);

    List<Entrevue> listEntrevue = List.of(entrevue1, entrevue2);
    when(entrevueRepository.findEntrevueByStatus(any(Status.class))).thenReturn(listEntrevue);

    // Act
    List<Entrevue> returned = entrevueService.getEntrevuesAccepted();

    // Assert
    assertThat(returned).hasSize(listEntrevue.size());
  }

  private Entrevue getEntrevue() {
    Entrevue entrevue = new Entrevue();
    entrevue.setTitre("testTitre");
    return entrevue;
  }
}
