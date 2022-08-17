const currentDatabaseInUse = require('../databases/settings/database.currentdatabase')

const validateLoginInput = (requestBodyObj = {email, password}) => {
    let isInputValid = false
    if (Object.keys(requestBodyObj).length < 1) {return 'err: must include name and pw'} 
    if (requestBodyObj.email.length < 8) {return 'err: email invalid'}
    if (requestBodyObj.password.length < 4) {return 'err: password invalid'}
    isInputValid = true
    return isInputValid
}

const validateUsernameAndPassword = async (currentDatabase, requestBodyObj = {email: "debobill@yahoo.com", password: "mypassword1"}) => {
    let isValidUser = false
    const cdb = await process.env.CURRENTDATABASE
    currentDatabase = await currentDatabaseInUse()
    const getUsernameAndPassword = currentDatabase.returnUser(requestBodyObj.email, requestBodyObj.password)
    console.log(getUsernameAndPassword);
    if (requestBodyObj.email && requestBodyObj.password === null || requestBodyObj.email && requestBodyObj.password === null ) {
        console.log('error: user not found');
        return "error: couldnt find you"
    }
    isValidUser = true
    return getUsernameAndPassword
}



validateUsernameAndPassword()

module.exports = validateUsernameAndPassword