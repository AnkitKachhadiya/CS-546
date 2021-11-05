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
    let displaySearchTerm;

    try {
        const requestPostData = request.body;

        displaySearchTerm = requestPostData.searchTerm;

        const searchTerm = validateSearchTerm(requestPostData.searchTerm);

        const searchResult = await marvelCharactersData.search(searchTerm);

        response.render("marvel-characters/search-result", {
            pageTitle: "Characters Found",
            searchTerm: displaySearchTerm,
            characters: searchResult,
        });
    } catch (error) {
        response
            .status(error.code || ErrorCode.INTERNAL_SERVER_ERROR)
            .render("marvel-characters/search-result", {
                pageTitle: "Characters Found",
                searchTerm: displaySearchTerm,
                error: error.message || "Internal server error.",
                characters: [],
            });
    }
});

router.get("/characters/:id", async (request, response) => {
    try {
        const characterId = validateCharacterId(request.params.id);

        const character = await marvelCharactersData.getCharacterById(
            characterId
        );

        const characterName = character.name || "NA";
        const characterThumbnail = character.thumbnail.path || "NA";
        const characterThumbnailExtension =
            character.thumbnail.extension || "NA";
        const characterImage = `${characterThumbnail}.${characterThumbnailExtension}`;
        const characterDescription = character.description || "NA";
        const characterComics = character.comics.items || [];

        response.render("marvel-characters/character", {
            pageTitle: characterName,
            characterName: characterName,
            characterImage: characterImage,
            characterDescription: characterDescription,
            characterComics: characterComics,
        });
    } catch (error) {
        response
            .status(error.code || ErrorCode.INTERNAL_SERVER_ERROR)
            .render("marvel-characters/character", {
                pageTitle: "Error",
                error: error.message || "Internal server error.",
            });
    }
});

//All validations
const validateSearchTerm = (searchTerm) => {
    isArgumentString(searchTerm, "search term");
    isStringEmpty(searchTerm, "search term");

    return searchTerm.trim();
};

const validateCharacterId = (_id) => {
    return isValidInteger(_id, "character id");
};

const isValidInteger = (id, variableName) => {
    if (typeof id !== "string") {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid type passed for ${
                variableName || "provided variable"
            }. Expected string.`
        );
    }

    if (!id.trim() || id.length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty string passed for ${
                variableName || "provided variable"
            }.`
        );
    }

    const number = parseInt(id, 10);

    if (isNaN(number)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: ${variableName} should be a number.`
        );
    }

    return number;
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
    if (!str.trim() || str.length < 1 || Number(str) === 0) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty string passed for ${
                variableName || "provided variable"
            }.`
        );
    }
};

const throwError = (code = 404, message = "Not found") => {
    throw { code, message };
};

module.exports = router;
