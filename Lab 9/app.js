const express = require("express");
const path = require("path");

const app = express();

const static = express.static(__dirname + "/public");

const PORT = 3000;

app.use("/public", static);

app.get("/", (request, response) => {
    response.sendFile(path.resolve("static/index.html"));
});

//for accessing unknown routes
app.use("*", (request, response) => {
    response.status(404).sendFile(path.resolve("static/page-not-found.html"));
});

//for invalid URI
app.use(function (error, request, response, next) {
    response.status(404).sendFile(path.resolve("static/page-not-found.html"));
});

app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${PORT}`);
});
