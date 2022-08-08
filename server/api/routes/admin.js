const express = require('express');
const admin = express.Router();
const { doUpdateUsersCountsAfterSuccessfulRegistration } = require('../../admin/events/admin.registration.events')

admin.use('/update-admin', (req, res) => {
    doUpdateUsersCountsAfterSuccessfulRegistration();
})



module.exports = admin;