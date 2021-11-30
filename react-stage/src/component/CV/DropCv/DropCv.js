import { React, useState, useContext, useEffect } from 'react'
import { UserInfoContext } from '../../../contexts/UserInfo';
import './DropCv.css'
import { saveAs } from 'file-saver'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from 'react-icons/ai'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import '@sweetalert2/theme-dark/dark.css'
import CVService from '../../../services/CVService';

const DropCv = () => {
    const [etudiant, setEtudiant] = useState()
    const [cvs, setCvs] = useState([]);
    const [loggedUser, setLoggedUser] = useContext(UserInfoContext)
    const [files, setFile] = useState(null)



    const OnInputChange = (e) => {
        setFile(e.target.files[0])
        if (e.target.files[0] != undefined) {
            document.querySelector("#test").textContent = e.target.files[0].name;
        }
        else {
            document.querySelector("#test").textContent = ""
        }



    }

    const fileToBase64 = (file, cb) => {
        if (file == null) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur!',
                text: 'Veuillez choisir un fichier s`il-vous-plaît.',
            })
        }
        else if (file != null) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                cb(null, reader.result)
            }
            reader.onerror = function (error) {
                cb(error, null)
            }
        }

    }

    const OnSubmit = (e) => {
        e.preventDefault()

        fileToBase64(files, (err, result) => {
            if (result) {
                result = result.substring(28)



                if (loggedUser.isLoggedIn) {
                    fetch(`http://localhost:9191/user/${loggedUser.courriel}`)
                        .then(res => {
                            return res.json();
                        })
                        .then(async (data) => {
                            console.log(data, "data")
                            console.log(data.id)
                            setEtudiant(data)

                            let cv = { data: result, etudiant: data, nom: files.name }

                            const res = await fetch('http://localhost:9191/cv', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                },
                                body: JSON.stringify(cv)
                            })
                            if (res.ok) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Succès!',
                                    text: 'Votre cv vient d`être ajouté à la liste ci-dessous.'
                                })
                            }
                            await res.json()
                            setFile(null)
                            document.querySelector("#test").textContent = ""
                            updateCvs()
                        })
                }
            }
        })
    }


    const updateCvs = async () => {
        fetch(`http://localhost:9191/cv/etudiant/${etudiant.id}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setCvs(data)
            })
    }

    const deleteCV = async (cv) => {
        // const res = await fetch(`http://localhost:9191/cv/delete/${cv.id}`, { method: 'DELETE' })
        const res = CVService.deleteCV(cv)
        await res.json().then(updateCvs())
    }

    const download = async (cv) => {
        await fetch(`http://localhost:9191/cv/pdf/${cv.id}`)
            .then(res => {
                console.log(res)
                if (res.ok) {
                    saveAs(`http://localhost:9191/cv/pdf/${cv.id}`)
                }
                if (!res.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur!',
                        text: 'Le fichier est invalide ou indisponible pour l`instant.',
                    })
                    throw res
                }
            })
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "PENDING":
                return <AiOutlineClockCircle color="gold" size="48px" />
            case "ACCEPTED":
                return <AiOutlineCheckCircle color="green" size="48px" />
            case "REJECTED":
                return <AiOutlineCloseCircle color="red" size="48px" />
            default:
                return;
        }
    }

    const cvList = cvs.map((cv) =>
        <tr key={cv.id.toString()}>
            <td>{cv.nom}</td>
            <td>{cv.dateSoumission}</td>
            <td><button onClick={() => deleteCV(cv)} className="tableCvButton">effacer</button></td>
            <td><button onClick={() => download(cv)} className="tableCvButton">télécharger</button></td>
            <td>{getStatusIcon(cv.status)}</td>
        </tr>);

    useEffect(() => {
        if (loggedUser.isLoggedIn) {
            fetch(`http://localhost:9191/user/${loggedUser.courriel}`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setEtudiant(data)
                    fetch(`http://localhost:9191/cv/etudiant/${data.id}`)
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            setCvs(data)
                        })
                })
        }
    }, [])

    return (
        <body id="body">
            <div id="formContainer" className="mx-auto text-center">
                <form method="post" action="#" id="formCv" onSubmit={OnSubmit}>

                    <div class="form-group files">

                        <label for="fileName" className="btn" ><FontAwesomeIcon icon={faUpload} size="2x" /></label>
                        <h4 id="fileName" id="test"></h4>
                        <input type="file" onChange={OnInputChange} id="fileName" name="fileName" multiple="" />

                    </div>
                    <button type="submit" id="buttonCv">Submit</button>
                </form>
            </div>
            {cvs.length > 0 ?
                <table id="tableCv">
                    <tr>
                        <th>nom du fichier</th>
                        <th>Date de soumission</th>
                        <th>effacer</th>
                        <th>télécarger</th>
                        <th>Statut du CV</th>
                    </tr>
                    {cvList}
                </table>
                : null}
        </body>
    )
}

export default DropCv

