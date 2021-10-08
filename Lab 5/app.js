const { response } = require("express");
const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Hello world");
});

app.listen(PORT, () => {
    console.log("running...");
});
