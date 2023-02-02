const axios = require("axios");
const convertRandomNumber = require("./game.features.convertRandomNumber");
const { RANDOM_NUMBER_API_RELIABILITY_MODE } = require("../game-helpers/game.helpers.functions");
const { returnRandomNumber } = require("../game-helpers/game.helpers.functions");

const runGetRandomNumber = async (res) => {
  await axios
    .get( "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
    .then(async (apiResponse) => {
      console.log('rn from random.org1');
      return (await apiResponse.status) != 200 || apiResponse.data.length > 20
        ? res.json(RANDOM_NUMBER_API_RELIABILITY_MODE()) && console.log('rn from reliability')
        : res.json(await returnRandomNumber(apiResponse)) && console.log('rn from random.org2');
    })

    .catch(function (error) {
      if (error.response === undefined || error.response.status != 200) {
        console.log('rn from reliability');
        res.json(RANDOM_NUMBER_API_RELIABILITY_MODE());
      }
    });
};

module.exports = runGetRandomNumber;
