const lab1 = require("./lab1");

/*
| Question 1 test cases
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
