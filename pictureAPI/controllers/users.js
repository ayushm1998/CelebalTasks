var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
const app = require("../app");
const application = express();
var axios = require("axios");

var { msApiRequest } = require("./axios.js");
var url = require("../url.js");

const getPics = async (req, res) => {
  console.log(url.abc())
console.log(url.def())
  await msApiRequest(url.abc(), url.def())
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports = { getPics };
