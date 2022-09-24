const AdminBuilder = require('./admin.class');
const adminDateDefault = new Date(Date.now()).toString()
console.log('adminbuilder', AdminBuilder);
const gameModesMap = {superEasy: 0, easy: 1, hard: 2, superHard: 3, default: 4} 


    const adminObject = new AdminBuilder()
                            .setID('main')
                            .trackPointsByMode ('', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) 
                            .trackCountsByMode (0, 0, 0, 0, 0, 0, 0, 0, 0, 0) 
                            .trackGamesPlayedByMode(0, 0, 0, 0, 0) 
                            .trackGeneralTotals(0, 0, 0, 0, 0)  
                            .trackAvatarAverages(0, 0, 0, 0)  
                            .setDummyUsers([]) 
                            .setWeeklyTracker(0)
                            .setDailyNewUsers(0, adminDateDefault) 
                            .setWeeklyNewUsers(0, adminDateDefault)
                            .trackRegistrationTimer(0, adminDateDefault)
                            .trackLoginTimer(0, adminDateDefault) 
                            .trackLoginCacheTimer(0, adminDateDefault)
                            .trackPullRandomNumberTimer(0, adminDateDefault)
                            .trackEvaluateGuessTimer(0, adminDateDefault)
                            .trackRequestsPerSecond(0, 0, 0, 0)
                            .trackThroughputData(0, 0, 0, 0)
                            .trackLatencyData(0, 0, 0, 0)
                            .trackEvaluateGuessTests(adminDateDefault, '', '', 0, 0, 0, 0, 0, 0, 0, 0, {}, '', 0, 0,)
                            .buildAdminObject();

console.log('adminObject: ==>', adminObject);


async function updatePointsAndCounts (theCurrentGamesMode, correctLocationPoints, correctDigitsPoints, guessEvaluationResults) {
    
    const 
    locationPointsKey =     'locationPoints_' +  theCurrentGamesMode,
    locationCountKey =      'locationCount_' +  theCurrentGamesMode,
    digitPointsKey =        'digitPoints_' +  theCurrentGamesMode,
    digitCountKey =         'digitCount_' +  theCurrentGamesMode
    
    let
    totalCurrentPoints, 
    locationPoints =        adminObject.totalPointsByMode[gameModesMap[theCurrentGamesMode]][theCurrentGamesMode][locationPointsKey],
    digitPoints =           adminObject.totalPointsByMode[gameModesMap[theCurrentGamesMode]][theCurrentGamesMode][digitPointsKey],
    locationCount =         adminObject.totalCountsByMode[gameModesMap[theCurrentGamesMode]][theCurrentGamesMode][locationCountKey],
    digitCount =            adminObject.totalCountsByMode[gameModesMap[theCurrentGamesMode]][theCurrentGamesMode][digitCountKey]

    locationPoints =        locationPoints + correctLocationPoints;
    digitPoints =           digitPoints + correctDigitsPoints;
    totalCurrentPoints =    locationPoints + digitPoints
    locationCount =         locationCount + guessEvaluationResults.totalCorrectLocationsCount;
    digitCount =            digitCount + guessEvaluationResults.totalCorrectNumbersCount

    return totalCurrentPoints
}

async function updateGamesPlayedByMode (theCurrentGamesMode) {
    let gameModeCountTracker =      adminObject.totalGamesPlayedByMode[theCurrentGamesMode]
    gameModeCountTracker =          gameModeCountTracker + 1;
}

async function updateGeneralGameDataTotals () {
    let
    totalRoundsPlayed =         adminObject.generalTotals.totalRoundsPlayed,
    totalCurrentPoints =        adminObject.generalTotals.totalCurrentPoints,
    totalNumberOfUsers =        adminObject.generalTotals.totalNumberOfUsers,
    totalGamesPlayed =          adminObject.generalTotals.totalGamesPlayed,
    totalGamesWon =             adminObject.generalTotals.totalGamesWon

    totalRoundsPlayed =         totalRoundsPlayed + 1
    totalCurrentPoints =        totalCurrentPoints + updatePointsAndCounts()
    totalNumberOfUsers =        6
    totalGamesPlayed =          12
    totalGamesWon =             10
    
    return {
        totalCurrentPoints, 
        totalGamesPlayed, 
        totalNumberOfUsers, 
        totalGamesWon
    }
}

async function updateGameAvatarTotals () {
    let
    avatarAvgPpg =          adminObject.avatarTotals.avatarAvgPpg,  
    avatarAvgGw =           adminObject.avatarTotals.avatarAvgGw,
    avatarAvgPe =           adminObject.avatarTotals.avatarAvgPe,
    avatarAvgGpc =          adminObject.avatarTotals.avatarAvgGpc,
    totalCurrentPoints =    (await updateGeneralGameDataTotals()).totalCurrentPoints,
    totalGamesPlayed =      (await updateGeneralGameDataTotals()).totalGamesPlayed,
    totalNumberOfUsers =    (await updateGeneralGameDataTotals()).totalNumberOfUsers,
    totalGamesWon =         (await updateGeneralGameDataTotals()).totalGamesWon

    avatarAvgPpg =          totalCurrentPoints / totalGamesPlayed
    avatarAvgGw =           totalGamesWon / totalNumberOfUsers 
    avatarAvgPe =           totalCurrentPoints / totalNumberOfUsers
    avatarAvgGpc =          totalGamesPlayed / totalNumberOfUsers
}

async function updateEvaluateGuessTimer () {
    let guessEvaluationTimesArray =         adminObject.performanceTracking[4]
    const newGuessEvaluationTimerObject =   {trackEvaluateGuessTimer: {time: 1.222344, date: new Date(Date.now()).toString()}}
    
    guessEvaluationTimesArray.push(newGuessEvaluationTimerObject)
}

async function updateEvaluateGuessTests () {
    let guessEvaluationTestsArray  =  adminObject.performanceTests
    console.log(adminObject.performanceTests[0]);
    
    const newGuessEvaluationTestObject = {
        trackEvaluateGuessTest: {
            date:                               new Date(Date.now()).toString(),
            nameOfFunctionBeingTested:          '',
            dataFromTheFunctionTest: 
                {
                    instanceDuration:           0,
                    trackRequestsPerSecond:     { avg: 0, mean: 0, min: 0, max: 0 },
                    trackThroughputData:        { avg: 0, mean: 0, min: 0, max: 0 },
                    trackLatencyData:           { avg: 0, mean: 0, min: 0, max: 0 },
                    numberOfThreads:            0,
                    numberOfCores:              0,
                    numberOfServers:            0,
                    numberOfErrors:             0,
                    non200StatusCode:           { code: 0, count: 0 }
                },
            number_of_timeouts:                 0
          }
    }
    guessEvaluationTestsArray.push(newGuessEvaluationTestObject)
}

module.exports = {
    updatePointsAndCounts,
    updateGamesPlayedByMode,
    updateGeneralGameDataTotals,
    updateGameAvatarTotals,
    updateEvaluateGuessTimer,
    updateEvaluateGuessTests
}

