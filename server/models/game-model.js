const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    is_2_player: { type: Boolean, default: false },
    game_mode: { type: String, default: 'default' },
    rounds_played: {type: Number, default: undefined},
    game_won: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

// GameSchema.methods.get_is_2_player = () => {return two_player_mode ? this.is_2_player = true : this.is_2_player = false}
// GameSchema.methods.update_game_level = (current_game_mode) => {return this.game_mode = current_game_mode }
// GameSchema.methods.set_rounds_played = async () => {
//     this.rounds_played = this.rounds_played + 1
//     await GameSchema.save();
// } 
// GameSchema.methods.get_game_won = async (user_guessed_all_correct_numbers) => {
//     this.game_won = user_guessed_all_correct_numbers
//     await GameSchema.save();
// } 
// GameSchema.methods.get_users = (current_user_id) => {return this.users = current_user_id}

const Game = mongoose.model("game", GameSchema);
module.exports = Game;