const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

async function create(
    _name,
    _location,
    _phoneNumber,
    _website,
    _priceRange,
    _cuisines,
    serviceOptions
) {
    try {
        validateTotalArgumentsCreate(arguments.length);

        const restaurantCollection = await restaurants();

        //check for duplicate reviews

        const newReview = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: [],
        };

        const insertedInfo = await restaurantCollection.insertOne(newReview);

        if (!insertedInfo.insertedId) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Could not add review."
            );
        }

        const insertedReviewId = insertedInfo.insertedId;

        const review = await get(insertedReviewId.toString());

        return review;
    } catch (error) {
        throwCatchError(error);
    }
}

const throwError = (code = 404, message = "Not found") => {
    throw { code, message };
};

const throwCatchError = (error) => {
    if (error.code && error.message) {
        throwError(error.code, error.message);
    }

    throwError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Error: Internal server error."
    );
};

module.exports = {
    create,
};
