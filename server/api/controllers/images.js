const express = require("express");
const images = express.Router();
const Busboy = require('busboy');
const redis = require('redis');
const redisImageConnection = redis.createClient ({ 
    host: '127.0.0.1', 
    port: 6379,
    return_buffers : true 
})

redisImageConnection.on('connect', function name() {
    console.log('Redis for pics connected ' + redis_host + ":" + redis_port);
})

redisImageConnection.on("error", function (err) {
    console.log("Error " + err);
  });

// images.post(
//     '/file/:fileId',
//     function(req,res,next) {
//         //new instance of busboy
//         busboy  = new Busboy({ headers: req.headers }),
//         //where we will store our data
//         fileData;
//       //the 'file' event
//       busboy.on('file', function(fieldname, file) {
//         //the data event of the stream
//         file.on('data', function(data) {
//           //setup the  fileData var if empty
//           if (!fileData) { fileData = data; } else {
//             //concat it to the first fileData
//             fileData.concat([data]);
//           }
//         });
//         //when the stream is done
//         file.on('end', function(){
//           //set using redis
//           client.set(
//             rk('files',req.params.fileId),
//             fileData,
//             function(err, resp) {
//               if (err) { next(err); } else {
//                 res.end(); //complete the http
//               }
//             }
//           );
//         });
//       });
//       //let busboy handle the req stream
//       req.pipe(busboy);
//     }
//   );