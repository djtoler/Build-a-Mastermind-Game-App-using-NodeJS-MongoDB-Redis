const asyncHandler = require("express-async-handler");
const currentDatabaseInUse = require("../../databases/settings/database.currentdatabase");
const generate_token = require("../../config/token");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
const { loginValidationHelpers } = require("./login.helpers");

const validateVisitorLoginInput = asyncHandler(async (email, password) => {
  let isValidLoginInput = null;

  if (!email || !password) {
    isValidLoginInput = false;
    return {  isValidLoginInput,  incompleteFields: loginValidationHelpers.incompleteFields};
  }

  if (email.length < 8) {
    isValidLoginInput = false;
    return {  isValidLoginInput,  emailTooShort: loginValidationHelpers.emailTooShort,};
  }

  if (password.length < 4) {
    isValidLoginInput = false;
    return {  isValidLoginInput,  passwordIncorrect: loginValidationHelpers.passwordIncorrect,};
  }

  isValidLoginInput = true;

  return isValidLoginInput;
});

const verifiyVisitorLoginCredentials = async (  currentDatabase,  email,  password) => {
  let isValidUserEmail = null;
  const user = await currentDatabase.getUser(email);

  if (!user) {isValidUserEmail = false;
    return { isValidUserEmail,  couldntFindUser: loginValidationHelpers.couldntFindUser};}
  return user;
};

const authenticateVisitorLoginCredentials = async (user, password) => {
  let isAuthenticated = false;

  const passwordEnteredByUser = password;

  const actualUserPassword = user.password 

  if (passwordEnteredByUser != actualUserPassword) {
    return {  isAUthenticated: isAuthenticated,  passwordIncorrect: loginValidationHelpers.passwordIncorrect,};
  }

  isAuthenticated = true;

  const userAuthenticationSuccessful = { isAuthenticated: isAuthenticated,  user: user,  token: generate_token(user._id),  loginSucceded: loginValidationHelpers.successfulLogin,};

  console.log("from db", loginValidationHelpers.successfulLogin);
  return userAuthenticationSuccessful;
};

const authorizeUserToStartGame = async (email, password) => {
  const runUserValidation = await validateVisitorLoginInput(email, password);
  if (runUserValidation.isValidLoginInput == false) { return;}
  let currentDatabase = await currentDatabaseInUse();
  let runUserVerification = await verifiyVisitorLoginCredentials(  currentDatabase,  email,  password);
  const user = runUserVerification;
  const isAuthorizedUser = await authenticateVisitorLoginCredentials(  user,  password);
  return isAuthorizedUser;
};

module.exports = { validateVisitorLoginInput, authorizeUserToStartGame };
