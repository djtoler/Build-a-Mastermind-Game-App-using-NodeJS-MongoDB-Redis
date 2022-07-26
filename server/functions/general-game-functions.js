const axios = require("axios");
const redis = require("redis");
const fs = require('fs');
const {game_modes, easy_mode, hard_mode, super_hard_mode, return_random_index} = require( "../functions/game-mode-functions");
const Game = require("../models/game-model");
const User = require("../models/user-model");
// const game = await Game.create({ is_2_player, random_number, game_mode, rounds_played, game_won, users });
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
      // const game = await Game.create({ is_2_player, random_number, game_mode, rounds_played, game_won, users });
      // game.update_random_number(random_number)
      // await game.save()
      // sewnd game id to client, store in session, access on later requests
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

const get_and_evaluate_user_guess = async (req, res) => {
  const {guess, current_game_id, current_mode, current_random_number, passUserData} = req.body;

  // console.log('done 4 the daaaaaaaaaaayyyyyyyyy, sike');
  // console.log(req.body);
  // console.log(current_game_id);
  // console.log('done 4 the daaaaaaaaaaayyyyyyyyy, sike');


  let new_current_game = JSON.parse(current_game_id)
  let new_current_mode = current_mode


  console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN: ---->");
  // console.log(current_random_number);
  let new_crn = Number(current_random_number)
  console.log(new_crn);
  console.log(random_number_string);
   console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN: ---->");
  
  // console.log(current_mode);
  // console.log(new_current_user._id);


// Because sessionstore data persists through window reloads, but the random number doesnt so each time a guess has to be evaluated, i reassign the games rn to the current rn. then i check the current random number aginst the generated random number
// . if they match, i know the user is still in the current game. If they dont match, I know the window has reloaded which
// means a new random number has been generated and I have to create a new game
  let current_game = await Game.findOne( {_id: new_current_game.game_id} );
  current_game.random_number = new_crn;
  current_game.save()
  console.log("currentGameAtIf");
  console.log(current_game);
  if (current_game.random_number != random_number_string) {
    console.log("IN  IF");
    let new_random_number = Number(random_number_string)
    console.log(random_number_string);
    console.log(current_game.random_number);
    console.log("need to create new game");
    console.log(passUserData);
    const current_user = JSON.parse(passUserData);
    const current_user_email = current_user.email;
    const current_user_id = current_user._id;
    const game_obj = {is_2_player:false, game_mode: current_mode, rounds_played: 0, game_won: false, user: current_user_id}
    const user = await User.findOne( {email: current_user_email} );
    current_game = await Game.create(game_obj);
    console.log("currentGameNew Create");
    console.log(current_game);
    await current_game.users.push(user);
    current_game.random_number = new_random_number
    await current_game.save();
    await user.games.push(current_game);
    await user.save();
    console.log("END OF IF");
    console.log(current_game);
  }

  current_game.rounds_played = current_game.rounds_played + 1
  // console.log("RIGHTAFTER: ---->");
  // console.log("cgrn");
  // console.log(current_game.random_number);
  // console.log("rn");
  // console.log(random_number_string);
  // console.log("rp");
  // console.log(current_game.rounds_played);


  
  current_game.game_mode = current_mode;

  
  // console.log("RIGHTAFTER: ---->");


  // console.log("POSTAFTER: ---->");

  // console.log("cgrn");
  // console.log(current_game.random_number);
  // console.log("rn");
  // console.log(random_number_string);
  // console.log("rp");
  // console.log(current_game.rounds_played);
  
  // console.log("POSTAFTER: ---->");


  // console.log(current_game);
  


  let round_results = {};
  let correct_numbers_count_array = [];
  let correct_numbers_count = 0;
  let correct_locations_count = 0;
  let user_guessed_all_correct_numbers;


  const correct_guess_all_four = async () => {
    user_guessed_all_correct_numbers = guess == random_number_string ? true : false
    if (user_guessed_all_correct_numbers) {
      current_game.game_won = true;
      current_game.total_points = 20000;
      current_game.total_correct_locations = 4;
      current_game.total_correct_numbers = 4;
      await current_game.save();
      return current_game
    }
    return user_guessed_all_correct_numbers
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
    // console.log(correct_locations_count);
    return correct_locations_count;
  }

  correct_guess_all_four();
  correct_numbers();
  correct_locations();
  console.log(round_results = correct_numbers_count > 0 ? {correct_numbers_return: correct_numbers_count, correct_locations_return: correct_locations_count, guess_attempt_return: guess} : {correct_numbers_return: 0, correct_locations_return: 0, guess_attempt: guess})
  // console.log(current_game.total_correct_numbers )

  // console.log("---->>>"); 
  // console.log(current_game.rounds_played); 
  // console.log("---->>>"); 

  async function game_schema_calculator (increment) {
    current_game.total_correct_locations = current_game.total_correct_locations + round_results.correct_locations_return
    current_game.total_correct_numbers = current_game.total_correct_numbers + round_results.correct_numbers_return
    if (correct_numbers_count > 0 || correct_locations_count > 0) {
      let cnp = correct_numbers_count * increment;
      let clp = correct_locations_count * increment;
      let new_tp = cnp + clp;
      current_game.total_points = current_game.total_points + new_tp;
      current_game.save();
    }

    // console.log(current_game.total_points);
    // console.log("--currentGame-->>>"); 
    // console.log(current_game); 
    return current_game.total_points
  }

  switch (current_game.game_mode) {
    case 'super_easy':
      game_schema_calculator(10);
      break;
    case 'easy':
      game_schema_calculator(20);
      break;
    case 'hard':
      game_schema_calculator(100);
      break;
    case 'super_hard':
      game_schema_calculator(200);
      break;
    default:
      game_schema_calculator(50);
      break;
  }

  // console.log(current_game.total_correct_numbers )
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
  console.log(req.body);

  if (current_game_mode === null || undefined) return;
  // const game = await Game.findById()
  // game.update_game_level()
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
    await client.connect();
    client.on("connect", function () {
      console.log("Connected!");
    });
    function getRandom(index) {
      let r = Math.floor(Math.random() * index) + 1;
      return r
  }
    let keys = [];
    let processed_data = [];
    let i = 0;
    while (i < 4) {
      let random_obj = getRandom(3)
      keys[i] = `hint_data_${random_number_string.charAt(i)}${random_obj}`  
      i++;
    }
    const hint_key1 = await client.get(keys[0]);
    const hint_key2 = await client.get(keys[1]);
    const hint_key3 = await client.get(keys[2]);
    const hint_key4 = await client.get(keys[3]);
    let processed_array = [hint_key1, hint_key2, hint_key3, hint_key4];


    for (let index = 0; index < processed_array.length; index++) {
      let prep  = new Object;
      let parsedHintObj = JSON.parse(processed_array[index]);
      // console.log("----------------------------PARSED1---------------------------");
      // console.log(parsedHintObj);
      // console.log("----------------------------PARSED2---------------------------");
      let b64string = parsedHintObj.image;
      // console.log(typeof(b64string));
      // console.log(parsedHintObj);
      // console.log('---------------------------------------------------------');
      // console.log(hint);

      let hint_image_tag = `data:image/jpeg;base64,${b64string}`;
      prep = {cap: parsedHintObj.caption, img: hint_image_tag}
      processed_data.push(prep)
    }
    console.log(processed_data.length);
    hint_evaluation = {game_mode: 'super_easy', hint: processed_data}
    console.log(hint_evaluation);
  }
  return res.json({current_game_mode_hints: hint_evaluation})
}



const create_a_new_game = async (req, res, current_game_mode, user_guessed_all_correct_numbers) => {
  console.log('in create game route');
  const {passUserData} = req.body
  console.log(passUserData);
  const current_user = JSON.parse(passUserData);
  const current_user_email = current_user.email;
  const current_user_id = current_user._id;
  const game_obj = {is_2_player:false, game_mode: current_game_mode, rounds_played: 0, game_won: false, user: current_user_id}
  const user = await User.findOne( {email: current_user_email} );
  const game = await Game.create(game_obj);
  await game.users.push(user);
  await game.save();
  await user.games.push(game);
  await user.save();
  

  // await game.get_is_2_player();
  // await game.update_game_level(current_game_mode);
  // await game.set_rounds_played();
  // await game.get_game_won(user_guessed_all_correct_numbers);
 
  // console.log(game._id);
  return res.json({game_id :game._id})

}






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
  create_a_new_game
};
