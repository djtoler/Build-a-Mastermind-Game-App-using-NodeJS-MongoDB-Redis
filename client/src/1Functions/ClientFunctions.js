import axios from "axios";
import { useEffect } from "react";

const toastResponseInputTooShort = {title:"Please Enter A 4-Digit Number The Field Before Clicking Submit", status: "warning", duration: 5000, isClosable: true, position: "bottom"}
const toastResponseError = {title: 'Error Occured!',  status: 'error', duration: 9000, isClosable: true, position: "bottom"}

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
    } 
    catch (errors) {toast(toastResponseError)}
  }, []);
};

export const clickHandler = async (
  currentGuess,
  toast,
  setLoading,
  axios,
  config,
  guess_evaluation,
  setCurrent_Game_Data
) => {
  checkValidInput(currentGuess, toast, setLoading);
  sendUserGuessToServer(currentGuess, axios, config, guess_evaluation, setCurrent_Game_Data);
};


export const checkValidInput = (currentGuess, toast, setLoading, minimumGuessInputLength) => {
  let invalidGuessInput = undefined || currentGuess.length < minimumGuessInputLength
    ? toast(toastResponseInputTooShort) && setLoading(false)
    : null;
  return invalidGuessInput;
};

export const sendUserGuessToServer = async (
  currentGuess,
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
    .post("http://127.0.0.1:9991/game/guess-evaluation", { currentGuess, currentGameID, currentGameMode, currentRandomNumberFromRequestBody, currentUsersData }, config)
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


export const returnHintForCurrentGameMode = (array, theCurrentGamesMode) => {
  theCurrentGamesMode = sessionStorage.getItem("currentMode")

  if (array.length > 0 && theCurrentGamesMode === 'superEasy') {
    let arrayOfImageHintObjects = array[0] 
    let renderSuperEasyHints = [
      <div> {
        arrayOfImageHintObjects.map((round, i) => {
          return (
          <div className="guess-data" key={i}> 
            Caption: {round.caption} 
            <br /> 
            <img src={round.image} />
          </div>)
        })}
      </div>
    ];
    return renderSuperEasyHints;
  }

  if (array.length > 0 && theCurrentGamesMode === 'easy') {
    return <div className="guess-data" > Range: {' ' + array[0]} <br /> </div>;
  }

  if (array.length > 0 && theCurrentGamesMode === 'superHard' ) {
    return <div className="guess-data"> Your number is hidden in this set of numbers: {'-' + array[0]} <br /></div>;
  }

  if (array.length > 0 && theCurrentGamesMode === 'hard' ) {
    return <div className="guess-data"> Your number is either 1/2, Double or the Cubed value of this number : {'' + array[0]} <br /></div>;
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
  sessionStorage.removeItem("currentGameId");
  window.location.reload();
  return sessionStorage.setItem("currentGameId", JSON.stringify(currentGameID))
};
