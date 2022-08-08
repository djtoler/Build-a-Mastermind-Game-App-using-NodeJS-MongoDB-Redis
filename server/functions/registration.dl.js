// const User = require("../models/user-model");
// const Admin = require("../models/admin-model");
// const cron = require("node-cron");

// const dl_NotAlreadyRegistered = async (email) => {
//   const userExists = await User.findOne({ email });
//   if (userExists != null) {
//     return userExists;
//   }
// };

// const dl_CreateNewUser = async (name, email, password, picture) => {
//   const user = await User.create({ name, email, password, picture });
//   console.log(user);
//   return user;
// };

// const dl_ReturnNewlyCreatedUser = async (email) => {
//   const new_user = await User.findOne({ email: email });
//   console.log("from datalayer3", new_user);
//   return new_user;
// };

// const AutomatedNightlyRefreshOfRegistrationCounts = async () => {

//     async function addusers () {
//         const admin = await Admin.findOne({id: 'main'})

//         let id = admin.total_new_users_daily[admin.total_new_users_daily.length -1]._id
//         admin.total_new_users_daily.id(id).new_users_today = admin.total_new_users_daily.id(id).new_users_today + 10
//         await admin.save();
//         console.log('worked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
//         console.log('latest-new_users_count', admin.total_new_users_daily[admin.total_new_users_daily.length -1].new_users_today);
//     }

//     console.log('bottom');
//     cron.schedule('*/10 * * * * *',  async () => {refresh_daily_users_count()})
//     // cron.schedule('*/11 * * * * *',  async () => {addusers()})
// }

// AutomatedNightlyRefreshOfRegistrationCounts();

// module.exports = {
//   dl_NotAlreadyRegistered,
//   dl_CreateNewUser,
//   dl_ReturnNewlyCreatedUser,
// };
