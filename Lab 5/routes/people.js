const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/", async (request, response) => {
    try {
        const people = await peopleData.allPeople();
        response.json(people);
    } catch (error) {
        response.status(500).send({ serverResponse: error });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const person = await peopleData.getPersonById(request.params.id);
        response.json(person);
    } catch (error) {
        response.status(500).send({ serverResponse: error });
    }
});

module.exports = router;
