import React, { useContext, useState, useEffect } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'
import Offres from '../../Offres/Offres'
import VoirCVState from './VoirCVState'
import ContratService from '../../../services/ContratService'
import Entrevue from './Entrevue'
import UserService from '../../../services/UserService'
import '../../../Css/Dashboard.css'
import Table from "react-bootstrap/Table"


const EtudiantDashboard = () => {
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
    const [contrat, setContrat] = useState()
    const [superviseur, setSuperviseur] = useState({
        prenom: String,
        nom: String,
        courriel: String
    })
    const [moniteur, setMoniteur] = useState({
        prenom: String,
        nom: String,
        courriel: String
    })

    useEffect(async () => {
        if (loggedUser.isLoggedIn) {
            let data = await UserService.getUserByEmail(loggedUser.courriel)
            if (data != undefined) {
                UserService.getUserByEmail(loggedUser.courriel).then(data => {
                    setFullUser(data)
                    setSuperviseur(data.superviseur)
                    getContrat(data.courriel)
                })
            }
        }
    }, [])

    const getContrat = async (courriel) => {
        const dbContrat = await ContratService.getContratsByEtudiantEmail(courriel)
        setMoniteur(dbContrat.moniteur)
        setContrat(dbContrat)
    }

    return (
        <div className="Dashboard">
            <div>
                <h1>Bonjour {fullUser.prenom} {fullUser.nom}</h1>
            </div>
            <div>
                <h2>État de vos CV</h2>
                <VoirCVState />
            </div>
            {superviseur != null || contrat != null ?
                <div>
                    <h2>Contact</h2>
                    <Table striped bordered hover variant="dark" className="DashboardTable">
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Nom</th>
                                <th>Courriel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {superviseur != null ?
                                <tr >
                                    <td>Superviseur</td>
                                    <td>{superviseur.prenom} {superviseur.nom}</td>
                                    <td>{superviseur.courriel}</td>
                                </tr>
                                :
                                null
                            }
                            {contrat != null ?
                                <tr>
                                    <td>Moniteur</td>
                                    <td>{moniteur.prenom} {moniteur.nom}</td>
                                    <td>{moniteur.courriel}</td>
                                </tr>
                                :
                                null
                            }
                        </tbody>
                    </Table>
                </div>
                :
                null
            }

            <div>
                {contrat == null ?
                    <Offres />
                    :
                    null
                }
                {contrat == null ?
                    <Entrevue />
                    :
                    null
                }
            </div>
        </div>
    )
}

export default EtudiantDashboard