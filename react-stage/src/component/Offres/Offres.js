import { PickList } from "primereact/picklist"
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai'
import { UserInfoContext } from '../../contexts/UserInfo'
import ReactModal from 'react-modal';
import OffreService from "../../services/OffreService.js"
import UserService from "../../services/UserService.js"


const Offres = () => {
    const [offres, setOffres] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOffre, setCurrentOffre] = useState({
        titre: String,
        description: String,
        entreprise: String,
        visibiliteEtudiant: Array,
        valid: Boolean
    });
    const [listAllEtudiant, setListAllEtudiant] = useState([])

    const [listWhitelisted, setListWhitelisted] = useState([]);

    const [loggedUser, setLoggedUser] = useContext(UserInfoContext);


    useEffect(() => {
        const getOffres = async () => {
            const dbOffres = loggedUser.role === "ETUDIANT" ? 
                await OffreService.getEtudiantOffres(loggedUser.courriel) : 
                await OffreService.getAllOffres()
            setOffres(dbOffres)
        }
        getOffres();
    }, [loggedUser])

    useEffect(() => {
        const getListAllEtudiants = async () => {
            const allEtudiants = await UserService.getListAllEtudiants()
            console.log(JSON.stringify(allEtudiants))
            setListAllEtudiant(allEtudiants)
        }
        getListAllEtudiants()
    }, [])

    const onClickOffre = (offre) => {
        setCurrentOffre(offre)
        setListWhitelisted(offre.visibiliteEtudiant.whitelistedEtudiant)
        setShowModal(true)
    }

    const onClickClose = () => {
        setCurrentOffre({})
        setShowModal(false)
    }

    const onToggleValid = () => {
        setCurrentOffre((offre) => ({
            ...offre,
            valid: !offre.valid
        }))
    }

    useEffect(() => {
        console.log(currentOffre)
    }, [currentOffre])

    const onClickSave = () => {
        saveOffre(currentOffre);
        onClickClose();
    }

    const saveOffre = async (offre) => {
        const res = await fetch('http://localhost:9191/stage/offre',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(offre)
            });
        await res.json();
        updateOffres();
    }

    const updateOffres = async () => {
        const dbOffres = loggedUser.role === "ETUDIANT" ? 
                OffreService.getEtudiantOffres(loggedUser.courriel) : 
                OffreService.getAllOffres()
        setOffres(dbOffres)
    }

    const offreList = offres.map((offre) =>
        <tr key={offre.id.toString()}>
            <td colSpan='3'>{offre.titre}</td>
            <td colSpan='3'>{offre.entreprise}</td>
            <td colSpan='1'>{offre.valid ? <AiOutlineCheckCircle color='green' /> : <AiOutlineCloseCircle color='red' />}</td>
            <td colSpan='1'><input type='button' onClick={() => onClickOffre(offre)} value='Détails' className='p-1 btn-secondary' /></td>
        </tr>);

    const etudiantList = listAllEtudiant.map((etudiant) =>
        <li><input type="checkbox" checked={false} />{etudiant.nom} {etudiant.prenom}</li>
    )

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>Offres</h1>
            <table className="table border">
                <thead>
                    <tr>
                        <th colSpan='3'>Titre</th>
                        <th colSpan='3'>Entreprise</th>
                        <th colSpan='1'>Valide</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {offreList}
                </tbody>
            </table>
            <ReactModal isOpen={showModal} ariaHideApp={false}>
                <div className="container">
                    <AiOutlineClose color='red' size='24px' onClick={onClickClose} />
                    <div className="row">
                        <h3 className="col-2">Titre</h3>
                        <h3 className="col-6">Description</h3>
                        <h3 className="col-2">Entreprise</h3>
                        <h3 className="col-2">Validity</h3>
                    </div>

                    <div className="row mt-4">
                        <div className="col-2">{currentOffre.titre}</div>
                        <div className="col-6">{currentOffre.description}</div>
                        <div className="col-2">{currentOffre.entreprise}</div>
                        <div className="col-2 form-check">
                            <input type='checkbox' name='valid' className="form-check-input" checked={currentOffre.valid} onClick={onToggleValid} />
                            <label class="form-check-label" for="valid"> Valid </label>
                        </div>
                    </div>
                    <div className="row card text-center">
                        <ul>
                            {etudiantList}
                        </ul>
                    </div>
                    <div className="row text-center">
                        <input type='button' value='Save' className="center" onClick={onClickSave}></input>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

export default Offres
