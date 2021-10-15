const OffreService = {
    // getAllOffres [GET] /stage/offres
    getAllOffres: async () => {
        const res = await fetch('http://localhost:9191/stage/offres')
        const data = await res.json()
        return data
    },

    // getEtudiantOffres [GET] /stage/offres/{etudiantCourriel}
    getEtudiantOffres: async (etudiantCourriel) => {
        const res = await fetch('http://localhost:9191/stage/offres/' + etudiantCourriel)
        const data = await res.json()
        return data
    },

    // saveOffre [POST] /stage/offre
    saveOffre: async (offre) => {
        const res = await fetch('http://localhost:9191/stage/offre', 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(offre)
        })
        const data = await res.json()
        return data
    },

    // saveWhitelist [POST] /stage/whitelist
    saveWhitelist: async (whitelist) => {
        const res = await fetch('http://localhost:9191/stage/whitelist', 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(whitelist)
        })
        const data = await res.json()
        return data
    }
}

export default OffreService