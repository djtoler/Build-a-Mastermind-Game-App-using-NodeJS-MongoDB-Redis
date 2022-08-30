const businessLogicUser =  {
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
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDUxOTI4OGI5YjI2OThjZTgwOGYxMCIsImlhdCI6MTY2MTUxOTI1MywiZXhwIjoxNjY1NDA3MjUzfQ.1Xk5HwqtUIwKeHckj0YzOhvgT7fAwHNJkfEjoJK1drw",
}

const businessLogicCurrentGameSession = {
    id: "6306aec8c2ffd53ceb9ad902",
    is2Player: false,
    gameMode: 'default',
    randomNumber: 4516,
    roundsPlayed: 1,
    totalPoints: 1000,
    totalCorrectNumbers: 2,
    totalCorrectLocations: 2,
    gameWon: false,
    users: [ businessLogicUser]
}

const getUser = (email) => {
    email = businessLogicUser
    return businessLogicUser;
}

const getCurrentGame = (id) => {
    id = businessLogicCurrentGameSession.id
    return businessLogicCurrentGameSession;
}

module.exports = {
    getUser,
    getCurrentGame
}