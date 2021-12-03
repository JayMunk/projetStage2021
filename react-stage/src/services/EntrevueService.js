const urlBase = 'http://localhost:9191/entrevue'
const EntrevueService = {
    addEntrevue: async (entrevue) => {
        const res = await fetch(urlBase,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(entrevue)
            })
        const data = await res.json()
        return data
    },

    getAllEntrevues: async () => {
        const res = await fetch(urlBase)
        const data = await res.json()
        return data
    },

    getEntrevuesMoniteur: async (id) => {
        const res = await fetch(urlBase + "/moniteur/" + id)
        const data = await res.json()
        return data
    },

    getEntrevuesEtudiant: async (id) => {
        const res = await fetch(urlBase + "/etudiant/" + id)
        const data = await res.json()
        return data
    },
}

export default EntrevueService