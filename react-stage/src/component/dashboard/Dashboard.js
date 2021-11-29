import React, { useContext, useState, useEffect } from 'react'
import { UserInfoContext} from './../../contexts/UserInfo'
import EtudiantDashboard from './etudiantDashboard/EtudiantDashboard'
import DashboardGestionnaire from './gestionnaireDashboard/DashboardGestionnaire'
import SuperviseurDashboard from './superviseurDashboard/SuperviseurDashboard'
import MoniteurDashboard from './moniteurDashboard/MoniteurDashboard'


const Dashboard = () => {
    const [loggedUser] = useContext(UserInfoContext)
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