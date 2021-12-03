import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import EntrevueService from "../../../services/EntrevueService"
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from 'react-icons/ai'



const Entrevues = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [entrevues, setEntrevues] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [entrevuesVisible, setentrevuesVisible] = useState([]);
  const entrevuesPerPage = 3;

  useEffect(async () => {
    const entrevuesList = await EntrevueService.getAllEntrevues()
    setEntrevues(entrevuesList)
    setentrevuesVisible(entrevuesList.slice(0, entrevuesPerPage))
  }, []);

  const updateListEntrevues = (pageNumber) => {
    let offset = entrevuesPerPage * pageNumber;

    setentrevuesVisible(entrevues.slice(0 + offset, entrevuesPerPage + offset));
  };

  const nextPage = () => {
    if (entrevuesPerPage * (pageNumber + 1) >= entrevues.length) return;
    updateListEntrevues(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    if (pageNumber === 0) return;
    updateListEntrevues(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <AiOutlineClockCircle color="gold" size="48px" />
      case "ACCEPTED":
        return <AiOutlineCheckCircle color="green" size="48px" />
      case "REJECTED":
        return <AiOutlineCloseCircle color="red" size="48px" />
      default:
        return;
    }
  }

  const entrevuesList = entrevuesVisible.map((entrevue) => (
    <tr key={entrevue.id.toString()}>
      <td>{entrevue.titre}</td>
      <td>{entrevue.date}</td>
      <td>{entrevue.time}</td>
      <td>{entrevue.etudiant.prenom} {entrevue.etudiant.nom}</td>
      <td>{entrevue.moniteur.prenom} {entrevue.moniteur.nom}</td>
      <td>{getStatusIcon(entrevue.status)}</td>


    </tr>
  ));

  return (
    <>
      <table className="tableDashboardGestionnaire">
        <tr>
          <th colSpan="6">Entrevues</th>
        </tr>
        <tr className="totalTr">
          <td colSpan="5">Le nombre d'entrevues totales</td>
          <td>{entrevues.length}</td>
        </tr>
        <tr>
          <th>Titre</th>
          <th>Date de l'entrevue</th>
          <th>Heure de l'entrevue</th>
          <th>Nom de l'éttudiant</th>
          <th>Nom du moniteur</th>
          <th>Réponse</th>
        </tr>
        <tbody>{entrevuesList}</tbody>
        <tr>
          <td colSpan="3" className="hoverButton" >
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

export default Entrevues;
