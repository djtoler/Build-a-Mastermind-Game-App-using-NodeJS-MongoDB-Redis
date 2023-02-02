const {gameobj, invalidGameObj} = require("../databases/mongodb/model-helpers")

const validateLoginInputTest  = (requestBodyObj = {email, password}) => {
    let user = {userEmail: 'test1@test.com', userPassword: 'password1' }
    let game = gameobj
    let invalidGame = invalidGameObj

    const allFieldsCompleted = Object.keys(requestBodyObj).length > 1
    const emailLengthIsValid = requestBodyObj.email.length > 8
    const passwordLengthIsValid = requestBodyObj.password > 4
    console.log(requestBodyObj);
    console.log(requestBodyObj.password);
    // console.log(requestBodyObj.password.length);
    const passwordsMatch = requestBodyObj.password == user.userPassword ? true: false
    const userFound = requestBodyObj.email == user.email ? true : false

    let gameShouldBeCreated = (
        typeof game.is_2_player == 'boolean' && 
        typeof game.game_mode == 'string' && 
        typeof game.rounds_played == 'number' && 
        typeof game.game_won == 'boolean' && 
        Array.isArray(game.user)) 
        ? true:  false

    let gameShouldntBeCreated = (
        typeof invalidGame.is_2_player == 'boolean' && 
        typeof invalidGame.game_mode == 'string' && 
        typeof invalidGame.rounds_played == 'number' && 
        typeof gaminvalidGamee.game_won == 'boolean' && 
        Array.isArray(invalidGame.user)) 
        ? true:  false

    return [allFieldsCompleted, passwordsMatch, userFound, gameShouldntBeCreated, gameShouldBeCreated, emailLengthIsValid, passwordLengthIsValid, requestBodyObj]
}

module.exports = validateLoginInputTest