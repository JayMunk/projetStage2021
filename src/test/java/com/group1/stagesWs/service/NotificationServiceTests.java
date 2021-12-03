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

    // Act
    boolean returned = service.saveNotificationEtudiant(notification, etudiant.getId());

    // Assert
    assertThat(returned).isTrue();
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
