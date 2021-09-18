const average = (arr) => {
    isArgumentArray(arr);
    isArrayEmpty(arr);
    doesArrayHasAllArrays(arr);
    doesArrayOfArrayHasValues(arr);

    let sum = 0;
    let totalCount = 0;
    arr.forEach((currentArray) => {
        doesArrayHasAllNumbers(currentArray);

        currentArray.forEach((currentElement) => {
            sum = sum + currentElement;
            totalCount++;
        });
    });

    return Math.round(sum / totalCount);
};

const modeSquared = (arr) => {};

const medianElement = (arr) => {};

const merge = (arr) => {};

//All validations
const isArgumentArray = (arr) => {
    if (!Array.isArray(arr)) {
        throw "Error: Invalid argument passed. Expected array.";
    }
};

const isArrayEmpty = (arr) => {
    if (arr.length < 1) {
        throw "Error: Empty array passed.";
    }
};

const doesArrayHasAllArrays = (arr) => {
    if (!arr.every((currentArray) => Array.isArray(currentArray))) {
        throw "Error: All elements in an array must have array as an element.";
    }
};

const doesArrayOfArrayHasValues = (arr) => {
    if (!arr.every((currentArray) => currentArray.length > 0)) {
        throw "Error: All elements in an array must have array as an element with minimum 1 element in that array.";
    }
};

const doesArrayHasAllNumbers = (arr) => {
    const isAllElementsNumbers = arr.every((currentElement) => {
        return typeof currentElement === "number" && !isNaN(currentElement);
    });

    if (!isAllElementsNumbers) {
        throw "Error: All elements in an array must have array as an element containing only numbers.";
    }
};

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge,
};
