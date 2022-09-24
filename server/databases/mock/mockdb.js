const businessLogicUser =  {
    id:'630519288b9b2698ce808f10',
    _name:"memo600",
    email:"memo600@mail.com",
    password:"4eb86e86f78a7f835ed377fafb7458438509705f0b48d0697aa14e996a30b88291bf15d866a4190cd1514127338f6e5ee7b075485197c5bdba985af25a98f283229e77b4ddbc9a516d5108a18e435d945f201fcfa7b3bd22e085e473b24f175a74ea20dae6e6b4",
    picture:"User_Avatars/aettqjninoq8dwxwakqy",
    alltimeGamesPlayed:3,
    alltimeGamesWon:0,
    alltimePointsEarned:0,
    avgPPG:0,
    ranking:0,
    ppgRanking:0,
    peRanking:0,
    gwRanking:0,
    gpRanking:0,
    games: [
        "63051a2a2ff0057858f5cc23",
        "63051a9fa18fd0de27e3a66b",
        "63051d7ee855546a8eedebcf",
        "6306ab6d2a7766c8d3becc3f",
        "6306aec8c2ffd53ceb9ad902",
    ],
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDUxOTI4OGI5YjI2OThjZTgwOGYxMCIsImlhdCI6MTY2MTUxOTI1MywiZXhwIjoxNjY1NDA3MjUzfQ.1Xk5HwqtUIwKeHckj0YzOhvgT7fAwHNJkfEjoJK1drw",
}

const businessLogic2Users =  [
    {user1: 
        {    
            id:'630519288b9b2698ce808f10',
            _name:"memo600",
            email:"memo600@mail.com",
            password:"4eb86e86f78a7f835ed377fafb7458438509705f0b48d0697aa14e996a30b88291bf15d866a4190cd1514127338f6e5ee7b075485197c5bdba985af25a98f283229e77b4ddbc9a516d5108a18e435d945f201fcfa7b3bd22e085e473b24f175a74ea20dae6e6b4",
            picture:"User_Avatars/aettqjninoq8dwxwakqy",
            alltimeGamesPlayed:0,
            alltimeGamesWon:0,
            alltimePointsEarned:0,
            avgPPG:0,
            ranking:0,
            ppgRanking:0,
            peRanking:0,
            gwRanking:0,
            gpRanking:0,
            games: [
                "63051a2a2ff0057858f5cc23",
                "63051a9fa18fd0de27e3a66b",
                "63051d7ee855546a8eedebcf",
                "6306ab6d2a7766c8d3becc3f",
                "6306aec8c2ffd53ceb9ad902",
            ],
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDUxOTI4OGI5YjI2OThjZTgwOGYxMCIsImlhdCI6MTY2MTUxOTI1MywiZXhwIjoxNjY1NDA3MjUzfQ.1Xk5HwqtUIwKeHckj0YzOhvgT7fAwHNJkfEjoJK1drw"
        }
    },
    {user2:     
        {
            id:'630519288b9b2698ce808f12',
            _name:"memo602",
            email:"memo602@mail.com",
            password:"4eb86e86f78a7f835ed377fafb7458438509705f0b48d0697aa14e996a30b88291bf15d866a4190cd1514127338f6e5ee7b075485197c5bdba985af25a98f283229e77b4ddbc9a516d5108a18e435d945f201fcfa7b3bd22e085e473b24f175a74ea20dae6e6b42",
            picture:"User_Avatars/aettqjninoq8dwxwakqy",
            alltimeGamesPlayed:0,
            alltimeGamesWon:0,
            alltimePointsEarned:0,
            avgPPG:0,
            ranking:0,
            ppgRanking:0,
            peRanking:0,
            gwRanking:0,
            gpRanking:0,
            games: [
                "63051a2a2ff0057858f5cc232",
                "63051a9fa18fd0de27e3a66b2",
                "63051d7ee855546a8eedebcf2",
                "6306ab6d2a7766c8d3becc3f2",
                "6306aec8c2ffd53ceb9ad9022",
            ],
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDUxOTI4OGI5YjI2OThjZTgwOGYxMCIsImlhdCI6MTY2MTUxOTI1MywiZXhwIjoxNjY1NDA3MjUzfQ.1Xk5HwqtUIwKeHckj0YzOhvgT7fAwHNJkfEjoJK1drw2"
        }
    }

]

const businessLogicCurrentGameSession = {
    id: "6306aec8c2ffd53ceb9ad902",
    is2Player: false,
    gameMode: 'default',
    randomNumber: 4516,
    roundsPlayed: 4,
    totalPoints: 1000,
    totalCorrectNumbers: 2,
    totalCorrectLocations: 2,
    gameWon: false,
    users: [ businessLogicUser]
}

const businessLogicCurrentGameSession1 = {
    gameID: 'memo600@mail.comd8f09fbf-eb5b-4d8c-a682-7d6e4b487c6a',
    userEmail: 'memo600@mail.com',
    is2Player: false,
    gameMode: 'waiting',
    randomNumber: 0,
    date: 'Sat Sep 03 2022 12:10:26 GMT-0400 (Eastern Daylight Time)',
    gameData: {
        guesses: [],
        roundsPlayed: 0,
        totalPoints: 0,
        totalCorrectNumbers: 0,
        totalCorrectLocations: 0,
        gameWon: false
    }
}

const getUser = (email) => {
    email = businessLogicUser
    return businessLogicUser;
}

const getCurrentGame = (id) => {
    id = businessLogicCurrentGameSession1.gameID
    return businessLogicCurrentGameSession1;
}

const createNewGame = (currentDatabase, currentUser, email) => {
    email = businessLogicUser
}

module.exports = {
    getUser,
    getCurrentGame,
    createNewGame
}