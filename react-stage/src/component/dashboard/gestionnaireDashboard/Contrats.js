import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import ContratService from "../../../services/ContratService"

const Contrats = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [contrats, setContrats] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [contratsVisible, setContratsVisible] = useState([]);
  const contratsPerPage = 3;

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const contratsList = await ContratService.getAllContrats()
      setContrats(contratsList)
      setContratsVisible(contratsList.slice(0, contratsPerPage))
    }
  }, []);

  const updateListeEtudiants = (pageNumber) => {
    let offset = contratsPerPage * pageNumber;

    setContratsVisible(contrats.slice(0 + offset, contratsPerPage + offset));
  };

  const nextPage = () => {
    if (contratsPerPage * (pageNumber + 1) >= contrats.length) return;
    updateListeEtudiants(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeEtudiants(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const contratsList = contratsVisible.map((contrat) => (
    <tr key={contrat.id.toString()}>
      <td>{contrat.offre.titre}</td>
      <td>{contrat.etudiant.prenom} {contrat.etudiant.nom}</td>
      <td>{contrat.moniteur.prenom} {contrat.moniteur.nom}</td>
      <td>{contrat.dateSignatureEtudiant == null ? "Aucune" : contrat.dateSignatureEtudiant}</td>
      <td>{contrat.dateSignatureMoniteur == null ? "Aucune" : contrat.dateSignatureEtudiant}</td>
      <td>{contrat.dateSignatureGestionnaire == null ? "Aucune" : contrat.dateSignatureEtudiant}</td>

    </tr>
  ));

  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="6">Contrats</th>
        </tr>
        <tr className="totalTr">
          <td colSpan="5">Le nombre de contrats total</td>
          <td>{contrats.length}</td>
        </tr>
        <tr>
          <th>Titre du contrat</th>
          <th>Nom de l'étudiant</th>
          <th>Nom du moniteur</th>
          <th>Date de signature de l'étudiant</th>
          <th>Date de signature du moniteur</th>
          <th>Date de signature du gestionnaire</th>
        </tr>
        <tbody>{contratsList}</tbody>
        <tr>
          <td colSpan="3" className="hoverButton">
            <button onClick={previousPage} className="button">
              «
            </button>
          </td>
          <td colSpan="3" className="hoverButton">
            <button onClick={nextPage} className="button">
              »
            </button>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Contrats;
