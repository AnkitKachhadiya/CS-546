const mongoCollections = require("../config/mongoCollections");
const bcryptjs = require("bcryptjs");

const users = mongoCollections.users;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const SALT_ROUNDS = 16;

async function createUser(_username, _password) {
    try {
        validateTotalArguments(arguments.length);

        const username = validateUsername(_username).toLowerCase();
        const password = validatePassword(_password);

        const usersCollection = await users();

        const user = await usersCollection.findOne({ username: username });

        if (user) {
            throwError(ErrorCode.BAD_REQUEST, "Error: Username already taken.");
        }

        const passwordHash = await bcryptjs.hash(password, SALT_ROUNDS);

        const newUser = {
            username: username,
            password: passwordHash,
        };

        const insertedInfo = await usersCollection.insertOne(newUser);

        if (!insertedInfo.insertedId) {
            throwError(ErrorCode.BAD_REQUEST, "Error: Could not add user.");
        }

        return { userInserted: true };
    } catch (error) {
        throwCatchError(error);
    }
}

async function checkUser(_username, _password) {
    try {
        validateTotalArguments(arguments.length);

        const username = validateUsername(_username).toLowerCase();
        const password = validatePassword(_password);

        const usersCollection = await users();

        const user = await usersCollection.findOne({ username: username });

        console.log(user);

        if (!user) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Either the username or password is invalid"
            );
        }

        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Either the username or password is invalid"
            );
        }

        return { authenticated: true };
    } catch (error) {
        throwCatchError(error);
    }
}

//All validations
const validateTotalArguments = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 2;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: All fields need to have valid values."
        );
    }
};

const validateUsername = (_username) => {
    isArgumentString(_username, "username");
    isStringEmpty(_username, "username");

    const username = _username.trim();

    if (username.length < 4) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Username should be of at least 4 characters long."
        );
    }

    //should match alphanumeric characters
    const usernameRegex = /[^a-zA-Z0-9]/;

    if (usernameRegex.test(username)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Username should have only alphanumeric characters."
        );
    }

    return username;
};

const validatePassword = (_password) => {
    isArgumentString(_password, "password");
    isStringEmpty(_password, "password");

    const password = _password.trim();

    if (password.length < 6) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Password should be of at least 6 characters long."
        );
    }

    //should match alphanumeric characters, special characters and no spaces
    const passwordRegex = /[^\S]/;

    if (passwordRegex.test(password)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Password should have only alphanumeric or special characters and no spaces."
        );
    }

    return password;
};

const isArgumentString = (str, variableName) => {
    if (typeof str !== "string") {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid argument passed for ${
                variableName || "provided variable"
            }. Expected string.`
        );
    }
};

const isStringEmpty = (str, variableName) => {
    if (!str.trim() || str.length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty string passed for ${
                variableName || "provided variable"
            }.`
        );
    }
};

const throwError = (code = 404, message = "Not found") => {
    throw { code, message };
};

const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Error: Internal server error."
    );
};

module.exports = {
    createUser,
    checkUser,
};
