import { useState, useEffect } from "react";
import validateInfoSuperviseur from "./validateInfoSuperviseur";
import Axios from 'axios'



const useFormSuperviseur = (callback,validateInfoSuperviseur) => {
    const url = ""
    const [values,setValues] = useState({
        prenom: "",
        nom: "",
        courriel: "",
        password: "",
        password2: "",
        numTelephone: "",
        departement: "",
        specialite: "",
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

        setErrors(validateInfoSuperviseur(values))
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

export default useFormSuperviseur;