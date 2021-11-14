const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const data = require("../data");
const usersData = data.users;

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

router.get("/", async (request, response) => {
    try {
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.get("/signup", async (request, response) => {
    try {
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.post("/signup", async (request, response) => {
    try {
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.post("/login", async (request, response) => {
    try {
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.get("/private", async (request, response) => {
    try {
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

router.get("/logout", async (request, response) => {
    try {
    } catch (error) {
        response.status(error.code || ErrorCode.INTERNAL_SERVER_ERROR).send({
            serverResponse: error.message || "Internal server error.",
        });
    }
});

module.exports = router;
