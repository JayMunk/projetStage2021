package com.group1.stagesWs.repositories;

import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Offre;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffreRepository extends JpaRepository<Offre, Integer> {

  List<Offre> findAllByWhitelistContainsAndIsValidTrue(Etudiant etudiant);

  List<Offre> findAllByMoniteur(Moniteur moniteur);

  List<Offre> findAllByIsValidTrue();

  List<Offre> findAllByIsValidFalse();
}
