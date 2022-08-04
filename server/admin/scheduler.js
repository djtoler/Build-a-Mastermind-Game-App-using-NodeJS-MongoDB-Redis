const cron = require('node-cron');
const Admin = require('../models/admin-model')

i = 0;
// const runEveryMinute = ()=>{console.log(` ${i++} `  )}
// cron.schedule(' * * * * * *', runEveryMinute );

const add_new_daily_users_obj = async () => {
    // function update() {
    //     console.log('hi');
    //     let daily_count_array = admin[0].total_new_users_daily;
    //     console.log(daily_count_array);
        // let new_daily_users_obj = {
        //     new_users_today: 0,
        //     date: Date.now()
        // }
        // daily_count_array.push(new_daily_users_obj)
        // admin[0].save();
        // console.log("refreshed daily users count");
    // }
    // const admin = await Admin
    //     .find({id: 'main'}).then((update()))
 
    // console.log(admin[0]);


}
// let new_daily_users_obj;
// cron.schedule('*/5 * * * * *',  async () => {
//             new_daily_users_obj = {
//             new_users_today: 0,
//             date: new Date(Date.now()).toString()
//         }
//         console.log(new_daily_users_obj);
// })


// async function update() {
//     console.log('heyy22');
//     const admin = await Admin.find({id: 'main'})
//             console.log('hi');
//             daily_count_array = admin[0].total_new_users_daily;
//             console.log(daily_count_array);
//             daily_count_array.push(new_daily_users_obj)
//             admin[0].save();
//             console.log("refreshed daily users count");
// }

// update()
