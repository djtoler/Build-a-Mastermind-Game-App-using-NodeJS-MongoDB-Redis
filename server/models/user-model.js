const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
        name:  {type: String, required: true},
        email: {type: String, required: true, unique: false},
        password: {type: String, required: true},
        picture: {type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
        alltime_games_played: {type: Number, required: false},
        alltime_games_won: {type: Number, required: false},
        alltime_points_earned: {type: Number, required: false},
        avg_ppg: {type: Number, required: false},
        ranking: {type: Number, required: false},
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