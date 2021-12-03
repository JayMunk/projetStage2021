import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './NavbarCSS.css'
import { UserInfoContext } from '../../contexts/UserInfo'
import EtudiantNavbarHTML from './EtudiantNavbarHTML'
import SuperviseurNavbarHTML from './SuperviseurNavbarHTML'
import MoniteurNavbarHTML from './MoniteurNavbarHTML'
import GestionnaireNavbarHTML from './GestionnaireNavbarHTML'

const NavbarHTML = () => {
  const [loggedUser] = useContext(UserInfoContext)


  return (
    <>
      {
        loggedUser.isLoggedIn && loggedUser.role === "ETUDIANT" ?
          < EtudiantNavbarHTML />
          :
          null
      }
      {
        loggedUser.isLoggedIn && loggedUser.role === "SUPERVISEUR" ?
          < SuperviseurNavbarHTML />
          :
          null
      }
      {
        loggedUser.isLoggedIn && loggedUser.role === "MONITEUR" ?
          < MoniteurNavbarHTML />
          :
          null
      }
      {
        loggedUser.isLoggedIn && loggedUser.role === "GESTIONNAIRE" ?
          < GestionnaireNavbarHTML />
          :
          null
      }
    </>
  )
}

export default NavbarHTML
