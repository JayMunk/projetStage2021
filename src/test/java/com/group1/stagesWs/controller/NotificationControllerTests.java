package com.group1.stagesWs.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Notification;
import com.group1.stagesWs.model.Superviseur;
import com.group1.stagesWs.service.NotificationService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.ConfigFileApplicationContextInitializer;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@ContextConfiguration(
    classes = NotificationController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(UserController.class)
public class NotificationControllerTests {

  private final ObjectMapper mapper;

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private NotificationService notificationService;

  public NotificationControllerTests() {
    this.mapper = new ObjectMapper().findAndRegisterModules();
    this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
  }

  @Test
  void testGetAllNotificationByEtudiant() throws Exception {
    // Arrange
    List<Notification> expected = getNotifications();
    Etudiant etudiant = getEtudiant();
    etudiant.setId(1);
    when(notificationService.getNotificationsEtudiant(any(Integer.class))).thenReturn(expected);
    String url = "/notification/etudiant/" + etudiant.getId();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualNotifications =
        mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualNotifications.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllNotificationBySuperviseur() throws Exception {
    // Arrange
    List<Notification> expected = getNotifications();
    Superviseur superviseur = getSuperviseur();
    superviseur.setId(1);
    when(notificationService.getNotificationsSuperviseur(any(Integer.class))).thenReturn(expected);
    String url = "/notification/superviseur/" + superviseur.getId();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualNotifications =
        mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualNotifications.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllNotificationByMoniteur() throws Exception {
    // Arrange
    List<Notification> expected = getNotifications();
    Moniteur moniteur = getMoniteur();
    moniteur.setId(1);
    when(notificationService.getNotificationsMoniteur(any(Integer.class))).thenReturn(expected);
    String url = "/notification/moniteur/" + moniteur.getId();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualNotifications =
        mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualNotifications.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllNotificationGestionnaire() throws Exception {
    // Arrange
    List<Notification> expected = getNotifications();

    when(notificationService.getNotificationsGestionnaire()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/notification/gestionnaire")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualNotifications =
        mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualNotifications.size()).isEqualTo(expected.size());
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
