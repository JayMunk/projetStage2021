package com.group1.stagesWs.repositories;

import com.group1.stagesWs.model.Moniteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoniteurRepository extends JpaRepository<Moniteur, Integer> {
  Moniteur findMoniteurByCourrielIgnoreCase(String courriel);

  Moniteur findMoniteurByCourrielIgnoreCaseAndPassword(String courriel, String pwd);

  Moniteur findMoniteurById(int id);
}
