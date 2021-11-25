package com.group1.stagesWs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.service.OffreService;
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

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@ContextConfiguration(
    classes = OffreController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(OffreController.class)
public class OffreControllerTests {

  private final ObjectMapper mapper;

  @Autowired private MockMvc mockMvc;

  @MockBean private OffreService service;

  public OffreControllerTests() {
    this.mapper = new ObjectMapper().findAndRegisterModules();
  }

  @Test
  void testGetAllOffres() throws Exception {
    // Arrange
    List<Offre> expected = List.of(getOffre(), getOffre(), getOffre());
    when(service.getAllOffres()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/offres")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualOffres = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualOffres.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllOffresAllSession() throws Exception {
    // Arrange
    List<Offre> expected = List.of(getOffre(), getOffre(), getOffre());
    when(service.getAllOffresAllSession()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/offres/allSession")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualOffres = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualOffres.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetEtudiantOffres() throws Exception {
    // Arrange
    String etudiantEmail = "etudiant@example.com";
    List<Offre> expected = List.of(getOffre(), getOffre(), getOffre());

    when(service.getEtudiantOffres(any(String.class))).thenReturn(expected);
    String url = "/offres/etudiant/" + etudiantEmail;
    // Act
    MvcResult result = mockMvc.perform(get(url)).andReturn();

    // Assert
    var actualOffres = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualOffres.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetMoniteurOffres() throws Exception {
    // Arrange
    List<Offre> expected = List.of(getOffre(), getOffre(), getOffre());
    when(service.getMoniteurOffres(any(String.class))).thenReturn(expected);

    // Act
    MvcResult result = mockMvc.perform(get("/offres/moniteur/moniteur@example.com")).andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testAddOffre() throws Exception {
    // Arrange
    Offre expected = getOffre();
    when(service.addOffre(any(Offre.class), any(String.class))).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/offres/moniteur@example.com")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualOffre = mapper.readValue(result.getResponse().getContentAsString(), Offre.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualOffre).isEqualTo(expected);
  }

  @Test
  void testApplyForOffre() throws Exception {
    // Arrange
    Etudiant etudiant = getEtudiant();
    Offre expected = getOffre();
    expected.setApplicants(Set.of(etudiant));
    when(service.applyForOffre(any(Integer.class), any(String.class)))
        .thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/offres/" + expected.getId() + "/apply")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(etudiant.getCourriel()))
            .andReturn();

    // Assert
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    var actual = mapper.readValue(result.getResponse().getContentAsString(), Offre.class);
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
        LocalTime.of(9, 0),
        LocalTime.of(17, 0),
        40,
        22);
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
}
