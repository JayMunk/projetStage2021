import { React, useState, useEffect, useContext } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'


const Entrevue = (reloadList) => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [entrevues, setEntrevues] = useState([])


    useEffect(() => {
        fetchListEntrevue()

    }, [])

    useEffect(async () => {
        console.log("Reloading list useEffect")
        await fetchListEntrevue()
        await fetchListEntrevue()
    }, [reloadList])

    const fetchListEntrevue = async () => {
        if (loggedUser.isLoggedIn) {
            await fetch(`http://localhost:9191/user/${loggedUser.courriel}`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    fetch(`http://localhost:9191/entrevue/moniteur/${data.id}`)
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            setEntrevues(data)
                        })
                })
        }
    }


    const entrevuesList = entrevues.map((entrevue) =>
        <tr key={entrevue.id.toString()}>
            <td>{entrevue.titre}</td>
            <td>{entrevue.date}</td>
            <td>{entrevue.time}</td>

        </tr>);

    return (
        <div>
            <h1>Entrevues</h1>
            <table>
                <tr>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                <tbody>
                    {entrevuesList}
                </tbody>
            </table>
        </div>

    )
}

export default Entrevue
