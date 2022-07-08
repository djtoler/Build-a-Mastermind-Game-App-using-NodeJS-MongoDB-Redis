export const handler = (
  setLoading,
  toast,
  setWonGame,
  userInputNumber,
  props,
  serverData,
  guessAttemptCounter,
  setGuessArray,
  setUserInputNumber,
  count,
  setCount
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

export const checkValidInput = (userInputNumber, toast, setLoading) => {
  // if user tries to input w/out entering # or less than 4 digits
  // UPDATE THIS CODE TO TAKE ANY AMOUNT OF USER INPUTS IN PARAMATERS
  if (!userInputNumber || userInputNumber.length < 4) {
    toast({
      title: "Please Enter A 4-Digit Number The Field Before Clicking Submit",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }
};

export const checkUserGuesses = (
  serverData,
  userInputNumber,
  correctLocationCount,
  correctNumbersCount,
  tally
) => {
  tally++;
  console.log(tally);
  for (let i = 0; i < serverData.length; i++) {
    // evaluate for correct numbers only
    if (
      serverData.charAt(i) === userInputNumber.charAt(0).toString() ||
      serverData.charAt(i) === userInputNumber.charAt(1).toString() ||
      serverData.charAt(i) === userInputNumber.charAt(2).toString() ||
      serverData.charAt(i) === userInputNumber.charAt(3).toString()
    ) {
      correctNumbersCount++;
    }
    // evaluate for correct number with correct location
    if (userInputNumber.toString().charAt(i) === serverData.charAt(i)) {
      correctLocationCount++;
    }
    console.log(tally);
  }
  return [correctLocationCount, correctNumbersCount, tally];
};

export const updateUserGuessInfo = (
  setGuessArray,
  userInputNumber,
  setLoading,
  setUserInputNumber,
  count,
  correctLocationCount,
  correctNumbersCount,
  tally
) => {
  // update array state to store users guess, # of guesses, # of correct locations & number of correct numbers
  setGuessArray((guessArray) => [
    ...guessArray,
    {
      userInputNumberData: {
        userGuess: userInputNumber,
        guessNumberCount: tally,
        correctLocations: correctLocationCount,
        correctNumbers: correctNumbersCount,
      },
    },
  ]);

  setLoading(false);
  setUserInputNumber("");
};

export const validateAllCorrect = (
  userInputNumber,
  props,
  setLoading,
  setWonGame
) => {
  // if user guess all 4 numbers in correct locations
  if (userInputNumber.toString() === props.numbers) {
    console.log("yes");
    setLoading(false);
    setWonGame(true);
  }
};

export const homeRedirect = () => {
  window.location.reload();
};


