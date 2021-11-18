import React, { useEffect, useState, useContext } from 'react'
import UserService from '../../services/UserService';

const AllSessionMoniteur = ({ reloadList, getListForSpecificSession, elementsPerPage }) => {
    const [moniteurs, setMoniteurs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [moniteursVisible, setMoniteursVisible] = useState([]);

    useEffect(async () => {
        const moniteurs = await UserService.getListAllMoniteursAllSession()
        setMoniteurs(getListForSpecificSession(moniteurs));
        setMoniteursVisible(getListForSpecificSession(moniteurs).slice(0, elementsPerPage));
    }, []);

    useEffect(async () => {
        const moniteurs = await UserService.getListAllMoniteursAllSession()
        setMoniteurs(getListForSpecificSession(moniteurs));
        setMoniteursVisible(getListForSpecificSession(moniteurs).slice(0, elementsPerPage));
    }, [reloadList]);


    const updateListMoniteurs = (pageNumber) => {
        let offset = elementsPerPage * pageNumber;

        setMoniteursVisible(moniteurs.slice(0 + offset, elementsPerPage + offset));
    };

    const nextPage = () => {
        if (elementsPerPage * (pageNumber + 1) >= moniteurs.length) return;
        updateListMoniteurs(pageNumber + 1);
        setPageNumber(pageNumber + 1);
    };

    const previousPage = () => {
        if (pageNumber === 0) return;
        updateListMoniteurs(pageNumber - 1);
        setPageNumber(pageNumber - 1);
    };

    const moniteursList = moniteursVisible.map((moniteur) => (
        <tr key={moniteur.id}>
            <td>{moniteur.prenom} {moniteur.nom}</td>
            <td>{moniteur.courriel}</td>
            <td>{moniteur.session}</td>
        </tr>
    ));

    return (
        <>
            <table>
                <tr>
                    <th colSpan="2">Moniteurs All Sessions</th>
                </tr>
                <tr>
                    <th>Prénom/Nom</th>
                    <th>Courriel</th>
                    <th>Session</th>
                </tr>
                <tbody>{moniteursList}</tbody>
                <tr>
                    <td className="hoverButton">
                        <button onClick={previousPage} className="button">
                            «
                        </button>
                    </td>
                    <td className="hoverButton">
                        <button onClick={nextPage} className="button">
                            »
                        </button>
                    </td>
                </tr>
            </table>
        </>
    );
}

export default AllSessionMoniteur
