const arrayUtils = require("./arrayUtils");

try {
    console.log(arrayUtils.average([[1, 2, 3]]));
} catch (error) {
    console.error(error);
}

try {
    console.log(arrayUtils.modeSquared([1, 2, 3, 3, 4]));
} catch (error) {
    console.error(error);
}

try {
    console.log(arrayUtils.medianElement([5, 6, 6, 7]));
} catch (error) {
    console.error(error);
}

try {
    console.log(arrayUtils.merge([1, 2, 3], [3, 1, 2]));
} catch (error) {
    console.error(error);
}
