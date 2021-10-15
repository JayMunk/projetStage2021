const UserService = {
    getUserByEmail: async (email) => {
        const res = await fetch('http://localhost:9191/user/' + email)
        const data = await res.json()
        return data
    },

    getListAllEtudiants: async () => {
        const res = await fetch('http://localhost:9191/stage/etudiants')
        const data = await res.json()
        return data
    }
}

export default UserService