const asyncHandler = require("express-async-handler");
const User = require("../../databases/mongodb/user-model");
const Admin = require("../../databases/mongodb/admin-model");
const generate_token = require("../../config/token");
const cloudinary = require("cloudinary").v2;
// const {registration_validation} = require('../../functions/registration_functions');
const {validation_helpers} = require('../../functions/registration.helpers');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const registration = new MyEmitter();
module.exports = registration
let errors;

const upload_profile_picture = asyncHandler (async ({name, email, password, confirmPassword}) => {
  
  errors = [];
  // registration.emit('validate_input', async (name, email, password, confirmPassword) => {
  //   if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword) {
  //     errors.push({ msg: validation_helpers.incompleteFields });
  //   }
  //   if (req.body.password != req.body.confirmPassword) {
  //     errors.push({ msg: validation_helpers.passwordMismatch });
  //   }
  //   if (typeof req.body.password == "string" && req.body.password.length < 4) {
  //     errors.push({ msg: validation_helpers.passwordTooShort });
  //   }
  //   const userExists = await User.findOne({ email });
  //   if (userExists) {
  //     errors.push({ msg: validation_helpers.userAlreadyExists });
  //   }
  //   console.log(errors);
  // })

  // if (errors.length > 0) {return res.json({errors, name, email, password, confirmPassword})}

  // registration.on('create_user', async () => {
  //   const uploadedImage = await cloudinary.uploader
  //   .upload(image, {upload_preset: 'mm-game', allowed_formats : ['png', 'jpg', 'svg', 'ico', 'jfif', 'webp']},
  //     function(error, result) {error ? console.log(error) : console.log(result)})
  //   .then(async (uploadedImage) => {
  //     let picture = uploadedImage.public_id;
  //     const user = await User.create({ name, email, password, picture });
  //     user 
  //       ? res.status(201).json({msg: validation_helpers.successful_registration, id: user._id, name: user.name, email: user.email, picture: user.picture, token: generate_token(user._id)}) 
  //       : res.json({msg: validation_helpers.registration_error})
  //     }
  //   )
  // })

  // registration.emit('update_admin', async () => {
  //   console.log('tt update');
  // })

  // registration.on('validate_input');
  // registration.on('create_user');
  // registration.on('someEvent', )
})



const registerUser = asyncHandler(async (req, res) => {
  // const { name, email, password, confirmPassword, uploadedImg } = req.body;
  // let incompleteFields = 'toast({ title: "Please fill out all fields", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  // let passwordMismatch = 'toast({ title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  // let passwordTooShort = 'toast({ title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  // let registration_error = 'toast({ title: "Error registering, try again", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  // let successful_registration = 'toast({ title: "Registration Successful", status: "success", duration: 9000, isClosable: true, position: "bottom" })';
  // let errors = [];
  
  // if (!name || !email || !password || !confirmPassword) {
  //   errors.push({ msg: incompleteFields });
  // }
  // if (password != confirmPassword) {
  //   errors.push({ msg: passwordMismatch });
  // }
  // if (password.length < 4) {
  //   errors.push({ msg: passwordTooShort });
  // }
  // if (errors.length > 0) {
  //   return res.json({errors, name, email, password, confirmPassword});
  // }

  // const userExists = await User.findOne({ email });
  // if (userExists) {
  //   res.status(400);
  //   throw new Error("User already exists");
  // }
  // const user = await User.create({ name, email, password, uploadedImg });
  // if (user) {
  //   res.status(201)
  //     .json({
  //       id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       picture: user.picture,
  //       token: generate_token(user._id),
  //     });
  //   } 
  // else {
  //   res.status(400);
  //   throw new Error("User not found");
  // }
});


const authUser = asyncHandler(async (req, res) => {
    console.log("in  log route");
    const {email, password} = req.body; // move to api.routes

    const user = await User.findOne( {email} ); //move to login.helpers
    // console.log(user);

    if (user && (await user.matchPassword)) { //move to login.functions
        console.log("in pw match");
        res
        .status(200)
        .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generate_token(user._id)
        })
    }
    else {
      console.log("failed");
    }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.status(200).redirect('http://localhost:3000/');
})

module.exports = { registerUser, authUser, upload_profile_picture, logoutUser, registration };