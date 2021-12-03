import { React, useEffect, useState, useRef, useContext } from 'react'
import EntrevueService from '../../../services/EntrevueService'
import Swal from 'sweetalert2'
import '../../../Css/Dashboard.css'
import Table from "react-bootstrap/Table"
import UserService from "../../../services/UserService"
import { UserInfoContext } from "../../../contexts/UserInfo"

const FormEntrevue = ({ handleReloadList }) => {
    const [values, setValues] = useState({
        titre: "",
        date: "",
        time: "",
        etudiantId: "",
        moniteurId: ""
    })
    const [listEtudiants, setListEtudiants] = useState([])
    const etudiantID = useRef(0)
    const [loggedUser] = useContext(UserInfoContext)
    const [moniteur, setMoniteur] = useState([])





    useEffect(async () => {

        const moniteur = await UserService.getUserByEmail(loggedUser.courriel)
        setMoniteur(moniteur)

        const dataListEtudiant = await UserService.getListAllEtudiants()
        setListEtudiants(dataListEtudiant)
    }, [])





    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleChangeSelectedEtudiant = e => {
        etudiantID.current = e.target.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (etudiantID.current !== 0) {
            await fetchAndPost()
            handleReloadList()
            Swal.fire({
                title: 'Succès!',
                text: 'L`entrevue est crée',
                icon: 'success',
            })
        }
        else {
            Swal.fire({
                title: 'Erreur!',
                text: 'Veuillez sélectionner un étudiant et/ou un moniteur',
                icon: 'error',
            })
        }

    }

    const fetchAndPost = async () => {
        const moniteurEtudiant = await fetchEtudiant()
        postEntrevue(moniteurEtudiant[0])

    }

    const fetchEtudiant = async () => {
        const moniteurEtudiant = []
        const dataEtudiant = await UserService.getEtudiantById(etudiantID.current)
        moniteurEtudiant.push(dataEtudiant);


        return moniteurEtudiant;

    }

    const postEntrevue = (etudiant) => {
        const entrevue = {
            titre: values.titre,
            date: values.date,
            time: values.time,
            etudiant: etudiant,
            moniteur: moniteur,
            nomEntreprise: moniteur.nomEntreprise
        }
        console.log(entrevue, "objet entrevue")
        EntrevueService.addEntrevue(entrevue)
    }




    return (
        <div>
            <h2>Créer une entrevue</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <Table striped bordered hover variant="dark" className="DashboardTable FormEntrevue">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Id de l'étudiant</th>
                            <th>Créer</th>
                        </tr>
                    </thead>
                    <tr>
                        <td >
                            <input
                                value={values.titre}
                                onChange={handleChange}
                                id="titre"
                                type="text"
                                placeholder="Titre"
                                name="titre" />
                        </td>
                        <td>
                            <input
                                value={values.date}
                                onChange={handleChange}
                                id="date"
                                className="text-white"
                                type="date"
                                name="date" />
                        </td>
                        <td>
                            <input
                                value={values.time}
                                onChange={handleChange}
                                id="time"
                                className="text-white"
                                type="time"
                                name="time" />
                        </td>
                        <td>

                            <select name="etudiant" onChange={handleChangeSelectedEtudiant} className="text-white">
                                <option>Sélectionner un option</option>
                                {
                                    listEtudiants.map((etudiant) =>
                                        <option value={etudiant.id}>{etudiant.prenom} {etudiant.nom}</option>)
                                }
                            </select>
                        </td>
                        <td>
                            <button className="button text-white" type="submit">
                                Créer
                            </button>
                        </td>
                    </tr>
                </Table>
            </form>


        </div >
    )
}

export default FormEntrevue

