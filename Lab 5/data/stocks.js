const axios = require("axios");

const JSON_URL = `https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json`;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const allStocks = async () => {
    try {
        const { data } = await axios.get(JSON_URL);
        return data;
    } catch (error) {
        throwCatchError(error);
    }
};

const getStockById = async (id) => {
    isArgumentString(id, "id");
    isStringEmpty(id, "id");

    try {
        const stocks = await allStocks();

        const stock = stocks.find((currentStock) => {
            return currentStock.id === id.trim();
        });

        if (!stock || Object.keys(stock).length < 1) {
            throwError(ErrorCode.NOT_FOUND, "Error: Stock not found.");
        }

        return stock;
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
    allStocks,
    getStockById,
};
