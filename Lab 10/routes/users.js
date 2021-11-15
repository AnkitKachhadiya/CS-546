const express = require("express");
const data = require("../data");

const usersData = data.users;
const router = express.Router();

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

//login form
router.get("/", async (request, response) => {
    isUserLoggedIn(request, response);

    response.render("users/login", { pageTitle: "Login" });
});

//signup form
router.get("/signup", async (request, response) => {
    isUserLoggedIn(request, response);

    response.render("users/sign-up", { pageTitle: "Sign-up" });
});

//signup submit
router.post("/signup", async (request, response) => {
    isUserLoggedIn(request, response);

    let displayUsername, displayPassword;

    try {
        const requestPostData = request.body;

        displayUsername = requestPostData.username;
        displayPassword = requestPostData.password;

        validateTotalFields(Object.keys(requestPostData).length);

        const username = validateUsername(
            requestPostData.username
        ).toLowerCase();

        const password = validatePassword(requestPostData.password);

        const user = await usersData.createUser(username, password);

        if (!user.userInserted) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Internal server error."
            );
        }

        request.session.user = { username };

        response.redirect("/private");
    } catch (error) {
        response
            .status(error.code || ErrorCode.INTERNAL_SERVER_ERROR)
            .render("users/sign-up", {
                pageTitle: "Sign-up",
                username: displayUsername,
                password: displayPassword,
                error: error.message || "Internal server error.",
            });
    }
});

//login submit
router.post("/login", async (request, response) => {
    isUserLoggedIn(request, response);

    let displayUsername, displayPassword;

    try {
        const requestPostData = request.body;

        displayUsername = requestPostData.username;
        displayPassword = requestPostData.password;

        validateTotalFields(Object.keys(requestPostData).length);

        const username = validateUsername(
            requestPostData.username
        ).toLowerCase();

        const password = validatePassword(requestPostData.password);

        const user = await usersData.checkUser(username, password);

        console.log(user);

        if (!user.authenticated) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Internal server error."
            );
        }

        request.session.user = { username };

        response.redirect("/private");
    } catch (error) {
        response
            .status(error.code || ErrorCode.INTERNAL_SERVER_ERROR)
            .render("users/login", {
                pageTitle: "Login",
                username: displayUsername,
                password: displayPassword,
                error: error.message || "Internal server error.",
            });
    }
});

//private page
router.get("/private", async (request, response) => {
    const user = request.session.user;

    if (!user) {
        response.redirect("/");
    }

    response.render("users/private", { pageTitle: "Private" });
});

//logout
router.get("/logout", async (request, response) => {
    const user = request.session.user;

    if (!user) {
        response.redirect("/");
    }
});

//All validations
const validateTotalFields = (totalFields) => {
    const TOTAL_MANDATORY_FIELDS = 2;

    if (totalFields !== TOTAL_MANDATORY_FIELDS) {
        throwError(ErrorCode.BAD_REQUEST, "Error: You must supply all fields.");
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
            `Error: Invalid type for ${
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

const isUserLoggedIn = (request, response) => {
    const user = request.session.user;

    if (user) {
        response.redirect("/private");
    }
};

module.exports = router;
