const {UpdateUsersCountsAfterSuccessfulRegistration} = require('../../functions/registration.admin')
const {registration} = require("../../functions/event-emitters");
console.log('hey');

const doUpdateUsersCountsAfterSuccessfulRegistration = async () => {
  registration.on("update_admin", function () {
    UpdateUsersCountsAfterSuccessfulRegistration();
  })
};

doUpdateUsersCountsAfterSuccessfulRegistration();

module.exports = {doUpdateUsersCountsAfterSuccessfulRegistration}