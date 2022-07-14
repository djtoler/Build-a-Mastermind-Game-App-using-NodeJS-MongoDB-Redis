const mongoose = require("mongoose");
const connectMongo = async() => {
    try {
        const mongoConnection = await mongoose.connect('mongodb+srv://djtoler:alphagpc@cluster0.rwafh.mongodb.net/LinkedInMMG?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log( `MongoDB is now connected:  ${mongoConnection.connection.host}` );
    }
    catch (error) {
        console.log("Error: " + error.message);
        process.exit();
    }
}

module.exports = connectMongo;