// const Admin = require("../models/admin-model");
// let total_new_users_d = 0;
// let total_new_users_w = 0;
// let last_weeks_total = 0;

// const update_avg_daily_new_users = (registration_count) => {
//     const admin = await Admin.findOne({id:'main'});
//     let avg_daily_new_users;
//     total_new_users_d = total_new_users_d + registration_count;
//     avg_daily_new_users = total_new_users_d / admin.total_new_users_weeklly.length
//     return avg_daily_new_users;
// }

// const set_new_users_this_week = () => {
//     // chnage this week to last week
//     const admin = await Admin.findOne({id:'main'});
//     let last_7_days = admin.total_new_users_daily.slice(-7);
//     let last_week_avg;
//     last_7_days.forEach(day => {
//         last_weeks_total = last_weeks_total + day.new_users_today;
//     });
//     last_week_avg = last_weeks_total / last_7_days.length
//     return last_week_avg;
// }

// const get_avg_weekly_new_users = (registration_count) => {
//     const admin = await Admin.findOne({id:'main'});
//     let avg_weekly_new_users;
//     total_new_users_w = total_new_users_w + registration_count;
//     avg_weekly_new_users = total_new_users_w / admin.total_new_users_weekly.length
//     return avg_weekly_new_users;
// }

