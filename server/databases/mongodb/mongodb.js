const User = require("./user-model");

const getUser = async (email) => {
    const mongoDBUser = await User.findOne( {email} )
    return mongoDBUser;
}

const createGame = async () => {
    
}

module.exports = {getUser: getUser}