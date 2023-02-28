# Easy: When the game is played in “Easy” mode, a user is provided a range of numbers that contains…

**Easy:** When the game is played in “Easy” mode, a user is provided a range of numbers that contains the [random number generated to start a game](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-features/game.features.getRandomNumber.js) based on your guess attempts.

![Untitled](Untitled%203.png)

For example, if the random number is 5462 and your initial guess attempt is 6098, your hint will tell you to lower your guess number & that the random number is between 0 and 6097. 

If your next guess is 3554, your hint will tell you to make your guess number higher & let you know that the random number is between your last guess and your current guess .

To make this happen, we use a [binary search algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm)  learned from the [Common Sense Guide To Data Structures & Algorithms book](https://www.oreilly.com/library/view/a-common-sense-guide/9781680502794/) and encourage a user to guess a number in the middle of every number range they’re provided.  

We know that a binary search runs in [logarithmic time](https://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time). 

![https://www.doabledanny.com/static/08327c46dbd718a1d2c0c65bd05b801b/1.gif](https://www.doabledanny.com/static/08327c46dbd718a1d2c0c65bd05b801b/1.gif)

For our case, that means that if a user guesses a number that's near the middle of the provided number range, the total number of possible correct guess reduces to nearly 1/2 of however many possible correct guesses were available right before the  current guess was made.       

This will increase the odds of making a correct guess from about 1 in 10,000 attempts to 1 in 14 attempts, or [about **64,835%](https://www.gigacalculator.com/calculators/percent-increase-calculator.php?op=percent&original=0.00011&increase=&newvalue=0.07142857142).**

The following is our code implementation of this feature

![Untitled](Untitled%2041.png)

In line 5, we start building our function called “[returnEasyHints](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.easy.js#L5)”. 

This function generates a response that's sent to a user after every guess attempt, letting them know whether to guess higher or lower and the name range to guess from.

At lines 17 and 22, we make conditional statements. 

The first statement at line 17 checks if the user's guess is lower than the target number. If it is, the response tells the user to guess lower and gives the number range based on the binary search algorithm implementation.

The second statement at line 22 checks if the user's guess is higher than the target number. If it is, the response tells the user to guess higher and gives the number range based on the binary search algorithm implementation as well