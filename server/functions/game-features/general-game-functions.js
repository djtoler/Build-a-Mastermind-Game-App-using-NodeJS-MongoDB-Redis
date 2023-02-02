const axios = require("axios");
const redis = require("redis");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const newId = uuidv4();
const { defaultGameObj } = require("../../databases/mongodb/model-helpers");
// const {
//   game_modes,
//   easy_mode,
//   hard_mode,
//   super_hard_mode,
//   return_random_index,
// } = require("../functions/game-mode-functions");
const Game = require("../../databases/mongodb/game-model");
const User = require("../../databases/mongodb/user-model");

let test;
let dummy_users = [];

const runGetRandomNumber = require("./game.features.getRandomNumber");
let random_number;

// ---------------------------------------------------FUNCTION----------------------------
// --------------------------------GET A RANDOM NUMBER FROM THE RANDOM.ORG API-------------------------------

const runGetRandomNumberFromAPIService = async (response, res) => {
  const randomNumber = await runGetRandomNumber(res);
  console.log(randomNumber, "<-------- RANDOM NUMBER", res.data);
  return randomNumber;
};

// ------------------------------------------FUNCTION---------------------------------
// ----------------------------RECIEVE A USERS GUESS & EVALUATE IT-------------------------------

// const get_and_evaluate_user_guess = async (req, res) => {
//   const {guess, currentGameID, currentGameMode, currentRandomNumberFromRequestBody, currentUsersData} = req.body;

//   const parsedCurrentGameID = JSON.parse(currentGameID)
//   const parsedCurrentUsersData = JSON.parse(currentUsersData)

//   let objectToStoreResultsOfEachRoundInAGame = {};
//   let arrayToStoreCorrectNumbersCount = [];
//   let totalCountOfCorrectNumbers = 0;
//   let totalCountOfCorrectLocations = 0;
//   let userGuessedAll4NumbersCorrect;

//   const randomNumberFromRequestBodyToNumber = ~~currentRandomNumberFromRequestBody;
//   const randomNumberFromRequestBodyToArray = Array.from(String(currentRandomNumberFromRequestBody));
//   const randomNumberFromRequestBodyString = currentRandomNumberFromRequestBody.toString();

//   let currentGame = await Game.findOne({ _id: parsedCurrentGameID});

//   if (currentGame.rounds_played >= 4) {
//     const currentUser = parsedCurrentUsersData.authorizeUser.user
//     const currentUserEmail = currentUser.email;
//     const confirmedCurrentUser = await User.findOne({ email: currentUserEmail });
//     currentGame = await Game.create(defaultGameObj);
//     currentGame.save();
//     await confirmedCurrentUser.games.push(currentGame);
//     await confirmedCurrentUser.save();
//   }

//   currentGame.rounds_played = currentGame.rounds_played + 1
//   currentGame.random_number = currentRandomNumberFromRequestBody;
//   currentGame.save();

//   // ------------------------------------------------------------------------------------
//   // Check if the users has guessed all 4 numbers correct, save game and return if so
//   // ------------------------------------------------------------------------------------
//   const didUserGuessAll4NumbersCorrect = async () => {
//     userGuessedAll4NumbersCorrect =
//       guess == randomNumberFromRequestBodyString ? true : false;

//     if (userGuessedAll4NumbersCorrect) {
//       const user = await User.findOne({ email: currentUserEmail });
//       user.alltime_games_won = user.alltime_games_won + 1;
//       user.save();
//       currentGame.game_won = true;
//       currentGame.total_points = 20000;
//       currentGame.total_correct_locations = 4;
//       currentGame.total_correct_numbers = 4;
//       currentGame.save();
//       return currentGame;
//     }
//     return userGuessedAll4NumbersCorrect;
//   };
//   // ------------------------------------------------------------------------------------
//   // Count how many numbers the user got correct & return that value
//   // ------------------------------------------------------------------------------------
//   const returnTotalCountOfCorrectNumbers = () => {
//     let arrayCreatedFromEachDigitOfUsersGuess = Array.from(guess);
//     console.log(
//       (arrayToStoreCorrectNumbersCount =
//         arrayCreatedFromEachDigitOfUsersGuess.filter((comparison) => {
//           return randomNumberFromRequestBodyToArray.includes(comparison);
//         }))
//     );
//     totalCountOfCorrectNumbers = arrayToStoreCorrectNumbersCount.length;
//   };
//   // ------------------------------------------------------------------------------------
//   // Count how many locations the user got correct & return that value
//   // ------------------------------------------------------------------------------------
//   const returnTotalCountOfCorrectLocations = () => {
//     let i = 0;
//     while (i < 4) {
//       guess.toString().charAt(i) == randomNumberFromRequestBodyString.charAt(i)
//         ? totalCountOfCorrectLocations++
//         : 0;
//       i++;
//     }
//     return totalCountOfCorrectLocations;
//   };
//   // ------------------------------------------------------------------------------------
//   // Call all 3 functions to evalue the users guess
//   // ------------------------------------------------------------------------------------
//   didUserGuessAll4NumbersCorrect();
//   returnTotalCountOfCorrectNumbers();
//   returnTotalCountOfCorrectLocations();
//   // ------------------------------------------------------------------------------------
//   // Set the objectToStoreResultsOfEachRoundInAGame variable to a condition. If the number of correct numbers is
//   // more than 0, return an object with the values for how many correct numbers,
//   // locations & what number they guessed... or return zeros
//   // ------------------------------------------------------------------------------------
//   console.log(
//     (objectToStoreResultsOfEachRoundInAGame =
//       totalCountOfCorrectNumbers > 0
//         ? {
//             correct_numbers_return: totalCountOfCorrectNumbers,
//             correct_locations_return: totalCountOfCorrectLocations,
//             guess_attempt_return: guess,
//             currentGameID: currentGame._id
//           }
//         : {
//             correct_numbers_return: 0,
//             correct_locations_return: 0,
//             guess_attempt: guess,
//             currentGameID: currentGame._id
//           })
//   );

//   res.status(200).json(
//     userGuessedAll4NumbersCorrect
//       ?
//       { guess_attempt_return: guess, all_four_correct: true }
//       :
//       (objectToStoreResultsOfEachRoundInAGame = totalCountOfCorrectNumbers > 0
//         ?
//         {correct_numbers_return: totalCountOfCorrectNumbers, correct_locations_return: totalCountOfCorrectLocations, guess_attempt_return: guess, currentGameID: currentGame._id}
//         :
//         {correct_numbers_return: 0, correct_locations_return: 0, guess_attempt: guess, currentGameID: currentGame._id}
//       )
//   );
// };

// const send_hint_data = async (req, res) => {
//   const { current_game_mode, guess } = req.body;
//   console.log(req.body);

//   if (current_game_mode === null || undefined) return;
//   // const game = await Game.findById()
//   // game.update_game_level()
//   console.log("currentgm: " + current_game_mode);
//   console.log("guess: " + guess);
//   console.log(req.body);
//   let hint_evaluation;

//   if (game_modes.a == current_game_mode) {
//     hint_evaluation = easy_mode(random_number, guess);
//   }
//   console.log(hint_evaluation);

//   if (game_modes.c == current_game_mode) {
//     hint_evaluation = hard_mode(random_number, 3);
//   }
//   console.log(hint_evaluation);

//   if (game_modes.d == current_game_mode) {
//     hint_evaluation = super_hard_mode(random_number);
//   }
//   console.log(hint_evaluation);

//   if (game_modes.b == current_game_mode) {
//     let client = redis.createClient();
//     await client.connect();
//     client.on("connect", function () {
//       console.log("Connected!");
//     });
//     function getRandom(index) {
//       let r = Math.floor(Math.random() * index) + 1;
//       return r;
//     }
//     let keys = [];
//     let processed_data = [];
//     let i = 0;
//     while (i < 4) {
//       let random_obj = getRandom(3);
//       keys[i] = `hint_data_${randomNumberFromRequestBodyString.charAt(i)}${random_obj}`;
//       i++;
//     }
//     const hint_key1 = await client.get(keys[0]);
//     const hint_key2 = await client.get(keys[1]);
//     const hint_key3 = await client.get(keys[2]);
//     const hint_key4 = await client.get(keys[3]);
//     let processed_array = [hint_key1, hint_key2, hint_key3, hint_key4];

//     for (let index = 0; index < processed_array.length; index++) {
//       let prep = new Object();
//       let parsedHintObj = JSON.parse(processed_array[index]);
//       // console.log("----------------------------PARSED1---------------------------");
//       // console.log(parsedHintObj);
//       // console.log("----------------------------PARSED2---------------------------");
//       let b64string = parsedHintObj.image;
//       // console.log(typeof(b64string));
//       // console.log(parsedHintObj);
//       // console.log('---------------------------------------------------------');
//       // console.log(hint);

//       let hint_image_tag = `data:image/jpeg;base64,${b64string}`;
//       prep = { cap: parsedHintObj.caption, img: hint_image_tag };
//       processed_data.push(prep);
//     }
//     console.log(processed_data.length);
//     hint_evaluation = { game_mode: "super_easy", hint: processed_data };
//     console.log(hint_evaluation);
//   }
//   return res.json({ current_game_mode_hints: hint_evaluation });
// };

// const create_a_new_game = async (
//   req,
//   res,
//   current_game_mode,
//   userGuessedAll4NumbersCorrect
// ) => {
//   console.log("in create game route");
//   const { passUserData } = req.body;

//   // console.log(req.body, "+++++++++++++game req body++++++++++++++");
//   // console.log(passUserData, "<------- pass user data");
//   // console.log(passUserData);

//   const currentUser = JSON.parse(passUserData);
//   // const currentUser = passUserData;
//   // console.log(currentUser, 'CURRENT  USER');
//   // const current_user_email = current_user.email;
//   // console.log(passUserData);
//   // console.log(currentUser, "<-----------CURRENT-USER");
//   // console.log(  currentUser.user.email, '------------email form current game<----------');

//   const currentUserEmail =
//     currentUser.user === undefined
//       ? currentUser.authorizeUser.user.email
//       : currentUser.user.email;

//   const currentUserID =
//     currentUser.user === undefined
//       ? currentUser.authorizeUser.user._id
//       : currentUser.user._id;

//   const game_obj = {
//     is_2_player: false,
//     game_mode: current_game_mode,
//     rounds_played: 0,
//     game_won: false,
//     user: currentUserID,
//   };
//   const user = await User.findOne({ email: currentUserEmail });
//   const game = await Game.create(defaultGameObj);
//   await game.users.push(user);
//   await game.save();
//   await user.games.push(game);
//   await user.save();
//   return res.json({ game_id: game._id });
// };

module.exports = {
  runGetRandomNumberFromAPIService,
  // get_and_evaluate_user_guess,
  // send_hint_data,
  // create_a_new_game,
};
