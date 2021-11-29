import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../../contexts/UserInfo";

const AccountDetails = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [fullUser, setFullUser] = useState({
    id: Number,
    prenom: String,
    nom: String,
    courriel: String,
    password: String,
    numTelephone: String,
    role: String,
    programme: String,
    adresse: String,
    numMatricule: String,
    hasLicense: Boolean,
    hasVoiture: Boolean,
    departement: String,
    nomEntreprise: String,
    adresseEntreprise: String,
    specialite: String,
  });

  useEffect(() => {
    if (loggedUser.isLoggedIn) {
      fetch(`http://localhost:9191/user/${loggedUser.courriel}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data, "data");
          setFullUser(data);
        });
    }
  }, []);

  useEffect(() => {
    if (fullUser.courriel != null) {
      console.log(fullUser, "LOGGING FULLUSER");
    }
  }, [fullUser]);

  return (
    <div className="form-container">
      <div className="form-content-left">
        <img src="img/img-2.svg" alt="spaceship" className="form-img"></img>
      </div>
      <div className="form-content-right">
        <form className="form">
          <h1>Voici vos infos de compte</h1>

          <div className="form-inputs">
            <label htmlFor="prenom" className="form-label">
              Prenom
            </label>
            <input
              id="prenom"
              type="text"
              name="prenom"
              className="form-input"
              placeholder="Entrez votre prenom"
              defaultValue={fullUser.prenom}
              readOnly
            ></input>
          </div>

          <div className="form-inputs">
            <label htmlFor="nom" className="form-label">
              Nom
            </label>
            <input
              id="nom"
              type="text"
              name="nom"
              className="form-input"
              placeholder="Entrez votre nom"
              defaultValue={fullUser.nom}
              readOnly
            ></input>
          </div>

          <div className="form-inputs">
            <label htmlFor="courriel" className="form-label">
              Courriel
            </label>
            <input
              id="courriel"
              type="email"
              name="courriel"
              className="form-input"
              placeholder="Entrez votre courriel"
              defaultValue={fullUser.courriel}
              readOnly
            ></input>
          </div>

          {/* <div className="form-inputs">
                <label htmlFor="password"
                className="form-label">
                   Mot de passe
                </label>
                <input id="password" type="password" name="password" className="form-input" placeholder="Entrez votre mot de passe" value={fullUser.password} onChange={handleChange}></input>
                {errors.password && <p>{errors.password}</p>}
            </div> */}

          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              id="password"
              type="text"
              name="password"
              className="form-input"
              placeholder="Confirmez votre mot de passe"
              defaultValue={fullUser.password}
              readOnly
            ></input>
          </div>

          <div className="form-inputs">
            <label htmlFor="numTelephone" className="form-label">
              Numero de telephone
            </label>
            <input
              id="numTelephone"
              type="text"
              name="numTelephone"
              className="form-input"
              placeholder="Entrez votre numero de telephone"
              defaultValue={fullUser.numTelephone}
              readOnly
            ></input>{" "}
          </div>

          {fullUser.role == "ETUDIANT" && (
            <>
              <div className="form-inputs">
                <label htmlFor="programme" className="form-label">
                  Programme
                </label>
                <input
                  id="programme"
                  type="text"
                  name="programme"
                  className="form-input"
                  placeholder="Entrez le nom de votre programme"
                  defaultValue={fullUser.programme}
                  readOnly
                ></input>
              </div>

              <div className="form-inputs">
                <label htmlFor="adresse" className="form-label">
                  Adresse
                </label>
                <input
                  id="adresse"
                  type="text"
                  name="adresse"
                  className="form-input"
                  placeholder="Entrez votre adresse"
                  defaultValue={fullUser.adresse}
                  readOnly
                ></input>
              </div>

              <div className="form-inputs">
                <label htmlFor="numMatricule" className="form-label">
                  Numero de matricule
                </label>
                <input
                  id="numMatricule"
                  type="text"
                  name="numMatricule"
                  className="form-input"
                  placeholder="Entrez votre numero de matricule"
                  defaultValue={fullUser.numMatricule}
                  readOnly
                ></input>
              </div>

              <div className="form-inputs">
                <label htmlFor="hasLicense" className="form-label">
                  Cochez si vous avez votre permis de conduite
                </label>
                <input
                  id="hasLicense"
                  type="checkbox"
                  name="hasLicense"
                  className="form-input"
                  placeholder=""
                  checked={fullUser.hasLicense}
                  readOnly
                ></input>
              </div>

              <div className="form-inputs">
                <label htmlFor="hasVoiture" className="form-label">
                  Cochez si vous avez une voiture
                </label>
                <input
                  id="hasVoiture"
                  type="checkbox"
                  name="hasVoiture"
                  className="form-input"
                  placeholder=""
                  checked={fullUser.hasVoiture}
                  readOnly
                ></input>
              </div>
            </>
          )}
          {fullUser.role == "MONITEUR" && (
            <>
              <div className="form-inputs">
                <label htmlFor="nomEntreprise" className="form-label">
                  Nom de l'entreprise
                </label>
                <input
                  id="nomEntreprise"
                  type="text"
                  name="nomEntreprise"
                  className="form-input"
                  placeholder="Entrez le nom de votre entreprise"
                  defaultValue={fullUser.nomEntreprise}
                ></input>
              </div>

              <div className="form-inputs">
                <label htmlFor="adresseEntreprise" className="form-label">
                  Adresse de l'entreprise
                </label>
                <input
                  id="adresseEntreprise"
                  type="text"
                  name="adresseEntreprise"
                  className="form-input"
                  placeholder="Entrez l'adresse de votre entreprise"
                  defaultValue={fullUser.adresseEntreprise}
                ></input>
              </div>
            </>
          )}
          {fullUser.role == "SUPERVISEUR" && (
            <>
              <div className="form-inputs">
                <label htmlFor="departement" className="form-label">
                  Departement
                </label>
                <input
                  id="departement"
                  type="text"
                  name="departement"
                  className="form-input"
                  placeholder="Entrez le nom de votre departement"
                  defaultValue={fullUser.departement}
                ></input>
              </div>

              <div className="form-inputs">
                <label htmlFor="specialite" className="form-label">
                  Specialite
                </label>
                <input
                  id="specialite"
                  type="text"
                  name="specialite"
                  className="form-input"
                  placeholder="Entrez votre specialite"
                  defaultValue={fullUser.specialite}
                ></input>
              </div>
            </>
          )}

          {fullUser.role == "GESTIONNAIRE" && (
            <>
              <div className="form-inputs">
                <label htmlFor="departement" className="form-label">
                  Departement
                </label>
                <input
                  id="departement"
                  type="text"
                  name="departement"
                  className="form-input"
                  placeholder="Entrez le nom de votre departement"
                  defaultValue={fullUser.departement}
                ></input>
              </div>
            </>
          )}
          {/* <button className="form-input-btn" type="submit">S'inscrire</button>
            <span className="form-input-login">Déjà un compte? Login <Link to="/login">ici</Link></span> */}
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
