import { React, useState, useEffect, useContext } from 'react'
import { saveAs } from 'file-saver'
import { UserInfoContext } from '../../../contexts/UserInfo';
import RapportService from '../../../services/RapportService';
import Table from "react-bootstrap/Table";

const CvsPendingEtRejected = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [cvs, setCvs] = useState([])


    useEffect(async () => {
        if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
            const cvsFetch = await RapportService.getCvsPendingEtRejected()
            setCvs(cvsFetch.slice(0, 3))
        }
    }, []);

    const downloadCVPendingRejected = () => {
        saveAs("http://localhost:9191/rapport/pdf/cvPendingRejected")
    }


    const cvList = cvs.map((cv) =>
        <tr key={cv.id.toString()}>
            <td>{cv.nom}</td>
            <td>{cv.status}</td>
        </tr>);

    return (
        <>
            {cvs.length > 0 ? (
                <div className="cardRapport">
                    <h4 className="text-wrap">Liste des cvs ayant été rejeté ou refusé</h4>
                    <Table striped bordered hover variant="dark" className="tableRapport text-nowrap">
                        <thead >
                            <tr>
                                <th>Titre</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cvList}
                            <tr >
                                <td colSpan="2">
                                    <button className="btn bg-secondary" onClick={downloadCVPendingRejected}>Télécharger</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ) : <div className="cardRapport">
                <h4>Liste des étudiants en attente d'entrevue</h4>
                <h3 className="text-warning mt-4">Cette liste est vide</h3>
            </div>}
        </>

    )
}

export default CvsPendingEtRejected
