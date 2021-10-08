const peopleRoutes = require("./people");
const stocksRoutes = require("./stocks");

const constructor = (app) => {
    app.use("/people", peopleRoutes);
    app.use("/stocks", stocksRoutes);

    app.use("*", (request, response) => {
        response.status(404).json({ error: "Resource not found." });
    });
};

module.exports = constructor;
