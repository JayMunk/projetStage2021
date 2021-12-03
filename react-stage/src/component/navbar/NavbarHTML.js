import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './NavbarCSS.css'
import logo from './logo.svg'
import { Link } from 'react-router-dom';
import { UserInfoContext } from '../../contexts/UserInfo';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NotificationBell from '../../component/Notification/NotificationBell';





const NavbarHTML = () => {
  const [loggedUser, setLoggedUser] = useContext(UserInfoContext)

  const myFunction = () => {
    const url = encodeURIComponent("http://localhost:3000/moniteur");
    window.open(`mailto:?subject=${url}&body=Voici le lien pour vous inscrire`)
  }



  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {loggedUser.isLoggedIn ?
        <Navbar.Brand as={Link} to="/dashboard"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
        :
        <Navbar.Brand as={Link} to="/login"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
      }
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ">

          {loggedUser.isLoggedIn ?
            <Nav.Item>
              <Nav.Link as={Link} to="/account">Account details</Nav.Link>
            </Nav.Item>
            :
            null
          }

          {loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE" ?
            <NavDropdown title="Url Inscription" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={myFunction}>Envoyer par courriel</NavDropdown.Item>
              <CopyToClipboard text={"http://localhost:3000/moniteur"}><NavDropdown.Item >Copier le lien</NavDropdown.Item></CopyToClipboard>
            </NavDropdown>
            :
            null
          }

          {(loggedUser.isLoggedIn && loggedUser.role !== "SUPERVISEUR") ?
            <NavDropdown title="Offres" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/offres">Offres</Link></NavDropdown.Item>
              {loggedUser.role === "GESTIONNAIRE" || loggedUser.role === "MONITEUR" ?
                <NavDropdown.Item><Link to="/newOffre">Créer offre de stage</Link></NavDropdown.Item> : null
              }
            </NavDropdown>
            :
            null
          }

          {loggedUser.isLoggedIn && (loggedUser.role === "ETUDIANT" || loggedUser.role === "GESTIONNAIRE") ?
            <NavDropdown title="CV" id="basic-nav-dropdown">
              {loggedUser.role === "ETUDIANT" ?
                <NavDropdown.Item><Link to="/dropCv">Ajouter ou voir cv</Link></NavDropdown.Item> : null
              }
              {loggedUser.role === "GESTIONNAIRE" ?
                <NavDropdown.Item><Link to="/gestion/cv">Voir et valider les CV</Link></NavDropdown.Item> : null
              }
            </NavDropdown>
            :
            null
          }

          {loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE" ?
            <Nav.Link as={Link} to="/gestion/superviseur">Gestion Superviseur</Nav.Link> : null
          }
          {loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE" ?
            <Nav.Link as={Link} to="/gestion/allSession">All Sessions Info</Nav.Link> : null
          }
          {loggedUser.isLoggedIn && loggedUser.role === "MONITEUR" && <Nav.Link as={Link} to="/evaluation/etudiant">Evaluation Étudiant</Nav.Link>}
          {loggedUser.isLoggedIn && loggedUser.role === "SUPERVISEUR" && <Nav.Link as={Link} to="/evaluation/entreprise">Evaluation Entreprise</Nav.Link>}




          {loggedUser.isLoggedIn && (loggedUser.role === "ETUDIANT" || loggedUser.role === "GESTIONNAIRE" || loggedUser.role === "MONITEUR") ?
            <NavDropdown title="Contrat" id="basic-nav-dropdown">
              {loggedUser.role === "GESTIONNAIRE" ?
                <NavDropdown.Item><Link to="/gestion/newContrat">Créer Contrat</Link></NavDropdown.Item> : null
              }
              <NavDropdown.Item><Link to="/gestion/demarrerContrat">Démarrer Contrat</Link></NavDropdown.Item>

            </NavDropdown>
            :
            null
          }
          {loggedUser.isLoggedIn &&
            <Nav.Item>
              <Nav.Link className="bell">
                <NotificationBell />
              </Nav.Link>
            </Nav.Item>
          }

          {loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE" ?
            <Nav.Link as={Link} to="/rapports">Rapports</Nav.Link> : null
          }


        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarHTML
