package com.group1.stagesWs.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Superviseur;
import com.group1.stagesWs.service.UserService;
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
    classes = UserController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(UserController.class)
public class UserControllerTests {

  private final ObjectMapper mapper;

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  public UserControllerTests() {
    this.mapper = new ObjectMapper().findAndRegisterModules();
    this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
  }

  @Test
  public void testAddEtudiant() throws Exception {
    // Arrange
    Etudiant expected = getEtudiant();
    when(userService.addEtudiant(expected)).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/user/etudiant")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEtudiant =
        mapper.readValue(result.getResponse().getContentAsString(), Etudiant.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
    assertThat(actualEtudiant).isEqualTo(expected);
  }

  @Test
  public void testAddMoniteur() throws Exception {
    // Arrange
    Moniteur expected = getMoniteur();
    when(userService.addMoniteur(expected)).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/user/moniteur")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualMoniteur =
        mapper.readValue(result.getResponse().getContentAsString(), Moniteur.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
    assertThat(actualMoniteur).isEqualTo(expected);
  }

  @Test
  public void testAddSuperviseur() throws Exception {
    // Arrange
    Superviseur expected = getSuperviseur();
    when(userService.addSuperviseur(expected)).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                post("/user/superviseur")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualSuperviseur =
        mapper.readValue(result.getResponse().getContentAsString(), Superviseur.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
    assertThat(actualSuperviseur).isEqualTo(expected);
  }

  @Test
  void testLoginEtudiant() throws Exception {
    // Arrange
    Etudiant expected = getEtudiant();
    when(userService.login(expected.getCourriel(), expected.getPassword()))
        .thenReturn(Optional.of(expected));
    String url = "/user/" + expected.getCourriel() + "/" + expected.getPassword();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEtudiant =
        mapper.readValue(result.getResponse().getContentAsString(), Etudiant.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualEtudiant).isEqualTo(expected);
  }

  @Test
  void testFindEtudiantByEmail() throws Exception {
    // Arrange
    Etudiant expected = getEtudiant();
    when(userService.findUserByCourriel(any(String.class))).thenReturn(Optional.of(expected));
    String url = "/user/" + expected.getCourriel();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEtudiant =
        mapper.readValue(result.getResponse().getContentAsString(), Etudiant.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualEtudiant).isEqualTo(expected);
  }

  @Test
  void testLoginGestionnaire() throws Exception {
    // Arrange
    Gestionnaire expected = getGestionnaire();
    when(userService.login(expected.getCourriel(), expected.getPassword()))
        .thenReturn(Optional.of(expected));
    String url = "/user/" + expected.getCourriel() + "/" + expected.getPassword();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualGestionnaire =
        mapper.readValue(result.getResponse().getContentAsString(), Gestionnaire.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualGestionnaire).isEqualTo(expected);
  }

  @Test
  void testLoginMoniteur() throws Exception {
    // Arrange
    Moniteur expected = getMoniteur();
    when(userService.login(expected.getCourriel(), expected.getPassword()))
        .thenReturn(Optional.of(expected));
    String url = "/user/" + expected.getCourriel() + "/" + expected.getPassword();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualMoniteur =
        mapper.readValue(result.getResponse().getContentAsString(), Moniteur.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualMoniteur).isEqualTo(expected);
  }

  @Test
  void testLoginSuperviseur() throws Exception {
    // Arrange
    Superviseur expected = getSuperviseur();
    when(userService.login(expected.getCourriel(), expected.getPassword()))
        .thenReturn(Optional.of(expected));
    String url = "/user/" + expected.getCourriel() + "/" + expected.getPassword();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualSuperviseur =
        mapper.readValue(result.getResponse().getContentAsString(), Superviseur.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualSuperviseur).isEqualTo(expected);
  }

  @Test
  void testGetAllEtudiants() throws Exception {
    // Arrange
    List<Etudiant> expected = getEtudiants();
    when(userService.getAllEtudiants()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/user/etudiants")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEtudiants = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualEtudiants.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllEtudiantsAllSession() throws Exception {
    // Arrange
    List<Etudiant> expected = getEtudiants();
    when(userService.getAllEtudiantsAllSession()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/user/etudiants/allSession")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEtudiants = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualEtudiants.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllSuperviseurs() throws Exception {
    // Arrange
    List<Superviseur> expected = List.of(getSuperviseur(), getSuperviseur(), getSuperviseur());
    when(userService.getAllSuperviseurs()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/user/superviseurs")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualSuperviseurs =
        mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualSuperviseurs).hasSize(expected.size());
  }

  @Test
  void testGetAllSuperviseurAllSession() throws Exception {
    // Arrange
    List<Superviseur> expected = List.of(getSuperviseur(), getSuperviseur(), getSuperviseur());
    when(userService.getAllSuperviseursAllSession()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/user/superviseurs/allSession")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualSuperviseurs =
        mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualSuperviseurs.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllEtudiantsWithoutSuperviseur() throws Exception {
    // Arrange
    List<Etudiant> expected = getEtudiants();
    when(userService.getAllEtudiantsWithoutSuperviseur()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/user/etudiants/nosuperviseur")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEtudiants = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualEtudiants.size()).isEqualTo(expected.size());
  }

  @Test
  void testSaveListeEtudiantSuperviseur() throws Exception {
    // Arrange
    Superviseur expected = getSuperviseur();
    expected.setId(1);
    List<Etudiant> listEtudiants = getEtudiants();
    when(userService.addListeEtudiantSuperviseur(any(Integer.class), any(List.class)))
        .thenReturn(Optional.of(expected));
    String url = "/user/superviseur/" + expected.getId() + "/etudiants";
    // Act
    MvcResult result =
        mockMvc
            .perform(
                post(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(listEtudiants)))
            .andReturn();

    // Assert
    var actualSuperviseur =
        mapper.readValue(result.getResponse().getContentAsString(), Superviseur.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualSuperviseur).isEqualTo(expected);
  }

  @Test
  void testGetAllEtudiantsBySuperviseur() throws Exception {
    // Arrange
    Superviseur superviseur = getSuperviseur();
    superviseur.setId(1);
    List<Etudiant> expected = getEtudiants();
    when(userService.getAllEtudiantsBySuperviseur(any(Integer.class))).thenReturn(expected);
    String url = "/user/superviseur/etudiants/" + superviseur.getId();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualEtudiants = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualEtudiants).hasSize(expected.size());
  }

  @Test
  void testGetAllGestionnaires() throws Exception {
    // Arrange
    List<Gestionnaire> expected = getGestionnaires();
    when(userService.getAllGestionnaires()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/user/gestionnaires")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(expected)))
            .andReturn();

    // Assert
    var actualGestionnaires =
        mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualGestionnaires.size()).isEqualTo(expected.size());
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

  private List<Etudiant> getEtudiants() {
    return List.of(getEtudiant(), getEtudiant(), getEtudiant());
  }

  private List<Gestionnaire> getGestionnaires() {
    return List.of(getGestionnaire(), getGestionnaire(), getGestionnaire());
  }
}
