const cron = require('node-cron');
const {AutomatedNightlyRefreshOfRegistrationCounts} = require('../../functions/registration.admin')
console.log('in reg cron');

const doAutomatedRegistrationDataUpdater = () => {
    cron.schedule('*/10 * * * * *',  async () => {
        console.log('in reg cron schedule');
        AutomatedNightlyRefreshOfRegistrationCounts()
    })
}
// doAutomatedRegistrationDataUpdater();
module.exports = {doAutomatedRegistrationDataUpdater}