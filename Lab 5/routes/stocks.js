const express = require("express");
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        response.json({ msg: "s" });
    } catch (error) {}
});

module.exports = router;
