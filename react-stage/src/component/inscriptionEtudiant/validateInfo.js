export default function validateInfo(values) {
    let errors = {}

    if(!values.username) {
        errors.username = "Username required"
    }

    if(!values.email) {
        errors.email = "Email required"
    }

    if(!values.password) {
        errors.password = "Password required"
    } else if (values.password.length < 6) {
        errors.password = "Password needs to be 6 characters or more"
    }

    if(!values.password2){
        errors.password2 = "Password is required"
    } else if (values.password2 !== values.password){
        errors.password2 = "Password doesn't match"
    }

    return errors;
}