const User = require("../models/user-model");
const Admin = require("../models/admin-model");
const {daily_registered_users_obj, weekly_registered_users_obj} = require("./registration.helpers");

const setTotalUsersToUsersArrayLength = async () => {
    const admin = await Admin.findOne({ id: "main" });
    const users = await User.find({});
    admin.total_number_users = users.length;
    admin.save();
    console.log(users.length);
};

const updateTodaysNewUserCount = async () => {
    const admin = await Admin.findOne({ id: "main" });
    let mostRecentDailyRegisteredUsersObj = admin.total_new_users_daily[admin.total_new_users_daily.length - 1];
    mostRecentDailyRegisteredUsersObj.new_users_today++;
    mostRecentDailyRegisteredUsersObj.save({ suppressWarning: true });
};

const dailyUserRegistrationUpdate = async () => {
    const admin = await Admin.findOne({ id: "main" });
    
    let mostRecentDailyRegisteredUsersObjID = admin.total_new_users_weekly[admin.total_new_users_weekly.length - 1]._id;
    let dailyRegistrationCount;
    let dailyRegistrationArray = admin.total_new_users_daily;
    let currentWeeklyRegistrationCount = admin.total_new_users_weekly.id(mostRecentDailyRegisteredUsersObjID).new_users_this_week;
  
    currentWeeklyRegistrationCount = currentWeeklyRegistrationCount + dailyRegistrationCount;
    dailyRegistrationArray.push(daily_registered_users_obj);
    admin.weekly_tracker = admin.weekly_tracker + 1;
    admin.save();
};

const weeklyUserRegistrationUpdate = async () => {
    const admin = await Admin.findOne({ id: "main" });
    
    const restartFromDay1Plus1 = 2 
    let weekly_count_array = admin.total_new_users_weekly;

    admin.weekly_tracker = restartFromDay1Plus1; //the additional 1 is added when restarting weekly_tracker because dailyRegistrationArray keeps 1 empty obj inside at all time
    weekly_count_array.push(weekly_registered_users_obj);
    
    admin.total_new_users_daily[admin.total_new_users_daily.length - 1].save({suppressWarning: true});
    admin.total_new_users_daily.splice(1, admin.total_new_users_daily.length - 1);
    admin.save();
};

module.exports = {
    setTotalUsersToUsersArrayLength,
    updateTodaysNewUserCount,
    weeklyUserRegistrationUpdate,
    dailyUserRegistrationUpdate
}