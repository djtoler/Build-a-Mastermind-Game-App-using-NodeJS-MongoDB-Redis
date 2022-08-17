const { validation_helpers, user_creation_helpers, dl_NotAlreadyRegistered, dl_CreateNewUser, dl_ReturnNewlyCreatedUser} = require("./registration.helpers");
const cloudinary = require("cloudinary").v2;
const generate_token = require("../config/token");


const input_validation = async (array, name, email, password, confirmPassword) => {
  array = Array.from(array);
  if (!name || !email || !password || !confirmPassword) {
    array.push({ msg: validation_helpers.incompleteFields });
  }
  if (password != confirmPassword) {
    array.push({ msg: validation_helpers.passwordMismatch });
  }
  if (typeof password == "string" && password.length < 4) {
    array.push({ msg: validation_helpers.passwordTooShort });
  }
  const userExists = await dl_NotAlreadyRegistered(email);
  if (userExists) {
    array.push({ msg: validation_helpers.userAlreadyExists });
  }
  console.log("end of input checks");
  if (array.length > 0) {
    console.log(array[0].msg);
  } 
  return {
    array,
    name,
    email,
    password,
    confirmPassword,
  };
};

const createAndReturnNewUser = async (image, name, email, password, token) => {

  const uploadedImage = await cloudinary.uploader.upload(image, user_creation_helpers.user_profile_image_settings, user_creation_helpers.return_image)
    .then(async (uploadedImage) => {
      const user = await dl_CreateNewUser(name, email, password, uploadedImage);
      user.save();
      if (!user) {console.log("no user")}});
  const newUserCreated = await dl_ReturnNewlyCreatedUser(email);
  
  return {
    newUser: newUserCreated,
    token:generate_token(newUserCreated._id),
    registrationSucceded: user_creation_helpers.registrationSucceded,
    registrationFailed: user_creation_helpers.registrationFailed,
  };

};

module.exports = {
  input_validation,
  createAndReturnNewUser,
};