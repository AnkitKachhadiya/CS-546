const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/", async (request, response) => {
    try {
        const stocks = await stocksData.allStocks();
        response.json(stocks);
    } catch (error) {
        response.status(500).send({ serverResponse: error });
    }
});

router.get("/:id", async (request, response) => {
    try {
        const stock = await stocksData.getStockById(request.params.id);
        response.json(stock);
    } catch (error) {
        response.status(500).send({ serverResponse: error });
    }
});

module.exports = router;
