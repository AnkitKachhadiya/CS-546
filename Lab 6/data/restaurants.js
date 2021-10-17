const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

async function create(
    _name,
    _location,
    _phoneNumber,
    _website,
    _priceRange,
    _cuisines,
    serviceOptions
) {
    try {
        validateTotalArguments(arguments.length);

        const name = validateName(_name);
        const location = validateLocation(_location);
        const phoneNumber = validatePhoneNumber(_phoneNumber);
        const website = validateWebsite(_website);
        const priceRange = validatePriceRange(_priceRange);
        const cuisines = validateCuisines(_cuisines);
        validateServiceOptions(serviceOptions);

        const restaurantCollection = await restaurants();

        //check for duplicate restaurants

        const newRestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: [],
        };

        const insertedInfo = await restaurantCollection.insertOne(
            newRestaurant
        );

        if (!insertedInfo.insertedId) {
            throwError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                "Error: Could not add restaurant."
            );
        }

        const insertedRestaurantId = insertedInfo.insertedId;

        const restaurant = await get(insertedRestaurantId.toString());

        return restaurant;
    } catch (error) {
        throwCatchError(error);
    }
}

async function getAll() {
    if (arguments.length !== 0) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: This function doesn't require to pass parameters."
        );
    }

    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection
        .aggregate([
            {
                $project: {
                    _id: {
                        $toString: "$_id",
                    },
                    name: 1,
                },
            },
        ])
        .toArray();

    return restaurantList;
}

async function get(_restaurantId) {
    const restaurantId = validateRestaurantId(_restaurantId);

    const parsedObjectId = validateObjectId(restaurantId);

    const restaurantCollection = await restaurants();

    const restaurant = await restaurantCollection.findOne({
        _id: parsedObjectId,
    });

    if (!restaurant) {
        throwError(ErrorCode.NOT_FOUND, "Error: No restaurant with that id.");
    }

    restaurant._id = restaurant._id.toString();

    return restaurant;
}

async function remove(restaurantId) {
    const restaurant = await get(restaurantId);

    const restaurantCollection = await restaurants();

    const deletedInfo = await restaurantCollection.deleteOne({
        _id: ObjectId(restaurant._id),
    });

    if (deletedInfo.deletedCount !== 1) {
        throw `Could not delete restaurant with id ${restaurantId}`;
    }

    return `${restaurant.name} has been successfully deleted!`;
}

async function rename(restaurantId, _newWebsite) {
    const restaurant = await get(restaurantId);

    const newWebsite = validateWebsite(_newWebsite);

    if (restaurant.website === newWebsite) {
        throw "Error: New website is same as old website.";
    }

    const restaurantCollection = await restaurants();

    const toBeUpdated = {
        website: newWebsite,
    };

    const updatedInfo = await restaurantCollection.updateOne(
        { _id: ObjectId(restaurant._id) },
        { $set: toBeUpdated }
    );

    if (updatedInfo.modifiedCount !== 1) {
        throw "Error: Could not update restaurant.";
    }

    return await get(restaurantId);
}

//All validations
const validateTotalArguments = (totalArguments) => {
    const TOTAL_MANDATORY_ARGUMENTS = 7;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throwError(
            ErrorCode.BAD_REQUEST,
            "Error: All fields need to have valid values."
        );
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
            `Error: Invalid argument passed for ${
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
            `Error: Invalid argument passed for ${
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
            `Error: Invalid argument passed for ${
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
    getAll,
    get,
    remove,
    rename,
};
