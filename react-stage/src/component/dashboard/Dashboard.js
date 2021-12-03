import React, { useContext, useState, useEffect } from 'react'
import { UserInfoContext } from './../../contexts/UserInfo'
import EtudiantDashboard from './etudiantDashboard/EtudiantDashboard'
import DashboardGestionnaire from './gestionnaireDashboard/DashboardGestionnaire'
import SuperviseurDashboard from './superviseurDashboard/SuperviseurDashboard'
import MoniteurDashboard from './moniteurDashboard/MoniteurDashboard'
import { useHistory } from 'react-router-dom'



const Dashboard = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const history = useHistory()
    return (
        <>
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
                    null}
            {
                loggedUser.role === "GESTIONNAIRE" ?
                    < DashboardGestionnaire />
                    :
                    null}

            {
                loggedUser.isLoggedIn ? null : history.push("/login")
            }
        </>
    )
}

export default Dashboard