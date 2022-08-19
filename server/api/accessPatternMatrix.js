const accessPatternBuilder = require('./accessPattern.class')

async function returnNewActionPatternMatrix () {
    const accessPatternMatrixContainer = []
    const newAccessPattern = await new accessPatternBuilder()
                            .discoverAccessPattern ('get', 'new', 'user',)
                            .setAccessPatternPriority('high')
                            .setAccessPatternDetails('read', 'return user profile after successful login', 'singleItem')
                            .setAccessDataQueryConfigs('username=username & password=password', 'na')
                            .buildNewAccessPattern();
    
    accessPatternMatrixContainer.push(newAccessPattern)
    console.log(newAccessPattern);
    // console.log(accessPatternMatrixContainer);
    return accessPatternMatrixContainer
}     
// returnNewActionPatternMatrix ()
module.exports = returnNewActionPatternMatrix


// create user profile
// update user profile
// get user profile


// create a game
// update game profile
// get game details