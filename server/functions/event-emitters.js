const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

const registration =                new MyEmitter();
const login =                       new MyEmitter();
const getRandomNumberEvent =        new MyEmitter();
const evaluateGuess =               new MyEmitter();
const resetEasyHintNumbersEvent =   new MyEmitter();


module.exports = {
    registration, 
    login, 
    getRandomNumberEvent, 
    evaluateGuess, 
    resetEasyHintNumbersEvent
}


