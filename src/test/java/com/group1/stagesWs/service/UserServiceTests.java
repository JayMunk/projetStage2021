package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Gestionnaire;
import com.group1.stagesWs.model.Moniteur;
import com.group1.stagesWs.model.Session;
import com.group1.stagesWs.model.Superviseur;
import com.group1.stagesWs.model.User;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.GestionnaireRepository;
import com.group1.stagesWs.repositories.MoniteurRepository;
import com.group1.stagesWs.repositories.SuperviseurRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

  @Mock private EtudiantRepository etudiantRepository;

  @Mock MoniteurRepository moniteurRepository;

  @Mock SuperviseurRepository superviseurRepository;

  @Mock GestionnaireRepository gestionnaireRepository;

  @InjectMocks private UserService service;

  @Test
  public void testAddEtudiant() {
    // Arrange
    Etudiant expected = getEtudiant();
    when(etudiantRepository.save(expected)).thenReturn(expected);

    // Act
    Optional<Etudiant> returned = service.addEtudiant(expected);

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testAddMoniteur() {
    // Arrange
    Moniteur expected = getMoniteur();
    when(moniteurRepository.save(expected)).thenReturn(expected);

    // Act
    Optional<Moniteur> returned = service.addMoniteur(expected);

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testAddSuperviseur() {
    // Arrange
    Superviseur expected = getSuperviseur();
    when(superviseurRepository.save(expected)).thenReturn(expected);

    // Act
    Optional<Superviseur> returned = service.addSuperviseur(expected);

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testLoginEtudiant() {
    // Arrange
    Etudiant expected = getEtudiant();
    when(etudiantRepository.findEtudiantByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);
    when(etudiantRepository.findEtudiantByCourrielIgnoreCaseAndPassword(
            expected.getCourriel(), expected.getPassword()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.login(expected.getCourriel(), expected.getPassword());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testLoginGestionnaire() {
    // Arrange
    Gestionnaire expected = getGestionnaire();
    when(gestionnaireRepository.findGestionnaireByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);
    when(gestionnaireRepository.findGestionnaireByCourrielIgnoreCaseAndPassword(
            expected.getCourriel(), expected.getPassword()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.login(expected.getCourriel(), expected.getPassword());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testLoginMoniteur() {
    // Arrange
    Moniteur expected = getMoniteur();
    when(moniteurRepository.findMoniteurByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);
    when(moniteurRepository.findMoniteurByCourrielIgnoreCaseAndPassword(
            expected.getCourriel(), expected.getPassword()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.login(expected.getCourriel(), expected.getPassword());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testLoginSuperviseur() {
    // Arrange
    Superviseur expected = getSuperviseur();
    when(superviseurRepository.findSuperviseurByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);
    when(superviseurRepository.findSuperviseurByCourrielIgnoreCaseAndPassword(
            expected.getCourriel(), expected.getPassword()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.login(expected.getCourriel(), expected.getPassword());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  void testLoginUserFail() {
    // Arrange

    // Act
    Optional<User> returned = service.login("", "");

    // Assert
    assertThat(returned).isEmpty();
  }

  @Test
  public void testFindEtudiantByEmail() {
    // Arrange
    Etudiant expected = getEtudiant();
    when(etudiantRepository.findEtudiantByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.findUserByCourriel(expected.getCourriel());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testFindGestionnaireByEmail() {
    // Arrange
    Gestionnaire expected = getGestionnaire();
    when(gestionnaireRepository.findGestionnaireByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.findUserByCourriel(expected.getCourriel());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testFindMoniteurByEmail() {
    // Arrange
    Moniteur expected = getMoniteur();
    when(moniteurRepository.findMoniteurByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.findUserByCourriel(expected.getCourriel());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testFindSuperviseurByEmail() {
    // Arrange
    Superviseur expected = getSuperviseur();
    when(superviseurRepository.findSuperviseurByCourrielIgnoreCase(expected.getCourriel()))
        .thenReturn(expected);

    // Act
    Optional<User> returned = service.findUserByCourriel(expected.getCourriel());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(expected));
  }

  @Test
  public void testFindUserByEmailNotFound() {
    // Arrange

    // Act
    Optional<User> returned = service.findUserByCourriel("");

    // Assert
    assertThat(returned).isEmpty();
  }

  @Test
  public void testGetAllEtudiants() {
    // Arrange
    List<Etudiant> expected =
        getEtudiants(); // List etudiant qui ont la session actuelle par defaut
    expected
        .get(0)
        .setSession(
            getSessionNonActuelle()
                .getNomSession()); // Changer un des etudiants a une session differente
    when(etudiantRepository.findAll()).thenReturn(expected);

    // Act
    List<Etudiant> returned = service.getAllEtudiants();

    // Assert
    assertThat(returned)
        .hasSize(
            expected.size()
                - 1); // Verifie que la liste retourne contient juste les etudiants de la session
                      // actuelle
  }

  @Test
  public void testGetAllEtudiantsAllSession() {
    // Arrange
    List<Etudiant> expected =
        getEtudiants(); // List etudiant qui ont la session actuelle par defaut
    when(etudiantRepository.findAll()).thenReturn(expected);

    // Act
    List<Etudiant> returned = service.getAllEtudiantsAllSession();

    // Assert
    //        assertThat(returned).isEqualTo(expected); //Verifie que la liste retourne contient
    // juste les etudiants de la session actuelle
    assertThat(returned)
        .hasSize(
            3); // Verifie que la liste retourne contient juste les etudiants de la session actuelle
  }

  @Test
  public void testGetAllSuperviseurs() {
    // Arrange
    List<Superviseur> expected =
        List.of(
            getSuperviseur(),
            getSuperviseur(),
            getSuperviseur()); // List etudiant qui ont la session actuelle par defaut
    expected
        .get(0)
        .setSession(
            getSessionNonActuelle()
                .getNomSession()); // Changer un des etudiants a une session differente
    when(superviseurRepository.findAll()).thenReturn(expected);

    // Act
    List<Superviseur> returned = service.getAllSuperviseurs();

    // Assert
    assertThat(returned)
        .hasSize(
            expected.size()
                - 1); // Verifie que la liste retourne contient juste les etudiants de la session
                      // actuelle
  }

  @Test
  public void testGetAllSuperviseurAllSession() {
    // Arrange
    List<Superviseur> expected =
        List.of(
            getSuperviseur(),
            getSuperviseur(),
            getSuperviseur()); // List etudiant qui ont la session actuelle par defaut
    when(superviseurRepository.findAll()).thenReturn(expected);

    // Act
    List<Superviseur> returned = service.getAllSuperviseursAllSession();

    // Assert
    assertThat(returned)
        .isEqualTo(
            expected); // Verifie que la liste retourne contient juste les etudiants de la session
                       // actuelle
  }

  @Test
  public void testGetAllEtudiantsWithoutSuperviseur() {
    // Arrange
    List<Etudiant> expected =
        getEtudiants(); // List etudiant qui ont la session actuelle par defaut
    expected
        .get(0)
        .setSession(
            getSessionNonActuelle()
                .getNomSession()); // Changer un des etudiants a une session differente pour assurer
                                   // que la fonction retourne juste les etudiants de la session
                                   // actuelle
    when(etudiantRepository.findAllEtudiantBySuperviseurNull()).thenReturn(expected);

    // Act
    List<Etudiant> returned = service.getAllEtudiantsWithoutSuperviseur();

    // Assert
    assertThat(returned)
        .hasSize(
            expected.size()
                - 1); // Verifie que la liste retourne contient juste les etudiants de la session
                      // actuelle
  }

  @Test
  public void testAddListeEtudiantSuperviseur() {
    // Arrange
    Superviseur superviseur = getSuperviseur();
    superviseur.setId(1);
    List<Etudiant> listEtudiants = getEtudiants();
    List<Etudiant> listEtudiantTestRemove = List.of(getEtudiant());
    listEtudiantTestRemove.get(0).setSuperviseur(superviseur); // Set superviseur to remove
    when(superviseurRepository.findById(any(Integer.class))).thenReturn(Optional.of(superviseur));
    when(etudiantRepository.saveAll(any(List.class))).thenReturn(listEtudiants);
    when(etudiantRepository.findAllEtudiantBySuperviseurId(any(Integer.class)))
        .thenReturn(listEtudiantTestRemove);

    // Act
    Optional<Superviseur> returned =
        service.addListeEtudiantSuperviseur(superviseur.getId(), listEtudiants);
    Optional<Superviseur> returnedTestRemove =
        service.addListeEtudiantSuperviseur(superviseur.getId(), List.of());

    // Assert
    assertThat(returned).isEqualTo(Optional.of(superviseur));
    assertThat(returnedTestRemove).isEqualTo(Optional.of(superviseur));

    assertThat(listEtudiants.get(0).getSuperviseur()).isEqualTo(superviseur);
    assertThat(listEtudiants.get(1).getSuperviseur()).isEqualTo(superviseur);
    assertThat(listEtudiants.get(2).getSuperviseur()).isEqualTo(superviseur);

    assertThat(listEtudiantTestRemove.get(0).getSuperviseur()).isEqualTo(null);
  }

  @Test
  public void testGetAllEtudiantsBySuperviseur() {
    // Arrange
    Superviseur superviseur = getSuperviseur();
    superviseur.setId(1);
    List<Etudiant> listEtudiants = getEtudiants();
    when(etudiantRepository.findAllEtudiantBySuperviseurId(any(Integer.class)))
        .thenReturn(listEtudiants);

    // Act
    List<Etudiant> returned = service.getAllEtudiantsBySuperviseur(superviseur.getId());

    // Assert
    assertThat(returned).isEqualTo(listEtudiants);
  }

  @Test
  public void testGetAllGestionnaires() {
    // Arrange
    List<Gestionnaire> expected = getGestionnaires();
    expected.get(0).setSession("AUT-2021");
    when(gestionnaireRepository.findAll()).thenReturn(expected);

    // Act
    List<Gestionnaire> returned = service.getAllGestionnaires();

    // Assert
    assertThat(returned).hasSize(expected.size());
  }

  private Session getSessionNonActuelle() {
    return new Session("AUT-2021");
  }

  private Etudiant getEtudiant() {
    return new Etudiant(
        "Pascal",
        "Bourgoin",
        "test@test.com",
        "password",
        "123456789",
        "technique",
        "addy 123",
        "123456",
        true,
        true);
  }

  private Gestionnaire getGestionnaire() {
    return new Gestionnaire(
        "John", "McMurffy", "McMurffy@test.com", "password", "123456789", "Informatique");
  }

  private Moniteur getMoniteur() {
    return new Moniteur(
        "John",
        "Doe",
        "john.doe@example.com",
        "pa55w0rd",
        "000111222",
        "Example Enterprises",
        "123 Enterprise Lane");
  }

  private Superviseur getSuperviseur() {
    return new Superviseur(
        "Jane",
        "Smith",
        "jane.smith@example.com",
        "pa55w0rd",
        "123000322",
        "Informatique",
        "Securite");
  }

  private List<Etudiant> getEtudiants() {
    return List.of(getEtudiant(), getEtudiant(), getEtudiant());
  }

  private List<Gestionnaire> getGestionnaires() {
    return List.of(getGestionnaire(), getGestionnaire(), getGestionnaire());
  }
}
