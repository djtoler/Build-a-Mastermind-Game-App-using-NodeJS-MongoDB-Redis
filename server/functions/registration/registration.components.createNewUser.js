const currentDatabaseInUse = require("../../databases/settings/database.currentdatabase");
const { userCreationHelpers } = require("./registration.helpers");
const generate_token = require("../../config/token");
const cloudinary = require("cloudinary").v2;


const createAndReturnNewUser = async (image, name, email, password, token) => {
  const uploadedImage = await cloudinary.uploader
    .upload(
      image,
      userCreationHelpers.userProfilePictureSettings,
      userCreationHelpers.returnImage
    )

    .then(async (uploadedImage) => {
      let currentDatabase = async () => await currentDatabaseInUse();
      console.log(await currentDatabase());
      let getCurrentDatabase = await currentDatabase()
      const user = await getCurrentDatabase.createNewUser(  name,  email,  password,  uploadedImage);
    });
  
    let currentDatabase1 = async () => await currentDatabaseInUse();
    // console.log(await currentDatabase());
    let getCurrentDatabase1 = await currentDatabase1()
    const newUserCreated = await getCurrentDatabase1.getUser(email);

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

module.exports = createAndReturnNewUser;
