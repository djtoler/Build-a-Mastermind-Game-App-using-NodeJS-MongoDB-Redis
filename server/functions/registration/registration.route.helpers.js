const verifyVisitorRegistrationCredentials = require('./registration.components.validateUserInput')
const createAndReturnNewUser = require('./registration.components.createNewUser')

const runIsUserValidated = async (array, name, email, password, confirmPassword) => {
    const returnValidationObj = await verifyVisitorRegistrationCredentials(array, name, email, password, confirmPassword)
    
    if (returnValidationObj.array.length > 0) 
        {return returnValidationObj.array[0]} 
};

const runCreateAndReturnNewUser = async (image, name, email, password) => {
    const newUser = await createAndReturnNewUser(image, name, email, password);
    return newUser
};

module.exports = {
    runIsUserValidated,
    runCreateAndReturnNewUser
}