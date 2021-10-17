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
router.post("/:restaurantId", async (request, response) => {});

//get all reviews by restaurant id
router.get("/", async (request, response) => {
    try {
        restrictRequestQuery(request, response);

        if (Object.keys(request.body).length !== 0) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Doesn't require fields to be passed."
            );
        }

        const restaurants = await reviewsData.getAll();
        response.json(restaurants);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//All validations
const throwError = (code = 404, message = "Not found") => {
    throw { code, message };
};

const restrictRequestQuery = (request, response) => {
    if (Object.keys(request.query).length > 0) {
        throw { code: 400, message: "Request query not allowed." };
    }
};

module.exports = router;
