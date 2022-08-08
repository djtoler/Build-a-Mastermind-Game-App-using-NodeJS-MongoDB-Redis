const Admin = require("../../models/admin-model");
const User = require("../../models/user-model");

const find_min_games_played = () => {
    const min_games_played = await User.find({})
        .sort({ alltime_games_played : 1 })
        .limit(1)
        .then(users => console.log(users[0]));
};

const find_max_games_played = () => {
    const max_games_played = await User.find({})
        .sort({ alltime_games_played : -1 })
        .limit(1)
        .then(users => console.log(users[0]));
};

find_max_games_played();
find_min_games_played();



module.exports =  {

}