import { React, useState, useEffect, useContext } from 'react'
import { saveAs } from 'file-saver'
import { UserInfoContext } from '../../../contexts/UserInfo'
import RapportService from '../../../services/RapportService'

const CvsPendingEtRejected = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [cvs, setCvs] = useState([])


    useEffect(async () => {
        if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
            const cvsFetch = await RapportService.getCvsPendingEtRejected()
            setCvs(cvsFetch.slice(0, 3))
        }
    }, [])

    const downloadCVPendingRejected = () => {
        saveAs("http://localhost:9191/rapport/pdf/cvPendingRejected")
    }


    const cvList = cvs.map((cv) =>
        <tr key={cv.id.toString()}>
            <td>{cv.nom}</td>
            <td>{cv.status}</td>
        </tr>)

    return (
        <div className="cardRapport">
            <h4>Liste des cvs ayant été rejeté ou refusé</h4>
            <table className="tableRapport">
                <tr>
                    <th>Titre</th>
                    <th>Statut</th>
                </tr>
                <tbody>
                    {cvList}
                </tbody>
                <tr >
                    <td colSpan="2">
                        <button className="button" onClick={downloadCVPendingRejected}>Télécharger</button>
                    </td>
                </tr>
            </table>
            <span>Pour voir la liste au complet ou pour plus de détails veuillez télécharger le pdf.</span>
        </div>
    )
}

export default CvsPendingEtRejected
