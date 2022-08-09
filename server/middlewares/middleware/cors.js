const cors = require("cors");

// const useCors = (app) => {
//     console.log('cors');
//     app.use(cors());
// }

module.exports = function (app) {
    console.log('cors');
    app.use(cors());
    console.log('end of cors');
}
