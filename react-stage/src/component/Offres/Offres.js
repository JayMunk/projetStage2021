import React from "react"
import { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from "react-icons/ai"
import { UserInfoContext } from "../../contexts/UserInfo"
import ReactModal from "react-modal"
import "./PickList.css"
import OffreService from "../../services/OffreService.js"
import UserService from "../../services/UserService.js"
import { MultiSelect } from "react-multi-select-component"
import { Col, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import { faFileDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CVService from "../../services/CVService"
import { saveAs } from "file-saver"

const Offres = () => {
  const history = useHistory()
  const [listOffres, setListOffres] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentOffre, setCurrentOffre] = useState({
    titre: String,
    description: String,
    entreprise: String,
    adresse: String,
    dateDebut: String,
    dateFin: String,
    nbTotalSemaine: Number,
    horaireDebut: String,
    horaireFin: String,
    nbTotalHeuresParSemaine: Number,
    tauxHoraire: Number,
    whitelist: Array,
    applicants: Array,
    valid: Boolean,
  })

  const [listAllEtudiant, setListAllEtudiant] = useState([])

  const [listWhitelistedEtudiant, setListWhitelistedEtudiant] = useState([])

  const [loggedUser, setLoggedUser] = useContext(UserInfoContext)

  useEffect(() => {
    if (
      !loggedUser.isLoggedIn ||
      !(
        loggedUser.role === "GESTIONNAIRE" ||
        loggedUser.role === "ETUDIANT" ||
        loggedUser.role === "MONITEUR"
      )
    ) {
      history.push("/login")
    }
    const getOffres = async () => {
      let dbOffres
      switch (loggedUser.role) {
        case "GESTIONNAIRE":
          dbOffres = await OffreService.getAllOffres()
          break
        case "MONITEUR":
          dbOffres = await OffreService.getMoniteurOffres(loggedUser.courriel)
          break
        case "ETUDIANT":
          dbOffres = await OffreService.getEtudiantOffres(loggedUser.courriel)
          break
        default:
          break
      }
      setListOffres(dbOffres)
    }
    getOffres()
  }, [])

  useEffect(() => {
    const getListAllEtudiants = async () => {
      const allEtudiants = await UserService.getListAllEtudiants()
      setListAllEtudiant(allEtudiants)
    }
    getListAllEtudiants()
  }, [])

  const getOptionsEtudiant = (listEtudiant) => {
    return listEtudiant.map((etudiant) => {
      let etudiantOption = {}
      etudiantOption.label = etudiant.prenom + " " + etudiant.nom
      etudiantOption.value = etudiant
      return etudiantOption
    })
  }

  const getListEtudiantFromOptions = (listWhitelistOptions) => {
    return listWhitelistOptions.map((option) => {
      let etudiant = {}
      etudiant = option.value
      return etudiant
    })
  }

  const onClickOffre = (offre) => {
    setCurrentOffre(offre)
    setListWhitelistedEtudiant(getOptionsEtudiant(offre.whitelist))
    setShowModal(true)
  }

  const appliquerOffre = async (offre) => {
    let offreApplied
    offreApplied = await OffreService.applyForOffre(
      offre.id,
      loggedUser.courriel
    )
    if (offreApplied != null) {
      Swal.fire(
        "Application Reçu",
        `Vous avez appliqué à l'offre ${currentOffre.titre} de l'entreprise ${currentOffre.entreprise}`,
        "success"
      )
    }
  }

  const onClickClose = () => {
    setShowModal(false)
    setCurrentOffre(null)
  }

  const onToggleValid = () => {
    setCurrentOffre((offre) => ({
      ...offre,
      valid: !offre.valid,
    }))
  }

  const onClickSave = async () => {
    const updatedOffre = currentOffre
    updatedOffre.whitelist = getListEtudiantFromOptions(listWhitelistedEtudiant)
    setCurrentOffre(updatedOffre)
    const savedOffre = await OffreService.saveOffre(updatedOffre)
    if (savedOffre != undefined) {
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "L'offre a été modifié.",
      })
    }
    await updateOffres()
    onClickClose()
  }

  const updateOffres = async () => {
    const dbOffres =
      loggedUser.role === "ETUDIANT"
        ? await OffreService.getEtudiantOffres(loggedUser.courriel)
        : await OffreService.getAllOffres()
    setListOffres(dbOffres)
  }

  const getOptionsList = () => {
    if (currentOffre != null) {
      if (listWhitelistedEtudiant.length == 0) {
        return getOptionsEtudiant(listAllEtudiant)
      } else {
        let listAllEtudiantArray = listAllEtudiant
        listAllEtudiantArray = listAllEtudiantArray.filter(
          (etudiant) =>
            !listWhitelistedEtudiant.some(
              (whitelistedEtudiantOption) =>
                whitelistedEtudiantOption.value.id === etudiant.id
            )
        )
        return getOptionsEtudiant(listAllEtudiantArray).concat(
          listWhitelistedEtudiant
        )
      }
    }
  }

  const getBoolIcon = (bool) => {
    return bool ? (
      <AiOutlineCheckCircle color="green" />
    ) : (
      <AiOutlineCloseCircle color="red" />
    )
  }

  const getEtudiantCV = async (etudiant) => {
    const listCVEtudiant = await CVService.getCvEtudiant(etudiant.id)
    const defaultCV = getCVDefaut(listCVEtudiant)

    if (defaultCV == undefined || listCVEtudiant.length == 0) {
      console.log("aucun default cv ou list empty")
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Cet étudiant n'a aucun cv disponible",
      })
      return
    } else if (defaultCV.status != "ACCEPTED") {
      console.log("Cv not accepted")
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Cet étudiant n'a aucun cv disponible",
      })
      return
    }
    downloadCV(defaultCV)
  }

  const getCVDefaut = (listCVEtudiant) => {
    return listCVEtudiant.find((cv) => cv.defaultCV)
  }

  const downloadCV = async (cv) => {
    await fetch(`http://localhost:9191/cv/pdf/${cv.id}`).then((res) => {
      console.log(res)
      if (res.ok) {
        saveAs(`http://localhost:9191/cv/pdf/${cv.id}`)
      }
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Erreur!",
          text: "Le fichier est invalide ou indisponible pour l`instant.",
        })
        throw res
      }
    })
  }

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1 className="mt-4" style={{ color: "#DBB2FF" }}>
        Offres
      </h1>
      {listOffres.length == 0 ? (
        <div>
          <h3 className="text-center text-warning mt-4">
            Il n'y a aucunes offres
          </h3>
        </div>
      ) : (
        <Row className="mt-4">
          <Col sm="12" lg="8" className="mx-auto">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th colSpan="3">Titre</th>
                  <th colSpan="3">Entreprise</th>
                  {loggedUser.role !== "ETUDIANT" && (
                    <th colSpan="1">Valide</th>
                  )}
                  <th colSpan="1">Détails</th>
                </tr>
              </thead>
              <tbody>
                {loggedUser.role === "ETUDIANT"
                  ? listOffres.map((offre) => (
                      <tr className="text-white" key={offre.id.toString()}>
                        <td colSpan="3">{offre.titre}</td>
                        <td colSpan="3">{offre.entreprise}</td>
                        <td colSpan="2">
                          <input
                            type="button"
                            onClick={() => onClickOffre(offre)}
                            value="Détails"
                            className="btn btn-secondary"
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
      )}
      <ReactModal
        isOpen={showModal}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(100, 100, 100, 0.75)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "rgb(69, 69, 69)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        {currentOffre && (
          <div className="container text-center">
            <AiOutlineClose color="red" size="24px" onClick={onClickClose} />
            <Row className="mt-4">
              <Col lg="4" sm="12" className="mx-auto">
                <table className="table border">
                  <tbody>
                    <tr>
                      <th className="bg-muted text-white">Titre</th>
                      <td className="bg-secondary">{currentOffre.titre}</td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Entreprise</th>
                      <td className="bg-secondary">
                        {currentOffre.entreprise}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Adresse</th>
                      <td className="bg-secondary">{currentOffre.adresse}</td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Date Debut</th>
                      <td className="bg-secondary">{currentOffre.dateDebut}</td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Date Fin</th>
                      <td className="bg-secondary">{currentOffre.dateFin}</td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Durée Totale</th>
                      <td className="bg-secondary">
                        {currentOffre.nbTotalSemaine} semaines
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Horaire Debut</th>
                      <td className="bg-secondary">
                        {currentOffre.horaireDebut}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Horaire Fin</th>
                      <td className="bg-secondary">
                        {currentOffre.horaireFin}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">
                        Totales Heures/Semaine
                      </th>
                      <td className="bg-secondary">
                        {currentOffre.nbTotalHeuresParSemaine} heures
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white">Taux Horaires</th>
                      <td className="bg-secondary">
                        {currentOffre.tauxHoraire}$/h
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-muted text-white" colSpan="2">
                        Description
                      </th>
                    </tr>
                    <tr>
                      <td className="bg-secondary" colSpan="2">
                        {currentOffre.description}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>

            {loggedUser.role === "ETUDIANT" && (
              <Row>
                <Col sm="1" lg="5"></Col>
                <Col sm="10" lg="2">
                  <button
                    className="btn btn-success btn-lg mt-4"
                    onClick={() => appliquerOffre(currentOffre)}
                  >
                    Appliquer à l'offre
                  </button>
                </Col>
                <Col sm="1" lg="5"></Col>
              </Row>
            )}

            {loggedUser.role === "GESTIONNAIRE" && (
              <div>
                <Row>
                  <Col lg="4" sm="12" className="mx-auto">
                    <table className="table border">
                      <tbody>
                        <tr>
                          <th className="bg-muted text-white">Validity</th>
                        </tr>
                        <tr>
                          <td className="bg-secondary">
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
                      <h1 className="text-light">Select Etudiants</h1>
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
                    <Col sm="12" lg="6">
                      <table className="table mt-4">
                        <tbody>
                          <tr>
                            <th className="bg-muted text-white">
                              Whitelisted Étudiants
                            </th>
                          </tr>
                          {listWhitelistedEtudiant.map((etudiant, index) => (
                            <tr>
                              <td className="bg-secondary" key={index}>
                                {etudiant.label}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="1" lg="5"></Col>
                    <Col sm="10" lg="2" className="mx-auto">
                      <button
                        className="btn btn-success btn-lg mt-4 btn-default wide-button"
                        onClick={onClickSave}
                      >
                        SAVE
                      </button>
                    </Col>
                    <Col sm="1" lg="5"></Col>
                  </Row>
                </div>
              </div>
            )}

            {loggedUser.role === "MONITEUR" && currentOffre && (
              <div>
                <h2 className="text-center text-muted mt-4">Candidats</h2>
                <Row>
                  <Col lg="6" sm="12" className="mx-auto">
                    <table className="table border table-dark">
                      <thead>
                        <tr>
                          <th>Nom d'étudiant</th>
                          <th>Courriel</th>
                          <th>Permis</th>
                          <th>Voiture</th>
                          <th>CV</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showModal &&
                          currentOffre.applicants.map((etudiant) => (
                            <tr key={etudiant.id}>
                              <td className="text-white">
                                {etudiant.prenom} {etudiant.nom}
                              </td>
                              <td className="text-white">
                                {etudiant.courriel}
                              </td>
                              <td>{getBoolIcon(etudiant.hasLicense)}</td>
                              <td>{getBoolIcon(etudiant.hasVoiture)}</td>
                              <td>
                                <FontAwesomeIcon
                                  className="text-secondary"
                                  onClick={() => getEtudiantCV(etudiant)}
                                  icon={faFileDownload}
                                  size="2x"
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        )}
      </ReactModal>
    </div>
  )
}

export default Offres
