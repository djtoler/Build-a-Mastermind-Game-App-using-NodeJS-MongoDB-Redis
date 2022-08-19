const returnUserFromLoginRequest = (username, email) => {
    let body = {username, email}
    return body;
}

module.exports = {returnUserNameAndPassword: returnUserFromLoginRequest}

