const axios = require("axios");

const PEOPLE_JSON_URL = `https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json`;

const STOCKS_JSON_URL = `https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json`;

const allPeople = async () => {
    try {
        const { data } = await axios.get(PEOPLE_JSON_URL);
        return data;
    } catch (error) {
        throw error;
    }
};

const allStocks = async () => {
    try {
        const { data } = await axios.get(STOCKS_JSON_URL);
        return data;
    } catch (error) {
        throw error;
    }
};

async function listShareholders() {
    if (arguments.length > 0) {
        throw "Error: This function doesn't require to pass parameters.";
    }

    try {
        const stocks = await allStocks();
        const people = await allPeople();

        for (const currentStock of stocks) {
            if (currentStock.shareholders.length < 1) {
                continue;
            }

            const shareholders = currentStock.shareholders;

            currentStock.shareholders = [];

            for (const currentShareholder of shareholders) {
                people.find((currentPerson) => {
                    if (currentPerson.id === currentShareholder.userId) {
                        currentStock.shareholders.push({
                            first_name: currentPerson.first_name,
                            last_name: currentPerson.last_name,
                            number_of_shares:
                                currentShareholder.number_of_shares,
                        });
                    }
                });
            }
        }

        return stocks;
    } catch (error) {
        throw error;
    }
}

const topShareholder = async (_stockName) => {
    isArgumentString(_stockName, "stock name");
    isStringEmpty(_stockName, "stock name");

    const stockName = _stockName.trim();

    try {
        const stocks = await allStocks();
        const people = await allPeople();

        const [stock] = stocks.filter((currentStock) => {
            return currentStock.stock_name === stockName;
        });

        if (!stock) {
            throw `Error: There is no stock with name ${stockName}`;
        }

        if (stock.shareholders.length < 1) {
            throw `${stockName} currently has no shareholders.`;
        }

        let maxShares = 0;
        let indexOfMaxShareholder;

        stock.shareholders.forEach((currentShareholder, currentIndex) => {
            if (maxShares < currentShareholder.number_of_shares) {
                maxShares = currentShareholder.number_of_shares;
                indexOfMaxShareholder = currentIndex;
            }
        });

        const [person] = people.filter((currentPerson) => {
            return (
                currentPerson.id ===
                stock.shareholders[indexOfMaxShareholder].userId
            );
        });

        if (!person) {
            throw `No shareholder found for stock ${stockName}`;
        }

        return `With ${stock.shareholders[indexOfMaxShareholder].number_of_shares} shares in ${stockName}, ${person.first_name} ${person.last_name} is the top shareholder.`;
    } catch (error) {
        throw error;
    }
};

const listStocks = async (_firstName, _lastName) => {
    isArgumentString(_firstName, "first name");
    isStringEmpty(_firstName, "first name");

    isArgumentString(_lastName, "last name");
    isStringEmpty(_lastName, "last name");

    const firstName = _firstName.trim();
    const lastName = _lastName.trim();

    try {
        const stocks = await allStocks();
        const people = await allPeople();

        const [person] = people.filter((currentPerson) => {
            return (
                currentPerson.first_name === firstName &&
                currentPerson.last_name === lastName
            );
        });

        if (!person) {
            throw `Error: There is no person with name ${firstName} ${lastName}.`;
        }

        const result = [];

        for (const currentStock of stocks) {
            if (currentStock.shareholders.length < 1) {
                continue;
            }

            currentStock.shareholders.forEach((currentShareholder) => {
                if (currentShareholder.userId === person.id) {
                    result.push({
                        stock_name: currentStock.stock_name,
                        number_of_shares: currentShareholder.number_of_shares,
                    });
                }
            });
        }

        return result;
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
    listShareholders,
    topShareholder,
    listStocks,
    getStockById,
};
