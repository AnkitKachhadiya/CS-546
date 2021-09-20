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

const replaceChar = (str, identifierIndex) => {
    isArgumentString(str);
    isStringEmpty(str);

    const MINIMUM_REQUIRED_LENGTH = 3;

    isStringLengthValid(str, MINIMUM_REQUIRED_LENGTH);
    isIndexValid(str, identifierIndex);

    const identifier = str.charAt(identifierIndex);

    const firstReplacer = str.charAt(identifierIndex - 1);
    const secondReplacer = str.charAt(identifierIndex + 1);

    let resultantString = "";

    let isReplacedWithFirstReplacer = false;

    str.split("").forEach((currentElement, currentIndex) => {
        //current element matches identifier and current index is not same as identifier index then replace characters
        if (currentElement === identifier && currentIndex !== identifierIndex) {
            //alternatively change with different replacers
            if (isReplacedWithFirstReplacer) {
                resultantString += secondReplacer;
                isReplacedWithFirstReplacer = false;
            } else {
                resultantString += firstReplacer;
                isReplacedWithFirstReplacer = true;
            }
        } else {
            resultantString += currentElement;
        }
    });

    return resultantString;
};

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

const isIndexValid = (str, identifierIndex) => {
    if (typeof identifierIndex !== "number" || isNaN(identifierIndex)) {
        throw "Error: Index should be a number.";
    }

    if (identifierIndex < 1 || identifierIndex >= str.length - 1) {
        throw "Error: Invalid index passed.";
    }
};

const isStringLengthValid = (str, minimumRequiredLength) => {
    if (str.length < minimumRequiredLength) {
        throw `Error: minimum string length should be ${minimumRequiredLength}.`;
    }
};

module.exports = {
    sortString,
    replaceChar,
    mashUp,
};
