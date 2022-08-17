const databases = require('../database.connections')


const runAppInDefaultMode = {

    getDefaultDatabase : () => {return databases[0]},

    runDefaultDatabaseImplementation: async () => {
        console.log(runAppInDefaultMode.getDefaultDatabase(), 'FROM DEFAULT SETTINGS');
        const defaultDB = await runAppInDefaultMode.getDefaultDatabase()
        return defaultDB
    } 
}

module.exports = runAppInDefaultMode