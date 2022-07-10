const axios = require("axios");
let test;
function testGuess() {
  return Math.floor(Math.random() * 9999) + 1;
}

let random_number;
let random_number_conversion_array;
let guess_conversion_string;

const convert_random_number = (res, response) => {
  test = testGuess();
  random_number = Number(response.data.replace(/[\n]/gm, ""));
  random_number_conversion_array = Array.from(String(random_number));
  return random_number, random_number_conversion_array
};

const convert_guess_number = () => {
  return guess_conversion_string = test.toString();
};

const get_random_number_from_api = async (response, res) =>
  await axios
    .get(
      "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
    )
    .then((response) => {
      convert_random_number(res, response);
      return random_number
        ? res.json({ random_number: random_number, test_guess: test })
        : res.json({ error: "Cant get random number" });
    })
    .catch(function (error) {
      res.json({ error: "function error" });
      console.log(error);
    });

const user_input_response = (count=0) => {
   // const {guess} = req.body;
  count++
  convert_guess_number();
  convert_random_number();
  get_and_evaluate_user_guess();
  switch (count) {
    case count < 10:
      round_results.guess_attempt_count = count;
      break;
    case count > 10:
      round_results.guess_attempt_count = 'Game Over';
    default:
      break;
  }
  return round_results;
}

const create_game = () => {}
const update_game = () => {}
const get_random_number_from_backup = () => {}
const get_random_number = () => {}

const get_and_evaluate_user_guess = () => {
  let round_results = {};
  let correct_numbers_count_array = [];
  let correct_numbers_count = 0;
  let correct_locations_count = 0;

  const correct_numbers = () => {
    let guess_digits_array = Array.from(test);
    return (correct_numbers_count_array = guess_digits_array.filter(
      (comparison) => {
        return random_number_conversion_array.includes(comparison)
          ? (correct_numbers_count = correct_numbers_count_array.length)
          : correct_numbers_count;
      }
    ));
  }

  const correct_locations = () => {
    let i = 0;
    while (i < 4) {
      i++;
      correct_locations_count = test === random_number_comparison_conversion.charAt(i - 1) ? correct_locations_count++ : 0
    }
    return correct_locations_count;
  }
  correct_numbers();
  correct_locations();
  return round_results = correct_numbers_count > 1 ? {correct_numbers_return: correct_numbers_count, correct_locations_return: correct_locations_count} : {};
};



module.exports = {
  get_random_number_frm_api,
  user_input_response
};
