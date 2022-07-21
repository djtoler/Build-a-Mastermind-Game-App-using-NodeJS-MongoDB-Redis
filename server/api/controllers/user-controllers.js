const asyncHandler = require("express-async-handler");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const User = require("../../models/user-model");
const generate_token = require("../../config/token");
const cloudinary = require("cloudinary").v2;

const upload_profile_picture = asyncHandler (async (req, res) => {
  const {image} = req.body
  const uploadedImage = await cloudinary.uploader.upload(image,
    {
      upload_preset: 'mm-game',
      allowed_formats : ['png', 'jpg', 'svg', 'ico', 'jfif', 'webp']
    },
      function(error, result) {
        if(error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
  )
  try {
    if(uploadedImage) {
      res.status(200).json(uploadedImage)
    }
  } 
  catch(err) {
          console.log(err);
        }

});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, uploadedImg } = req.body;
  let incompleteFields = 'toast({ title: "Please fill out all fields", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  let passwordMismatch = 'toast({ title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  let passwordTooShort = 'toast({ title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  let registration_error = 'toast({ title: "Error registering, try again", status: "warning", duration: 9000, isClosable: true, position: "bottom" })';
  let successful_registration = 'toast({ title: "Registration Successful", status: "success", duration: 9000, isClosable: true, position: "bottom" })';
  let errors = [];
  
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: incompleteFields });
  }
  if (password != confirmPassword) {
    errors.push({ msg: passwordMismatch });
  }
  if (password.length < 4) {
    errors.push({ msg: passwordTooShort });
  }
  if (errors.length > 0) {
    return res.json({errors, name, email, password, confirmPassword});
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password, uploadedImg });
  if (user) {
    res.status(201)
      .json({
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generate_token(user._id),
      });
    } 
  else {
    res.status(400);
    throw new Error("User not found");
  }
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
            token: generateToken(user._id)
        });
    }
    else {
      console.log("failed");
    }
})

module.exports = { registerUser, authUser, upload_profile_picture };