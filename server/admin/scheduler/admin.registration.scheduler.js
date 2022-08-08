const cron = require('node-cron');
const {AutomatedNightlyRefreshOfRegistrationCounts} = require('../../functions/registration.admin')

cron.schedule('*/10 * * * * *',  async () => {
    AutomatedNightlyRefreshOfRegistrationCounts()
})