const super_easy_mode = () => {};
const game_modes = { a: 'easy', b: 'super_easy', c: 'hard', d: 'super_hard' };

low_num = 0000;
hi_num = 9999;

function return_random_index(max_value) {
  return Math.floor(Math.random() * max_value);
}

function return_random_number(floor, limit) {
  console.log(Math.floor(floor + Math.random() * limit));
  return Math.floor(floor + Math.random() * limit)
}

function reset_easy_hint_numbers(req) {
  const {low_num_reset, hi_num_reset} = req.body;
  low_number_reset = Number(low_num_reset);
  hi_number_reset = Number(hi_num_reset);
  low_num = low_num_reset
  hi_num = hi_num_reset
  return [hi_num, low_num]
}

const easy_mode = (random_number, guess) => {
  let hint;
  let guess_array = [];

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
  console.log("low_num: " + low_num, "hi_num: " + hi_num);
  console.log(user_guess);
  return hint_evaluation
};

const hard_mode = (random_number, exponent) => {
  let digit_calculations = {};
  let hint_evaluation;
  Object.assign(digit_calculations, {0 : random_number / 2, 1 : random_number * 2, 2 : Math.pow(random_number, exponent)})
  console.log(digit_calculations[return_random_index(3)]);
  hint_evaluation = digit_calculations[return_random_index(3)]
  return hint_evaluation;
};

const super_hard_mode = (random_number) => {
  let random_number_from_api_as_string = random_number.toString()
  let random_number_from_generator = return_random_number(100000000, 999999999).toString();
  let position = Math.floor(Math.random() * (random_number_from_generator.length + 1))
  let new_num = random_number_from_generator.substring(0, position) + random_number_from_api_as_string + random_number_from_generator.substring(position)
  console.log(new_num, position);
  let hint_evaluation = Number(new_num)
  console.log(hint_evaluation);
  return hint_evaluation;
}

  
module.exports = {
  easy_mode,
  hard_mode,
  super_hard_mode,
  reset_easy_hint_numbers,
  game_modes
}

