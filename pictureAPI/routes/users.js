var express = require("express");
var router = express.Router();

const app = require("../app");
const fs = require("fs");
const apiController = require("../controllers/users");
const { apiData } = require("../controllers/users");
//const {msaxios}=require('../controllers/users')
var watchList = [];
var counts = 0;
var reqId = 0;
var url = require("../url");

router.get("/", apiController.getPics);

router.post("/watchlist/:id", (req, res) => {
  reqId = req.params.id;
  if (apiData.length != 0) {
    var result = apiData.find((obj) => {
      return obj.id === reqId - 0;
    });
    watchList.push({ id: ++counts, url: result.message });
    setTimeout(() => console.log(watchList), 5000);
    res.send({ message: "Success" });
  } else {
    console.log("Data Not Available");
    res.send({ error: "Failed Data Not Available" });
  }
});

module.exports = router;
