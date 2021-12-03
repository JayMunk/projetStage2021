package com.group1.stagesWs.service;

import com.group1.stagesWs.SessionManager;
import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Superviseur;
import com.group1.stagesWs.model.User;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.GestionnaireRepository;
import com.group1.stagesWs.repositories.MoniteurRepository;
import com.group1.stagesWs.repositories.SuperviseurRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService extends SessionManager<User> {

  private final EtudiantRepository etudiantRepository;
  private final GestionnaireRepository gestionnaireRepository;
  private final MoniteurRepository moniteurRepository;
  private final SuperviseurRepository superviseurRepository;

  public UserService(
      EtudiantRepository etudiantRepository,
      GestionnaireRepository gestionnaireRepository,
      MoniteurRepository moniteurRepository,
      SuperviseurRepository superviseurRepository) {
    this.etudiantRepository = etudiantRepository;
    this.gestionnaireRepository = gestionnaireRepository;
    this.moniteurRepository = moniteurRepository;
    this.superviseurRepository = superviseurRepository;
  }

  public Optional<Etudiant> addEtudiant(Etudiant etudiant) {
    return Optional.of(etudiantRepository.save(etudiant));
  }

  public Optional<Moniteur> addMoniteur(Moniteur moniteur) {
    return Optional.of(moniteurRepository.save(moniteur));
  }

  public Optional<Superviseur> addSuperviseur(Superviseur superviseur) {
    return Optional.of(superviseurRepository.save(superviseur));
  }

  public Optional<User> login(String email, String pwd) {
    if (etudiantRepository.findEtudiantByCourrielIgnoreCase(email) != null) {
      return Optional.of(
          etudiantRepository.findEtudiantByCourrielIgnoreCaseAndPassword(email, pwd));
    }
    if (gestionnaireRepository.findGestionnaireByCourrielIgnoreCase(email) != null) {
      return Optional.of(
          gestionnaireRepository.findGestionnaireByCourrielIgnoreCaseAndPassword(email, pwd));
    }
    if (moniteurRepository.findMoniteurByCourrielIgnoreCase(email) != null) {
      return Optional.of(
          moniteurRepository.findMoniteurByCourrielIgnoreCaseAndPassword(email, pwd));
    }
    if (superviseurRepository.findSuperviseurByCourrielIgnoreCase(email) != null) {
      return Optional.of(
          superviseurRepository.findSuperviseurByCourrielIgnoreCaseAndPassword(email, pwd));
    }
    return Optional.empty();
  }

  public Optional<User> findUserByCourriel(String email) {
    if (etudiantRepository.findEtudiantByCourrielIgnoreCase(email) != null) {
      return Optional.of(etudiantRepository.findEtudiantByCourrielIgnoreCase(email));
    }
    if (gestionnaireRepository.findGestionnaireByCourrielIgnoreCase(email) != null) {
      return Optional.of(gestionnaireRepository.findGestionnaireByCourrielIgnoreCase(email));
    }
    if (moniteurRepository.findMoniteurByCourrielIgnoreCase(email) != null) {
      return Optional.of(moniteurRepository.findMoniteurByCourrielIgnoreCase(email));
    }
    if (superviseurRepository.findSuperviseurByCourrielIgnoreCase(email) != null) {
      return Optional.of(superviseurRepository.findSuperviseurByCourrielIgnoreCase(email));
    }
    return Optional.empty();
  }

  public List<Etudiant> getAllEtudiants() {
    List<Etudiant> listAllEtudiant = etudiantRepository.findAll();
    return (List<Etudiant>)
        (List<?>) getListForCurrentSession((List<User>) (List<?>) listAllEtudiant);
  }

  public List<Etudiant> getAllEtudiantsAllSession() {
    return etudiantRepository.findAll();
  }

  public List<Superviseur> getAllSuperviseurs() {
    List<Superviseur> listAllSuperviseur = superviseurRepository.findAll();
    return (List<Superviseur>)
        (List<?>) getListForCurrentSession((List<User>) (List<?>) listAllSuperviseur);
  }

  public List<Superviseur> getAllSuperviseursAllSession() {
    return superviseurRepository.findAll();
  }

  public List<Etudiant> getAllEtudiantsWithoutSuperviseur() {
    List<Etudiant> etudiantListe = etudiantRepository.findAllEtudiantBySuperviseurNull();
    return (List<Etudiant>)
        (List<?>) getListForCurrentSession((List<User>) (List<?>) etudiantListe);
  }

  public Optional<Superviseur> addListeEtudiantSuperviseur(
      int superviseurId, List<Etudiant> listeEtudiants) {
    Optional<Superviseur> superviseur = superviseurRepository.findById(superviseurId);
    if (!superviseur.equals(Optional.empty())) {
      List<Etudiant> listeEtudiantsSuperviseurs =
          etudiantRepository.findAllEtudiantBySuperviseurId(superviseurId);
      for (Etudiant etudiantSuperviseur : listeEtudiantsSuperviseurs) {
        etudiantSuperviseur.setSuperviseur(null);
      }
      etudiantRepository.saveAll(listeEtudiantsSuperviseurs);
      if (!listeEtudiants.isEmpty()) {
        for (Etudiant etudiant : listeEtudiants) {
          etudiant.setSuperviseur(superviseur.get());
        }
        etudiantRepository.saveAll(listeEtudiants);
      }
      return superviseur;
    }
    return superviseur;
  }

  public List<Etudiant> getAllEtudiantsBySuperviseur(int superviseurId) {
    List<Etudiant> listAllEtudiantBySuperviseur =
        etudiantRepository.findAllEtudiantBySuperviseurId(superviseurId);
    return (List<Etudiant>)
        (List<?>) getListForCurrentSession((List<User>) (List<?>) listAllEtudiantBySuperviseur);
  }

  public List<Moniteur> getAllMoniteurs() {
    List<Moniteur> moniteurList = moniteurRepository.findAll();
    return (List<Moniteur>) (List<?>) getListForCurrentSession((List<User>) (List<?>) moniteurList);
  }

  public List<Moniteur> getAllMoniteursAllSession() {
    return moniteurRepository.findAll();
  }

  @Override
  public List<User> getListForCurrentSession(List<User> listUser) {
    List<User> listUserCurrentSession = new ArrayList<>();
    for (User user : listUser) {
      if (user.getSession().equals(SessionManager.CURRENT_SESSION.getNomSession())) {
        listUserCurrentSession.add(user);
      }
    }
    return listUserCurrentSession;
  }

  public List<Gestionnaire> getAllGestionnaires() {
    return gestionnaireRepository.findAll();
  }

  public Etudiant getEtudiant(int id) {
    return etudiantRepository.findEtudiantById(id);
  }

  public Moniteur getMoniteur(int id) {
    return moniteurRepository.findMoniteurById(id);
  }
}
