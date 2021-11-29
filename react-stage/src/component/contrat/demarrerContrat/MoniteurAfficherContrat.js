import React, { useState, useEffect, useContext } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'
import ContratService from '../../../services/ContratService'

const MoniteurAfficherContrat = () => {
    const [loggedUser] = useContext(UserInfoContext)
    const [listContrats, setListContrats] = useState([])
    const [listOffres, setListOffres] = useState([])
    const [listEtudiants, setListEtudiants] = useState([])
    const [contrat, setContrat] = useState({})

    useEffect(async () => {
        let dbContrats
        dbContrats = await ContratService.getContratsByMoniteurEmail(loggedUser.courriel)
        getOffres(dbContrats)
        setListContrats(dbContrats)
    }, [])

    const getOffres = (listContrats) => {
        let tempListOffres = []
        listContrats.forEach(contrat => {
            if (offreIsNotInList(tempListOffres, contrat)) {
                tempListOffres = [...tempListOffres, contrat.offre]
            }
        })
        setListOffres(tempListOffres)
        setValuesOnLoad(listContrats, tempListOffres)
    }

    const offreIsNotInList = (tempListOffres, contratToCheck) => {
        if (tempListOffres.some(offre => offre.id === contratToCheck.offre.id)) {
            return false
        }
        return true
    }

    const setValuesOnLoad = (listContrats, listOffres) => {
        getListEtudiants(listContrats, listOffres[0].applicants)

    }

    const getListEtudiants = (listContrats, listApplicants) => {
        let listEtudiantsContratOffre = getEtudiantsForContrat(listContrats, listApplicants)
        setListEtudiants(listEtudiantsContratOffre)
        setContratValues(listContrats, listEtudiantsContratOffre[0])
    }

    const getEtudiantsForContrat = (listContrats, listApplicants) => {
        let tempListEtudiantsContratOffre = []
        listContrats.forEach(contrat => {
            if (listApplicants.some(applicant => applicant.id === contrat.etudiant.id)) {
                tempListEtudiantsContratOffre = [...tempListEtudiantsContratOffre, contrat.etudiant]
            }
        })
        return tempListEtudiantsContratOffre
    }

    const onChangeOffre = (e) => {
        let offre = JSON.parse(e.target.value)
        getListEtudiants(listContrats, offre.applicants)

    }

    const onChangeEtudiant = (e) => {
        let etudiant = JSON.parse(e.target.value)

        setContratValues(listContrats, etudiant)
    }

    const setContratValues = (listContrats, etudiant) => {
        listContrats.forEach(contrat => {
            if (contrat.etudiant.id === etudiant.id) {
                setContrat(contrat)
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const date = new Date()
        contrat.dateSignatureMoniteur = date.toISOString().split('T')[0];
        contrat.moniteurConfirmed = true
        const newContrat = await ContratService.saveContrat(contrat)
        setContrat(newContrat)
    }



    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Démarrer contrat</h1>

                <div className="form-inputs">
                    <label htmlFor="offre"
                        className="form-label">
                        Offre
                    </label>
                    <select onChange={onChangeOffre}>
                        {listOffres.map((offre) => (
                            <option value={JSON.stringify(offre)}>{offre.titre}</option>
                        ))}
                    </select>
                </div>

                <div className="form-inputs">
                    <label htmlFor="etudiant"
                        className="form-label">
                        Étudiant
                    </label>
                    <select onChange={onChangeEtudiant}>
                        {listEtudiants.map((etudiant) => (
                            <option value={JSON.stringify(etudiant)}>{etudiant.prenom} {etudiant.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="form-inputs">
                    <label htmlFor="collegeEngagement"
                        className="form-label">
                        Le Collège s’engage à :
                    </label>
                    <input id="collegeEngagement" type="text" name="collegeEngagement" className="form-input" placeholder="Entrez les engagments du collège" defaultValue={contrat.collegeEngagement} readOnly></input>
                </div>

                <div className="form-inputs">
                    <label htmlFor="entrepriseEngagement"
                        className="form-label">
                        L’entreprise s’engage à :
                    </label>
                    <input id="entrepriseEngagement" type="text" name="entrepriseEngagement" className="form-input" placeholder="Entrez les engagments de l'entreprise" defaultValue={contrat.entrepriseEngagement} readOnly></input>
                </div>

                <div className="form-inputs">
                    <label htmlFor="etudiantEngagement"
                        className="form-label">
                        L’étudiant s’engage à :
                    </label>
                    <input id="etudiantEngagement" type="text" name="etudiantEngagement" className="form-input" placeholder="Entrez les engagments de l'étudiant" defaultValue={contrat.etudiantEngagement} readOnly></input>
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


                <button className="form-input-btn" type="submit">Signer le contrat</button>

            </form>
        </div>
    )
}

export default MoniteurAfficherContrat
