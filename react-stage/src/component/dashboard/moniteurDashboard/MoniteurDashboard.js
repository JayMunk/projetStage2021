import React, { useContext, useState, useEffect, useRef } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'
import UserService from '../../../services/UserService'
import Offres from '../../Offres/Offres'
import Entrevue from './Entrevue'
import FormEntrevue from './FormEntrevue'
import '../../../Css/Dashboard.css'
import Table from "react-bootstrap/Table"

const MoniteurDashboard = () => {
    const [loggedUser] = useContext(UserInfoContext)
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
        specialite: String
    })
    const [listGestionnaires, setListGestionnaires] = useState([])
    const [reloadList, setReloadList] = useState(0)
    const handleReloadList = () => {
        setReloadList(reloadList + 1)
    }

    useEffect(() => {
        if (loggedUser.isLoggedIn) {
            UserService.getUserByEmail(loggedUser.courriel).then(data => {
                setFullUser(data)
                getGestionnaires()
            })

        }
    }, [])

    const getGestionnaires = async () => {
        const gestionnaires = await UserService.getGestionnaires()
        setListGestionnaires(gestionnaires)
    }

    const gestionnairesList = listGestionnaires.map((gestionnaire) =>
        <tr className="text-white" key={gestionnaire.id.toString()}>
            <td>{gestionnaire.prenom} {gestionnaire.nom}</td>
            <td>{gestionnaire.courriel}</td>
        </tr>)

    return (
        <div className="Dashboard">
            <div>
                <h1>Bonjour {fullUser.prenom} {fullUser.nom}</h1>
            </div>

            <div>
                <h2>Contact Gestionnaire</h2>
                <Table striped bordered hover variant="dark" className="DashboardTable">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Courriel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gestionnairesList}
                    </tbody>
                </Table>
            </div>
            <Offres />
            <FormEntrevue handleReloadList={handleReloadList} />
            <Entrevue reloadList={reloadList} handleReloadList={handleReloadList} />
        </div>
    )
}

export default MoniteurDashboard