const express = require("express");
const session = require("express-session");
const configRoutes = require("./routes");
const { engine } = require("express-handlebars");
const path = require("path");

const static = express.static(__dirname + "/public");
const app = express();

const PORT = 3000;
const ONE_DAY = 1000 * 60 * 60 * 24;

app.use("/public", static);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(
    session({
        name: "AuthCookie",
        secret: `There !$ /\/0 $ecret f0r /\/\Y $e$$!0/\/`,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(async (request, response, next) => {
    const currentTimestamp = new Date().toUTCString();
    const method = request.method;
    const routeUrl = request.originalUrl;
    const authenticationStatus = request.session.user
        ? "(Authenticated User)"
        : "(Non-Authenticated User)";

    console.log(
        `[${currentTimestamp}]: ${method} ${routeUrl} ${authenticationStatus}`
    );

    next();
});

app.use("/private", (request, response, next) => {
    if (!request.session.user) {
        response.status(403).sendFile(path.resolve("static/forbidden.html"));
    } else {
        next();
    }
});

configRoutes(app);

app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
