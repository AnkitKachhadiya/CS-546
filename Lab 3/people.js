const axios = require("axios");

const API_URL = `https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json`;

const allPeople = async () => {
    try {
        const { data } = await axios.get(API_URL);
        return data;
    } catch (error) {
        throw error;
    }
};

const getPersonById = async (id) => {
    isArgumentString(id);
    isStringEmpty(id);

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

//All validations
const isArgumentString = (str) => {
    if (typeof str !== "string") {
        throw "Error: Invalid argument passed. Expected string.";
    }
};

const isStringEmpty = (str) => {
    if (!str.trim() || str.length < 1) {
        throw "Error: Empty string passed.";
    }
};

module.exports = {
    getPersonById,
};
