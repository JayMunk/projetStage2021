import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import EntrevueService from "../../../services/EntrevueService"
import Table from "react-bootstrap/Table";
import { Row, Col } from 'react-bootstrap'


const DashboardGestionnaireEntrevues = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [entrevues, setEntrevues] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [entrevuesVisible, setentrevuesVisible] = useState([]);
  const entrevuesPerPage = 3;

  useEffect(async () => {
    const entrevuesList = await EntrevueService.getAllEntrevues()
    setEntrevues(entrevuesList)
    setentrevuesVisible(entrevuesList.slice(0, entrevuesPerPage))
  }, []);

  const updateListEntrevues = (pageNumber) => {
    let offset = entrevuesPerPage * pageNumber;

    setentrevuesVisible(entrevues.slice(0 + offset, entrevuesPerPage + offset));
  };

  const nextPage = () => {
    if (entrevuesPerPage * (pageNumber + 1) >= entrevues.length) return;
    updateListEntrevues(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListEntrevues(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return "En attente"
      case "ACCEPTED":
        return "Refusé"
      case "REJECTED":
        return "Trouvé stage"
      default:
        return;
    }
  }

  const entrevuesList = entrevuesVisible.map((entrevue) => (
    <tr key={entrevue.id.toString()}>
      <td>{entrevue.titre}</td>
      <td>{entrevue.date}</td>
      <td>{entrevue.time}</td>
      <td>{entrevue.etudiant.prenom} {entrevue.etudiant.nom}</td>
      <td>{entrevue.moniteur.prenom} {entrevue.moniteur.nom}</td>
      <td>{getStatusIcon(entrevue.status)}</td>


    </tr>
  ));

  return (
    <div>
      <Row >
        <Col sm="12" lg="8" className="mx-auto">
          <Table striped bordered hover variant="dark" className="my-4 text-center">
            <thead>
              <tr>
                <th colSpan="6">Entrevues</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td colSpan="3">Le nombre d'entrevues totales</td>
                <td colSpan="3">{entrevues.length}</td>
              </tr>
              <tr>
                <th>Titre</th>
                <th>Date de l'entrevue</th>
                <th>Heure de l'entrevue</th>
                <th>Nom de l'éttudiant</th>
                <th>Nom du moniteur</th>
                <th>Réponse</th>
              </tr>
              {entrevuesList}
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

export default DashboardGestionnaireEntrevues;
