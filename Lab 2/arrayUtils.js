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

const modeSquared = (arr) => {
    isArgumentArray(arr);
    isArrayEmpty(arr);
    doesArrayHasAllNumbers(arr);

    const modes = {};

    const highestModes = [];

    let highestFrequentNumberIndex = arr[0];

    //creating object with key as a current element and value as its frequency
    arr.forEach((currentNumber) => {
        if (modes[currentNumber] === undefined) {
            modes[currentNumber] = 0;
        }

        modes[currentNumber]++;

        //saving index of highest frequent number of the object
        if (modes[highestFrequentNumberIndex] < modes[currentNumber]) {
            highestFrequentNumberIndex = currentNumber;
        }
    });

    //collect all numbers whose frequency matches with highest frequent number
    for (const key in modes) {
        if (modes[key] === modes[highestFrequentNumberIndex]) {
            highestModes.push(Number(key));
        }
    }

    //frequency should be more than 1 to be considered for further calculation
    if (modes[highestFrequentNumberIndex] < 2) {
        return 0;
    }

    //doing sum of mode squared for final result using reduce()
    const modeSquaredSum = highestModes.reduce(
        (previousValue, currentValue) => {
            return previousValue + currentValue * currentValue;
        },
        0
    );

    return modeSquaredSum;
};

const medianElement = (arr) => {
    isArgumentArray(arr);
    isArrayEmpty(arr);
    doesArrayHasAllNumbers(arr);

    const unsortedArr = [...arr];

    arr.sort(sortNumbers);
    const result = {};

    let median;
    let medianIndex;
    let midFirstNumber;
    let midSecondNumber;

    const midPoint = arr.length / 2;

    if (arr.length % 2 === 0) {
        medianIndex = midPoint;
        midFirstNumber = arr[midPoint - 1];
        midSecondNumber = arr[midPoint];

        //median for even length
        median = (midFirstNumber + midSecondNumber) / 2;
    } else {
        medianIndex = Math.floor(midPoint);

        //median for odd length
        median = arr[medianIndex];
    }

    let resultantMedianIndex;

    //set median index to the 1st occurrence of median value
    if (unsortedArr.indexOf(median) >= 0) {
        resultantMedianIndex = unsortedArr.indexOf(median);
    } else {
        midFirstNumberIndex = unsortedArr.indexOf(midFirstNumber);
        midSecondNumberIndex = unsortedArr.indexOf(midSecondNumber);

        //check whether who has higher index value among mid point numbers in an unsorted array
        resultantMedianIndex =
            midFirstNumberIndex > midSecondNumberIndex
                ? midFirstNumberIndex
                : midSecondNumberIndex;
    }

    result[median] = resultantMedianIndex;

    return result;
};

const merge = (arrOne, arrTwo) => {
    isArgumentArray(arrOne);
    isArrayEmpty(arrOne);
    doesArrayHasNumbersOrChars(arrOne);

    isArgumentArray(arrTwo);
    isArrayEmpty(arrTwo);
    doesArrayHasNumbersOrChars(arrTwo);

    const mergedArr = [...arrOne, ...arrTwo];
    const allLowerCaseChars = [];
    const allUpperCaseChars = [];
    const allNumbers = [];

    mergedArr.forEach((currentElement) => {
        if (typeof currentElement === "number") {
            allNumbers.push(currentElement);
            return;
        }

        if (currentElement === currentElement.toLowerCase()) {
            allLowerCaseChars.push(currentElement);
        } else {
            allUpperCaseChars.push(currentElement);
        }
    });

    allLowerCaseChars.sort();
    allUpperCaseChars.sort();
    allNumbers.sort(sortNumbers);

    return [...allLowerCaseChars, ...allUpperCaseChars, ...allNumbers];
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
    const isAllElementsNumbers = Array.from(arr).every((currentElement) => {
        return typeof currentElement === "number" && !isNaN(currentElement);
    });

    if (!isAllElementsNumbers) {
        throw "Error: All elements in an array must be numbers.";
    }
};

const doesArrayHasNumbersOrChars = (arr) => {
    const isAllElementsNumbersAndChars = Array.from(arr).every(
        (currentElement) => {
            //check for number
            if (typeof currentElement === "number" && !isNaN(currentElement)) {
                return true;
            }

            //check for character
            if (
                typeof currentElement === "string" &&
                currentElement.toLowerCase() !== currentElement.toUpperCase() &&
                currentElement.length === 1
            ) {
                return true;
            }

            return false;
        }
    );

    if (!isAllElementsNumbersAndChars) {
        throw "Error: Elements in an array must be numbers or characters.";
    }
};

const sortNumbers = (firstElement, secondElement) => {
    return firstElement - secondElement;
};

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge,
};
