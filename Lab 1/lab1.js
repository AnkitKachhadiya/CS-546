const questionOne = function questionOne(arr) {
  if (!Array.isArray(arr)) {
    return {};
  }

  const result = {};

  arr.forEach((number) => {
    const modifiedNumber = number * number - 7;
    const absoluteModifiedNumber = Math.abs(modifiedNumber);

    result[absoluteModifiedNumber] = isNumberPrime(absoluteModifiedNumber);
  });

  return result;
};

const questionTwo = function questionTwo(arr) {
  // Implement question 2 here
};

const questionThree = function questionThree(arr) {
  // Implement question 3 here
};

const questionFour = function questionFour(num1, num2, num3) {
  // Implement question 4 here
};

const isNumberPrime = (number) => {
  if (number === 1 || number === 0) {
    return false;
  }

  const squareRoot = Math.floor(Math.sqrt(number));

  for (let iterator = 2; iterator <= squareRoot; iterator++) {
    if (number % iterator === 0) {
      return false;
    }
  }
  return true;
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
