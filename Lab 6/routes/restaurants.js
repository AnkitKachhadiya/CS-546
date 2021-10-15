const express = require("express");
const router = express.Router();
const data = require("../data");
const restaurantsData = data.restaurants;

router.get("/", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
        const restaurants = await restaurantsData.getAll();
        response.json(restaurants);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

/////////////////////////

router.post("/", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
        const restaurants = await restaurantsData.getAll();
        response.json(restaurants);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.get("/:id", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
        const restaurants = await restaurantsData.getAll();
        response.json(restaurants);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.put("/:id", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
        const restaurants = await restaurantsData.getAll();
        response.json(restaurants);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.delete("/:id", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
        const restaurants = await restaurantsData.getAll();
        response.json(restaurants);
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
