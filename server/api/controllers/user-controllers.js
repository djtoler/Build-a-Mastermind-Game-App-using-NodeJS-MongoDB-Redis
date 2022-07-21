const asyncHandler = require("express-async-handler");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const User = require("../../models/user-model");
const generate_token = require("../../config/token");
const cloudinary = require("cloudinary").v2;
const options = {expires: new Date(Date.now) + 3000}

// class ToastResponse {
//   isClosable = true
//   constructor(title, status, duration, position) {
//     this.title = title;
//     this.status = status;
//     this.position = position
//   }
//   get_toast_response() {
//     return {title: this.title, status: this.status, duration: this.duration, position: this.position}
//   }
// }

// const password_mismatch = new ToastResponse9("Please fill out all fields", "warning", 9000, "bottom" )
// console.log(password_mismatch.get_toast_response());

let incompleteFields = { title: "Please fill out all fields", status: "warning", duration: 9000, isClosable: true, position: "bottom" };
let passwordMismatch = { title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" };
let passwordTooShort = { title: "Password must be at least 4 characters", status: "warning", duration: 9000, isClosable: true, position: "bottom" };
let userAlreadyExists = { title: "User already exists", status: "warning", duration: 9000, isClosable: true, position: "bottom" };
let registration_error = { title: "Error registering, try again", status: "warning", duration: 9000, isClosable: true, position: "bottom" };
let successful_registration = { title: "Registration Successful", status: "success", duration: 9000, isClosable: true, position: "bottom" };
let errors;

const upload_profile_picture = asyncHandler (async (req, res) => {
  const {image, name, email, password, confirmPassword} = req.body;
  errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: incompleteFields });
  }
  if (password != confirmPassword) {
    errors.push({ msg: passwordMismatch });
  }
  if (password.length < 4) {
    errors.push({ msg: passwordTooShort });
  }
  const userExists = await User.findOne({ email });
    if (userExists) {
      errors.push({msg: userAlreadyExists})
    }
  if (errors.length > 0) {
    return res.json({errors, name, email, password, confirmPassword});
  }
  const uploadedImage = await cloudinary.uploader.upload(image,
    {upload_preset: 'mm-game', allowed_formats : ['png', 'jpg', 'svg', 'ico', 'jfif', 'webp']},
      function(error, result) {
        if(error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
  ).then(async (uploadedImage) => {
    console.log('check');
    console.log(uploadedImage);
    let picture = uploadedImage.public_id
    const user = await User.create({ name, email, password, picture });
    try {
      if (user) {
        console.log(user);
        res.status(201).json({msg: successful_registration, id: user._id, name: user.name, email: user.email, picture: user.picture, token: generate_token(user._id)});
      } 
    } 
    catch(err) {
      res.json({msg: registration_error})
      console.log(err);
      }
  })
});

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
    const {email, password} = req.body;

    const user = await User.findOne( {email} );
    console.log(user);

    if (user && (await user.matchPassword)) {
        console.log("in pw match");
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generate_token(user._id)
        });
    }
    else {
      console.log("failed");
    }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.status(200).redirect('http://localhost:3000/');
})

module.exports = { registerUser, authUser, upload_profile_picture, logoutUser };