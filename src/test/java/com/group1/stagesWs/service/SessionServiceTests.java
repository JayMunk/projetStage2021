package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.model.Session;
import com.group1.stagesWs.repositories.SessionRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTests {

  @Mock private SessionRepository sessionRepository;

  @InjectMocks private SessionService sessionService;

  @Test
  public void testNewSession() {
    // Arrange
    Session expected = getSession();
    when(sessionRepository.save(any(Session.class))).thenReturn(expected);
    //        SessionManager.CURRENT_SESSION = new Session("test");
    // Act
    Optional<Session> returned = sessionService.newSession(expected.getNomSession());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
    assertThat(SessionManager.CURRENT_SESSION.getNomSession())
        .isEqualTo(returned.get().getNomSession());
  }

  @Test
  public void testGetAllSessions() {
    // Arrange
    List<Session> expected = getSessions();
    when(sessionRepository.findAll()).thenReturn(expected);

    // Act
    List<Session> returned = sessionService.getAllSessions();

    // Assert
    assertThat(returned).hasSize(3);
  }

  @Test
  public void testGetCurrentSession() {
    // Arrange
    Session expected = getSession();
    SessionManager.CURRENT_SESSION = expected;
    when(sessionRepository.findById(any(Integer.class))).thenReturn(Optional.of(expected));

    // Act
    Optional<Session> returned = sessionService.getCurrentSession();

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  private static Session getSession() {
    return new Session("test session");
  }

  private List<Session> getSessions() {
    return List.of(getSession(), getSession(), getSession());
  }
}
