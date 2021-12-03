import { React, useContext } from "react";
import DashboardGestionnaireCV from "./DashboardGestionnaireCV";
import DashboardGestionnaireEtudiants from "./DashboardGestionnaireEtudiants";
import DashboardGestionnaireMoniteurs from "./DashboardGestionnaireMoniteurs";
import DashboardGestionnaireOffres from "./DashboardGestionnaireOffres";
import DashboardGestionnaireSuperviseurs from "./DashboardGestionnaireSuperviseurs";
import DashboardGestionnaireEntrevues from "./DashboardGestionnaireEntrevues";
import DashboardGestionnaireContrats from "./DashboardGestionnaireContrats";

const DashboardGestionnaire = () => {

  return (
    <body id="body">
      <div id="centerDashboardGestionnaire">
        <DashboardGestionnaireEtudiants />
        <DashboardGestionnaireCV />
        <DashboardGestionnaireMoniteurs />
        <DashboardGestionnaireSuperviseurs />
        <DashboardGestionnaireOffres />
        <DashboardGestionnaireEntrevues />
        <DashboardGestionnaireContrats />
      </div>
    </body>
  );
};

export default DashboardGestionnaire;
