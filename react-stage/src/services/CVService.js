import Swal from "sweetalert2"
import "@sweetalert2/theme-dark/dark.css"


const urlBase = "http://localhost:9191/cv";
const CVService = {
  saveCv: async (cv) => {
    const res = await fetch(urlBase, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cv),
    });
    const data = await res.json();
    return data;
  },

  acceptCV: async (cv) => {
    const res = await fetch(urlBase + "/accept", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cv),
    });
    const data = await res.json();
    return data;
  },

  rejectCV: async (cv) => {
    const res = await fetch(urlBase + "/reject", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cv),
    });
    const data = await res.json();
    return data;
  },

  getAllCVs: async () => {
    const res = await fetch(urlBase);
    const data = await res.json();
    return data;
  },

  getCV: async (id) => {
    const res = await fetch(urlBase + "/" + id);
    const data = await res.json();
    return data;
  },

  getCvEtudiant: async (id) => {
    const res = await fetch(urlBase + "/etudiant/" + id);
    const data = await res.json();
    return data;
  },

  deleteCv: async (id) => {
    const res = await fetch(urlBase + "/delete/" + id, { method: "DELETE" });
    return res.ok;
  },

  saveCv: async (cv) => {
    const res = await fetch(urlBase, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cv),
    });
    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Votre cv vient d`être ajouté à la liste ci-dessous.",
      });
    }
    const data = await res.json();
    return data;
  },
};

export default CVService;
