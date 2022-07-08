// test variables
function testGuess () {
  return Math.floor(Math.random() * 9999) + 1;
}

const axios = require('axios');

const convertThenReturnRandomNumber = (res, response) => {
  let test = testGuess().toString();
  let number = response.data.replace(/[\n]/gm, '').toString();
  return number ? res.json({random_number: number, test_guess: test}) : res.json({error: 'Cant get random number'})
}

const getRandomNumber = async (response, res) => 
  await axios.get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
    .then((response) => {
    convertThenReturnRandomNumber(res, response);
    })
    .catch(function (error) {
      res.json({error: 'function error'})
      console.log(error);
    });









module.exports = {
    getRandomNumber
}