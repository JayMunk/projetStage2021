import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import UserService from "../../../services/UserService"
import Table from "react-bootstrap/Table";
import { Row, Col } from 'react-bootstrap'

const DashboardGestionnaireMoniteurs = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [moniteurs, setMoniteurs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [moniteursVisible, setMoniteursVisible] = useState([]);
  const moniteursPerPage = 3;

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const moniteursList = await UserService.getListAllMoniteurs()
      setMoniteurs(moniteursList)
      setMoniteursVisible(moniteursList.slice(0, moniteursPerPage))
    }
  }, []);

  const updateListeMoniteurs = (pageNumber) => {
    let offset = moniteursPerPage * pageNumber;

    setMoniteursVisible(moniteurs.slice(0 + offset, moniteursPerPage + offset));
  };

  const nextPage = () => {
    if (moniteursPerPage * (pageNumber + 1) >= moniteurs.length) return;
    updateListeMoniteurs(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeMoniteurs(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const moniteursList = moniteursVisible.map((moniteur) => (
    <tr key={moniteur.id.toString()}>
      <td>{moniteur.prenom} {moniteur.nom}</td>
      <td>{moniteur.courriel}</td>
    </tr>
  ));
  return (
    <div>
      <Row >
        <Col sm="12" lg="8" className="mx-auto">
          <Table striped bordered hover variant="dark" className="my-4 text-center">
            <thead>
              <tr>
                <th colSpan="2">Moniteurs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="totalTr">
                <td >Le nombres de moniteurs inscrient</td>
                <td>{moniteurs.length}</td>
              </tr>
              <tr>
                <th>Nom</th>
                <th>Courriel</th>
              </tr>
              {moniteursList}
            </tbody>
          </Table>
          <Row>
            <Col lg="6" sm="6" className="m-auto">
              <button onClick={previousPage} className="btn bg-dark text-white wide-button">
                «
              </button>
            </Col>
            <Col lg="6" sm="6" className="m-auto">
              <button onClick={nextPage} className="btn bg-dark text-white wide-button">
                »
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardGestionnaireMoniteurs;
