const people = require("./people");
const stocks = require("./stocks");

async function main() {
    // try {
    //     const person = await people.getPersonById(
    //         "4a3f87d3-20d8-42e2-b127-de6e29399250"
    //     );
    //     console.log(person);
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const peopleWithSameStreet = await people.sameStreet(
    //         "sutherland",
    //         "point"
    //     );
    //     console.dir(peopleWithSameStreet, { depth: null });
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const ssnManipulations = await people.manipulateSsn();
    //     console.log(ssnManipulations);
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const peopleWithSameBirthday = await people.sameBirthday(9, 30);
    //     console.log(peopleWithSameBirthday);
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const allShareHolders = await stocks.listShareholders();
    //     console.dir(allShareHolders, { depth: null });
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const topShareholder = await stocks.topShareholder(
    //         "Aeglea BioTherapeutics, Inc."
    //     );
    //     console.log(topShareholder);
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const userStockList = await stocks.listStocks("Grenville", "Pawelke");
        console.log(userStockList);
    } catch (error) {
        console.log(error);
    }
}

main();
