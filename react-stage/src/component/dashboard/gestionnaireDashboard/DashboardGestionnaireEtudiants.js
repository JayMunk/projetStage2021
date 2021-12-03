import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import UserService from "../../../services/UserService"
import Table from "react-bootstrap/Table";
import { Col, Row } from 'react-bootstrap'

const DashboardGestionnaireEtudiants = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [etudiants, setEtudiants] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [etudiantsVisible, setEtudiantsVisible] = useState([]);
  const etudiantsPerPage = 3;

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const etudiantsList = await UserService.getListAllEtudiants()
      setEtudiants(etudiantsList)
      setEtudiantsVisible(etudiantsList.slice(0, etudiantsPerPage))
    }
  }, []);

  const updateListeEtudiants = (pageNumber) => {
    let offset = etudiantsPerPage * pageNumber;

    setEtudiantsVisible(etudiants.slice(0 + offset, etudiantsPerPage + offset));
  };

  const nextPage = () => {
    if (etudiantsPerPage * (pageNumber + 1) >= etudiants.length) return;
    updateListeEtudiants(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeEtudiants(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const etudiantsList = etudiantsVisible.map((etudiant) => (
    <tr key={etudiant.id.toString()}>
      <td>{etudiant.prenom} {etudiant.nom}</td>
      <td>{etudiant.courriel}</td>
    </tr>
  ));

  return (
    <div>
      <Row >
        <Col sm="12" lg="8" className="mx-auto">
          <Table striped bordered hover variant="dark" className="my-4 text-center">
            <thead>
              <tr>
                <th colSpan="2">Étudiants</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Le nombre d'étudiants inscrient</td>
                <td>{etudiants.length}</td>
              </tr>
              <tr>
                <th>Nom</th>
                <th>Courriel</th>
              </tr>{etudiantsList}
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

export default DashboardGestionnaireEtudiants;
