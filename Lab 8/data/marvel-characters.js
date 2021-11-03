const md5 = require("md5");
const axios = require("axios");

const PUBLIC_KEY = "875175d4d2e7d46ee03a11521673f4f8";
const PRIVATE_KEY = "568731aae996814b06edf9552e264a8b8f8df3cd";

const timestamp = new Date().getTime();

const stringToBeHashed = timestamp + PRIVATE_KEY + PUBLIC_KEY;

const hash = md5(stringToBeHashed);

const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters";

const ErrorCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

async function search(searchTerm) {
    try {
        const API_URL = `${BASE_URL}?nameStartsWith=${searchTerm}&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
        const { data } = await axios.get(API_URL);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getCharacter() {}

module.exports = {
    search,
    getCharacter,
};
