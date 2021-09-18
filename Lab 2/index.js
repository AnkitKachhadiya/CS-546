const arrayUtils = require("./arrayUtils");

try {
    console.log(arrayUtils.average([[0.1, 2, 0.3]]));
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
