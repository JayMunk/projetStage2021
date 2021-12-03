import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewFormEtudiant from "./component/inscription/inscriptionEtudiant/NewFormEtudiant";
import NewFormSuperviseur from "./component/inscription/inscriptionSuperviseur/NewFormSuperviseur";
import NewFormMoniteur from "./component/inscription/inscriptionMoniteur/NewFormMoniteur";
import NewLoginUser from "./component/loginUser/NewLoginUser";
import Navbar from "./component/navbar/NavbarHTML";
import FormOffre from "./component/Offres/deposeOffreDeStage/FormOffre";
import Offres from "./component/Offres/Offres";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import UserInfo from "./contexts/UserInfo";
import AccountDetails from "./component/AccountDetails/AccountDetails";
import VerificationCV from './component/CV/gestionCV/VerificationCV';
import DropCv from "./component/CV/DropCv/DropCv";
import SuperviseurEtudiantsAssignation from './component/Superviseur/SuperviseurEtudiantsAssignation';
import Dashboard from './component/dashboard/Dashboard';

// import Contrat from './component/contrat/Contrat';
import Rapports from "./component/Rapports/Rapports";
import AllSessionInfo from "./component/allSessionViewer/AllSessionInfo";
import NewContrat from "./component/contrat/newContrat/NewContrat"
import NotificationViewer from "./component/Notification/NotificationViewer";
import EvaluationEtudiant from "./component/evaluations/EvaluationEtudiant";
import AfficherContrat from "./component/contrat/demarrerContrat/AfficherContrat"
import EvaluationEntreprise from "./component/evaluations/EvaluationEntreprise";
import NotFound from "./component/notFound/NotFound";




function App() {
  return (
    <Router>
      <div className="App">
        <UserInfo>
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/"><NewLoginUser /></Route>
              <Route exact path="/etudiant"><NewFormEtudiant /></Route>
              <Route exact path="/superviseur"><NewFormSuperviseur /></Route>
              <Route exact path="/moniteur"><NewFormMoniteur /></Route>
              <Route exact path="/account"><AccountDetails /></Route>
              <Route exact path="/offres"><Offres /></Route>
              <Route exact path="/login"><NewLoginUser /></Route>
              <Route exact path="/newOffre"><FormOffre /></Route>
              <Route exact path="/dropCv"><DropCv /></Route>
              <Route exact path="/gestion/cv"><VerificationCV /></Route>
              <Route exact path="/dashboard"><Dashboard /></Route>
              {/* <Route exact path="/contrat"><Contrat /></Route> */}
              <Route exact path="/gestion/superviseur"><SuperviseurEtudiantsAssignation /></Route>
              <Route exact path="/gestion/allSession"><AllSessionInfo /></Route>
              <Route exact path="/rapports"><Rapports /></Route>
              <Route exact path="/gestion/newContrat"><NewContrat /></Route>
              <Route exact path="/gestion/superviseur"><SuperviseurEtudiantsAssignation /></Route>
              <Route exact path="/gestion/allSession"><AllSessionInfo /></Route>
              <Route exact path="/gestion/newContrat"><NewContrat /></Route>
              <Route exact path="/notification"><NotificationViewer /></Route>
              <Route exact path="/evaluation/etudiant"><EvaluationEtudiant /></Route>
              <Route exact path="/evaluation/entreprise"><EvaluationEntreprise /></Route>
              <Route exact path="/gestion/demarrerContrat"><AfficherContrat /></Route>
              <Route><NotFound /></Route>
            </Switch>
          </div>
        </UserInfo>
      </div>
    </Router>
  );
}

export default App;
