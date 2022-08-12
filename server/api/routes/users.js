const express = require("express");
const {
  registerUser,
  authUser,
  upload_profile_picture,
  logoutUser,
} = require("../controllers/user-controllers");

const {
  runIsUserValidated,
  runCreateAndReturnNewUser
} = require("../../functions/registration.route.helpers");

const { errors_array } = require("../../functions/registration.helpers");
const users = express.Router();
const { registration } = require("../../functions/event-emitters");
module.exports = registration;


users.post("/upload-profile-picture", async (req, res) => {
  const { image, name, email, password, confirmPassword } = req.body;

  const validationFailed = await runIsUserValidated(errors_array, name, email, password, confirmPassword);
  if (validationFailed) {return res.json(validationFailed)}
  
  const userCreated = await runCreateAndReturnNewUser(image, name, email, password) 
  userCreated.newUser ? res.json({msg: userCreated.registrationSucceded, newUser: userCreated.newUser, token: userCreated.token}) : res.json({msg: userCreated.registrationSucceded})

  registration.emit("update_admin");

});




users.post("/register", registerUser);


users.post("/login", authUser);










users.get("/logout", logoutUser);

(module.exports = users), registration;
