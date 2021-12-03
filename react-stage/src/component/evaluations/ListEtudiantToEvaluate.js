import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { UserInfoContext } from "../../contexts/UserInfo"
import ContratService from "../../services/ContratService"
import Table from "react-bootstrap/Table"

const ListEtudiantToEvaluate = ({ contrats, onClick }) => {
  return (
    <div className="container">
      <h1 className="text-white text-center">Liste des étudiants à évaluer</h1>
      <h5 className="text-center mt-4 mb-4 text-warning">
        Cliquez sur n'importe quel des entrées dans la liste pour l'évaluer.
      </h5>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nom d'étudiant</th>
            <th>Nom d'entreprise</th>
          </tr>
        </thead>
        <tbody>
          {contrats.length > 0 ? (
            contrats.map((contrat) => (
              <tr key={contrat.id} onClick={() => onClick(contrat.id)}>
                <td>
                  {contrat.etudiant.prenom} {contrat.etudiant.nom}
                </td>
                <td>{contrat.moniteur.nomEntreprise}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center text-warning">
                Aucun étudiants à afficher
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default ListEtudiantToEvaluate
