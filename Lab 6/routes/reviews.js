const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;

router.get("/", async (request, response) => {
    try {
        restrictRequestQuery(request, response);

        const reviews = await reviews.getAll();
        response.json(reviews);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

const restrictRequestQuery = (request, response) => {
    if (Object.keys(request.query).length > 0) {
        throw { code: 400, message: "Request query not allowed." };
    }
};

module.exports = router;
