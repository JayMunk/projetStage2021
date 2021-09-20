import { useState, useEffect } from "react";
import validateInfo from "./validateInfoEtudiant";
import Axios from 'axios'



const useFormEtudiant = (callback,validateInfo) => {
    const url = ""
    const [values,setValues] = useState({
        prenom: "",
        nom: "",
        courriel: "",
        password: "",
        password2: "",
        numTelephone: "",
        programme: "",
        adresse: "",
        numMatricule: "",
        hasLicense: "",
        hasVoiture: "",
    })
    const [errors,setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value,
        })

        var request = new XMLHttpRequest();
        request.open('POST', 'localhost:9191/stage/etudiant', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(values)
    }

    const handleSubmit = e =>{
        e.preventDefault();

        setErrors(validateInfo(values))
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

export default useFormEtudiant;