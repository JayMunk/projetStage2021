import { React, useEffect, useContext } from "react";
import Cvs from "./Cvs";
import Etudiants from "./Etudiants";
import Moniteurs from "./Moniteurs";
import Offres from "./Offres";
import Superviseurs from "./Superviseurs";
import Entrevues from "./Entrevues";
import Contrats from "./Contrats";
import { UserInfoContext } from "../../../contexts/UserInfo";

import "./DashboardGestionnaireCSS.css";
const DashboardGestionnaire = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);




  return (
    <body id="body">
      <div id="centerDashboardGestionnaire">
        <Etudiants />
        <Cvs />
        <Moniteurs />
        <Superviseurs />
        <Offres />
        <Entrevues />
        <Contrats />
      </div>
    </body>
  );
};

export default DashboardGestionnaire;
