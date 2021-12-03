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
import { Col, Row } from 'react-bootstrap'


const Rapports = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const history = useHistory()

    return (
        <div>
            <h3 id="titleRapports" className="text-info">Pour voir la liste au complet ou pour plus de détails veuillez télécharger le pdf.</h3>

            <Row>
                <Col lg="6" sm="10" className="mx-auto">
                    <OffresValides />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <OffresInvalides />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsInscrient />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <CvsPendingEtRejected />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsPasDeCv />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsPasEntrevue />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsEnAttenteEntrevue />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsEnAttenteReponseEntrevue />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsTrouveStage />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsPasEvaluationMoniteur />
                </Col>
                <Col lg="6" sm="10" className="mx-auto">
                    <EtudiantsPasEntrepreriseEvaluationSuperviseur />
                </Col>
            </Row>


            {loggedUser.isLoggedIn ? null : history.push("/login")}

        </div>


    )

}

export default Rapports
