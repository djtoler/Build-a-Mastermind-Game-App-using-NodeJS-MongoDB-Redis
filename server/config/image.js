const express = require('express');
const fs = require('fs');
const image = express.Router();
const redis = require('redis');
const path = require('path');
let file;
let blob;
let hint_data_02;
// const file = fs.readFileSync('image')
// const blob = Buffer.from(file)
const {createReadStream, createWriteStream} = require("fs");
// const fs = require('file-system');
// const multer = require('multer');

let client = redis.createClient({ return_buffers : true });

async function main() {
    await client.connect();
    await client.on('connect', function() {
        console.log('Connected!');
    });
    
    hint_data_02 = {
        caption: "Sub-Zero",
        image: blob
    };
    try {
        const key = 'hint_data_02';
        const result = await client.set(key, JSON.stringify(hint_data_02));
        console.log(result);

        // Turn around and bring back Shamu immediately to prove it works.
        const hintReturns = JSON.parse(await client.get(key));
        console.log(hintReturns);
    } catch (error) {
        console.error(error);
    }
    client.disconnect();
}



const uploadFile = (req, filePath) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(filePath);
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
            console.log(filePath);
            file = fs.readFileSync(filePath)
            blob = Buffer.from(file).toString('base64')
            // console.log(blob)
            fs.writeFile('Zeros2.txt', blob, (err) => {
                if (err) throw err;
                })
            main();
            resolve(filePath)
        });
        // If something goes wrong, reject the primise
        stream.on('error', err => {
            console.error(err);
            reject(err);
        });
    });
};

image.post('/upload-photo', (req, res) => {
    const file_path = path.join(__dirname, `/Zeros2.jpg`);
    uploadFile(req, file_path)
        .then(path => {
            res.send({ status: 'success', path })
    });
})

function printObjectDetails(key, obj) {
    console.log(`${key} object`)
    // console.log('-'.repeat(26));
    for (const prop in obj) {
        console.log(`${prop} = ${obj[prop]}`);
    }
}

image.get('/get_super_easy_hint', (req, res) => {
    // async function main() {
    //     client = redis.createClient();
    //     await client.connect();
    //     client.on('connect', function() {
    //         console.log('Connected!');
    //     });
    //     let easy_hint_response = {};
    //     try {
    //         const key = 'hint_data';
    //         let hint_data_obj = await (client.get(key, (err, val)=>{
    //             console.log(val);
    //             if (err) {
    //                 reject(err)
    //                 return
    //                }
    //             if (val == null) {
    //                 console.log(null);
    //                 return
    //             }
    //             try{
    //                 let d = Object.values(val)
    //                 console.log(d[d.length-2]);
                    
    //             } catch {
    //                 console.log('rewind');
    //             }
    //         }));

    //         let parse = JSON.parse(hint_data_obj);
    //         let cole = parse.image.data.length
    //         console.log(cole);
    //         // fs.writeFile('output.txt', hint_data_obj, (err) => {
    //         //     if (err) throw err;
    //         // })
    //         // console.log(testImg.image.data.length)
    //         // console.log(Object.values(hint_data_obj)[0]);
    //         // printObjectDetails(key, hint_data_obj);
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     let hint_image = String.fromCharCode(parse.image.data)
    //     let hint_image_tag = `<img src="data:image/jpeg;base64,{${hint_image}}" />`
    //     Object.assign(easy_hint_response, {digit_one: testImg.digit, cap: testImg.caption, img: hint_image_tag  })
    //     return res.json(easy_hint_response)
    // }
    // main();

})

// const super_easy_hints_cache = () => {
//     const key = 'hint-pics';
//     client.hSet(key, JSON.stringify(key))
//     client.hGetAll(key)
//     let hint_evaluation = client.hGetAll(key)
//     console.log(hint_evaluation);
// };

module.exports = image