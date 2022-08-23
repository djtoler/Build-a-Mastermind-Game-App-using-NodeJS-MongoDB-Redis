

const create_a_new_game = async (req, res, current_game_mode) => {
    console.log("in create game route");
    const { passUserData } = req.body;
  
    // console.log(req.body, '+++++++++++++game req body++++++++++++++');
    // console.log(passUserData);
    const currentUser = JSON.parse(passUserData);
    console.log(currentUser, 'CURRENT  USER');
    // const current_user_email = current_user.email;
    console.log(  currentUser.user.email, '------------email<----------');
    const currentUserEmail = currentUser.user.email
    const currentUserID = currentUser.user._id
    const game_obj = {
      is_2_player: false,
      game_mode: current_game_mode,
      rounds_played: 0,
      game_won: false,
      user: currentUserID,
    };
    const user = await User.findOne({ email: currentUserEmail });
    const game = await Game.create(gameobj);
    await game.users.push(user);
    await game.save();
    await user.games.push(game);
    await user.save();
    return res.json({ game_id: game._id });
  };

  class dynamoDBUser {
    constructor(user, userProfile, games) {
        this.user = user
        this.userProfile = userProfile
        this.games = games
    }
}

class DynamoUserBuilder {
    createDynamoDBUser (username, email, password, picture) {
        this.username = username
        this.email = email
        this.password = password
        this.picture = picture
        return this
    }
    createUserProfileAllTimeStats(avgPPG, allTimeGamesPlayed, allTimeGamesWon, allTimePointsEarned ) {
        this.avgPPG = avgPPG
        this.allTimeGamesPlayed = allTimeGamesPlayed
        this.allTimeGamesWon = allTimeGamesWon
        this.allTimePointsEarned = allTimePointsEarned
        return this
    }
    createUserProfileRankings(ranking, ppgRanking, peRanking, gwRanking, gpRanking) {
        this.ranking = ranking
        this.ppgRanking = ppgRanking
        this.peRanking = peRanking
        this.gwRanking = gwRanking
        this.gpRanking = gpRanking
        return this
    }
    createGameProfile( gameID, is2Player, gameMode, randomNumber) {
        this.gameID = gameID
        this.is2Player = is2Player
        this.gameMode = gameMode
        this.randomNumber = randomNumber
        return this
    }
    createGameData(guesses, roundsPlayed, totalPoints, totalCorrectNumbers, totalCorrectLocations, gameWon) {
        this.guesses = guesses
        this.roundsPlayed = roundsPlayed
        this.totalPoints = totalPoints
        this.totalCorrectNumbers = totalCorrectNumbers
        this.totalCorrectLocations = totalCorrectLocations
        this.gameWon = gameWon
        return this
    }
    buildNewDynamoDBUser() {
        return new dynamoDBUser(
            {
                username: this.username, 
                email: this.email, 
                password: this.password, 
                picture:this.picture
            },
            {
                avgPPG: this.avgPPG, 
                allTimeGamesPlayed: this.allTimeGamesPlayed, 
                allTimeGamesWon: this.allTimeGamesWon, 
                allTimePointsEarned: this.allTimePointsEarned,
                ranking: this.ranking, 
                ppgRanking: this.ppgRanking, 
                peRanking: this.peRanking, 
                gwRanking: this.gwRanking, 
                gpRanking: this.gpRanking
            },
            [{
                gameID: this.gameID, 
                username: this.username, 
                is2Player: this.is2Player,
                gameMode: this.gameMode,
                randomNumber: this.randomNumber,
                gusses: [this.guesses],
                roundsPlayed: this.roundsPlayed ,
                totalPoints: this.totalPoints ,
                totalCorrectNumbers: this.totalCorrectNumbers,
                totalCorrectLocations: this.totalCorrectLocations, 
                gameWon: this.gameWon
            }]
        )
    }
}

module.exports = DynamoUserBuilder