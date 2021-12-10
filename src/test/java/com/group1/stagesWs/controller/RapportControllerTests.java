package com.group1.stagesWs.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.service.CVService;
import com.group1.stagesWs.service.OffreService;
import com.group1.stagesWs.service.RapportService;
import com.group1.stagesWs.service.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.ConfigFileApplicationContextInitializer;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

@ContextConfiguration(
        classes = RapportController.class,
        initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(RapportController.class)
public class RapportControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RapportService rapportService;

    @MockBean
    private OffreService offreService;

    @MockBean
    private UserService userService;

    @MockBean
    private CVService cvService;

    private static ObjectMapper mapper;

    @BeforeAll
    static void initializeObjectMapper() {
        mapper = new ObjectMapper().findAndRegisterModules();
    }

    @Test
    void testGetListOffresValide() throws Exception {
        // Arrange
        List<Offre> expected = List.of(new Offre(), new Offre(), new Offre());
        when(offreService.getOffreValide()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/offresValide")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListOffresInvalide() throws Exception {
        // Arrange
        List<Offre> expected = List.of(new Offre(), new Offre(), new Offre());
        when(offreService.getOffreInvalide()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/offresInvalide")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListCvPendingEtRejected() throws Exception {
        // Arrange
        List<CV> expected = List.of(new CV(), new CV(), new CV());
        when(cvService.getCVPendingEtRejected()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/cvPendingEtRejected")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantsPasDeCv() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(rapportService.getListEtudiantsPasCv()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsPasDeCv")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantsSansEtrenvue() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(rapportService.getListEtudiantSansEtrenvue()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsSansEntrevue")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantsEnAttenteEntrevue() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(rapportService.getListEtudiantEnAttenteEntrevue()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsEnAttenteEntrevue")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantsEnAttenteDeReponse() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(rapportService.getListEtudiantEnAttenteDeReponse()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsEnAttenteDeReponse")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantTrouveStage() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(rapportService.getListEtudiantTrouveStage()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsTrouveStage")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantPasEvaluationMoniteur() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(rapportService.getListEtudiantPasEvaluationMoniteur()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsPasEvaluationMoniteur")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantsPasEntrepriseEvaluationSuerviseur() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(rapportService.getEtudiantsPasEntreprisEvaluationSuperviseur()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsPasEntrepriseEvaluationSuerviseur")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetListEtudiantsInscrient() throws Exception {
        // Arrange
        List<Etudiant> expected = List.of(new Etudiant(), new Etudiant(), new Etudiant());
        when(userService.getAllEtudiants()).thenReturn(expected);

        // Act
        MvcResult result = mockMvc.perform(get("/rapport/list/etudiantsInscrient")).andReturn();

        // Assert
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        var actual = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(actual.size()).isEqualTo(expected.size());
    }

//    @Test
//    void testGetOffresValidPDF() throws Exception{
//        //Arrange
//        when(rapportService.getOffresValidPDF()).thenReturn(new byte[0]);
//    }
}
