import React from 'react'
import useLoginUser from './useLoginUser'
import validateInfoLogin from './validateInfoLogin';
import './LoginUser';



const LoginUserHTML = ({submitForm}) => {
    const {handleChange,values, handleSubmit, errors} = useLoginUser(submitForm,validateInfoLogin);
    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Créez votre compte dès maintenant!</h1>

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

                <button className="form-input-btn" type="submit">S'inscrire</button>
                <span className="form-input-login">Déjà un compte? Login <a href="#">ici</a></span>
            </form>
        </div>
    )
}

export default LoginUserHTML

