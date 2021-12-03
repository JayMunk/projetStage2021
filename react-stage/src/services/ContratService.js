import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
<script src="sweetalert2/dist/sweetalert2.min.js"></script>;


const urlBase = 'http://localhost:9191/contrats'

const ContratService = {

    getAllContrats: async () => {
        const res = await fetch(urlBase)
        const data = await res.json()
        return data
    },

    getContratsByMoniteurEmail: async (email) => {
        const res = await fetch(urlBase + '/moniteur/' + email)
        const data = await res.json()
        return data
    },

    getContratsByEtudiantEmail: async (email) => {
        const res = await fetch(urlBase + '/etudiant/' + email)
        const data = await res.json()
        return data
    },

    saveContrat: async (values) => {
        const res = await fetch(urlBase,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })
        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: "Succès!",
                text: "Votre contrat a été mis à jour.",
            })
        }
        const data = await res.json()
        return data
    },

    getMoniteurContratsToEvaluate: async (moniteurCourriel) => {
        const res = await fetch(urlBase + '/moniteur/courriel/' + moniteurCourriel + '/toEvaluate')
        const data = await res.json()
        return data
    },

    getSuperviseurContratsToEvaluate: async (superviseurCourriel) => {
        const res = await fetch(urlBase + '/superviseur/courriel/' + superviseurCourriel + '/toEvaluate')
        const data = await res.json()
        return data
    }
}

export default ContratService
