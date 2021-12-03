import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import UserService from "../../../services/UserService"

const Etudiants = () => {
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
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="2">Étudiants</th>
        </tr>
        <tr className="totalTr">
          <td>Le nombre d'étudiants inscrient</td>
          <td>{etudiants.length}</td>
        </tr>
        <tr>
          <th>Nom</th>
          <th>Courriel</th>
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

export default Etudiants;
