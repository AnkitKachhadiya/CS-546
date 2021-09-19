const arrayUtils = require("./arrayUtils");

try {
    console.log(arrayUtils.average([[1, 2, 3]]));
    // Returns: 2
} catch (error) {
    console.error(error);
}

try {
    console.log(arrayUtils.average(["guitar", 1, 3, "apple"]));
    // throws an error
} catch (error) {
    console.error(error);
}

console.log(arrayUtils.modeSquared([1, 2, 3, 3, 4, 4, 0]));

try {
    console.log(arrayUtils.modeSquared([1]));
} catch (error) {
    console.error(error);
}
