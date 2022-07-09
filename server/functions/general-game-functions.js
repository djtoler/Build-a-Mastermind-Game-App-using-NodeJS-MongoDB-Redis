const axios = require('axios');

// test variables
let test;
let number;
function testGuess () {
  return Math.floor(Math.random() * 9999) + 1;
}

const easyHints = () => {
  let hi_num = 9999
  let low_num = 0000
  const lower = () => { hi_num = test; return `lower , secret number is between ${low_num}  to ${test - 1}`}
  const higher = () => { low_num = test; return `higher, secret number is between ${test + 1} to ${hi_num}`}
  let guess_evaluation = number < test  ? lower() :  higher()

  console.log("return: " + guess_evaluation, "low_num: " + low_num, "hi_num: " + hi_num);
}

const convertRandomNumber = (res, response) => {
  test = testGuess();
  number = Number(response.data.replace(/[\n]/gm, ''));
}

const getRandomNumber = async (response, res) => 
  await axios.get('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
    .then((response) => {
      convertRandomNumber(res, response);
      easyHints();
      return number ? res.json({random_number: number, test_guess: test}) : res.json({error: 'Cant get random number'})
    })
    .catch(function (error) {
      res.json({error: 'function error'})
      console.log(error);
    });









module.exports = {
    getRandomNumber
}