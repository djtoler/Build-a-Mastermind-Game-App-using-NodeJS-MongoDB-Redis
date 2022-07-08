const mongoose = require("mongoose");

const connectMongo = async() => {
    try {
        const mongoConnection = await mongoose.connect(process.env.MONGO_URI, {
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

module.exports = connectMongo