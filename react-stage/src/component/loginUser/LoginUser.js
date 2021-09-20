import React from 'react'
import { useState } from 'react/cjs/react.development'
import LoginUserHTML from './LoginUserHTML'
import LoginUserSuccess from './LoginUserSuccess'
import './LoginUserCss.css'

const LoginUser = () => {
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
                {!isSbubmitted ? (<LoginUserHTML submitForm={submitForm} /> ) : (<LoginUserSuccess />)  }
            </div>
            
        </>
    )
}

export default LoginUser
