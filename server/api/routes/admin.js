const express = require("express");
const admin = express.Router();
const path = require('path');
const {doUpdateUsersCountsAfterSuccessfulRegistration} = require("../../admin/events/admin.registration.events");
const {doAutomatedRegistrationDataUpdater} = require("../../admin/scheduler/admin.registration.scheduler");
const {doUpdateGameDataAfterSuccessfulGuess} = require("../../admin/events/admin.evaluateGuess.events")
const uploadImages = require("../../cache/cache.uploadImage");
const setImageFilePath = require("../../cache/cache.uploadImage")
const storeHintImagesInRedis = require("../../cache/cache.uploadImage");
const returnNewAdmin = require('../../admin/admin.template')

admin.use("/update-admin", (req, res) => {
  doUpdateUsersCountsAfterSuccessfulRegistration();
  doAutomatedRegistrationDataUpdater();
  doUpdateGameDataAfterSuccessfulGuess();
});

admin.post("/upload-image-redis", (req, res) => {
  const imagePath = "/" + req.body.imageName + ".jpg";
  const filePath = path.join(__dirname, imagePath);
  uploadImages(req, filePath).then((path) => {res.send({ status: "success", path })})
});

module.exports = admin;
