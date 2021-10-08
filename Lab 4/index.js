const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

async function main() {
    // 1.Create a restaurant of your choice.
    try {
        const newRestaurant = await restaurants.create(
            "Artichoke Basille's Pizza",
            "96 Hudson Street, Hoboken, New Jersey",
            "201-683-3051",
            "https://www.artichokepizza.com",
            "$$$",
            ["Italian", "American"],
            4.3,
            { dineIn: true, takeOut: true, delivery: false }
        );
    } catch (error) {
        console.log(error);
    }

    //2.Log the newly created restaurant. (Just that restaurant, not all restaurants)
    try {
        const restaurantList = await restaurants.getAll();
        if (restaurantList.length > 0) {
            console.log(restaurantList[0]);
        }
    } catch (error) {
        console.log(error);
    }

    //3.Create another restaurant of your choice.
    try {
        const newRestaurant = await restaurants.create(
            "McDonald's",
            "Hoboken, New Jersey",
            "201-798-2078",
            "https://www.mcdonalds.com",
            "$$",
            ["Italian", "American"],
            4,
            { dineIn: true, takeOut: true, delivery: true }
        );
    } catch (error) {
        console.log(error);
    }

    //4.Query all restaurants, and log them all
    try {
        const restaurantList = await restaurants.getAll();
        console.dir(restaurantList, { depth: null });
    } catch (error) {
        console.log(error);
    }

    //5.Create the 3rd restaurant of your choice.
    try {
        const newRestaurant = await restaurants.create(
            "Pizza Hut",
            "North Bergen, New Jersey",
            "201-867-2012",
            "http://www.pizzahut.com",
            "$$$",
            ["Italian", "American"],
            4.2,
            { dineIn: false, takeOut: true, delivery: true }
        );
    } catch (error) {
        console.log(error);
    }

    //6.Log the newly created 3rd restaurant. (Just that restaurant, not all restaurants)
    try {
        const restaurantList = await restaurants.getAll();
        if (restaurantList.length > 0) {
            console.log(restaurantList[2]);
        }
    } catch (error) {
        console.log(error);
    }

    //7.Rename the first restaurant website
    try {
        const restaurantList = await restaurants.getAll();
        if (restaurantList.length > 0) {
            await restaurants.rename(
                restaurantList[0]._id,
                "https://www.artichoke.com"
            );
        }
    } catch (error) {
        console.log(error);
    }

    //8.Log the first restaurant with the updated website.
    try {
        const restaurantList = await restaurants.getAll();
        if (restaurantList.length > 0) {
            console.log(restaurantList[0]);
        }
    } catch (error) {
        console.log(error);
    }

    //9.Remove the second restaurant you created.
    try {
        const restaurantList = await restaurants.getAll();
        if (restaurantList.length > 0) {
            const deletionInfo = await restaurants.remove(
                restaurantList[1]._id
            );
            console.log(deletionInfo);
        }
    } catch (error) {
        console.log(error);
    }

    //10.Query all restaurants, and log them all
    try {
        const restaurantList = await restaurants.getAll();
        console.dir(restaurantList, { depth: null });
    } catch (error) {
        console.log(error);
    }

    //11.Try to create a restaurant with bad input parameters to make sure it throws errors.
    try {
        const newRestaurant = await restaurants.create(
            "Pizza Hut",
            "North Bergen, New Jersey",
            "1-201-867-2012",
            "http://www.pizzahut.com",
            "$$&",
            ["Italian", "American"],
            4.2,
            { dineIn: false, takeOut: true, delivery: true }
        );
    } catch (error) {
        console.log(error);
    }

    //12.Try to remove a restaurant that does not exist to make sure it throws errors.
    try {
        const restaurant = await restaurants.remove("600f177c37ba347070d00000");
        console.dir(restaurant, { depth: null });
    } catch (error) {
        console.log(error);
    }

    //13.Try to rename a restaurant that does not exist to make sure it throws errors.
    try {
        const renamedRestaurant = await restaurants.rename(
            "615f21600000e57c20b00cc6",
            "http://www.saffro.com"
        );
        console.dir(renamedRestaurant, { depth: null });
    } catch (error) {
        console.log(error);
    }

    //14.Try to rename a restaurant passing in invalid data for the parameter to make sure it throws errors.
    try {
        const renamedRestaurant = await restaurants.rename(
            11424124449999,
            "http://www.saffro.com"
        );
        console.dir(renamedRestaurant, { depth: null });
    } catch (error) {
        console.log(error);
    }

    //15.Try getting a restaurant by ID that does not exist to make sure it throws errors.
    try {
        const restaurant = await restaurants.get("615f000c00ba347070d00000");
        console.dir(restaurant, { depth: null });
    } catch (error) {
        console.log(error);
    }

    const db = await connection();
    await db.serverConfig.close();
}

main();
