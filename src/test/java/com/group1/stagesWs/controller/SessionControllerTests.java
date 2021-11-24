package com.group1.stagesWs.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.stagesWs.model.Session;
import com.group1.stagesWs.service.SessionService;
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
    classes = SessionController.class,
    initializers = ConfigFileApplicationContextInitializer.class)
@WebMvcTest(OffreController.class)
public class SessionControllerTests {

  private final ObjectMapper mapper;

  @Autowired private MockMvc mockMvc;

  @MockBean private SessionService service;

  public SessionControllerTests() {
    this.mapper = new ObjectMapper().findAndRegisterModules();
    this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    //        this.mapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true);
  }

  @Test
  public void testNewSession() throws Exception {
    // Arrange
    Session expected = getSession();
    when(service.newSession(any(String.class))).thenReturn(Optional.of(expected));
    String url = "/session/new/" + expected.getNomSession();

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(Optional.of(expected))))
            .andReturn();

    // Assert
    var actualSession = mapper.readValue(result.getResponse().getContentAsString(), Session.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
    assertThat(actualSession).isEqualTo(expected);
  }

  @Test
  public void testGetAllSessions() throws Exception {
    // Arrange
    List<Session> expected = getSessions();
    when(service.getAllSessions()).thenReturn(expected);

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/session/allSessions")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(Optional.of(expected))))
            .andReturn();

    // Assert
    var actualListSession = mapper.readValue(result.getResponse().getContentAsString(), List.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualListSession).hasSize(expected.size());
  }

  @Test
  public void testGetCurrentSession() throws Exception {
    // Arrange
    Session expected = getSession();
    when(service.getCurrentSession()).thenReturn(Optional.of(expected));

    // Act
    MvcResult result =
        mockMvc
            .perform(
                get("/session/currentSession")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(Optional.of(expected))))
            .andReturn();

    // Assert
    var actualCurrentSession =
        mapper.readValue(result.getResponse().getContentAsString(), Session.class);
    assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    assertThat(actualCurrentSession).isEqualTo(expected);
  }

  private static Session getSession() {
    return new Session("test session");
  }

  private List<Session> getSessions() {
    return List.of(getSession(), getSession(), getSession());
  }
}
