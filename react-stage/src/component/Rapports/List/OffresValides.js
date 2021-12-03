import { React, useState, useEffect, useContext } from 'react'
import { saveAs } from 'file-saver'
import { UserInfoContext } from '../../../contexts/UserInfo';
import RapportService from '../../../services/RapportService';
import Table from "react-bootstrap/Table";

const OffresValides = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [offresValide, setOffresValide] = useState([])


    useEffect(async () => {
        if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
            const offresFetch = await RapportService.getOffresValide()
            setOffresValide(offresFetch.slice(0, 3))
        }
    }, []);

    const downloadOffresValid = () => {
        saveAs("http://localhost:9191/rapport/pdf/offresValide")
    }


    const offresList = offresValide.map((offre) =>
        <tr key={offre.id.toString()}>
            <td>{offre.titre}</td>
            <td>{offre.dateDebut}</td>
            <td>{offre.dateFin}</td>
        </tr>);

    return (
        <>
            {offresList.length > 0 ? (
                <div className="cardRapport">
                    <h4 className="text-wrap">Liste des offres valides</h4>
                    <Table striped bordered hover variant="dark" className="tableRapport text-nowrap">
                        <thead >
                            <tr>
                                <th>Titre</th>
                                <th>Date debut</th>
                                <th>Date fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offresList}
                            <tr>
                                <td colSpan="3">
                                    <button className="btn bg-secondary" onClick={downloadOffresValid}>Télécharger</button>
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                </div>
            ) : <div className="cardRapport">
                <h4>Liste des offres valides</h4>
                <h3 className="text-warning mt-4">Liste des offres valides</h3>
            </div>}
        </>
    )
}

export default OffresValides
