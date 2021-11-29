import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";

const Offres = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [offres, setOffres] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [offresVisible, setOffresVisible] = useState([]);
  const offresPerPage = 3;

  useEffect(() => {
    if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
      fetch(`http://localhost:9191/offres`)
        .then((res) => {
          return res.json();
        })
        .then((offres) => {
          setOffres(offres);
          setOffresVisible(offres.slice(0, offresPerPage));
        });
    }
  }, []);

  const updateListeOffres = (pageNumber) => {
    let offset = offresPerPage * pageNumber;

    setOffresVisible(offres.slice(0 + offset, offresPerPage + offset));
  };

  const nextPage = () => {
    if (offresPerPage * (pageNumber + 1) >= offres.length) return;
    updateListeOffres(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListeOffres(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const offresList = offresVisible.map((offre) => (
    <tr key={offre.id.toString()}>
      <td>{offre.titre}</td>
      <td>{offre.description}</td>
    </tr>
  ));

  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="2">Offres</th>
        </tr>
        <tr>
          <td>Le nombre d'offres totales</td>
          <td>{offres.length}</td>
        </tr>
        <tr>
          <th>Titre</th>
          <th>Description</th>
        </tr>
        <tbody>{offresList}</tbody>
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

export default Offres;
