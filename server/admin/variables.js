const register_variables = [
    {
        pointer:{incompleteFields: { title: "Please fill out all fields", status: "warning", duration: 9000, isClosable: true, position: "bottom" }},
        name:'let incompleteFields = ',
        type: 'let',
        value: '{ title: "Please fill out all fields", status: "warning", duration: 9000, isClosable: true, position: "bottom" }',
        purpose: 'registration input validation'
    },
    {
        pointer:{passwordMismatch: { title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" }},
        name:'let passwordMismatch = ',
        type: 'let',
        value: '{ title: "Passwords do not match", status: "warning", duration: 9000, isClosable: true, position: "bottom" }',
        purpose: 'registration input validation'
    },
    {
        pointer: {passwordTooShort: {title: "Password must be at least 4 characters", status: "warning", duration: 9000, isClosable: true, position: "bottom" }},
        name:'let passwordTooShort = ',
        type: 'let',
        value: '{ title: "Password must be at least 4 characters", status: "warning", duration: 9000, isClosable: true, position: "bottom" }',
        purpose: 'registration input validation'
    },
    {
        pointer: {userAlreadyExists: {title: "User already exists", status: "warning", duration: 9000, isClosable: true, position: "bottom"}},
        name:'let userAlreadyExists = ',
        type: 'let',
        value: '{ title: "User already exists", status: "warning", duration: 9000, isClosable: true, position: "bottom" }',
        purpose: 'registration input validation'
    },
    {
        pointer: {registration_error: { title: "Error registering, try again", status: "warning", duration: 9000, isClosable: true, position: "bottom" }},
        name:'let registration_error = ',
        type: 'let',
        value: '{ title: "Error registering, try again", status: "warning", duration: 9000, isClosable: true, position: "bottom" }',
        purpose: 'registration input validation'
    },
    {
        pointer: {successful_registration: {title: "Registration Successful", status: "success", duration: 9000, isClosable: true, position: "bottom"}},
        name:'let successful_registration = ',
        type: 'let',
        value: '{ title: "Registration Successful", status: "success", duration: 9000, isClosable: true, position: "bottom" }',
        purpose: 'registration input validation'
    },
    {
        pointer: {registration_count: 0},
        name:'let registration_count = ',
        type: 'let',
        value: '0',
        purpose: 'start a tally of new users registered. Increments by 1 on each new registration. Triggers Admin model update'
    },
    {
        pointer: {errors: []},
        name:'let errors;',
        type: 'let',
        value: '[]',
        purpose: 'hold error messages during registration input validation'
    },
]

const login_variables = [
    {
        pointer: {loginSuccessful: {title: 'Login Successful', status: 'success', duration: 9000, isClosable: true, position: "bottom"}},
        name:'let loginSuccessful =;',
        type: 'let',
        value: '{title: "Login Successful", status: "success", duration: 9000, isClosable: true, position: "bottom"}',
        purpose: 'hold error messages during registration input validation'
    },
]

const guess_evaluate_variables = [
    {
        pointer: {new_current_game: 'JSON.parse(current_game_id)'},
        name:'let new_current_game =',
        type: 'let',
        value: 'JSON.parse(current_game_id)',
        purpose: 'parse stringified value from JSON'
    },
    {
        pointer: {new_crn: 'Number(current_random_number)'},
        name:'let new_crn =',
        type: 'let',
        value: 'Number(current_random_number)',
        purpose: 'cast current# to number from string that comes from req.body'
    },
    {
        pointer: {round_results: {}},
        name:'let round_results = ',
        type: 'let',
        value: '{}',
        purpose: 'set empty object that will store results of evaluating guesses'
    },
    {
        pointer: {correct_numbers_count_array: []},
        name:'let correct_numbers_count_array =  ',
        type: 'let',
        value: '[]',
        purpose: 'set empty array that will store results of filtering an array of digits from a users guess '
    },
    {
        pointer: {correct_numbers_count: 0},
        name:'let correct_numbers_count =  ',
        type: 'let',
        value: '0',
        purpose: 'initiate a tally to track the amount of correct digits a user entered '
    },
    {
        pointer: {correct_locations_count: 0},
        name:'let correct_locations_count =  ',
        type: 'let',
        value: '0',
        purpose: 'initiate a tally to track the amount of correct digit locations a user entered '
    },
    {
        pointer: {user_guessed_all_correct_numbers},
        name:'let user_guessed_all_correct_numbers = ',
        type: 'let',
        value: false,
        purpose: 'initialize a variable thatll evaluate to true or false based on if a user guess all correct numbers'
    },
    {
        pointer: {cnp: 'correct_numbers_count * increment'},
        name:'let cnp = ',
        type: 'let',
        value: 'correct_numbers_count * increment',
        purpose: 'set points for amount of correct numbers'
    },
    {
        pointer: {clp: 'correct_locations_count * increment'},
        name:'let clp = ',
        type: 'let',
        value: 'correct_locations_count * increment',
        purpose: 'set points for amount of correct locations'
    },
    {
        pointer: {new_tp: 'cnp + clp'},
        name:'let new_tp = ',
        type: 'let',
        value: 'new_tp',
        purpose: 'set points total for current round'
    },
]

const hint_data_variables = [
    {
        pointer: {hint_evaluation},
        name:'let hint_evaluation= ',
        type: 'let',
        value: 'hint_evaluation',
        purpose: 'initialize variable to set hint response object'
    }
]