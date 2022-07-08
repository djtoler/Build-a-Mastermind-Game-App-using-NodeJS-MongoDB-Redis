import {checkValidInput, validateAllCorrect, checkUserGuesses, updateUserGuessInfo} from './ClientFunctions';

export const submit_handler = (
    setLoading,
    toast,
    setWonGame,
    userInputNumber,
    props,
    serverData,
    guessAttemptCounter,
    setGuessArray,
    setUserInputNumber,
  ) => {
    setLoading(true);
    let correctLocationCount = 0;
    let correctNumbersCount = 0;
    let tally = guessAttemptCounter;
    checkValidInput(userInputNumber, toast, setLoading);
    if (validateAllCorrect(userInputNumber, props, setLoading, setWonGame))
      return;
    else {
      // tallyFunc(count, setCount)
      [correctLocationCount, correctNumbersCount, tally] = checkUserGuesses(
        serverData,
        userInputNumber,
        correctLocationCount,
        correctNumbersCount,
        tally
      );
      updateUserGuessInfo(
        setGuessArray,
        userInputNumber,
        setLoading,
        setUserInputNumber,
        guessAttemptCounter,
        correctLocationCount,
        correctNumbersCount
      );
    }
  };