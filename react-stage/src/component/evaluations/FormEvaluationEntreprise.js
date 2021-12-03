import React, { useState } from "react";
import ReadOnlyText from "./ReadOnlyText";
import EntrepriseEvaluationGrid from "./EntrepriseEvaluationGrid";

const FormEvaluationEntreprise = ({
  contrat,
  onClickSubmit,
  onClickCancel,
  superviseur,
}) => {
  const [errors, setErrors] = useState({});
  const [evaluationGrid, setEvaluationGrid] = useState([
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
  ]);
  const [garderStagiaire, setGarderStagiaire] = useState(false);
  const [variableShifts, setVariableShifts] = useState(false);
  const [values, setValues] = useState({
    numeroStage: 0,
    evaluationGrid: [],
    commentaires: "",
    stagePrefere: 0,
    nombreStagiaires: 0,
    garderStagiaire: false,
    variableShifts: false,
    heuresEncadrementParSemaineMois1: 0,
    heuresEncadrementParSemaineMois2: 0,
    heuresEncadrementParSemaineMois3: 0,
    contrat: contrat,
    superviseur: superviseur,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangeRadio = (e) => {
    const { name, value } = e.target;
    setEvaluationGrid(
      Object.values({
        ...evaluationGrid,
        [name]: value,
      })
    );
  };

  const toggleGarderStagiaire = () => setGarderStagiaire(!garderStagiaire);
  const toggleVariableShifts = () => setVariableShifts(!variableShifts);

  const checkErrors = () => {
    let errors = {};

    if (!values.numeroStage || values.numeroStage < 1)
      errors.numeroStage = "Numero du stage positif requis";
    if (!values.commentaires) errors.commentaires = "Commentaires requis";
    if (!values.stagePrefere) errors.stagePrefere = "Stage privilégié requis";
    if (!values.nombreStagiaires)
      errors.nombreStagiaires = "Nombre de stagiaires requis";
    if (!values.heuresEncadrementParSemaineMois1)
      errors.heuresEncadrementParSemaineMois =
        "Nombre d'eures d'encadrement par semaine requis";
    if (!values.heuresEncadrementParSemaineMois2)
      errors.heuresEncadrementParSemaineMois =
        "Nombre d'eures d'encadrement par semaine requis";
    if (!values.heuresEncadrementParSemaineMois3)
      errors.heuresEncadrementParSemaineMois =
        "Nombre d'eures d'encadrement par semaine requis";

    setErrors(errors);
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errors = checkErrors();
    if (
      Object.keys(errors).length === undefined ||
      Object.keys(errors).length === 0
    ) {
      let evaluation = values;
      evaluation.evaluationGrid = evaluationGrid;
      evaluation.garderStagiaire = garderStagiaire;
      evaluation.variableShifts = variableShifts;
      onClickSubmit(evaluation);
    }
  };

  return (
    <div className="container">
      <input
        type="button"
        value="Annuler"
        className="btn btn-danger"
        onClick={onClickCancel}
      />
      <h1 className="text-white text-center">ÉVALUATION DU MILIEU DE STAGE</h1>
      <form onSubmit={onSubmit}>
        <div className="border p-5">
          <h2>IDENTIFICATION DE L'ENTREPRISE</h2>
          <ReadOnlyText
            label="Nom de l'entreprise:"
            value={values.contrat.moniteur.nomEntreprise}
          />
          <ReadOnlyText
            label="Personne contact:"
            value={
              values.contrat.moniteur.prenom + " " + values.contrat.moniteur.nom
            }
          />
          <ReadOnlyText
            label="Adresse:"
            value={values.contrat.moniteur.adresseEntreprise}
          />
          <ReadOnlyText
            label="Téléphone:"
            value={values.contrat.moniteur.numTelephone}
          />
        </div>

        <div className="border p-5">
          <h2>IDENTIFICATION DU STAGIAIRE</h2>
          <ReadOnlyText
            label="Nom du stagiaire:"
            value={
              values.contrat.etudiant.prenom + " " + values.contrat.etudiant.nom
            }
          />
          <ReadOnlyText
            label="Date du stage:"
            value={
              values.contrat.offre.dateDebut +
              " à " +
              values.contrat.offre.dateFin
            }
          />
          <div className="row">
            <div className="col">
              <label className="text-white col-3">Stage numero: </label>
            </div>
            <input
              className="col-auto"
              type="number"
              name="numeroStage"
              value={values.numeroStage}
              onChange={handleChange}
            />
          </div>
          {errors.numeroStage && <p className="error">{errors.numeroStage}</p>}
        </div>

        <div className="border p-5">
          <h2>ÉVALUATION</h2>
          <EntrepriseEvaluationGrid
            questions={[
              {
                index: 0,
                text: "Les tâches confiées au stagiaire sont conformes aux tâches annoncées dans l'entente de stage.",
              },
              {
                index: 1,
                text: "Des mesures d'acceuil facilitent l'intégration du nouveau stagiaire.",
              },
              {
                index: 2,
                text: "Le temps rées consacré a l'encadrement du stagiaire est suffisant.",
              },
            ]}
            handleChangeRadio={handleChangeRadio}
          />

          <div className="col m-5">
            <p className="text-white">
              Préciser le nombre d'heures par semaine:
            </p>
            <div className="row">
              <label className="text-white col-3">Premier mois:</label>
              <input
                className="col-2"
                type="number"
                name="heuresEncadrementParSemaineMois1"
                value={values.heuresEncadrementParSemaineMois1}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label className="text-white col-3">Deuxième mois: </label>
              <input
                className="col-2"
                type="number"
                name="heuresEncadrementParSemaineMois2"
                value={values.heuresEncadrementParSemaineMois2}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label className="text-white col-3">Troisième mois</label>
              <input
                className="col-2"
                type="number"
                name="heuresEncadrementParSemaineMois3"
                value={values.heuresEncadrementParSemaineMois3}
                onChange={handleChange}
              />
            </div>
            {errors.heuresEncadrementParSemaineMois && (
              <p className="error">{errors.heuresEncadrementParSemaineMois}</p>
            )}
          </div>

          <EntrepriseEvaluationGrid
            questions={[
              {
                index: 3,
                text: "L'environment de travail respecte les normes d'hygiène et de sécurité au travail.",
              },
              {
                index: 4,
                text: "Le climat de travail est agréable.",
              },
              {
                index: 5,
                text: "Le milieu de stage est accessible par transport en commun.",
              },
              {
                index: 6,
                text: `Le salaire offert est intéressant pour le stagiaire. (${values.contrat.offre.tauxHoraire}/l'heure)`,
              },
              {
                index: 7,
                text: "La communication avec le superviseur de stage facilite le déroulement du stage.",
              },
              {
                index: 8,
                text: "L'équipement fourni est adéquat pour réaliser les tâches confiées.",
              },
              {
                index: 9,
                text: "Le volume de travail est acceptable.",
              },
            ]}
            handleChangeRadio={handleChangeRadio}
          />
          <div className="row text-white mt-5">
            <label className="col-auto">COMMENTAIRES</label>
            <input
              className="col"
              type="text"
              name="commentaires"
              value={values.commentaires}
              onChange={handleChange}
            />
          </div>
          {errors.commentaires && (
            <p className="error text-center">{errors.commentaires}</p>
          )}
        </div>

        <div className="border p-5">
          <h2>OBSERVATIONS GÉNÉRALES</h2>
          <div className="row pt-4">
            <label className="col-auto text-white">
              Ce milieu est à privilégier pour stage numero:{" "}
            </label>
            <input
              className="col"
              type="number"
              name="stagePrefere"
              value={values.stagePrefere}
              onChange={handleChange}
            />
            {errors.stagePrefere && (
              <p className="error text-center">{errors.stagePrefere}</p>
            )}
          </div>
          <div className="row pt-4">
            <label className="col-auto text-white">
              Nombre de stagiaires que ce milieu accueille:{" "}
            </label>
            <input
              className="col"
              type="number"
              name="nombreStagiaires"
              value={values.nombreStagiaires}
              onChange={handleChange}
            />
            {errors.nombreStagiaires && (
              <p className="error text-center">{errors.nombreStagiaires}</p>
            )}
          </div>
          <div className="row mt-3">
            <label className="col-5 text-white">
              Ce milieu désire accueillir le même stagiaire pour un prochain
              stage:{" "}
            </label>
            <input
              className="col-auto"
              type="checkbox"
              id="garderStagiaire"
              name="garderStagiaire"
              value={values.garderStagiaire}
              onClick={toggleGarderStagiaire}
            />
          </div>
          <div className="row">
            <label className="col-5 text-white">
              Ce milieu offre des quarts de travail variables:{" "}
            </label>
            <input
              className="col-auto"
              type="checkbox"
              id="variableShifts"
              name="variableShifts"
              value={values.variableShifts}
              onClick={toggleVariableShifts}
            />
          </div>
        </div>
        <div className="m-3 row">
          {Object.keys(errors).length > 0 && (
            <p className="error text-center">
              Veuillez remplir tout le formulaire
            </p>
          )}
          <input
            type="submit"
            value="Soumettre"
            className="btn btn-primary col-auto ms-auto me-auto"
          />
        </div>
      </form>
    </div>
  );
};

export default FormEvaluationEntreprise;
