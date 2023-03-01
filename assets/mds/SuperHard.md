# Super Hard: When the game is played in “Super Hard” mode…

Super Hard**:** When the game is played on “Super Hard” mode, our user is provided with a 13 digit number to help them figure out what the 4-digit random number is. 

Our 4-digit random number is hidden within a 13 digit hint number and our user has 10 seconds to make their guess.

![MM-superHard](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superHard.png)

For example… In the image above on the right side , our [randomNumber](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-features/game.features.getRandomNumber.js#L6) is “**3070**” and on the left side of the image, our 13 digit random hint number is “31979267**3070**4”. 

![MM-superHard1](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superHard1.png)


To implement this feature, we start out with [a function that generates a random number at line 1](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.superHard.js#L1). 

![MM-superHard2](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superHard2.png)

At line 5, we make another function called [hideRandomNumberBetweenTwoRandomNumbers](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.superHard.js#L5). This function takes 3 parameters…

- randomlyGeneratedNumber = 319792674 <—- this is the  number we’ll hid the random number inside
- randomPositionToPlaceRandomlyGeneratedNumbers  = 12 <— we will place our random number at position 9 of our randomlyGeneratedNumber , which is at position 12
- theCurrentGamesRandomNumberStringValue = 3070 (<—- this is the [currentGamesRandomNumber](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-features/game.features.getRandomNumber.js#L6))

This function returns a variable that combines the current games random number, placed at in a random position with and 2 other numbers.

The next function is called [returnSuperHardHints](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.superHard.js#L14). At line 20, this function calls the [hideRandomNumberBetweenTwoRandomNumbers](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.superHard.js#L5) and sets the value of its 3 parameters at lines 16-18.

The return value of that function is stored in a variable, converted to a number at line 24 using [JavaScripts builtin-in Number function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) and finally returned in our “hintEvaluation” option that we use throughout our application
