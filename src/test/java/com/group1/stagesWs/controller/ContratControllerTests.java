package com.group1.stagesWs.controller;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.Contrat;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.service.ContratService;
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

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@ContextConfiguration(
    classes = ContratController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(ContratController.class)
public class ContratControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private ContratService contratService;

  private static ObjectMapper mapper;

  @BeforeAll
  static void initializeObjectMapper() {
    mapper = new ObjectMapper().findAndRegisterModules();
    mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
  }

  @Test
  void testGetAllContrats() throws Exception {
    // Arrange
    List<Contrat> expected = List.of(getContrat(), getContrat(), getContrat());
    when(contratService.getAllContrats()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/contrats")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualContrats = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualContrats.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetContratsByMoniteurEmail() throws Exception {
    // Arrange
    Moniteur moniteur = getMoniteur();
    List<Contrat> expected = List.of(getContrat(), getContrat(), getContrat());
    when(contratService.getContratsByMoniteurEmail(moniteur.getCourriel())).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/contrats/moniteur/" + moniteur.getCourriel())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualContrats = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualContrats.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetContratsByEtudiantEmail() throws Exception {
    // Arrange
    Etudiant etudiant = getEtudiant();
    Contrat expected = getContrat();
    when(contratService.getContratsByEtudiantEmail(etudiant.getCourriel())).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/contrats/etudiant/" + etudiant.getCourriel())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualContrats = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
  }

  @Test
  public void testSaveContrat() throws Exception {
    // Arrange
    Contrat expected = getContrat();
    when(contratService.saveContrat(expected)).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/contrats")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualContrat = mapper.readValue(result.getResponse().getContentAsString(), Contrat.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
    assertThat(actualContrat).isEqualTo(expected);
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

  private Contrat getContrat() {
    return new Contrat(
        "fournir a l entreprise tous les renseignements concernant les conditions specifiques du programme d etudes et du programme d alternance travail etudes",
        "embaucher l eleve stagiaire aux conditions precisees dans la presente entente",
        "assumer de facon responsable et securitaire, les taches qui lui sont confiees",
        getOffre(),
        getEtudiant(),
        getMoniteur());
  }
}
