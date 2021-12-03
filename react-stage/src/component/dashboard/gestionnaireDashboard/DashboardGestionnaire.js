
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
        <br />
        <br />

        <DashboardGestionnaireCV />
        <br />
        <br />

        <DashboardGestionnaireMoniteurs />
        <br />
        <br />

        <DashboardGestionnaireSuperviseurs />
        <br />
        <br />

        <DashboardGestionnaireOffres />
        <br />
        <br />

        <DashboardGestionnaireEntrevues />
        <br />
        <br />

        <DashboardGestionnaireContrats />
        <br />
        <br />
      </div>
    </body>
  );
};

export default DashboardGestionnaire;
