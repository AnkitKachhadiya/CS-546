const usersRoutes = require("./users");
const path = require("path");

const constructorMethod = (app) => {
    //will load login page i.e home page of the application
    app.use("/", usersRoutes);

    //for accessing unknown routes
    app.use("*", (request, response) => {
        response
            .status(404)
            .sendFile(path.resolve("static/page-not-found.html"));
    });

    //for invalid URI
    app.use(function (error, request, response, next) {
        response
            .status(404)
            .sendFile(path.resolve("static/page-not-found.html"));
    });
};

module.exports = constructorMethod;
