const asyncHandler = require("express-async-handler");
const Admin = require("../models/admin-model");
const User = require("../models/user-model");
const {guess_sequence} = require('../admin/guess_sequence');
const fs = require("fs");
const {v4 : uuidv4} = require('uuid')
const newId = uuidv4()
const os = require('node:os');
let new_guess_test_obj;
let guess_test_array;
let pre_test_data = fs
  .readFileSync("./server/functions/LatestLoadTest.txt")
  .toString();

function rnd(weight) {
    let weight_variable = Math.floor(Math.random() * weight) + 1
    return weight_variable
};

const updateAdmin = asyncHandler(async () => {
    test_data = JSON.parse(pre_test_data);
    const admin = await Admin.find({id: "main"});
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
    async function cdu() {
    const users = await User.find({});
    let i = 0;
    while (i < 5000) {
        console.log('h');

        const user = await User.create({ 
            name: `name--${newId}dd`,
            email: `mail--${newId}dd${i}@mail.com`,
            password: `pw--${newId}dd${rnd(32)}`,
            picture: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            alltime_games_played: rnd(100),
            alltime_games_won: rnd(30),
            alltime_points_earned: 5000 + rnd(4000),
            avg_ppg: 30+ rnd(800),
            ranking: 0,
            ppg_ranking: 0,
            pe_ranking: 0,
            gw_ranking: 0,
            gp_ranking: 0, 
        })
        user.save();
        i++ 
    }
    console.log(users[4058]);
    }
    cdu();
});
create_dummy_users()

// updateAdmin();
