const express = require("express");
const session = require("express-session");
const configRoutes = require("./routes");
const { engine } = require("express-handlebars");

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
        name: "SessionRocks",
        secret: `There !$ /\/0 $ecret f0r /\/\Y $e$$!0/\/`,
        saveUninitialized: true,
        resave: false,
        cookie: { maxAge: ONE_DAY },
    })
);

configRoutes(app);

app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
