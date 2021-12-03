import React, { useContext, useState, useEffect } from "react"
import { UserInfoContext } from '../../../contexts/UserInfo'
import { useHistory } from "react-router-dom"
import OffreService from '../../../services/OffreService'
import UserService from "../../../services/UserService"
import '../../../Css/FormContratOffre.css'

const FormOffre = () => {
    const history = useHistory()
    const [loggedUser] = useContext(UserInfoContext)
    const [values, setValues] = useState({
        titre: "",
        description: "",
        entreprise: "",
        isValid: false,
        adresse: "",
        dateDebut: "",
        dateFin: "",
        nbTotalSemaine: 0,
        horaireDebut: "",
        horaireFin: "",
        nbTotalHeuresParSemaine: 0,
        tauxHoraire: 0
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [listMoniteurs, setListMoniteurs] = useState([])

    useEffect(async () => {
        if (!loggedUser.isLoggedIn) history.push("/login")
        if (loggedUser.role == "GESTIONNAIRE") {
            setListMoniteurs(await UserService.getListAllMoniteurs())
            values.valid = true
        }
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        if (loggedUser.role == "GESTIONNAIRE") {
            setValues({ ...values, [name]: value, isValid: true })
        } else {
            setValues({
                ...values,
                [name]: value,
            })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors(checkError(values))
        setSubmitted(true)
        if (Object.keys(checkError(values)).length === 0 || Object.keys(checkError(values)).length === undefined && submitted) {
            await OffreService.saveOffre(values, loggedUser.courriel)
            history.push("/offres")
        }
    }

    const onChangeMoniteur = (e) => {
        let moniteur = JSON.parse(e.target.value)
        values.moniteur = moniteur
    }

    function checkError(values) {
        let errors = {}

        if (!values.titre) {
            errors.titre = "Titre requis"
        }

        if (!values.description) {
            errors.description = "Description requis"
        }

        if (!values.entreprise) {
            errors.entreprise = "Entreprise requis"
        }

        if (!values.adresse) {
            errors.adresse = "Adresse requis"
        }

        if (!values.dateDebut) {
            errors.dateDebut = "Date de début requis"
        }

        if (!values.dateFin) {
            errors.dateFin = "Date de fin requis"
        }

        if (!values.nbTotalSemaine) {
            errors.nbTotalSemaine = "Nombre total de semaine requis"
        }

        if (!values.horaireDebut) {
            errors.horaireDebut = "L'horaire de début est requis"
        }

        if (!values.horaireFin) {
            errors.horaireFin = "L'horaire de fin est requis"
        }

        if (!values.nbTotalHeuresParSemaine) {
            errors.nbTotalHeuresParSemaine = "Nombre total d'heures par semaine requis"
        }

        if (!values.tauxHoraire) {
            errors.tauxHoraire = "Taux horaire requis"
        }

        return errors
    }


    return (
        <body id="body">
            <form className="form FormContratOffre" onSubmit={handleSubmit}>
                <h1>Créez votre offre de stage dès maintenant!</h1>

                {loggedUser.role == "GESTIONNAIRE" ?
                    <div className="form-inputs">
                        <label htmlFor="moniteur"
                            className="form-label">
                            Moniteur
                        </label>
                        <select onChange={onChangeMoniteur}>
                            {listMoniteurs.map((moniteur) => (
                                <option value={JSON.stringify(moniteur)}>{moniteur.prenom} {moniteur.nom}</option>
                            ))}
                        </select>
                    </div>
                    : null}

                <div className="form-inputs">
                    <label htmlFor="titre"
                        className="form-label">
                        Titre
                    </label>
                    <input id="titre" type="text" name="titre" className="form-input" placeholder="Entrez le titre" value={values.titre} onChange={handleChange}></input>
                    {errors.titre && <p className="error">{errors.titre}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="description"
                        className="form-label">
                        Description
                    </label>
                    <input id="description" type="text" name="description" className="form-input" placeholder="Entrez la description" value={values.description} onChange={handleChange}></input>
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="entreprise"
                        className="form-label">
                        Entreprise
                    </label>
                    <input id="entreprise" type="text" name="entreprise" className="form-input" placeholder="Entrez votre entreprise" value={values.entreprise} onChange={handleChange}></input>
                    {errors.entreprise && <p className="error">{errors.entreprise}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="adresse"
                        className="form-label">
                        Adresse
                    </label>
                    <input id="adresse" type="text" name="adresse" className="form-input" placeholder="Entrez l'adresse de votre entreprise" value={values.adresse} onChange={handleChange}></input>
                    {errors.adresse && <p className="error">{errors.adresse}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="dateDebut"
                        className="form-label">
                        Date début
                    </label>
                    <input id="dateDebut" type="date" name="dateDebut" className="form-input" placeholder="Entrez la date de début" value={values.dateDebut} onChange={handleChange}></input>
                    {errors.dateDebut && <p className="error">{errors.dateDebut}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="dateFin"
                        className="form-label">
                        Date fin
                    </label>
                    <input id="dateFin" type="date" name="dateFin" className="form-input" placeholder="Entrez la date de fin" value={values.dateFin} onChange={handleChange}></input>
                    {errors.dateFin && <p className="error">{errors.dateFin}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="nbTotalSemaine"
                        className="form-label">
                        Nombre total de semaine
                    </label>
                    <input id="nbTotalSemaine" type="number" name="nbTotalSemaine" className="form-input" placeholder="Entrez le nombre total de semaine" value={values.nbTotalSemaine} onChange={handleChange}></input>
                    {errors.nbTotalSemaine && <p className="error">{errors.nbTotalSemaine}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="horaireDebut"
                        className="form-label">
                        Horaire début
                    </label>
                    <input value={values.horaireDebut} onChange={handleChange} id="horaireDebut" className="form-field" type="time" name="horaireDebut" />
                    {errors.horaireDebut && <p className="error">{errors.horaireDebut}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="horaireFin"
                        className="form-label">
                        Horaire fin
                    </label>
                    <input value={values.horaireFin} onChange={handleChange} id="horaireFin" className="form-field" type="time" name="horaireFin" />
                    {errors.horaireFin && <p className="error">{errors.horaireFin}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="nbTotalHeuresParSemaine"
                        className="form-label">
                        Nombre total d'heure par semaine
                    </label>
                    <input id="nbTotalHeuresParSemaine" type="number" name="nbTotalHeuresParSemaine" className="form-input" placeholder="Entrez le nombre total d'heure par semaine" value={values.nbTotalHeuresParSemaine} onChange={handleChange}></input>
                    {errors.nbTotalHeuresParSemaine && <p className="error">{errors.nbTotalHeuresParSemaine}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="tauxHoraire"
                        className="form-label">
                        Taux horaire
                    </label>
                    <input id="tauxHoraire" type="number" name="tauxHoraire" className="form-input" placeholder="Entrez le taux horaire" value={values.tauxHoraire} onChange={handleChange}></input>
                    {errors.tauxHoraire && <p className="error">{errors.tauxHoraire}</p>}
                </div>

                <button className="button" type="submit">Soumettre l'offre</button>
            </form>
        </body>
    )
}

export default FormOffre
