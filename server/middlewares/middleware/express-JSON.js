const express = require("express");

// const userJSONParser = (app) => {
//     console.log('json');
//     app.use(express.json())
//     console.log('end of JSON');
// }

module.exports = function (app) {
    console.log('json');
    app.use(express.json())
    console.log('end of JSON');
}


