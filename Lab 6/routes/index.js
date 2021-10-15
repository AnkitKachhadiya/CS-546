const restaurantsRoutes = require("./restaurants");
const reviewsRoutes = require("./reviews");

const constructor = (app) => {
    app.use("/restaurants", restaurantsRoutes);
    app.use("/reviews", reviewsRoutes);

    //for accessing unknown routes
    app.use("*", (request, response) => {
        response.status(404).json({ serverResponse: "Not found." });
    });

    //for invalid URI
    app.use(function (error, request, response, next) {
        response
            .status(error.statusCode)
            .json({ serverResponse: "Bad Request." });
    });
};

module.exports = constructor;
