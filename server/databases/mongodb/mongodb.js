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
        // total_points: newGame.gameData.totalPoints,
        // total_correct_numbers: newGame.gameData.totalCorrectNumbers,
        // total_correct_locations: newGame.gameData.totalCorrectLocations,
        game_won: false,
        rounds: [{total_round_points: newGame.gameData.totalPoints, total_correct_numbers: newGame.gameData.totalCorrectNumbers, total_correct_locations: newGame.gameData.totalCorrectLocations,}],
        total_game_points: newGame.gameData.totalPoints,
        users: [currentLoggedInUser._id]
    }

    const mongoDBGame = await Game.create(newGameSchema)
    console.log(mongoDBGame, "<<<----- mongoDBGAME");

    const user = await User.findOne( {email: currentLoggedInUser.email} );
    console.log(user, "user from mongodb create game");
    console.log(user.games, 'user games array');
    user.games.push(mongoDBGame)
    user.save()
    console.log(user.games, 'user games array');
    return mongoDBGame
}

const getCurrentGame = async (email) => {
    console.log(email, 'email from mongodb');
    const user = await User.findOne( {email} );
    console.log(user, '<<<--- user from mongodb');
    console.log(user.games.length, "<<< --- user games array");
    const currentGameID = user.games[user.games.length - 1]
    console.log(currentGameID, '<<<<--- current gamed id from gurrentgamefunc mongodb');

    const currentGame = await Game.findOne({_id: currentGameID})
    console.log(currentGame, '<<<<--- current game currentgamefunc mongodb');
    return currentGame
}

const updateGame = async (dataToUpdateCurrentGame, currentUser) => {
    console.log(dataToUpdateCurrentGame, "<<<<---- data to update current ame from mongo db", currentUser, '<<<<<---- currentUser from mongodb @ update game');
    
    const user = await User.findOne( {email: currentUser.email} );
    const currentGameID = user.games[user.games.length - 1]

    let currentGame = await Game.findOne({_id: currentGameID})
    currentGame.rounds_played = currentGame.rounds_played + 1
    console.log(currentGame.rounds_played);

    if (currentGame.rounds_played > 4 ) {
        console.log('in db if');
        console.log(currentGame.rounds_played);
        console.log(currentGame._id);
        currentGame.rounds_played = currentGame.rounds_played - 1
        console.log(currentGame.rounds_played);
        currentGame.save()
        const newGameSchema = {
            is_2_player: false,
            game_mode: 'default',
            random_number: 0,
            rounds_played: 0,
            // total_points: newGame.gameData.totalPoints,
            // total_correct_numbers: newGame.gameData.totalCorrectNumbers,
            // total_correct_locations: newGame.gameData.totalCorrectLocations,
            game_won: false,
            rounds: [{total_round_points: 0, total_correct_numbers: 0, total_correct_locations: 0,}],
            total_game_points: 0,
            users: [user._id]
        }
        currentGame = await Game.create(newGameSchema)
        console.log(currentGame._id);
    } 
    console.log(currentGame, '%%%%%"currentGame frommongodb update game"%%%%')
    console.log(currentGame.rounds_played, typeof(currentGame.rounds_played), "currentGame frommongodb update game");

    const currentRoundDataObject = {
        game_mode: dataToUpdateCurrentGame.theCurrentGamesMode,
        total_round_points: dataToUpdateCurrentGame.totalPoints,
        total_correct_numbers: dataToUpdateCurrentGame.gameRoundObject.totalCorrectNumbersCount,
        total_correct_locations: dataToUpdateCurrentGame.gameRoundObject.totalCorrectLocationsCount,
    }
    console.log(currentGame, '%%%%%"currentGame below round data"%%%%')
    
    console.log(currentGame.total_game_points, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"); 
    currentGame.rounds.push(currentRoundDataObject)
    currentGame.total_game_points = currentGame.total_game_points + currentRoundDataObject.total_round_points
    console.log(currentGame.total_game_points, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"); 
    currentGame.save()

    console.log(currentRoundDataObject, '<<<<<<------******updateGameObject****');
    console.log(currentGame.rounds, '<<<<<<------******rounds array****COUNT---> ',currentGame.rounds.length );
    console.log(currentGameID, '<<<<<<------******currentGameID****');
}

module.exports = {
    createNewUser,
    getUser,
    createGame,
    getCurrentGame,
    updateGame
}