const User = require("../databases/mongodb/user-model")
// const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const errors_array = [];

const validation_helpers = {
    incompleteFields : { title: "Please fill out all fields", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    passwordMismatch : { title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    passwordTooShort : { title: "Password must be at least 4 characters", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    userAlreadyExists : { title: "User already exists", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    registration_error : { title: "Error registering, try again", status: "warning", duration: 9000, isClosable: true, position: "bottom" },
    successful_registration : { title: "Registration Successful", status: "success", duration: 9000, isClosable: true, position: "bottom" }
};

const user_creation_helpers = {
    registrationSucceded : validation_helpers.successful_registration,
    registrationFailed : validation_helpers.registration_error,
    user_profile_image_settings : {upload_preset: 'mm-game', allowed_formats : ['png', 'jpg', 'svg', 'ico', 'jfif', 'webp']},
    return_image: function(error, result) {error ? console.log(error) : console.log(result)}
};

const dl_NotAlreadyRegistered = async (email) => {
    const userExists = await User.findOne({ email });
    if (userExists != null) {
      return userExists;
    }
};
  
const dl_CreateNewUser = async (name, email, password, uploadedImage) => {
    let picture = uploadedImage.public_id; 
    const user = await User.create({ name, email, password, picture });
    console.log(user.password);
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    const encryptedString = cryptr.encrypt(user.password);
    user.password = encryptedString
    console.log(user.password);
    console.log(user);
    return user;
};
  
const dl_ReturnNewlyCreatedUser = async (email) => {
    const new_user = await User.findOne({ email: email });
    
    console.log("from datalayer3", new_user);
    return new_user;
};

const daily_registered_users_obj = {
    new_users_today: 0, 
    date: new Date(Date.now()).toString()
}

const weekly_registered_users_obj = {
    new_users_this_week: 0,
    date: new Date(Date.now()).toString()
};

module.exports = {
    validation_helpers,
    errors_array,
    user_creation_helpers,
    daily_registered_users_obj,
    weekly_registered_users_obj,
    dl_ReturnNewlyCreatedUser,
    dl_CreateNewUser,
    dl_NotAlreadyRegistered,
}