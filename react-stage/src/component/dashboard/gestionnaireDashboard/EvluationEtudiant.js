import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import EvaluationService from "../../../services/EvaluationService"

const EvluationEtudiant = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [evaluationsEtudiant, setEvaluationsEtudiant] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [evaluationsEtudiantVisible, setEvaluationsEtudiantVisible] = useState([]);
  const evaluationsEtudiantPerPage = 3;

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const evaluationsEtudiantList = await EvaluationService.getAllEvaluationsEtudiant()
      setEvaluationsEtudiant(evaluationsEtudiantList)
      setEvaluationsEtudiantVisible(evaluationsEtudiantList.slice(0, evaluationsEtudiantPerPage))
    }
  }, []);

  const updateListeEtudiants = (pageNumber) => {
    let offset = evaluationsEtudiantPerPage * pageNumber;

    setEvaluationsEtudiantVisible(evaluationsEtudiant.slice(0 + offset, evaluationsEtudiantPerPage + offset));
  };

  const nextPage = () => {
    if (evaluationsEtudiantPerPage * (pageNumber + 1) >= evaluationsEtudiant.length) return;
    updateListeEtudiants(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeEtudiants(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const etudiantsList = evaluationsEtudiantVisible.map((etudiant) => (
    <tr key={etudiant.id.toString()}>
      <td>{etudiant.prenom}</td>
      <td>{etudiant.nom}</td>
    </tr>
  ));

  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="2">Évaluations étudiants</th>
        </tr>
        <tr className="totalTr">
          <td>Le nombre d'étudiants inscrient</td>
          <td>{evaluationsEtudiant.length}</td>
        </tr>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
        </tr>
        <tbody>{etudiantsList}</tbody>
        <tr>
          <td className="hoverButton">
            <button onClick={previousPage} className="button">
              «
            </button>
          </td>
          <td className="hoverButton">
            <button onClick={nextPage} className="button">
              »
            </button>
          </td>
        </tr>
      </table>
    </>
  );
};

export default EvluationEtudiant;
