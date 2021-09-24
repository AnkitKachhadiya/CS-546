const computeObjects = (arr, computingFunction) => {
    isArgumentArray(arr);
    isArgumentArrayEmpty(arr);
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

const commonKeys = (obj1, obj2) => {
    isArgumentObject(obj1);
    isArgumentObject(obj2);

    if (Object.keys(obj1).length < 1 || Object.keys(obj2).length < 1) {
        return {};
    }

    const allKeys = getCommonKeys(obj1, obj2);

    return allKeys;
};

const flipObject = (obj) => {
    isArgumentObject(obj);
    isObjectEmpty(obj);
    doesObjectHasValidValues(obj);

    return getItFlipped(obj);
};

const getItFlipped = (obj) => {
    const result = {};

    for (const currentProperty in obj) {
        const objectValue = obj[currentProperty];

        if (Array.isArray(objectValue)) {
            if (isArrayEmpty(objectValue)) {
                throw "Error: Value cannot be empty array.";
            }

            doesArrayHasNumbersOrStrings(objectValue);

            objectValue.forEach((currentElement) => {
                result[currentElement] = currentProperty;
            });

            continue;
        }

        if (isObject(objectValue)) {
            if (isObjectEmpty(objectValue)) {
                throw "Error: Value cannot be empty object.";
            }

            doesObjectHasValidValues(objectValue);

            result[currentProperty] = getItFlipped(objectValue);
            continue;
        }

        result[objectValue] = currentProperty;
    }

    return result;
};

const getCommonKeys = (obj1, obj2) => {
    const result = {};

    for (const currentProperty in obj1) {
        //key not present in second object then no need to go further
        if (obj2[currentProperty] === undefined) {
            continue;
        }

        //if both values matches then store it
        if (obj1[currentProperty] === obj2[currentProperty]) {
            result[currentProperty] = obj1[currentProperty];
            continue;
        }

        if (
            Array.isArray(obj1[currentProperty]) &&
            Array.isArray(obj2[currentProperty])
        ) {
            // do something;

            if (isBothArraySame(obj1[currentProperty], obj2[currentProperty])) {
                result[currentProperty] = obj1[currentProperty];
            }
        }

        //solution for including empty objects or {}
        if (
            isObject(obj1[currentProperty]) &&
            isObject(obj2[currentProperty])
        ) {
            const mediatorResult = getCommonKeys(
                obj1[currentProperty],
                obj2[currentProperty]
            );

            if (
                (Object.keys(obj1[currentProperty]).length > 0 ||
                    Object.keys(obj2[currentProperty]).length > 0) &&
                Object.keys(mediatorResult).length < 1
            ) {
                continue;
            }

            result[currentProperty] = mediatorResult;
        }
    }

    return result;
};

//All validations
const isArgumentArray = (arr) => {
    if (!Array.isArray(arr)) {
        throw "Error: Invalid argument passed. Expected array.";
    }
};

const isArgumentArrayEmpty = (arr) => {
    if (isArrayEmpty(arr)) {
        throw "Error: Empty array passed.";
    }
};

const isArrayEmpty = (arr) => {
    return arr.length < 1;
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

const isArgumentObject = (obj) => {
    if (!isObject(obj)) {
        throw "Error: Invalid argument passed. Expected object.";
    }
};

const isObject = (obj) => {
    return (
        !Array.isArray(obj) &&
        typeof obj === "object" &&
        obj !== null &&
        obj instanceof Object &&
        obj.constructor === Object
    );
};

const isObjectEmpty = (obj) => {
    if (Object.keys(obj).length < 1) {
        throw "Error: Empty object passed.";
    }
};

const doesObjectHasValidValues = (obj) => {
    const hasInvalidElements = Object.values(obj).some((currentElement) => {
        return (
            typeof currentElement === "boolean" ||
            currentElement === null ||
            currentElement === undefined ||
            currentElement === NaN
        );
    });

    if (hasInvalidElements) {
        throw "Error: Element(s) in an object is not valid.";
    }
};

const isStringEmpty = (str) => {
    return typeof str === "string" && str.trim().length < 1;
};

const doesArrayHasNumbersOrStrings = (arr) => {
    const isAllElementsNumbersOrStrings = Array.from(arr).every(
        (currentElement) => {
            if (typeof currentElement === "number" && !isNaN(currentElement)) {
                return true;
            }

            if (typeof currentElement === "string") {
                return true;
            }

            return false;
        }
    );

    if (!isAllElementsNumbersOrStrings) {
        throw "Error: Elements in an array must be numbers or strings.";
    }
};

const isBothArraySame = (arr1, arr2) => {
    return arr1.every(function (currentElement, currentIndex) {
        //check for normal array with array in it
        if (
            Array.isArray(currentElement) &&
            Array.isArray(arr2[currentIndex])
        ) {
            return isBothArraySame(currentElement, arr2[currentIndex]);
        }

        //check for nested array with object in it
        if (isObject(currentElement) && isObject(arr2[currentIndex])) {
            const mediatorResult = getCommonKeys(
                currentElement,
                arr2[currentIndex]
            );

            if (
                (Object.keys(currentElement).length > 0 ||
                    Object.keys(arr2[currentIndex]).length > 0) &&
                Object.keys(mediatorResult).length < 1
            ) {
                return false;
            } else {
                return true;
            }
        } else {
            return currentElement === arr2[currentIndex];
        }
    });
};

module.exports = {
    computeObjects,
    commonKeys,
    flipObject,
};
