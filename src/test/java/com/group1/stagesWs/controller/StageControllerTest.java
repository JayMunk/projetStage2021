package com.group1.stagesWs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.model.Whitelist;
import com.group1.stagesWs.service.StageService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(StageController.class)
public class StageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StageService service;

    private static ObjectMapper mapper;

    @BeforeAll
    static void initializeObjectMapper() {
        mapper = new ObjectMapper().findAndRegisterModules();
    }

    @Test
    void testGetAllOffres() throws Exception {
        //Arrange
        List<Offre> expected = List.of(getOffre(), getOffre(), getOffre());
        when(service.getAllOffres()).thenReturn(expected);

        //Act
        MvcResult result = mockMvc.perform(get("/stage/offres")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(expected))).andReturn();

        //Assert
        var actualOffres = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualOffres.size()).isEqualTo(expected.size());
    }

    @Test
    void testGetEtudiantOffres() throws Exception {
        //Arrange
        List<Offre> expected = List.of(getOffre(), getOffre(), getOffre());
        when(service.getEtudiantOffres(any(String.class))).thenReturn(expected);

        //Act
        MvcResult result = mockMvc.perform(get("/stage/offres/etudiant@example.com")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(new Etudiant()))).andReturn();

        //Assert
        var actualOffres = mapper.readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualOffres.size()).isEqualTo(expected.size());
    }

    @Test
    void testSaveOffre() throws Exception {
        //Arrange
        Offre expected = getOffre();
        when(service.saveOffre(expected)).thenReturn(Optional.of(expected));

        //Act
        MvcResult result = mockMvc.perform(post("/stage/offre")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(expected))).andReturn();

        //Assert
        var actualOffre = mapper.readValue(result.getResponse().getContentAsString(), Offre.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualOffre).isEqualTo(expected);
    }

    @Test
    void testSaveWhitelist() throws Exception {
        //Arrange
        Whitelist expected = new Whitelist();
        when(service.saveWhitelist(expected)).thenReturn(Optional.of(expected));

        //Act
        MvcResult result = mockMvc.perform(post("/stage/whitelist")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(expected))).andReturn();

        //Assert
        var actual = mapper.readValue(result.getResponse().getContentAsString(), Whitelist.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actual).isEqualTo(expected);
    }

    private Offre getOffre() {
        return new Offre(
                "Developpeur Java",
                "Developpeur Java sur un projet de banque",
                "Banque NCA",
                false);
    }
}
