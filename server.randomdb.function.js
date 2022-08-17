const crypto = require("crypto");
const dbSettings = require('./server/databases/settings/database.settings.function')

const deployDatabaseImplementation = async () => {
    const databaseDeployment = await dbSettings()
    return databaseDeployment
}

module.exports = deployDatabaseImplementation