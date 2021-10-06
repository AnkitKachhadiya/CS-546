const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

async function main() {
    const saffronLounge = await restaurants.create(
        "The Saffron Lounge",
        "New York City, New York",
        "123-456-7890",
        "http://www.saffronlounge.com",
        "$$$$",
        ["Cuban", "Italian"],
        3,
        { dineIn: true, takeOut: true, delivery: false }
    );
    console.dir(saffronLounge, { depth: null });

    const db = await connection();
    await db.serverConfig.close();
}

main();
