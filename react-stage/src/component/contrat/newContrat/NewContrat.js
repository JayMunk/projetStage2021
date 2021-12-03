import React, { useState, useEffect, useContext } from 'react'
import { UserInfoContext } from './../../../contexts/UserInfo'
import ContratService from '../../../services/ContratService'
import OffreService from '../../../services/OffreService'
import { useHistory } from "react-router-dom"

const NewContrat = () => {
    const history = useHistory()
    const [loggedUser] = useContext(UserInfoContext)
    const [listOffres, setListOffres] = useState([])
    const [listEtudiants, setListEtudiants] = useState([])

    const [values, setValues] = useState({})

    const [errors, setErrors] = useState({})

    useEffect(() => {

        if (!loggedUser.isLoggedIn) history.push("/login")

        const getOffres = async () => {
            let dbOffres
            dbOffres = await OffreService.getAllOffres()
            if (dbOffres.length != 0) {
                setListOffres(dbOffres)
                setValuesOnLoad(dbOffres)
            }
        }
        getOffres()
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })

    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors(checkError(values))
        if (Object.keys(checkError(values)).length === 0) {
            await ContratService.saveContrat(values)
            history.push("/gestion/demarrerContrat")
        }
    }

    const setValuesOnLoad = (listOffres) => {
        setValueOffre(listOffres[0])
        setValueMoniteur(listOffres[0].moniteur)
        getListEtudiants(listOffres[0].applicants)
    }

    const getListEtudiants = async (listApplicants) => {
        let listEtudiantsAlreadyContracted = await getListEtudiantAlreadyContracted()
        let listIdEtudiantsAlreadyContracted = getListIdEtudiantsAlreadyContracted(listEtudiantsAlreadyContracted)
        let listIdApplicants = getListIdApplicants(listApplicants)

        listIdApplicants = listIdApplicants.filter(idApplicant => !listIdEtudiantsAlreadyContracted.includes(idApplicant))

        let tempListEtudiant = []
        listApplicants.forEach(applicant => {
            if (listIdApplicants.some(id => id === applicant.id)) {
                tempListEtudiant = [...tempListEtudiant, applicant]
            }
        })

        setListEtudiants(tempListEtudiant)
        setValueEtudiant(tempListEtudiant[0])
    }

    const getListEtudiantAlreadyContracted = async () => {
        let tempListEtudiantsAlreadyContracted = []
        let listContrats = await ContratService.getAllContrats()
        listContrats.forEach(contrat => {
            tempListEtudiantsAlreadyContracted = [...tempListEtudiantsAlreadyContracted, contrat.etudiant]
        })

        return tempListEtudiantsAlreadyContracted
    }

    const getListIdEtudiantsAlreadyContracted = (listEtudiantsAlreadyContracted) => {
        let listIdEtudiantsAlreadyContracted = []
        listEtudiantsAlreadyContracted.forEach(etudiant => {
            listIdEtudiantsAlreadyContracted = [...listIdEtudiantsAlreadyContracted, etudiant.id]
        })

        return listIdEtudiantsAlreadyContracted
    }

    const getListIdApplicants = (listApplicants) => {
        let listIdApplicants = []
        listApplicants.forEach(applicant => {
            listIdApplicants = [...listIdApplicants, applicant.id]
        })

        return listIdApplicants
    }

    const onChangeOffre = (e) => {
        let offre = JSON.parse(e.target.value)
        setValueOffre(offre)
        setValueMoniteur(offre.moniteur)
        getListEtudiants(offre.applicants)
    }

    const onChangeEtudiant = (e) => {
        let etudiant = JSON.parse(e.target.value)
        setValueEtudiant(etudiant)
    }

    const setValueMoniteur = (moniteur) => {
        values.moniteur = moniteur
    }

    const setValueOffre = (offre) => {
        values.offre = offre
    }

    const setValueEtudiant = (etudiant) => {
        values.etudiant = etudiant
    }

    function checkError(values) {
        let errors = {}

        if (!values.offre) {
            errors.offre = "L'offre est requise"
        }

        if (!values.etudiant) {
            errors.etudiant = "L'étudiant est requis"
        }

        if (!values.collegeEngagement) {
            errors.collegeEngagement = "Les engagements du collège sont requis"
        }

        if (!values.entrepriseEngagement) {
            errors.entrepriseEngagement = "Les engagements de l'entreprise sont requis"
        }

        if (!values.etudiantEngagement) {
            errors.etudiantEngagement = "Les engagements de l'étudiant sont requis"
        }



        return errors
    }


    return (
        <body id="body">
            <form className="form" id="txtform" className="FormContratOffre" onSubmit={handleSubmit}>
                <h1>Créez un nouveau contrat</h1>


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
                    {errors.offre && <p className="error">{errors.offre}</p>}
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
                    {errors.etudiant && <p className="error">{errors.etudiant}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="collegeEngagement"
                        className="form-label">
                        Le Collège s’engage à :
                    </label>
                    <textarea form="txtform" rows="3" cols="50" id="collegeEngagement" name="collegeEngagement" className="form-input" placeholder="Entrez les engagments du collège" value={values.collegeEngagement} onChange={handleChange}></textarea>
                    {errors.collegeEngagement && <p className="error">{errors.collegeEngagement}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="entrepriseEngagement"
                        className="form-label">
                        L’entreprise s’engage à :
                    </label>
                    <textarea form="txtform" rows="3" cols="50" id="entrepriseEngagement" name="entrepriseEngagement" className="form-input" placeholder="Entrez les engagments de l'entreprise" value={values.entrepriseEngagement} onChange={handleChange}></textarea>
                    {errors.entrepriseEngagement && <p className="error">{errors.entrepriseEngagement}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="etudiantEngagement"
                        className="form-label">
                        L’étudiant s’engage à :
                    </label>
                    <textarea form="txtform" rows="3" cols="50" id="etudiantEngagement" type="text" name="etudiantEngagement" className="form-input" placeholder="Entrez les engagments de l'étudiant" value={values.etudiantEngagement} onChange={handleChange}></textarea>
                    {errors.etudiantEngagement && <p className="error">{errors.etudiantEngagement}</p>}
                </div>


                <button className="button" type="submit">Créer le contrat</button>

            </form>
        </body>
    )
}

export default NewContrat
