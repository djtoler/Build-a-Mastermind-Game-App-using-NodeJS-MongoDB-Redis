const {validation_helpers, dl_NotAlreadyRegistered} = require("./registration.helpers");

const verifyVisitorRegistrationCredentials = async (array, name, email, password, confirmPassword) => {
    array = Array.from(array);

    if (!name || !email || !password || !confirmPassword) {
        array.push({ msg: validation_helpers.incompleteFields });
    }

    if (password != confirmPassword) {
        array.push({ msg: validation_helpers.passwordMismatch });
    }

    if (typeof password == "string" && password.length < 4) {
        array.push({ msg: validation_helpers.passwordTooShort });
    }

    const userExists = await dl_NotAlreadyRegistered(email);

    if (userExists) {
        array.push({ msg: validation_helpers.userAlreadyExists });
    }

    console.log("end of input checks");
    if (array.length > 0) {
        console.log(array[0].msg);
    }

    return { array, name, email, password, confirmPassword };
};

module.exports = verifyVisitorRegistrationCredentials