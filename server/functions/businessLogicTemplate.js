const defaultBusinessLogicNewGameObj = {
    is2Player: false, 
    gameMode: 'waiting', 
    randomNumber: 0, 
    roundsPlayed: 0, 
    gameWon: false, 
    user: []
};

const defaultUserFromRequestBody = {
    authorizeUser: {
        isAuthenticated: true,
        user: {
            id:'630519288b9b2698ce808f10',
            name:"memo600",
            email:"memo600@mail.com",
            password:"4eb86e86f78a7f835ed377fafb7458438509705f0b48d0697aa14e996a30b88291bf15d866a4190cd1514127338f6e5ee7b075485197c5bdba985af25a98f283229e77b4ddbc9a516d5108a18e435d945f201fcfa7b3bd22e085e473b24f175a74ea20dae6e6b4",
            picture:"User_Avatars/aettqjninoq8dwxwakqy",
            alltime_games_played:0,
            alltime_games_won:0,
            alltime_points_earned:0,
            avg_ppg:0,
            ranking:0,
            ppg_ranking:0,
            pe_ranking:0,
            gw_ranking:0,
            gp_ranking:0,
            games: [
                "63051a2a2ff0057858f5cc23",
                "63051a9fa18fd0de27e3a66b",
                "63051d7ee855546a8eedebcf",
                "6306ab6d2a7766c8d3becc3f",
                "6306aec8c2ffd53ceb9ad902",
            ],
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDUxOTI4OGI5YjI2OThjZTgwOGYxMCIsImlhdCI6MTY2MTUxOTI1MywiZXhwIjoxNjY1NDA3MjUzfQ.1Xk5HwqtUIwKeHckj0YzOhvgT7fAwHNJkfEjoJK1drw",
            loginSucceded: {title:"Login Successful", status:"success", duration:9000, isClosable:true, position:"bottom"}
        }
    }
}

const defaultGameFromRequestBodyID = '6306aec8c2ffd53ceb9ad902';
const defaultRandomNumberGeneratorArray = [4516, 3516, 2703, 5545]
const defaultRandomNumberGenerator = defaultRandomNumberGeneratorArray[Math.floor(Math.random() * (defaultRandomNumberGeneratorArray.length + 1))];
const defaultCurrentRandomNumberFromRequestBody = 4516
const defaultCurrentModeFromRequestBody = 'superEasy'


const defaultCorrectGuessNumber = 4516
const defaultWrongGuessNumberFromRequestBody = 4567

const defaultRandomNumberOptions = {
    randomNumberFromRequestBodyToNumber: ~~defaultCurrentRandomNumberFromRequestBody,
    randomNumberFromRequestBodyToArray: Array.from(String(defaultCurrentRandomNumberFromRequestBody)),
    randomNumberFromRequestBodyString: defaultCurrentRandomNumberFromRequestBody.toString()
}

const defaultGameFromRequestBodyObject = {
    id: '',
    is_2_player: false,
    game_mode: 'default',
    random_number: defaultCurrentRandomNumberFromRequestBody,
    rounds_played: 1,
    total_points: 1000,
    total_correct_numbers: 2,
    total_correct_locations: 2,
    game_won: false,
    users: [ defaultUserFromRequestBody.authorizeUser.user ],
}

const defaultGameRoundIncrementer = (currentGame) => {
    currentGame.rounds_played = currentGame.rounds_played + 1;
    return currentGame
}

module.exports = {
    defaultBusinessLogicNewGameObj,
    defaultCurrentRandomNumberFromRequestBody,
    defaultUserFromRequestBody,
    defaultGameFromRequestBodyID,
    defaultGameFromRequestBodyObject,
    defaultRandomNumberOptions,
    defaultGameRoundIncrementer,
    defaultCorrectGuessNumber,
    defaultWrongGuessNumberFromRequestBody,
    defaultCurrentModeFromRequestBody
}