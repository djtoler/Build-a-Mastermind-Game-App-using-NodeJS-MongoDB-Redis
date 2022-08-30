const {getRandomNumberFunction} = require("./event-emitters");

const runNewRandomNumberFromAPIEvent = async (randomNumber) => {
    getRandomNumberFunction.on("newRandomNumberFromAPI", async function () {
      return await randomNumber
    })
};

module.exports = runNewRandomNumberFromAPIEvent