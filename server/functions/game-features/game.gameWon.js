// const didUserGuessAll4NumbersCorrect = async () => {
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
