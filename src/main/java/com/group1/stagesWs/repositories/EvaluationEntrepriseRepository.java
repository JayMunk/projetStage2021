package com.group1.stagesWs.repositories;

import com.group1.stagesWs.model.EvaluationEntreprise;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationEntrepriseRepository
    extends JpaRepository<EvaluationEntreprise, Integer> {
  List<EvaluationEntreprise> findAllBySession(String session);

  List<EvaluationEntreprise> findAllByContratMoniteurId(int moniteurId);

  List<EvaluationEntreprise> findAllByContratEtudiantId(int etudiantId);

  List<EvaluationEntreprise> findAllBySuperviseurId(int superviseurId);
}
