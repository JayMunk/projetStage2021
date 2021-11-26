import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai'
import { UserInfoContext } from '../../contexts/UserInfo'
import ReactModal from 'react-modal'
import './PickList.css'
import OffreService from "../../services/OffreService.js"
import UserService from "../../services/UserService.js"
import { MultiSelect } from "react-multi-select-component"


const SuperviseurEtudiantsAssignation = () => {
    const history = useHistory()
    const [listSuperviseurs, setListSuperviseurs] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentSuperviseur, setCurrentSuperviseur] = useState({
        id: Number,
        prenom: String,
        nom: String,
        courriel: String,
        numTelephone: String,
        departement: String,
        specialite: String
    })

    const [listAllEtudiant, setListAllEtudiant] = useState([])

    const [listSelectedEtudiant, setListSelectedEtudiant] = useState([])

    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)


    useEffect(() => {
        // if (!loggedUser.isLoggedIn || (loggedUser.role !== "GESTIONNAIRE" || loggedUser.role !== "ETUDIANT")) history.push("/login")
        const getSuperviseurs = async () => {
            const dbSuperviseurs = await UserService.getListAllSuperviseurs()
            console.log(dbSuperviseurs, "dbSuperviseurs")
            setListSuperviseurs(dbSuperviseurs)
        }
        getSuperviseurs()
    }, [])

    const getListAllEtudiants = async (listSelectedEtudiant) => {
        const allEtudiantsNoSuperviseur = await UserService.getListEtudiantWithoutSuperviseur()
        console.log(allEtudiantsNoSuperviseur, "fetch no superviseur")
        setListAllEtudiant(getOptionsEtudiant(allEtudiantsNoSuperviseur.concat(listSelectedEtudiant)))
    }



    useEffect(() => {
        console.log("-----UseEffect Logging--------")
        console.log(listAllEtudiant, "list all etudiant --- listAllEtudiant")
        console.log(listSelectedEtudiant, "list selected etudiant --- listSelectedEtudiant ")
        console.log(listSuperviseurs, "list all superviseurs  ------------ listSuperviseurs")

        // console.log(getOptionsEtudiant(listAllEtudiant), "filtered list etudiant ===================================")


    }, [listAllEtudiant, listSelectedEtudiant, listSuperviseurs])

    const getOptionsEtudiant = (listEtudiant) => {
        return listEtudiant.map(etudiant => {
            // console.log(etudiant)
            let etudiantOption = {}
            etudiantOption.label = etudiant.prenom + " " + etudiant.nom
            etudiantOption.value = etudiant
            return etudiantOption
        })
    }

    const getListEtudiantFromOptions = (listSelectedOptions) => {

        return listSelectedOptions.map(option => {
            let etudiant = {}
            etudiant = option.value
            return etudiant
        })
    }


    const onClickSuperviseur = async (superviseur) => {
        setCurrentSuperviseur(superviseur)
        const listEtudiantSupervise = await UserService.getListEtudiantSuperviseur(superviseur.id)
        console.log(listEtudiantSupervise)
        setListSelectedEtudiant(getOptionsEtudiant(listEtudiantSupervise))
        getListAllEtudiants(listEtudiantSupervise)
        console.log("______---------------__________", superviseur)

        setShowModal(true)
    }


    const onClickClose = () => {
        setCurrentSuperviseur({})
        setShowModal(false)
    }



    useEffect(() => {
        console.log(currentSuperviseur, "CURRENT SUPERVISEUR")
    }, [currentSuperviseur])

    const onClickSave = async () => {
        console.log("before conversion ||||||||||||", listSelectedEtudiant)
        const selectedEtudiantsObj = getListEtudiantFromOptions(listSelectedEtudiant)
        console.log("after conversion ||||||||||||", selectedEtudiantsObj)

        console.log(currentSuperviseur, "current before save|||||||")
        saveSuperviseur(selectedEtudiantsObj, currentSuperviseur.id)
        console.log(listSuperviseurs, "list offres as save")
        onClickClose()
    }


    const saveSuperviseur = async (selectedEtudiants, idSuperviseur) => {
        const res = await fetch(`http://localhost:9191/user/superviseur/${idSuperviseur}/etudiants`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(selectedEtudiants)
            })
        await res.json()
        updateSuperviseurs()
    }

    const updateSuperviseurs = async () => {
        const dbSuperviseurs = await UserService.getListAllSuperviseurs()
        setListSuperviseurs(dbSuperviseurs)
    }


    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>Superviseurs</h1>
            <table className="table border">
                <thead>
                    <tr>
                        <th colSpan='3' style={{ color: "black" }}>Prenom/Nom</th>
                        <th colSpan='3' style={{ color: "black" }}>Departement</th>
                        <th colSpan='3' style={{ color: "black" }}>Specialite</th>
                        <th colSpan='3'></th>
                    </tr>
                </thead>
                <tbody>
                    {listSuperviseurs.map((superviseur) =>
                        <tr key={superviseur.id.toString()}>
                            <td colSpan='3'>{superviseur.prenom} {superviseur.nom}</td>
                            <td colSpan='3'>{superviseur.departement}</td>
                            <td colSpan='3'>{superviseur.specialite}</td>
                            <td colSpan='3'><input type='button' onClick={() => onClickSuperviseur(superviseur)} value='Détails' className='p-1 btn-secondary' /></td>
                        </tr>)
                    }



                </tbody>
            </table>
            <ReactModal isOpen={showModal} ariaHideApp={false} style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)'
                },
                content: {
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    right: '40px',
                    bottom: '40px',
                    border: '1px solid #ccc',
                    background: 'lightgrey',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px'
                }
            }} >
                <div className="container text-center">
                    <AiOutlineClose color='red' size='24px' onClick={onClickClose} className="align-right" />
                    <div className="row mt-4">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th className="bg-secondary">Prenom/Nom</th>
                                    <td className="bg-light">{currentSuperviseur.prenom}</td>
                                </tr>
                                <tr>
                                    <th className="bg-secondary">Departement</th>
                                    <td className="bg-light">{currentSuperviseur.departement}</td>
                                </tr>
                                <tr>
                                    <th className="bg-secondary"># Telephone</th>
                                    <td className="bg-light">{currentSuperviseur.numTelephone}</td>
                                </tr>
                                <tr>
                                    <th className="bg-secondary">Courriel</th>
                                    <td className="bg-light">{currentSuperviseur.courriel}</td>
                                </tr>
                                <tr>
                                    <th className="bg-secondary">Specialite</th>
                                    <td className="bg-light">{currentSuperviseur.specialite}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <br />
                    <br />
                    <br />


                    {loggedUser.role == "GESTIONNAIRE" &&
                        <div className="mt-4">
                            <div className="row">
                                <div className="col-6">
                                    <h1>Select Etudiants</h1>
                                    <MultiSelect
                                        options={listAllEtudiant}
                                        value={listSelectedEtudiant}
                                        onChange={setListSelectedEtudiant}
                                        labelledBy="Select"
                                    />
                                </div>
                                <div className="col-6">
                                    {listSelectedEtudiant.length === 0 ?
                                        <h1>Aucun Etudiant Sélectionné</h1> :
                                        listSelectedEtudiant.length < 2 ?
                                            <h1>Etudiant Sélectionné</h1>
                                            :
                                            <h1>Etudiants Sélectionnés</h1>
                                    }
                                    {listSelectedEtudiant.map((etudiant, index) =>
                                        <li key={index}>{etudiant.label}</li>
                                    )}
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-5"></div>
                                <button className="btn btn-info btn-lg mt-4 col-2" onClick={onClickSave}>SAVE</button>
                                <div className="col-5"></div>
                            </div>
                        </div>
                    }

                </div>
            </ReactModal>
        </div>
    )
}

export default SuperviseurEtudiantsAssignation
