const arrayUtils = require("./arrayUtils");

try {
    console.log(arrayUtils.average([[1, 2, 3]]));
    // Returns: 2
} catch (error) {
    console.error(error);
}

// try {
//     console.log(arrayUtils.average(["guitar", 1, 3, "apple"]));
//     // throws an error
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(arrayUtils.modeSquared([1, 2, 3, 3, 4]));
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(arrayUtils.modeSquared([]));
// } catch (error) {
//     console.error(error);
// }

try {
    console.log(arrayUtils.medianElement([1.1, 0.1, 0.1]));
} catch (error) {
    console.error(error);
}
