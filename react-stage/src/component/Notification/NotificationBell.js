import React, { useState, useContext, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { UserInfoContext } from '../../contexts/UserInfo'
import UserService from '../../services/UserService'
import NotificationService from '../../services/NotificationService'
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";



const NotificationBell = () => {
    const [listNotifs, setListNotifs] = useState([])
    const [listUnchecked, setListUnchecked] = useState([])
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [reload, setReload] = useState(false)

    useEffect(async () => {
        if (reload) {
            await getNotifications()
            getUncheckedNotifs(listNotifs)
            setReload(false)
        }
    })

    useEffect(() => {
        setListNotifs([])
        setListUnchecked([])
        setReload(true)
    }, [loggedUser.courriel])


    useEffect(async () => {
        let interval = setInterval(() => setReload(true), 15000)
        //destroy interval on unmount
        return () => clearInterval(interval)
    }, [])


    const getNotifications = async () => {
        if (loggedUser.isLoggedIn) {
            const fullUser = await getFullUser()
            if (fullUser != null) {
                let notifications = []
                switch (loggedUser.role) {
                    case "ETUDIANT":
                        notifications = await NotificationService.getAllNotificationByEtudiant(fullUser.id)
                        toastNewNotifications(listNotifs, notifications)
                        setLoggedUser({ ...loggedUser, notifications: listNotifs })
                        setListNotifs(notifications)
                        break
                    case "SUPERVISEUR":
                        notifications = await NotificationService.getAllNotificationBySuperviseur(fullUser.id)
                        toastNewNotifications(listNotifs, notifications)
                        setLoggedUser({ ...loggedUser, notifications: listNotifs })
                        setListNotifs(notifications)
                        break
                    case "MONITEUR":
                        notifications = await NotificationService.getAllNotificationByMoniteur(fullUser.id)
                        toastNewNotifications(listNotifs, notifications)
                        setLoggedUser({ ...loggedUser, notifications: listNotifs })
                        setListNotifs(notifications)
                        break
                    case "GESTIONNAIRE":
                        notifications = await NotificationService.getAllNotificationGestionnaire()
                        toastNewNotifications(listNotifs, notifications)
                        setLoggedUser({ ...loggedUser, notifications: listNotifs })
                        setListNotifs(notifications)
                        break
                }
            }
        }
    }

    const toastNewNotifications = (previousNotificationsList, newNotificationsList) => {
        const newNotifications = newNotificationsList.filter(
            (newNotification) =>
                !previousNotificationsList.some(
                    (previousNotification) =>
                        newNotification.id === previousNotification.id
                )
        )

        if (newNotifications.length != 0) {
            newNotifications.forEach(notification => {
                if (!notification.checked) {
                    toastNotification(notification)
                }
            })
        }

    }

    const toastNotification = (notification) => {
        if (reload) {
            let iconType = "info"
            if (notification.status == "URGENT") {
                iconType = "warning"
            }
            Swal.fire({
                toast: true,
                icon: iconType,
                title: notification.content,
                animation: false,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
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
            return
        }
        setListUnchecked([])
        return
    }
    const getFullUser = async () => {
        const data = await UserService.getUserByEmail(loggedUser.courriel)
        if (data != undefined) {
            return data
        }
    }

    return (
        <div>
            {listUnchecked.length != 0 ?

                <Link to="/notification">
                    <FontAwesomeIcon className="text-warning" icon={faBell} size="2x" />
                    <span>{listUnchecked.length}</span>
                </Link>
                :
                <Link to="/notification">
                    <FontAwesomeIcon icon={faBell} size="2x" />
                </Link>
            }

        </div>
    )
}

export default NotificationBell
