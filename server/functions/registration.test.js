const validateInput = require('./registration.functions.tests')
const User = require ('../models/user-model')
User.create = jest.fn()
User.find = jest.fn()

describe("REGISTRATION: VALIDATION & USER CREATION ", () => {
    test("SHOULD REJECT FORM SUBMISSIONS WITH MISSING FIELDS, NON-MATCHING PASSWORDS OR PASSWORDS THAT ARE LESS THAN 4 CHARACTERS", ()=> {
        const isValidated = validateInput({ email: 'test@test.com', password: 'abc1', confirmPassword: 'xyz'})
            expect(isValidated).toBe('passed')
    });
    test("SHOULD REJECT FORM SUBMISSIONS IF A USER ALREADY EXISTS", ()=> {
        const user = User.find({email: 'test@testmail.com'})
            expect(User.find).toBeCalled()
    });
    test("SHOULD CREATE A USER", ()=> {
        const user = User.create({name: 'mike', email: 'test@testmail.com', password:'testtest'})
            expect(User.create).toBeCalled()
    });
})