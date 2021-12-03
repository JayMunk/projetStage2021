import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import Table from "react-bootstrap/Table";

const VerificationCVList = ({ cvList, onClickCV }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <AiOutlineClockCircle color="gold" size="48px" />;
      case "ACCEPTED":
        return <AiOutlineCheckCircle color="green" size="48px" />;
      case "REJECTED":
        return <AiOutlineCloseCircle color="red" size="48px" />;
      default:
        return;
    }
  };

  return (
    <div className="container">
      <h1 className="text-white text-center">Liste des CV des étudiants</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nom d'étudiant</th>
            <th>Nom du fichier</th>
            <th>Date soumission</th>
            <th>Statut du CV</th>
          </tr>
        </thead>
        <tbody>
          {cvList.length === 0 ? (
            <tr>
              <td colSpan="4 text-center">Aucun CV à afficher</td>
            </tr>
          ) : (
            cvList.map((cv) => (
              <tr key={cv.id} onClick={() => onClickCV(cv.id)}>
                <td>
                  {cv.etudiant.nom}, {cv.etudiant.prenom}
                </td>
                <td>{cv.nom}</td>
                <td>{cv.dateSoumission}</td>
                <td>{getStatusIcon(cv.status)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default VerificationCVList;
