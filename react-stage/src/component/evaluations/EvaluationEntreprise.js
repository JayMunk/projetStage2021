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

  useEffect(() => {
    console.log(loggedUser);
    if (!loggedUser.isLoggedIn || loggedUser.role !== "SUPERVISEUR")
      history.push("/login");

    const getContrats = async () => {
      const contratList = await ContratService.getSuperviseurContratsToEvaluate(
        loggedUser.courriel
      );
      setContrats(contratList);
    };
    getContrats();

    const getSuperviseur = async () => {
      const superviseur = await UserService.getUserByEmail(loggedUser.courriel);
      setSuperviseur(superviseur);
    };
    getSuperviseur();
  }, [loggedUser, history]);

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
