package com.group1.stagesWs.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.service.CVService;
import com.group1.stagesWs.service.EmailService;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeAll;
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
    classes = CVController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(CVController.class)
public class CVControllerTests {

  @Autowired private MockMvc mockMvc;

  @MockBean private CVService cvService;

  @MockBean private EmailService emailService;

  private static ObjectMapper mapper;

  @BeforeAll
  static void initializeObjectMapper() {
    mapper = new ObjectMapper().findAndRegisterModules();
  }

  @Test
  void testAcceptCV() throws Exception {
    // Arrange
    CV expected = new CV();
    expected.setStatus(Status.ACCEPTED);
    when(cvService.acceptCV(any())).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/cv/accept")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actual = mapper.readValue(result.getResponse().getContentAsString(), CV.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actual.getStatus()).isEqualTo(Status.ACCEPTED);
  }

  @Test
  void testAcceptCVFail() throws Exception {
    // Arrange
    when(cvService.acceptCV(any())).thenReturn(Optional.empty());

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/cv/accept")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(new CV())))
            .andReturn();

    // Assert
    assertThat(result.getResponse().getStatus())
        .isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());
  }

  @Test
  void testRejectCV() throws Exception {
    // Arrange
    CV expected = new CV();
    expected.setStatus(Status.REJECTED);
    when(cvService.rejectCV(any())).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/cv/reject")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actual = mapper.readValue(result.getResponse().getContentAsString(), CV.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actual.getStatus()).isEqualTo(Status.REJECTED);
  }

  @Test
  void testRejectCVFail() throws Exception {
    // Arrange
    when(cvService.rejectCV(any())).thenReturn(Optional.empty());

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/cv/reject")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(new CV())))
            .andReturn();

    // Assert
    assertThat(result.getResponse().getStatus())
        .isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());
  }

  @Test
  void testGetAllCVs() throws Exception {
    // Arrange
    List<CV> expected = List.of(new CV(), new CV(), new CV());
    when(cvService.getAllCVs()).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/cv")).andReturn();

    // Assert
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actual.size()).isEqualTo(3);
  }

  @Test
  void testGetCV() throws Exception {
    // Arrange
    CV expected = new CV();
    expected.setId(1);
    when(cvService.getCVById(any(Integer.class))).thenReturn(Optional.of(expected));

    // Act
    MvcResult result = mockMvc.perform(get("/cv/" + expected.getId())).andReturn();

    // Assert
    var actual = mapper.readValue(result.getResponse().getContentAsString(), CV.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actual).isEqualTo(expected);
  }

  @Test
  void testDeleteCV() throws Exception {
    // Arrange
    CV expected = new CV();
    expected.setId(1);
    when(cvService.deleteCV(any(Integer.class))).thenReturn(true);

    // Act
    MvcResult result = mockMvc.perform(delete("/cv/delete/" + expected.getId())).andReturn();

    // Assert
    var actual = mapper.readValue(result.getResponse().getContentAsString(), Boolean.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actual).isTrue();
  }

  @Test
  void testGetAllCVsAllSession() throws Exception {
    // Arrange
    List<CV> expected = List.of(new CV(), new CV(), new CV());
    when(cvService.getAllCVsAllSession()).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/cv/allSession")).andReturn();

    // Assert
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actual.size()).isEqualTo(3);
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
}
