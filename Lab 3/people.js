const axios = require("axios");

const JSON_URL = `https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json`;

const allPeople = async () => {
    try {
        const { data } = await axios.get(JSON_URL);
        return data;
    } catch (error) {
        throw error;
    }
};

const getPersonById = async (id) => {
    isArgumentString(id, "id");
    isStringEmpty(id, "id");

    try {
        const people = await allPeople();

        for (const currentPerson of people) {
            if (currentPerson.id === id) {
                return currentPerson;
            }
        }

        throw "Error: Person not found.";
    } catch (error) {
        throw error;
    }
};

const sameStreet = async (streetName, streetSuffix) => {
    isArgumentString(streetName, "street name");
    isStringEmpty(streetName, "street name");

    isArgumentString(streetSuffix, "street suffix");
    isStringEmpty(streetSuffix, "street suffix");

    try {
        const people = await allPeople();

        const result = people.filter((currentPerson) => {
            const doesMatchHome =
                currentPerson.address.home.street_name.toLowerCase() ===
                    streetName.toLowerCase() &&
                currentPerson.address.home.street_suffix.toLowerCase() ===
                    streetSuffix.toLowerCase();

            const doesMatchWork =
                currentPerson.address.work.street_name.toLowerCase() ===
                    streetName.toLowerCase() &&
                currentPerson.address.work.street_suffix.toLowerCase() ===
                    streetSuffix.toLowerCase();

            if (doesMatchHome || doesMatchWork) {
                return true;
            }

            return false;
        });

        if (result.length > 1) {
            return result;
        }

        throw `Error: There are not at least two people that live or work on ${streetName} ${streetSuffix}.`;
    } catch (error) {
        throw error;
    }
};

const manipulateSsn = async () => {
    try {
        const people = await allPeople();

        let highestSsn = 0;
        let lowestSsn = 999999999;
        let ssnTotal = 0;

        const result = {};

        people.forEach((currentPerson) => {
            //eg. '987-654-3210'
            const ssn = currentPerson.ssn;

            //eg. '9876543210'
            const nonDashedSsn = ssn.replace(/-/g, "");

            //eg. '9876543210'
            // => (convert to array) arr['9', '8', '7', ....]
            // => (sort) arr['0', '1', '2', ....]
            // => (join) 0123456789
            // => (parseInt) 123456789
            const sortedSsn = parseInt(nonDashedSsn.split("").sort().join(""));

            if (sortedSsn > highestSsn) {
                highestSsn = sortedSsn;
                result.highest = {
                    firstName: currentPerson.first_name,
                    lastName: currentPerson.last_name,
                };
            }

            if (sortedSsn < lowestSsn) {
                lowestSsn = sortedSsn;
                result.lowest = {
                    firstName: currentPerson.first_name,
                    lastName: currentPerson.last_name,
                };
            }

            ssnTotal += sortedSsn;
        });

        const ssnAverage = Math.floor(ssnTotal / people.length);

        result.average = ssnAverage;

        return result;
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
    getPersonById,
    sameStreet,
    manipulateSsn,
};
