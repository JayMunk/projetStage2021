import Swal from "sweetalert2";

const urlBase = 'http://localhost:9191/notification'

const NotificationService = {
    getAllNotificationByEtudiant: async (etudiantId) => {
        const res = await fetch(urlBase + '/etudiant/' + etudiantId)
        if (!res.ok) {
            toastError("Incapable d'aller chercher les notifications")
            return
        }
        const data = await res.json()
        return data
    },

    getAllNotificationBySuperviseur: async (superviseurId) => {
        const res = await fetch(urlBase + '/superviseur/' + superviseurId)
        if (!res.ok) {
            toastError("Incapable d'aller chercher les notifications")
            return
        }
        const data = await res.json()
        return data
    },

    getAllNotificationByMoniteur: async (moniteurId) => {
        const res = await fetch(urlBase + '/moniteur/' + moniteurId)
        if (!res.ok) {
            toastError("Incapable d'aller chercher les notifications")
            return
        }
        const data = await res.json()
        return data
    },

    getAllNotificationGestionnaire: async () => {
        const res = await fetch(urlBase + '/gestionnaire')
        if (!res.ok) {
            toastError("Incapable d'aller chercher les notifications")
            return
        }
        const data = await res.json()
        return data
    },

    saveNotification: async (notification) => {
        const res = await fetch(urlBase,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(notification)
            })
        if (!res.ok) {
            toastError("Incapable de sauvegarder la notification")
            return
        }
        const data = await res.json()
        return data
    }

}

const toastError = (errorMessage) => {
    Swal.fire({
        toast: true,
        icon: 'error',
        title: errorMessage,
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

export default NotificationService