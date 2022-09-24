const currentCacheEngine = require("../cache/cache.connection");

async function randomImageIDSelector(numberOfRandomDigitsToLoopThrough) {
    let randomImageIDNumber = Math.floor(Math.random() * numberOfRandomDigitsToLoopThrough) + 1;
    return randomImageIDNumber;
}

async function returnRandomHintImageKeysFromCache (numberOfRandomDigitsToLoopThrough, theCurrentGamesRandomNumber) {
    const cacheEngine = (await currentCacheEngine()).client
    let arrayUsedAsCachedKeyStringValue = [],  arrayHoldingNewlyGeneratedCachedImageObjects = [], i = 0;

    const imageIDReferenceNumberToSelectARandomImage = await randomImageIDSelector(numberOfRandomDigitsToLoopThrough);
    while (i < numberOfRandomDigitsToLoopThrough) {
        arrayUsedAsCachedKeyStringValue[i] = `hintData_${theCurrentGamesRandomNumber.charAt(i)}${imageIDReferenceNumberToSelectARandomImage}`;
        arrayHoldingNewlyGeneratedCachedImageObjects.push(await cacheEngine.get(arrayUsedAsCachedKeyStringValue[i]))
        i++;
    }
    return arrayHoldingNewlyGeneratedCachedImageObjects
}

async function returnSuperEasyHints (numberOfRandomDigitsToLoopThrough, theCurrentGamesRandomNumber) {
    const arrayOfRandomHintImageKeys = await returnRandomHintImageKeysFromCache(numberOfRandomDigitsToLoopThrough, theCurrentGamesRandomNumber)
    let arrayToHoldCachedHintImageObjects = [];
    
    arrayOfRandomHintImageKeys.forEach((cachedHintImageObject)=> {
        let chachedImageObject = new Object();
        let parsedHintImageObject = JSON.parse(cachedHintImageObject)
        chachedImageObject = { caption: parsedHintImageObject.caption, image: parsedHintImageObject.image };
        arrayToHoldCachedHintImageObjects.push(chachedImageObject);
    })

    let hintEvaluation = { gameMode: "superEasy", hint: arrayToHoldCachedHintImageObjects };
    return hintEvaluation
}

module.exports = returnSuperEasyHints