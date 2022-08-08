const asyncHandler = require("express-async-handler");
const Admin = require("../models/admin-model");
const User = require("../models/user-model");
const Game = require("../models/game-model");
const { registration } = require("../functions/event-emitters");
const {UpdateUsersCountsAfterSuccessfulRegistration} = require("../functions/registration.admin");

const cron = require("node-cron");
const { guess_sequence } = require("../admin/analytics/guess_sequence");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const newId = uuidv4();
const os = require("node:os");
const { aggregate } = require("../models/admin-model");
let new_guess_test_obj;
let guess_test_array;
// let pre_test_data = fs
//   .readFileSync("./server/functions/LatestLoadTest.txt")
//   .toString();

// function rnd(weight) {
//     let weight_variable = Math.floor(Math.random() * weight) + 1
//     return weight_variable
// };

const updateAdmin = asyncHandler(async () => {
  test_data = JSON.parse(pre_test_data);
  const admin = await Admin.find({ id: "main" });
  console.log(admin);
  guess_test_array = admin[0].timer_evaluate_guess;
  new_guess_test_obj = {
    traffic_origin: "autocannon",
    func_name: "4th test",
    func_data: {
      date: Date.now(),
      requests_rps: {
        avg: test_data.requests.average,
        mean: test_data.requests.mean,
        min: test_data.requests.min,
        max: test_data.requests.max,
      },
      instance_duration: test_data.duration,
      throughput_bps: {
        avg: test_data.throughput.average,
        mean: test_data.throughput.mean,
        min: test_data.throughput.min,
        max: test_data.throughput.max,
      },
      latency_mspt: {
        avg: test_data.latency.average,
        mean: test_data.latency.mean,
        min: test_data.latency.min,
        max: test_data.latency.max,
      },
      number_of_threads: 1,
      number_of_cores: os.cpus().length,
      number_of_servers: 1,
      number_of_errors: test_data.errors,
      non_200_status_codes: { code: "non200", count: test_data.non2xx },
      number_of_timeouts: test_data.timeouts,
      current_sequence: guess_sequence,
    },
  };
  guess_test_array.push(new_guess_test_obj);
  admin[0].save();
  console.log(admin[0]);
});

const create_dummy_users = asyncHandler(async () => {
  console.log("hi");

  registration.on("update_admin", function () {
    console.log("in here");
    UpdateUsersCountsAfterSuccessfulRegistration();
    console.log("done");
  });

  console.log(registration);
  console.log("hi");
  // let i = 0;
  // let ppg = 0;
  // let gw = 0;
  // let pe = 0;
  // let gpc = 0;
  // let won = 0;
  // let loss = 0;
  // let se_mode = 0;
  // let e_mode = 0;
  // let sh_mode = 0;
  // let h_mode = 0;
  // let df_mode = 0;
  // let count_se_mode = 0;
  // let count_e_mode = 0;
  // let count_sh_mode = 0;
  // let count_h_mode = 0;
  // let count_df_mode = 0;
  // let total_current_points = 0;

  // const game_modes = ["easy", "super_easy", "hard", "super_hard", "default"];

  // const admin = await Admin.find({id: 'main'});
  // let new_daily_users_obj;
  // cron.schedule('*/5 * * * * *',  async () => {update()})

  // async function update() {
  //     new_daily_users_obj = {
  //         new_users_today: 89,
  //         date: new Date(Date.now()).toString()
  //     }
  //     console.log(new_daily_users_obj);
  //     console.log('heyy22');
  //     console.log('hi');
  //     daily_count_array = admin[0].total_new_users_daily;
  //     // console.log(daily_count_array);
  //     daily_count_array.push(new_daily_users_obj)
  //     admin[0].save();
  //     console.log("refreshed daily users count");
  // }

  // const all_games = await Game.find({});
  //---------------------------------------------------------------
  //----------------------Create Dummy Game Data-------------------
  //---------------------------------------------------------------
  // while (i < all_games.length - 1) {
  //     all_games[i].game_mode = game_modes[rnd(5) - 1];
  //     all_games[i].rounds_played = rnd(10);
  //     all_games[i].total_correct_numbers = rnd(4);
  //     all_games[i].total_correct_locations = rnd(4);
  //     all_games[i].total_points = all_games[i].total_correct_locations + all_games[i].total_correct_numbers;
  //     all_games[i].total_correct_numbers === 4 ? all_games[i].game_won = true : all_games[i].game_won = false;
  //     all_games[i].game_won ? won++ : loss++
  //     pe = pe +  all_games[i].total_correct_locations + all_games[i].total_correct_numbers;
  //     if (all_games[i].game_mode == 'super_easy') {se_mode = pe * 10; count_se_mode++};
  //     if (all_games[i].game_mode == 'easy') {e_mode = pe * 20; count_e_mode++};
  //     if (all_games[i].game_mode == 'hard') {h_mode = pe * 100; count_h_mode++};
  //     if (all_games[i].game_mode == 'super_hard') {sh_mode = pe * 200; count_sh_mode++};
  //     if (all_games[i].game_mode == 'default') {df_mode = pe * 50; count_df_mode++};
  //     all_games[i].save();
  //     console.log(all_games[i].game_mode, all_games[i].total_correct_numbers, all_games[i].game_won, pe);
  //     i++
  // }
  // console.log('done');
  // console.log('won', won);
  // console.log(se_mode + e_mode + h_mode + sh_mode + df_mode);
  // admin[0].points_se_mode = se_mode
  // admin[0].points_e_mode = e_mode
  // admin[0].points_h_mode = h_mode
  // admin[0].points_sh_mode = sh_mode
  // admin[0].points_df_mode = df_mode
  // admin[0].count_se_mode = count_se_mode
  // admin[0].count_e_mode = count_e_mode
  // admin[0].count_h_mode = count_h_mode
  // admin[0].count_sh_mode = count_sh_mode
  // admin[0].count_df_mode = count_df_mode
  // admin[0].total_current_points = se_mode + e_mode + h_mode + sh_mode + df_mode
  // admin[0].avatar_avg_ppg = pe / all_games.length - 1.2;
  // admin[0].avatar_avg_gw = won
  // admin[0].avatar_avg_pe = pe
  // admin[0].total_games_played = all_games.length
  // admin[0].save();
  // console.log('ppg', admin[0].avatar_avg_ppg);
  // console.log('gw', admin[0].avatar_avg_gw);
  // console.log('pe', admin[0].avatar_avg_pe);
  // console.log('tgp', admin[0].total_games_played);
  // console.log(admin[0].createdAt);

  //---------------------------------------------------------------
  //---------------------- Set Game Modes Data Structure -------------------
  //---------------------------------------------------------------
  //     const set_game_modes_structure = async (search_key, num_of_results) => {
  //         const admin = await Admin.find({id: 'main'});
  //         let game_mode_counts =
  //             {
  //                 default: admin[0].count_df_mode,
  //                 super_easy: admin[0].count_se_mode,
  //                 super_easy: admin[0].count_se_mode,
  //                 easy: admin[0].count_e_mode,
  //                 super_hard: admin[0].count_sh_mode,
  //                 hard: admin[0].count_h_mode
  //             }

  //         admin[0].count_all_game_modes = game_mode_counts;
  //         admin[0].save();
  //         console.log("done");
  //         return admin[0].count_all_game_modes;
  // };
  // set_game_modes_structure();

  //---------------------------------------------------------------
  //----------------------Rank Most Popular Game Modes -------------------
  //---------------------------------------------------------------
  // const rank_games = async (sort_key) => {
  //     const admin = await Admin.find({id: 'main'});
  //     let obj = admin[0].count_all_game_modes
  //     let rankings = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  //     console.log(rankings);
  // }
  // rank_games();

  //---------------------------------------------------------------
  //----------------------Get Latest New Daily User Count-------------------
  //---------------------------------------------------------------
  // const count_new_users_today = async (new_user_count) => {
  //     const admin = await Admin.find({id: 'main'})
  //     let i = 0;
  //     let daily_count_array = admin[0].total_new_users_daily;
  //     let todays_new_user_count = daily_count_array[daily_count_array.length - 1]
  //     console.log(todays_new_user_count);
  // }

  // count_new_users_today();

  //---------------------------------------------------------------
  //----------------------Get New Daily User Count(High to Low)-------------------
  //---------------------------------------------------------------
  // const htl_daily_new_users_count = async () => {
  //     const admin = await Admin.find({id: 'main'})
  //     let daily_count_array = admin[0].total_new_users_daily;
  //     daily_count_array.sort((a, b) => {
  //         return a.new_users_today - b.new_users_today;
  //     })
  //     daily_count_array.forEach((e) => {
  //         console.log(e.date, e.new_users_today);
  //     })

  // }
  // htl_daily_new_users_count();

  //---------------------------------------------------------------
  //----------------------Get New Daily User Count(Low to High)-------------------
  //---------------------------------------------------------------
  // const lth_daily_new_users_count = async () => {
  //     const admin = await Admin.find({id: 'main'})
  //     let daily_count_array = admin[0].total_new_users_daily;
  //     daily_count_array.sort((a, b) => {
  //         return b.new_users_today - a.new_users_today;
  //     })
  //     daily_count_array.forEach((e) => {
  //         console.log(e.date, e.new_users_today);
  //     })
  // }
  //     lth_daily_new_users_count();
  // let rankings;
  // let array = [];

  // while (i < daily_count_array.length) {
  //    if (condition) {
  //     console.log(daily_count_array[i].new_users_today)
  //    }
  //    i++
  // }
  // console.log(admin[0].total_new_users_daily);
  // const newone = async () => {
  //     const admin = await Admin.find({id: 'main'})
  //     let new_users_array = admin[0].total_new_users_daily
  //     // let new_daily_users_obj = {
  //     //     new_users_today: 0,
  //     //     date: Date.now()
  //     // }
  //     // new_users_array.push(new_daily_users_obj)
  //     // admin[0].save();
  //     let nd = new_users_array[new_users_array.length -1].date;
  //     console.log(new Date(nd).toString());
  // }
  // newone()

  //---------------------------------------------------------------
  //----------------------Find Bottom Users in All Catagories-------------------
  //---------------------------------------------------------------
  // const find_bottom_users = async (search_key, num_of_results) => {
  //     let options_array = [
  //         {alltime_games_played: 1},
  //         {alltime_games_won: 1},
  //         {alltime_points_earned: 1},
  //         {avg_ppg: 1},
  //         {ranking: 1},
  //         {ppg_ranking: 1},
  //         {pe_ranking: 1},
  //         {gw_ranking: 1},
  //         {gp_ranking: 1},
  //     ]
  //     const min_games_played = await User
  //         .find({})
  //         .sort(options_array[search_key])
  //         .limit(num_of_results)
  //         .then(users => console.log(users));
  // };

  //---------------------------------------------------------------
  //----------------------Find Top Users In All Catagories-------------------
  //----------------------------------------------------------------
  // const find_top_users = async (search_key, num_of_results) => {
  //     let options_array = [
  //         {alltime_games_played: -1},
  //         {alltime_games_won: -1},
  //         {alltime_points_earned: -1},
  //         {avg_ppg: -1},
  //         {ranking: -1},
  //         {ppg_ranking: -1},
  //         {pe_ranking: -1},
  //         {gw_ranking: -1},
  //         {gp_ranking: -1},
  //     ]
  //     const max_games_played = await User
  //         .find({})
  //         .sort(options_array[search_key])
  //         .limit(num_of_results)
  //         .then(users => console.log(users));
  // };

  // find_top_users(3, 2);
  // find_bottom_users();

  //---------------------------------------------------------------
  //----------------------Create Dummy Users-------------------
  //---------------------------------------------------------------
  // async function cdu() {
  // const users = await User.find({});
  // console.log(users[11999]);
  // let i =12000 ;
  // while (i < 14000) {
  //     console.log('h');

  //     const user = await User.create({
  //         name: `name--${newId}dd`,
  //         email: `mail--${newId}dd${i}@mail.com`,
  //         password: `pw--${newId}dd${rnd(32)}`,
  //         picture: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  //         alltime_games_played: rnd(100),
  //         alltime_games_won: rnd(30),
  //         alltime_points_earned: 5000 + rnd(4000),
  //         avg_ppg: 30+ rnd(800),
  //         ranking: 0,
  //         ppg_ranking: 0,
  //         pe_ranking: 0,
  //         gw_ranking: 0,
  //         gp_ranking: 0,
  //     })
  //     user.save();
  // console.log(users[i].email);
  // console.log(users[i].alltime_games_won);
  // console.log(users[i].alltime_games_played);
  // console.log(users[i].alltime_points_earned);
  // console.log(users[i].ppg_ranking);
  //     i++
  // }

  // }
  // cdu();
  // console.log();
});
// create_dummy_users();

// updateAdmin();
