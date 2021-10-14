const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/", async (request, response) => {
    try {
        restrictRequestQuery(request, response);
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
        restrictRequestQuery(request, response);
        const stock = await stocksData.getStockById(request.params.id);
        response.json(stock);
    } catch (error) {
        response.status(error.code || 500).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

const restrictRequestQuery = (request, response) => {
    if (Object.keys(request.query).length > 0) {
        response.status(400).send({
            serverResponse: "Request query not allowed.",
        });
    }
};

module.exports = router;
