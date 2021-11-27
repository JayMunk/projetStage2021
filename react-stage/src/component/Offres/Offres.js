import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { UserInfoContext } from "../../contexts/UserInfo";
import ReactModal from "react-modal";
import "./PickList.css";
import OffreService from "../../services/OffreService.js";
import UserService from "../../services/UserService.js";
import { MultiSelect } from "react-multi-select-component";
import { Col, Row } from 'react-bootstrap'


const Offres = () => {
  const history = useHistory();
  const [listOffres, setListOffres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOffre, setCurrentOffre] = useState({
    titre: String,
    description: String,
    entreprise: String,
    adresse: String,
    dateDebut: String,
    dateFin: String,
    nbTotalSemaine: Number,
    horaire: String,
    nbTotalHeuresParSemaine: Number,
    tauxHoraire: Number,
    whitelist: Array,
    applicants: Array,
    valid: Boolean,
  });

  const [listAllEtudiant, setListAllEtudiant] = useState([]);

  const [listWhitelistedEtudiant, setListWhitelistedEtudiant] = useState([]);

  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);

  useEffect(() => {
    if (
      !loggedUser.isLoggedIn ||
      !(
        loggedUser.role === "GESTIONNAIRE" ||
        loggedUser.role === "ETUDIANT" ||
        loggedUser.role === "MONITEUR"
      )
    )
      history.push("/login");
    const getOffres = async () => {
      let dbOffres;
      switch (loggedUser.role) {
        case "GESTIONNAIRE":
          dbOffres = await OffreService.getAllOffres();
          break;
        case "MONITEUR":
          dbOffres = await OffreService.getMoniteurOffres(loggedUser.courriel);
          break;
        case "ETUDIANT":
          dbOffres = await OffreService.getEtudiantOffres(loggedUser.courriel);
          break;
        default:
          break;
      }
      console.log(dbOffres, "dbOffres");
      setListOffres(dbOffres);
    };
    getOffres();
  }, []);

  useEffect(() => {
    const getListAllEtudiants = async () => {
      const allEtudiants = await UserService.getListAllEtudiants();
      setListAllEtudiant(allEtudiants);
    };
    getListAllEtudiants();
  }, []);

  useEffect(() => {
    console.log("-----UseEffect Logging--------");
    console.log(listAllEtudiant, "list all etudiant --- listAllEtudiant");
    console.log(
      listWhitelistedEtudiant,
      "list whitelisted etudiant --- listWhitelistedEtudiant "
    );
    console.log(listOffres, "list all offres  ------------ listOffres");
    // console.log(getOptionsEtudiant(listAllEtudiant), "filtered list etudiant ===================================")
  }, [listAllEtudiant, listWhitelistedEtudiant, listOffres]);

  const getOptionsEtudiant = (listEtudiant) => {
    return listEtudiant.map((etudiant) => {
      let etudiantOption = {};
      etudiantOption.label = etudiant.prenom + " " + etudiant.nom;
      etudiantOption.value = etudiant;
      return etudiantOption;
    });
  };

  const getListEtudiantFromOptions = (listWhitelistOptions) => {
    return listWhitelistOptions.map((option) => {
      let etudiant = {};
      etudiant = option.value;
      return etudiant;
    });
  };

  const onClickOffre = (offre) => {
    console.log(offre, "ON click details offre");
    setCurrentOffre(offre);
    setListWhitelistedEtudiant(getOptionsEtudiant(offre.whitelist));
    setShowModal(true);
  };

  const appliquerOffre = async (offre) => {
    console.log(offre, "offre");
    let offreApplied;
    offreApplied = await OffreService.applyForOffre(
      offre.id,
      loggedUser.courriel
    );
    console.log(offreApplied, "offreApplied");
    if (offreApplied != null) {
      alert("Application recu");
    }
  };

  const onClickClose = () => {
    setShowModal(false);
    setCurrentOffre(null);
  };

  const onToggleValid = () => {
    setCurrentOffre((offre) => ({
      ...offre,
      valid: !offre.valid,
    }));
  };

  // useEffect(() => {
  //     console.log(currentOffre, "CURRENT OFFRE")
  // }, [currentOffre])

  const onClickSave = async () => {
    const updatedOffre = currentOffre;
    updatedOffre.whitelist = getListEtudiantFromOptions(
      listWhitelistedEtudiant
    );
    setCurrentOffre(updatedOffre);
    console.log(updatedOffre, "UPDATED OFFRE");
    await OffreService.saveOffre(updatedOffre);
    await updateOffres();

    console.log(listOffres, "list offres as save -------------------");
    onClickClose();
  };

  const updateOffres = async () => {
    const dbOffres =
      loggedUser.role === "ETUDIANT"
        ? await OffreService.getEtudiantOffres(loggedUser.courriel)
        : await OffreService.getAllOffres();
    console.log(dbOffres, "dbOffres in update offres");
    setListOffres(dbOffres);
  };

  const getOptionsList = () => {
    if (currentOffre != null) {

      if (listWhitelistedEtudiant.length == 0) {
        return getOptionsEtudiant(listAllEtudiant);
      } else {
        console.log(currentOffre != null, "CONDITION___________________________________")
        let listAllEtudiantArray = listAllEtudiant;
        listAllEtudiantArray = listAllEtudiantArray.filter(
          (etudiant) =>
            !listWhitelistedEtudiant.some(
              (whitelistedEtudiantOption) =>
                whitelistedEtudiantOption.value.id === etudiant.id
            )
        );
        return getOptionsEtudiant(listAllEtudiantArray).concat(
          listWhitelistedEtudiant
        );

      }
    }
  }

  const getBoolIcon = (bool) => {
    return bool ? (
      <AiOutlineCheckCircle color="green" />
    ) : (
      <AiOutlineCloseCircle color="red" />
    );
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Offres</h1>
      <Row>
        <Col sm='12' lg='8' className="mx-auto">
          <table className="table border table-dark">
            <thead>
              <tr>
                <th colSpan="3">
                  Titre
                </th>
                <th colSpan="3">
                  Entreprise
                </th>
                {loggedUser.role !== "ETUDIANT" && <th colSpan="1">Valide</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loggedUser.role === "ETUDIANT"
                ? listOffres.map((offre) => (
                  <tr className="text-white" key={offre.id.toString()}>
                    <td colSpan="3">{offre.titre}</td>
                    <td colSpan="3">{offre.entreprise}</td>
                    <td colSpan="1">
                      <input
                        type="button"
                        onClick={() => onClickOffre(offre)}
                        value="Détails"
                        className="p-1 btn-secondary"
                      />
                    </td>
                  </tr>
                ))
                : listOffres.map((offre) => (
                  <tr className="text-white" key={offre.id.toString()}>
                    <td colSpan="3">{offre.titre}</td>
                    <td colSpan="3">{offre.entreprise}</td>
                    <td colSpan="1">
                      {offre.valid ? (
                        <AiOutlineCheckCircle color="green" />
                      ) : (
                        <AiOutlineCloseCircle color="red" />
                      )}
                    </td>
                    <td colSpan="1">
                      <input
                        type="button"
                        onClick={() => onClickOffre(offre)}
                        value="Détails"
                        className="p-1 btn-secondary"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>
      <ReactModal isOpen={showModal} ariaHideApp={false} style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: 'lightgrey',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}>
        <div className="container text-center">
          <AiOutlineClose color="red" size="24px" onClick={onClickClose} />
          <div className="row mt-4">
            <table className="table">
              <tbody>
                <tr>
                  <th className="bg-secondary">Titre</th>
                  <td className="bg-light">{currentOffre.titre}</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Entreprise</th>
                  <td className="bg-light">{currentOffre.entreprise}</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Adresse</th>
                  <td className="bg-light">{currentOffre.adresse}</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Date Debut</th>
                  <td className="bg-light">{currentOffre.dateDebut}</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Date Fin</th>
                  <td className="bg-light">{currentOffre.dateFin}</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Durée Totale</th>
                  <td className="bg-light">{currentOffre.nbTotalSemaine} semaines</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Horaire</th>
                  <td className="bg-light">{currentOffre.horaire}</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Totales Heures/Semaine</th>
                  <td className="bg-light">{currentOffre.nbTotalHeuresParSemaine} heures</td>
                </tr>
                <tr>
                  <th className="bg-secondary">Taux Horaires</th>
                  <td className="bg-light">{currentOffre.tauxHoraire}$/h</td>
                </tr>
                <tr>
                  <th className="bg-secondary" colspan='2'>Description</th>
                </tr>
                <tr>
                  <td className="bg-light" colspan='2'>{currentOffre.description}</td>
                </tr>
              </tbody>
            </table>

          </div>

          {currentOffre &&
            [loggedUser.role !== "ETUDIANT" &&
              <div className="col-2 form-check ">
                <label className="form-check-label" htmlFor="valid">
                  {" "}
                  <input
                    type="checkbox"
                    name="valid"
                    className="form-check-input"
                    checked={currentOffre.valid}
                    onChange={onToggleValid}
                  />
                  Valid{" "}
                </label>
              </div>
            ]
          }

          {loggedUser.role === "GESTIONNAIRE" && (
            <div className="mt-4">
              <Row>
                <Col sm="12" lg="6">
                  <h1>Select Etudiants</h1>
                  <MultiSelect
                    options={getOptionsList()}
                    value={listWhitelistedEtudiant}
                    onChange={setListWhitelistedEtudiant}
                    labelledBy="Select"
                  />
                </Col>
                <Col sm="12" lg="6">
                  <h1>Whitelisted Etudiants</h1>
                  {listWhitelistedEtudiant.map((etudiant, index) => (
                    <li key={index}>{etudiant.label}</li>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col sm="1" lg="5"></Col>
                <Col sm="10" lg="2">
                  <button className="btn btn-success btn-lg mt-4" onClick={onClickSave}>SAVE</button>
                </Col>
                <Col sm="1" lg="5"></Col>
              </Row>
            </div>
          )}

          {(loggedUser.role === "MONITEUR" && currentOffre) &&
            <div>
              <h2 className="text-center text-muted mt-4">Candidats</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-secondary">Nom d'étudiant</th>
                    <th scope="col" className="text-secondary">Courriel</th>
                    <th scope="col" className="text-secondary">Permis</th>
                    <th scope="col" className="text-secondary">Voiture</th>
                  </tr>
                </thead>
                <tbody>
                  {showModal &&
                    currentOffre.applicants.map((etudiant) => (
                      <tr key={etudiant.id}>
                        <td>
                          {etudiant.prenom} {etudiant.nom}
                        </td>
                        <td>{etudiant.courriel}</td>
                        <td>{getBoolIcon(etudiant.hasLicense)}</td>
                        <td>{getBoolIcon(etudiant.hasVoiture)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </ReactModal >
    </div >
  );
};

export default Offres;
