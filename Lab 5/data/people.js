const axios = require("axios");

const JSON_URL = `https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json`;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const allPeople = async () => {
    try {
        const { data } = await axios.get(JSON_URL);
        return data;
    } catch (error) {
        throwCatchError(error);
    }
};

const getPersonById = async (id) => {
    isArgumentString(id, "id");
    isStringEmpty(id, "id");

    try {
        const people = await allPeople();

        for (const currentPerson of people) {
            if (currentPerson.id === id.trim()) {
                return currentPerson;
            }
        }

        throwError(ErrorCode.NOT_FOUND, "Error: Person not found.");
    } catch (error) {
        throwCatchError(error);
    }
};

//All validations
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
    allPeople,
    getPersonById,
};
