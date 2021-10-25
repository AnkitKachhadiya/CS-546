const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

//create review by restaurant id
router.post("/:restaurantId", async (request, response) => {
    try {
        const requestPostData = request.body;

        validateTotalFieldsCreate(Object.keys(requestPostData).length);

        const restaurantId = validateRestaurantId(request.params.restaurantId);
        validateObjectId(restaurantId);
        const title = validateTitle(requestPostData.title);
        const reviewer = validateReviewer(requestPostData.reviewer);
        validateRating(requestPostData.rating);
        const dateOfReview = validateDateOfReview(requestPostData.dateOfReview);
        const review = validateReview(requestPostData.review);

        const reviewedRestaurant = await reviewsData.create(
            restaurantId,
            title,
            reviewer,
            requestPostData.rating,
            dateOfReview,
            review
        );
        response.json(reviewedRestaurant);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//get all reviews by restaurant id
router.get("/:restaurantId", async (request, response) => {
    try {
        restrictRequestQuery(request, response);

        if (Object.keys(request.body).length !== 0) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Doesn't require fields to be passed."
            );
        }

        const restaurantId = validateRestaurantId(request.params.restaurantId);

        validateObjectId(restaurantId);

        const reviews = await reviewsData.getAll(restaurantId);
        response.json(reviews);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//get review by review id
router.get("/review/:id", async (request, response) => {
    try {
        restrictRequestQuery(request, response);

        if (Object.keys(request.body).length !== 0) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Doesn't require fields to be passed."
            );
        }

        const reviewId = validateReviewId(request.params.id);

        validateObjectId(reviewId);

        const review = await reviewsData.get(reviewId);
        response.json(review);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//delete review by review id
router.delete("/:id", async (request, response) => {
    try {
        restrictRequestQuery(request, response);

        if (Object.keys(request.body).length !== 0) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Doesn't require fields to be passed."
            );
        }

        const reviewId = validateReviewId(request.params.id);

        validateObjectId(reviewId);

        const deletedReview = await reviewsData.remove(reviewId);
        response.json(deletedReview);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//All validations
const validateTotalFieldsCreate = (totalFields) => {
    const TOTAL_MANDATORY_FIELDS = 5;

    if (totalFields !== TOTAL_MANDATORY_FIELDS) {
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

    const LOWEST_RATING = 1;
    const HIGHEST_RATING = 5;

    if (rating < LOWEST_RATING || rating > HIGHEST_RATING) {
        throwError(ErrorCode.BAD_REQUEST, "Error: Rating must be from 1 to 5.");
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

const validateReviewId = (reviewId) => {
    isArgumentString(reviewId, "id");
    isStringEmpty(reviewId, "id");

    return reviewId.trim();
};

const validateObjectId = (id) => {
    //should match 24 length Hex string
    const objectIdRegex = /^[a-fA-F0-9]{24}$/;

    if (!ObjectId.isValid(id) || !objectIdRegex.test(id)) {
        throwError(ErrorCode.BAD_REQUEST, "Error: id is not a valid ObjectId.");
    }

    return ObjectId(id);
};

const throwError = (code = 404, message = "Not found") => {
    throw { code, message };
};

const restrictRequestQuery = (request, response) => {
    if (Object.keys(request.query).length > 0) {
        throw { code: 400, message: "Request query not allowed." };
    }
};

module.exports = router;
