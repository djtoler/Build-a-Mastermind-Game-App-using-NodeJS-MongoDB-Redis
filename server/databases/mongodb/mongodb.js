const User = require("./user-model");
const Game = require("./user-model");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");

const createNewUser = async (name, email, password, uploadedImage) => {
    const picture = uploadedImage.public_id;
    const newMongoDBUser = await User.create({ name, email, password, picture });
    newMongoDBUser.password = cryptr.encrypt(newMongoDBUser.password);
    return newMongoDBUser;
}

const getUser = async (email) => {
    const mongoDBUser = await User.findOne( {email} )
    return mongoDBUser;
}

const createGame = async (newGameObj) => {
    const mongoDBGame = await Game.create(newGameObj)
    return mongoDBGame
}

module.exports = {
    createNewUser: createNewUser,
    getUser: getUser,
    createGame: createGame
}