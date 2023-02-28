# Hard: When the game is played in ”Hard” mode…

Hard**:** When the game is played in “Hard” mode, a user is provided with a number to help them figure out what the random number is. 

That number is either the 1/2, doubled or the cubed value of the random number

![MM-hard](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-hard.PNG)

For example, in the picture above, the number sent to the user is 12544. 

- The 1/2 value = **6272**
- The doubled value = **25088**
- The cubed value = **19738227000000**

Our user has 10 seconds to guess the value of the random number before they lose the game and the page reloads

![MM-hard1](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-hard1.PNG)

This feature is implemented in the code below.

In the ***“game.helpers.functions.js”*** file, at line 9 we initialize a function called, [***“returnDigitCalculations”***](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-helpers/game.helpers.functions.js#L9) . Our function takes 2 parameters and immediately returns an object called *“digitCalculations”*. 

The keys of the object properties are numbers so that a function can be ran on the object to return a random object property.

- The first object property divides the value of the *“currentRandomNumber”* parameter in half.
- The second object property multiplies the *“currentRandomNumber”* parameter by 2.
- The third object property cubes the *“currentRandomNumber”.*

![MM-hard2](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-hard2.PNG)

We then export and require it in the ***“game.hints.hard.js”*** file. 

At line 3 we initialize a random number generator function and use it to select a random property from our  *“digitCalculations” object.*

At line 7, we initialize a function called *[“returnHardHints”](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.hard.js#L5)* . 

This function stores the return value of the [***“returnDigitCalculations”](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-helpers/game.helpers.functions.js#L9)*** function we required in this file in a variable called *“digitCalculations”*. 

We use the “*returnRandomIndex”* function to get a random index from the keys of *“digitCalculations” object.* 

The length of the keys of the *“digitCalculations” object* is determined accessing the length property of the [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method . 

The final result of the code is the value in *“digitCalculations” object* at the random index.