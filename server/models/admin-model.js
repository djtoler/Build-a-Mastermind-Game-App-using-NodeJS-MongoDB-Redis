const mongoose = require('mongoose');
const {number_default, boolean_default, string_default} = require('./model-helpers')

const AdminSchema = mongoose.Schema({
    avatar_avg_ppg: {number_default},
    avatar_avg_gw: {number_default},
    avatar_avg_pe: {number_default},
    avatar_avg_gpc: {number_default},
    total_number_users: {number_default},
    total_games_played: {number_default},
    total_new_users_daily: [{
        type: Number, 
        date: {type: Date, default: Date.now} 
    }],
    total_new_users_weekly: [{
        type: Number, 
        date: {type: Date, default: Date.now} 
    }],
    timer_login: [{
        type: Number, 
        date: {type: Date, default: Date.now}
    }],
    timer_register: [{
        type: Number, 
        date: {type: Date, default: Date.now}
    }],
    timer_pull_random_number: [{
        type: Number, 
        date: {type: Date, default: Date.now},
        from_api: {type: Boolean, default: true}
    }],
    timer_evaluate_guess: [
        // admin.timer_evaluate_guess[i].func_data.current_sequence[0].step_description
        {
            traffic_origin: {string_default},
            func_name: {string_default},
            func_data: {
                date:{type: Date, default: Date.now},
                number_of_requests: {number_default},
                number_of_errors: {number_default},
                avg_time_to_complete: {number_default},
                current_sequence: [{
                    user_action: {boolean_default},
                    step_number: {number_default},
                    step_description: {string_default},
                    step_time_avg: {number_default}
                }] 
            },
            
        }
    ],
    },
    { timestamps: true }
);
const Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;