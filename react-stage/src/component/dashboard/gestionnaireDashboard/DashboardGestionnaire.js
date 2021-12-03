import { React } from "react"
import Cvs from "./Cvs"
import Etudiants from "./Etudiants"
import Moniteurs from "./Moniteurs"
import Superviseurs from "./Superviseurs"
import Entrevues from "./Entrevues"
import Contrats from "./Contrats"
import EvulationEntreprise from "./EvulationEntreprise"
import EvluationEtudiant from "./EvluationEtudiant"

import "./DashboardGestionnaireCSS.css";
import OffresDashGestionnaire from "./OffresDashGestionnaire"
const DashboardGestionnaire = () => {

  return (
    <body id="body">
      <div id="centerDashboardGestionnaire">
        <Etudiants />
        <Cvs />
      </div>
      <div className="center">
        <OffresDashGestionnaire />
      </div>
      <div className="bottomLeft">
        <Moniteurs />
        <Superviseurs />
        <Entrevues />
        <Contrats />
        <EvulationEntreprise />
        <EvluationEtudiant />
      </div>
    </body>
  );
};

export default DashboardGestionnaire;
