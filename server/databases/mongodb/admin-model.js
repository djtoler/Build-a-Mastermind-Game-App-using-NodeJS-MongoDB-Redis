const mongoose = require("mongoose");
const {number_default, boolean_default, string_default, date_default, string_required, kpi_default} = require("./model-helpers");

const AdminSchema = mongoose.Schema(
  {
    id: string_required,
    locationPoints_se_mode: number_default,
    locationPoints_e_mode: number_default,
    locationPoints_h_mode: number_default,
    locationPoints_sh_mode: number_default,
    locationPoints_df_mode: number_default,
    digitPoints_se_mode: number_default,
    digitPoints_e_mode: number_default,
    digitPoints_h_mode: number_default,
    digitPoints_sh_mode: number_default,
    digitPoints_df_mode: number_default,
    locationCount_se_mode: number_default,
    locationCount_e_mode: number_default,
    locationCount_sh_mode: number_default,
    locationCount_h_mode: number_default,
    locationCount_df_mode: number_default,
    digitCount_se_mode: number_default,
    digitCount_e_mode: number_default,
    digitCount_sh_mode: number_default,
    digitCount_h_mode: number_default,
    digitCount_df_mode: number_default,
    avatar_avg_ppg: number_default,
    avatar_avg_gw: number_default,
    avatar_avg_pe: number_default,
    avatar_avg_gpc: number_default,
    total_number_users: number_default,
    total_games_played: number_default,
    total_current_points: number_default,
    count_all_game_modes: {
      super_easy: number_default,
      easy: number_default,
      super_hard: number_default,
      hard: number_default,
      default: number_default,
    },
    dummy_users: [
        {
            name: string_default,
            email: string_default,
            password: string_default
        }
    ],
    weekly_tracker: number_default,
    total_new_users_daily: [
      {
        new_users_today: number_default,
        date: date_default,
      },
    ],
    total_new_users_weekly: [
      {
        new_users_this_week: number_default,
        date: date_default,
      },
    ],
    timer_login: [
      {
        time: number_default,
        date: date_default,
      },
    ],
    timer_register: [
      {
        time: number_default,
        date: date_default,
      },
    ],
    timer_pull_random_number: [
      {
        time: number_default,
        date: date_default,
        from_backup: boolean_default,
      },
    ],
    timer_evaluate_guess: [
      {
        traffic_origin: string_default,
        func_name: string_default,
        func_data: {
          date: date_default,
          requests_rps: { avg: number_default, mean: number_default, min: number_default, max: number_default },
          instance_duration: number_default,
          throughput_bps: { avg: number_default, mean: number_default, min: number_default, max: number_default },
          latency_mspt: { avg: number_default, mean: number_default, min: number_default, max: number_default },
          number_of_threads: number_default,
          number_of_cores: number_default,
          number_of_servers: number_default,
          number_of_errors: number_default,
          non_200_status_codes: { code: string_default, count: number_default },
          number_of_timeouts: number_default,
          current_sequence: [
            {
              user_action: boolean_default,
              step_number: number_default,
              step_description: string_default,
              step_time_avg: number_default,
            }
          ],
        },
      },
    ],
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
