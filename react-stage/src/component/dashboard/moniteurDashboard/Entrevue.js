import { React, useState, useEffect, useContext } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'
import '../../../Css/Dashboard.css'
import Table from "react-bootstrap/Table"


const Entrevue = (reloadList) => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [entrevues, setEntrevues] = useState([])


    useEffect(() => {
        fetchListEntrevue()

    }, [])

    useEffect(async () => {
        console.log("Reloading list useEffect")
        await fetchListEntrevue()
    }, [reloadList])

    const fetchListEntrevue = async () => {
        if (loggedUser.isLoggedIn) {
            await fetch(`http://localhost:9191/user/${loggedUser.courriel}`)
                .then(res => {
                    return res.json()
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

        </tr>)

    return (
        <div>
            <h2>Entrevues</h2>
            <Table striped bordered hover variant="dark" className="DashboardTable">
                <tr>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                <tbody>
                    {entrevuesList}
                </tbody>
            </Table>
        </div>

    )
}

export default Entrevue
