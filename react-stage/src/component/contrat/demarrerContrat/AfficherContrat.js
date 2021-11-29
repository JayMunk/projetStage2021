import React, { useContext } from 'react'
import { UserInfoContext } from './../../../contexts/UserInfo';
import GestionnaireAfficherContrat from './GestionnaireAfficherContrat';
import EtudiantAfficherContrat from './EtudiantAfficherContrat';
import MoniteurAfficherContrat from './MoniteurAfficherContrat';

const AfficherContrat = () => {
    const [loggedUser] = useContext(UserInfoContext)

    return (
        <body id="body">
            {loggedUser.role === "ETUDIANT"?
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
