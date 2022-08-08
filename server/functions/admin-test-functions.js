
const autocannon = require("autocannon");
let test_data;
const fs = require('fs');

async function startBench() {
    const obj = {
        guess: '1649',
        current_game_id: '{"game_id":"62e1ea6c502b0c84c79fa803"}',
        current_mode: 'super_hard', 
        current_random_number: '1545', 
        passUserData: '{"_id":"624ea88e6b431a70d3c31556","name":"Guest","email":"notregistered@example.com","picture":"http://res.cloudinary.com/dcrwhj71h/image/upload/v1649322123/kws85pzdvm71aort5tcf.jpg","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGVhODhlNmI0MzFhNzBkM2MzMTU1NiIsImlhdCI6MTY1ODk3Mjc4MCwiZXhwIjoxNjYyODYwNzgwfQ.L0_9GpgMamsSn-O7jbbckWkAmqSHqMjdQUssjD0AgmQ"}'
    } 
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

    async function finishedBench(err, res) {
        console.log("Finished Bench", err, res);
        test_data = JSON.stringify(res);
        console.log(test_data.throughput);
        fs.writeFile('LatestLoadTest.txt', test_data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
    });
    }
 
}

// startBench();



module.exports = {
  test_data
};