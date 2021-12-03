import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import UserService from "../../../services/UserService"
import Table from "react-bootstrap/Table";
import { Row, Col } from 'react-bootstrap'



const DashboardGestionnaireSuperviseurs = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [superviseurs, setSuperviseurs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [superviseursVisible, setMoniteursVisible] = useState([]);
  const superviseursPerPage = 3;

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const superviseursList = await UserService.getListAllSuperviseurs()
      setSuperviseurs(superviseursList)
      setMoniteursVisible(superviseursList.slice(0, superviseursPerPage))
    }
  }, []);

  const updateListeMoniteurs = (pageNumber) => {
    let offset = superviseursPerPage * pageNumber;

    setMoniteursVisible(
      superviseurs.slice(0 + offset, superviseursPerPage + offset)
    );
  };

  const nextPage = () => {
    if (superviseursPerPage * (pageNumber + 1) >= superviseurs.length) return;
    updateListeMoniteurs(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeMoniteurs(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const superviseursList = superviseursVisible.map((superviseur) => (
    <tr key={superviseur.id.toString()}>
      <td>{superviseur.prenom} {superviseur.nom}</td>
      <td>{superviseur.courriel}</td>
    </tr>
  ));

  return (
    <div>
      <Row >
        <Col sm="12" lg="8" className="mx-auto">
          <Table striped bordered hover variant="dark" className="my-4 text-center">
            <thead>
              <tr>
                <th colSpan="2">Superviseurs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="totalTr">
                <td >Le nombres de superviseur inscrient</td>
                <td>{superviseurs.length}</td>
              </tr>
              <tr>
                <th>Nom</th>
                <th>Courriel</th>
              </tr>
              {superviseursList}
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

export default DashboardGestionnaireSuperviseurs;
