const number_default = { type: Number, default: 0 };
const boolean_default = { type: Boolean, default: false };
const string_default = { type: String, unique: false, lowercase: true };
const string_required = {type: String, unique: false, lowercase: true, required: true};
const date_default = { type: Date, default: Date.now };
const kpi_default = {avg: number_default, mean: number_default, min: number_default, max: number_default}
const defaultGameObj = {is_2_player: false, game_mode: 'waiting', rounds_played: 0, game_won: false, user: []};
const invalidGameObj = {game_mode: 'waiting', rounds_played: 0, game_won: false, user: []};

const adminobj = {
  id: 'main',
  avatar_avg_ppg: 0,
  avatar_avg_gw: 0,
  avatar_avg_pe: 0,
  avatar_avg_gpc: 0,
  total_number_users: 0,
  total_games_played: 0,
  total_new_users_daily: [
    {
      new_users_today: 10,
      date: Date.now(),
    },
  ],
  total_new_users_weekly: [
    {
      new_users_this_week: 20,
      date: Date.now(),
    },
  ],
  timer_login: [
    {
      time: 1,
      date: Date.now(),
    },
  ],
  timer_register: [
    {
      time: 1,
      date: Date.now(),
    },
  ],
  timer_pull_random_number: [
    {
      time: 1,
      date: Date.now(),
      from_backup: false,
    },
  ],
  timer_evaluate_guess: [
    // admin.timer_evaluate_guess[i].func_data.current_sequence[0].step_description
    {
      traffic_origin: "test",
      func_name: "test_func",
      func_data: {
        date: Date.now(),
        number_of_requests: 1000,
        number_of_errors: 5,
        avg_time_to_complete: 1,
        current_sequence: [
          {
            user_action: false,
            step_number: 1,
            step_description: "user clicks submit",
            step_time_avg: 1,
          },
        ],
      },
    },
  ],
};

module.exports = {
  number_default,
  boolean_default,
  string_default,
  string_required,
  date_default,
  kpi_default,
  defaultGameObj,
  adminobj,
  invalidGameObj
};
