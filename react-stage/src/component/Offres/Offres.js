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
import Swal from "sweetalert2";


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
    setCurrentOffre(offre);
    setListWhitelistedEtudiant(getOptionsEtudiant(offre.whitelist));
    setShowModal(true);
  };

  const appliquerOffre = async (offre) => {
    let offreApplied;
    offreApplied = await OffreService.applyForOffre(
      offre.id,
      loggedUser.courriel
    );
    if (offreApplied != null) {
      Swal.fire(
        'Application Reçu',
        `Vous avez appliqué à l'offre ${currentOffre.titre} de l'entreprise ${currentOffre.entreprise}`,
        'success'
      )
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

  const onClickSave = async () => {
    const updatedOffre = currentOffre;
    updatedOffre.whitelist = getListEtudiantFromOptions(
      listWhitelistedEtudiant
    );
    setCurrentOffre(updatedOffre);
    await OffreService.saveOffre(updatedOffre);
    await updateOffres();
    onClickClose();
  };

  const updateOffres = async () => {
    const dbOffres =
      loggedUser.role === "ETUDIANT"
        ? await OffreService.getEtudiantOffres(loggedUser.courriel)
        : await OffreService.getAllOffres();
    setListOffres(dbOffres);
  };

  const getOptionsList = () => {
    if (currentOffre != null) {
      if (listWhitelistedEtudiant.length == 0) {
        return getOptionsEtudiant(listAllEtudiant);
      } else {
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
      {listOffres.length == 0 ?
        <div>
          <h3 className="text-center text-muted mt-4">Il n'y a aucunes offres</h3>
        </div>
        :

        <Row className="mt-4">
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
      }
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
        {currentOffre &&
          <div className="container text-center">
            <AiOutlineClose color="red" size="24px" onClick={onClickClose} />
            <Row className="mt-4">
              <Col lg='4' sm='12' className="mx-auto">
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
                      <th className="bg-secondary" colSpan='2'>Description</th>
                    </tr>
                    <tr>
                      <td className="bg-light" colSpan='2'>{currentOffre.description}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>


            {loggedUser.role === "ETUDIANT" &&
              <Row>
                <Col sm="1" lg="5"></Col>
                <Col sm="10" lg="2">
                  <button className="btn btn-success btn-lg mt-4" onClick={() => appliquerOffre(currentOffre)}>Appliquer à l'offre</button>
                </Col>
                <Col sm="1" lg="5"></Col>
              </Row>
            }


            {loggedUser.role === "GESTIONNAIRE" && (
              <div>
                <Row>
                  <Col lg='4' sm='12' className="mx-auto">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th className="bg-secondary">Validity</th>
                        </tr>
                        <tr>
                          <td className="bg-light">
                            <label className="form-check-label" htmlFor="valid">
                              {" "}
                              <input
                                type="checkbox"
                                name="valid"
                                checked={currentOffre.valid}
                                onChange={onToggleValid}
                              />
                              Valid{" "}
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Row className="mx-auto">
                    <Col sm="12" lg="6">
                      <h1>Select Etudiants</h1>
                      <Row>
                        <Col className="mx-auto" lg="8" sm="10">
                          <MultiSelect
                            options={getOptionsList()}
                            value={listWhitelistedEtudiant}
                            onChange={setListWhitelistedEtudiant}
                            labelledBy="Select"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12" lg="6" className="mt-4">
                      <table className="table mt-4">
                        <tbody>
                          <tr>
                            <th className="bg-secondary">Whitelisted Étudiants</th>
                          </tr>
                          {listWhitelistedEtudiant.map((etudiant, index) => (
                            <tr>
                              <td className="bg-light" key={index}>{etudiant.label}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
              </div>
            )}



            {(loggedUser.role === "MONITEUR" && currentOffre) &&
              <div>

                <h2 className="text-center text-muted mt-4">Candidats</h2>
                <Row>
                  <Col lg='6' sm='12' className="mx-auto">
                    <table className="table border table-dark">
                      <thead>
                        <tr>
                          <th scope="col">Nom d'étudiant</th>
                          <th scope="col">Courriel</th>
                          <th scope="col">Permis</th>
                          <th scope="col">Voiture</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showModal &&
                          currentOffre.applicants.map((etudiant) => (
                            <tr key={etudiant.id}>
                              <td className="text-white">
                                {etudiant.prenom} {etudiant.nom}
                              </td>
                              <td className="text-white">{etudiant.courriel}</td>
                              <td>{getBoolIcon(etudiant.hasLicense)}</td>
                              <td>{getBoolIcon(etudiant.hasVoiture)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </div>
            }
          </div>
        }
      </ReactModal >
    </div >
  );
};

export default Offres;
