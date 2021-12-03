import React, { useEffect, useState, useContext } from 'react'
import { Col, Row } from 'react-bootstrap';
import OffreService from '../../services/OffreService';

const AllSessionOffre = ({ reloadList, getListForSpecificSession, elementsPerPage }) => {
    const [offres, setOffres] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [offresVisible, setOffresVisible] = useState([]);

    useEffect(async () => {
        const offres = await OffreService.getAllOffresAllSession()
        setOffres(getListForSpecificSession(offres));
        setOffresVisible(getListForSpecificSession(offres).slice(0, elementsPerPage));
    }, []);

    useEffect(async () => {
        const offres = await OffreService.getAllOffresAllSession()
        setOffres(getListForSpecificSession(offres));
        setOffresVisible(getListForSpecificSession(offres).slice(0, elementsPerPage));
    }, [reloadList]);


    const updateListOffres = (pageNumber) => {
        let offset = elementsPerPage * pageNumber;

        setOffresVisible(offres.slice(0 + offset, elementsPerPage + offset));
    };

    const nextPage = () => {
        if (elementsPerPage * (pageNumber + 1) >= offres.length) return;
        updateListOffres(pageNumber + 1);
        setPageNumber(pageNumber + 1);
    };

    const previousPage = () => {
        if (pageNumber === 0) return;
        updateListOffres(pageNumber - 1);
        setPageNumber(pageNumber - 1);
    };

    const offresList = offresVisible.map((offre) => (
        <tr key={offre.id}>
            <td>{offre.titre} {offre.nom}</td>
            <td>{offre.entreprise}</td>
            <td>{offre.session}</td>
        </tr>
    ));

    return (
        <div>
            <table className="table table-dark">
                <tr>
                    <th colSpan="3">Offres All Sessions</th>
                </tr>
                <tr>
                    <th>Titre</th>
                    <th>Entreprise</th>
                    <th>Session</th>
                </tr>
                <tbody>{offresList}</tbody>
            </table>
            {offresVisible.length == 0 &&
                <h3 className="text-center text-warning">Aucune offre visible pour la sélection choisie</h3>
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

export default AllSessionOffre
