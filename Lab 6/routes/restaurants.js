const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const data = require("../data");
const restaurantsData = data.restaurants;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

//get all restaurants
router.get("/", async (request, response) => {
    try {
        restrictRequestQuery(request, response);

        if (Object.keys(request.body).length !== 0) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Doesn't require fields to be passed."
            );
        }

        const restaurants = await restaurantsData.getAll();
        response.json(restaurants);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//create new restaurant
router.post("/", async (request, response) => {
    try {
        const requestPostData = request.body;

        validateTotalFieldsCreate(Object.keys(requestPostData).length);

        const name = validateName(requestPostData.name);
        const location = validateLocation(requestPostData.location);
        const phoneNumber = validatePhoneNumber(requestPostData.phoneNumber);
        const website = validateWebsite(requestPostData.website);
        const priceRange = validatePriceRange(requestPostData.priceRange);
        const cuisines = validateCuisines(requestPostData.cuisines);
        validateServiceOptions(requestPostData.serviceOptions);

        const newRestaurant = await restaurantsData.create(
            name,
            location,
            phoneNumber,
            website,
            priceRange,
            cuisines,
            requestPostData.serviceOptions
        );
        response.json(newRestaurant);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//get restaurant by id
router.get("/:id", async (request, response) => {
    try {
        restrictRequestQuery(request, response);

        if (Object.keys(request.body).length !== 0) {
            throwError(
                ErrorCode.BAD_REQUEST,
                "Error: Doesn't require fields to be passed."
            );
        }

        const restaurantId = validateRestaurantId(request.params.id);

        validateObjectId(restaurantId);

        const person = await restaurantsData.get(restaurantId);
        response.json(person);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//update restaurant by id
router.put("/:id", async (request, response) => {
    try {
        const requestPostData = request.body;

        validateTotalFieldsUpdate(Object.keys(requestPostData).length);

        const restaurantId = validateRestaurantId(request.params.id);
        validateObjectId(restaurantId);
        const name = validateName(requestPostData.name);
        const location = validateLocation(requestPostData.location);
        const phoneNumber = validatePhoneNumber(requestPostData.phoneNumber);
        const website = validateWebsite(requestPostData.website);
        const priceRange = validatePriceRange(requestPostData.priceRange);
        const cuisines = validateCuisines(requestPostData.cuisines);
        validateServiceOptions(requestPostData.serviceOptions);

        const updatedRestaurant = await restaurantsData.update(
            restaurantId,
            name,
            location,
            phoneNumber,
            website,
            priceRange,
            cuisines,
            requestPostData.serviceOptions
        );

        response.json(updatedRestaurant);
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

//All validations
const validateTotalFieldsCreate = (totalFields) => {
    const TOTAL_MANDATORY_Fields = 7;

    if (totalFields !== TOTAL_MANDATORY_Fields) {
        throwError(ErrorCode.BAD_REQUEST, "Error: You must supply all fields.");
    }
};

const validateTotalFieldsUpdate = (totalFields) => {
    const TOTAL_MANDATORY_Fields = 7;

    if (totalFields !== TOTAL_MANDATORY_Fields) {
        throwError(ErrorCode.BAD_REQUEST, "Error: You must supply all fields.");
    }
};

const validateName = (name) => {
    isArgumentString(name, "name");
    isStringEmpty(name, "name");

    return name.trim();
};

const validateLocation = (location) => {
    isArgumentString(location, "location");
    isStringEmpty(location, "location");

    return location.trim();
};

const validatePhoneNumber = (_phoneNumber) => {
    isArgumentString(_phoneNumber, "phone number");
    isStringEmpty(_phoneNumber, "phone number");

    const phoneNumber = _phoneNumber.trim();

    //should match `xxx-xxx-xxxx`
    const phoneNumberRegex = /^\d{3}[-]\d{3}[-]\d{4}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Invalid phone number. Format should be 'xxx-xxx-xxxx'."
        );
    }

    return phoneNumber;
};

const validateWebsite = (_website) => {
    isArgumentString(_website, "website");
    isStringEmpty(_website, "website");

    const website = _website.trim();

    // should match string that starts with `http(s)://www.` 5 characters or more with no spaces and ends with `.com`
    const websiteRegex = /^http(s?):\/\/www\.[^\s]{5,}.com$/i;

    if (!websiteRegex.test(website)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Invalid website. Should have a string that starts with `http://www.` 5 or more characters with no spaces and ends with `.com` e.g. `http://www.example.com`."
        );
    }

    return website;
};

const validatePriceRange = (_priceRange) => {
    isArgumentString(_priceRange, "price range");
    isStringEmpty(_priceRange, "price range");

    const priceRange = _priceRange.trim();

    //should match `$` or `$$` or `$$$` or `$$$$`
    const priceRangeRegex = /^\${1,4}$/;

    if (!priceRangeRegex.test(priceRange)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Invalid price range. Price range should be between '$' to '$$$$'."
        );
    }

    return priceRange;
};

const validateCuisines = (_cuisines) => {
    isArgumentArray(_cuisines, "cuisines");
    isArrayEmpty(_cuisines, "cuisines");

    const cuisines = [];

    for (const currentCuisine of _cuisines) {
        if (
            typeof currentCuisine === "string" &&
            currentCuisine.trim().length > 0
        ) {
            cuisines.push(currentCuisine.trim());
            continue;
        }

        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Cuisines must have non empty string elements."
        );
    }

    return cuisines;
};

const validateServiceOptions = (serviceOptions) => {
    isArgumentObject(serviceOptions, "service options");
    isObjectEmpty(serviceOptions, "service options");

    if (Object.keys(serviceOptions).length !== 3) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Service options has invalid number of options."
        );
    }

    if (
        !serviceOptions.hasOwnProperty("dineIn") ||
        !serviceOptions.hasOwnProperty("takeOut") ||
        !serviceOptions.hasOwnProperty("delivery")
    ) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: Service options does not have valid options."
        );
    }

    const hasValidElements = Object.values(serviceOptions).every(
        (currentServiceOption) => {
            return typeof currentServiceOption === "boolean";
        }
    );

    if (!hasValidElements) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: All service options should have boolean values."
        );
    }
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

const isArgumentArray = (arr, variableName) => {
    if (!Array.isArray(arr)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid type for ${
                variableName || "provided variable"
            }. Expected array.`
        );
    }
};

const isArrayEmpty = (arr, variableName) => {
    if (arr.length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty array passed for ${
                variableName || "provided variable"
            }.`
        );
    }
};

const isArgumentObject = (obj, variableName) => {
    if (!isObject(obj)) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Invalid type for ${
                variableName || "provided variable"
            }. Expected object.`
        );
    }
};

const isObject = (obj) => {
    return (
        !Array.isArray(obj) &&
        typeof obj === "object" &&
        obj !== null &&
        obj instanceof Object &&
        obj.constructor === Object
    );
};

const isObjectEmpty = (obj, variableName) => {
    if (Object.keys(obj).length < 1) {
        throwError(
            ErrorCode.BAD_REQUEST,
            `Error: Empty object passed for ${
                variableName || "provided variable"
            }.`
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

const throwError = (code = 404, message = "Not found") => {
    throw { code, message };
};

const restrictRequestQuery = (request, response) => {
    if (Object.keys(request.query).length > 0) {
        throw { code: 400, message: "Request query not allowed." };
    }
};

module.exports = router;
