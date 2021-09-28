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

        for (currentStock of stocks) {
            if (currentStock.shareholders.length < 1) {
                continue;
            }

            const shareholders = currentStock.shareholders;

            currentStock.shareholders = [];

            for (currentShareholder of shareholders) {
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
    } catch (error) {}
}

module.exports = {
    listShareholders,
};
