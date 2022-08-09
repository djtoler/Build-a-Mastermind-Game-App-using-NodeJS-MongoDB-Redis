const express = require('express');
const admin = express.Router();
const { doUpdateUsersCountsAfterSuccessfulRegistration } = require('../../admin/events/admin.registration.events')
const {doAutomatedRegistrationDataUpdater} = require('../../admin/scheduler/admin.registration.scheduler')

admin.use('/update-admin', (req, res) => {
    doUpdateUsersCountsAfterSuccessfulRegistration();
    doAutomatedRegistrationDataUpdater();
})



module.exports = admin;