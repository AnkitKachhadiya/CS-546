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
            if (currentPerson.id === id.trim()) {
                return currentPerson;
            }
        }

        throw "Error: Person not found.";
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
    allPeople,
    getPersonById,
};
