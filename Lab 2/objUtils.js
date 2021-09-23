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

const commonKeys = (obj1, obj2) => {
    isArgumentObject(obj1);
    isArgumentObject(obj2);

    if (Object.keys(obj1).length < 1 || Object.keys(obj2).length < 1) {
        return {};
    }

    const allKeys = getCommonKeys(obj1, obj2);

    return allKeys;
};

const flipObject = (obj) => {};

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
        }

        // alternate approach
        // if (
        //     isObject(obj1[currentProperty]) &&
        //     isObject(obj2[currentProperty])
        // ) {
        //     const mediatorResult = getCommonKeys(
        //         obj1[currentProperty],
        //         obj2[currentProperty]
        //     );

        //     if (Object.keys(mediatorResult).length > 0) {
        //         result[currentProperty] = mediatorResult;
        //     }
        // }

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
                Object.keys(obj1[currentProperty]).length > 0 &&
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

module.exports = {
    computeObjects,
    commonKeys,
    flipObject,
};
