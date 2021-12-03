import Swal from "sweetalert2"
import "@sweetalert2/theme-dark/dark.css"

const urlBase = "http://localhost:9191/offres"
const OffreService = {

  getAllOffres: async () => {
    const res = await fetch(urlBase)
    const data = await res.json()
    return data
  },

  getAllOffresAllSession: async () => {
    const res = await fetch(urlBase + '/allSession')
    const data = await res.json()
    return data
  },

  getEtudiantOffres: async (etudiantCourriel) => {
    const res = await fetch(urlBase + "/etudiant/" + etudiantCourriel)
    const data = await res.json()
    return data
  },

  getMoniteurOffres: async (moniteurCourriel) => {
    const res = await fetch(urlBase + "/moniteur/" + moniteurCourriel)
    const data = await res.json()
    return data
  },

  saveOffre: async (offre, authorEmail) => {
    const res = await fetch(urlBase + "/" + authorEmail, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(offre),
    })
    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Votre offre vient d`être ajouté.",
      });
    }
    const data = await res.json()
    return data
  },

  applyForOffre: async (id, email) => {
    const res = await fetch(`${urlBase}/${id}/apply`, {
      method: "POST",
      headers: {
        "Content-type": "text/plain",
      },
      body: email,
    })
    const data = await res.json()
    return data
  },
}

export default OffreService
