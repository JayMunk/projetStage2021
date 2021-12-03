const urlBase = "http://localhost:9191/rapport";
const RapportService = {

    getOffresValide: async () => {
        const res = await fetch(urlBase + "/list/offresValide");
        const data = await res.json();
        return data;
    },

    getOffresInvalide: async () => {
        const res = await fetch(urlBase + "/list/offresInvalide");
        const data = await res.json();
        return data;
    },

    getEtudiantsInscrient: async () => {
        const res = await fetch(urlBase + "/list/etudiantsInscrient");
        const data = await res.json();
        return data;
    },

    getCvsPendingEtRejected: async () => {
        const res = await fetch(urlBase + "/list/cvPendingEtRejected");
        const data = await res.json();
        return data;
    },

    getEtudiantsPasDeCv: async () => {
        const res = await fetch(urlBase + "/list/etudiantsPasDeCv");
        const data = await res.json();
        return data;
    },

    getEtudiantsPasDeEntrevue: async () => {
        const res = await fetch(urlBase + "/list/etudiantsSansEntrevue");
        const data = await res.json();
        return data;
    },

    getEtudiantsEnAttenteEntrevue: async () => {
        const res = await fetch(urlBase + "/list/etudiantsEnAttenteEntrevue");
        const data = await res.json();
        return data;
    },

    getEtudiantsEnAttenteReponse: async () => {
        const res = await fetch(urlBase + "/list/etudiantsEnAttenteDeReponse");
        const data = await res.json();
        return data;
    },

    getEtudiantsTrouveStage: async () => {
        const res = await fetch(urlBase + "/list/etudiantsTrouveStage");
        const data = await res.json();
        return data;
    },

    getEtudiantsPasEvaluationMoniteur: async () => {
        const res = await fetch(urlBase + "/list/etudiantsPasEvaluationMoniteur");
        const data = await res.json();
        return data;
    },

    getEtudiantsPasEntrepriseEvaluationSuperviseur: async () => {
        const res = await fetch(urlBase + "/list/etudiantsPasEntrepriseEvaluationSuerviseur");
        const data = await res.json();
        return data;
    },


};

export default RapportService;