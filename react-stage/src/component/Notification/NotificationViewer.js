import React, { useState, useContext, useEffect } from 'react'
import { UserInfoContext } from '../../contexts/UserInfo'
import Notification from './Notification'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'


const NotificationViewer = () => {
    const history = useHistory()
    const [listNotifs, setListNotifs] = useState([])
    const [listUnchecked, setListUnchecked] = useState([])
    const [listChecked, setListChecked] = useState([])
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [reload, setReload] = useState(true)
    const [checkedVisible, setCheckedVisible] = useState([])
    const [uncheckedVisible, setUncheckedVisible] = useState([])
    const [pageNumberChecked, setPageNumberChecked] = useState(0);
    const [pageNumberUnchecked, setPageNumberUnchecked] = useState(0);
    const elementsPerPage = 3

    useEffect(() => {
        console.log(pageNumberChecked, "page number Checked")
    }, [pageNumberChecked])

    useEffect(async () => {
        if (reload) {
            getNotifications()
            getCheckedNotifs(listNotifs)
            getUncheckedNotifs(listNotifs)
            setReload(false)
        }
    })


    const getNotifications = () => {
        setListNotifs(loggedUser.notifications)
    }


    useEffect(() => {
        getNotifications()
        setReload(true)
    }, [loggedUser])


    useEffect(async () => {
        if (!loggedUser.isLoggedIn) history.push("/")
        getNotifications()
        getCheckedNotifs(listNotifs)
        getUncheckedNotifs(listNotifs)
        setReload(true)
    }, [])




    const sortNotifs = (listNotifications) => {
        return listNotifications.sort((notif1, notif2) => sortingByUrgency(notif1, notif2))
    }

    const sortingByUrgency = (notif1, notif2) => {
        if (notif1.status == "URGENT" && notif2.status == "ALERT") {
            return -1
        }
        else if (notif1.status == "ALERT" && notif2.status == "URGENT") {
            return 1
        }
        else {
            return 0
        }

    }

    const getUncheckedNotifs = (listNotifs) => {
        if (listNotifs.length != 0) {
            const uncheckedNotifs = listNotifs.filter((notif) => {
                if (!notif.checked) {
                    return notif
                }
            })
            setListUnchecked(uncheckedNotifs)
            setUncheckedVisible(sortNotifs(uncheckedNotifs.slice(0, elementsPerPage)))
            return
        }
        setListUnchecked([])
        setUncheckedVisible([])
        return
    }

    const getCheckedNotifs = (listNotifs) => {
        if (listNotifs.length != 0) {
            const checkedNotifs = listNotifs.filter((notif) => {
                if (notif.checked) {
                    return notif
                }
            })
            setListChecked(checkedNotifs)
            setCheckedVisible(sortNotifs(checkedNotifs.slice(0, elementsPerPage)))
            return
        }
        setListChecked([])
        setCheckedVisible([])
        return
    }

    const updateListChecked = (pageNumberChecked) => {
        let offset = elementsPerPage * pageNumberChecked;

        setCheckedVisible(listChecked.slice(0 + offset, elementsPerPage + offset));
    };

    const nextPageChecked = () => {
        console.log(listChecked.length)
        if (elementsPerPage * (pageNumberChecked + 1) >= listChecked.length) return;
        updateListChecked(pageNumberChecked + 1);
        setPageNumberChecked(pageNumberChecked + 1);
    };

    const previousPageChecked = () => {
        if (pageNumberChecked === 0) return;
        updateListChecked(pageNumberChecked - 1);
        setPageNumberChecked(pageNumberChecked - 1);
    };

    const updateListUnchecked = (pageNumberUnchecked) => {
        let offset = elementsPerPage * pageNumberUnchecked;

        setUncheckedVisible(listUnchecked.slice(0 + offset, elementsPerPage + offset));
    };

    const nextPageUnchecked = () => {
        if (elementsPerPage * (pageNumberUnchecked + 1) >= listUnchecked.length) return;
        updateListUnchecked(pageNumberUnchecked + 1);
        setPageNumberUnchecked(pageNumberUnchecked + 1);
    };

    const previousPageUnchecked = () => {
        if (pageNumberUnchecked === 0) return;
        updateListUnchecked(pageNumberUnchecked - 1);
        setPageNumberUnchecked(pageNumberUnchecked - 1);
    };

    const forceReload = () => {
        setReload(true)
    }

    return (
        <div className="text-muted mb-4">
            <h1 className="text-center">Notifications Non Vérifiées</h1>
            {uncheckedVisible.map((notification) =>
                <div className="text-center">
                    <Notification key={notification.id} notification={notification} forceReload={forceReload} />
                    <br />
                </div>
            )}
            {listUnchecked != 0 ?
                <Row>
                    <Col sm="0" lg="3"></Col>
                    <Col sm="6" lg="3">
                        <button onClick={previousPageUnchecked} className="btn bg-secondary m-1 wide-button">
                            «
                        </button>
                    </Col>
                    <Col sm="6" lg="3">
                        <button onClick={nextPageUnchecked} className="btn bg-secondary m-1 wide-button">
                            »
                        </button>
                    </Col>
                    <Col sm="0" lg="3"></Col>
                </Row>
                :
                <h4 className="text-center">Aucune notification non vérifiée.</h4>
            }
            <br />
            <hr />

            <h1 className="text-center mt-4">Notifications Vérifiées</h1>
            {checkedVisible.map((notification) =>
                <div className="text-center">
                    <Notification key={notification.id} notification={notification} forceReload={forceReload} />
                    <br />
                </div>
            )}
            {listChecked != 0 ?
                <Row className="text-center">
                    <Col sm="0" lg="3"></Col>
                    <Col sm="6" lg="3">
                        <button onClick={previousPageChecked} className="btn bg-secondary m-1 wide-button">
                            «
                        </button>
                    </Col>
                    <Col sm="6" lg="3">
                        <button onClick={nextPageChecked} className="btn bg-secondary m-1 wide-button">
                            »
                        </button>
                    </Col>
                    <Col sm="0" lg="3"></Col>
                </Row>
                :
                <h4 className="text-center">Aucune notification vérifiée.</h4>
            }

        </div>
    )
}

export default NotificationViewer
