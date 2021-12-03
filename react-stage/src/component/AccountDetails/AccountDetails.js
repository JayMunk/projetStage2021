import React, { useContext, useState, useEffect } from "react"
import { UserInfoContext } from "../../contexts/UserInfo"
import { useHistory } from "react-router-dom"
import UserService from "../../services/UserService"

import '../../Css/FormInscriptionCSS.css'
const AccountDetails = () => {
  const [loggedUser] = useContext(UserInfoContext)
  const history = useHistory()
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

  useEffect(async () => {
    if (!loggedUser.isLoggedIn) history.push("/login")
    if (loggedUser.isLoggedIn) {
      const data = await UserService.getUserByEmail(loggedUser.courriel)
      setFullUser(data)
    }
  }, []);

  useEffect(() => {
    if (fullUser.courriel != null) {
      console.log(fullUser, "LOGGING FULLUSER");
    }
  }, [fullUser]);

  return (
    <body>
      <form className="formInscription">
        <h2>Votre compte</h2>

        <label htmlFor="prenom">
          Prenom
        </label>
        <input
          id="prenom"
          type="text"
          name="prenom"
          defaultValue={fullUser.prenom}
          readOnly
        ></input>

        <label htmlFor="nom">
          Nom
        </label>
        <input
          id="nom"
          type="text"
          name="nom"
          defaultValue={fullUser.nom}
          readOnly
        ></input>


        <label htmlFor="courriel" >
          Courriel
        </label>
        <input
          id="courriel"
          type="email"
          name="courriel"
          defaultValue={fullUser.courriel}
          readOnly
        ></input>


        <label htmlFor="password" >
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          name="password"
          defaultValue={fullUser.password}
          readOnly
        ></input>


        <label htmlFor="numTelephone" >
          Numero de telephone
        </label>
        <input
          id="numTelephone"
          type="text"
          name="numTelephone"
          defaultValue={fullUser.numTelephone}
          readOnly
        ></input>{" "}

        {fullUser.role == "ETUDIANT" && (
          <>

            <label htmlFor="programme" >
              Programme
            </label>
            <input
              id="programme"
              type="text"
              name="programme"
              defaultValue={fullUser.programme}
              readOnly>
            </input>


            <label htmlFor="adresse" >
              Adresse
            </label>
            <input
              id="adresse"
              type="text"
              name="adresse"
              defaultValue={fullUser.adresse}
              readOnly>
            </input>


            <label htmlFor="numMatricule" >
              Numero de matricule
            </label>
            <input
              id="numMatricule"
              type="text"
              name="numMatricule"
              defaultValue={fullUser.numMatricule}
              readOnly>
            </input>

            <div>
              <input id="hasLicense" type="checkbox" name="hasLicense" checked={fullUser.hasLicense} readOnly></input>
              <label>Permis de conduite:</label>
            </div>

            <div>
              <input id="hasVoiture" type="checkbox" name="hasVoiture" checked={fullUser.hasVoiture} readOnly></input>
              <label>Possède/conduit une voiture</label>
            </div>
          </>
        )}
        {fullUser.role == "MONITEUR" && (
          <>

            <label htmlFor="nomEntreprise" >
              Nom de l'entreprise
            </label>
            <input
              id="nomEntreprise"
              type="text"
              name="nomEntreprise"
              defaultValue={fullUser.nomEntreprise}
            ></input>


            <label htmlFor="adresseEntreprise" >
              Adresse de l'entreprise
            </label>
            <input
              id="adresseEntreprise"
              type="text"
              name="adresseEntreprise"
              defaultValue={fullUser.adresseEntreprise}
            ></input>
          </>
        )}
        {fullUser.role == "SUPERVISEUR" && (
          <>

            <label htmlFor="departement" >
              Departement
            </label>
            <input
              id="departement"
              type="text"
              name="departement"
              defaultValue={fullUser.departement}
            ></input>


            <label htmlFor="specialite" >
              Specialite
            </label>
            <input
              id="specialite"
              type="text"
              name="specialite"
              defaultValue={fullUser.specialite}
            ></input>
          </>
        )}

        {fullUser.role == "GESTIONNAIRE" && (
          <>

            <label htmlFor="departement" >
              Departement
            </label>
            <input
              id="departement"
              type="text"
              name="departement"
              defaultValue={fullUser.departement}
            ></input>
          </>
        )}

      </form>
    </body>
  );
};

export default AccountDetails;
