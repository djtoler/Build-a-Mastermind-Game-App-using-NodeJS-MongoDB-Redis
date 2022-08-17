const runAppDBInRandomMode = require('./database.settings.random')
const runAppInDefaultMode = require('./database.settings.default')

const databaseSettings = {
    isDefaultMode: true,
    isRandomMode: false,
    isPercisionMode: false,

    dbDefaultMode: async function () {
        console.log('default mode');
        return runAppInDefaultMode.runDefaultDatabaseImplementation()
    },
    dbRandomMode: async function () {
        console.log('random mode');
        runAppDBInRandomMode.randomDatabaseGenerator()
        runAppDBInRandomMode.setGlobalDatabaseVariable()
        return runAppDBInRandomMode.runRandomDatabaseImplementation()
    },
    dbPercisionMode: function () {
        console.log('percision mode');
    }
}

module.exports = databaseSettings




