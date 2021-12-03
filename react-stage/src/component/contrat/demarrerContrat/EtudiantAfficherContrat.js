import React, { useState, useEffect, useContext } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'
import ContratService from '../../../services/ContratService'
import '../../../Css/FormContratOffre.css'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import Swal from "sweetalert2"
import "@sweetalert2/theme-dark/dark.css"


const EtudiantAfficherContrat = () => {
    const [loggedUser] = useContext(UserInfoContext)
    const [contrat, setContrat] = useState({})

    useEffect(async () => {
        let contrat
        contrat = await ContratService.getContratsByEtudiantEmail(loggedUser.courriel)
        setContrat(contrat)
    }, [])


    const handleSubmit = async e => {
        e.preventDefault()
        if (contrat.collegeEngagement != undefined) {
            if (!contrat.etudiantConfirmed) {
                const date = new Date()
                contrat.dateSignatureEtudiant = date.toISOString().split('T')[0]
                contrat.etudiantConfirmed = true
                const newContrat = await ContratService.saveContrat(contrat)
                setContrat(newContrat)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erreur!",
                    text: "Vous avez déjà signer votre contrat."
                })
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Erreur!",
                text: "Vous n'avez pas encore de contrat."
            })
        }
    }

    const getBoolIcon = (bool) => {
        return bool ? (
            <AiOutlineCheckCircle color="green" />
        ) : (
            <AiOutlineCloseCircle color="red" />
        )
    }

    return (
        <form className="form" id="txtform" className="FormContratOffre" onSubmit={handleSubmit}>
            <h1>Démarrer contrat</h1>

            <div className="form-inputs">
                <label htmlFor="collegeEngagement"
                    className="form-label">
                    Le Collège s’engage à :
                </label>
                <textarea form="txtform" rows="3" cols="50" id="collegeEngagement" name="collegeEngagement" className="form-input" placeholder="Entrez les engagments du collège" defaultValue={contrat.collegeEngagement} readOnly></textarea>
            </div>

            <div className="form-inputs">
                <label htmlFor="entrepriseEngagement"
                    className="form-label">
                    L’entreprise s’engage à :
                </label>
                <textarea form="txtform" rows="3" cols="50" id="entrepriseEngagement" name="entrepriseEngagement" className="form-input" placeholder="Entrez les engagments de l'entreprise" defaultValue={contrat.entrepriseEngagement} readOnly></textarea>
            </div>

            <div className="form-inputs">
                <label htmlFor="etudiantEngagement"
                    className="form-label">
                    L’étudiant s’engage à :
                </label>
                <textarea form="txtform" rows="3" cols="50" id="etudiantEngagement" type="text" name="etudiantEngagement" className="form-input" placeholder="Entrez les engagments de l'étudiant" defaultValue={contrat.etudiantEngagement} readOnly></textarea>
            </div>

            <div className="form-inputs">
                <label htmlFor="moniteurConfirmed" className="form-label">
                    Signature moniteur
                </label>
                <span>{getBoolIcon(contrat.moniteurConfirmed)}</span>
            </div>

            <div className="form-inputs">
                <label htmlFor="etudiantConfirmed" className="form-label">
                    Signature étudiant
                </label>
                <span>{getBoolIcon(contrat.etudiantConfirmed)}</span>
            </div>

            <div className="form-inputs">
                <label htmlFor="gestionnaireConfirmed" className="form-label">
                    Signature gestionnaire
                </label>
                <span>{getBoolIcon(contrat.gestionnaireConfirmed)}</span>
            </div>


            <button className="button" type="submit">Signer le contrat</button>

        </form>
    )
}

export default EtudiantAfficherContrat
