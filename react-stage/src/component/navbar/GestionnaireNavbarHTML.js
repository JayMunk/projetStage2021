import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './NavbarCSS.css'
import logo from './logo.svg'
import { Link } from 'react-router-dom'
import { UserInfoContext } from '../../contexts/UserInfo'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import NotificationBell from '../Notification/NotificationBell'


const GestionnaireNavbarHTML = () => {

  const myFunction = () => {
    const url = encodeURIComponent("http://localhost:3000/moniteur");
    window.open(`mailto:?subject=${url}&body=Voici le lien pour vous inscrire`)
  }


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/dashboard"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ">

          <Nav.Link as={Link} to="/account">Account details</Nav.Link>

          <NavDropdown title="Url Inscription" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={myFunction}>Envoyer par courriel</NavDropdown.Item>
            <CopyToClipboard text={"http://localhost:3000/moniteur"}><NavDropdown.Item >Copier le lien</NavDropdown.Item></CopyToClipboard>
          </NavDropdown>

          <NavDropdown title="Offres" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/offres">Offres</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/newOffre">Créer offre de stage</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="CV" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/gestion/cv">Voir et valider les CV</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link as={Link} to="/gestion/superviseur">Gestion Superviseur</Nav.Link>

          <Nav.Link as={Link} to="/gestion/allSession">All Sessions Info</Nav.Link>

          <NavDropdown title="Contrat" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/gestion/newContrat">Créer Contrat</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/gestion/demarrerContrat">Démarrer Contrat</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link className="bell">
            <NotificationBell />
          </Nav.Link>
          <Nav.Link as={Link} to="/rapports">Rapports</Nav.Link>

          <Nav.Link className="logout" href="/login">Déconnexion</Nav.Link>


        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default GestionnaireNavbarHTML
