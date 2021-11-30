package com.group1.stagesWs.repositories;

import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CVRepository extends JpaRepository<CV, Integer> {
  List<CV> findCVByEtudiantId(int id);

  CV findCvById(int id);


  List<CV> findCVByStatus(Status status);
}
