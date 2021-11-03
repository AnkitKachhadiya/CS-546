const express = require("express");
const router = express.Router();
const data = require("../data");
const marvelCharactersData = data.marvelCharacters;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

router.get("/", async (request, response) => {
    response.render("marvel-characters", { pageTitle: "Character Finder" });
});

router.post("/search", async (request, response) => {
    const requestPostData = request.body;

    const searchResult = await marvelCharactersData.search(
        requestPostData.searchTerm
    );

    console.log(searchResult);
    response.render("marvel-characters/search", {
        pageTitle: "Characters Found",
        requestPostData: JSON.stringify(searchResult.data.results),
    });
});
router.get("/characters/:id", async (request, response) => {});

module.exports = router;
