import { React, useState, useEffect, useContext } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo'
import '../../../Css/Dashboard.css'
import Table from "react-bootstrap/Table"
import EntrevueService from "../../../services/EntrevueService"
import UserService from "../../../services/UserService"


const Entrevue = (reloadList) => {
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [entrevues, setEntrevues] = useState([])


    useEffect(() => {
        fetchListEntrevue()

    }, [])

    useEffect(async () => {
        await fetchListEntrevue()
    }, [reloadList])

    const fetchListEntrevue = async () => {
        if (loggedUser.isLoggedIn) {
            UserService.getUserByEmail(loggedUser.courriel).then(data => {
                EntrevueService.getEntrevuesMoniteur(data.id).then(data => {
                    setEntrevues(data)
                    console.log(data, "entrevues")
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
        <>
            <h2>Entrevues</h2>
            {entrevuesList.length > 0 ?
                <div>

                    <Table striped bordered hover variant="dark" className="DashboardTable mb-4">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entrevuesList}
                        </tbody>
                    </Table>
                </div>
                :
                <h3 className="text-center text-warning mt-4">Il n'y a aucunes entrevues</h3>
            }
        </>

    )
}

export default Entrevue
