import React from 'react'
import useFormSuperviseur from './useFormSuperviseur'
import validateInfoSuperviseur from './validateInfoSuperviseur';
import './FormSuperviseur';



const FormSuperviseurHTML = ({submitForm}) => {
    const {handleChange,values, handleSubmit, errors} = useFormSuperviseur(submitForm,validateInfoSuperviseur);
    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Créez votre compte dès maintenant!</h1>

                <div className="form-inputs">
                    <label htmlFor="prenom"
                    className="form-label">
                       Prenom
                    </label>
                    <input id="prenom" type="text" name="prenom" className="form-input" placeholder="Entrez votre prenom" value={values.prenom} onChange={handleChange}></input>
                    {errors.prenom && <p>{errors.prenom}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="nom"
                    className="form-label">
                       Nom
                    </label>
                    <input id="nom" type="text" name="nom" className="form-input" placeholder="Entrez votre nom" value={values.nom} onChange={handleChange}></input>
                    {errors.nom && <p>{errors.nom}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="courriel"
                    className="form-label">
                       Courriel
                    </label>
                    <input id="courriel" type="email" name="courriel" className="form-input" placeholder="Entrez votre courriel" value={values.email} onChange={handleChange}></input>
                    {errors.courriel && <p>{errors.courriel}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="password"
                    className="form-label">
                       Mot de passe
                    </label>
                    <input id="password" type="password" name="password" className="form-input" placeholder="Entrez votre mot de passe" value={values.password} onChange={handleChange}></input>
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="password2"
                    className="form-label">
                       Confirmez le mot de passe
                    </label>
                    <input id="password2" type="password" name="password2" className="form-input" placeholder="Confirmez votre mot de passe" value={values.password2} onChange={handleChange}></input>
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="numTelephone"
                    className="form-label">
                       Numero de telephone
                    </label>
                    <input id="numTelephone" type="text" name="numTelephone" className="form-input" placeholder="Entrez votre numero de telephone" value={values.numTelephone} onChange={handleChange}></input>
                    {errors.numTelephone && <p>{errors.numTelephone}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="departement"
                    className="form-label">
                       Departement
                    </label>
                    <input id="departement" type="text" name="departement" className="form-input" placeholder="Entrez le nom de votre departement" value={values.departement} onChange={handleChange}></input>
                    {errors.departement && <p>{errors.departement}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="specialite"
                    className="form-label">
                       Specialite
                    </label>
                    <input id="specialite" type="text" name="specialite" className="form-input" placeholder="Entrez votre specialite" value={values.specialite} onChange={handleChange}></input>
                    {errors.specialite && <p>{errors.specialite}</p>}
                </div>

                <button className="form-input-btn" type="submit">S'inscrire</button>
                <span className="form-input-login">Déjà un compte? Login <a href="#">ici</a></span>
            </form>
        </div>
    )
}

export default FormSuperviseurHTML

