const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;

async function create(
    _name,
    _location,
    _phoneNumber,
    _website,
    _priceRange,
    _cuisines,
    overallRating,
    serviceOptions
) {
    validateTotalArguments(arguments.length);

    const name = validateName(_name);
    const location = validateLocation(_location);
    const phoneNumber = validatePhoneNumber(_phoneNumber);
    const website = validateWebsite(_website);
    const priceRange = validatePriceRange(_priceRange);
    const cuisines = validateCuisines(_cuisines);
    validateOverallRating(overallRating);
    validateServiceOptions(serviceOptions);

    const restaurantCollection = await restaurants();

    const newRestaurant = {
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions,
    };

    const insertedInfo = await restaurantCollection.insertOne(newRestaurant);

    if (insertedInfo.insertedCount === 0) {
        throw "Error: Could not add restaurant.";
    }

    const insertedRestaurantId = insertedInfo.insertedId;

    const restaurant = await get(insertedRestaurantId.toString());

    return restaurant;
}

async function getAll() {
    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection
        .aggregate([
            {
                $project: {
                    _id: {
                        $toString: "$_id",
                    },
                    name: 1,
                    location: 1,
                    phoneNumber: 1,
                    website: 1,
                    priceRange: 1,
                    cuisines: 1,
                    overallRating: 1,
                    serviceOptions: 1,
                },
            },
        ])
        .toArray();

    return restaurantList;
}

async function get(restaurantId) {
    validateRestaurantId(restaurantId);

    const parsedObjectId = validateObjectId(restaurantId);

    const restaurantCollection = await restaurants();

    const restaurant = await restaurantCollection.findOne({
        _id: parsedObjectId,
    });

    if (!restaurant) {
        throw "Error: No restaurant with that id.";
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
    const TOTAL_MANDATORY_ARGUMENTS = 8;

    if (totalArguments !== TOTAL_MANDATORY_ARGUMENTS) {
        throw "Error: All fields need to have valid values.";
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
        throw "Error: Invalid phone number. Format should be 'xxx-xxx-xxxx'.";
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
        throw "Error: Invalid website. Should have a string that starts with `http://www.` 5 or more characters with no spaces and ends with `.com` e.g. `http://www.example.com`.";
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
        throw "Error: Invalid price range. Price range should be between '$' to '$$$$'.";
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

        throw "Error: Cuisines must have non empty string elements.";
    }

    return cuisines;
};

const validateOverallRating = (overallRating) => {
    if (typeof overallRating !== "number" || isNaN(overallRating)) {
        throw "Error: Overall rating must be a number.";
    }

    const LOWEST_RATING = 0;
    const HIGHEST_RATING = 5;

    if (overallRating < LOWEST_RATING || overallRating > HIGHEST_RATING) {
        throw "Error: Overall rating must from 0 to 5.";
    }
};

const validateServiceOptions = (serviceOptions) => {
    isArgumentObject(serviceOptions, "service options");
    isObjectEmpty(serviceOptions, "service options");

    if (Object.keys(serviceOptions).length !== 3) {
        throw "Error: Service options has invalid number of options.";
    }

    if (
        !serviceOptions.hasOwnProperty("dineIn") ||
        !serviceOptions.hasOwnProperty("takeOut") ||
        !serviceOptions.hasOwnProperty("delivery")
    ) {
        throw "Error: Service options does not have valid options.";
    }

    const hasValidElements = Object.values(serviceOptions).every(
        (currentServiceOption) => {
            return typeof currentServiceOption === "boolean";
        }
    );

    if (!hasValidElements) {
        throw "Error: All service options should have boolean values.";
    }
};

const isArgumentString = (str, variableName) => {
    if (typeof str !== "string") {
        throw `Error: Invalid argument passed for ${
            variableName || "provided variable"
        }. Expected string.`;
    }
};

const isStringEmpty = (str, variableName) => {
    if (!str.trim() || str.length < 1) {
        throw `Error: Empty string passed for ${
            variableName || "provided variable"
        }.`;
    }
};

const isArgumentArray = (arr, variableName) => {
    if (!Array.isArray(arr)) {
        throw `Error: Invalid argument passed for ${
            variableName || "provided variable"
        }. Expected array.`;
    }
};

const isArrayEmpty = (arr, variableName) => {
    if (arr.length < 1) {
        throw `Error: Empty array passed for ${
            variableName || "provided variable"
        }.`;
    }
};

const isArgumentObject = (obj, variableName) => {
    if (!isObject(obj)) {
        throw `Error: Invalid argument passed for ${
            variableName || "provided variable"
        }. Expected object.`;
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
        throw `Error: Empty object passed for ${
            variableName || "provided variable"
        }.`;
    }
};

const validateRestaurantId = (restaurantId) => {
    isArgumentString(restaurantId, "id");
    isStringEmpty(restaurantId, "id");

    return restaurantId.trim();
};

const validateObjectId = (id) => {
    if (!ObjectId.isValid(id)) {
        throw "Error: id is not a valid ObjectId.";
    }

    return ObjectId(id);
};

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename,
};
