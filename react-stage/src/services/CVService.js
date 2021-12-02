const urlBase = 'http://localhost:9191/cv'
const CVService = {
    saveCv: async (cv) => {
        const res = await fetch(urlBase,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(cv)
            })
        const data = await res.json()
        return data
    },

    acceptCV: async (cv) => {
        const res = await fetch(urlBase + '/accept',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(cv)
            })
        const data = await res.json()
        return data
    },

    rejectCV: async (cv) => {
        const res = await fetch(urlBase + '/reject',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(cv)
            })
        const data = await res.json()
        return data
    },

    getAllCVs: async () => {
        const res = await fetch(urlBase)
        const data = await res.json()
        return data
    },

    getCV: async (id) => {
        const res = await fetch(urlBase + '/' + id)
        const data = await res.json()
        return data
    },

    getAllCVEtudiant: async (id) => {
        const res = await fetch(urlBase + '/etudiant/' + id)
        const data = await res.json()
        return data
    },
}

export default CVService