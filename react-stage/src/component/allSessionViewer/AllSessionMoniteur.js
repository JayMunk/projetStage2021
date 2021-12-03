import React, { useEffect, useState, useContext } from 'react'
import { Col, Row } from 'react-bootstrap';
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
        <tr className="my-1" key={moniteur.id}>
            <td>{moniteur.prenom} {moniteur.nom}</td>
            <td>{moniteur.courriel}</td>
            <td>{moniteur.session}</td>
        </tr>
    ));

    return (
        <div>
            <table className="table table-dark">
                <tr>
                    <th colSpan="3">Moniteurs All Sessions</th>
                </tr>
                <tr>
                    <th>Prénom/Nom</th>
                    <th>Courriel</th>
                    <th>Session</th>
                </tr>
                <tbody>{moniteursList}</tbody>
            </table>
            {moniteursVisible.length == 0 &&
                <h3 className="text-center text-warning">Aucun moniteur visible pour la sélection choisie</h3>
            }
            <Row className="mb-4">
                <Col lg="6" sm="6" className="hoverButton">
                    <button onClick={previousPage} className="btn bg-dark text-white wide-button">
                        «
                    </button>
                </Col>
                <Col lg="6" sm="6" className="hoverButton">
                    <button onClick={nextPage} className="btn bg-dark text-white wide-button">
                        »
                    </button>
                </Col>
            </Row>
            <br />
        </div>
    );
}

export default AllSessionMoniteur
