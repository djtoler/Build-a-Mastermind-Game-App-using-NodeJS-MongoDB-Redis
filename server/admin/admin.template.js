class Admin {
    constructor(id, totalPointsByMode, totalCountsByMode, totalGamesPlayedByMode, avatarTotals, generalTotals, dummyUsers, weeklyTracker, dailyNewUsers, weeklyNewUsers, performanceTracking, performanceTests) {
        this.id =                       id,
        this.totalPointsByMode =        totalPointsByMode, 
        this.totalCountsByMode =        totalCountsByMode, 
        this.totalGamesPlayedByMode =   totalGamesPlayedByMode, 
        this.avatarTotals =             avatarTotals, 
        this.generalTotals =            generalTotals,
        this.dummyUsers =               dummyUsers,
        this.weeklyTracker =            weeklyTracker,
        this.dailyNewUsers =            dailyNewUsers,
        this.weeklyNewUsers =           weeklyNewUsers,
        this.performanceTracking =      performanceTracking,
        this.performanceTests =         performanceTests
    }
}

class AdminBuilder {
    setID (id) {
        this.id = id
        return this
    }
    trackPointsByMode (  
        theCurrentGameMode,      
        locationPoints_superEasy,
        locationPoints_easy,
        locationPoints_hard,
        locationPoints_superHard,
        locationPoints_default,
        digitPoints_superEasy,
        digitPoints_easy,
        digitPoints_hard,
        digitPoints_superHard,
        digitPoints_default,
        ) {
        this.theCurrentGameMode  =          theCurrentGameMode, 
        this.locationPoints_superEasy =     locationPoints_superEasy
        this.locationPoints_easy =          locationPoints_easy
        this.locationPoints_hard =          locationPoints_hard
        this.locationPoints_superHard =     locationPoints_superHard
        this.locationPoints_default =       locationPoints_default
        this.digitPoints_superEasy =        digitPoints_superEasy
        this.digitPoints_easy =             digitPoints_easy
        this.digitPoints_hard =             digitPoints_hard
        this.digitPoints_superHard =        digitPoints_superHard
        this.digitPoints_default =          digitPoints_default
        return this
    }
    trackCountsByMode (
        locationCount_superEasy,
        locationCount_easy,
        locationCount_superHard,
        locationCount_hard,
        locationCount_default,
        digitCount_superEasy,
        digitCount_easy,
        digitCount_superHard,
        digitCount_hard,
        digitCount_default,
        ) {
        this.locationCount_superEasy =  locationCount_superEasy
        this.locationCount_easy =       locationCount_easy
        this.locationCount_superHard =  locationCount_superHard
        this.locationCount_hard =       locationCount_hard
        this.locationCount_default =    locationCount_default
        this.digitCount_superEasy =     digitCount_superEasy
        this.digitCount_easy =          digitCount_easy
        this.digitCount_superHard =     digitCount_superHard
        this.digitCount_hard =          digitCount_hard
        this.digitCount_default =       digitCount_default
        return this
    }
    trackGamesPlayedByMode(superEasy, easy, superHard, hard, _default) {
        this.superEasy =    superEasy
        this.easy =         easy
        this.superHard =    superHard
        this.hard =         hard
        this._default =     _default
        return this
    }
    trackGeneralTotals(totalNumberOfUsers, totalGamesPlayed, totalRoundsPlayed, totalCurrentPoints, totalGamesWon) {
        this.totalNumberOfUsers =   totalNumberOfUsers
        this.totalGamesPlayed =     totalGamesPlayed
        this.totalRoundsPlayed =    totalRoundsPlayed
        this.totalCurrentPoints =   totalCurrentPoints
        this.totalGamesWon =        totalGamesWon
        return this
    }
    trackAvatarAverages(avatarAvgPpg, avatarAvgGw, avatarAvgPe, avatarAvgGpc) {
        this.avatarAvgPpg = avatarAvgPpg
        this.avatarAvgGw =  avatarAvgGw
        this.avatarAvgPe =  avatarAvgPe
        this.avatarAvgGpc = avatarAvgGpc
        return this
    }
    setDummyUsers(dummyUsers) {
        this.dummyUsers = dummyUsers
        return this
    }
    setWeeklyTracker(weeklyTracker) {
        this.weeklyTracker = weeklyTracker
        return this
    }
    setDailyNewUsers(newUsersToday, date) {
        this.newUsersToday = newUsersToday
        this.date = date
        return this
    }
    setWeeklyNewUsers(newUsersThisWeek, date) {
        this.newUsersThisWeek = newUsersThisWeek
        this.date = date
        return this
    }
    trackRegistrationTimer(time, date) {
        this.time = time 
        this.date = date
        return this
    }
    trackLoginTimer(time, date) {
        this.time = time 
        this.date = date
        return this
    }
    trackLoginCacheTimer(time, date) {
        this.time = time 
        this.date = date
        return this
    }
    trackPullRandomNumberTimer(time, date) {
        this.time = time 
        this.date = date
        return this
    }
    trackEvaluateGuessTimer(time, date) {
        this.time = time 
        this.date = date
        return this
    }
    trackRequestsPerSecond(requestAvg , requestMean, requestMin, requestMax) {
        this.requestAvg  = requestAvg 
        this.requestMean = requestMean
        this.requestMin  = requestMin 
        this.requestMax  = requestMax
        return this
    }
    trackThroughputData(throughputAvg , throughputMean, throughputMin, throughputMax) {
        this.throughputAvg  = throughputAvg 
        this.throughputMean = throughputMean
        this.throughputMin  = throughputMin 
        this.throughputMax  = throughputMax
        return this
    }
    trackLatencyData(latencyAvg , latencyMean, latencyMin, latencyMax) {
        this.latencyAvg  = latencyAvg 
        this.latencyMean = latencyMean
        this.latencyMin  = latencyMin 
        this.latencyMax  = latencyMax
        return this
    }
    trackEvaluateGuessTests(
        date,
        nameOfFunctionBeingTested,
        numberOfThreads,
        numberOfCores,
        numberOfServers,
        numberOfErrors,
        code,
        count, 
        number_of_timeouts,
        instanceDuration,
        ){
        this.date =                 date
        this.nameOfFunctionBeingTested =            nameOfFunctionBeingTested
        this.numberOfThreads =    numberOfThreads
        this.numberOfCores =      numberOfCores
        this.numberOfServers =    numberOfServers
        this.numberOfErrors =     numberOfErrors
        this.code =                 code
        this.count =                count 
        this.number_of_timeouts =   number_of_timeouts
        this.instanceDuration =     instanceDuration
        return this
    }
    
    buildAdminObject() {
        return new Admin(
            this.id,
            [
                {superEasy: {
                    locationPoints_superEasy:   this.locationPoints_superEasy,
                    digitPoints_superEasy:      this.digitPoints_superEasy
                }},

                {easy: {
                    locationPoints_easy:    this.locationPoints_easy,
                    digitPoints_easy:       this.digitPoints_easy,
                }},

                {hard: {
                    locationPoints_hard:    this.locationPoints_hard,
                    digitPoints_hard:       this.digitPoints_hard
                }}, 

                {superHard: {
                    locationPoints_superHard:   this.locationPoints_superHard,
                    digitPoints_superHard:      this.digitPoints_superHard,
                }},  

                {default: {
                    locationPoints_default: this.locationPoints_default,
                    digitPoints_default:    this.digitPoints_default,
                }},       
            ],
            [
                {superEasy: {
                    locationCount_superEasy: this.locationCount_superEasy,
                    digitCount_superEasy:    this.digitCount_superEasy,
                }},

                {easy: {
                    locationCount_easy: this.locationCount_easy,
                    digitCount_easy:    this.digitCount_easy,
                }},

                {hard: {
                    locationCount_hard: this.locationCount_hard,
                    digitCount_hard:    this.digitCount_hard
                }}, 

                {superHard: {
                    locationCount_superHard:   this.locationCount_superHard,
                    digitCount_superHard:      this.digitCount_superHard,
                }},  

                {default: {
                    locationCount_default:  this.locationCount_default,
                    digitCount_default:     this.digitCount_default,
                }}, 

            ],
            {
                superEasy:  this.superEasy,
                easy:       this.easy,
                superHard:  this.superHard,
                hard:       this.hard,
                _default:   this._default
            },
            {
                avatarAvgPpg:       this.avatarAvgPpg,
                avatarAvgGw:        this.avatarAvgGw,
                avatarAvgPe :       this.avatarAvgPe ,
                avatarAvgGpc:       this.avatarAvgGpc,
                totalNumberOfUsers: this.totalNumberOfUsers , 
                totalGamesPlayed:   this.totalGamesPlayed ,
                totalRoundsPlayed:  this.totalRoundsPlayed,
                totalCurrentPoints: this.totalCurrentPoints
            },
            {
                totalNumberOfUsers: this.totalNumberOfUsers , 
                totalGamesWon:      this.totalGamesWon,
                totalGamesPlayed:   this.totalGamesPlayed ,
                totalRoundsPlayed:  this.totalRoundsPlayed,
                totalCurrentPoints: this.totalCurrentPoints
            },
            [{
                dummyUsers: this.dummyUsers
            }],
            this.weeklyTracker,
            {
                newUsersToday:  this.newUsersToday,
                date:           this.date
            },
            {
                newUsersThisWeek:   this.newUsersThisWeek,
                date:               this.date
            },
            [            
                [{trackRegistrationTimer:       {time: this.time, date: this.date}}],
                [{trackLoginTimer:              {time: this.time, date: this.date}}],
                [{trackLoginCacheTimer:         {time: this.time, date: this.date}}],
                [{trackPullRandomNumberTimer:   {time: this.time, date: this.date}}],
                [{trackEvaluateGuessTimer:      {time: this.time, date: this.date}}]
            ],
            [{
                date: this.date,
                nameOfFunctionBeingTested: this.nameOfFunctionBeingTested,
                dataFromTheFunctionTest: {
                    instanceDuration: this.instanceDuration,
                    trackRequestsPerSecond: {
                        avg:  this.requestAvg ,
                        mean: this.requestMean, 
                        min:  this.requestMin ,
                        max:  this.requestMax ,
                    },
                    trackThroughputData: {
                        avg:  this.throughputAvg ,
                        mean: this.throughputMean, 
                        min:  this.throughputMin ,
                        max:  this.throughputMax 
                    },
                    trackLatencyData: {
                        avg:  this.latencyAvg ,  
                        mean: this.latencyMean,   
                        min:  this.latencyMin ,
                        max:  this.latencyMax 
                    },
                    numberOfThreads:  this.numberOfThreads,
                    numberOfCores:    this.numberOfCores,
                    numberOfServers:  this.numberOfServers,
                    numberOfErrors:   this.numberOfErrors,
                    non200StatusCode: {
                        code:   this.code,
                        count:  this.count,
                    },
                },
                number_of_timeouts: this.number_of_timeouts
            }]
        )
    }
}
const adminDateDefault = new Date(Date.now()).toString()

async function returnNewAdmin() {
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
                            .trackEvaluateGuessTests(adminDateDefault, '', 0, 0, 0, 0, 0, 0, 0, 0)
                            .buildAdminObject();
    
    // console.log('adminObject: ==>', adminObject);
    return adminObject
}

// returnNewAdmin()

module.exports = AdminBuilder ;
