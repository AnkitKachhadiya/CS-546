const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;

async function create(
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions
) {
    const restaurantCollection = await restaurants();

    const newRestaurant = {
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions,
    };

    const insertedInfo = await restaurantCollection.insertOne(newRestaurant);

    return insertedInfo;
}

module.exports = {
    create,
};
