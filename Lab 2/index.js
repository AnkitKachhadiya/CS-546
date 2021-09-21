const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// try {
//     console.log(arrayUtils.average([[1, 2, 3]]));
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(arrayUtils.modeSquared([1, 2, 3, 3, 4]));
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(arrayUtils.medianElement([5, 6, 6, 7]));
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(arrayUtils.merge([1, 2, 3], [3, 1, 2]));
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(stringUtils.sortString("123 FOO BAR!"));
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(stringUtils.replaceChar("Daddy", 2));
// } catch (error) {
//     console.error(error);
// }

// try {
//     console.log(stringUtils.mashUp("Patrick", "Hill", "$"));
// } catch (error) {
//     console.error(error);
// }

try {
    console.log(
        objUtils.computeObjects(
            [
                { x: 2, y: 3 },
                { a: 70, x: 4, z: 5 },
            ],
            (x) => x * 2
        )
    );
} catch (error) {
    console.error(error);
}
