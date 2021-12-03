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
      <h1 className="text-center mt-4 mb-4" style={{ color: "#DBB2FF" }}>Liste des CV des étudiants</h1>
      <h5 className="text-center mt-4 mb-4 text-warning">Cliquez sur n'importe quel des entrées dans la liste pour le visionner.</h5>

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
            <tr className="text-center">
              <td colSpan="4" className="text-warning">
                Aucun CV à afficher
              </td>
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
