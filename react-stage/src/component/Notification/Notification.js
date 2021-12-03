import React, { useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { UserInfoContext } from '../../contexts/UserInfo'
import NotificationService from '../../services/NotificationService'

const Notification = ({ notification, forceReload }) => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)


    const checkNotification = async () => {
        notification.checked = true
        await NotificationService.saveNotification(notification)
        setLoggedUser({ ...loggedUser, notifications: reinitialiseNotifications() })
        forceReload()
    }
    const reinitialiseNotifications = () => {
        const currentListNotifs = loggedUser.notifications
        const listSansNotificationActuelle = currentListNotifs.filter(notif => notif.id !== notification.id)
        listSansNotificationActuelle.push(notification)
        return listSansNotificationActuelle
    }

    return (
        <Row className="m-4 justify-content-center">
            <Col sm="0" lg="3"></Col>
            <Col sm="10" lg="6" className=" border border-secondary">
                {notification.status == "ALERT" &&
                    <h4 className="text-warning text-center">ALERT</h4>
                }
                {notification.status == "URGENT" &&
                    <h4 className="text-danger text-center">URGENT</h4>
                }
                <hr className="solid" />
                <h3 className="text-center">{notification.content}</h3>
                <br />
                <Row>
                    <Col sm="12" lg="6">
                        <p className="text-center">Session: {notification.session}</p>
                    </Col>
                    <Col sm="12" lg="6" className="text-right">
                        {!notification.checked &&
                            <div>
                                <button onClick={checkNotification} className="btn bg-warning">Rendre la notification checked</button>
                            </div>
                        }

                    </Col>

                </Row>
            </Col>
            <Col sm="0" lg="3"></Col>
        </Row>
    )
}

export default Notification
