import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import EvaluationService from "../../../services/EvaluationService"

const EvulationEntreprise = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [evaluationsEntrepreprise, setEvaluationsEntrepreprise] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [evaluationsEntreprepriseVisible, setEvaluationsEntreprepriseVisible] = useState([]);
  const evaluationsEntrepreprisePerPage = 3;

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const evaluationsEntrepriseList = await EvaluationService.getAllEvaluationsEntreprise()
      setEvaluationsEntrepreprise(evaluationsEntrepriseList)
      setEvaluationsEntreprepriseVisible(evaluationsEntrepriseList.slice(0, evaluationsEntrepreprisePerPage))
    }
  }, []);

  const updateListeEtudiants = (pageNumber) => {
    let offset = evaluationsEntrepreprisePerPage * pageNumber;

    setEvaluationsEntreprepriseVisible(evaluationsEntrepreprise.slice(0 + offset, evaluationsEntrepreprisePerPage + offset));
  };

  const nextPage = () => {
    if (evaluationsEntrepreprisePerPage * (pageNumber + 1) >= evaluationsEntrepreprise.length) return;
    updateListeEtudiants(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeEtudiants(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const etudiantsList = evaluationsEntreprepriseVisible.map((etudiant) => (
    <tr key={etudiant.id.toString()}>
      <td>{etudiant.prenom}</td>
      <td>{etudiant.nom}</td>
    </tr>
  ));

  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="2">Évaluations Entreprise</th>
        </tr>
        <tr className="totalTr">
          <td >Le nombre d'étudiants inscrient</td>
          <td>{evaluationsEntrepreprise.length}</td>
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

export default EvulationEntreprise;
