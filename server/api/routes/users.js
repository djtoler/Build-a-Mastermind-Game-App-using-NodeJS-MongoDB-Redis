const express = require("express");
const users = express.Router();

const runUserRegistrationService = require('../controllers/controller.users.registration')
const runUserLoginService = require('../controllers/controller.users.login')
const runUserLogoutService = require('../controllers/controller.users.logout')

users.post("/register", runUserRegistrationService);
users.post("/login", runUserLoginService);
users.get("/logout", runUserLogoutService);










// users.get("/logout", logoutUser);
// users.post("/login", authUser);
(module.exports = users)
