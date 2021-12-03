import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { UserInfoContext } from "../../contexts/UserInfo";
import ContratService from "../../services/ContratService";
import EvaluationService from "../../services/EvaluationService";
import UserService from "../../services/UserService";
import FormEvaluationEntreprise from "./FormEvaluationEntreprise";
import ListEntrepriseToEvaluate from "./ListEntrepriseToEvaluate";

const EvaluationEntreprise = () => {
  const [loggedUser] = useContext(UserInfoContext);
  const history = useHistory();
  const [contrats, setContrats] = useState([]);
  const [currentContrat, setCurrentContrat] = useState();
  const [superviseur, setSuperviseur] = useState({});

  useEffect(async () => {
    if (!loggedUser.isLoggedIn || loggedUser.role !== "SUPERVISEUR") {
      history.push("/login");
    }
    else {
      const dataContrat = await ContratService.getSuperviseurContratsToEvaluate(loggedUser.courriel);
      if (dataContrat != undefined) {
        setContrats(dataContrat)
      }

      const dataSuperviseur = await UserService.getUserByEmail(loggedUser.courriel);
      if (dataContrat != undefined) {
        setSuperviseur(dataSuperviseur)
      }
    };

  }, []);

  const selectContrat = (id) => {
    setCurrentContrat(contrats.find((contrat) => contrat.id === id));
  };

  const handleCancel = () => {
    setCurrentContrat(undefined);
  };

  const submitEvaluation = async (evaluation) => {
    var result = await EvaluationService.saveEvaluationEntreprise(evaluation);
    if (!result.error) {
      Swal.fire({
        icon: "success",
        title: "Votre évaluation a été envoyée.",
        showConfirmButton: false,
        timer: 1500,
      });
      setContrats(
        contrats.filter((contrat) => contrat.id !== currentContrat.id)
      );
      handleCancel();
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur, veuillez réessayer plus tard.",
      });
    }
  };

  return (
    <div>
      {currentContrat === undefined ? (
        <ListEntrepriseToEvaluate contrats={contrats} onClick={selectContrat} />
      ) : (
        <FormEvaluationEntreprise
          contrat={currentContrat}
          onClickSubmit={submitEvaluation}
          onClickCancel={handleCancel}
          superviseur={superviseur}
        />
      )}
    </div>
  );
};

export default EvaluationEntreprise;
