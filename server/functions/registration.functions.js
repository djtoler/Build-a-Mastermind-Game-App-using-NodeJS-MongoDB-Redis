const {
  validation_helpers,
  userCreationHelpers,
  dl_NotAlreadyRegistered,
  dl_CreateNewUser,
  dl_ReturnNewlyCreatedUser,
} = require("./registration.helpers");
const cloudinary = require("cloudinary").v2;
const generate_token = require("../config/token");

const input_validation = async (
  array,
  name,
  email,
  password,
  confirmPassword
) => {
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

  return { array, name, email, password, confirmPassword };
};

const createAndReturnNewUser = async (image, name, email, password, token) => {
  const uploadedImage = await cloudinary.uploader
    .upload(
      image,
      userCreationHelpers.userProfilePictureSettings,
      userCreationHelpers.returnImage
    )
    .then(async (uploadedImage) => {
      const user = await dl_CreateNewUser(name, email, password, uploadedImage);
      user.save();
    });

  const newUserCreated = await dl_ReturnNewlyCreatedUser(email);

  async function passwordMatch(enteredPassword) {
    const match2 = await bcrypt.compare(
      enteredPassword,
      newUserCreated.password
    );
    console.log(
      enteredPassword,
      " input <-------------> hash",
      newUserCreated.password
    );
    console.log(match2);
    return match2;
  }

  return {
    newUser: newUserCreated,
    token: generate_token(newUserCreated._id),
    passwordMatch: passwordMatch,
    registrationSucceded: userCreationHelpers.registrationSucceded,
    registrationFailed: userCreationHelpers.registrationFailed,
  };
};

module.exports = {
  input_validation,
  createAndReturnNewUser,
};
