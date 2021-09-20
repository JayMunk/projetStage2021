import React from 'react'
import useFormEtudiant from './useFormEtudiant'
import validateInfoEtudiant from './validateInfoEtudiant';
import './FormEtudiant';



const FormEtudiantHTML = ({submitForm}) => {
    const {handleChange,values, handleSubmit, errors} = useFormEtudiant(submitForm,validateInfoEtudiant);
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
                    <label htmlFor="programme"
                    className="form-label">
                       Programme
                    </label>
                    <input id="programme" type="text" name="programme" className="form-input" placeholder="Entrez le nom de votre programme" value={values.programme} onChange={handleChange}></input>
                    {errors.programme && <p>{errors.programme}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="adresse"
                    className="form-label">
                       Adresse
                    </label>
                    <input id="adresse" type="text" name="adresse" className="form-input" placeholder="Entrez votre adresse" value={values.adresse} onChange={handleChange}></input>
                    {errors.adresse && <p>{errors.adresse}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="numMatricule"
                    className="form-label">
                       Numero de matricule
                    </label>
                    <input id="numMatricule" type="text" name="numMatricule" className="form-input" placeholder="Entrez votre numero de matricule" value={values.numMatricule} onChange={handleChange}></input>
                    {errors.numMatricule && <p>{errors.numMatricule}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="hasLicense"
                    className="form-label">
                        Cochez si vous avez votre permis de conduite
                    </label>
                    <input id="hasLicense" type="checkbox" name="hasLicense" className="form-input" placeholder="" value={values.hasLicense} onChange={handleChange}></input>
                    {errors.hasLicense && <p>{errors.hasLicense}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="hasVoiture"
                    className="form-label">
                       Cochez si vous avez une voiture
                    </label>
                    <input id="hasVoiture" type="checkbox" name="hasVoiture" className="form-input" placeholder="Cochez si vous avez une voiture" value={values.hasLicense} onChange={handleChange}></input>
                    {errors.hasVoiture && <p>{errors.hasVoiture}</p>}
                </div>

                <button className="form-input-btn" type="submit">S'inscrire</button>
                <span className="form-input-login">Déjà un compte? Login <a href="#">ici</a></span>
            </form>
        </div>
    )
}

export default FormEtudiantHTML
