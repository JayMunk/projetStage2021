package com.group1.stagesWs.controller;

import com.group1.stagesWs.model.Session;
import com.group1.stagesWs.service.SessionService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/session")
public class SessionController {

  Logger logger = LoggerFactory.getLogger(SessionController.class);

  private final SessionService service;

  public SessionController(SessionService service) {
    this.service = service;
  }

  @GetMapping(path = "/new/{sessionName}")
  public ResponseEntity<Session> newSession(@PathVariable String sessionName) {
    return service
        .newSession(sessionName)
        .map(session1 -> ResponseEntity.status(HttpStatus.CREATED).body(session1))
        .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
  }

  @GetMapping(path = "/allSessions")
  public ResponseEntity<List<Session>> getAllSessions() {
    return new ResponseEntity<>(service.getAllSessions(), HttpStatus.OK);
  }

  @GetMapping(path = "/currentSession")
  public ResponseEntity<Session> getCurrentSession() {
    return new ResponseEntity<>(service.getCurrentSession().get(), HttpStatus.OK);
  }
}
