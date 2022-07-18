const axios = require("axios");
const redis = require("redis");
const fs = require('fs');
// import { correct_numbers, correct_locations} from "../functions/game-helper-functions";
const {game_modes, easy_mode, hard_mode, super_hard_mode, super_easy_mode} = require( "../functions/game-mode-functions");
// const {super_easy_mode} = require('../api/controllers/images')
let test;
function testGuess() {
  return Math.floor(Math.random() * 9999) + 1;
}

let random_number;
let random_number_string;
let random_number_conversion_array;
let guess_conversion_string;

const convert_random_number = (res, response) => {
  test = testGuess();
  random_number = Number(response.data.replace(/[\n]/gm, ""));
  random_number_conversion_array = Array.from(String(random_number));
  random_number_string = random_number.toString();
  return random_number, random_number_conversion_array
};

const convert_guess_number = () => {
  return guess_conversion_string = test.toString();
};

const get_random_number_from_api = async (response, res) => {
  let response_obj = {};
  await axios
    .get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
    .then((response) => {
      success = true;
      convert_random_number(res, response);
      Object.assign(response_obj, {success : true, random_number: random_number, test_guess: test})
      return success
        ? res.json(response_obj)
        : res.json({ error: "Cant get random number" });
    })
    .catch(function (error) {
      res.json({ error: "function error" });
      console.log(error);
    });
}

const get_and_evaluate_user_guess = (req, res) => {
  const {guess, mode} = req.body;
  let round_results = {};
  let correct_numbers_count_array = [];
  let correct_numbers_count = 0;
  let correct_locations_count = 0;
  let user_guessed_all_correct_numbers;


  const correct_guess_all_four = () => {
    return user_guessed_all_correct_numbers = guess == random_number_string ? true : false
  }  

  const correct_numbers = () => {
    let guess_digits_array = Array.from(guess);
    console.log((correct_numbers_count_array = guess_digits_array.filter(
      (comparison) => {
        return random_number_conversion_array.includes(comparison)
      }
    )));
    correct_numbers_count = correct_numbers_count_array.length
  }

  const correct_locations = () => {
    let i = 0;
    while (i < 4) {
      guess.toString().charAt(i) == random_number_string.charAt(i) ? correct_locations_count++ : 0
      i++;
    }
    console.log(correct_locations_count);
    return correct_locations_count;
  }

  correct_guess_all_four();
  correct_numbers();
  correct_locations();
  
  console.log(round_results = correct_numbers_count > 0 ? {correct_numbers_return: correct_numbers_count, correct_locations_return: correct_locations_count, guess_attempt_return: guess} : {correct_numbers_return: 0, correct_locations_return: 0, guess_attempt: guess})
  return res.json(
    user_guessed_all_correct_numbers
    ? 
    {guess_attempt_return: guess, all_four_correct: true} 
    : round_results = correct_numbers_count > 0 
    ? {correct_numbers_return: correct_numbers_count, correct_locations_return: correct_locations_count, guess_attempt_return: guess} 
    : {correct_numbers_return: 0, correct_locations_return: 0, guess_attempt: guess}
  )
};

const send_hint_data = async (req, res,) => {
  const {current_game_mode, guess} = req.body;
  if (current_game_mode === null || undefined) return;
  console.log("currentgm: " + current_game_mode);
  console.log("guess: " + guess);
  console.log(req.body);
  let hint_evaluation;

  if (game_modes.a == current_game_mode) {hint_evaluation = easy_mode(random_number, guess)}
    console.log(hint_evaluation);

  if (game_modes.c == current_game_mode) {hint_evaluation = hard_mode(random_number, 3)}
    console.log(hint_evaluation);

  if (game_modes.d == current_game_mode) {hint_evaluation = super_hard_mode(random_number)}
    console.log(hint_evaluation);

  if (game_modes.b == current_game_mode) {
    let client = redis.createClient();
    client.connect();
    client.on("connect", function () {
      console.log("Connected!");
    });
    let easy_hint_response = {};
    const key = "hint_data";
    const hint_data_obj = await client.get(key)
    console.log(typeof hint_data_obj);
    console.log(hint_data_obj.digit);
    let parsedHintObj = JSON.parse(hint_data_obj);
    // console.log(parse);
    console.log(typeof(parsedHintObj));
    // console.log(parsedHintObj.image);
      //   fs.writeFile('output2.txt', parse, (err) => {
      // if (err) throw err;
      // })
    let b64string = parsedHintObj.image;
    console.log(typeof(b64string));
    // fs.writeFile('output1.txt', cole, (err) => {
    //   if (err) throw err;
    //   })
    // let hint_image = String.fromCharCode(parse.image.data);
    let hint_image_tag = `data:image/jpeg;base64,${b64string}`;
    Object.assign(easy_hint_response, {
      game_mode: 'super_easy',
      digit_one: parsedHintObj.digit,
      cap: parsedHintObj.caption,
      img: hint_image_tag,
    });
    hint_evaluation = easy_hint_response;
  
  }
    console.log(hint_evaluation);
    console.log('from ggf');
    console.log(hint_evaluation);

  return res.json({current_game_mode_hints: hint_evaluation})
};


// const create_game = () => {}
// const update_game = () => {}
// const get_random_number_from_backup = () => {};

// const get_random_number = () => {
//   let success;
//   get_random_number_from_api();
//   !success ? get_random_number_from_backup() : {error:'error getting random number'}
// }

module.exports = {
  get_random_number_from_api,
  get_and_evaluate_user_guess,
  send_hint_data,
};
