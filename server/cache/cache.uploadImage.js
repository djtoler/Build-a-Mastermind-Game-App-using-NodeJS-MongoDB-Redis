const express = require('express');
const fs = require('fs');
const image = express.Router();
const redis = require('redis');
const path = require('path');
// const testImg  = require("../../output" );
let file;
let blob;

let client = redis.createClient({ return_buffers : true });

async function storeHintImagesInRedis (imageKey, imageCaption, image) {
    await client.connect();
    await client.on('connect', function() {console.log('Connected!');});
    
    imageValue = {caption: imageCaption, image: image};
    try {
        const key = imageKey;
        const result = await client.set(imageKey, JSON.stringify(imageValue));
        
        console.log(result);

        const hintReturns = JSON.parse(await client.get(key));
        console.log(hintReturns);
    } 
    catch (error) {
        console.error(error);
    }
    client.disconnect();
}

const uploadImages = (req, filePath, imageKey, image, imageCaption)=> {
    // console.log('FILEPATH:', filePath);
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(filePath);
        // console.log('STREAM:', stream);
        // With the open - event, data will start being written
        // from the request to the stream's destination path
        stream.on('open', () => {
            console.log('Stream open ...  0.00%');
            req.pipe(stream);
        });
        // Drain is fired whenever a data chunk is written.
        // When that happens, print how much data has been written yet.
        stream.on('drain', () => {
            const written = parseInt(stream.bytesWritten);
            const total = parseInt(req.headers['content-length']);
            const pWritten = ((written / total) * 100).toFixed(2);
            console.log(`Processing  ...  ${pWritten}% done`);
        });
        // When the stream is finished, print a final message
        // Also, resolve the location of the file to calling function
        stream.on('close', () => {
            console.log('Processing  ...  100%');
            // console.log(filePath);
            file = fs.readFileSync(filePath)
            blob = Buffer.from(file).toString('base64')
            // console.log(blob)
            fs.writeFile(req.body.imageName, blob, (err) => {console.log(blob);if (err) throw err})
                storeHintImagesInRedis(req.body.imageKey, req.body.imageCaption, req.body.image);
                console.log(blob);
                resolve(filePath)
        });
        // If something goes wrong, reject the primise
        stream.on('error', err => {
            console.error(err);
            reject(err);
        });
    });
};

// const uploadFile = (req, filePath) => {
//     //     let file;
// //     let blob;
//     return new Promise((resolve, reject) => {
//         const stream = fs.createWriteStream(filePath);
//         // With the open - event, data will start being written
//         // from the request to the stream's destination path
//         stream.on('open', () => {
//             console.log('Stream open ...  0.00%');
//             req.pipe(stream);
//         });
//         // Drain is fired whenever a data chunk is written.
//         // When that happens, print how much data has been written yet.
//         stream.on('drain', () => {
//             const written = parseInt(stream.bytesWritten);
//             const total = parseInt(req.headers['content-length']);
//             const pWritten = ((written / total) * 100).toFixed(2);
//             console.log(`Processing  ...  ${pWritten}% done`);
//         });
//         // When the stream is finished, print a final message
//         // Also, resolve the location of the file to calling function
//         stream.on('close', () => {
//             console.log('Processing  ...  100%');
//             console.log(filePath);
//             file = fs.readFileSync(filePath)
//             blob = Buffer.from(file).toString('base64')
//             // console.log(blob)
//             fs.writeFile('Zeros2.txt', blob, (err) => {
//                 if (err) throw err;
//                 })
//             main();
//             resolve(filePath)
//         });
//         // If something goes wrong, reject the primise
//         stream.on('error', err => {
//             console.error(err);
//             reject(err);
//         });
//     });
// };

// image.post('/upload-photo', (req, res) => {
//     const file_path = path.join(__dirname, `/Zeros2.jpg`);
//     uploadFile(req, file_path)
//         .then(path => {
//             res.send({ status: 'success', path })
//     });
// })



module.exports = uploadImages, storeHintImagesInRedis