const { input_validation, createAndReturnNewUser }  = require('./registration.functions')

const runIsUserValidated = async (array, name, email, password, confirmPassword) => {
    const returnValidationObj = await input_validation(array, name, email, password, confirmPassword)
    if (returnValidationObj.array.length > 0) {return returnValidationObj.array[0]} 
};

const runCreateAndReturnNewUser = async (image, name, email, password) => {
    const newUser = await createAndReturnNewUser(image, name, email, password);
    return newUser
};

module.exports = {
    runIsUserValidated,
    runCreateAndReturnNewUser
}