import axios from "axios";
import { useEffect } from "react";
import './DisplayGuessAttemptData.css';

const toastResponseInputTooShort = {
  title: "Please Enter A 4-Digit Number The Field Before Clicking Submit",
  status: "warning",
  duration: 5000,
  isClosable: true,
  position: "bottom",
};
const toastResponseError = {
  title: "Error Occured!",
  status: "error",
  duration: 9000,
  isClosable: true,
  position: "bottom",
};

export const FetchRandomNumber = (axios, setRandomNumber, toast) => {
  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios
          .get("http://127.0.0.1:9991/game/random-number")
          .then((res) => {
            setRandomNumber(res.data);
            console.log(res.data);
            sessionStorage.setItem(
              "currentRandomNumber",
              res.data.randomNumber.toString()
            );
            console.log(res.data);
          });
      };
      fetchData();
    } catch (errors) {
      toast(toastResponseError);
    }
  }, []);
};

export const clickHandler = async (  currentGuess,  toast,  setLoading,  axios,  config,  guess_evaluation,  setCurrent_Game_Data) => {
  checkValidInput(currentGuess, toast, setLoading);
  sendUserGuessToServer(  currentGuess,  axios,  config,  guess_evaluation,  setCurrent_Game_Data);
};

export const checkValidInput = (  currentGuess,  toast,  setLoading,  minimumGuessInputLength) => {
  let invalidGuessInput =
    undefined || currentGuess.length < minimumGuessInputLength
      ? toast(toastResponseInputTooShort) && setLoading(false)
      : null;
  return invalidGuessInput;
};

export const sendUserGuessToServer = async (  currentGuess,  axios,  config,  guess_evaluation,  array,  setArray) => {
  let currentGameID = sessionStorage.getItem("currentGameID");
  console.log("currentGameID", currentGameID);

  let currentGameMode = sessionStorage.getItem("currentMode");
  console.log(currentGameMode);
  let currentRandomNumberFromRequestBody = sessionStorage.getItem(  "currentRandomNumber");
  let currentUsersData = sessionStorage.getItem("userData");
  const data = await axios
    .post(  "http://127.0.0.1:9991/game/guess-evaluation",  {    currentGuess,    currentGameID,    currentGameMode,    currentRandomNumberFromRequestBody,    currentUsersData,  },  config)
    .then((res) => {
      console.log(res.data);
      guess_evaluation = res.data;
      setArray((array) => [...array, guess_evaluation]);
    });
};

export const displayGuessAttemptData = (  array,  numberOfRoundsPlayed,  maxNumberOfRoundsAllowed) => {
  let numberOfGuessAttemptsLeft = maxNumberOfRoundsAllowed - 1;
  console.log(numberOfRoundsPlayed, maxNumberOfRoundsAllowed);
  let returnDisplayGuessData = (
    <div className="guess-attempt-container">
      {array.map((round, i) => {
        return (
          <div className="guess-data" key={i}>
            <div className="round-number">Round#: <span style={{fontWeight: 'bold', fontSize: '30px'}}>{numberOfRoundsPlayed++}</span></div>
            <div className="your-guess">Your Guess: <span style={{fontWeight: 'bold', fontSize: '30px'}}>{round.currentGuessEvaluationData.guessAttempt}</span></div>
            <div className="correct-numbers">
              Correct Numbers: <span style={{fontWeight: 'bold', fontSize: '30px'}}>{round.currentGuessEvaluationData.totalCorrectNumbersCount < 4
                ? round.currentGuessEvaluationData.totalCorrectNumbersCount
                : reloadIfUserGuessesAll4CorrectNumbers("you won")}</span>
            </div>
            <div className="correct-locations">Correct Locations: <span style={{fontWeight: 'bold', fontSize: '30px'}}>{round.currentGuessEvaluationData.totalCorrectLocationsCount}</span></div>
            <div className="guesses-left">Guesses Left: <span style={{fontWeight: 'bold', fontSize: '30px'}}>{numberOfGuessAttemptsLeft--}</span></div>
          </div>
        );
      })}
    </div>
  );
  return returnDisplayGuessData;
};

export const returnHintForCurrentGameMode = (array, theCurrentGamesMode) => {
  theCurrentGamesMode = sessionStorage.getItem("currentMode");
  console.log(theCurrentGamesMode);

  if (array.length > 0 && theCurrentGamesMode === "superHard") {
    setTimeout(() => {
      window.location.reload();
    }, 30000);
    return (
      <div className="guess-data">
        {" "}
        Your number is hidden in this set of numbers: {"-" + array[0]} <br />
      </div>
    );
  }

  if (array.length > 0 && theCurrentGamesMode === "hard") {
    return (
      <div className="guess-data">
        {" "}
        Your number is either 1/2, Double or the Cubed value of this number :{" "}
        {"" + array[0]} <br />
      </div>
    );
  }

  if (array.length > 0 && theCurrentGamesMode === "superEasy") {
    let arrayOfImageHintObjects = array[0];
    console.log(array);
    let renderSuperEasyHints = [
      <div>
        {" "}
        {arrayOfImageHintObjects.map((round, i) => {
          return (
            <div className="hint-data-super-easy" key={i}>
              Caption: {round.caption}
              <br />
              <img src={round.image} />
            </div>
          );
        })}
      </div>,
    ];
    return renderSuperEasyHints;
  }

  if (array.length > 0 && theCurrentGamesMode === "easy") {
    let arrayOfEasyHints = array;
    let j = 1;
    let renderEasyHints = [
      <div>
        {" "}
        {arrayOfEasyHints.map((currentNumberRange, i) => {
          j=j+1
          return (
            <div className="hint-data" key={i}>
              Round # {i}: {currentNumberRange}
              <br />
            </div>
          );
        })}
      </div>,
    ];
    return renderEasyHints;
  }
};

export const reloadIfUserGuessesAll4CorrectNumbers = (
  gameWonResponseMessage,
  reload
) => {
  reload = true;
  return setTimeout(() => {
    gameWonResponseMessage && window.location.reload();
  }, 5000);
};

export const reloadIfUserReachesGuessAttemptLimit = async (currentGameID) => {
  console.log("reloadIfUserReachesGuessAttemptLimit");
  sessionStorage.removeItem("currentMode");
  sessionStorage.removeItem("currentGameId");
  sessionStorage.setItem("currentMode", "default");
  console.log(sessionStorage.getItem("currentMode"));
  setTimeout(() => {
    window.location.reload();
  }, 8000);
  alert("out of guesses");
  // return sessionStorage.setItem("currentGameId", JSON.stringify(currentGameID))
};
