import React, { useState, useEffect, useContext } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'
import ContratService from '../../../services/ContratService'
import '../../../Css/FormContratOffre.css'

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
        const date = new Date()
        contrat.dateSignatureEtudiant = date.toISOString().split('T')[0]
        contrat.etudiantConfirmed = true
        const newContrat = await ContratService.saveContrat(contrat)
        setContrat(newContrat)
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
                <input id="moniteurConfirmed" type="checkbox" name="moniteurConfirmed" className="form-input" placeholder="" checked={contrat.moniteurConfirmed} disabled></input>
            </div>

            <div className="form-inputs">
                <label htmlFor="etudiantConfirmed" className="form-label">
                    Signature étudiant
                </label>
                <input id="etudiantConfirmed" type="checkbox" name="etudiantConfirmed" className="form-input" placeholder="" checked={contrat.etudiantConfirmed} disabled></input>
            </div>

            <div className="form-inputs">
                <label htmlFor="gestionnaireConfirmed" className="form-label">
                    Signature gestionnaire
                </label>
                <input id="gestionnaireConfirmed" type="checkbox" name="gestionnaireConfirmed" className="form-input" placeholder="" checked={contrat.gestionnaireConfirmed} disabled></input>
            </div>


            <button className="button" type="submit">Signer le contrat</button>

        </form>
    )
}

export default EtudiantAfficherContrat
