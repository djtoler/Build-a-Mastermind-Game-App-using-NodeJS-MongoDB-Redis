const validateLoginInputTest = require('./login.functions.tests')
const User = require ('../databases/mongodb/user-model')
const Game = require ('../databases/mongodb/game-model')
const {gameobj} = require("../databases/mongodb/model-helpers")
User.findOne = jest.fn()
Game.create = jest.fn()

describe("LOGIN: VALIDATION, FIND USER, CREATE GAME ", () => {
    test("SHOULD REJECT FORM SUBMISSIONS WITH MISSING FIELDS", ()=> {
        const loginInputIsValid = validateLoginInputTest({email: 'test@test.com'})
            expect(loginInputIsValid[0]).toBe(false)
    });
    test("SHOULD ATTEMPT TO FIND USER", ()=> {
        const user = User.findOne({email: 'test@testmail.com'})
            expect(User.findOne).toBeCalled()
    });
    test("SHOULD RETURN A USER", async ()=> {
        const doesReturnAUser = validateLoginInputTest({email: 'test@test.com', password: 'password'})
            expect(doesReturnAUser[2]).toBe(false)
    });
    test("SHOULD ATTEMPT TO CREATE GAME", ()=> {
        const game = Game.create(gameobj)
            expect(Game.create).toBeCalled()
    });
    test("SHOULD NOT CREATE GAME IF MISSING REQUIRED SCHEMA", ()=> {
        const doesCreateAGame = validateLoginInputTest({email: 'test@test.com', password: 'password'})
            expect(doesCreateAGame[3]).toBe(false)
    });
    test("SHOULD CREATE GAME IF REQUIRED SCHEMA IS PRESENT", ()=> {
        const doesCreateAGame = validateLoginInputTest({email: 'test@test.com', password: 'password'})
            expect(doesCreateAGame[4]).toBe(true)
    });
    test("SHOULD NOT ACCEPT LOGIN ATTEMPT WHERE EMAIL LENGTH IS LESS THAN 8 CHARACTERS", ()=> {
        const acceptsInvalidEmailLength = validateLoginInputTest({email: 't@t.co', password: 'rr'})
            expect(acceptsInvalidEmailLength[5]).toBe(false)
    });
    test("SHOULD ACCEPT LOGIN ATTEMPT WHERE EMAIL LENGTH IS GREATER THAN 8 CHARACTERS", ()=> {
        const acceptsValidEmailLength2 = validateLoginInputTest({email: 'testtest@t.com', password: 'boogersss'})
        console.log(acceptsValidEmailLength2);
            expect(acceptsValidEmailLength2[5]).toBe(true)
    });
    test("SHOULD NOT ACCEPT LOGIN ATTEMPT WHERE PW LENGTH IS LESS THAN 4 CHARACTERS", ()=> {
        const acceptsInvalidPasswordLength = validateLoginInputTest({email: 'testest@t.com', password: 'pa'})
            expect(acceptsInvalidPasswordLength[6]).toBe(false)
    });
    test("SHOULD ACCEPT LOGIN ATTEMPT WHERE PW LENGTH IS GREATER THAN 8 CHARACTERS", ()=> {
        const acceptsValidPasswordLength = validateLoginInputTest({email: 'testtwewdeest@t.com', password: 'passwwwword'})
        console.log( 'UPPPPPfffPP', acceptsValidPasswordLength);
            expect(acceptsValidPasswordLength[7].password.length >=8).toBe(true)
    });
})