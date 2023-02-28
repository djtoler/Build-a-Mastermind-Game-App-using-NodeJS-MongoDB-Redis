# Login: Our Login component is the 2nd component on the first page a user lands on. This, along with the registration component, was built as a means of capturing and analyzing user and game data.

For example, when after a visitor registers, a user profile is built for them based on their registration input

![Untitled](Untitled%204.png)

When a user logs into the application, their user data is updated and game playing activity is tracked and updated as well.

To implement this feature we make a few functions to help log a user into our application and write their data to a database.

We do this in our [login.functions.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/login/login.functions.js) file

At line 8, we write our first function called [“*validateVisitorLoginInput”*](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/login/login.functions.js#L8).

![Untitled](Untitled%205.png)

This function uses [conditional statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) to validate a users input to make sure they enter all the required info in the login form. Passwords and emails are required and should be a certain length

If any point of the validation process fails, the **isValidLoginInput** variable is set to false and the function returns a [failure response](https://github.com/djtoler/v1-mern/blob/main/server/functions/login/login.helpers.js)

If all of the inputs are valid, we set the **isValidLoginInput** variable to true, return it and move to the next function.

Next, we write our function called “[*verifiyVisitorLoginCredentials](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/login/login.functions.js#L31)”*.

![Untitled](Untitled%206.png)

This function takes the email input and searches for that email in whatever database we’re currently using as seen at line 33. 

We use [“Dependency Injection”](https://en.wikipedia.org/wiki/Dependency_injection) to keep our database implementation flexible as the analytics component of our application is refined and to keep our business logic is separate from our database logic.

Once more, we use a [conditional statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) to return a failure message if no matching email is found… or we’ll return the users profile if it is

Our 3rd function at line 42 is called *“[authenticateVisitorLoginCredentials](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/login/login.functions.js#L42)”*.

![Untitled](Untitled%207.png)

We authenticate our user by checking the password they entered against the password stored for that user profile.

If it doesn’t match, we return an error message, if it does, we return a success object.

![Untitled](Untitled%208.png)

Finally our last function is called “[*authorizeUserToStartGame](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/login/login.functions.js#L61)”*.

![Untitled](Untitled%209.png)

From lines 62 to 71, we set the return values of all 3 of the previous functions and our current database implementation to variables and return the results.

This function is then exported to be used in [cache.user.login.js](https://github.com/djtoler/v1-mern/blob/main/server/cache/cache.user.login.js) file.

In the cache.user.login file at line 7, we run a function called **findUserFromLoginInCache** that attempts to find a user from our in memory cache engine (Redis) before attempting to find the user from our database.

![Untitled](Untitled%2010.png)

Line 8-10 we validate the users input with a simple conditional statement. If the input is validated, we move forward

Line 13-14 we initialize out cache engine and and run a [**“GET” function**](https://redis.io/commands/get/) to attempt to find the user in memory.

If we find the user in the cache, we return the user data profile.

If we don’t find the user in memory, we run the  *”[authorizeUserToStartGame](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/login/login.functions.js#L61)*”. 

If a user is returned from that function, we first set the users data in memory for future use using the [**“SET” function**](https://redis.io/commands/set/).

Finally the *“[authorizeUserToStartGame](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/login/login.functions.js#L61)”* function returns the user from our current database and we export our *“[findUserFromLoginInCache](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/cache/cache.user.login.js#L7)”*

Our *“[findUserFromLoginInCache](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/cache/cache.user.login.js#L7)*” function is required in our user controller in the [controller.users.login file](https://github.com/djtoler/v1-mern/blob/main/server/api/controllers/controller.users.login.js).

![Untitled](Untitled%2011.png)

At line 5, we make a function called *[“runUserLoginService”](https://github.com/djtoler/v1-mern/blob/main/server/api/controllers/controller.users.login.js).*  

We bring in a users email address and password from the request body and pass them to our  *findUserFromLoginInCache* function .

The results are returned in a JSON response at line 8 and the function is exported.

Finally the function is exported and required on our [routes/user.js](https://github.com/djtoler/v1-mern/blob/main/server/api/routes/users.js) file which is located in our **server/api/routes** module, where it waits for a post request from out client side.

![Untitled](Untitled%2012.png)