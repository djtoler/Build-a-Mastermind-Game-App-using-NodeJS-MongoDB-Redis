const mysql = require("mysql2");
connectMyqsl = async() => {
    try {
        const con = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'alphagpc',
        });
        
        const mysqlConnection = await con.connect((err) => {
            if (err) {
                console.log("Error occurred", err);
            } else {
                console.log(`YOU ARE NOW CONNECTED TO --> MYSQL`);
            }
        })
        return mysqlConnection
    } 
    catch (error) {
            console.log('Error connecting to Db');
            process.exit();
    }
}

module.exports = connectMyqsl;
