import { React, useState, useEffect, useContext } from 'react'
import { saveAs } from 'file-saver'
import { UserInfoContext } from '../../../contexts/UserInfo';
import RapportService from '../../../services/RapportService';

const EtudiantsEnAttenteEntrevue = () => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [etudiants, setEtudiants] = useState([])


    useEffect(async () => {
        if (loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE") {
            const etudiantsFetch = await RapportService.getEtudiantsEnAttenteEntrevue()
            setEtudiants(etudiantsFetch.slice(0, 3))
        }
    }, []);

    const downloadEtudiantsAttenteEntrevue = () => {
        saveAs("http://localhost:9191/rapport/pdf/etudiantsAttenteEntrevue")
    }


    const etudiantsList = etudiants.map((etudiant) =>
        <tr key={etudiant.id.toString()}>
            <td>{etudiant.prenom}{etudiant.nom}</td>
            <td>{etudiant.courriel}</td>
        </tr>);

    return (
        <div className="cardRapport">
            <h4>Liste des étudiants en attente d'entrevue</h4>
            <table className="tableRapport">
                <tr>
                    <th>Nom</th>
                    <th>Courriel</th>
                </tr>
                <tbody>
                    {etudiantsList}
                </tbody>
                <tr >
                    <td colSpan="2">
                        <button className="button" onClick={downloadEtudiantsAttenteEntrevue}>Télécharger</button>
                    </td>
                </tr>
            </table>
            <span>Pour voir la liste au complet ou pour plus de détails veuillez télécharger le pdf.</span>
        </div>
    )
}

export default EtudiantsEnAttenteEntrevue