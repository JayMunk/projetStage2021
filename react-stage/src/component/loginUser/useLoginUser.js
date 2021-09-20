import { useState, useEffect } from "react";
import validateInfoLogin from "./validateInfoLogin";
import Axios from 'axios'



const useLoginUser = (callback,validateInfoLogin) => {
    const url = ""
    const [values,setValues] = useState({
        courriel: "",
        password: "",
    })
    const [errors,setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value,
        })

        // var request = new XMLHttpRequest();
        // request.open('POST', 'localhost:9191/stage/etudiant', true);
        // request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // request.send(values)
    }

    const handleSubmit = e =>{
        e.preventDefault();

        setErrors(validateInfoLogin(values))
        setIsSubmitting(true)
        console.log(values)
    }


    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]
    );


    return {handleChange, values, handleSubmit, errors}
};

export default useLoginUser;