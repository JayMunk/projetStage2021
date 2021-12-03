import { React, useState, useEffect, useContext } from 'react'
import { saveAs } from 'file-saver'
import { UserInfoContext } from '../../../contexts/UserInfo'
import RapportService from '../../../services/RapportService'

const OffresValides = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [offresValide, setOffresValide] = useState([])


    useEffect(async () => {
        if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
            const offresFetch = await RapportService.getOffresValide()
            setOffresValide(offresFetch.slice(0, 3))
        }
    }, [])

    const downloadOffresValid = () => {
        saveAs("http://localhost:9191/rapport/pdf/offresValide")
    }


    const offresList = offresValide.map((offre) =>
        <tr key={offre.id.toString()}>
            <td>{offre.titre}</td>
            <td>{offre.dateDebut}</td>
            <td>{offre.dateFin}</td>
        </tr>)

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
                        <button className="button" onClick={downloadOffresValid}>Télécharger</button>
                    </td>
                </tr>
            </table>
            <span>Pour voir la liste au complet ou pour plus de détails veuillez télécharger le pdf.</span>
        </div>
    )
}

export default OffresValides
