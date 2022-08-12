const databaseToggleFeature = (database) => {
    if ( database.length < 2  || typeof database != 'string' ) {
        console.log('is not array or func')
        let isArray = false
        return isArray
    }
}

module.exports = databaseToggleFeature