const User = require("./user-model");
const Game = require("./user-model");

const getUser = async (email) => {
    const mongoDBUser = await User.findOne( {email} )
    return mongoDBUser;
}

const createGame = async () => {
    const mongoDBUser = await User.findOne( {email} )
    const mongoDBGame = await Game.create(gameobj)
}

module.exports = {getUser: getUser}