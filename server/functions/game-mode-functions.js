const default_mode = () => {};
const super_easy_mode = () => {};
const hard_mode = () => {};
const super_hard_mode = () => {};

low_num = 0000;
hi_num = 9999;

const easy_mode = (random_number, guess) => {
  let hint;
  let guess_array = [];
  console.log(guess);
  console.log(guess.toString());
  let user_guess = Number(guess)
  let hint_evaluation;

  guess_array.push(user_guess)
  console.log(guess_array);
  const lower = () => {
    hi_num = user_guess;
    console.log(user_guess-1);
    return `lower , secret number is between ${low_num}  to ${(user_guess - 1)}`;
  };

  const higher = () => {
    low_num = user_guess;
    console.log(user_guess+1);
    return `higher, secret number is between ${(user_guess + 1)} to ${hi_num}`;
  };

  if (random_number < guess) {
    hint = `lower , secret number is between ${low_num}  to ${(user_guess - 1)}`;
    hi_num = user_guess;
  } else {
    hint = `higher, secret number is between ${(user_guess + 1)} to ${hi_num}`;
    low_num = user_guess;
  }

  hint_evaluation = random_number < guess ? lower() : higher();
  console.log("return: " + hint_evaluation, "low_num: " + low_num, "hi_num: " + hi_num);
  return hint_evaluation
  };
  
  module.exports = {
    easy_mode,
  }

