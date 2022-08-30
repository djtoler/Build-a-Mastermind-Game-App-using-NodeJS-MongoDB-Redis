const runReturnRandomNumberFromBackup = require('./game.backup')
const returnRandomNumberFromBackup = runReturnRandomNumberFromBackup()
const convertRandomNumber = require('./game.components.convertRandomNumber')
const runNewRandomNumberFromAPIEvent = require('./game.events')

const gameModes = { easy: "easy", superEasy: "superEasy", hard: "hard", superHard: "superHard" };
const defaultGameObj = {is2Player: false, gameMode: 'waiting', randomNumber: 0, roundsPlayed: 0, gameWon: false, user: []};


const RANDOM_NUMBER_API_RELIABILITY_MODE = (responseObj) => {
    responseObj = {};
    console.log('FROOOMMM RELIAB');

    const randomNumberFromBackup = Number(returnRandomNumberFromBackup);
    Object.assign(responseObj, {success: false, randomNumber: randomNumberFromBackup});
    process.env.RANDOM_NUMBER = responseObj.randomNumber
    
    return responseObj
}

const returnRandomNumber = async (apiResponse) => {
    responseObj = {};
    // console.log('FROM DEFAULT!!');

    const randomNumber = await convertRandomNumber(apiResponse);
    Object.assign(responseObj, {success: true, randomNumber: randomNumber.randomNumber});
    process.env.RANDOM_NUMBER = responseObj.randomNumber
    
    // console.log(randomNumber, 'randomnumber');
    // console.log(responseObj, '<----- responseobject');
    return responseObj
}


// async function randomImageIDSelector(index) {
//     let randomImageIDNumber = Math.floor(Math.random() * index) + 1;
//     return randomImageIDNumber;
// }

// async function returnRandomHintImageKeysFromCache (numberOfRandomDigitsToLoopThrough, theCurrentGamesRandomNumber) {
    
//     let arrayUsedAsCachedKeyStringValue = [];
//     let i = 0;
//     const imageIDReferenceNumberToSelectARandomImage = randomImageIDSelector(numberOfRandomDigitsToLoopThrough);
    
//     while (i < numberOfRandomDigitsToLoopThrough) {
//         arrayUsedAsCachedKeyStringValue[i] = `hintData_${theCurrentGamesRandomNumber.charAt(i)}${imageIDReferenceNumberToSelectARandomImage}`;
//         i++;
//     }

//     const hint_key1 = await client.get(arrayUsedAsCachedKeyStringValue[0]);
//     const hint_key2 = await client.get(arrayUsedAsCachedKeyStringValue[1]);
//     const hint_key3 = await client.get(arrayUsedAsCachedKeyStringValue[2]);
//     const hint_key4 = await client.get(arrayUsedAsCachedKeyStringValue[3]);

//     let arrayHoldingNewlyGeneratedCachedImageHintKeys = [hint_key1, hint_key2, hint_key3, hint_key4];
//     return arrayHoldingNewlyGeneratedCachedImageHintKeys
// }

// async function returnSuperEasyHints (numberOfRandomDigitsToLoopThrough, theCurrentGamesRandomNumber) {
    
//     const arrayOfRandomHintImageKeys = returnRandomHintImageKeysFromCache(numberOfRandomDigitsToLoopThrough, theCurrentGamesRandomNumber)
    
//     let arrayToHoldCachedImageObjects = [];
    
//     for (let index = 0; index < arrayOfRandomHintImageKeys.length; index++) {

//         let chachedImageObject = new Object();

//         let parsedHintImageObject = JSON.parse(arrayOfRandomHintImageKeys[index]);

//         let b64StringOfHintImage = parsedHintImageObject.image;
        
//         // let hintImageDisplayTag = `data:image/jpeg;base64,${b64StringOfHintImage}`;
//         let hintImageDisplayTag = `${b64StringOfHintImage}`;

//         chachedImageObject = { caption: parsedHintImageObject.caption, img: hintImageDisplayTag };
        
//         arrayToHoldCachedImageObjects.push(chachedImageObject);
//     }

//     console.log(arrayToHoldCachedHintKeys.length);

//     let hintEvaluation = { game_mode: "super_easy", hint: arrayToHoldCachedImageObjects };
//     console.log(hintEvaluation);

//     return hintEvaluation
// }



module.exports = {
    RANDOM_NUMBER_API_RELIABILITY_MODE,
    returnRandomNumber,
    defaultGameObj,
    gameModes
}













// async function generateHintKeys (hintKey, hintKeyNumber, arrayUsedAsCachedKeyStringValue, arrayOfHintKeysGeneratedFromWhileLoop = [], i=0) {
//     arrayOfHintKeysGeneratedFromWhileLoop.push(`${hintKey}${hintKeyNumber}` = await client.get(arrayUsedAsCachedKeyStringValue[i])) 
//     i++
// }





