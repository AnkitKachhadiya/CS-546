const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

//create review by restaurant id
async function create(
    restaurantId,
    _title,
    _reviewer,
    rating,
    _dateOfReview,
    _review
) {
    try {
        validateTotalArgumentsCreate(arguments.length);

        const title = validateTitle(_title);
        const reviewer = validateReviewer(_reviewer);
        validateRating(rating);
        const dateOfReview = validateDateOfReview(_dateOfReview);
        const review = validateReview(_review);

        const restaurant = await getRestaurant(restaurantId);

        const restaurantCollection = await restaurants();

        //check for duplicate reviews

        const newReview = {
            _id: ObjectId(),
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review,
        };

        restaurant.reviews.push(newReview);

        const newOverallRating = getAverageOfRestaurantRatings(
            restaurant.reviews
        );

        const updatedInfo = await restaurantCollection.updateOne(
            { _id: ObjectId(restaurant._id) },
            {
                $push: { reviews: newReview },
                $set: { overallRating: newOverallRating },
            }
        );

        if (updatedInfo.modifiedCount !== 1) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Could not add review."
            );
        }

        return await getRestaurant(restaurantId);
    } catch (error) {
        throwCatchError(error);
    }
}

//get reviews by restaurant id
async function getAll(restaurantId) {
    try {
    } catch (error) {
        throwCatchError(error);
    }
}

async function getRestaurant(_restaurantId) {
    try {
        const restaurantId = validateRestaurantId(_restaurantId);

        const parsedObjectId = validateObjectId(restaurantId);

        const restaurantCollection = await restaurants();

        const restaurant = await restaurantCollection.findOne({
            _id: parsedObjectId,
        });

        if (!restaurant) {
            throwError(
                ErrorCode.NOT_FOUND,
                "Error: No restaurant with that id."
            );
        }

        restaurant._id = restaurant._id.toString();

        return restaurant;
    } catch (error) {
        throwCatchError(error);
    }
}

//All validations
const validateTotalArgumentsCreate = (totalFields) => {
    const TOTAL_MANDATORY_Fields = 6;

    if (totalFields !== TOTAL_MANDATORY_Fields) {
        throwError(ErrorCode.BAD_REQUEST, "Error: You must supply all fields.");
    }
};

const validateTitle = (title) => {
    isArgumentString(title, "title");
    isStringEmpty(title, "title");

    return title.trim();
};

const validateReviewer = (_reviewer) => {
    isArgumentString(_reviewer, "reviewer");
    isStringEmpty(_reviewer, "reviewer");

    const reviewer = _reviewer.trim();

    isValidString(reviewer, "Reviewer");

    return reviewer;
};

const validateRating = (rating) => {
    if (typeof rating !== "number" || isNaN(rating)) {
        throwError(ErrorCode.BAD_REQUEST, "Error: Rating must be a number.");
    }

    const LOWEST_RATING = 0;
    const HIGHEST_RATING = 5;

    if (rating < LOWEST_RATING || rating > HIGHEST_RATING) {
        throwError(ErrorCode.BAD_REQUEST, "Error: Rating must be from 0 to 5.");
    }
};

const validateDateOfReview = (_dateOfReview) => {
    isArgumentString(_dateOfReview, "date of review");
    isStringEmpty(_dateOfReview, "date of review");

    const dateOfReview = _dateOfReview.trim();

    const today = new Date();

    const givenDateOfReview = new Date(dateOfReview);

    if (
        today.getFullYear() !== givenDateOfReview.getFullYear() ||
        today.getMonth() !== givenDateOfReview.getMonth() ||
        today.getDate() !== givenDateOfReview.getDate()
    ) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Date of review should be in format MM/DD/YYYY. Date of review cannot be in past or in future."
        );
    }

    return dateOfReview;
};

const validateReview = (review) => {
    isArgumentString(review, "review");
    isStringEmpty(review, "review");

    return review.trim();
};

const isArgumentString = (str, variableName) => {
    if (typeof str !== "string") {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid type for ${
                variableName || "provided variable"
            }. Expected string.`
        );
    }
};

const isStringEmpty = (str, variableName) => {
    if (!str.trim() || str.length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty string passed for ${
                variableName || "provided variable"
            }.`
        );
    }
};

const isValidString = (str, variableName) => {
    const number = parseFloat(str);

    if (!isNaN(number)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: ${variableName} cannot be number string.`
        );
    }
};

const validateRestaurantId = (restaurantId) => {
    isArgumentString(restaurantId, "id");
    isStringEmpty(restaurantId, "id");

    return restaurantId.trim();
};

const validateObjectId = (id) => {
    if (!ObjectId.isValid(id)) {
        throwError(ErrorCode.BAD_REQUEST, "Error: id is not a valid ObjectId.");
    }

    return ObjectId(id);
};

const getAverageOfRestaurantRatings = (reviews) => {
    let totalCount = 0;
    let sum = 0;

    for (currentReview of reviews) {
        sum += currentReview.rating;
        totalCount++;
    }

    return sum / totalCount;
};

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
