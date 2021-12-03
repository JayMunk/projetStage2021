import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserInfoContext } from "../../../contexts/UserInfo";
import CVService from "../../../services/CVService";
import VerificationCVList from "./VerificationCVList";
import ViewCvPdf from "./ViewCvPdf";

const VerificationCV = () => {
  const [cvList, setCVList] = useState([]);
  const [currentCV, setCurrentCV] = useState(undefined);
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const history = useHistory();

  useEffect(() => {
    if (
      !loggedUser.isLoggedIn ||
      (loggedUser.role !== "GESTIONNAIRE" && loggedUser !== "SUPERVISEUR")
    )
      history.push("/login");

    const getAllCVs = async () => {
      const cvs = await CVService.getAllCVs();
      setCVList(cvs);
    };
    getAllCVs();
  }, [loggedUser, history]);

  const replaceCvInList = (newCV) =>
    setCVList(cvList.map((cv) => (cv.id === newCV.id ? newCV : cv)));

  const onAccept = async () => {
    const result = await CVService.acceptCV(currentCV);
    if (!result.error) {
      Swal.fire({
        icon: "success",
        title: "Votre évaluation a été envoyée.",
        showConfirmButton: false,
        timer: 1500,
      });
      replaceCvInList(result);
      onCancel();
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur, veuillez réessayer plus tard.",
      });
    }
  };

  const onReject = async () => {
    const result = await CVService.rejectCV(currentCV);
    if (!result.error) {
      Swal.fire({
        icon: "success",
        title: "Votre évaluation a été envoyée.",
        showConfirmButton: false,
        timer: 1500,
      });
      replaceCvInList(result);
      onCancel();
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur, veuillez réessayer plus tard.",
      });
    }
  };

  const onCancel = async () => {
    setCurrentCV(undefined);
  };

  const onClickCV = (id) => setCurrentCV(cvList.find((cv) => cv.id === id));

  return (
    <div>
      {currentCV === undefined ? (
        <VerificationCVList cvList={cvList} onClickCV={onClickCV} />
      ) : (
        <ViewCvPdf
          cv={currentCV}
          onAccept={onAccept}
          onReject={onReject}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default VerificationCV;
