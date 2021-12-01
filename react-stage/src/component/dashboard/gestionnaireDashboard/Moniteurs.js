import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import UserService from "../../../services/UserService"

const Moniteurs = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [moniteurs, setMoniteurs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [moniteursVisible, setMoniteursVisible] = useState([]);
  const moniteursPerPage = 3;

  useEffect(async () => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      const moniteursList = await UserService.getListAllMoniteurs()
      setMoniteurs(moniteursList)
      setMoniteursVisible(moniteursList.slice(0, moniteursPerPage))
    }
  }, []);

  const updateListeMoniteurs = (pageNumber) => {
    let offset = moniteursPerPage * pageNumber;

    setMoniteursVisible(moniteurs.slice(0 + offset, moniteursPerPage + offset));
  };

  const nextPage = () => {
    if (moniteursPerPage * (pageNumber + 1) >= moniteurs.length) return;
    updateListeMoniteurs(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeMoniteurs(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const moniteursList = moniteursVisible.map((moniteur) => (
    <tr key={moniteur.id.toString()}>
      <td>{moniteur.prenom} {moniteur.nom}</td>
      <td>{moniteur.courriel}</td>
    </tr>
  ));
  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="2">Moniteurs</th>
        </tr>
        <tr className="totalTr">
          <td >Le nombres de moniteurs inscrient</td>
          <td>{moniteurs.length}</td>
        </tr>
        <tr>
          <th>Nom</th>
          <th>Courriel</th>
        </tr>
        <tbody>{moniteursList}</tbody>
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

export default Moniteurs;
