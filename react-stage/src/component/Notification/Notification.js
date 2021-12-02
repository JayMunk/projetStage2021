import React, { useEffect, useContext } from 'react'
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
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6 border border-secondary">
                {notification.status == "ALERT" &&
                    <h4 className="text-warning text-center">ALERT</h4>
                }
                {notification.status == "URGENT" &&
                    <h4 className="text-danger text-center">URGENT</h4>
                }
                <hr className="solid" />
                <h3 className="text-center">{notification.content}</h3>
                <br />
                <div className="row">
                    <div className="col-6">
                        {!notification.checked &&
                            <div>
                                <button onClick={checkNotification} className="btn bg-warning">Rendre la notification checked</button>
                            </div>
                        }
                    </div>
                    <p className="text-right col-6">Session: {notification.session}</p>

                </div>
            </div>
            <div className="col-3"></div>
        </div>
    )
}

export default Notification
