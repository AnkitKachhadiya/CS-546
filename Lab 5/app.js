const express = require("express");
const app = express();
const configRoutes = require("./routes");

const PORT = 3000;

configRoutes(app);

app.listen(PORT, () => {
    console.log("running...");
});
