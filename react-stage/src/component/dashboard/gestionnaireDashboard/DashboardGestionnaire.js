import React from "react";
import Cvs from "./Cvs";
import Etudiants from "./Etudiants";
import Moniteurs from "./Moniteurs";
import Offres from "./Offres";
import Superviseurs from "./Superviseurs";
import "./DashboardGestionnaireCSS.css";
const DashboardGestionnaire = () => {
  return (
    <body>
      <Etudiants />
      <Cvs />
      <Offres />
      <Moniteurs />
      <Superviseurs />
    </body>
  );
};

export default DashboardGestionnaire;
