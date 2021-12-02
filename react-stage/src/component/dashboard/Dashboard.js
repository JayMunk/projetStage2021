import React, { useContext } from 'react'
import { UserInfoContext } from './../../contexts/UserInfo'
import EtudiantDashboard from './etudiantDashboard/EtudiantDashboard'
import DashboardGestionnaire from './gestionnaireDashboard/DashboardGestionnaire'
import SuperviseurDashboard from './superviseurDashboard/SuperviseurDashboard'
import MoniteurDashboard from './moniteurDashboard/MoniteurDashboard'
import { useHistory } from "react-router-dom"


const Dashboard = () => {
    const [loggedUser] = useContext(UserInfoContext)
    const history = useHistory()

    if (!loggedUser.isLoggedIn) history.push("/login")

    return (
        <body id="body">
            {
                loggedUser.role === "ETUDIANT" ?
                    < EtudiantDashboard />
                    :
                    null
            }
            {
                loggedUser.role === "SUPERVISEUR" ?
                    < SuperviseurDashboard />
                    :
                    null
            }
            {
                loggedUser.role === "MONITEUR" ?
                    < MoniteurDashboard />
                    :
                    null
            }
            {
                loggedUser.role === "GESTIONNAIRE" ?
                    < DashboardGestionnaire />
                    :
                    null
            }
        </body>
    )
}

export default Dashboard