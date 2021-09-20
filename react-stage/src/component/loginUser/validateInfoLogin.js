export default function validateInfoLogin(values) {
    let errors = {}

    if(!values.courriel) {
        errors.courriel = "Courriel requis"
    }

    if(!values.password) {
        errors.password = "Mot de passe requis"
    }

    
    return errors;
}