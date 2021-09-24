const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

/**
 * All the test cases for arrayUtils.js functions
 */

// Test cases for average([arrays])
try {
    const averagePass = arrayUtils.average([
        [1, 3],
        [2, 4, 5],
    ]);
    console.log(averagePass);
    console.log("average([arrays]) passed successfully");
} catch (error) {
    console.error(error, "average([arrays]) failed test case");
}

try {
    const averageFail = arrayUtils.average([[1, 2], "Average", "me"]);
    console.log(averageFail);
    console.error("average([arrays]) did not error");
} catch (error) {
    console.log(error, "average([arrays]) failed successfully");
}

// Test cases for modeSquared(array)
try {
    const modeSquaredPass = arrayUtils.modeSquared([1, 2, 3, 4]);
    console.log(modeSquaredPass);
    console.log("modeSquared(array) passed successfully");
} catch (error) {
    console.error(error, "modeSquared(array) failed test case");
}

try {
    const modeSquaredFail = arrayUtils.modeSquared([1, 2, "string"]);
    console.log(modeSquaredFail);
    console.error("modeSquared(array) did not error");
} catch (error) {
    console.log(error, "modeSquared(array) failed successfully");
}

// Test cases for medianElement(array)
try {
    const medianElementPass = arrayUtils.medianElement([5, 6, 7]);
    console.log(medianElementPass);
    console.log("medianElement(array) passed successfully");
} catch (error) {
    console.error(error, "medianElement(array) failed test case");
}

try {
    const medianElementFail = arrayUtils.medianElement([1, 2, "Nada"]);
    console.log(medianElementFail);
    console.error("medianElement(array) did not error");
} catch (error) {
    console.log(error, "medianElement(array) failed successfully");
}

// Test cases for merge(arrayOne, arrayTwo)
try {
    const mergePass = arrayUtils.merge(["a", "A", "B"], [1, 2, "b"]);
    console.log(mergePass);
    console.log("merge(arrayOne, arrayTwo) passed successfully");
} catch (error) {
    console.error(error, "merge(arrayOne, arrayTwo) failed test case");
}

try {
    const mergeFail = arrayUtils.merge(["A", "B", "a"], [1, 2, undefined]);
    console.log(mergeFail);
    console.error("merge(arrayOne, arrayTwo) did not error");
} catch (error) {
    console.log(error, "merge(arrayOne, arrayTwo) failed successfully");
}

/**
 * All the test cases for stringUtils.js functions
 */

// Test cases for sortString(string)
try {
    const sortStringPass = stringUtils.sortString("123 FoO BaR!");
    console.log(sortStringPass);
    console.log("sortString(string) passed successfully");
} catch (error) {
    console.error(error, "sortString(string) failed test case");
}

try {
    const sortStringFail = stringUtils.sortString(["Hello", "234525"]);
    console.log(sortStringFail);
    console.error("sortString(string) did not error");
} catch (error) {
    console.log(error, "sortString(string) failed successfully");
}

// Test cases for replaceChar(string, idx)
try {
    const replaceCharPass = stringUtils.replaceChar("dadcyacd", 2);
    console.log(replaceCharPass);
    console.log("replaceChar(string, idx) passed successfully");
} catch (error) {
    console.error(error, "replaceChar(string, idx) failed test case");
}

try {
    const replaceCharFail = stringUtils.replaceChar("dadcyacd", 0);
    console.log(replaceCharFail);
    console.error("replaceChar(string, idx) did not error");
} catch (error) {
    console.log(error, "replaceChar(string, idx) failed successfully");
}

// Test cases for mashUp(string1, string2, char)
try {
    const mashUpPass = stringUtils.mashUp("Hi", "There", "@");
    console.log(mashUpPass);
    console.log("mashUp(string1, string2, char) passed successfully");
} catch (error) {
    console.error(error, "mashUp(string1, string2, char) failed test case");
}

try {
    const mashUpFail = stringUtils.mashUp("Patrick", "Hill", 9);
    console.log(mashUpFail);
    console.error("mashUp(string1, string2, char) did not error");
} catch (error) {
    console.log(error, "mashUp(string1, string2, char) failed successfully");
}

/**
 * All the test cases for objUtils.js functions
 */

// Test cases for computeObjects([objects], func)
try {
    const computeObjectsPass = objUtils.computeObjects(
        [
            { x: 2, y: 3 },
            { a: 70, x: 4, z: 5 },
        ],
        (x) => x * 2
    );
    console.log(computeObjectsPass);
    console.log("computeObjects([objects], func) passed successfully");
} catch (error) {
    console.error(error, "computeObjects([objects], func) failed test case");
}

try {
    const computeObjectsFail = objUtils.computeObjects(
        [{}, { x: 2, y: 3 }],
        (x) => x * 2
    );
    console.log(computeObjectsFail);
    console.error("computeObjects([objects], func) did not error");
} catch (error) {
    console.log(error, "computeObjects([objects], func) failed successfully");
}

// Test cases for commonKeys(obj1, obj2)
try {
    const commonKeysPass = objUtils.commonKeys(
        { a: 2, b: [1, 3, 9, 2], c: 34, d: {}, dc: { c: [] } },
        { a: 2, b: [1, 3, 9], c: 54, d: { c: 2 }, dc: {} }
    );
    console.log(commonKeysPass);
    console.log("commonKeys(obj1, obj2) passed successfully");
} catch (error) {
    console.error(error, "commonKeys(obj1, obj2) failed test case");
}

try {
    const commonKeysPass = objUtils.commonKeys({ a: [] }, "ABCD");
    console.log(commonKeysPass);
    console.error("commonKeys(obj1, obj2) did not error");
} catch (error) {
    console.log(error, "commonKeys(obj1, obj2) failed successfully");
}

// Test cases for flipObject(object)
try {
    const flipObjectPass = objUtils.flipObject({
        a: 3,
        b: 7,
        c: { x: { d: 3 } },
    });
    console.log(flipObjectPass);
    console.log("flipObject(object) passed successfully");
} catch (error) {
    console.error(error, "flipObject(object) failed test case");
}

try {
    const flipObjectFail = objUtils.flipObject({
        a: "",
        "": 1,
        z: [],
    });
    console.log(flipObjectFail);
    console.error("flipObject(object) did not error");
} catch (error) {
    console.log(error, "flipObject(object) failed successfully");
}
