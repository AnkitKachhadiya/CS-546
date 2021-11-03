const marvelCharactersRoutes = require("./marvel-characters");

const constructorMethod = (app) => {
    //will load search bar page i.e home page of the application
    app.use("/", marvelCharactersRoutes);

    //for accessing unknown routes
    app.use("*", (request, response) => {
        response.redirect("/posts");
    });

    //for invalid URI
    app.use(function (error, request, response, next) {
        response.redirect("/posts");
    });
};

module.exports = constructorMethod;
