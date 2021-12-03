import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import EtudiantEvaluationGrid from "./EtudiantEvaluationGrid";
import ReadOnlyText from "./ReadOnlyText";

const FormEvaluationEtudiant = ({ contrat, onClickSubmit, onClickCancel }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    evaluationGrid: [],
    moniteurFonction: "",
    commentairesProductivite: "",
    commentairesTravail: "",
    commentairesRelations: "",
    commentairesAttitude: "",
    commentairesGlobale: "",
    communiqueAuStagiaire: false,
    heuresEncadrementParSemaine: 0,
    garderStagiaire: false,
    commentairesFormation: "",
    contrat: contrat,
  });
  const [evaluationGrid, setEvaluationGrid] = useState([
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "2",
  ]);
  const [communique, setCommunique] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangeRadio = (e) => {
    const { name, value } = e.target;
    console.log("handleChangeRadio" + name + " " + value);
    console.log("previousGrid" + evaluationGrid);
    setEvaluationGrid(
      Object.values({
        ...evaluationGrid,
        [name]: value,
      })
    );
  };

  const toggleCommunique = () => setCommunique(!communique);

  const checkErrors = () => {
    let errors = {};

    if (!values.moniteurFonction) errors.moniteurFonction = "Fonction requis";
    if (!values.commentairesProductivite)
      errors.commentairesProductivite = "Commentaires productivité requis";
    if (!values.commentairesTravail)
      errors.commentairesTravail = "Commentaires qualité du travail requis";
    if (!values.commentairesRelations)
      errors.commentairesRelations =
        "Commentaires relations interpersonnelles requis";
    if (!values.commentairesAttitude)
      errors.commentairesAttitude =
        "Commentaires habiletés personnelles requis";
    if (!values.commentairesGlobale)
      errors.commentairesGlobale = "Commentaires appréciation requis";
    if (!values.commentairesFormation)
      errors.commentairesFormation = "Commentaires formation requis";

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
      evaluation.communiqueAuStagiaire = communique;
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
      <h1 className="text-white text-center">Évaluation du stagiaire</h1>
      <form onSubmit={onSubmit}>
        <div className="border p-5">
          <ReadOnlyText
            label="Nom de l'élève:"
            value={
              values.contrat.etudiant.prenom + " " + values.contrat.etudiant.nom
            }

          />
          <ReadOnlyText
            label="Programme d'études:"
            value={values.contrat.etudiant.programme}
          />
          <ReadOnlyText
            label="Nom de l'entreprise:"
            value={values.contrat.moniteur.nomEntreprise}
          />
          <ReadOnlyText
            label="Nom du superviseur:"
            value={
              values.contrat.moniteur.prenom + " " + values.contrat.moniteur.nom
            }
          />
          <ReadOnlyText
            label="Moniteur téléphone:"
            value={values.contrat.moniteur.numTelephone}
          />

          <div className="row">
            <label className="text-white col-3">Fonction: </label>
            <input
              className="col text-center bg-secondary text-white"
              type="text"
              name="moniteurFonction"
              value={values.moniteurFonction}
              onChange={handleChange}
            />
          </div>
          {errors.moniteurFonction && (
            <p className="error text-center">{errors.moniteurFonction}</p>
          )}
        </div>
        <div className="border p-5">
          <h2>1. PRODUCTIVITÉ</h2>
          <p className="text-center text-white">
            Capacité d'optimiser son rendement au travail
          </p>
          <EtudiantEvaluationGrid
            handleChangeRadio={handleChangeRadio}
            questions={[
              {
                index: 0,
                text: "a) planifier et organiser son travail de façon efficace",
              },
              {
                index: 1,
                text: "b) comprendre rapidement les directives relatives à son travail",
              },
              {
                index: 2,
                text: "c) maintenir un rythme de travail soutenu",
              },
              {
                index: 3,
                text: "d) établir ses priorités",
              },
              {
                index: 4,
                text: "e) respecter ses échéanciers",
              },
            ]}
          />
          <div className="row mt-3">
            <label className="text-white col-auto">Commentaires: </label>
            <input
              className="col"
              type="text"
              id="commentairesProductivite"
              name="commentairesProductivite"
              value={values.commentairesProductivite}
              onChange={handleChange}
            />
          </div>
          {errors.commentairesProductivite && (
            <p className="error text-center">
              {errors.commentairesProductivite}
            </p>
          )}
        </div>

        <div className="border p-5">
          <h2>2. QUALITÉ DU TRAVAIL</h2>
          <p className="text-center text-white">
            Capacité de s'acquitter des tâches sous sa responsabilité en
            s'imposant personnellement des normes de qualité
          </p>
          <EtudiantEvaluationGrid
            handleChangeRadio={handleChangeRadio}
            questions={[
              {
                index: 5,
                text: "a) respecter les mandats qui lui ont été confiés",
              },
              {
                index: 6,
                text: "b) porter attantion aux détails dans la réalisation de ses tâches",
              },
              {
                index: 7,
                text: "c) vérifier son travail, s'assurer que rien n'a été oublié",
              },
              {
                index: 8,
                text: "d) rechercher des occasions de se perfectionner",
              },
              {
                index: 9,
                text: "e) faire une bonne analyse des problèmes rencontrés",
              },
            ]}
          />
          <div className="row mt-3">
            <label className="text-white col-auto">Commentaires: </label>
            <input
              className="col"
              type="text"
              name="commentairesTravail"
              value={values.commentairesTravail}
              onChange={handleChange}
            />
          </div>
          {errors.commentairesTravail && (
            <p className="error text-center">{errors.commentairesTravail}</p>
          )}
        </div>

        <div className="border p-5">
          <h2>3. QUALITÉS DES RELATIONS INTERPERSONNELLES</h2>
          <p className="text-center text-white">
            Capacité d'établir des interrelations harmonieuses dans son milieu
            de travail
          </p>
          <EtudiantEvaluationGrid
            handleChangeRadio={handleChangeRadio}
            questions={[
              {
                index: 10,
                text: "a) établir facilement des contacts avec les gens",
              },
              {
                index: 11,
                text: "b) contribuer activement au travail d'équipe",
              },
              {
                index: 12,
                text: "c) s'adapter facilement à la culture de l'entreprise",
              },
              {
                index: 13,
                text: "d) accepter les critiques constructives",
              },
              {
                index: 14,
                text: "e) être respectueux envers les gens",
              },
              {
                index: 15,
                text: "f) faire preuve d'écoute active en essayant de comprendre le point de vue de l'autre",
              },
            ]}
          />
          <div className="row mt-3">
            <label className="text-white col-auto">Commentaires: </label>
            <input
              className="col"
              type="text"
              name="commentairesRelations"
              value={values.commentairesRelations}
              onChange={handleChange}
            />
          </div>
          {errors.commentairesRelations && (
            <p className="error text-center">{errors.commentairesRelations}</p>
          )}
        </div>

        <div className="border p-5">
          <h2>4. HABILETÉS PERSONNELLES</h2>
          <p className="text-center text-white">
            Capacité de faire preuve d'attitudes ou de comportements matures et
            responsables
          </p>
          <EtudiantEvaluationGrid
            handleChangeRadio={handleChangeRadio}
            questions={[
              {
                index: 16,
                text: "a) démontrer de l'intérêt et de la motivation au travail",
              },
              {
                index: 17,
                text: "b) exprimer clairement ses idées",
              },
              {
                index: 18,
                text: "c) faire preuve d'initiative",
              },
              {
                index: 19,
                text: "d) travailler de façon sécuritaire",
              },
              {
                index: 20,
                text: "e) démontrer un bon sens des responsabilités ne requérant qu'un minimum de supervision",
              },
              {
                index: 21,
                text: "f) être ponctuel et assidu à son travail",
              },
            ]}
          />
          <div className="row mt-3">
            <label className="text-white col-auto">Commentaires: </label>
            <input
              className="col"
              type="text"
              name="commentairesAttitude"
              value={values.commentairesAttitude}
              onChange={handleChange}
            />
          </div>
          {errors.commentairesAttitude && (
            <p className="error text-center">{errors.commentairesAttitude}</p>
          )}
        </div>

        <div className="border p-5">
          <h2>APPRÉCIATION GLOBALE DU STAGIAIRE</h2>
          <div className="row mb-3">
            <div className="col text-white">
              Les habiletés démontrées dépassent de beaucoup les attentes
            </div>
            <div className="col">
              <input
                type="radio"
                name="22"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col text-white">
              Les habiletés démontrées dépassent les attentes
            </div>
            <div className="col">
              <input
                type="radio"
                name="22"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col text-white">
              Les habiletés démontrées répondent pleinement aux attentes
            </div>
            <div className="col">
              <input
                type="radio"
                name="22"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col text-white">
              Les habiletés démontrées répondent partiellement aux attentes
            </div>
            <div className="col">
              <input
                type="radio"
                name="22"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col text-white">
              Les habiletés démontrées ne répondent pas aux attentes
            </div>
            <div className="col">
              <input
                type="radio"
                name="22"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <label className="text-white col-auto">
              PRÉCISEZ VOTRE APPRÉCIATION:{" "}
            </label>
            <input
              className="col"
              type="text"
              name="commentairesGlobale"
              value={values.commentairesGlobale}
              onChange={handleChange}
            />
          </div>
          {errors.commentairesGlobale && (
            <p className="error text-center">{errors.commentairesGlobale}</p>
          )}
          <div className="row mt-3">
            <label className="text-white col-auto">
              Cette évaluation a été discutée avec le stagiaire:{" "}
            </label>
            <input
              className="col-1"
              type="checkbox"
              name="communiqueAuStagiaire"
              value={values.communiqueAuStagiaire}
              onClick={toggleCommunique}
            />
          </div>
        </div>
        <div className="border p-5 text-center">
          <div className="row">
            <label className="text-white text-center col-lg">
              Veuillez indiquer le nombre d'heures réel par semaine
              d'encadrement accordé au stagiaire:{" "}
            </label>
            <input
              className="col-auto ms-auto"
              type="number"
              name="heuresEncadrementParSemaine"
              value={values.heuresEncadrementParSemaine}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border p-5">
          <div className="row">
            <label className="col-lg text-center h2 text-white" for="garderStagiaire" >
              L'ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN
              STAGE:
            </label>
            <input
              className="col-auto ms-auto me-auto my-auto"
              type="checkbox"
              id="garderStagiaire"
              name="garderStagiaire"
              value={values.garderStagiaire}
              onChange={handleChange}
            />
          </div>
          <label className="text-white text-center">
            La formation technique du stagiaire était-elle suffisante pour
            accomplir le mandat de stage?
          </label>
          <input
            className="w-100"
            type="text"
            name="commentairesFormation"
            value={values.commentairesFormation}
            onChange={handleChange}
          />
          {errors.commentairesFormation && (
            <p className="error text-center">{errors.commentairesFormation}</p>
          )}
        </div>
        <div className="row m-3">
          {errors.moniteurFonction && (
            <p className="error text-center">
              Veuillez remplir tout le formulaire
            </p>
          )}
          <input type="submit" value="Soumettre" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default FormEvaluationEtudiant;
