import React, { useEffect, useState, useContext } from 'react'
import { Col, Row } from 'react-bootstrap';
import UserService from '../../services/UserService';

const AllSessionSuperviseur = ({ reloadList, getListForSpecificSession, elementsPerPage }) => {
    const [superviseurs, setSuperviseurs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [superviseursVisible, setSuperviseursVisible] = useState([]);

    useEffect(async () => {
        const superviseurs = await UserService.getListAllSuperviseursAllSession()
        setSuperviseurs(getListForSpecificSession(superviseurs));
        setSuperviseursVisible(getListForSpecificSession(superviseurs).slice(0, elementsPerPage));
    }, []);

    useEffect(async () => {
        const superviseurs = await UserService.getListAllSuperviseursAllSession()
        setSuperviseurs(getListForSpecificSession(superviseurs));
        setSuperviseursVisible(getListForSpecificSession(superviseurs).slice(0, elementsPerPage));
    }, [reloadList]);


    const updateListSuperviseurs = (pageNumber) => {
        let offset = elementsPerPage * pageNumber;

        setSuperviseursVisible(superviseurs.slice(0 + offset, elementsPerPage + offset));
    };

    const nextPage = () => {
        if (elementsPerPage * (pageNumber + 1) >= superviseurs.length) return;
        updateListSuperviseurs(pageNumber + 1);
        setPageNumber(pageNumber + 1);
    };

    const previousPage = () => {
        if (pageNumber === 0) return;
        updateListSuperviseurs(pageNumber - 1);
        setPageNumber(pageNumber - 1);
    };

    const superviseursList = superviseursVisible.map((superviseur) => (
        <tr key={superviseur.id}>
            <td>{superviseur.prenom} {superviseur.nom}</td>
            <td>{superviseur.courriel}</td>
            <td>{superviseur.session}</td>
        </tr>
    ));

    return (
        <div>
            <table className="table table-dark">
                <tr>
                    <th colSpan="3">Superviseurs All Sessions</th>
                </tr>
                <tr>
                    <th>Prénom/Nom</th>
                    <th>Courriel</th>
                    <th>Session</th>
                </tr>
                <tbody>{superviseursList}</tbody>
            </table>
            {superviseursVisible.length == 0 &&
                <h3 className="text-center text-warning">Aucun superviseur visible pour la sélection choisie</h3>
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

export default AllSessionSuperviseur
