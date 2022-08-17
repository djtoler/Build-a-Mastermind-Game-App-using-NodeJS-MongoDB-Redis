const databaseSettings = require('./database.settings')

async function dbSettings() {
    if (databaseSettings.isDefaultMode === true) {
        const returnDefaultDBSettings = await databaseSettings.dbDefaultMode()
        return returnDefaultDBSettings()
    }
    if (databaseSettings.isPercisionMode === true) {databaseSettings.dbPercisionMode()}
    if (databaseSettings.isRandomMode === true) {
        const returnRandomDBSettings = await databaseSettings.dbRandomMode()
        return returnRandomDBSettings()
    }
}
module.exports = dbSettings