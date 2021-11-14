const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

async function createUser(username, password) {}

async function checkUser(username, password) {}

module.exports = {
    createUser,
    checkUser,
};
