package com.group1.stagesWs.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.service.EvaluationService;
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
    classes = EvaluationController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(EvaluationController.class)
public class EvaluationControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private EvaluationService service;

  private static ObjectMapper mapper;

  @BeforeAll
  static void initializeObjectMapper() {
    mapper = new ObjectMapper().findAndRegisterModules();
  }

  @Test
  void testSaveEvaluationEntreprise() throws Exception {
    // Arrange
    EvaluationEntreprise expected = new EvaluationEntreprise();
    expected.setId(1);
    when(service.save(any(EvaluationEntreprise.class))).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/evaluations/entreprise")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(new EvaluationEntreprise())))
            .andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual =
        mapper.readValue(result.getResponse().getContentAsString(), EvaluationEntreprise.class);
    assertThat(actual.getId()).isGreaterThan(0);
  }

  @Test
  void testSaveEvaluationEtudiant() throws Exception {
    // Arrange
    EvaluationEtudiant expected = new EvaluationEtudiant();
    expected.setId(1);
    when(service.save(any(EvaluationEtudiant.class))).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/evaluations/etudiant")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(new EvaluationEtudiant())))
            .andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual =
        mapper.readValue(result.getResponse().getContentAsString(), EvaluationEtudiant.class);
    assertThat(actual.getId()).isGreaterThan(0);
  }

  @Test
  void testGetAllCurrentEvaluationsEntreprise() throws Exception {
    // Arrange
    List<EvaluationEntreprise> expected =
        List.of(new EvaluationEntreprise(), new EvaluationEntreprise(), new EvaluationEntreprise());
    when(service.getAllCurrentEntrepriseEvals()).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/evaluations/entreprise")).andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllCurrentEvaluationsEtudiant() throws Exception {
    // Arrange
    List<EvaluationEtudiant> expected =
        List.of(new EvaluationEtudiant(), new EvaluationEtudiant(), new EvaluationEtudiant());
    when(service.getAllCurrentEtudiantEvals()).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/evaluations/etudiant")).andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllEvaluationsEntreprise() throws Exception {
    // Arrange
    List<EvaluationEntreprise> expected =
        List.of(new EvaluationEntreprise(), new EvaluationEntreprise(), new EvaluationEntreprise());
    when(service.getAllEntrepriseEvals()).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/evaluations/entreprise/allSessions")).andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllEvaluationsEtudiant() throws Exception {
    // Arrange
    List<EvaluationEtudiant> expected =
        List.of(new EvaluationEtudiant(), new EvaluationEtudiant(), new EvaluationEtudiant());
    when(service.getAllEtudiantEvals()).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/evaluations/etudiant/allSessions")).andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetEvaluationEntreprise() throws Exception {
    // Arrange
    EvaluationEntreprise expected = new EvaluationEntreprise();
    expected.setId(1);
    when(service.getEntrepriseEval(anyInt())).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc.perform(get("/evaluations/entreprise/" + expected.getId())).andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual =
        mapper.readValue(result.getResponse().getContentAsString(), EvaluationEntreprise.class);
    assertThat(actual.getId()).isEqualTo(expected.getId());
  }

  @Test
  void testGetEvaluationEtudiant() throws Exception {
    // Arrange
    EvaluationEtudiant expected = new EvaluationEtudiant();
    expected.setId(1);
    when(service.getEtudiantEval(anyInt())).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc.perform(get("/evaluations/etudiant/" + expected.getId())).andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual =
        mapper.readValue(result.getResponse().getContentAsString(), EvaluationEtudiant.class);
    assertThat(actual.getId()).isEqualTo(expected.getId());
  }
}
