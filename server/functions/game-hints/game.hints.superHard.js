function returnRandomNumberToHideCurrentGamesRandomNumber(highestPossibleIndexValue) {
    return Math.floor(Math.random() * highestPossibleIndexValue);
}

async function hideRandomNumberBetweenTwoRandomNumbers (randomlyGeneratedNumber, randomPositionToPlaceRandomlyGeneratedNumbers, theCurrentGamesRandomNumberStringValue) {
    let buildHiddenNumber = 
        randomlyGeneratedNumber.substring(0, randomPositionToPlaceRandomlyGeneratedNumbers)
        + theCurrentGamesRandomNumberStringValue
        + randomlyGeneratedNumber.substring(randomPositionToPlaceRandomlyGeneratedNumbers);

    return buildHiddenNumber 
}

async function returnSuperHardHints (theCurrentGamesRandomNumber) {
    let hintEvaluation;
    let theCurrentGamesRandomNumberStringValue = theCurrentGamesRandomNumber.toString()
    let randomlyGeneratedNumber = returnRandomNumberToHideCurrentGamesRandomNumber(999999999).toString()
    let randomPositionToPlaceRandomlyGeneratedNumbers = Math.floor(Math.random() * (randomlyGeneratedNumber.length + 1));

    const hiddenRandomNumber = await hideRandomNumberBetweenTwoRandomNumbers(randomlyGeneratedNumber, randomPositionToPlaceRandomlyGeneratedNumbers, theCurrentGamesRandomNumberStringValue)
    
    hintEvaluation = {gameMode:'superHard', hint: Number(hiddenRandomNumber)};
    console.log(hintEvaluation);
    return hintEvaluation;
};

module.exports = returnSuperHardHints
  