const asyncHandler = require("express-async-handler");
const { login } = require("../../functions/event-emitters");
const findUserFromLoginInCache = require('../../cache/cache.user.login')

const runUserLoginService = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const runFindUserFromCacheOrDB = await findUserFromLoginInCache(email, password)
    return res.json(runFindUserFromCacheOrDB)
});

module.exports = runUserLoginService

