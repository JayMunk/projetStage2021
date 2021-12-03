import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import UserService from '../../services/UserService';

const AllSessionEtudiant = ({ reloadList, getListForSpecificSession, elementsPerPage }) => {
  const [etudiants, setEtudiants] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [etudiantsVisible, setEtudiantsVisible] = useState([]);

  useEffect(async () => {
    const etudiants = await UserService.getListAllEtudiantsAllSession()
    setEtudiants(getListForSpecificSession(etudiants));
    setEtudiantsVisible(getListForSpecificSession(etudiants).slice(0, elementsPerPage));
  }, []);

  useEffect(async () => {
    const etudiants = await UserService.getListAllEtudiantsAllSession()
    setEtudiants(getListForSpecificSession(etudiants));
    setEtudiantsVisible(getListForSpecificSession(etudiants).slice(0, elementsPerPage));
  }, [reloadList]);



  const updateListeEtudiants = (pageNumber) => {
    let offset = elementsPerPage * pageNumber;

    setEtudiantsVisible(etudiants.slice(0 + offset, elementsPerPage + offset));
  };

  const nextPage = () => {
    if (elementsPerPage * (pageNumber + 1) >= etudiants.length) return;
    updateListeEtudiants(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeEtudiants(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const etudiantsList = etudiantsVisible.map((etudiant) => (
    <tr key={etudiant.id}>
      <td>{etudiant.prenom} {etudiant.nom}</td>
      <td>{etudiant.courriel}</td>
      <td>{etudiant.session}</td>
    </tr>
  ));

  return (
    <div>
      <table className="table table-dark">
        <tr>
          <th colSpan="6">Étudiants All Sessions</th>
        </tr>
        <tr>
          <th>Prénom/Nom</th>
          <th>Courriel</th>
          <th>Session</th>
        </tr>
        <tbody>{etudiantsList}</tbody>
      </table>
      {etudiantsVisible.length == 0 &&
        <h3 className="text-center text-warning">Aucun etudiant visible pour la sélection choisie</h3>
      }
      <Row className="mb-4">
        <Col lg="6" sm="6" className="hoverButton m-auto">
          <button onClick={previousPage} className="btn bg-dark text-white wide-button">
            «
          </button>
        </Col>
        <Col lg="6" sm="6" className="hoverButton m-auto">
          <button onClick={nextPage} className="btn bg-dark text-white wide-button">
            »
          </button>
        </Col>
      </Row>
      <br />
    </div>
  );
}

export default AllSessionEtudiant
