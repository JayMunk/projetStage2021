import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserInfoContext } from "../../contexts/UserInfo";
import ContratService from "../../services/ContratService";
import Table from "react-bootstrap/Table";

const ListEntrepriseToEvaluate = ({ contrats, onClick }) => {
  return (
    <div className="container">
      <h1 className="text-white text-center">
        Liste des entreprises à évaluer
      </h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nom d'entreprise</th>
            <th>Nom du stagiaire</th>
          </tr>
        </thead>
        <tbody>
          {contrats.length > 0 ? (
            contrats.map((contrat) => (
              <tr key={contrat.id} onClick={() => onClick(contrat.id)}>
                <td>{contrat.moniteur.nomEntreprise}</td>
                <td>{contrat.etudiant.prenom}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                Aucun entreprise à afficher
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ListEntrepriseToEvaluate;
