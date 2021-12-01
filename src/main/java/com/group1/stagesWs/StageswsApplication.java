package com.group1.stagesWs;

import com.group1.stagesWs.enums.NotifStatus;
import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.enums.UserType;
import com.group1.stagesWs.model.*;
import com.group1.stagesWs.repositories.CVRepository;
import com.group1.stagesWs.repositories.ContratRepository;
import com.group1.stagesWs.repositories.EntrevueRepository;
import com.group1.stagesWs.repositories.EtudiantRepository;
import com.group1.stagesWs.repositories.EvaluationEntrepriseRepository;
import com.group1.stagesWs.repositories.EvaluationEtudiantRepository;
import com.group1.stagesWs.repositories.GestionnaireRepository;
import com.group1.stagesWs.repositories.MoniteurRepository;
import com.group1.stagesWs.repositories.NotificationRepository;
import com.group1.stagesWs.repositories.OffreRepository;
import com.group1.stagesWs.repositories.SuperviseurRepository;
import com.group1.stagesWs.service.RapportService;
import com.group1.stagesWs.service.SessionService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
    Session sessionAlternative = new Session("AUT-2021");
    sessionService.newSession(sessionAlternative.getNomSession());
    sessionService.newSession("HIVER-2021");

    Notification notif1 = new Notification("test1", NotifStatus.ALERT);
    Notification notif2 = new Notification("test2", NotifStatus.ALERT);
    Notification notif3 = new Notification("test3", NotifStatus.URGENT);

    notificationRepository.saveAll(List.of(notif1, notif2, notif3));

    Superviseur superviseur = new Superviseur();
    superviseur.setPrenom("Jeremie");
    superviseur.setNom("Munger");
    superviseur.setCourriel("jeremie@gmail.com");
    superviseur.setPassword("Password1");
    superviseur.setNumTelephone("82308920938");
    superviseur.setRole(UserType.SUPERVISEUR);
    superviseur.setDepartement("Informatique");
    superviseur.setSpecialite("fullstack");
    superviseurRepository.save(superviseur);

    Superviseur superviseur2 = new Superviseur();
    superviseur2.setPrenom("Lynn");
    superviseur2.setNom("Petti");
    superviseur2.setCourriel("lynn@gmail.com");
    superviseur2.setPassword("Password1");
    superviseur2.setNumTelephone("82308920938");
    superviseur2.setRole(UserType.SUPERVISEUR);
    superviseur2.setDepartement("Informatique");
    superviseur2.setSpecialite("fullstack");
    superviseurRepository.save(superviseur2);

    Superviseur superviseur3 = new Superviseur();
    superviseur3.setPrenom("Eric");
    superviseur3.setNom("Grand");
    superviseur3.setCourriel("eric@gmail.com");
    superviseur3.setPassword("Password1");
    superviseur3.setNumTelephone("82308920938");
    superviseur3.setRole(UserType.SUPERVISEUR);
    superviseur3.setDepartement("Informatique");
    superviseur3.setSpecialite("fullstack");
    superviseurRepository.save(superviseur3);

    Superviseur superviseur4 = new Superviseur();
    superviseur4.setPrenom("Audrey");
    superviseur4.setNom("Jeune");
    superviseur4.setCourriel("audrey@gmail.com");
    superviseur4.setPassword("Password1");
    superviseur4.setNumTelephone("82308920938");
    superviseur4.setRole(UserType.SUPERVISEUR);
    superviseur4.setDepartement("Informatique");
    superviseur4.setSpecialite("fullstack");
    superviseurRepository.save(superviseur4);

    Superviseur superviseur5 = new Superviseur();
    superviseur5.setPrenom("Jonaik");
    superviseur5.setNom("Bob");
    superviseur5.setCourriel("jonaik@gmail.com");
    superviseur5.setPassword("Password1");
    superviseur5.setNumTelephone("82308920938");
    superviseur5.setRole(UserType.SUPERVISEUR);
    superviseur5.setDepartement("Informatique");
    superviseur5.setSpecialite("fullstack");
    superviseurRepository.save(superviseur5);

    Superviseur superviseur6 = new Superviseur();
    superviseur6.setPrenom("Emilie");
    superviseur6.setNom("Loi");
    superviseur6.setCourriel("emilie@gmail.com");
    superviseur6.setPassword("Password1");
    superviseur6.setNumTelephone("82308920938");
    superviseur6.setRole(UserType.SUPERVISEUR);
    superviseur6.setDepartement("Informatique");
    superviseur6.setSpecialite("fullstack");
    superviseurRepository.save(superviseur6);

    Etudiant etudiant = new Etudiant();
    etudiant.setPrenom("Mathieu");
    etudiant.setNom("Felton");
    etudiant.setCourriel("mat@gmail.com");
    etudiant.setPassword("Password1");
    etudiant.setNumTelephone("2323232323");
    etudiant.setRole(UserType.ETUDIANT);
    etudiant.setProgramme("Informatique");
    etudiant.setAdresse("113 lapierre");
    etudiant.setNumMatricule("1822323");
    etudiant.setHasLicense(true);

    etudiant.setNotifications(List.of(notif1, notif2, notif3));
    etudiant.setSuperviseur(superviseur);
    etudiantRepository.save(etudiant);

    Etudiant etudiant2 = new Etudiant();
    etudiant2.setPrenom("Patrick");
    etudiant2.setNom("Star");
    etudiant2.setCourriel("pat@gmail.com");
    etudiant2.setPassword("Password1");
    etudiant2.setNumTelephone("123145676");
    etudiant2.setRole(UserType.ETUDIANT);
    etudiant2.setProgramme("Info");
    etudiant2.setAdresse("113 lapierre");
    etudiant2.setNumMatricule("12345678");
    etudiant2.setHasLicense(true);
    etudiant2.setHasVoiture(true);
    etudiantRepository.save(etudiant2);

    Etudiant etudiant3 = new Etudiant();
    etudiant3.setPrenom("Maelle");
    etudiant3.setNom("Chantier");
    etudiant3.setCourriel("maelle@gmail.com");
    etudiant3.setPassword("Password1");
    etudiant3.setNumTelephone("2323232323");
    etudiant3.setRole(UserType.ETUDIANT);
    etudiant3.setProgramme("Informatique");
    etudiant3.setAdresse("113 lapierre");
    etudiant3.setNumMatricule("18223243");
    etudiant3.setHasLicense(true);
    etudiant3.setSession(sessionAlternative.getNomSession());
    etudiantRepository.save(etudiant3);

    Etudiant etudiant4 = new Etudiant();
    etudiant4.setPrenom("Mahellie");
    etudiant4.setNom("Belle");
    etudiant4.setCourriel("mahelli@gmail.com");
    etudiant4.setPassword("Password1");
    etudiant4.setNumTelephone("2323232323");
    etudiant4.setRole(UserType.ETUDIANT);
    etudiant4.setProgramme("Informatique");
    etudiant4.setAdresse("113 lapierre");
    etudiant4.setNumMatricule("18422323");
    etudiant4.setHasLicense(true);
    etudiant4.setSession(sessionAlternative.getNomSession());
    etudiantRepository.save(etudiant4);

    Etudiant etudiant5 = new Etudiant();
    etudiant5.setPrenom("Emil");
    etudiant5.setNom("Docteur");
    etudiant5.setCourriel("emil@gmail.com");
    etudiant5.setPassword("Password1");
    etudiant5.setNumTelephone("2323232323");
    etudiant5.setRole(UserType.ETUDIANT);
    etudiant5.setProgramme("Informatique");
    etudiant5.setAdresse("113 lapierre");
    etudiant5.setNumMatricule("18224323");
    etudiant5.setHasLicense(true);
    etudiantRepository.save(etudiant5);

    Etudiant etudiant6 = new Etudiant();
    etudiant6.setPrenom("Simon");
    etudiant6.setNom("Roger");
    etudiant6.setCourriel("simon@gmail.com");
    etudiant6.setPassword("Password1");
    etudiant6.setNumTelephone("2323232323");
    etudiant6.setRole(UserType.ETUDIANT);
    etudiant6.setProgramme("Informatique");
    etudiant6.setAdresse("113 lapierre");
    etudiant6.setNumMatricule("18223234");
    etudiant6.setHasLicense(true);
    etudiantRepository.save(etudiant6);

    Moniteur moniteur = new Moniteur();
    moniteur.setPrenom("Pascal");
    moniteur.setNom("Bourgoin");
    moniteur.setCourriel("pascal@gmail.com");
    moniteur.setPassword("Password1");
    moniteur.setNumTelephone("2389238");
    moniteur.setRole(UserType.MONITEUR);
    moniteur.setNomEntreprise("Bob the builder");
    moniteur.setAdresseEntreprise("110 lapierre");
    moniteurRepository.save(moniteur);

    Moniteur moniteur2 = new Moniteur();
    moniteur2.setPrenom("Joel");
    moniteur2.setNom("Drole");
    moniteur2.setCourriel("joel@gmail.com");
    moniteur2.setPassword("Password1");
    moniteur2.setNumTelephone("2389238");
    moniteur2.setRole(UserType.MONITEUR);
    moniteur2.setNomEntreprise("Bob the builder");
    moniteur2.setAdresseEntreprise("110 lapierre");
    moniteurRepository.save(moniteur2);

    Moniteur moniteur3 = new Moniteur();
    moniteur3.setPrenom("Alex");
    moniteur3.setNom("Bonheur");
    moniteur3.setCourriel("alex@gmail.com");
    moniteur3.setPassword("Password1");
    moniteur3.setNumTelephone("2389238");
    moniteur3.setRole(UserType.MONITEUR);
    moniteur3.setNomEntreprise("Bob the builder");
    moniteur3.setAdresseEntreprise("110 lapierre");
    moniteurRepository.save(moniteur3);

    Moniteur moniteur4 = new Moniteur();
    moniteur4.setPrenom("Kassandra");
    moniteur4.setNom("Cheer");
    moniteur4.setCourriel("kassandra@gmail.com");
    moniteur4.setPassword("Password1");
    moniteur4.setNumTelephone("2389238");
    moniteur4.setRole(UserType.MONITEUR);
    moniteur4.setNomEntreprise("Bob the builder");
    moniteur4.setAdresseEntreprise("110 lapierre");
    moniteurRepository.save(moniteur4);

    Moniteur moniteur5 = new Moniteur();
    moniteur5.setPrenom("Jonathan");
    moniteur5.setNom("Bo");
    moniteur5.setCourriel("jonathan@gmail.com");
    moniteur5.setPassword("Password1");
    moniteur5.setNumTelephone("2389238");
    moniteur5.setRole(UserType.MONITEUR);
    moniteur5.setNomEntreprise("Bob the builder");
    moniteur5.setAdresseEntreprise("110 lapierre");
    moniteurRepository.save(moniteur5);

    Moniteur moniteur6 = new Moniteur();
    moniteur6.setPrenom("Ricky");
    moniteur6.setNom("Boby");
    moniteur6.setCourriel("ricky@gmail.com");
    moniteur6.setPassword("Password1");
    moniteur6.setNumTelephone("2389238");
    moniteur6.setRole(UserType.MONITEUR);
    moniteur6.setNomEntreprise("Bob the builder");
    moniteur6.setAdresseEntreprise("110 lapierre");
    moniteurRepository.save(moniteur6);

    Gestionnaire gestionnaire = new Gestionnaire();
    gestionnaire.setPrenom("Neil");
    gestionnaire.setNom("Carrie");
    gestionnaire.setCourriel("neil@gmail.com");
    gestionnaire.setPassword("Password1");
    gestionnaire.setNumTelephone("879382378");
    gestionnaire.setRole(UserType.GESTIONNAIRE);
    gestionnaire.setDepartement("Informatique");
    gestionnaireRepository.save(gestionnaire);

    CV cv1 = new CV();
    cv1.setStatus(Status.PENDING);
    cv1.setEtudiant(etudiant);
    cv1.setNom("cv-pending.pdf");

    CV cv2 = new CV();
    cv2.setStatus(Status.ACCEPTED);
    cv2.setEtudiant(etudiant2);
    cv2.setNom("cv-accepted.pdf");

    CV cv3 = new CV();
    cv3.setNom("cv-rejected.pdf");
    cv3.setStatus(Status.REJECTED);
    cv3.setEtudiant(etudiant2);

    cvRepository.saveAll(List.of(cv1, cv2, cv3));

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
            "9:00 à 5:00",
            40,
            21);
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
            "9:00 à 5:00",
            40,
            20);
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
            "9:00 à 5:00",
            40,
            17.50);
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
            "9:00 à 5:00",
            40,
            25);
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
            "9:00 à 5:00",
            40,
            18.75);
    offre1.setMoniteur(moniteur);
    offre2.setMoniteur(moniteur);
    offre3.setMoniteur(moniteur);
    offre4.setMoniteur(moniteur);
    offre5.setMoniteur(moniteur);
    offre1.setApplicants(Set.of(etudiant, etudiant2, etudiant3));
    offre2.setApplicants(Set.of(etudiant4, etudiant5));
    offre3.setApplicants(Set.of(etudiant6));
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
            "9:00 à 5:00",
            40,
            20.75);
    offre6.setSession(sessionAlternative.getNomSession());

    offre1.setWhitelist(Set.of(etudiant));
    offreRepository.saveAll(List.of(offre1, offre2, offre3, offre4, offre5, offre6));

    Contrat contrat2 =
        new Contrat(
            "collaborer, au besoin, a la definition du plan de stage",
            "mettre en place des mesures d accueil, d integration et d encadrement de l eleve stagiaire",
            "respecter les dates de debut et de fin de stage",
            offre2,
            etudiant5,
            moniteur);
    contrat2.setEtudiantConfirmed(true);
    contrat2.setMoniteurConfirmed(true);
    contratRepository.save(contrat2);
    Entrevue entrevue = new Entrevue();
    entrevue.setId(1);
    entrevue.setTitre("test1");
    entrevue.setNomEntreprise("Umaknow");
    entrevue.setDate(LocalDate.of(2021, 11, 16));
    entrevue.setTime(LocalTime.of(15, 00));
    entrevue.setEtudiant(etudiant);
    entrevue.setMoniteur(moniteur);
    entrevue.setStatus(Status.PENDING);

    Entrevue entrevue2 = new Entrevue();
    entrevue2.setId(2);
    entrevue2.setTitre("test2");
    entrevue2.setNomEntreprise("desJardins");
    entrevue2.setDate(LocalDate.of(2021, 11, 27));
    entrevue2.setTime(LocalTime.of(11, 30));
    entrevue2.setEtudiant(etudiant2);
    entrevue2.setMoniteur(moniteur);
    entrevue2.setStatus(Status.ACCEPTED);

    entrevueRepository.saveAll(List.of(entrevue, entrevue2));

    createEvaluationDemoEntities(gestionnaire); // passing gestionnaire as parameter as there is only one gestionnaire
  }

  private void createEvaluationDemoEntities(Gestionnaire gestionnaire) {
    Superviseur superviseur = new Superviseur();
    superviseur.setPrenom("Lonzo");
    superviseur.setNom("Dagonzo");
    superviseur.setCourriel("londagon@example.com");
    superviseur.setPassword("Password1");
    superviseur.setNumTelephone("3333333333");
    superviseur.setDepartement("Informatique");
    superviseur.setSpecialite("Réseautage");
    superviseurRepository.save(superviseur);

    Etudiant etudiant = new Etudiant();
    etudiant.setPrenom("Aurelie");
    etudiant.setNom("Jackson");
    etudiant.setCourriel("aujack@example.com");
    etudiant.setPassword("Password1");
    etudiant.setNumTelephone("1111111111");
    etudiant.setProgramme("Informatique");
    etudiant.setAdresse("1299 Rue Sherbrooke");
    etudiant.setNumMatricule("1675732");
    etudiant.setHasLicense(true);
    etudiant.setSuperviseur(superviseur);
    etudiantRepository.save(etudiant);

    Moniteur moniteur = new Moniteur();
    moniteur.setPrenom("Jordan");
    moniteur.setNom("Orange");
    moniteur.setCourriel("jorange@example.com");
    moniteur.setPassword("Password1");
    moniteur.setNumTelephone("2222222222");
    moniteur.setNomEntreprise("ByteCreationLabs");
    moniteur.setAdresseEntreprise("222 Montée de Liesse");
    moniteurRepository.save(moniteur);

    Offre offre = new Offre();
    offre.setTitre("Programmeur");
    offre.setDescription("Besoin du programmeur fullstack de java et js");
    offre.setEntreprise("ByteCreationLabs");
    offre.setValid(true);
    offre.setAdresse("222 Montée de Liesse");
    offre.setDateDebut("2022-01-11");
    offre.setDateFin("2022-02-22");
    offre.setNbTotalSemaine(6);
    offre.setHoraire("9 à 5, Lundi à Vendredi");
    offre.setNbTotalHeuresParSemaine(40);
    offre.setTauxHoraire(23);
    offre.setGestionnaire(gestionnaire);
    offre.setMoniteur(moniteur);
    offre.setWhitelist(Set.of(etudiant));
    offre.setApplicants(Set.of(etudiant));
    offreRepository.save(offre);

    Contrat contrat = new Contrat();
    contrat.setMoniteurConfirmed(true);
    contrat.setEtudiantConfirmed(true);
    contrat.setGestionnaireConfirmed(true);
    contrat.setDateSignatureGestionnaire(LocalDate.of(2021, 12, 20));
    contrat.setDateSignatureEtudiant(LocalDate.of(2021, 12, 20));
    contrat.setDateSignatureGestionnaire(LocalDate.of(2021, 12, 20));
    contrat.setCollegeEngagement("Verifier que la stage marche bien");
    contrat.setEntrepriseEngagement("Assurer la formation du stagiaire");
    contrat.setEtudiantEngagement("Faire du bon travail au stage");
    contrat.setOffre(offre);
    contrat.setEtudiant(etudiant);
    contrat.setMoniteur(moniteur);
    contratRepository.save(contrat);

    EvaluationEtudiant evaluationEtudiant = new EvaluationEtudiant();
    evaluationEtudiant.setEvaluationGrid(new char[]{0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2});
    evaluationEtudiant.setMoniteurFonction("Aider la stagiaire avec ses travails.");
    evaluationEtudiant.setCommentairesProductivite("Pas beaucoup de productivité avec cet stagiaire.");
    evaluationEtudiant.setCommentairesTravail("Le travail que cet stagiaire fais est adéquat.");
    evaluationEtudiant.setCommentairesRelations("Le stagiaire ne travail pas bon en équipe.");
    evaluationEtudiant.setCommentairesAttitude("Le stagiaire ne veut pas toujours faire son travail.");
    evaluationEtudiant.setCommentairesGlobale("C'est un non.");
    evaluationEtudiant.setCommentairesFormation("Les formations sont bonnes.");
    evaluationEtudiant.setCommuniqueAuStagiaire(false);
    evaluationEtudiant.setHeuresEncadrementParSemaine(20);
    evaluationEtudiant.setGarderStagiaire(false);
    evaluationEtudiant.setContrat(contrat);
    evaluationEtudiantRepository.save(evaluationEtudiant);

    EvaluationEntreprise evaluationEntreprise = new EvaluationEntreprise();
    evaluationEntreprise.setNumeroStage(1);
    evaluationEntreprise.setEvaluationGrid(new char[]{0, 1, 2, 3, 4, 3, 2, 1, 0, 1});
    evaluationEntreprise.setCommentaires("L'entreprise n'accorde pas assez d'attention au stagiaire. Aucune formation n'a été effectuée une fois que le stagiaire a commencé. ");
    evaluationEntreprise.setStagePrefere(2);
    evaluationEntreprise.setNombreStagiaires(2);
    evaluationEntreprise.setGarderStagiaire(false);
    evaluationEntreprise.setVariableShifts(false);
    evaluationEntreprise.setHeuresEncadrementParSemaineMois1(0);
    evaluationEntreprise.setHeuresEncadrementParSemaineMois2(0);
    evaluationEntreprise.setHeuresEncadrementParSemaineMois3(0);
    evaluationEntreprise.setContrat(contrat);
    evaluationEntreprise.setSuperviseur(superviseur);
    evaluationEntrepriseRepository.save(evaluationEntreprise);
  }
}
