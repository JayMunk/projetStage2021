import Swal from 'sweetalert2'
import '@sweetalert2/theme-dark/dark.css'

const urlBase = 'http://localhost:9191/user'

const UserService = {

    saveEtudiant: async (values) => {
        const res = await fetch(urlBase + '/etudiant',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })
        const data = await res.json()
        if (!res.ok) {
            errorAlert("Il y a un problème, veuillez réessayer plus tard.")
        }
        return data
    },

    saveSuperviseur: async (values) => {
        const res = await fetch(urlBase + '/superviseur',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })
        const data = await res.json()
        if (!res.ok) {
            errorAlert("Il y a un problème, veuillez réessayer plus tard.")
        }
        return data
    },

    saveMoniteur: async (values) => {
        const res = await fetch(urlBase + '/moniteur',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })
        const data = await res.json()
        if (!res.ok) {
            errorAlert("Il y a un problème, veuillez réessayer plus tard.")
        }
        return data
    },

    getUserByEmail: async (email) => {
        const res = await fetch(urlBase + '/' + email)
        if (!res.ok) {
            errorAlert("Impossible d'obtenir l'utilisateur")
            return
        }
        const data = await res.json()
        return data
    },

    getListAllEtudiants: async () => {
        const res = await fetch(urlBase + '/etudiants')
        const data = await res.json()
        return data
    },

    getListAllEtudiantsAllSession: async () => {
        const res = await fetch(urlBase + '/etudiants/allSession')
        const data = await res.json()
        return data
    },

    getListEtudiantWithoutSuperviseur: async () => {
        const res = await fetch(urlBase + '/etudiants/nosuperviseur')
        const data = await res.json()
        return data
    },

    getListAllSuperviseurs: async () => {
        const res = await fetch(urlBase + '/superviseurs')
        const data = await res.json()
        return data
    },

    getListAllSuperviseursAllSession: async () => {
        const res = await fetch(urlBase + '/superviseurs/allSession')
        const data = await res.json()
        return data
    },

    getListAllMoniteurs: async () => {
        const res = await fetch(urlBase + '/moniteurs')
        const data = await res.json()
        return data
    },

    getListAllMoniteursAllSession: async () => {
        const res = await fetch(urlBase + '/moniteurs/allSession')
        const data = await res.json()
        return data
    },

    getListEtudiantSuperviseur: async (superviseurId) => {
        const res = await fetch(urlBase + '/superviseur/etudiants/' + superviseurId)
        const data = await res.json()
        return data
    },

    saveSuperviseurEtudiants: async (etudiants, idSuperviseur) => {
        const res = await fetch(`http://localhost:9191/user/superviseur/${idSuperviseur}/etudiants`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(etudiants)
            })
        if (!res.ok) {
            errorAlert("Incapable de sauver la liste d'etudiants sélectionnés")
            return
        }
        const data = await res.json()
        return data

    },

    getGestionnaires: async () => {
        const res = await fetch(urlBase + '/gestionnaires')
        const data = await res.json()
        return data
    },

    getEtudiantById: async (id) => {
        const res = await fetch(urlBase + '/etudiant/' + id)
        const data = await res.json()
        return data
    },
    getMoniteurById: async (id) => {
        const res = await fetch(urlBase + '/etudiant/' + id)
        const data = await res.json()
        return data
    },
}

const errorAlert = (errorMessage) => {
    Swal.fire(
        'Erreur',
        errorMessage,
        'error'
    )
}

export default UserService