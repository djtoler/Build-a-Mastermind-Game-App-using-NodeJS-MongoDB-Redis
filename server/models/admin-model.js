const mongoose = require("mongoose");
const {number_default, boolean_default, string_default, date_default, string_required} = require("./model-helpers");

const AdminSchema = mongoose.Schema(
  {
    id: string_required,
    avatar_avg_ppg: number_default,
    avatar_avg_gw: number_default,
    avatar_avg_pe: number_default,
    avatar_avg_gpc: number_default,
    total_number_users: number_default,
    total_games_played: number_default,
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
      // admin.timer_evaluate_guess[i].func_data.current_sequence[0].step_description
      {
        traffic_origin: string_default,
        func_name: string_default,
        func_data: {
          date: date_default,
          number_of_requests: number_default,
          number_of_errors: number_default,
          avg_time_to_complete: number_default,
          current_sequence: [
            {
              user_action: boolean_default,
              step_number: number_default,
              step_description: string_default,
              step_time_avg: number_default,
            },
        ],
        },
      },
    ],
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
