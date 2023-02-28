# Super Easy: When the game is played in “superEasy” mode…

**SuperEasy:** When the game is played in “Super Easy” mode, a user is provided 4 pictures. Each picture contains a related [idiom](https://en.wikipedia.org/wiki/Idiom) as a caption. 

The pictures are used as a representation of each digit in the random 4-digit number sequence. 

![MM-superEasy](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superEasy.PNG)

For example, in the picture above, the random 4-digit number generated was 4616 and there's an accompanying photo representation for each digit in the 4616 number sequence.

![MM-superEasy1](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superEasy1.png)

To implement this feature, we use the [Redis cache engine](https://redis.io/docs/about/) to store the images in memory for optimizing speed of retrieval using the base64 encoding of the image since Redis doesn't actually store image files.

3 different images are stored for each possible digit and selected at random to send to the user when they request a hint. This is done by assigning a related digit plus a tracking digit to each Redis data key.

For example, since the images in the the photo above are related to digits 4, 6, 1, & 6,  our Redis data keys would look like this…

```jsx
4 = hintData_42 //Image is related to digit 4 and is the 2nd image uploaded related to digit 4
6 = hintData_61 //Image is related to digit 6 and is the 1st image uploaded related to digit 6
1 = hintData_12 //Image is related to digit 1 and is the 2nd image uploaded related to digit 1
6 = hintData_61 //Image is related to digit 6 and is the 1st image uploaded related to digit 6
```

When returning data keys in the Redis CLI, you can see our data keys are built using the above format. “hintData”, followed by an “_”, followed by *the digit that related to an image* and *a digit representing the number of images stored for that digit*.

![MM-superEasy2](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superEasy2.png)

After the data keys are stored, hint images are retrieved using 3 small functions in the game.hints.superEasy.js file.

---

![MM-superEasy3](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superEasy3.png)

The 1st function starting at line 3 is called **[“randomImageIDSelector”](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.superEasy.js#L3)**. 

It returns a random number between 1 and 3 (the total number of images stored for a digit).

---

![MM-superEasy4](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superEasy4.png)

---

The 2nd function is called **[“returnRandomHintImageKeysFromCache**”](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.superEasy.js#L8).  

This function takes 2 parameters. 

The ***“numberOfRandomDigitsToLoopThrough***” as the total number of images available for a particular digit. 

The ***“currentGamesRandomNumber*”** is passed down to this function from the [random number generated to start a game](https://github.com/djtoler/v1-mern/blob/main/server/functions/game-features/game.features.getRandomNumber.js)

We store the ***“randomImageIDSelector”*** function in a variable at line 14 to return a random number, then run a while loop at line 15. Each iteration of this loop will build a set of data keys that will be used to retrieve images from Redis.

Line 17 shows how we use concatenation to piece together the data key. 

We start with “hintData_” as a string. 

Next, we use [JavaScripts built-in **“charAt()**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)” function to sequentially target each digit from the ***“currentGamesRandomNumber*”** parameter. 

Finally, we concat the return value of **“imageIDReferenceNumberToSelectARandomImage”** onto the end of the string and we get a Redis key in the same format we’ve been working with thus far.

For example…

```jsx
"hintData_ + ***currentGamesRandomNumber.*[charAt(i)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) + imageIDReferenceNumberToSelectARandomImage**
= hintData_61

```

The concatenated strings are assigned as index values for the “***arrayUsedAsCachedKeyStringValue”*** array. 

At line 19, we run a  [“GET” command](https://redis.io/commands/get/) on our Redis client and sequentially pass it the current index value of the “***arrayUsedAsCachedKeyStringValue”*** array and push the result of that into another array called “***arrayHoldingNewlyGeneratedCachedImageObjects***”.   

Finally on line 22 after loop finishes, our function returns the “***arrayHoldingNewlyGeneratedCachedImageObjects***” array that we pushed the random Redis keys intro.

![MM-superEasy5](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-superEasy5.png)

The 3rd function in this file is called **[“returnSuperEasyHints”.](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/game-hints/game.hints.superEasy.js#L21)**  

This function also takes the same 2 parameters as the 2nd function because we will call that 2nd function inside this one, so that we can return and access that array we stored our Redis keys in.

The first thing we do is store the return value (array of Redis keys) of that function in a variable called “***arrayOfRandomHintImageKeys”*** at line 27 and initialize an empty array. 

At line 32, we use a forEach() method to loop through and create objects out of the Redis keys stored in the “***arrayOfRandomHintImageKeys”.*** 

We push these objects into the empty array we initialize at line 30 and finally, we return the results in an data structure that we use throughout the application when responding to hint requests from the server.