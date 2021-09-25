const people = require("./people");

async function main() {
    try {
        const person = await people.getPersonById(
            "e5e62215-0e56-4ddd-8cbd-a6a4ded87eff"
        );
        console.log(person);
    } catch (error) {
        console.log(error);
    }
}

main();
