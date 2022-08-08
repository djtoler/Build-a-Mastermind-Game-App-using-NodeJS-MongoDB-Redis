const axios = require("axios");
const redis = require("redis");
const fs = require("fs");
const {v4 : uuidv4} = require('uuid')
const newId = uuidv4()
const {gameobj} = require("../models/model-helpers")
const {game_modes, easy_mode, hard_mode, super_hard_mode, return_random_index} = require("../functions/game-mode-functions");
const Game = require("../models/game-model");
const User = require("../models/user-model");
const Admin = require("../models/admin-model");
const {start, end, tte} = require('../functions/admin-test-functions')
const { performance } = require('perf_hooks');
const util = require('util');
const debug = util.debuglog('performance');
let test;
let dummy_users = [];

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
  return random_number, random_number_conversion_array;
};

const convert_guess_number = () => {
  return (guess_conversion_string = test.toString());
};



// ---------------------------------------------------FUNCTION----------------------------
// --------------------------------GET A RANDOM NUMBER FROM THE RANDOM.ORG API-------------------------------

const get_random_number_from_api = async (response, res) => {
  start;
  let response_obj = {};
  await axios
    .get(
      "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
    )
    .then((response) => {
      success = true;
      convert_random_number(res, response);
      Object.assign(response_obj, {
        success: true,
        random_number: random_number,
        test_guess: test,
      });
      return success
        ? res.json(response_obj)
        : res.json({ error: "Cant get random number" });
    })
    .catch(function (error) {
      res.json({ error: "function error" });
      console.log(error);
    });
    end;
    tte;
    console.log('treg:' + tte);
};


// ------------------------------------------FUNCTION---------------------------------
// ----------------------------RECIEVE A USERS GUESS & EVALUATE IT-------------------------------

const get_and_evaluate_user_guess = async (req, res) => {
// ------------------------------------------------------------------------------------
// Destructure request body & set variables
// ------------------------------------------------------------------------------------
  performance.mark('begining')
  const {guess, current_game_id, current_mode, current_random_number, passUserData} = req.body;
  // console.log(req.body);

  let new_current_game = JSON.parse(current_game_id);
  let new_crn = Number(current_random_number);
  let round_results = {};
  let correct_numbers_count_array = [];
  let correct_numbers_count = 0;
  let correct_locations_count = 0;
  let user_guessed_all_correct_numbers;

  // ------------------------------------------------------------------------------------
  // Because sessionstore data persists through window reloads, but the random number 
  // doesnt, each time a guess is submitted, i reassign the current Games random 
  // number to the current comng in from the request body. then i check the current 
  // random number aginst the generated random number. If they match, i know the 
  // user is still in the current game. If they dont match, I know the window has 
  // reloaded which means a new random number has been generated and I have to 
  // create a new game
  // ------------------------------------------------------------------------------------
  let current_game = await Game.findOne({ _id: new_current_game.game_id });
  current_game.random_number = new_crn;
  await current_game.save();

  if (current_game.random_number != random_number_string) {
    let new_random_number = Number(random_number_string); //block during load tests
    const current_user = JSON.parse(passUserData);
    const current_user_email = current_user.email;
    const current_user_id = current_user._id;
    const user = await User.findOne({ email: current_user_email });
    current_game = await Game.create(gameobj);
    await current_game.users.push(user);
    current_game.random_number = new_random_number;
    // current_game.random_number = 1487;
    current_game.save();
    await user.games.push(current_game);
    await user.save();
  }
// ------------------------------------------------------------------------------------
// Check if the users has guessed all 4 numbers correct, save game and return if so
// ------------------------------------------------------------------------------------
  const correct_guess_all_four = async () => {
    user_guessed_all_correct_numbers =
      guess == random_number_string ? true : false;
    if (user_guessed_all_correct_numbers) {
      const user = await User.findOne({ email: current_user_email });
      user.alltime_games_won = user.alltime_games_won + 1;
      user.save();
      current_game.game_won = true;
      current_game.total_points = 20000;
      current_game.total_correct_locations = 4;
      current_game.total_correct_numbers = 4;
      current_game.save();
      return current_game;
    }
    return user_guessed_all_correct_numbers;
  };
// ------------------------------------------------------------------------------------
// Count how many numbers the user got correct & return that value
// ------------------------------------------------------------------------------------
  const correct_numbers = () => {
    let guess_digits_array = Array.from(guess);
    console.log(
      (correct_numbers_count_array = guess_digits_array.filter((comparison) => {
        return random_number_conversion_array.includes(comparison);
      }))
    );
    correct_numbers_count = correct_numbers_count_array.length;
  };
// ------------------------------------------------------------------------------------
// Count how many locations the user got correct & return that value
// ------------------------------------------------------------------------------------
  const correct_locations = () => {
    let i = 0;
    while (i < 4) {
      guess.toString().charAt(i) == random_number_string.charAt(i)
        ? correct_locations_count++
        : 0;
      i++;
    }
    return correct_locations_count;
  };
// ------------------------------------------------------------------------------------
// Call all 3 functions to evalue the users guess
// ------------------------------------------------------------------------------------
  correct_guess_all_four();
  correct_numbers();
  correct_locations();
// ------------------------------------------------------------------------------------
// Set the round_results variable to a condition. If the number of correct numbers is
// more than 0, return an object with the values for how many correct numbers, 
// locations & what number they guessed... or return zeros
// ------------------------------------------------------------------------------------
  console.log(
    (round_results =
      correct_numbers_count > 0
        ? {
            correct_numbers_return: correct_numbers_count,
            correct_locations_return: correct_locations_count,
            guess_attempt_return: guess,
          }
        : {
            correct_numbers_return: 0,
            correct_locations_return: 0,
            guess_attempt: guess,
          })
  );

// ------------------------------------------------------------------------------------
// Update the current games schema values set buy the 3 evaluation functions above. 
// The param "increment" is determind by which mode the user played the game in.
// ------------------------------------------------------------------------------------
  function game_update_calculator(increment) {
    current_game.rounds_played = current_game.rounds_played + 1;
    current_game.game_mode = current_mode;
    current_game.total_correct_locations = current_game.total_correct_locations + round_results.correct_locations_return;
    current_game.total_correct_numbers = current_game.total_correct_numbers + round_results.correct_numbers_return;
    if (correct_numbers_count > 0 || correct_locations_count > 0) {
      let cnp = correct_numbers_count * increment;
      let clp = correct_locations_count * increment;
      let new_tp = cnp + clp;
      current_game.total_points = current_game.total_points + new_tp;
      // current_game.save();
    }
    return current_game.total_points;
  }
// ------------------------------------------------------------------------------------
// Call game_update_calculator() in a switch case determined by with mode the user
// played the game in.
// ------------------------------------------------------------------------------------
  switch (current_game.game_mode) {
    case "super_easy":
      game_update_calculator(10);
      break;
    case "easy":
      game_update_calculator(20);
      break;
    case "hard":
      game_update_calculator(100);
      break;
    case "super_hard":
      game_update_calculator(200);
      break;
    default:
      game_update_calculator(50);
      break;
  }
// ------------------------------------------------------------------------------------
// Update the current users stats based on the values of the current game
// ------------------------------------------------------------------------------------
  // async function user_schema_calculator(params) {
  //   const user = await User.findOne({ email: current_user_email });
  //   user.alltime_games_played = user.alltime_games_played + 1;
  //   user.alltime_points_earned =
  //     user.alltime_points_earned + current_game.total_points;
  //   user.avg_ppg = user.alltime_points_earned / user.alltime_games_played;
  // }
// ------------------------------------------------------------------------------------
// Create dummy users for testing
// ------------------------------------------------------------------------------------
  // async function create_dummy_users() {
  //   const users = await User.find({});
  //   let i = 0;
    // while (i < 2800) {
    //   const user = await User.create({ 
    //       name: `name--${newId}dd`,
    //       email: `mail--${newId}dd${i}@mail.com`,
    //       password: `pw--${newId}dd${testGuess()}`,
    //       picture: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" 
    //   })
    //   user.save();
    //   i++;
    //   dummy_users.push(user)
    // }
  //     let data = JSON.stringify(users)
  //     fs.writeFile('dummydata.json', data, function(err) {
  //         if(err) {
  //             return console.log(err);
  //         }
  //         console.log("The file was saved!");
  //     });
  //   console.log(users.length);
  //   console.log(users[4058]);
  //   return users;
  // }
  // create_dummy_users();


// ------------------------------------------------------------------------------------
// Update dummy users values with psudeo data for testing
// ------------------------------------------------------------------------------------
  // let gpcount;
  // let gwcount;
  // let pecount;
  // let ppgcount;
  // async function weight_calc() {
  //   ppgcount = 0;
  //   gpcount = 0;
  //   gwcount = 0;
  //   pecount = 0;
  //   let gpw = 100;
  //   let gww = 8;
  //   let pew = 6;
  //   let ppgw = 5;
  //   const users = await User.find({});
  //   console.log(users.length);
  //   users.forEach((user) => {
  //     console.log(user.email);
  //     user.alltime_games_played = Math.floor(Math.random() * 10) + 1
  //     user.alltime_games_won = Math.floor(Math.random() * 5) + 1
  //     user.alltime_points_earned = Math.floor(Math.random() * 2000) + 1
  //     user.avg_ppg = user.alltime_points_earned / user.alltime_games_played
  //     user.avg_ppg = user.avg_ppg.toFixed(1);
  //     user.gp_ranking = user.alltime_games_played * gpw
  //     user.gw_ranking = user.alltime_games_won * gww
  //     user.pe_ranking = user.alltime_points_earned * pew
  //     user.ppg_ranking = user.avg_ppg * ppgw
  //     user.save();
  //     gpcount = gpcount + user.alltime_games_played;
  //     gwcount = gwcount + user.alltime_games_won;
  //     pecount = pecount + user.alltime_points_earned;
  //     ppgcount = ppgcount + user.avg_ppg;
  //   });
  //   console.log(ppgcount);
  //   console.log(gwcount);
  //   console.log(pecount);
  //   console.log(gpcount);
  //   console.log("-------->>>");
  //   // gpw is about 55x less than ppgw so i doublee to make it twice as importnt
  //   let avatar_avg_ppg = ppgcount / users.length;
  //   let avatar_avg_gw = gwcount / users.length;
  //   let avatar_avg_pe = pecount / users.length;
  //   let avatar_avg_gpc = gpcount / users.length;
  //   avatar_avg_gpc = avatar_avg_gpc.toFixed(0);
  //   avatar_avg_pe = avatar_avg_pe.toFixed(1);
  //   avatar_avg_gw = avatar_avg_gw.toFixed(1);
  //   avatar_avg_ppg = avatar_avg_ppg.toFixed(1);
  //   console.log(avatar_avg_ppg);
  //   console.log(avatar_avg_gw);
  //   console.log(avatar_avg_pe);
  //   console.log(avatar_avg_gpc);
  //   console.log("-------->>>");
  //   let admin = await Admin.findOne({id:'main'})
  //   console.log(admin);
  //   console.log("++++++++++++++++++++++++++++");
  //   let total_number_users = users.length;
  //   admin.avatar_avg_ppg = avatar_avg_ppg;
  //   admin.avatar_avg_gw = avatar_avg_gw;
  //   admin.avatar_avg_pe = avatar_avg_pe;
  //   admin.avatar_avg_gpc = avatar_avg_gpc;
  //   admin.total_number_users = total_number_users;
  //   console.log(admin.avatar_avg_ppg);
  //   console.log(admin.avatar_avg_gw);
  //   console.log(admin.avatar_avg_pe);
  //   console.log(admin.avatar_avg_gpc);
  //   console.log(admin.total_number_users);
  //   await admin.save();
  //   console.log(admin);
  // }
  // weight_calc();
  end;
  tte;
  console.log('tge:' + tte);

// ------------------------------------------------------------------------------------
// Return 200 status & JSON based on a condition. If user guess all 4 numbers 
// correct retrun an object or return and object based on wether or not the 
// user guessed more than 0 correct numbers
// ------------------------------------------------------------------------------------
performance.mark('ending');
performance.measure('inputs validation,', 'begining', 'ending'); 
const measurements = performance.getEntriesByType('measure');
console.log("m", measurements);
measurements.forEach(measurement => {
  console.log(measurement);
  // debug(measurement.name, measurement.duration)
  console.log( measurement.name, measurement.duration)
})  


  res
  .status(200)
  .json(
    user_guessed_all_correct_numbers
      ? { guess_attempt_return: guess, all_four_correct: true }
      : (round_results =
          correct_numbers_count > 0
            ? {
                correct_numbers_return: correct_numbers_count,
                correct_locations_return: correct_locations_count,
                guess_attempt_return: guess,
              }
            : {
                correct_numbers_return: 0,
                correct_locations_return: 0,
                guess_attempt: guess,
              })
  );
};

const send_hint_data = async (req, res) => {
  const { current_game_mode, guess } = req.body;
  console.log(req.body);

  if (current_game_mode === null || undefined) return;
  // const game = await Game.findById()
  // game.update_game_level()
  console.log("currentgm: " + current_game_mode);
  console.log("guess: " + guess);
  console.log(req.body);
  let hint_evaluation;

  if (game_modes.a == current_game_mode) {
    hint_evaluation = easy_mode(random_number, guess);
  }
  console.log(hint_evaluation);

  if (game_modes.c == current_game_mode) {
    hint_evaluation = hard_mode(random_number, 3);
  }
  console.log(hint_evaluation);

  if (game_modes.d == current_game_mode) {
    hint_evaluation = super_hard_mode(random_number);
  }
  console.log(hint_evaluation);

  if (game_modes.b == current_game_mode) {
    let client = redis.createClient();
    await client.connect();
    client.on("connect", function () {
      console.log("Connected!");
    });
    function getRandom(index) {
      let r = Math.floor(Math.random() * index) + 1;
      return r;
    }
    let keys = [];
    let processed_data = [];
    let i = 0;
    while (i < 4) {
      let random_obj = getRandom(3);
      keys[i] = `hint_data_${random_number_string.charAt(i)}${random_obj}`;
      i++;
    }
    const hint_key1 = await client.get(keys[0]);
    const hint_key2 = await client.get(keys[1]);
    const hint_key3 = await client.get(keys[2]);
    const hint_key4 = await client.get(keys[3]);
    let processed_array = [hint_key1, hint_key2, hint_key3, hint_key4];

    for (let index = 0; index < processed_array.length; index++) {
      let prep = new Object();
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
      prep = { cap: parsedHintObj.caption, img: hint_image_tag };
      processed_data.push(prep);
    }
    console.log(processed_data.length);
    hint_evaluation = { game_mode: "super_easy", hint: processed_data };
    console.log(hint_evaluation);
  }
  return res.json({ current_game_mode_hints: hint_evaluation });
};

const create_a_new_game = async (req, res, current_game_mode, user_guessed_all_correct_numbers) => {
  console.log("in create game route");
  const { passUserData } = req.body;
  // console.log(passUserData);
  const current_user = JSON.parse(passUserData);
  const current_user_email = current_user.email;
  const current_user_id = current_user._id;
  const game_obj = {
    is_2_player: false,
    game_mode: current_game_mode,
    rounds_played: 0,
    game_won: false,
    user: current_user_id,
  };
  const user = await User.findOne({ email: current_user_email });
  const game = await Game.create(gameobj);
  await game.users.push(user);
  await game.save();
  await user.games.push(game);
  await user.save();
  return res.json({ game_id: game._id });
};

module.exports = {
  get_random_number_from_api,
  get_and_evaluate_user_guess,
  send_hint_data,
  create_a_new_game,
};