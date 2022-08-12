const Admin = require("../databases/mongodb/admin-model");
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
