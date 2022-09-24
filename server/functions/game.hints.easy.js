const {resetEasyHintNumbersEvent} = require('./event-emitters')

async function returnEasyHints (theCurrentGamesRandomNumber, mostCurrentUserGuess) {
  mostCurrentUserGuess = Number(mostCurrentUserGuess)
  let hintSentence, hintEvaluation, currentLowestPossibleNumber, currentHighestPossibleNumber
  
  resetEasyHintNumbersEvent.on("resetHighAndLowNumbersToOriginalValue", function (lowestNumberAfterReset, highestNumberAfterReset) {
    currentLowestPossibleNumber =   lowestNumberAfterReset
    currentHighestPossibleNumber =  highestNumberAfterReset
  })

  if (theCurrentGamesRandomNumber < mostCurrentUserGuess) {
    hintSentence = `LOWER, YOUR SECRET NUMBER IS BETWEEN ${currentLowestPossibleNumber} & ${mostCurrentUserGuess - 1}`;
    currentHighestPossibleNumber = mostCurrentUserGuess
  }  
  
  hintSentence = `HIGHER, YOUR SECRECT NUMBER IS BETWEEN ${mostCurrentUserGuess + 1} & ${currentHighestPossibleNumber}`;
  currentLowestPossibleNumber = mostCurrentUserGuess;

  hintEvaluation = {gameMode: 'easy', hint: hintSentence}
  return hintEvaluation
};

module.exports = returnEasyHints
  