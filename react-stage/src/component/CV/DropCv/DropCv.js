import { React, useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../../../contexts/UserInfo";
import "../../../Css/DropCv.css";
import { saveAs } from "file-saver";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import CVService from "../../../services/CVService";
import UserService from "../../../services/UserService";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

const DropCv = () => {
  const [etudiant, setEtudiant] = useState();
  const [cvs, setCvs] = useState([]);
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext);
  const [files, setFile] = useState(null);
  const history = useHistory();

  const OnInputChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0] != undefined) {
      document.querySelector("#test").textContent = e.target.files[0].name;
    } else {
      document.querySelector("#test").textContent = "";
    }
  };

  const fileToBase64 = (file, cb) => {
    if (file == null) {
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Veuillez choisir un fichier s`il-vous-plaît.",
      });
    } else if (file != null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(null, reader.result);
      };
      reader.onerror = function (error) {
        cb(error, null);
      };
    }
  };

  const OnSubmit = async (e) => {
    e.preventDefault();

    fileToBase64(files, (err, result) => {
      if (result) {
        result = result.substring(28);
        if (loggedUser.isLoggedIn) {
          if (loggedUser.isLoggedIn) {
            UserService.getUserByEmail(loggedUser.courriel).then((data) => {
              setEtudiant(data);
              let cv = { data: result, etudiant: data, nom: files.name };
              CVService.saveCv(cv).then((data) => {
                setFile(null);
                document.querySelector("#test").textContent = "";
                updateCvs();
              });
            });
          }
        }
      }
    });
  };

  const updateCvs = async () => {
    const fetchCv = await CVService.getCvEtudiant(etudiant.id);
    setCvs(fetchCv);
  };

  const deleteCV = async (cv) => {
    const boolean = await CVService.deleteCv(cv.id);
    if (boolean) {
      updateCvs();
    }
  };

  const download = async (cv) => {
    saveAs(`http://localhost:9191/cv/pdf/${cv.id}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <AiOutlineClockCircle color="gold" size="48px" />;
      case "ACCEPTED":
        return <AiOutlineCheckCircle color="green" size="48px" />;
      case "REJECTED":
        return <AiOutlineCloseCircle color="red" size="48px" />;
      default:
        return;
    }
  };

  const setDefaultCV = async (cv) => {
    await CVService.setDefaultCV(cv);
    updateCvs();
  };

  const cvList = cvs.map((cv) => (
    <tr key={cv.id.toString()}>
      <td>{cv.nom}</td>
      <td>{cv.dateSoumission}</td>
      <td>
        <button onClick={() => deleteCV(cv)} className="tableCvButton">
          effacer
        </button>
      </td>
      <td>
        <button onClick={() => download(cv)} className="tableCvButton">
          télécharger
        </button>
      </td>
      <td>{getStatusIcon(cv.status)}</td>
      {cv.defaultCV ? (
        <td>
          <FontAwesomeIcon
            onClick={() => setDefaultCV(cv)}
            icon={faFlagCheckered}
            size="2x"
          />
        </td>
      ) : (
        <td>
          <FontAwesomeIcon
            className="text-secondary"
            onClick={() => setDefaultCV(cv)}
            icon={faFlagCheckered}
            size="2x"
          />
        </td>
      )}
    </tr>
  ));

  useEffect(() => {
    if (!loggedUser.isLoggedIn) history.push("/login")
    if (loggedUser.isLoggedIn) {
      UserService.getUserByEmail(loggedUser.courriel).then((data) => {
        setEtudiant(data);
        CVService.getCvEtudiant(data.id).then((data) => {
          setCvs(data);
        });
      });
    }
  }, []);

  return (
    <body id="body">
      <h2 className="text-center">Ajout de cv</h2>
      <div id="formContainer" className="mx-auto text-center">
        <form method="post" action="#" id="formCv" onSubmit={OnSubmit}>
          <div class="form-group files">
            <label for="fileName" className="btn">
              <FontAwesomeIcon icon={faUpload} size="2x" />
            </label>
            <h4 id="fileName" id="test"></h4>
            <input
              type="file"
              onChange={OnInputChange}
              id="fileName"
              name="fileName"
              multiple=""
            />
          </div>
          <button type="submit" id="buttonCv">
            Submit
          </button>
        </form>
      </div>
      {cvs.length > 0 ? (

        <Table striped bordered hover variant="dark" id="tableCv">
          <thead>
            <tr>
              <th>nom du fichier</th>
              <th>Date de soumission</th>
              <th>effacer</th>
              <th>télécarger</th>
              <th>Statut du CV</th>
              <th>CV primaire</th>
            </tr>
          </thead>
          <tbody>{cvList}</tbody>
        </Table>
      ) : <h3 className="text-center mt-4 text-warning">Cet étdudiant n'a aucun cv</h3>}


    </body>
  );
};

export default DropCv;
