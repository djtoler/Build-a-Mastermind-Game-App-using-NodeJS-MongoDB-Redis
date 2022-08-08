//---------------------------------------------------------------------------
//**************Step by step layout of the /guess-evaluation route**********
//---------------------------------------------------------------------------

const guess_sequence = [
    {
        user_action: true,
        step_number: 1,
        step_description: `User enters guess & clicks to submit`,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 2,
        step_description: `Post request is sent to '/guess-evaluation' route` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 3,
        step_description: `Mongoose finds current game from latest req.body, sets 'current_game' value and saves it` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 4,
        step_description: `Check if current_game on from latest req.body DOES NOT match random# generated from client` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 5,
        step_description: `Mongoose fnds the current user by email` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 6,
        step_description: `Mongoose fnds the current user by email` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 6,
        step_description: `Mongoose creates a new game` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 7,
        step_description: `Mongoose fnds the current user by email` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 8,
        step_description: `Mongoose creates a new game and pushes current user into Games "current_game.users" array, sets current_game.random_number to client sides current game & saves` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 9,
        step_description: `Mongoose pushes the new current_game into Users "user.games" array & saves` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 10,
        step_description: `JS runs 'correct_guess_all_four()' function to check if user guess all correct numbers` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 11,
        step_description: `JS runs 'correct_numbers()' function to check if the user guess any correct digits` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 12,
        step_description: `JS runs 'correct_locations' function to check if any of the digits were in the correct location` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 13,
        step_description: `JS sets 'round_results' variable to an object based on a t/f condition if the correct numbers count is > 0` ,
        step_time_avg: 1,
    },
    {
        user_action: false,
        step_number: 14,
        step_description: `JS returns an object contains data from evaluating the users guess. Its returned based on a nested conditional` ,
        step_time_avg: 1,
    },
]

module.exports = {
    guess_sequence
}