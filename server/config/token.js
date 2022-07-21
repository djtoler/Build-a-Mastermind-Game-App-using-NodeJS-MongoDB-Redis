const jwt = require('jsonwebtoken');

const generate_token = (id) => {
    return jwt.sign({id}, "blue", {
        expiresIn: "45d"
    })
};

module.exports = generate_token;