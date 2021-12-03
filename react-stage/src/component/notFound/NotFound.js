import React from "react"
import { Link } from 'react-router-dom'
import "./NotFound.css"

const NotFound = () => {
    return (
        <div id="notFound">
            <div class="fof">
                <h1>Error 404</h1>
                <h2>UH OH! Vous êtes perdus.</h2>
                <p>La page que vous cherchez n'existe pas.</p>
                <p> Comment vous vous êtes rendus ici est un mistère.</p>
                <Link to="/login">Connectez-vous ici</Link>
            </div>
        </div>
    )
}

export default NotFound
