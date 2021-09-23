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
//     console.log(arrayUtils.medianElement([1, 5, 6, 6, 7, 8]));
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

// try {
//     console.log(
//         objUtils.computeObjects(
//             [
//                 { x: 2, y: 3 },
//                 { a: 70, x: 4, z: 5 },
//             ],
//             (x) => x * 2
//         )
//     );
// } catch (error) {
//     console.error(error);
// }

// {
//     a: 2,
//     b: 4,
//     c: null,
//     cd: true,
//     cdd: false,
//     cdc: undefined,
//     csf: NaN,
//     css: [],
//     cas: {},
//     axa: "",
//     axs: (x) => x,
// },
// { a: 5, b: 4 },
// {
//     a: 1,
//     b: { c: [1, 2, 3], d: { f: 2, z: 2 } },
//     z: [1, 2, { x: 3, y: 4 }],
// }

try {
    console.log(
        objUtils.commonKeys(
            { a: 2, b: { x: 7, c: { b: {}, d: 1 } } },
            { a: 3, b: { x: 7, y: 10, c: { b: {}, d: 2 } } }
        )
    );
} catch (error) {
    console.error(error);
}
