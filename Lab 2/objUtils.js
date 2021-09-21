const computeObjects = (arr, computingFunction) => {
    isArgumentArray(arr);
    isArrayEmpty(arr);
    doesArrayHasAllObjects(arr);
    doesArrayOfObjectHasValues(arr);

    isArgumentFunction(computingFunction);

    const result = {};

    arr.forEach((currentObject) => {
        doesObjectHasAllNumbers(currentObject);

        for (const currentProperty in currentObject) {
            const computedValue = computingFunction(
                currentObject[currentProperty]
            );

            if (result[currentProperty] === undefined) {
                result[currentProperty] = computedValue;
            } else {
                result[currentProperty] += computedValue;
            }
        }
    });

    return result;
};

const commonKeys = (obj1, obj2) => {};

const flipObject = (obj) => {};

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

const doesArrayHasAllObjects = (arr) => {
    const isAllElementsObjects = Array.from(arr).every((currentElement) => {
        return (
            !Array.isArray(currentElement) &&
            typeof currentElement === "object" &&
            currentElement !== null &&
            currentElement instanceof Object &&
            currentElement.constructor === Object
        );
    });

    if (!isAllElementsObjects) {
        throw "Error: All elements in an array must be objects.";
    }
};

const doesArrayOfObjectHasValues = (arr) => {
    if (!arr.every((currentObject) => Object.keys(currentObject).length > 0)) {
        throw "Error: All elements in an array must have object as an element with minimum 1 element in that object.";
    }
};

const doesObjectHasAllNumbers = (obj) => {
    const isAllElementsNumbers = Object.values(obj).every((currentElement) => {
        return typeof currentElement === "number" && !isNaN(currentElement);
    });

    if (!isAllElementsNumbers) {
        throw "Error: All elements in an object must be numbers.";
    }
};

const isArgumentFunction = (func) => {
    if (
        typeof func !== "function" ||
        !func instanceof Function ||
        Object.prototype.toString.call(func) !== "[object Function]" ||
        func.constructor !== Function
    ) {
        throw "Error: Invalid argument passed. Expected function.";
    }
};

module.exports = {
    computeObjects,
    commonKeys,
    flipObject,
};
