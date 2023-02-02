const loginValidationHelpers = {
    incompleteFields : { title: "Please fill out all fields", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    passwordIncorrect : { title: "You entered the wrong password", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    couldntFindUser : { title: "This user account doesnt exist", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    loginError : { title: "Error Logging In, try again", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    successfulLogin : { title: "Login Successful", status: "success", duration: 9000, isClosable: true, position: "bottom" },
    emailTooShort : { title: "Email should be at least 8 characters", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
};

module.exports = {
    loginValidationHelpers
}