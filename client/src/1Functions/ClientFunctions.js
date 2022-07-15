import axios from "axios";
import { useEffect } from "react";

export const FetchRandomNumber = (axios, setRandomNumber, toast) => {
  useEffect(()=> {
    try {
        const fetchData = async() => {
            await axios
            .get("http://127.0.0.1:9991/random-number")
            .then((res) => {
                setRandomNumber(res.data)
                console.log(res.data);
            });
        }
        fetchData();
    }
    catch (errors) {
        toast({
            title: 'Error Occured!',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: "bottom"
        });
    }
}, []); 
}

export const clickHandler = async (guess, toast, setLoading, axios, config, guess_evaluation,  setCurrent_Game_Data) => {
  checkValidInput(guess, toast, setLoading);
  send_user_guess (guess, axios, config, guess_evaluation, setCurrent_Game_Data);
}

export const checkValidInput = (guess, toast, setLoading, min_guess_length) => {
  let not_valid = undefined || guess.length < min_guess_length 
    ?
    toast({
      title: "Please Enter A 4-Digit Number The Field Before Clicking Submit",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    }) && setLoading(false) 
    : 
    null
    return not_valid;
}

export const send_user_guess = async ( guess, axios, config, guess_evaluation, array, setArray) => {
  const data = await axios
  .post(
    "http://127.0.0.1:9991/guess-evaluation",
    {guess},
    config
  )
  .then((res) => {
      console.log(res.data);
      guess_evaluation = res.data;
      setArray(array => [... array, guess_evaluation])
    })
}

export const easy_mode_click_handler = async (current_game_mode, guess, axios, config) => {
  const data = await axios
    .post(
      "http://127.0.0.1:9991/get-hints",
        {guess, current_game_mode},
        config
    )
    .then((res)=> {
      console.log('in then');
      console.log(res.data); 
    })
} 

export const super_easy_mode_click_handler = async (pictures, current_game_mode, guess, axios, config) => {
    const formData = new FormData();
    formData.append("file", pictures);
    formData.append("hash-key", "random-number");
    const data = await axios
    .post(
      "http://127.0.0.1:9991/upload-image",
        {formData},
        config
    )
    .then((res)=> {
      console.log('in image');
      console.log(res.data); 
    })
} 

// export const update_server_variables = async (axios, config, reload) => {
//   if (reload) {
//     try {
//       const { data } = await axios({
//           method: 'put',
//           url: 'http://127.0.0.1:9991/update-vars',
//           data: {
//               hi_num_reset: '9999',
//               low_num_reset: '0000',
//           },
//           config
//       });
//       console.log(data);
//     } 
//     catch (err) {
//       if (err.response.status === 404) {
//             console.log('Resource could not be found!');
//           } 
//           else {
//             console.log(err.message);
//         }
//       }
//   }
// }


export const render_guess_data = (array, round_counter, limited_number_of_rounds) => {
  let guesses_left = limited_number_of_rounds - 1
  let render =             
  <div>
    {array.map((round, i) => {     
        return <div className="guess-data" key={i}>
            Round #: {round_counter >= limited_number_of_rounds ? game_reload() : round_counter++} <br/>
            Your Guess: {round.guess_attempt_return} <br/>
            Correct Numbers: {round.correct_numbers_return < 4 ? round.correct_numbers_return : all_four_correct_reload('you won')} <br/>
            Correct Locations: {round.correct_locations_return} <br/>
            Guesses Left: {guesses_left--}
        </div>
    })}
  </div>
  return render;
}

export const all_four_correct_reload = (game_won_response, reload, config) => {
  // update_server_variables (axios, config, reload)
  reload = true;
  return setTimeout(() => {
    game_won_response &&
    window.location.reload()
  }, 5000);
};

export const game_reload = (reload, config) => {
  // update_server_variables (axios, config, reload)
  reload = true
  window.location.reload();
}



