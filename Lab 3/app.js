const people = require("./people");
const stocks = require("./stocks");

async function main() {
    /**
     * All the test cases for people.js functions
     */

    //Test cases for getPersonById(id)
    try {
        const person = await people.getPersonById(
            "4a3f87d3-20d8-42e2-b127-de6e29399250"
        );
        console.log(person);
    } catch (error) {
        console.log(error);
    }

    try {
        const person = await people.getPersonById(9425246234);
        console.log(person);
    } catch (error) {
        console.log(error);
    }

    //Test cases for sameStreet(streetName, streetSuffix)
    try {
        const peopleWithSameStreet = await people.sameStreet(
            "sutherland",
            "point"
        );
        console.dir(peopleWithSameStreet, { depth: null });
    } catch (error) {
        console.log(error);
    }

    try {
        const peopleWithSameStreet = await people.sameStreet("sutherland", "");
        console.dir(peopleWithSameStreet, { depth: null });
    } catch (error) {
        console.log(error);
    }

    //Test cases for manipulateSsn()
    try {
        const ssnManipulations = await people.manipulateSsn();
        console.log(ssnManipulations);
    } catch (error) {
        console.log(error);
    }

    //Test cases for sameBirthday(month, day)
    try {
        const peopleWithSameBirthday = await people.sameBirthday("9", "25");
        console.log(peopleWithSameBirthday);
    } catch (error) {
        console.log(error);
    }

    try {
        const peopleWithSameBirthday = await people.sameBirthday("Nine", "30");
        console.log(peopleWithSameBirthday);
    } catch (error) {
        console.log(error);
    }

    /**
     * All the test cases for stocks.js functions
     */

    //Test cases for listShareholders()
    try {
        const allShareHolders = await stocks.listShareholders();
        console.dir(allShareHolders, { depth: null });
    } catch (error) {
        console.log(error);
    }

    try {
        const allShareHolders = await stocks.listShareholders(
            "Nuveen Preferred and Income 2022 Term Fund"
        );
        console.dir(allShareHolders, { depth: null });
    } catch (error) {
        console.log(error);
    }

    //Test cases for topShareholder(stockName)
    try {
        const topShareholder = await stocks.topShareholder(
            "Nuveen Floating Rate Income Fund"
        );
        console.log(topShareholder);
    } catch (error) {
        console.log(error);
    }

    try {
        const topShareholder = await stocks.topShareholder(NaN);
        console.log(topShareholder);
    } catch (error) {
        console.log(error);
    }

    //Test cases for listStocks(firstName, lastName)
    try {
        const userStockList = await stocks.listStocks("Artemis", "MacIllrick");
        console.log(userStockList);
    } catch (error) {
        console.log(error);
    }

    try {
        const userStockList = await stocks.listStocks("", "MacIllrick");
        console.log(userStockList);
    } catch (error) {
        console.log(error);
    }

    //Test cases for getStockById(id)
    try {
        const stockDetails = await stocks.getStockById(
            "04930e73-4287-4b09-a2e3-010ada39f095"
        );
        console.log(stockDetails);
    } catch (error) {
        console.log(error);
    }

    try {
        const stockDetails = await stocks.getStockById(123124153125125);
        console.log(stockDetails);
    } catch (error) {
        console.log(error);
    }
}

main();
