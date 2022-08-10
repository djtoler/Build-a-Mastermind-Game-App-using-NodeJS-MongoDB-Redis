const modules = require('../modules-index/module-index');

module.exports = function () {
    const mymods = []
    modules.forEach(module => {
        console.log(module);
        mymods.push(`const ${module} = require(./server/api/routes/${module})`);
    })
    return mymods
}