import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import OffreService from "../../../services/OffreService"


const OffresDashGestionnaire = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [offres, setOffres] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [offresVisible, setOffresVisible] = useState([]);
  const offresPerPage = 3;

  useEffect(async () => {
    const offresList = await OffreService.getAllOffres()
    setOffres(offresList)
    console.log(offresList, "offers")
    setOffresVisible(offresList.slice(0, offresPerPage))
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
      <td>{offre.dateDebut}</td>
      <td>{offre.dateFin}</td>
      <td>{offre.valid ? "Valid" : "Non valid "}</td>


    </tr>
  ));

  return (
    <>
      <table className="my-4 text-center">
        <tr>
          <th colSpan="4">Offres</th>
        </tr>
        <tr className="totalTr">
          <td colSpan="3">Le nombre d'offres totales</td>
          <td>{offres.length}</td>
        </tr>
        <tr>
          <th>Titre</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Validité</th>


        </tr>
        <tbody>{offresList}</tbody>
        <tr>
          <td colSpan="2" className="hoverButton">
            <button onClick={previousPage} className="btn bg-dark text-white wide-button">
              «
            </button>
          </td>
          <td colSpan="2" className="hoverButton">
            <button onClick={nextPage} className="btn bg-dark text-white wide-button">
              »
            </button>
          </td>
        </tr>
      </table>
    </>
  );
};

export default OffresDashGestionnaire;
