const currentDatabaseInUse = async () => {
    const useDefaultDatabase = await require('../mongodb/mongodb')
    // const useRandomDatabase = await require(`../../../${process.env.CURRENTDATABASE}`) 
    // if (useRandomDatabase === undefined) {
    //     return useDefaultDatabase
    // }
    // console.log(typeof useRandomDatabase, 'TYPPPPEEEOOOFFFFF DB');
    // return useRandomDatabase
    return useDefaultDatabase
}

module.exports = currentDatabaseInUse
