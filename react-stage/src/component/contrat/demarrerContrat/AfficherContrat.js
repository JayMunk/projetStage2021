import React, { useContext } from 'react'
import { UserInfoContext } from './../../../contexts/UserInfo';
import GestionnaireAfficherContrat from './GestionnaireAfficherContrat';
import EtudiantAfficherContrat from './EtudiantAfficherContrat';
import MoniteurAfficherContrat from './MoniteurAfficherContrat';
import { useHistory } from "react-router-dom";

const AfficherContrat = () => {
    const [loggedUser] = useContext(UserInfoContext)
    const history = useHistory();

    if (!loggedUser.isLoggedIn && !(loggedUser.role === "ETUDIANT" || loggedUser.role === "GESTIONNAIRE" || loggedUser.role === "MONITEUR")) history.push("/login")


    return (
        <body id="body">
            {loggedUser.role === "ETUDIANT" ?
                <EtudiantAfficherContrat />
                :
                null
            }
            {loggedUser.role === "GESTIONNAIRE" ?
                <GestionnaireAfficherContrat />
                :
                null
            }
            {loggedUser.role === "MONITEUR" ?
                <MoniteurAfficherContrat />
                :
                null
            }
        </body>

    )
}

export default AfficherContrat
