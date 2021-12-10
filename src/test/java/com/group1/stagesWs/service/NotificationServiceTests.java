package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.model.Superviseur;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.GestionnaireRepository;
import com.group1.stagesWs.repositories.MoniteurRepository;
import com.group1.stagesWs.repositories.NotificationRepository;
import com.group1.stagesWs.repositories.SuperviseurRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class NotificationServiceTests {

  @Mock
  private EtudiantRepository etudiantRepository;

  @Mock
  MoniteurRepository moniteurRepository;

  @Mock
  SuperviseurRepository superviseurRepository;

  @Mock
  GestionnaireRepository gestionnaireRepository;

  @Mock
  NotificationRepository notificationRepository;

  @InjectMocks
  private NotificationService service;

  @Test
  public void testSaveNotificationEtudiant() {
    // Arrange
    Notification notification = getNotification();
    Etudiant etudiant = getEtudiant();

    when(etudiantRepository.findById(any(Integer.class))).thenReturn(Optional.of(etudiant));
    when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
    when(etudiantRepository.save(any(Etudiant.class))).thenReturn(etudiant);

    // Act
    boolean returned = service.saveNotificationEtudiant(notification, etudiant.getId());

    // Assert
    assertThat(returned).isTrue();
  }

  @Test
  public void testSaveNotificationSuperviseur() {
    // Arrange
    Notification notification = getNotification();
    Superviseur superviseur = getSuperviseur();

    when(superviseurRepository.findById(any(Integer.class))).thenReturn(Optional.of(superviseur));
    when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
    when(superviseurRepository.save(any(Superviseur.class))).thenReturn(superviseur);

    // Act
    boolean returned = service.saveNotificationSuperviseur(notification, superviseur.getId());

    // Assert
    assertThat(returned).isTrue();
  }

  @Test
  public void testSaveNotificationMoniteur() {
    // Arrange
    Notification notification = getNotification();
    Moniteur moniteur = getMoniteur();

    when(moniteurRepository.findById(any(Integer.class))).thenReturn(Optional.of(moniteur));
    when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
    when(moniteurRepository.save(any(Moniteur.class))).thenReturn(moniteur);

    // Act
    boolean returned = service.saveNotificationMoniteur(notification, moniteur.getId());

    // Assert
    assertThat(returned).isTrue();
  }

  @Test
  public void testSaveNotificationGestionnaire() {
    // Arrange
    Notification notification = getNotification();
    Gestionnaire gestionnaire = getGestionnaire();
    List<Gestionnaire> gestionnaires = List.of(gestionnaire, getGestionnaire(), getGestionnaire());

    when(gestionnaireRepository.findAll()).thenReturn(gestionnaires);
    when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
    when(gestionnaireRepository.save(any(Gestionnaire.class))).thenReturn(gestionnaire);

    // Act
    boolean returned = service.saveNotificationGestionnaire(notification);

    // Assert
    assertThat(returned).isTrue();
  }

  @Test
  public void testGetNotificationsEtudiant() {
    // Arrange
    List<Notification> notifications = getNotifications();
    Etudiant etudiant = getEtudiant();
    etudiant.setId(1);
    etudiant.setNotifications(notifications);

    when(etudiantRepository.findById(etudiant.getId())).thenReturn(Optional.of(etudiant));
    when(etudiantRepository.findById(0)).thenReturn(Optional.empty());

    // Act
    List<Notification> returned = service.getNotificationsEtudiant(etudiant.getId());
    List<Notification> returnedEmpty = service.getNotificationsEtudiant(0);

    // Assert
    assertThat(returned).hasSize(notifications.size());
    assertThat(returnedEmpty).isEmpty();
  }

  @Test
  public void testGetNotificationsSuperviseur() {
    // Arrange
    List<Notification> notifications = getNotifications();
    Superviseur superviseur = getSuperviseur();
    superviseur.setId(1);
    superviseur.setNotifications(notifications);

    when(superviseurRepository.findById(superviseur.getId())).thenReturn(Optional.of(superviseur));
    when(superviseurRepository.findById(0)).thenReturn(Optional.empty());

    // Act
    List<Notification> returned = service.getNotificationsSuperviseur(superviseur.getId());
    List<Notification> returnedEmpty = service.getNotificationsSuperviseur(0);

    // Assert
    assertThat(returned).hasSize(notifications.size());
    assertThat(returnedEmpty).isEmpty();
  }

  @Test
  public void testGetNotificationsMoniteur() {
    // Arrange
    List<Notification> notifications = getNotifications();
    Moniteur moniteur = getMoniteur();
    moniteur.setId(1);
    moniteur.setNotifications(notifications);

    when(moniteurRepository.findById(moniteur.getId())).thenReturn(Optional.of(moniteur));
    when(moniteurRepository.findById(0)).thenReturn(Optional.empty());

    // Act
    List<Notification> returned = service.getNotificationsMoniteur(moniteur.getId());
    List<Notification> returnedEmpty = service.getNotificationsMoniteur(0);

    // Assert
    assertThat(returned).hasSize(notifications.size());
    assertThat(returnedEmpty).isEmpty();
  }

  @Test
  public void testGetNotificationsGestionnaire() {
    // Arrange
    List<Notification> notifications = getNotifications();
    Gestionnaire gestionnaire = getGestionnaire();
    gestionnaire.setId(1);
    gestionnaire.setNotifications(notifications);
    List<Gestionnaire> gestionnaires = List.of(gestionnaire, getGestionnaire(), getGestionnaire());

    // Act
    when(gestionnaireRepository.findAll()).thenReturn(gestionnaires);
    List<Notification> returned = service.getNotificationsGestionnaire();

    when(gestionnaireRepository.findAll()).thenReturn(List.of());
    List<Notification> returnedEmpty = service.getNotificationsGestionnaire();

    // Assert
    assertThat(returned).hasSize(notifications.size());
    assertThat(returnedEmpty).isEmpty();
  }

  private Notification getNotification() {
    return new Notification("NotifTest", NotifStatus.ALERT);
  }

  private List<Notification> getNotifications() {
    return List.of(getNotification(), getNotification(), getNotification());
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

  private Gestionnaire getGestionnaire() {
    return new Gestionnaire(
        "John", "McMurffy", "McMurffy@test.com", "password", "123456789", "Informatique");
  }

  private Moniteur getMoniteur() {
    return new Moniteur(
        "John",
        "Doe",
        "john.doe@example.com",
        "pa55w0rd",
        "000111222",
        "Example Enterprises",
        "123 Enterprise Lane");
  }

  private Superviseur getSuperviseur() {
    return new Superviseur(
        "Jane",
        "Smith",
        "jane.smith@example.com",
        "pa55w0rd",
        "123000322",
        "Informatique",
        "Securite");
  }
}
