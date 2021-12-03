import React, { useContext } from 'react'
import { useState, useEffect, useRef } from 'react'
import SessionService from '../../services/SessionService'
import AllSessionEtudiant from './AllSessionEtudiant'
import AllSessionMoniteur from './AllSessionMoniteur'
import AllSessionOffre from './AllSessionOffre'
import AllSessionSuperviseur from './AllSessionSuperviseur'
import Swal from 'sweetalert2'
import { Col, Row } from 'react-bootstrap'
import { UserInfoContext } from '../../contexts/UserInfo'
import { useHistory } from "react-router-dom"


const AllSessionInfo = () => {
    const [allSessions, setAllSessions] = useState([])
    const selectedSession = useRef("All")
    const [reloadList, setReloadList] = useState(false)
    const [elementsPerPage, setElementsPerPage] = useState(10)
    const [currentSession, setCurrentSession] = useState({})
    const [loggedUser] = useContext(UserInfoContext)
    const history = useHistory()

    useEffect(async () => {
        if (!loggedUser.isLoggedIn) history.push("/login")
        await getAllSessions()
        await getCurrentSession()
    }, [])

    const getAllSessions = async () => {
        const allSessionsData = await SessionService.getAllSessions()
        setAllSessions(allSessionsData)

    }

    const triggerReloadList = () => {
        setReloadList(!reloadList)
    }

    const getCurrentSession = async () => {
        const currentSession = await SessionService.getCurrentSession()
        setCurrentSession(currentSession)
    }


    const onSelectedSession = (e) => {
        selectedSession.current = e.target.value
        triggerReloadList()
    }

    const onNewSessionClick = () => {

        Swal.fire({
            title: 'Create new session (ex: AUT-2021, HIVER-2021)',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Add Session'
        }).then(async result => {
            if (result.isConfirmed) {
                if (newSessionValidation(result.value)) {
                    Swal.fire({
                        title: 'Êtes-vous certain',
                        text: "Cette nouvelle prendra session immédiatement après la création et la session précédente ne sera plus accessible.\n Tout qui sera fait dès maintenant sera dans la nouvelle session",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oui, créer nouvelle session'
                    }).then(async resultConfirmation => {
                        if (resultConfirmation.isConfirmed) {
                            await addNewSession(result.value)
                            await getAllSessions()
                            await getCurrentSession()
                            setElementsPerPage(elementsPerPage) //FORCE rerender because otherwise its 1 render behind...
                        } else {
                            Swal.fire(
                                'Cancelled',
                                'Création de session annulé',
                                'error'
                            )
                        }
                    })
                } else {
                    Swal.fire(
                        'Cancelled',
                        'Your Session Name was invalid',
                        'error'
                    )
                }
            }
        })
    }


    const newSessionValidation = (newSessionName) => {
        if (newSessionName === "") {
            return false
        }
        if (newSessionName === null) {
            return false
        }

        return true
    }

    const getListForSpecificSession = (listEntite) => {
        if (selectedSession.current !== "All") {
            return listEntite.filter((entite) => {
                if (entite.session === selectedSession.current) {
                    return entite
                }
            })
        }
        return listEntite
    }

    const addNewSession = async (newSessionName) => {
        await SessionService.addNewSession(newSessionName)

    }



    return (
        <div>
            <Row>
                <Col sm="2" lg="1"></Col>
                <Col sm="8" lg="2" className="mt-4" >
                    <button className="btn bg-danger text-white" onClick={onNewSessionClick}>Start New Session </button>
                </Col>
                {/* <Col sm="0" lg="1" ></Col> */}
                <Col sm="12" lg="6" className="text-center">
                    <h2>Session Actuelle: <strong>{currentSession.nomSession}</strong></h2>
                </Col>
                {/* <Col sm="0" lg="1"></Col> */}
                <Col sm="12" lg="3" className="text-center">
                    <select className="m-4 h4" onChange={onSelectedSession}>
                        <option value="All" selected>Tout Session</option>
                        {allSessions.map(session =>
                            <option key={session.id} value={session.nomSession}>{session.nomSession}</option>
                        )};
                    </select>
                </Col>
                {/* <div className="col-1"></div> */}
            </Row >
            <br />
            <br />
            <Row className="text-center">
                <Col lg="8" sm="12" className="mx-auto">
                    <AllSessionEtudiant getListForSpecificSession={getListForSpecificSession} reloadList={reloadList} elementsPerPage={elementsPerPage} />
                </Col>

                <br />

                <Col lg="8" sm="12" className="mx-auto">
                    <AllSessionSuperviseur getListForSpecificSession={getListForSpecificSession} reloadList={reloadList} elementsPerPage={elementsPerPage} />
                </Col>

                <br />

                <Col lg="8" sm="12" className="mx-auto">
                    <AllSessionMoniteur getListForSpecificSession={getListForSpecificSession} reloadList={reloadList} elementsPerPage={elementsPerPage} />
                </Col>

                <br />

                <Col lg="8" sm="12" className="mx-auto">
                    <AllSessionOffre getListForSpecificSession={getListForSpecificSession} reloadList={reloadList} elementsPerPage={elementsPerPage} />
                </Col>
            </Row>
        </div >
    )
}

export default AllSessionInfo
