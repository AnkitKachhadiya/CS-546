const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
        const people = await peopleData.allPeople();
        response.json(people);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.get("/:id", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
        const person = await peopleData.getPersonById(request.params.id);
        response.json(person);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

const restrictRequestQuery = (request, response) => {
    if (Object.keys(request.query).length > 0) {
        response.status(400).send({
            serverResponse: "Request query not allowed.",
        });
    }
};

module.exports = router;
