const User = require("./user-model");
const Game = require("./game-model");
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

const createGame = async (newGame, currentLoggedInUser) => {
    const newGameSchema = {
        is_2_player: newGame.gameProfile.is2Player,
        game_mode: newGame.gameProfile.gameMode,
        random_number: newGame.gameProfile.randomNumber,
        rounds_played: newGame.gameData.roundsPlayed,
        game_won: false,
        rounds: [{total_round_points: newGame.gameData.totalPoints, total_correct_numbers: newGame.gameData.totalCorrectNumbers, total_correct_locations: newGame.gameData.totalCorrectLocations,}],
        total_game_points: newGame.gameData.totalPoints,
        users: [currentLoggedInUser._id]
    }

    const mongoDBGame = await Game.create(newGameSchema)
    const user = await User.findOne( {email: currentLoggedInUser.email} );
    user.games.push(mongoDBGame)
    user.save()
    return mongoDBGame
}

const getCurrentGame = async (email) => {
    const user = await User.findOne( {email} );
    const currentGameID = user.games[user.games.length - 1]
    const currentGame = await Game.findOne({_id: currentGameID})
    return currentGame
}

const updateGame = async (dataToUpdateCurrentGame, currentUser) => {    
    const user = await User.findOne( {email: currentUser.email} );
    const currentGameID = user.games[user.games.length - 1]
    let currentGame = await Game.findOne({_id: currentGameID})
    currentGame.rounds_played = currentGame.rounds_played + 1
    if (currentGame.rounds_played > 4 ) {
        currentGame.rounds_played = currentGame.rounds_played - 1
        currentGame.save()
        const newGameSchema = {
            is_2_player: false,
            game_mode: 'default',
            random_number: 0,
            rounds_played: 0,
            game_won: false,
            rounds: [{total_round_points: 0, total_correct_numbers: 0, total_correct_locations: 0,}],
            total_game_points: 0,
            users: [user._id]
        }
        currentGame = await Game.create(newGameSchema)
    } 

    const currentRoundDataObject = {
        game_mode: dataToUpdateCurrentGame.theCurrentGamesMode,
        total_round_points: dataToUpdateCurrentGame.totalPoints,
        total_correct_numbers: dataToUpdateCurrentGame.gameRoundObject.totalCorrectNumbersCount,
        total_correct_locations: dataToUpdateCurrentGame.gameRoundObject.totalCorrectLocationsCount,
    }

    currentGame.rounds.push(currentRoundDataObject)
    currentGame.total_game_points = currentGame.total_game_points + currentRoundDataObject.total_round_points
    currentGame.save()
}

module.exports = {
    createNewUser,
    getUser,
    createGame,
    getCurrentGame,
    updateGame
}