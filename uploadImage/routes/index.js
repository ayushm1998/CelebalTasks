const express = require("express");
const router = express.Router();
const controller = require("../controllers/users")

let routes = (app) => {
  router.post("/upload", controller.upload);

  app.use(router);
};

module.exports = routes;