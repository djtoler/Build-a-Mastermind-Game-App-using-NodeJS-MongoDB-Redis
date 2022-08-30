// const superEasyMode = async () => {
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
//       keys[i] = `hintData_${randomNumberFromRequestBodyString.charAt(i)}${random_obj}`;
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
// }

const superEasyMode = async () => {
  
}

const easyMode = (random_number, guess) => {
  let hint_string;
  let guess_array = [];
  let user_guess = Number(guess);
  let hint_evaluation;
  guess_array.push(user_guess);
  console.log(guess_array);
  const lower = () => {
    hi_num = user_guess;
    console.log(user_guess - 1);
    return `lower , secret number is between ${low_num}  to ${user_guess - 1}`;
  };
  const higher = () => {
    low_num = user_guess;
    console.log(user_guess + 1);
    return `higher, secret number is between ${user_guess + 1} to ${hi_num}`;
  };
  if (random_number < guess) {
    hint_string = `lower , secret number is between ${low_num}  to ${user_guess - 1}`;
    hi_num = user_guess;
  } else {
    hint_string = `higher, secret number is between ${user_guess + 1} to ${hi_num}`;
    low_num = user_guess;
  }
  hint_evaluation = {game_mode: 'easy', hint: hint_string}
  return hint_evaluation
};


const hardMode = (random_number, exponent) => {
  let hint_evaluation;
  let digit_calculations = {};
  Object.assign(digit_calculations, {
    0: random_number / 2,
    1: random_number * 2,
    2: Math.pow(random_number, exponent),
  });
  console.log(digit_calculations[return_random_index(3)]);
  hint_evaluation = {
    game_mode: "hard",
    hint: digit_calculations[return_random_index(3)],
  };
  return hint_evaluation;
};


const superHardMode = (random_number) => {
  let hint_evaluation;
  let random_number_from_api_as_string = random_number.toString();
  let random_number_from_generator = return_random_number(100000000, 999999999).toString();
  let position = Math.floor(
    Math.random() * (random_number_from_generator.length + 1)
  );
  let new_num =
    random_number_from_generator.substring(0, position) +
    random_number_from_api_as_string +
    random_number_from_generator.substring(position);
  console.log(new_num, position); 
  hint_evaluation = {game_mode:'super_hard', hint: Number(new_num)};
  console.log(hint_evaluation);
  return hint_evaluation;
};

