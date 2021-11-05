const md5 = require("md5");
const axios = require("axios");

const PUBLIC_KEY = "875175d4d2e7d46ee03a11521673f4f8";
const PRIVATE_KEY = "568731aae996814b06edf9552e264a8b8f8df3cd";

const timestamp = new Date().getTime();

const stringToBeHashed = timestamp + PRIVATE_KEY + PUBLIC_KEY;

const hash = md5(stringToBeHashed);

const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters";

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

async function search(_searchTerm) {
    try {
        const searchTerm = validateSearchTerm(_searchTerm);

        const API_URL = `${BASE_URL}?nameStartsWith=${searchTerm}&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=20`;
        const { data } = await axios.get(API_URL);

        if (Object.keys(data).length < 1) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Internal server error."
            );
        }

        if (data.code !== 200 && data.status !== "Ok") {
            throwError(data.code, data.status);
        }

        const searchResults = data.data.results;

        if (searchResults.length < 1) {
            throwError(ErrorCode.NOT_FOUND, []);
        }

        return searchResults;
    } catch (error) {
        throwCatchError(error);
    }
}

async function getCharacterById(_id) {
    try {
        const id = validateCharacterId(_id);

        const API_URL = `${BASE_URL}/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
        const { data } = await axios.get(API_URL);

        if (Object.keys(data).length < 1) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Internal server error."
            );
        }

        if (data.code !== 200 && data.status !== "Ok") {
            throwError(data.code, data.status);
        }

        const searchResults = data.data.results;

        if (searchResults.length < 1) {
            throwError(ErrorCode.NOT_FOUND, []);
        }

        const [character] = searchResults;

        return character;
    } catch (error) {
        throwCatchError(error);
    }
}

//All validations
const validateSearchTerm = (searchTerm) => {
    isArgumentString(searchTerm, "search term");
    isStringEmpty(searchTerm, "search term");

    return searchTerm.trim();
};

const validateCharacterId = (_id) => {
    return isValidInteger(_id, "character id");
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
    if (!str.trim() || str.length < 1 || Number(str) === 0) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty string passed for ${
                variableName || "provided variable"
            }.`
        );
    }
};

const isValidInteger = (id, variableName) => {
    if (typeof id !== "number") {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid argument passed for ${
                variableName || "provided variable"
            }. Expected number.`
        );
    }

    if (!id) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty number passed for ${
                variableName || "provided variable"
            }.`
        );
    }

    const number = parseInt(id, 10);

    if (isNaN(number)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: ${variableName} should be a number.`
        );
    }

    return number;
};

const throwError = (code = 500, message = "Error: Internal server error.") => {
    throw { code, message };
};

const throwCatchError = (error) => {
    if (error.response?.status && error.response?.statusText) {
        throwError(error.response.status, error.response.statusText);
    }

    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Error: Internal server error."
    );
};

module.exports = {
    search,
    getCharacterById,
};
