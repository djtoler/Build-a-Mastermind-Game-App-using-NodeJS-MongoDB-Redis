const express = require("express");
const images = express.Router();
const Busboy = require('busboy');
const redis = require('redis');
// client = redis.createClient({ return_buffers : true });

// function imageConvert (image_file_location) {
//     const file = fs.readFileSync(image_file_location)
//     const blob = Buffer.from(file)
// }

// images.post(
//     '/file/:fileId',
//     function(req,res,next) {
//         let
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