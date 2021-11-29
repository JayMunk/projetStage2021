import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";

const Moniteurs = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [moniteurs, setMoniteurs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [moniteursVisible, setMoniteursVisible] = useState([]);
  const moniteursPerPage = 3;

  useEffect(() => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      fetch(`http://localhost:9191/user/moniteurs`)
        .then((res) => {
          return res.json();
        })
        .then((moniteurs) => {
          setMoniteurs(moniteurs);
          setMoniteursVisible(moniteurs.slice(0, moniteursPerPage));
        });
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
      <td>{moniteur.prenom}</td>
      <td>{moniteur.nom}</td>
    </tr>
  ));
  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="2">Moniteurs</th>
        </tr>
        <tr>
          <td>Le nombres de moniteurs inscrient</td>
          <td>{moniteurs.length}</td>
        </tr>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
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
