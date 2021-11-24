package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.model.Session;
import com.group1.stagesWs.repositories.SessionRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

  private final SessionRepository sessionRepository;

  public SessionService(SessionRepository sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  public Optional<Session> newSession(String nomSession) {
    Session currentSession = sessionRepository.save(new Session(nomSession));
    SessionManager.CURRENT_SESSION = currentSession;
    return Optional.of(currentSession);
  }

  public List<Session> getAllSessions() {
    return sessionRepository.findAll();
  }

  public Optional<Session> getCurrentSession() {
    Session currentSession = SessionManager.CURRENT_SESSION;
    if (!sessionRepository.findById(currentSession.getId()).isEmpty()) {
      return Optional.of(currentSession);
    }
    return Optional.empty();
  }
}
