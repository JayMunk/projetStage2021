package com.group1.stagesWs.repositories;

import com.group1.stagesWs.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Integer> {

  Session findByNomSession(String nomSession);
}
