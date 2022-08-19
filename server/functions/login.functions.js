const currentDatabaseInUse = require('../databases/settings/database.currentdatabase')

const validateVisitorLoginInput = (requestBodyObj = {email, password}) => {
    let isInputValid = false
    if (Object.keys(requestBodyObj).length < 1) {return 'err: must include name and pw'} 
    if (requestBodyObj.email.length < 8) {return 'err: email invalid'}
    if (requestBodyObj.password.length < 4) {return 'err: password invalid'}
    isInputValid = true
    return isInputValid
}

const doVerificationAndAuthentication = async (requestBodyObj = {email: "debobill@yahoo.com", password: "mypassword1"}) => {
    if (requestBodyObj.email && requestBodyObj.password === null || requestBodyObj.email && requestBodyObj.password === undefined ) {
        console.log('error: user not found');
        return "error: couldnt find you"
    }
}

const verifyAndAuthenticateVisitorLoginCredentials = async (currentDatabase, requestBodyObj = {email: "debobill@yahoo.com", password: "mypassword1"}) => {
    let isValidUser = false
    const cdb = await process.env.CURRENTDATABASE
    currentDatabase = await currentDatabaseInUse()
    const getUsernameAndPassword = currentDatabase.returnUserNameAndPassword(requestBodyObj.email, requestBodyObj.password)
    doVerificationAndAuthentication(requestBodyObj = {email: "debobill@yahoo.com", password: "mypassword1"})
    isValidUser = true
    return getUsernameAndPassword
}

const authorizeUserToStartGame = async (currentDatabase, requestBodyObj = {email: "debobill@yahoo.com", password: "mypassword1"}) => {
    validateVisitorLoginInput(requestBodyObj = {email: "debobill@yahoo.com", password: "mypassword1"})
    verifyAndAuthenticateVisitorLoginCredentials(currentDatabase, requestBodyObj = {email: "debobill@yahoo.com", password: "mypassword1"})
}

module.exports = authorizeUserToStartGame