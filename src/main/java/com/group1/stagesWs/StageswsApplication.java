package com.group1.stagesWs;

import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.*;
import com.group1.stagesWs.repositories.*;
import com.group1.stagesWs.service.RapportService;
import com.group1.stagesWs.service.SessionService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class StageswsApplication implements CommandLineRunner {

  private final OffreRepository offreRepository;
  private final EtudiantRepository etudiantRepository;
  private final MoniteurRepository moniteurRepository;
  private final GestionnaireRepository gestionnaireRepository;
  private final SuperviseurRepository superviseurRepository;
  private final CVRepository cvRepository;
  private final ContratRepository contratRepository;
  private final EntrevueRepository entrevueRepository;
  private final NotificationRepository notificationRepository;
  private final EvaluationEntrepriseRepository evaluationEntrepriseRepository;
  private final EvaluationEtudiantRepository evaluationEtudiantRepository;

  private final RapportService rapportService;
  private final SessionService sessionService;

  private Session sessionAlternative;
  private Gestionnaire gestionnaire;
  private List<Notification> notificationList;
  private List<Superviseur> superviseurList;
  private List<Etudiant> etudiantList;
  private List<Moniteur> moniteurList;
  private List<Offre> offreList;
  private List<Contrat> contratList;

  public StageswsApplication(
      OffreRepository offreRepository,
      EtudiantRepository etudiantRepository,
      MoniteurRepository moniteurRepository,
      GestionnaireRepository gestionnaireRepository,
      SuperviseurRepository superviseurRepository,
      CVRepository cvRepository,
      EntrevueRepository entrevueRepository,
      NotificationRepository notificationRepository,
      EvaluationEntrepriseRepository evaluationEntrepriseRepository,
      EvaluationEtudiantRepository evaluationEtudiantRepository,
      RapportService rapportService,
      ContratRepository contratRepository,
      SessionService sessionService) {
    this.offreRepository = offreRepository;
    this.etudiantRepository = etudiantRepository;
    this.moniteurRepository = moniteurRepository;
    this.gestionnaireRepository = gestionnaireRepository;
    this.superviseurRepository = superviseurRepository;
    this.cvRepository = cvRepository;
    this.contratRepository = contratRepository;
    this.entrevueRepository = entrevueRepository;
    this.evaluationEntrepriseRepository = evaluationEntrepriseRepository;
    this.evaluationEtudiantRepository = evaluationEtudiantRepository;
    this.rapportService = rapportService;
    this.sessionService = sessionService;
    this.notificationRepository = notificationRepository;
  }

  public static void main(String[] args) {
    SpringApplication.run(StageswsApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    sessionAlternative = new Session("AUT-2021");
    sessionService.newSession(sessionAlternative.getNomSession());
    sessionService.newSession("HIVER-2021");

    notificationList = getListNotifications();
    notificationRepository.saveAll(notificationList);

    superviseurList = getListSuperviseurs();
    superviseurRepository.saveAll(superviseurList);

    etudiantList = getListEtudiants();
    etudiantRepository.saveAll(etudiantList);

    moniteurList = getListMoniteurs();
    moniteurRepository.saveAll(moniteurList);

    gestionnaire = getGestionnaire();
    gestionnaireRepository.save(gestionnaire);

    List<CV> cvList = getListCVs();
    cvRepository.saveAll(cvList);

    offreList = getListOffres();
    offreRepository.saveAll(offreList);

    contratList = getListContrats();
    contratRepository.saveAll(contratList);

    List<Entrevue> entrevueList = getListEntrevues();
    entrevueRepository.saveAll(entrevueList);

    EvaluationEtudiant evaluationEtudiant = getEvaluationEtudiant();
    evaluationEtudiantRepository.save(evaluationEtudiant);

    EvaluationEntreprise evaluationEntreprise = getEvaluationEntreprise();
    evaluationEntrepriseRepository.save(evaluationEntreprise);
  }

  private EvaluationEntreprise getEvaluationEntreprise() {
    EvaluationEntreprise evaluationEntreprise = new EvaluationEntreprise();
    evaluationEntreprise.setNumeroStage(1);
    evaluationEntreprise.setEvaluationGrid(new int[] {0, 1, 2, 3, 4, 3, 2, 1, 0, 1});
    evaluationEntreprise.setCommentaires(
        "L'entreprise n'accorde pas assez d'attention au stagiaire. Aucune formation n'a été effectuée une fois que le stagiaire a commencé. ");
    evaluationEntreprise.setStagePrefere(2);
    evaluationEntreprise.setNombreStagiaires(2);
    evaluationEntreprise.setGarderStagiaire(false);
    evaluationEntreprise.setVariableShifts(false);
    evaluationEntreprise.setHeuresEncadrementParSemaineMois1(0);
    evaluationEntreprise.setHeuresEncadrementParSemaineMois2(0);
    evaluationEntreprise.setHeuresEncadrementParSemaineMois3(0);
    evaluationEntreprise.setContrat(contratList.get(3));
    evaluationEntreprise.setSuperviseur(superviseurList.get(6));

    return evaluationEntreprise;
  }

  private EvaluationEtudiant getEvaluationEtudiant() {
    EvaluationEtudiant evaluationEtudiant = new EvaluationEtudiant();
    evaluationEtudiant.setEvaluationGrid(
        new int[] {0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2});
    evaluationEtudiant.setMoniteurFonction("Aider la stagiaire avec ses travails.");
    evaluationEtudiant.setCommentairesProductivite(
        "Pas beaucoup de productivité avec cet stagiaire.");
    evaluationEtudiant.setCommentairesTravail("Le travail que cet stagiaire fais est adéquat.");
    evaluationEtudiant.setCommentairesRelations("Le stagiaire ne travail pas bon en équipe.");
    evaluationEtudiant.setCommentairesAttitude(
        "Le stagiaire ne veut pas toujours faire son travail.");
    evaluationEtudiant.setCommentairesGlobale("C'est un non.");
    evaluationEtudiant.setCommentairesFormation("Les formations sont bonnes.");
    evaluationEtudiant.setCommuniqueAuStagiaire(false);
    evaluationEtudiant.setHeuresEncadrementParSemaine(20);
    evaluationEtudiant.setGarderStagiaire(false);
    evaluationEtudiant.setContrat(contratList.get(3));

    return evaluationEtudiant;
  }

  private List<Entrevue> getListEntrevues() {
    Entrevue entrevue = new Entrevue();
    entrevue.setId(1);
    entrevue.setTitre("test1");
    entrevue.setNomEntreprise("Umaknow");
    entrevue.setDate(LocalDate.of(2021, 11, 16));
    entrevue.setTime(LocalTime.of(15, 0));
    entrevue.setEtudiant(etudiantList.get(0));
    entrevue.setMoniteur(moniteurList.get(0));
    entrevue.setStatus(Status.PENDING);

    Entrevue entrevue2 = new Entrevue();
    entrevue2.setId(2);
    entrevue2.setTitre("test2");
    entrevue2.setNomEntreprise("desJardins");
    entrevue2.setDate(LocalDate.of(2021, 11, 27));
    entrevue2.setTime(LocalTime.of(11, 30));
    entrevue2.setEtudiant(etudiantList.get(1));
    entrevue2.setMoniteur(moniteurList.get(0));
    entrevue2.setStatus(Status.ACCEPTED);

    return List.of(entrevue, entrevue2);
  }

  private List<Contrat> getListContrats() {
    Contrat contrat1 =
        new Contrat(
            "fournir à l’entreprise tous les renseignements concernant les conditions spécifiques du programme d’études et du programme d’alternance travail-études",
            "embaucher l’élève stagiaire aux conditions précisées dans la présente entente",
            "assumer de façon responsable et sécuritaire, les tâches qui lui sont confiées",
            offreList.get(0),
            etudiantList.get(0),
            moniteurList.get(0));

    Contrat contrat2 =
        new Contrat(
            "collaborer, au besoin, à la definition du plan de stage",
            "mettre en place des mesures d'accueil, d'integration et d'encadrement de l'élève stagiaire",
            "respecter les dates de début et de fin de stage",
            offreList.get(1),
            etudiantList.get(4),
            moniteurList.get(0));
    contrat2.setEtudiantConfirmed(true);
    contrat2.setDateSignatureEtudiant(LocalDate.now());
    contrat2.setMoniteurConfirmed(true);
    contrat2.setDateSignatureMoniteur(LocalDate.now());

    Contrat contrat3 =
        new Contrat(
            "fournir à l’entreprise le formulaire d’attestation de participation à un stage de formation admissible après réception du formulaire « Déclaration relative au crédit d’impôt remboursable pour les stages »",
            "retourner le formulaire « Déclaration des heures travaillées » dûment rempli",
            "référer rapidement au responsable des stages au cégep toute situation problématique affectant le bon déroulement du stage",
            offreList.get(0),
            etudiantList.get(1),
            moniteurList.get(0));

    Contrat contrat4 =
        new Contrat(
            "Verifier que la stage marche bien",
            "Assurer la formation du stagiaire",
            "Faire du bon travail au stage",
            offreList.get(6),
            etudiantList.get(6),
            moniteurList.get(6));
    contrat4.setMoniteurConfirmed(true);
    contrat4.setEtudiantConfirmed(true);
    contrat4.setGestionnaireConfirmed(true);
    contrat4.setDateSignatureGestionnaire(LocalDate.of(2021, 12, 20));
    contrat4.setDateSignatureEtudiant(LocalDate.of(2021, 12, 20));
    contrat4.setDateSignatureGestionnaire(LocalDate.of(2021, 12, 20));

    return List.of(contrat1, contrat2, contrat3, contrat4);
  }

  private List<Offre> getListOffres() {
    Offre offre1 =
        new Offre(
            "TITRE1",
            "DESCRIPTION1",
            "ENTREPRISE1",
            true,
            "1 rue de la riviere Brossard",
            "2021-12-05",
            "2022-3-05",
            13,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            40,
            21);
    offre1.setMoniteur(moniteurList.get(0));
    offre1.setApplicants(Set.of(etudiantList.get(0), etudiantList.get(1), etudiantList.get(2)));
    offre1.setWhitelist(Set.of(etudiantList.get(0), etudiantList.get(1)));

    Offre offre2 =
        new Offre(
            "TITRE2",
            "DESCRIPTION2",
            "ENTREPRISE2",
            true,
            "6 boul lachine Montreal",
            "2021-12-05",
            "2022-3-05",
            13,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            40,
            20);
    offre2.setMoniteur(moniteurList.get(0));
    offre2.setApplicants(Set.of(etudiantList.get(3), etudiantList.get(4)));

    Offre offre3 =
        new Offre(
            "TITRE3",
            "DESCRIPTION3",
            "ENTREPRISE3",
            false,
            "2055 route 206 Laval",
            "2022-1-05",
            "2022-4-05",
            13,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            40,
            17.50);
    offre3.setMoniteur(moniteurList.get(0));
    offre3.setApplicants(Set.of(etudiantList.get(5)));

    Offre offre4 =
        new Offre(
            "TITRE4",
            "DESCRIPTION4",
            "ENTREPRISE4",
            false,
            "1052 montee saint-claude Laprairie",
            "2021-12-05",
            "2022-3-05",
            13,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            40,
            25);
    offre4.setMoniteur(moniteurList.get(0));

    Offre offre5 =
        new Offre(
            "TITRE5",
            "DESCRIPTION5",
            "ENTREPRISE5",
            true,
            "10 boul dagenais Montreal",
            "2021-12-05",
            "2022-3-05",
            13,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            40,
            18.75);
    offre5.setMoniteur(moniteurList.get(0));

    Offre offre6 =
        new Offre(
            "TITRE6",
            "DESCRIPTION6",
            "ENTREPRISE6",
            true,
            "113 lapierre Montreal",
            "2022-12-05",
            "2023-3-05",
            13,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            40,
            20.75);
    offre6.setSession(sessionAlternative.getNomSession());

    Offre offre7 =
        new Offre(
            "Programmeur",
            "Besoin du programmeur fullstack de java et js",
            "ByteCreationLabs",
            true,
            "222 Montée de Liesse",
            "2022-01-11",
            "2022-02-22",
            6,
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            40,
            23);
    offre7.setGestionnaire(gestionnaire);
    offre7.setMoniteur(moniteurList.get(6));
    offre7.setWhitelist(Set.of(etudiantList.get(6)));
    offre7.setApplicants(Set.of(etudiantList.get(6)));

    return List.of(offre1, offre2, offre3, offre4, offre5, offre6, offre7);
  }

  private List<CV> getListCVs() {
    CV cv1 = new CV();
    cv1.setStatus(Status.PENDING);
    cv1.setEtudiant(etudiantList.get(0));
    cv1.setNom("cv-pending.pdf");

    CV cv2 = new CV();
    cv2.setStatus(Status.ACCEPTED);
    cv2.setEtudiant(etudiantList.get(1));
    cv2.setNom("cv-accepted.pdf");

    CV cv3 = new CV();
    cv3.setNom("cv-rejected.pdf");
    cv3.setStatus(Status.REJECTED);
    cv3.setEtudiant(etudiantList.get(1));

    return List.of(cv1, cv2, cv3);
  }

  private Gestionnaire getGestionnaire() {
    return new Gestionnaire(
        "Neil", "Carrie", "neil@gmail.com", "Password1", "879382378", "Informatique");
  }

  private List<Moniteur> getListMoniteurs() {
    Moniteur moniteur =
        new Moniteur(
            "Pascal",
            "Bourgoin",
            "pascal@gmail.com",
            "Password1",
            "2389238",
            "Bob the builder",
            "110 lapierre");

    Moniteur moniteur2 =
        new Moniteur(
            "Joel",
            "Drole",
            "joel@gmail.com",
            "Password1",
            "2389238",
            "Bob the builder",
            "110 lapierre");

    Moniteur moniteur3 =
        new Moniteur(
            "Alex",
            "Bonheur",
            "alex@gmail.com",
            "Password1",
            "2389238",
            "Bob the builder",
            "110 lapierre");

    Moniteur moniteur4 =
        new Moniteur(
            "Kassandra",
            "Cheer",
            "kassandra@gmail.com",
            "Password1",
            "2389238",
            "Bob the builder",
            "110 lapierre");

    Moniteur moniteur5 =
        new Moniteur(
            "Jonathan",
            "Bo",
            "jonathan@gmail.com",
            "Password1",
            "2389238",
            "Bob the builder",
            "110 lapierre");

    Moniteur moniteur6 =
        new Moniteur(
            "Ricky",
            "Boby",
            "ricky@gmail.com",
            "Password1",
            "2389238",
            "Bob the builder",
            "110 lapierre");

    Moniteur moniteur7 =
        new Moniteur(
            "Jordan",
            "Orange",
            "jorange@example.com",
            "Password1",
            "2222222222",
            "ByteCreationLabs",
            "222 Montée de Liesse");

    return List.of(moniteur, moniteur2, moniteur3, moniteur4, moniteur5, moniteur6, moniteur7);
  }

  private List<Etudiant> getListEtudiants() {
    Etudiant etudiant =
        new Etudiant(
            "Mathieu",
            "Felton",
            "mat@gmail.com",
            "Password1",
            "2323232323",
            "Informatique",
            "113 lapierre",
            "1822323",
            true,
            false);
    etudiant.setNotifications(notificationList);
    etudiant.setSuperviseur(superviseurList.get(0));

    Etudiant etudiant2 =
        new Etudiant(
            "Patrick",
            "Star",
            "pat@gmail.com",
            "Password1",
            "123145676",
            "Info",
            "113 lapierre",
            "12345678",
            true,
            true);

    Etudiant etudiant3 =
        new Etudiant(
            "Maelle",
            "Chantier",
            "maelle@gmail.com",
            "Password1",
            "2323232323",
            "Informatique",
            "113 lapierre",
            "18223243",
            true,
            false);
    etudiant3.setSession(sessionAlternative.getNomSession());

    Etudiant etudiant4 =
        new Etudiant(
            "Mahellie",
            "Belle",
            "mahelli@gmail.com",
            "Password1",
            "2323232323",
            "Informatique",
            "113 lapierre",
            "18422323",
            true,
            false);
    etudiant4.setSession(sessionAlternative.getNomSession());

    Etudiant etudiant5 =
        new Etudiant(
            "Emil",
            "Docteur",
            "emil@gmail.com",
            "Password1",
            "2323232323",
            "Informatique",
            "113 lapierre",
            "18224323",
            true,
            false);

    Etudiant etudiant6 =
        new Etudiant(
            "Simon",
            "Roger",
            "simon@gmail.com",
            "Password1",
            "2323232323",
            "Informatique",
            "113 lapierre",
            "18223234",
            true,
            false);

    Etudiant etudiant7 =
        new Etudiant(
            "Aurelie",
            "Jackson",
            "aujack@example.com",
            "Password1",
            "1111111111",
            "Informatique",
            "1299 Rue Sherbrooke",
            "1675732",
            true,
            false);
    etudiant7.setSuperviseur(superviseurList.get(6));

    return List.of(etudiant, etudiant2, etudiant3, etudiant4, etudiant5, etudiant6, etudiant7);
  }

  private List<Superviseur> getListSuperviseurs() {
    Superviseur superviseur =
        new Superviseur(
            "Jeremie",
            "Munger",
            "jeremie@gmail.com",
            "Password1",
            "82308920938",
            "Informatique",
            "fullstack");

    Superviseur superviseur2 =
        new Superviseur(
            "Lynn",
            "Petti",
            "lynn@gmail.com",
            "Password1",
            "82308920938",
            "Informatique",
            "fullstack");

    Superviseur superviseur3 =
        new Superviseur(
            "Eric",
            "Grand",
            "eric@gmail.com",
            "Password1",
            "82308920938",
            "Informatique",
            "fullstack");

    Superviseur superviseur4 =
        new Superviseur(
            "Audrey",
            "Jeune",
            "audrey@gmail.com",
            "Password1",
            "82308920938",
            "Informatique",
            "fullstack");

    Superviseur superviseur5 =
        new Superviseur(
            "Jonaik",
            "Bob",
            "jonaik@gmail.com",
            "Password1",
            "82308920938",
            "Informatique",
            "fullstack");

    Superviseur superviseur6 =
        new Superviseur(
            "Emilie",
            "Loi",
            "emilie@gmail.com",
            "Password1",
            "82308920938",
            "Informatique",
            "fullstack");

    Superviseur superviseur7 =
        new Superviseur(
            "Lonzo",
            "Dagonzo",
            "londagon@example.com",
            "Password1",
            "3333333333",
            "Informatique",
            "Réseautage");

    return List.of(
        superviseur,
        superviseur2,
        superviseur3,
        superviseur4,
        superviseur5,
        superviseur6,
        superviseur7);
  }

  private List<Notification> getListNotifications() {
    Notification notif1 = new Notification("test1", NotifStatus.ALERT);

    Notification notif2 = new Notification("test2", NotifStatus.ALERT);

    Notification notif3 = new Notification("test3", NotifStatus.URGENT);

    return List.of(notif1, notif2, notif3);
  }
}
