const people = require("./people");

async function main() {
    // try {
    //     const person = await people.getPersonById(
    //         "4a3f87d3-20d8-42e2-b127-de6e29399250"
    //     );
    //     console.log(person);
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const peopleWithSameStreet = await people.sameStreet(
            "Sutherland",
            "Point"
        );
        console.dir(peopleWithSameStreet, { depth: null });
    } catch (error) {
        console.log(error);
    }
}

main();
