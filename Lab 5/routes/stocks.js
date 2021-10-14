const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/", async (request, response) => {
    try {
        const stocks = await stocksData.allStocks();
        response.json(stocks);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const stock = await stocksData.getStockById(request.params.id);
        response.json(stock);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

module.exports = router;
