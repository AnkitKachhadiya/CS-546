const questionOne = function questionOne(arr) {
    if (!Array.isArray(arr) || arr.length <= 0) {
        return {};
    }

    const result = {};

    arr.forEach((currentNumber) => {
        const modifiedNumber = currentNumber * currentNumber - 7;
        const absoluteModifiedNumber = Math.abs(modifiedNumber);

        result[absoluteModifiedNumber] = isNumberPrime(absoluteModifiedNumber);
    });

    return result;
};

const questionTwo = function questionTwo(arr) {
    if (!Array.isArray(arr) || arr.length <= 0) {
        return [];
    }

    const uniqueArray = [];

    arr.forEach((currentElement) => {
        if (!uniqueArray.includes(currentElement)) {
            uniqueArray.push(currentElement);
        }
    });

    return uniqueArray;
};

const questionThree = function questionThree(arr) {
    // Implement question 3 here
};

const questionFour = function questionFour(num1, num2, num3) {
    if (num1 < 0 || num2 < 0 || num3 < 0) {
        return "Number(s) cannot be negative.";
    }

    if (num1 === 0 && num2 === 0 && num3 === 0) {
        return "Atleast 1 number must be greater than 0.";
    }

    const totalFactorialSum =
        calculateFactorial(num1) +
        calculateFactorial(num2) +
        calculateFactorial(num3);

    const average = (num1 + num2 + num3) / 3;

    return Math.floor(totalFactorialSum / average);
};

const isNumberPrime = (number) => {
    if (number === 1 || number === 0) {
        return false;
    }

    const squareRoot = Math.floor(Math.sqrt(number));

    let iterator;

    for (iterator = 2; iterator <= squareRoot; iterator++) {
        if (number % iterator === 0) {
            return false;
        }
    }
    return true;
};

const calculateFactorial = (number) => {
    if (number === 1 || number === 0) {
        return 1;
    }

    let factorial = 1;

    let iterator;
    for (iterator = 1; iterator <= number; iterator++) {
        factorial = factorial * iterator;
    }

    return factorial;
};

module.exports = {
    firstName: "Ankit",
    lastName: "Kachhadiya",
    studentId: "20007140",
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
};
