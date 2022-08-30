const axios = require("axios");
const convertRandomNumber = require("./game.components.convertRandomNumber");
const { RANDOM_NUMBER_API_RELIABILITY_MODE } = require("./game.helpers");
const { returnRandomNumber } = require("./game.helpers");

const runGetRandomNumber = async (res) => {
  await axios
    .get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")

    .then(async (apiResponse) => {
      return await apiResponse.status != 200 || apiResponse.data.length > 20
        ? res.json(RANDOM_NUMBER_API_RELIABILITY_MODE())
        : res.json(await returnRandomNumber(apiResponse))
    })

    .catch(function (error) {
      if (error.response === undefined || error.response.status != 200) 
      {res.json(RANDOM_NUMBER_API_RELIABILITY_MODE())}
    });
};

module.exports = runGetRandomNumber;
