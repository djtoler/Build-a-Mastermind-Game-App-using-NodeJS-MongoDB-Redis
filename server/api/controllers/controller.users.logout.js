const logoutUser = require('../../functions/logout.functions')

const runUserLogoutService = () => {
    const runUserLogout = logoutUser()
    return runUserLogout
}

module.exports = runUserLogoutService