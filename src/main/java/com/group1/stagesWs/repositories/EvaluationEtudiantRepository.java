package com.group1.stagesWs.repositories;

import com.group1.stagesWs.model.EvaluationEtudiant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationEtudiantRepository extends JpaRepository<EvaluationEtudiant, Integer> {

  List<EvaluationEtudiant> findAllBySession(String session);

  List<EvaluationEtudiant> findAllByContratEtudiantId(int etudiantId);

  List<EvaluationEtudiant> findAllByContratMoniteurId(int moniteurId);
}
