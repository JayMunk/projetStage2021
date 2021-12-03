import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { UserInfoContext } from "../../contexts/UserInfo";
import ContratService from "../../services/ContratService";
import EvaluationService from "../../services/EvaluationService";
import FormEvaluationEtudiant from "./FormEvaluationEtudiant";
import ListEtudiantToEvaluate from "./ListEtudiantToEvaluate";

const EvaluationEtudiant = () => {
  const [loggedUser] = useContext(UserInfoContext);
  const history = useHistory();
  const [contrats, setContrats] = useState([]);
  const [currentContrat, setCurrentContrat] = useState();

  useEffect(async () => {
    if (!loggedUser.isLoggedIn || loggedUser.role !== "MONITEUR") {
      history.push("/login");
    }
    else {
      const data = await ContratService.getMoniteurContratsToEvaluate(loggedUser.courriel);
      if (data != undefined) {
        setContrats(data);
      }
    }

  }, []);

  const selectContrat = (id) => {
    console.log(id);
    setCurrentContrat(contrats.find((contrat) => contrat.id === id));
  };

  const handleCancel = () => {
    setCurrentContrat(undefined);
  };

  const submitEvaluation = async (evaluation) => {
    var result = await EvaluationService.saveEvaluationEtudiant(evaluation);
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
        <ListEtudiantToEvaluate contrats={contrats} onClick={selectContrat} />
      ) : (
        <FormEvaluationEtudiant
          contrat={currentContrat}
          onClickSubmit={submitEvaluation}
          onClickCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EvaluationEtudiant;
