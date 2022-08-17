const crypto = require("crypto");
const databases = require('../database.connections')

const runAppDBInRandomMode = {
    randomDatabaseGenerator: 
    async () => {
        const randomDBArrayIndex = crypto.randomInt(3)
        await runAppDBInRandomMode.setGlobalDatabaseVariable(randomDBArrayIndex)
        return databases[randomDBArrayIndex]
    },

    setGlobalDatabaseVariable: 
    async (randomDBArrayIndex) => {
        randomDBArrayIndex === 0 ? process.env.CURRENTDATABASE = "mongo" :
        randomDBArrayIndex === 1 ? process.env.CURRENTDATABASE = "mysql" :
        randomDBArrayIndex === 2 ? process.env.CURRENTDATABASE = "dynamo" : null
        console.log(process.env.CURRENTDATABASE, 'from settings.random');
        const currentdatabase = process.env.CURRENTDATABASE
        return currentdatabase
    },
    
    runRandomDatabaseImplementation: 
    () => {
        const testingDatabases = false
        // if(!testingDatabases) {return databases[0]}
        const randomDB = runAppDBInRandomMode.randomDatabaseGenerator()
        return randomDB
    }
}

module.exports = runAppDBInRandomMode