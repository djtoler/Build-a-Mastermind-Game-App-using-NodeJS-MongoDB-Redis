const logoutUser = require('../../functions/login/logout.functions')

const runUserLogoutService = () => {
    const runUserLogout = logoutUser()
    return runUserLogout
}

module.exports = runUserLogoutService