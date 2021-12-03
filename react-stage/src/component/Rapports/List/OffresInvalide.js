import { React, useState, useEffect, useContext } from 'react'
import { saveAs } from 'file-saver'
import { UserInfoContext } from '../../../contexts/UserInfo';
import RapportService from '../../../services/RapportService';

const OffresInvalides = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [offresInvalide, setOffresInvalide] = useState([])


    useEffect(async () => {
        if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
            const offresFetch = await RapportService.getOffresInvalide()
            setOffresInvalide(offresFetch.slice(0, 3))
        }
    }, []);

    const downloadOffresInvalid = () => {
        saveAs("http://localhost:9191/rapport/pdf/offresInvalid")
    }


    const offresList = offresInvalide.map((offre) =>
        <tr key={offre.id.toString()}>
            <td>{offre.titre}</td>
            <td>{offre.dateDebut}</td>
            <td>{offre.dateFin}</td>
        </tr>);

    return (
        <div className="cardRapport">
            <h4>Liste des offres valides</h4>
            <table className="tableRapport">
                <tr>
                    <th>Titre</th>
                    <th>Date debut</th>
                    <th>Date fin</th>
                </tr>
                <tbody>
                    {offresList}
                </tbody>
                <tr >
                    <td colSpan="3">
                        <button className="button" onClick={downloadOffresInvalid}>Télécharger</button>
                    </td>
                </tr>
            </table>
            <span>Pour voir la liste au complet ou pour plus de détails veuillez télécharger le pdf.</span>
        </div>
    )
}

export default OffresInvalides
