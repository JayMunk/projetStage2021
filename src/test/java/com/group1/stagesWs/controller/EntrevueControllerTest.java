package com.group1.stagesWs.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.Entrevue;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.service.EntrevueService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
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
    classes = EntrevueController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(CVController.class)
public class EntrevueControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private EntrevueService entrevueService;

  private static ObjectMapper mapper;

  public EntrevueControllerTest() {
    this.mapper = new ObjectMapper().findAndRegisterModules();
  }


  @Test
  void testSaveEntrevue() throws Exception {
    // Arrange
    Entrevue expected = getEntrevue();
    when(entrevueService.saveEntrevue(any(Entrevue.class))).thenReturn(
        Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/entrevue")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEntrevue = mapper.readValue(result.getResponse().getContentAsString(),
        Entrevue.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
  }



  @Test
  void testGetAllCVs() throws Exception {
    // Arrange
    List<Entrevue> expected = List.of(new Entrevue(), new Entrevue(), new Entrevue());
    when(entrevueService.getAllEntrevuesSession()).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/entrevue")).andReturn();

    // Assert
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actual.size()).isEqualTo(3);
  }

  @Test
  void testGetEtudiantEntrevues() throws Exception {
    // Arrange
    int id = 1;
    List<Entrevue> expected = List.of(getEntrevue(), getEntrevue(), getEntrevue());

    when(entrevueService.getAllEntrevueEtudiant(any(Integer.class))).thenReturn(expected);
    String url = "/entrevue/etudiant/" + id;
    // Act
    MvcResult result = mockMvc.perform(get(url)).andReturn();

    // Assert
    var actualOffres = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualOffres.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetMoniteurEntrevues() throws Exception {
    // Arrange
    int id = 1;
    List<Entrevue> expected = List.of(getEntrevue(), getEntrevue(), getEntrevue());

    when(entrevueService.getAllEntrevueMoniteur(any(Integer.class))).thenReturn(expected);
    String url = "/entrevue/moniteur/" + id;
    // Act
    MvcResult result = mockMvc.perform(get(url)).andReturn();

    // Assert
    var actualOffres = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualOffres.size()).isEqualTo(expected.size());
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
    return new Moniteur("Ricky", "Boby", "ricky@gmail.com", "password", "5422339483", "cgi",
        "113 newman");
  }

  private Entrevue getEntrevue() {
    return new Entrevue("Entrevue pour offre fullstack", LocalDate.of(2021, 12, 16),
        LocalTime.of(16, 00, 00), "CGI", new Etudiant(
        "Pascal",
        "Bourgoin",
        "test@test.com",
        "password",
        "123456789",
        "technique",
        "addy 123",
        "123456",
        true,
        true), new Moniteur("Ricky", "Boby", "ricky@gmail.com", "password", "5422339483", "cgi",
        "113 newman"));
  }
}
