const lab1 = require("./lab1");

/**
 * Question 1 test cases
 */
console.log(lab1.questionOne([5, 3, 10]));
//returns and outputs: {'18': false, '2': true, '93': false}

console.log(lab1.questionOne([2]));
// returns and outputs: {'3': true}

console.log(lab1.questionOne([]));
// returns and outputs: {}

console.log(lab1.questionOne());
// returns and outputs: {}

console.log(lab1.questionOne([-5, 0, 11, 23]));
// returns and outputs: {'7': true, '18': false, '114': false, '522': false}

/**
 * Question 2 test cases
 */
console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
//returns and outputs: [1]

console.log(lab1.questionTwo([1, "1", 1, "1", 2]));
// returns and outputs: [1, '1', 2]

console.log(lab1.questionTwo([3, "a", "b", 3, "1"]));
// returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([]));
//returns and outputs: []

console.log(
	lab1.questionTwo([
		0,
		"0",
		12.3,
		12.3,
		-45,
		true,
		true,
		45,
		"Duplicate",
		"duplicate",
		"Duplicate",
	])
);
//returns and outputs: [0, '0', 12.3, -45, true, 45, 'Duplicate', 'duplicate']

/**
 * Question 3 test cases
 */

/**
 * Question 4 test cases
 */
console.log(lab1.questionFour(1, 3, 2));
//returns and outputs: 4

console.log(lab1.questionFour(2, 6, 5));
//returns and outputs: 194

console.log(lab1.questionFour(2, 0, 7));
//returns and outputs: 1681

console.log(lab1.questionFour(1, 1, 1));
//returns and outputs: 3

console.log(lab1.questionFour(3, 3, 1));
//returns and outputs: 5
