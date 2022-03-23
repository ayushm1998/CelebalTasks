var express = require("express");
var path = require("path");

var usersRouter = require("./routes/users");

var app = express();

app.use("/workingdirectory", usersRouter);

module.exports = app;
