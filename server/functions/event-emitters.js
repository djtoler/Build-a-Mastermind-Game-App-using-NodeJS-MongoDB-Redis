const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

const registration = new MyEmitter();
const login = new MyEmitter();
const getRandomNumberEvent = new MyEmitter();
const eguess = new MyEmitter();
const shdata = new MyEmitter();
const scontrol = new MyEmitter();

module.exports = {
    registration, 
    login, 
    getRandomNumberEvent, 
    eguess, 
    shdata, 
    scontrol
}


