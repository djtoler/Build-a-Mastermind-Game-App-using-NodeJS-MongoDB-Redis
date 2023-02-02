const { resetEasyHintNumbersEvent } = require("../game-events/event-emitters");
currentLowestPossibleNumber = 0000;
currentHighestPossibleNumber = 7777;

async function returnEasyHints(
  theCurrentGamesRandomNumber,
  mostCurrentUserGuess,
  easyHintButtonClickCounter
) {
  theCurrentGamesRandomNumber = Number(theCurrentGamesRandomNumber);
  mostCurrentUserGuess = Number(mostCurrentUserGuess);

  let hintSentence, hintEvaluation;
  console.log("in EASY HINTS");
  console.log(
    "mostCurrentUserGuess: ",
    mostCurrentUserGuess,
    ",",
    "theCurrentGamesRandomNumber ",
    theCurrentGamesRandomNumber
  );

  resetEasyHintNumbersEvent.once(
    "resetHighAndLowNumbersToOriginalValue",
    function (lowestNumberAfterReset, highestNumberAfterReset) {
      currentLowestPossibleNumber = lowestNumberAfterReset;
      currentHighestPossibleNumber = highestNumberAfterReset;
    }
  );

  if (theCurrentGamesRandomNumber < mostCurrentUserGuess) {
    hintSentence = `LOWER, YOUR SECRET NUMBER IS BETWEEN ${currentLowestPossibleNumber} & ${
      mostCurrentUserGuess - 1
    }`;
    currentHighestPossibleNumber = mostCurrentUserGuess;
  }

  if (theCurrentGamesRandomNumber > mostCurrentUserGuess) {
    hintSentence = `HIGHER, YOUR SECRECT NUMBER IS BETWEEN ${
      mostCurrentUserGuess + 1
    } & ${currentHighestPossibleNumber}`;
    currentLowestPossibleNumber = mostCurrentUserGuess;
  }

  hintEvaluation = { gameMode: "easy", hint: hintSentence };
  return hintEvaluation;
}

module.exports = returnEasyHints;
