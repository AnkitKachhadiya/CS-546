const axios = require("axios");

const JSON_URL = `https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json`;

const allStocks = async () => {
    try {
        const { data } = await axios.get(JSON_URL);
        return data;
    } catch (error) {
        throw error;
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
            throw "Stock not found";
        }

        return stock;
    } catch (error) {
        throw error;
    }
};

//All validations
const isArgumentString = (str, variableName) => {
    if (typeof str !== "string") {
        throw `Error: Invalid argument passed for ${
            variableName || "provided variable"
        }. Expected string.`;
    }
};

const isStringEmpty = (str, variableName) => {
    if (!str.trim() || str.length < 1) {
        throw `Error: Empty string passed for ${
            variableName || "provided variable"
        }.`;
    }
};

module.exports = {
    allStocks,
    getStockById,
};
