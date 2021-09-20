const sortString = (str) => {
    isArgumentString(str);
    isStringEmpty(str);

    const arrayedString = str.split("");

    const allChars = [];
    const allNumbers = [];
    const allSpaces = [];
    const allSpecialChars = [];

    arrayedString.forEach((currentElement) => {
        //check for number
        if (!isNaN(currentElement) && !isNaN(parseFloat(currentElement))) {
            allNumbers.push(currentElement);
            return;
        }

        //check for characters
        if (currentElement.toLowerCase() !== currentElement.toUpperCase()) {
            allChars.push(currentElement);
            return;
        }

        //check for empty space or empty string
        if (currentElement === " ") {
            allSpaces.push(currentElement);
            return;
        }

        allSpecialChars.push(currentElement);
    });

    allChars.sort();
    allNumbers.sort();

    return [...allChars, ...allSpecialChars, ...allNumbers, ...allSpaces].join(
        ""
    );
};

const replaceChar = (str, index) => {};

const mashUp = (str1, str2, char) => {};

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
    sortString,
    replaceChar,
    mashUp,
};
