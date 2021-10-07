const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

async function main() {
    // try {
    //     const saffronLounge = await restaurants.create(
    //         "The Saffron Lounge",
    //         "New York City, New York",
    //         "123-456-7800",
    //         "http://www.Saffron.com",
    //         "$",
    //         ["sdgsg"],
    //         3.346,
    //         { dineIn: true, takeOut: true, delivery: false }
    //     );
    //     console.dir(saffronLounge, { depth: null });
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const restaurantList = await restaurants.getAll();
    //     console.dir(restaurantList, { depth: null });
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const restaurant = await restaurants.get("615f134c37ba347070d7837c");
    //     console.dir(restaurant, { depth: null });
    // } catch (error) {
    //     console.log(error);
    // }

    // try {
    //     const deleteInfo = await restaurants.remove("615f134c37ba347070d7837c");
    //     console.dir(deleteInfo, { depth: null });
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const renamedRestaurant = await restaurants.rename(
            "615f21651883e57c20b94cc6",
            "http://www.saffr.com"
        );
        console.dir(renamedRestaurant, { depth: null });
    } catch (error) {
        console.log(error);
    }

    const db = await connection();
    await db.serverConfig.close();
}

main();
