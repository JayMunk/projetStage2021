import React from "react";
import Cvs from "./Cvs";
import Etudiants from "./Etudiants";
import Moniteurs from "./Moniteurs";
import Superviseurs from "./Superviseurs";
import OffresDashGestionnaire from "./OffresDashGestionnaire";
const DashboardGestionnaire = () => {
  return (
    <body>
      <div className="topLeft">
        <Etudiants />
      </div>
      <div className="topRight">
        <Cvs />
      </div>
      <div className="center">
        <OffresDashGestionnaire />
      </div>
      <div className="bottomLeft">
        <Moniteurs />
      </div>
      <div className="bottomRight">
        <Superviseurs />
      </div>
    </body>
  );
};

export default DashboardGestionnaire;
