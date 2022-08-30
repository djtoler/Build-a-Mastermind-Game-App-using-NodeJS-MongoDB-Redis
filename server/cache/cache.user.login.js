const currentCacheEngine = require("./cache.connection");
const {validateVisitorLoginInput} = require('../functions/login.functions')
const {authorizeUserToStartGame} = require('../functions/login.functions')
const {loginValidationHelpers} = require('../functions/login.helpers')
const generate_token = require("../config/token");

const findUserFromLoginInCache = async (email, password) => {
    const runUserValidation = await validateVisitorLoginInput(email, password);
    if (runUserValidation.isValidLoginInput == false) {return}

    const cacheEngine = (await currentCacheEngine()).client
    const findUserInCache = await cacheEngine.get(email);

    // if (findUserInCache) {
    //     console.log('from cache <---------');
    //     user = JSON.parse(findUserInCache);
    //     return {msg: loginValidationHelpers.successfulLogin, user: user, token:generate_token(user._id)}
    // }

    const authorizeUser = await authorizeUserToStartGame(email, password)
    if (authorizeUser.user) {const setUserInCache = await cacheEngine.set(email, JSON.stringify(authorizeUser.user))}
    return {authorizeUser}
    
    // return {user: authorizeUser.user, token: authorizeUser.token, msg: authorizeUser.loginSucceded}}
}

module.exports = findUserFromLoginInCache