class Game {
    constructor(gameProfile, gameData) {
        this.gameProfile = gameProfile
        this.gameData = gameData
    }
}

class NewGameBuilder {
    createGameProfile( userEmail, gameID, is2Player, gameMode, randomNumber, date) {
        this.userEmail = userEmail
        this.gameID = gameID
        this.is2Player = is2Player
        this.gameMode = gameMode
        this.randomNumber = randomNumber
        this.date = date
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
    buildNewGame() {
        return new Game(
            {
                gameID: this.gameID, 
                userEmail: this.userEmail, 
                is2Player: this.is2Player,
                gameMode: this.gameMode,
                randomNumber: this.randomNumber,
                date: this.date
            },
            {
                guesses: this.guesses,
                roundsPlayed: this.roundsPlayed ,
                totalPoints: this.totalPoints ,
                totalCorrectNumbers: this.totalCorrectNumbers,
                totalCorrectLocations: this.totalCorrectLocations, 
                gameWon: this.gameWon
            }
        )
    }
}

module.exports = NewGameBuilder



