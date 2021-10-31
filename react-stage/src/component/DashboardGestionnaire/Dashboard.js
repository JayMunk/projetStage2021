import React from "react";
import Cvs from "./Cvs";
import Etudiants from "./Etudiants";
import Moniteurs from "./Moniteurs";
import Offres from "./Offres";
import Superviseurs from "./Superviseurs";
import "./DashboardGestionnaireCSS.css";
const Dashboard = () => {
  return (
    <>
      <div className="topLeft">
        <Etudiants />
      </div>
      <div className="topRight">
        <Cvs />
      </div>
      <div className="center">
        <Offres />
      </div>
      <div className="bottomLeft">
        <Moniteurs />
      </div>
      <div className="bottomRight">
        <Superviseurs />
      </div>
    </>
  );
};

export default Dashboard;
