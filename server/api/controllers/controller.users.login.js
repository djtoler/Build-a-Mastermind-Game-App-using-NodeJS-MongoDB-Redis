const asyncHandler = require("express-async-handler");
const authorizeUserToStartGame = require('../../functions/login.functions')
const validateVisitorLoginInput = require('../../functions/login.functions')
const { login } = require("../../functions/event-emitters");
const findUserFromLoginInCache = require('../../cache/cache.user.login')

const runUserLoginService = asyncHandler(async (req, res) => {
    console.log('in request for login**********');
    const {email, password} = req.body
    console.log(req.body)
    const runFindUserFromCacheOrDB = await findUserFromLoginInCache(email, password)
    // console.log(runFindUserFromCacheOrDB);
    return res.json(runFindUserFromCacheOrDB)

    // console.log(runFindUserFromCacheOrDB, 'from login endpoint!!!!!!');
    // return runFindUserFromCacheOrDB


    
});

module.exports = runUserLoginService

