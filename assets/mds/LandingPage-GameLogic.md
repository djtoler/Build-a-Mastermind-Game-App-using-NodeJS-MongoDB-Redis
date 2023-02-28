# Game Logic:  When a game is started, a random number is generated…

**Game Logic:**  After our user successfully logs in, a game is created while they're being redirected to the [‘GameSubmit.js’](https://github.com/djtoler/v1-mern/blob/main/client/src/1Pages/GuessSubmit.js) page, where they can start submitting guesses. 

After each guess, a [card with game related data](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/client/src/1Functions/ClientFunctions.js#L73) is rendered to allow us to keep track of our guesses

![Untitled](Untitled%202.png)

For example, in the bottom right corner of the image below, we can see our random number, ***4257*** that was generated. 

In the middle of the page, we can see we have an input box and bright green cards. 

Our cards display… 

- Which round we’re on
- What our guess was
- How many number we guessed correctly
- How many locations we guess correctly
- How many guesses we have left before the game is over and restarts

![Untitled](Untitled%2013.png)

In the image above, we can see our first guess was ***4258*** and we can see that we were on round 1, we guessed 3 of the numbers correct, we got the of the locations correct and we have 3 guesses left.

Our second guess was ***8405*** , we’re on round 2, we only got 2 numbers correct (the “4” & the “5”), but this time we got none of the locations correct and we only have 2 guesses left.

Below is an overview of how our game works and how our files interact

The blue areas represent the game logic.

- First, we get a random number and create a new game.
- Next, our user submits a guess.
- Then, our game logic runs in the runGame.js file and the evaluateGuess.js file.
- Our user continues to submit guesses until they win a game or reach the limit of allowable rounds and when one of those conditions are met, we generate a new random number, create a new game and the runGame.js file and the evaluateGuess.js loop starts again

![Untitled](Untitled%2014.png)

### **Starting at #6, after a successful login…**

- In our [game.features.getRandomNumber](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-features/game.features.getRandomNumber.js#L6) file at lines 8 & 9, our random number is generated from the Random.org’s [Random Number Generator API](https://api.random.org/dashboard).
    
    I also included a [backup set of numbers](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-helpers/game.helpers.functions.js#L17) in case their API is down and we can access it to generate our numbers to start a game.
    
- In our [game.features.convertRandomNumber.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-features/game.features.convertRandomNumber.js) (below on the right) at lines 3, 9 & 10, we convert our random number into different formats (string, number, array) to use throughout our application

![Untitled](Untitled%2015.png)

![Untitled](Untitled%2016.png)

- Next, a new game is created. We create this game using the *[“Builder Pattern”](https://www.dofactory.com/javascript/design-patterns/builder)* (learned from book, [Node.js Design Patterns](https://www.amazon.com/Node-js-Design-Patterns-production-grade-applications/dp/1839214112)) in our *[game.helpers.game-template.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-helpers/game.helpers.game-template.js)* file*.*
    
    This design pattern helps us to separate the different components of a game for flexibility and simplicity in building our game. 
    
    When we create a game in the *[game.features.createNewGame.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-features/game.features.createNewGame.js),* we can create it with our simple, easy to read design pattern as shown in lines 17-20.
    

![Untitled](Untitled%2017.png)

![Untitled](Untitled%2018.png)

### **Starting after a user submits a guess at #7, we start our game functionality from #8-10…**

In the *[game.runGame.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-features/game.runGame.js)* we bring in our main game logic from our [*game.runGame.functions.js*](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-features/game.runGame.functions.js) file below. 

![Untitled](Untitled%2019.png)

At line 8, we make a function called *[“currentGameFunction”](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-features/game.runGame.functions.js#L8)* that takes in data from the request body. This function takes in 5 parameters from the request body…

- currentGamesRequestBodyID
- currentRandomNumberFromRequestBody
- guessFromRequestBody
- theCurrentGamesMode
- currentUsersData

At line 13, we use a [JavaScript while loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) that continues to run as long as our user hasn’t won the game or reached the limit of the number of allowed rounds. 

At line 14, we run a function that evaluates our users guess attempts in the [evaluateGuess.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-features/game.features.evaluateGuesses.js) file pictured below.

This function counts the total number of correct digits & digit locations that our user guessed

![Untitled](Untitled%2020.png)

![Untitled](Untitled%2021.png)

At line 15, we update the games data in our *[“updateCurrentGameData”](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-helpers/game.helpers.functions.js#L100)* function. This function adds points to the games and rounds based on the mode that the user is playing the game in.

![Untitled](Untitled%2022.png)

From lines 21-28 we handles cases where [our user wins a game](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-helpers/game.helpers.functions.js#L44) or reaches the [limit of allowable rounds](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-helpers/game.helpers.functions.js#L37).