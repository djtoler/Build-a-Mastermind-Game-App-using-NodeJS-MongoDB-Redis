# Registration: Our Registration component is the first component, on the first page a user lands on…

The registration component, along with the login component was built as a means of capturing and analyzing user and game data.

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg.png)

When a visitor fills out the registration form we capture their name, email address and password…then build a user profile for them with a profile picture included.

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg1.png)

The properties in the user profile object, such as alltime_games_played,  will be updated as our user continues to play them game.

![regds.PNG](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg2.png)

The first thing we do during the registration process is validate the users input.

The function we use to do this is called [“*verifyVisitorRegistrationCredentials”](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/registration/registration.components.validateUserInput.js#L3) [](https://github.com/djtoler/v1-mern/blob/main/server/functions/registration/registration.components.validateUserInput.js)*from the [registration.validateUserInput.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/registration/registration.components.validateUserInput.js#L3) file

From lines 6-16, we check that all fields on the registration form are filled out, the passwords meet the length requirements and that they match. 

If any of the input requirement conditions aren’t met that error and a corresponding error message is pushed into an a array and returned.

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg3.png)

Next at line 18, We check to see if a user with that same email address already exists. If they do, an error message is returned as well.

Otherwise, an object with the input information returned at 28.

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg4.png)

The next thing we do is create a new user in our [registration.createNewUser](https://github.com/djtoler/v1-mern/blob/main/server/functions/registration/registration.components.createNewUser.js) file.

At line 7, we make a function called “[*createAndReturnNewUser](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/functions/registration/registration.components.createNewUser.js#L7)”*.

The first thing we do is use [Cloudinary to upload an image](https://cloudinary.com/documentation/upload_images#api_example_1) that’ll be used for our users avatar… then we initiate our current database at line 11.

At line 14, we run the createNewUser function on our current database. 

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg5.png)

<aside>
💡 We use [“Dependency Injection”](https://en.wikipedia.org/wiki/Dependency_injection) to keep our database implementation flexible as the analytics component of our application is refined and to keep our business logic is separate from our database logic.

For example, when using [MongoDB](https://www.geeksforgeeks.org/mongoose-document-model-create-api/), our [createNewUser function](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/databases/mongodb/mongodb.js#L6) looks like this…

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg9.png)

</aside>

Next, at line 20, we run the getUser  function on our current database to verify that we’ve created our new user

Our function ends by making sure the passwords match, returning our new user along with a token, and a result message inside an object.

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg6.png)

In our [registration.function.js](https://github.com/djtoler/v1-mern/blob/main/server/functions/registration/registration.functions.js) file, we export these 2 functions and import them into our [controller.users.registration](https://github.com/djtoler/v1-mern/blob/main/server/api/controllers/controller.users.registration.js) file.

In our [controller.users.registration](https://github.com/djtoler/v1-mern/blob/main/server/api/controllers/controller.users.registration.js) file, we make a function called “[runUserRegistrationService](https://github.com/djtoler/v1-mern/blob/main/server/api/controllers/controller.users.registration.js)”. This function brings in the request body, which contains the data that the user inputs in the registration form.

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg7.png)

We take our 2 imported functions and store them in variables at lines 9 and 10.

The data from the request body is passed as params to those 2 functions .

At line 12, if the input data isn’t validated, we return a **validationFailed** JSON response object.

Next, we make a conditional statement that returns a **registrationSucceded** JSON ****object if the registration is successful and **registrationFailed** JSON object of the registration response failed.

We export our [“*runUserRegistrationService”*](https://github.com/djtoler/v1-mern/blob/8d536bb23cf1f59a736fba02426b111a5fd5e7aa/server/api/controllers/controller.users.registration.js#L6) and import it in our [users.js](https://github.com/djtoler/v1-mern/blob/main/server/api/routes/users.js) file (that’s located in our [server/api/routes](https://github.com/djtoler/v1-mern/tree/main/server/api/routes)  directory) and wait for a registration post request from our client.

![Untitled](https://github.com/djtoler/v1-mern/blob/main/assets/images/MM-reg8.png)