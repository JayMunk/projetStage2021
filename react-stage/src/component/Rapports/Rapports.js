import { React, useContext } from 'react'
import "./../../Css/RapportCSS.css"
import { useHistory } from 'react-router-dom'
import { UserInfoContext } from '../../contexts/UserInfo'

import OffresValides from './List/OffresValides'
import OffresInvalides from './List/OffresInvalide'
import EtudiantsInscrient from './List/EtudiantsInscrient'
import CvsPendingEtRejected from './List/CvsPendingEtRejected'
import EtudiantsPasDeCv from './List/EtudiantsPasDeCv'
import EtudiantsPasEntrevue from './List/EtudiantsPasEntrevue'
import EtudiantsEnAttenteEntrevue from './List/EtudiantsEnAttenteEntrevue'
import EtudiantsEnAttenteReponseEntrevue from './List/EtudiantsEnAttenteReponseEntrevue'
import EtudiantsTrouveStage from './List/EtudiantsTrouveStage'
import EtudiantsPasEvaluationMoniteur from './List/EtudiantsPasEvaluationMoniteur'
import EtudiantsPasEntrepreriseEvaluationSuperviseur from './List/EtudiantsPasEntrepreriseEvaluationSuperviseur'


const Rapports = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const history = useHistory()

    return (
        <div>
            <OffresValides />
            <OffresInvalides />
            <EtudiantsInscrient />
            <CvsPendingEtRejected />
            <EtudiantsPasDeCv />
            <EtudiantsPasEntrevue />
            <EtudiantsEnAttenteEntrevue />
            <EtudiantsEnAttenteReponseEntrevue />
            <EtudiantsTrouveStage />
            <EtudiantsPasEvaluationMoniteur />
            <EtudiantsPasEntrepreriseEvaluationSuperviseur />


            {loggedUser.isLoggedIn ? null : history.push("/login")}

        </div>


    )

}

export default Rapports
