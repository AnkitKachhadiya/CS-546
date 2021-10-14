const peopleRoutes = require("./people");
const stocksRoutes = require("./stocks");

const constructor = (app) => {
    app.use("/people", peopleRoutes);
    app.use("/stocks", stocksRoutes);

    //for accessing unknown routes
    app.use("*", (request, response) => {
        response.status(404).json({ serverResponse: "Not found." });
    });

    //for invalid URI
    app.use(function (err, req, res, next) {
        res.status(err.statusCode).json({ serverResponse: "Bad Request." });
    });
};

module.exports = constructor;
