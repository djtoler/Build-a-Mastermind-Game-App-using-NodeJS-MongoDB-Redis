const {UpdateUsersCountsAfterSuccessfulRegistration} = require('../../functions/registration.admin')
const {registration} = require("../../functions/event-emitters");
console.log('hey');

const doUpdateUsersCountsAfterSuccessfulRegistration = async () => {
  console.log("hi_fromthefunc");
  registration.on("update_admin", function () {
    console.log("in here");
    UpdateUsersCountsAfterSuccessfulRegistration();
    console.log("done");
  })
};

doUpdateUsersCountsAfterSuccessfulRegistration();

module.exports = {doUpdateUsersCountsAfterSuccessfulRegistration}