const express = require("express");
const {
  registerUser,
  authUser,
  upload_profile_picture,
  logoutUser,
} = require("../controllers/user-controllers");
// const {protect} = require('../middleware/middleware');
const generate_token = require("../../config/token");
const {
  input_validation,
  createAndReturnNewUser,
} = require("../../functions/registration.functions");
const { errors_array } = require("../../functions/registration.helpers");
const users = express.Router();
const { registration } = require("../../functions/event-emitters");
module.exports = registration;

// users.post('/upload-profile-picture', upload_profile_picture);
users.post("/upload-profile-picture", async (req, res) => {
  const { image, name, email, password, confirmPassword } = req.body;

  const validation = await input_validation(errors_array, name, email, password, confirmPassword);
  if (validation.array.length > 0) {return res.json(validation.array[0])}

  const creation = await createAndReturnNewUser(image, name, email, password);
  const c_succeded = {msg: creation.user_created, id: creation.new_user._id, name: creation.new_user.name, email: creation.new_user.email, picture: creation.new_user.picture, token: generate_token(creation.new_user._id)};
  const c_failed = { msg: creation.user_not_created };
  creation ? res.json(c_succeded) : res.json(c_failed);

  registration.emit("update_admin");
});
users.post("/register", registerUser);
users.post("/login", authUser);
users.get("/logout", logoutUser);

(module.exports = users), registration;
