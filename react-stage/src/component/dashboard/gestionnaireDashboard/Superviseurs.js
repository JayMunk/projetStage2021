import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";

const Superviseurs = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [superviseurs, setSuperviseurs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [superviseursVisible, setMoniteursVisible] = useState([]);
  const superviseursPerPage = 3;

  useEffect(() => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      fetch(`http://localhost:9191/user/superviseurs`)
        .then((res) => {
          return res.json();
        })
        .then((superviseurs) => {
          setSuperviseurs(superviseurs);
          setMoniteursVisible(superviseurs.slice(0, superviseursPerPage));
        });
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
      <td>{superviseur.prenom}</td>
      <td>{superviseur.nom}</td>
    </tr>
  ));

  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="2">Superviseurs</th>
        </tr>
        <tr>
          <td>Le nombres de superviseur inscrient</td>
          <td>{superviseurs.length}</td>
        </tr>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
        </tr>
        <tbody>{superviseursList}</tbody>
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

export default Superviseurs;
