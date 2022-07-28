// "use strict";
// const Admin = require("../models/admin-model");
const User = require("../models/user-model");
// const users = require("../admin/dummy-users");
// const start = performance.now();
// const end = performance.now();
// const tte = end - start;
const autocannon = require("autocannon");
const {v4 : uuidv4} = require('uuid')
const newId = uuidv4()
let dummy_users = [];
let test_data;
// const urls = ["http://127.0.0.1:9991/guess-evaluation"];
// const fs = require('fs');

// async function dummy(params) {
//     const admin = await Admin.findOne({id:'main'});
//     let array = JSON.stringify(admin.dummy_users)
//     console.log(array.length);
//     fs.writeFile('dummydata.txt', array, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });
// }
// dummy();

// function login_test() {
//     let request_number = 0;

// const url = "http://127.0.0.1:9991/guess-evaluation";
//     const args = process.argv.slice(2);
//     const number_of_connections = args[0] || 1000;
//     const max_connection_requests = args[1] || 1000;

//     const instance = autocannon({
//         url: "http://localhost:9991/user/login/",
//         connections: number_of_connections,
//         duration: 10,
//         max_connection_requests,
//         headers: {'content-type': 'application/json'},
//         requests: [{
//                 method: "POST",
//                 path: "",
//                 setUpRequest: function (request) {
//                     console.log("reqNum: ", request_number + 1);
//                     request.body = JSON.stringify(users[request_number])
//                     request_number++
//                     console.log("hi");
//                     return request
//                 }
//             }]
//     }, finished_test)

//     function finished_test(err, res) {
//         console.log('Finished Test', err, res);
//     }

// }
// login_test()

// autocannon({
//   url: 'http://localhost:3000',
//   connections: 10, //default
//   pipelining: 1, // default
//   duration: 10 // default
// }, )

// async/await
// async function foo () {
//   const result = await autocannon({
//     url: 'http://localhost:3000',
//     connections: 10, //default
//     pipelining: 1, // default
//     duration: 10 // default
//   })
//   console.log(result)
// }

// foo()


// const autocannon = require("autocannon");

const usersData = require("../admin/dummydata.json");

// function testGuess() {
//     return Math.floor(Math.random() * 9999) + 1;
//   }

function startBench() {
    const obj = {
        guess: '1649',
        current_game_id: '{"game_id":"62e1ea6c502b0c84c79fa803"}',
        current_mode: 'super_hard', 
        current_random_number: '1545', 
        passUserData: '{"_id":"624ea88e6b431a70d3c31556","name":"Guest","email":"notregistered@example.com","picture":"http://res.cloudinary.com/dcrwhj71h/image/upload/v1649322123/kws85pzdvm71aort5tcf.jpg","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGVhODhlNmI0MzFhNzBkM2MzMTU1NiIsImlhdCI6MTY1ODk3Mjc4MCwiZXhwIjoxNjYyODYwNzgwfQ.L0_9GpgMamsSn-O7jbbckWkAmqSHqMjdQUssjD0AgmQ"}'
    } 
    // const url = "http://localhost:9991";
    const args = process.argv.slice(2);
    const numConnections = args[0] || 1000;
    const maxConnectionRequests = args[1] || 1000;
    const connectionRate = args[2] || 1000;

    let requestNumber = 0;

    const instance = autocannon(
        {
        title: 'Guess Test',
        url: "http://localhost:9991/guess-evaluation",
        connections: numConnections,
        duration: 10,
        maxConnectionRequests,
        headers: {
            "content-type": "application/json",
        },
        requests: [
            {
            method: "POST",
            path: "http://localhost:9991/guess-evaluation",
            setupRequest: function (request) {
                console.log("Request Number: ", requestNumber + 1);
                request.body = JSON.stringify(obj);
                requestNumber++;
                return request;
            },
            },
        ],
        },
        finishedBench
    );

    autocannon.track(instance);

    function finishedBench(err, res) {
        console.log("Finished Bench", err, res);
        test_data = res;
        console.log(test_data.throughput.average);
    }
}

startBench();


// module.exports = {
//   start,
//   end,
//   tte,
// };