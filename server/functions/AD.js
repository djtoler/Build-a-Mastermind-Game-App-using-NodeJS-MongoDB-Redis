const asyncHandler = require("express-async-handler");
const Admin = require("../models/admin-model");
const fs = require("fs");
const os = require('node:os');
let new_guess_test_obj;
let guess_test_array;
let pre_test_data = fs
  .readFileSync("./server/functions/LatestLoadTest.txt")
  .toString();

const updateAdmin = asyncHandler(async () => {
  console.log(typeof pre_test_data);
  test_data = JSON.parse(pre_test_data);

  const admin = await Admin.findOne({ id: "main" });
  guess_test_array = admin.timer_evaluate_guess;
  console.log(admin.id);
  console.log(guess_test_array);
  new_guess_test_obj = {
    traffic_origin: "autocannon",
    func_name: "testing route path",
    func_data: {
      date: date_default,
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
      number_of_threads: number_default,
      number_of_cores: os.cpus().length,
      number_of_servers: number_default,
      number_of_errors: test_data.errors,
      non_200_status_codes: { code: "non200", count: test_data.non2xx },
      number_of_timeouts: test_data.timeouts,
      current_sequence: guess_sequence,
    },
  };
  guess_test_array.push(new_guess_test_obj);
  admin.save();
});

updateAdmin();
