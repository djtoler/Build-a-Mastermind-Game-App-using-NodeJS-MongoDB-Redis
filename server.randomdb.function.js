const crypto = require("crypto");
const databases = require('./server/databases/database.connections')

const randomDatabaseImplementation = () => {
    let testingDatabases = false
    const randomDBArrayIndex = crypto.randomInt(3)
    if(!testingDatabases) {return databases[0]}
    return databases[randomDBArrayIndex]
}

module.exports = randomDatabaseImplementation