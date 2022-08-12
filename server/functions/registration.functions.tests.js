function validateInput(requestBodyObj = {_name, email, password, confirmPassword, uploadedImg}) {
    
    const allFieldsCompleted = Object.keys(requestBodyObj).length > 3
    const passwordsMatch = requestBodyObj.password == requestBodyObj.confirmPassword
    const passwordIsCorrectLength = requestBodyObj.password.length >= 4
    
    const errorsArray = [allFieldsCompleted, passwordsMatch, passwordIsCorrectLength]
    console.log(allFieldsCompleted, passwordsMatch, passwordIsCorrectLength )
    let passedValidation = errorsArray.every((error) => error == false );
    passedValidation = true ? 'passed' : 'failed'
    
    return passedValidation
}

module.exports = validateInput