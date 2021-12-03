import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import CVService from "../../../services/CVService"
import Table from "react-bootstrap/Table";
import { Col, Row } from 'react-bootstrap'

const DashboardGestionnaireCV = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);

  const [listPendingCV, setListPendingCV] = useState("0");
  const [listAcceptedCV, setListAcceptedCV] = useState("0");
  const [listRejectedCV, setListRejectedCV] = useState("0");
  const [cvs, setCVs] = useState([]);

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const cvsList = await CVService.getAllCVs()
      setCVs(cvsList)
    }
  }, []);

  useEffect(async () => {
    if (cvs !== undefined) {
      console.log(cvs, "test cvs");
      listCV(cvs);
    }
  }, [cvs]);

  const listCV = (listCV) => {
    let pendingCVS = [];
    let acceptedCVS = [];
    let rejectedCVS = [];
    listCV.map((cv) => {
      if (cv.status === "PENDING") {
        pendingCVS.push(cv);
      } else if (cv.status === "REJECTED") {
        rejectedCVS.push(cv);
      } else if (cv.status === "ACCEPTED") {
        acceptedCVS.push(cv);
      }
    });
    setListAcceptedCV(acceptedCVS.length);
    setListPendingCV(pendingCVS.length);
    setListRejectedCV(rejectedCVS.length);
  };

  return (
    <div>
      <Row >
        <Col sm="12" lg="8" className="mx-auto">
          <Table striped bordered hover variant="dark" className="my-4 text-center">
            <thead>
              <tr>
                <th colSpan="4">CV</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Le status du cv</th>
                <th>Le nombre de cv relié à ce statut</th>
              </tr>
              <tr>
                <td colSpan="1">Le nombre d'offres totales</td>
                <td>{cvs.length}</td>
              </tr>
              <tr>
                <td>Le nombre de cv accepté</td>
                <td>{listAcceptedCV}</td>
              </tr>
              <tr>
                <td>Le nombre de cv refusé</td>
                <td>{listRejectedCV}</td>
              </tr>
              <tr>
                <td>Le nombre de cv en attente</td>
                <td>{listPendingCV}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardGestionnaireCV;
