import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar } from 'react-bootstrap'
import './NavbarCSS.css'
import logo from './logo.svg'
import { Link } from 'react-router-dom'
import NotificationBell from '../Notification/NotificationBell'

const MoniteurNavbarHTML = () => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/dashboard"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ">

          <Nav.Link as={Link} to="/account">Account details</Nav.Link>

          <Nav.Link as={Link} to="/newOffre">Créer offre de stage</Nav.Link>

          <Nav.Link as={Link} to="/evaluation/etudiant">Evaluation Étudiant</Nav.Link>

          <Nav.Link as={Link} to="/gestion/demarrerContrat">Démarrer Contrat</Nav.Link>

          <Nav.Link className="bell">
            <NotificationBell />
          </Nav.Link>

          <Nav.Link className="logout" href="/login">Déconnexion</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MoniteurNavbarHTML