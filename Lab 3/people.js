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

async function manipulateSsn() {
    if (arguments.length > 0) {
        throw "Error: This function doesn't require to pass parameters.";
    }

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
}

const sameBirthday = async (month, day) => {
    try {
        const intMonth = toInteger(month, "month");
        const intDay = toInteger(day, "day");

        isMonthValid(intMonth);
        isDayValid(intDay);

        doesFebruaryHasValidDate(intMonth, intDay);

        const birthDay = isBirthDateValid(intMonth, intDay);

        const people = await allPeople();

        const result = [];

        people.forEach((currentPerson) => {
            const personDateOfBirth = currentPerson.date_of_birth;

            const arrayedDateOfBirth = personDateOfBirth.split("/");

            if (
                intMonth === parseInt(arrayedDateOfBirth[0]) &&
                intDay === parseInt(arrayedDateOfBirth[1])
            ) {
                result.push(
                    `${currentPerson.first_name} ${currentPerson.last_name}`
                );
            }
        });

        if (result.length > 0) {
            return result;
        }

        throw `Error: There are no people with birth day ${birthDay.getDate()} ${birthDay.toLocaleString(
            "default",
            { month: "long" }
        )}.`;
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

const toInteger = (argument, variableName) => {
    if (
        typeof argument === "number" &&
        !isNaN(argument) &&
        argument % 1 === 0
    ) {
        return argument;
    }

    if (
        typeof argument === "number" &&
        !isNaN(argument) &&
        argument % 1 !== 0
    ) {
        throw `Error: ${argument} is not a valid ${variableName}.`;
    }

    const integer = parseInt(argument, 10);

    if (isNaN(integer)) {
        throw `Error: Invalid argument passed for ${
            variableName || "provided variable"
        }. Expected valid string or whole number.`;
    }

    return integer;
};

const isMonthValid = (month) => {
    if (month < 1 || month > 12) {
        throw `Error: ${month} is invalid month.`;
    }
};

const isDayValid = (day) => {
    if (day < 1 || day > 31) {
        throw `Error: ${day} is invalid day.`;
    }
};

const doesFebruaryHasValidDate = (month, day) => {
    if (month !== 2) {
        return;
    }

    if (day >= 29) {
        throw `Error: There are not ${day} days in February.`;
    }
};

const isBirthDateValid = (month, day) => {
    const firstOfMonth = new Date(new Date().getFullYear(), month - 1, 1);

    const birthDate = new Date(firstOfMonth.getFullYear(), month - 1, day);

    if (!(birthDate instanceof Date) || isNaN(birthDate.valueOf())) {
        throw "Error: Invalid month or day.";
    }

    if (day !== birthDate.getDate()) {
        throw `Error: There are not ${day} days in ${firstOfMonth.toLocaleString(
            "default",
            { month: "long" }
        )}`;
    }

    return birthDate;
};

module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday,
};
