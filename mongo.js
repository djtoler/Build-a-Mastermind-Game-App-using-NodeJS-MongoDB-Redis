const getUser = (username, email) => {
    let body = {username, email}
    return body;
}

module.exports = {getUser: getUser}

