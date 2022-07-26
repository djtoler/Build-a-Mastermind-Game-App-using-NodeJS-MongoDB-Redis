const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {number_default, string_default, string_required} = require('./model-helpers')


const userSchema = mongoose.Schema({
        name:  string_default,
        email: string_required,
        password: string_required,
        picture: {type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
        alltime_games_played: number_default,
        alltime_games_won: number_default,
        alltime_points_earned: number_default,
        avg_ppg: number_default,
        ranking: number_default,
        games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }]
    },
    {timestamps: true}
)

userSchema.methods.matchPassword = async function (enteredPassword) 
    {return await bcrypt.compare(enteredPassword, this.password)}

userSchema.pre('save', async function (next){
    if (!this.isModified) {next()}
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;