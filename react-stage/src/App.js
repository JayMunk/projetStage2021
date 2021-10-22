import './App.css';
import FormEtudiant from './component/inscriptionEtudiant/FormEtudiant'
import FormSuperviseur from './component/inscriptionSuperviseur/FormSuperviseur';
import FormMoniteur from './component/inscriptionMoniteur/FormMoniteur'
import LoginUser from './component/loginUser/LoginUser';
import Navbar from './component/navbar/NavbarHTML'
import Home from './component/Home/Home';
import FormOffre from "./component/deposeOffreDeStage/FormOffre";
import Offres from './component/Offres/Offres';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import UserInfo, { UserInfoContext } from './contexts/UserInfo';
import AccountDetails from './component/AccountDetails/AccountDetails';


function App() {
  return (
      <Router>
        <div className="App">
          <UserInfo>
            <Navbar />
            <div>
              <Switch>

                <Route exact path="/"><Home /></Route>
                <Route exact path="/etudiant"><FormEtudiant /></Route>
                <Route exact path="/superviseur"><FormSuperviseur /></Route>
                <Route exact path="/moniteur"><FormMoniteur /></Route>
                <Route exact path="/account"><AccountDetails /></Route>
        	      <Route exact path="/offres"><Offres/></Route>
                <Route exact path="/login"><LoginUser /></Route>

                <Route exact path="/newOffre"><FormOffre/></Route>

              </Switch>
            </div>
          </UserInfo>
        </div>

      </Router>
  );
}


export default App;
