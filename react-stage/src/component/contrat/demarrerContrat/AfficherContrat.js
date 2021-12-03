import React, { useContext, useEffect } from 'react'
import { UserInfoContext } from './../../../contexts/UserInfo'
import GestionnaireAfficherContrat from './GestionnaireAfficherContrat'
import EtudiantAfficherContrat from './EtudiantAfficherContrat'
import MoniteurAfficherContrat from './MoniteurAfficherContrat'
import { useHistory } from "react-router-dom"

const AfficherContrat = () => {
    const [loggedUser] = useContext(UserInfoContext)
    const history = useHistory()

    useEffect(() => {
        if (!loggedUser.isLoggedIn) history.push("/login")
    }, [])

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
