const Admin = require("../models/admin-model");
const cron = require("node-cron");
const { setTotalUsersToUsersArrayLength, updateTodaysNewUserCount, weeklyUserRegistrationUpdate, dailyUserRegistrationUpdate} = require("./registration.admin.helpers");

const UpdateUsersCountsAfterSuccessfulRegistration = async () => {
  setTotalUsersToUsersArrayLength();
  updateTodaysNewUserCount();
};

async function AutomatedNightlyRefreshOfRegistrationCounts() {
  const admin = await Admin.findOne({ id: "main" });
  admin.weekly_tracker <= 9
    ? dailyUserRegistrationUpdate()
    : weeklyUserRegistrationUpdate();
}

module.exports = {
  UpdateUsersCountsAfterSuccessfulRegistration,
  AutomatedNightlyRefreshOfRegistrationCounts,
};
