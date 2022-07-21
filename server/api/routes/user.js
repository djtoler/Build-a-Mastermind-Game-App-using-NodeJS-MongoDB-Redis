const express = require('express');
const {registerUser, authUser, upload_profile_picture} = require('../controllers/user-controllers');
// const {protect} = require('../middleware/middleware');
const users = express.Router();

users.post('/upload-profile-picture', upload_profile_picture);
users.post('/register', registerUser);
users.post('/login', authUser);

module.exports = users;