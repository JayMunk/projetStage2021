import React, { useState } from "react";

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
    garderStagiaire: "peutEtre",
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

    if (!values.moniteurFonction) {
      errors.moniteurFonction = "Fonction requis";
    }

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
    <div>
      <button type="button" className="btn btn-danger" onClick={onClickCancel}>
        Annuler
      </button>
      <h1>Évaluation du stagiaire</h1>
      <form className="container" onSubmit={onSubmit}>
        <div className="border p-5">
          <label>Nom de l'élève: </label>
          <input
            type="text"
            value={
              values.contrat.etudiant.prenom + " " + values.contrat.etudiant.nom
            }
            readOnly
          />

          <label>Programme d'études: </label>
          <input
            type="text"
            value={values.contrat.etudiant.programme}
            readOnly
          />

          <label>Nom de l'entreprise: </label>
          <input
            type="text"
            value={values.contrat.moniteur.nomEntreprise}
            readOnly
          />

          <label>Nom du superviseur: </label>
          <input
            type="text"
            value={
              values.contrat.moniteur.prenom + " " + values.contrat.moniteur.nom
            }
            readOnly
          />

          <label htmlFor="moniteurFonction">Fonction: </label>
          <input
            type="text"
            id="moniteurFonction"
            name="moniteurFonction"
            value={values.moniteurFonction}
            onChange={handleChange}
          />
          {errors.moniteurFonction && (
            <p className="error">{errors.moniteurFonction}</p>
          )}

          <label>Téléphone: </label>
          <input
            type="text"
            value={values.contrat.moniteur.numTelephone}
            readOnly
          />
        </div>
        <div className="border p-5">
          <h2>1. PRODUCTIVITÉ</h2>
          <p className="text-center">
            Capacité d'optimiser son rendement au travail
          </p>
          <div className="row mb-3">
            <div className="col-lg text-center">
              <b>Le stagiaire a été en mesure de: </b>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>N/A</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>a) planifier et organiser son travail de façon efficace</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="0"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="0"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="0"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="0"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="0"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>
                b) comprendre rapidement les directives relatives à son travail
              </p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="1"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="1"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="1"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="1"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="1"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>c) maintenir un rythme de travail soutenu</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="2"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="2"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="2"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="2"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="2"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>d) établir ses priorités</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="3"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="3"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="3"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="3"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="3"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>e) respecter ses échéanciers</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="4"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="4"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="4"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="4"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="4"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <label htmlFor="commentairesProductivite">Commentaires: </label>
          <input
            type="text"
            id="commentairesProductivite"
            name="commentairesProductivite"
            value={values.commentairesProductivite}
            onChange={handleChange}
          />
        </div>

        <div className="border p-5">
          <h2>2. QUALITÉ DU TRAVAIL</h2>
          <p className="text-center">
            Capacité de s'acquitter des tâches sous sa responsabilité en
            s'imposant personnellement des normes de qualité
          </p>
          <div className="row mb-3">
            <div className="col-lg text-center">
              <b>Le stagiaire a été en mesure de: </b>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>N/A</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>a) respecter les mandats qui lui ont été confiés</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="5"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="5"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="5"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="5"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="5"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>
                b) porter attantion aux détails dans la réalisation de ses
                tâches
              </p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="6"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="6"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="6"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="6"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="6"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>c) vérifier son travail, s'assurer que rien n'a été oublié</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="7"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="7"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="7"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="7"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="7"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>d) rechercher des occasions de se perfectionner</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="8"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="8"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="8"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="8"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="8"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>e) faire une bonne analyse des problèmes rencontrés</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="9"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="9"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="9"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="9"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="9"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <label htmlFor="commentairesTravail">Commentaires: </label>
          <input
            type="text"
            id="commentairesTravail"
            name="commentairesTravail"
            value={values.commentairesTravail}
            onChange={handleChange}
          />
        </div>

        <div className="border p-5">
          <h2>3. QUALITÉS DES RELATIONS INTERPERSONNELLES</h2>
          <p className="text-center">
            Capacité d'établir des interrelations harmonieuses dans son milieu
            de travail
          </p>
          <div className="row mb-3">
            <div className="col-lg text-center">
              <b>Le stagiaire a été en mesure de: </b>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>N/A</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>a) établir facilement des contacts avec les gens</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="10"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="10"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="10"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="10"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="10"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>b) contribuer activement au travail d'équipe</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="11"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="11"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="11"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="11"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="11"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>c) s'adapter facilement à la culture de l'entreprise</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="12"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="12"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="12"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="12"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="12"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>d) accepter les critiques constructives</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="13"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="13"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="13"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="13"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="13"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>e) être respectueux envers les gens</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="14"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="14"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="14"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="14"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="14"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>
                f) faire preuve d'écoute active en essayant de comprendre le
                point de vue de l'autre
              </p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="15"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="15"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="15"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="15"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="15"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <label htmlFor="commentairesRelations">Commentaires: </label>
          <input
            type="text"
            id="commentairesRelations"
            name="commentairesRelations"
            value={values.commentairesRelations}
            onChange={handleChange}
          />
        </div>

        <div className="border p-5">
          <h2>4. HABILETÉS PERSONNELLES</h2>
          <p className="text-center">
            Capacité de faire preuve d'attitudes ou de comportements matures et
            responsables
          </p>
          <div className="row mb-3">
            <div className="col-lg text-center">
              <b>Le stagiaire a été en mesure de: </b>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en accord</p>
            </div>
            <div className="col-sm text-center">
              <p>Plutôt en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>Totalement en désaccord</p>
            </div>
            <div className="col-sm text-center">
              <p>N/A</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>a) démontrer de l'intérêt et de la motivation au travail</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="16"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="16"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="16"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="16"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="16"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>b) exprimer clairement ses idées</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="17"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="17"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="17"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="17"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="17"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>c) faire preuve d'initiative</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="18"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="18"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="18"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="18"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="18"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>d) travailler de façon sécuritaire</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="19"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="19"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="19"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="19"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="19"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>
                e) démontrer un bon sens des responsabilités ne requérant qu'un
                minimum de supervision
              </p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="20"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="20"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="20"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="20"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="20"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg text-center">
              <p>f) être ponctuel et assidu à son travail</p>
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="21"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="21"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="21"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="21"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
            <div className="col-sm text-center">
              <input
                type="radio"
                name="21"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <label htmlFor="commentairesAttitude">Commentaires: </label>
          <input
            type="text"
            id="commentairesAttitude"
            name="commentairesAttitude"
            value={values.commentairesAttitude}
            onChange={handleChange}
          />
        </div>

        <div className="border p-5">
          <h2>APPRÉCIATION GLOBALE DU STAGIAIRE</h2>
          <div className="row mb-3">
            <div className="col-lg">
              Les habiletés démontrées dépassent de beaucoup les attentes
            </div>
            <div className="col-sm">
              <input
                type="radio"
                name="22"
                value="4"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg">
              Les habiletés démontrées dépassent les attentes
            </div>
            <div className="col-sm">
              <input
                type="radio"
                name="22"
                value="3"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg">
              Les habiletés démontrées répondent pleinement aux attentes
            </div>
            <div className="col-sm">
              <input
                type="radio"
                name="22"
                value="2"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg">
              Les habiletés démontrées répondent partiellement aux attentes
            </div>
            <div className="col-sm">
              <input
                type="radio"
                name="22"
                value="1"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg">
              Les habiletés démontrées ne répondent pas aux attentes
            </div>
            <div className="col-sm">
              <input
                type="radio"
                name="22"
                value="0"
                onChange={handleChangeRadio}
              />
            </div>
          </div>
          <label htmlFor="commentairesGlobale">
            PRÉCISEZ VOTRE APPRÉCIATION:{" "}
          </label>
          <input
            type="text"
            id="commentairesGlobale"
            name="commentairesGlobale"
            value={values.commentairesGlobale}
            onChange={handleChange}
          />
          <label htmlFor="communiqueAuStagiaire">
            Cette évaluation a été discutée avec le stagiaire:{" "}
          </label>
          <input
            className="m-3"
            type="checkbox"
            id="communiqueAuStagiaire"
            name="communiqueAuStagiaire"
            value={values.communiqueAuStagiaire}
            onClick={toggleCommunique}
          />
        </div>
        <div className="border p-5">
          <label htmlFor="heuresEncadrementParSemaine">
            Veuillez indiquer le nombre d'heures réel par semaine d'encadrement
            accordé au stagiaire:{" "}
          </label>
          <input
            type="number"
            id="heuresEncadrementParSemaine"
            name="heuresEncadrementParSemaine"
            value={values.heuresEncadrementParSemaine}
            onChange={handleChange}
          />
        </div>
        <div className="border p-5">
          <div className="row">
            <h2>
              L'ENTREPRISE AIMERAIT ACCUEILLIR CET ÉLÈVE POUR SON PROCHAIN
              STAGE:
            </h2>
            <input
              type="checkbox"
              id="garderStagiaire"
              name="garderStagiaire"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="commentairesFormation">
            La formation technique du stagiaire était-elle suffisante pour
            accomplir le mandat de stage?
          </label>
          <input
            type="text"
            id="commentairesFormation"
            name="commentairesFormation"
            value={values.commentairesFormation}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Soumettre" className="button" />
        {errors.moniteurFonction && (
          <p className="error">Veuillez remplir tout le formulaire</p>
        )}
      </form>
    </div>
  );
};

export default FormEvaluationEtudiant;
