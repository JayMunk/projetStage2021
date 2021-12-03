import { React, useState } from 'react'
import { useHistory } from "react-router-dom";
import UserService from '../../services/UserService';


import '../../Css/FormInscriptionCSS.css'

const FormSuperviseur = () => {
    const history = useHistory();

    const [values, setValues] = useState({
        prenom: "",
        nom: "",
        courriel: "",
        password: "",
        password2: "",
        numTelephone: "",
        departement: "",
        specialite: "",
    })
    const [errors, setErrors] = useState(0)
    const [submitted, setSubmitted] = useState(false)


    const handleChange = e => {


        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    function checkError(values) {
        let errors = {}

        if (!values.prenom) {
            errors.prenom = "Prenom requis"
        }

        if (!values.nom) {
            errors.nom = "Nom requis"
        }

        if (!values.courriel) {
            errors.courriel = "Courriel requis"
        }

        if (!values.password) {
            errors.password = "Mot de passe requis"
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/i.test(values.password)) {
            errors.password = "Le mot de passe requiert au moins 6 charactères, une majuscule, une minuscule et un chiffre "
        }

        if (!values.password2) {
            errors.password2 = "Mot de passe requis"
        } else if (values.password2 !== values.password) {
            errors.password2 = "Les mots de passe de correspondent pas"
        }

        if (!values.numTelephone) {
            errors.numTelephone = "Numero de telephone requis"
        }

        if (!values.departement) {
            errors.departement = "Nom du departement requis"
        }

        if (!values.specialite) {
            errors.specialite = "Specialité requise"
        }


        return errors

    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(checkError(values))

        setSubmitted(true)
        if (Object.keys(checkError(values)).length === 0 || Object.keys(checkError(values)).length === undefined && submitted) {

            UserService.saveSuperviseur(values);
            history.push("/login");

        }
    }


    return (
        <body id="body">
            <h2>Créer un compte de type superviseur</h2>
            <form onSubmit={handleSubmit} className="formInscription">
                <label>
                    Prenom:
                </label>
                <input id="prenom" type="text" name="prenom" value={values.prenom} onChange={handleChange}></input>
                {errors.prenom && <p className="error">{errors.prenom}</p>}

                <label>
                    Nom:
                </label>
                <input id="nom" type="text" name="nom" value={values.nom} onChange={handleChange}></input>
                {errors.nom && <p className="error">{errors.nom}</p>}


                <label>
                    Courriel:
                </label>
                <input id="courriel" type="email" name="courriel" value={values.email} onChange={handleChange}></input>
                {errors.courriel && <p className="error">{errors.courriel}</p>}

                <label>
                    Mot de passe:
                </label>
                <input id="password" type="password" name="password" value={values.password} onChange={handleChange}></input>
                {errors.password && <p className="error">{errors.password}</p>}


                <label>
                    Confirmez le mot de passe:
                </label>
                <input id="password2" type="password" name="password2" value={values.password2} onChange={handleChange}></input>
                {errors.password2 && <p className="error">{errors.password2}</p>}

                <label>
                    Numéro de téléphone:
                </label>
                <input id="numTelephone" type="text" name="numTelephone" value={values.numTelephone} onChange={handleChange}></input>
                {errors.numTelephone && <p className="error">{errors.numTelephone}</p>}

                <label>
                    Le nom de votre département:
                </label>
                <input id="departement" type="text" name="departement" value={values.departement} onChange={handleChange}></input>
                {errors.departement && <p className="error">{errors.departement}</p>}

                <label>
                    Votre spécialité:
                </label>
                <input id="specialite" type="text" name="specialite" value={values.adresseEntreprise} onChange={handleChange}></input>
                {errors.specialite && <p className="error">{errors.specialite}</p>}




                <button type="submit" className="button">S'inscrire</button>
            </form >
        </body >
    );
}

export default FormSuperviseur
