import { React, useEffect, useState, useRef } from 'react'
import EntrevueService from '../../../services/EntrevueService'
import Swal from 'sweetalert2'

const FormEntrevue = ({ handleReloadList }) => {
    const [values, setValues] = useState({
        titre: "",
        date: "",
        time: "",
        etudiantId: "",
        moniteurId: ""
    })
    const [listEtudiants, setListEtudiants] = useState([])
    const [listMoniteurs, setListMoniteurs] = useState([])
    const etudiantID = useRef(0)
    const moniteurID = useRef(0)





    useEffect(async () => {
        await fetch(`http://localhost:9191/user/etudiants`)
            .then(response => response.json())
            .then(data => setListEtudiants(data));

        await fetch(`http://localhost:9191/user/moniteurs`)
            .then(response => response.json())
            .then(data => setListMoniteurs(data));
    }, [])

    const reload = useRef(0) //tester ca tantot"




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
    const handleChangeSelectedMoniteur = e => {
        moniteurID.current = e.target.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (etudiantID.current !== 0 && moniteurID.current !== 0) {
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
        const moniteurEtudiant = await fetchMoniteurEtEtudiant()
        postEntrevue(moniteurEtudiant[0], moniteurEtudiant[1])

    }

    const fetchMoniteurEtEtudiant = async () => {
        const moniteurEtudiant = []
        await fetch(`http://localhost:9191/user/etudiant/${etudiantID.current}`)
            .then(response => response.json())
            .then(data => moniteurEtudiant.push(data));
        await fetch(`http://localhost:9191/user/moniteur/${moniteurID.current}`)
            .then(response => response.json())
            .then(data => moniteurEtudiant.push(data));
        return moniteurEtudiant;

    }

    const postEntrevue = (etudiant, moniteur) => {
        const entrevue = {
            titre: values.titre,
            date: values.date,
            time: values.time,
            etudiant: etudiant,
            moniteur: moniteur,
            nomEntreprise: moniteur.nomEntreprise
        }
        console.log(entrevue)
        EntrevueService.addEntrevue(entrevue)
    }




    return (
        <div>
            <h2>Créer une entrevue</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <th>Titre</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Id de l'étudiant</th>
                        <th>Id de du moniteur</th>
                        <th>Créer</th>
                    </tr>
                    <tr>
                        <td>
                            <input
                                value={values.titre}
                                onChange={handleChange}
                                id="titre"
                                className="form-field"
                                type="text"
                                placeholder="titre"
                                name="titre" />
                        </td>
                        <td>
                            <input
                                value={values.date}
                                onChange={handleChange}
                                id="date"
                                className="form-field"
                                type="date"
                                name="date" />
                        </td>
                        <td>
                            <input
                                value={values.time}
                                onChange={handleChange}
                                id="time"
                                className="form-field"
                                type="time"
                                name="time" />
                        </td>
                        <td>

                            <select name="etudiant" onChange={handleChangeSelectedEtudiant}>
                                <option>Please select</option>
                                {
                                    listEtudiants.map((etudiant) =>
                                        <option value={etudiant.id}>{etudiant.prenom} {etudiant.nom}</option>)
                                }
                            </select>
                        </td>
                        <td>
                            <select name="moniteur" onChange={handleChangeSelectedMoniteur}>
                                <option>Please select</option>
                                {listMoniteurs.map((moniteur) =>
                                    <option value={moniteur.id}>{moniteur.prenom} {moniteur.nom}</option>)}
                            </select>
                        </td>
                        <td>
                            <button className="button" class="form-field" type="submit">
                                Créer
                            </button>
                        </td>
                    </tr>
                </table>
            </form>


        </div >
    )
}

export default FormEntrevue

