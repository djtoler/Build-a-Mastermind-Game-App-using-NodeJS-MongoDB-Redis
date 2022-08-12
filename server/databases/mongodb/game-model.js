const mongoose = require('mongoose');
const {number_default, boolean_default, string_default} = require('./model-helpers')

const GameSchema = mongoose.Schema({
    is_2_player: boolean_default,
    game_mode: string_default,
    random_number: {type: Number, immutable: doc => doc.rounds_played > 0},
    rounds_played: number_default,
    total_points: number_default,
    total_correct_numbers: number_default,
    total_correct_locations: number_default,
    game_won: boolean_default,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

GameSchema.methods.get_is_2_player =  async function () { 
    await two_player_mode ? this.is_2_player = true : this.is_2_player = false;
    await GameSchema.save();
    return this.is_2_player;
}
GameSchema.methods.update_game_level = async function (current_game_mode) {
    await (this.game_mode = current_game_mode );
    await GameSchema.save();
    return this.game_mode
}
GameSchema.methods.set_rounds_played = async function () {
    await (this.rounds_played = this.rounds_played + 1)
    await GameSchema.save();
    return this.rounds_played
} 
GameSchema.methods.get_game_won = async function (user_guessed_all_correct_numbers) {
    await (this.game_won = user_guessed_all_correct_numbers)
    await GameSchema.save();
    return this.game_won
} 
GameSchema.methods.get_users = async function (current_user_id) {
    await (this.users = current_user_id)
    await GameSchema.save();
    return this.get_users
}

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;