package com.group1.stagesWs.repositories;

import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.Entrevue;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrevueRepository extends JpaRepository<Entrevue, Integer> {
  List<Entrevue> findEntrevueByEtudiantId(int id);

  List<Entrevue> findEntrevueByMoniteurId(int id);

  List<Entrevue> findAllByDateAfter(LocalDate date);

  List<Entrevue> findAllByDateBefore(LocalDate date);

  List<Entrevue> findEntrevueByStatus(Status status);
}
