import React from 'react'
import { useState } from 'react/cjs/react.development'
import FormSignup from './FormEtudiantHTML'
import FormSuccess from './FormEtudiantSuccess'
import './FormEtudiantCSS.css'

const FormEtudiant = () => {
    const [isSbubmitted,setIsSubmitted] = useState(false)

    function submitForm(){
        setIsSubmitted(true)
    }

    return (
        <>
            <div className="form-container">
                <span className="close-btn">x</span>
                <div className="form-content-left">
                    <img src="img/img-2.svg" alt="spaceship" className="form-img"></img>
                </div>
                {!isSbubmitted ? (<FormSignup submitForm={submitForm} /> ) : (<FormSuccess />)  }
            </div>
            
        </>
    )
}

export default FormEtudiant
