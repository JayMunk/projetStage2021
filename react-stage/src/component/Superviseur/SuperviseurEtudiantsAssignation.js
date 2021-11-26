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
import { Col, Row } from 'react-bootstrap'


const SuperviseurEtudiantsAssignation = () => {
    const history = useHistory()
    const [listSuperviseurs, setListSuperviseurs] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [listAllEtudiant, setListAllEtudiant] = useState([])
    const [listSelectedEtudiant, setListSelectedEtudiant] = useState([])
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [currentSuperviseur, setCurrentSuperviseur] = useState({
        id: Number,
        prenom: String,
        nom: String,
        courriel: String,
        numTelephone: String,
        departement: String,
        specialite: String
    })

    useEffect(() => {
        // if (!loggedUser.isLoggedIn || (loggedUser.role !== "GESTIONNAIRE" || loggedUser.role !== "ETUDIANT")) history.push("/login")
        const getSuperviseurs = async () => {
            const dbSuperviseurs = await UserService.getListAllSuperviseurs()
            setListSuperviseurs(dbSuperviseurs)
        }
        getSuperviseurs()
    }, [])

    const saveSuperviseur = async (selectedEtudiants, idSuperviseur) => {
        UserService.saveSuperviseurEtudiants(selectedEtudiants, idSuperviseur)
        updateSuperviseurs()
    }

    const getListAllEtudiants = async (listSelectedEtudiant) => {
        const allEtudiantsNoSuperviseur = await UserService.getListEtudiantWithoutSuperviseur()
        setListAllEtudiant(getOptionsEtudiant(allEtudiantsNoSuperviseur.concat(listSelectedEtudiant)))
    }

    const getOptionsEtudiant = (listEtudiant) => {
        return listEtudiant.map(etudiant => {
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
        setListSelectedEtudiant(getOptionsEtudiant(listEtudiantSupervise))
        getListAllEtudiants(listEtudiantSupervise)
        setShowModal(true)
    }

    const onClickClose = () => {
        setCurrentSuperviseur({})
        setShowModal(false)
    }

    const onClickSave = async () => {
        const selectedEtudiantsValues = getListEtudiantFromOptions(listSelectedEtudiant)
        saveSuperviseur(selectedEtudiantsValues, currentSuperviseur.id)
        onClickClose()
    }

    const updateSuperviseurs = async () => {
        const dbSuperviseurs = await UserService.getListAllSuperviseurs()
        setListSuperviseurs(dbSuperviseurs)
    }

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>Superviseurs</h1>
            <Row>
                <Col sm='12' lg='8' className="mx-auto">
                    <table className="table border table-dark">
                        <thead>
                            <tr>
                                <th colSpan='3' className="text-white" style={{ color: "black" }}>Prénom/Nom</th>
                                <th colSpan='3' className="text-white" style={{ color: "black" }}>Département</th>
                                <th colSpan='3' className="text-white" style={{ color: "black" }}>Spécialité</th>
                                <th colSpan='3'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSuperviseurs.map((superviseur) =>
                                <tr key={superviseur.id.toString()}>
                                    <td colSpan='3' className="text-white text-nowrap">{superviseur.prenom} {superviseur.nom}</td>
                                    <td colSpan='3' className="text-white text-nowrap">{superviseur.departement}</td>
                                    <td colSpan='3' className="text-white text-nowrap">{superviseur.specialite}</td>
                                    <td colSpan='3' className="text-white text-nowrap"><input type='button' onClick={() => onClickSuperviseur(superviseur)} value='Détails' className='p-1 btn-secondary' /></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
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



                    {loggedUser.role == "GESTIONNAIRE" &&
                        [listSelectedEtudiant.length == 0 && listAllEtudiant.length == 0 ?
                            <div>
                                <h3 className="text-center text-muted mt-4">Il n'y aucun étudiants sans superviseur</h3>
                            </div>
                            :
                            <div className="mt-4">
                                <Row>
                                    <Col sm="12" lg="6">
                                        <h1>Sélectionnez les étudiants</h1>
                                        <MultiSelect
                                            options={listAllEtudiant}
                                            value={listSelectedEtudiant}
                                            onChange={setListSelectedEtudiant}
                                            labelledBy="Select"
                                        />
                                    </Col>
                                    <Col sm="12" lg="6">
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
                                    </Col>

                                </Row>
                                <Row>
                                    <Col sm="1" lg="5"></Col>
                                    <Col sm="10" lg="2">
                                        <button className="btn btn-success btn-lg mt-4" onClick={onClickSave}>SAVE</button>
                                    </Col>
                                    <Col sm="1" lg="5"></Col>
                                </Row>
                            </div>
                        ]
                    }

                </div>
            </ReactModal>
        </div>
    )
}

export default SuperviseurEtudiantsAssignation
