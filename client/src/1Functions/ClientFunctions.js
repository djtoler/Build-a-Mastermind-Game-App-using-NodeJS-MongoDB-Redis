import axios from "axios";
import { useEffect } from "react";

export const FetchRandomNumber = (axios, setRandomNumber, toast) => {
  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios.get("http://127.0.0.1:9991/game/random-number").then((res) => {
          setRandomNumber(res.data);
          console.log(res.data);
          sessionStorage.setItem("currentRandomNumber", res.data.randomNumber.toString())
          console.log(res.data);
        });
      };
      fetchData();
    } catch (errors) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
  }, []);
};

export const clickHandler = async (
  guess,
  toast,
  setLoading,
  axios,
  config,
  guess_evaluation,
  setCurrent_Game_Data
) => {
  checkValidInput(guess, toast, setLoading);
  send_user_guess(guess, axios, config, guess_evaluation, setCurrent_Game_Data);
};


export const checkValidInput = (guess, toast, setLoading, min_guess_length) => {
  let not_valid =
    undefined || guess.length < min_guess_length
      ? toast({
          title:
            "Please Enter A 4-Digit Number The Field Before Clicking Submit",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        }) && setLoading(false)
      : null;
  return not_valid;
};

export const send_user_guess = async (
  guess,
  axios,
  config,
  guess_evaluation,
  array,
  setArray
) => {
  let currentGameID = sessionStorage.getItem("currentGameID")
  console.log('currentGameID', currentGameID);
  
  let currentGameMode = sessionStorage.getItem("currentMode")
  console.log(currentGameMode);
  let currentRandomNumberFromRequestBody = sessionStorage.getItem("currentRandomNumber")
  let currentUsersData = sessionStorage.getItem("userData")
  const data = await axios
    .post("http://127.0.0.1:9991/game/guess-evaluation", { guess, currentGameID, currentGameMode, currentRandomNumberFromRequestBody, currentUsersData }, config)
    .then((res) => {
      console.log(res.data);
      guess_evaluation = res.data;
      setArray((array) => [...array, guess_evaluation]);
    });
};


export const render_guess_data = (
  array,
  round_counter,
  limited_number_of_rounds
) => {
  let guesses_left = limited_number_of_rounds - 1;
  let render = (
    <div>
      {array.map((round, i) => {
        // console.log(round);
        return (
          <div className="guess-data" key={i}>
            Round #:{" "}
            {round_counter >= limited_number_of_rounds
              ? game_reload(round.currentGameID)
              : round_counter++}{" "}
            <br />
            Your Guess: {round.guess_attempt_return} <br />
            Correct Numbers:{" "}
            {round.correct_numbers_return < 4
              ? round.correct_numbers_return
              : all_four_correct_reload("you won")}{" "}
            <br />
            Correct Locations: {round.correct_locations_return} <br />
            Guesses Left: {guesses_left--}
          </div>
        );
      })}
    </div>
  );
  return render;
};


export const render_hint_data = (array, theCurrentGamesMode) => {
  theCurrentGamesMode = sessionStorage.getItem("currentMode")
  console.log(theCurrentGamesMode);

  if (array.length > 20 && array[0].current_game_mode_hints.game_mode == 'super_hard' ) {
    console.log(array[0].current_game_mode_hints.game_mode);
    let render_super_hard_hints = (
      <div>
        {array.map((round, i) => {
          console.log(round);
          console.log(i);
          return (
            <div className="guess-data" key={i}>
              Your number is hidden in this set of numbers: {'-'+ round.current_game_mode_hints.hint} <br />
            </div>
          );
        })}
      </div>
    );
    return render_super_hard_hints;
  }

  if (array.length > 20 && array[0].current_game_mode_hints.game_mode == 'hard' ) {
    console.log(array[0].current_game_mode_hints.game_mode);
    let render_hard_hints = (
      <div>
        {array.map((round, i) => {
          console.log(round);
          console.log(i);
          return (
            <div className="guess-data" key={i}>
              Your number is either 1/2, Double or Cubed value of this number : {''+ round.current_game_mode_hints.hint} <br />
            </div>
          );
        })}
      </div>
    );
    return render_hard_hints;
  }

  if (array.length > 20 && array[0].current_game_mode_hints.game_mode == 'easy') {
    console.log(array[0].current_game_mode_hints.game_mode);
    let render_easy_hints = (
      <div>
        {array.map((round, i) => {
          console.log(round);
          console.log(i);
          return (
            <div className="guess-data" key={i}>
              Range: {round.current_game_mode_hints.hint} <br />
            </div>
          );
        })}
      </div>
    );
    return render_easy_hints;
  }

  // clear 
  if (array.length > 0 && theCurrentGamesMode === 'superEasy' ) {
    let arrayOfImageHintObjects = array[0] 
    let i = 0;
    let k = 20
    let super_easy_hints = [
      <div key={k}>
        {arrayOfImageHintObjects.map((round, i) => {
          console.log(round[i]);
          return (
            <div className="guess-data" key={i}>
                Caption: {round.caption} <br />
               <img src={round.image} />
            </div>
          );
        })}
        {i++}
        {k++}
      </div>
    ];
    return super_easy_hints;
  }
};

export const all_four_correct_reload = (game_won_response, reload, config) => {
  // update_server_variables (axios, config, reload)
  reload = true;
  return setTimeout(() => {
    game_won_response && window.location.reload();
  }, 5000);
};

export const game_reload = async (currentGameID) => {
  // update_server_variables (axios, config, reload)
  // reload = true;
  sessionStorage.removeItem("currentGameId");
  // const GID = await sessionStorage.setItem("currentGameId", currentGameID)
  // console.log(GID);
  // await sessionStorage.setItem("currentGameId", currentGameID)
  await window.location.reload();
  return sessionStorage.setItem("currentGameId", JSON.stringify(currentGameID))
};
