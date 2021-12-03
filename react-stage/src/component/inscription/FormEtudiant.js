import { React, useState } from 'react'
import { useHistory } from "react-router-dom";
import UserService from '../../services/UserService';

import '../../Css/FormInscriptionCSS.css'

const FormEtudiant = () => {
    const history = useHistory();

    const [values, setValues] = useState({
        prenom: "",
        nom: "",
        courriel: "",
        password: "",
        password2: "",
        numTelephone: "",
        programme: "",
        adresse: "",
        numMatricule: "",
        hasLicense: false,
        hasVoiture: false,
    })
    const [errors, setErrors] = useState(0)
    const [hasVoiture, setHasVoiture] = useState(false)
    const [hasLicense, setHasLicense] = useState(false)
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

        if (!values.programme) {
            errors.programme = "Nom du programme requis"
        }

        if (!values.adresse) {
            errors.adresse = "Adresse requise"
        }

        if (!values.numMatricule) {
            errors.numMatricule = "Numero de matricule requis"
        }

        return errors

    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(checkError(values))

        setSubmitted(true)
        if (Object.keys(checkError(values)).length === 0 || Object.keys(checkError(values)).length === undefined && submitted) {


            values.hasLicense = hasLicense
            values.hasVoiture = hasVoiture
            UserService.saveEtudiant(values);
            history.push("/login");

        }
    }



    const handleClickVoiture = () => setHasVoiture(!hasVoiture)

    const handleClickLicense = () => setHasLicense(!hasLicense)


    return (
        <body id="body">
            <h2>Créer un compte de type étudiant</h2>
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
                    Programme:
                </label>
                <input id="programme" type="text" name="programme" value={values.programme} onChange={handleChange}></input>
                {errors.programme && <p className="error">{errors.programme}</p>}


                <label>
                    Adresse:
                </label>
                <input id="adresse" type="text" name="adresse" value={values.adresse} onChange={handleChange}></input>
                {errors.adresse && <p className="error">{errors.adresse}</p>}


                <label>
                    Numéro de votre matricule:
                </label>
                <input id="numMatricule" type="text" name="numMatricule" value={values.numMatricule} onChange={handleChange}></input>
                {errors.numMatricule && <p className="error">{errors.numMatricule}</p>}


                <div>
                    <input id="hasLicense" type="checkbox" name="hasLicense" onClick={handleClickLicense} value={hasLicense}></input>
                    <label>Permis de conduite:</label>
                </div>

                <div>
                    <input id="hasVoiture" type="checkbox" name="hasVoiture" onClick={handleClickVoiture} value={hasVoiture}></input>
                    <label>Possède/conduit une voiture</label>
                </div>
                <button type="submit" className="button">S'inscrire</button>
            </form >
        </body>
    );
}

export default FormEtudiant
