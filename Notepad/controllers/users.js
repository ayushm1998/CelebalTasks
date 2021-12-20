const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const app = require("../app");
const fs = require("fs");
const application = express();
const path = require("path");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const NodeCache = require("node-cache");
const db = require("../config/config");
const Op = db.Sequelize.Op;
const Notes = db.notes;

const users = [];

var createNote = async (req, res) => {
  try {
    if (req.body.name && req.body.note) {
      var data = req.body;
      await fs.appendFile(
        `notes/${data.name}`,
        `${data.note}` + "/n",
        function (err) {
          var notes = {
            UId: uuid.v1(),
            name: data.name,
            path: `notes/${data.name}`,
          };

          Notes.create(notes).then((notedata) => {
            res.status(201).json(notedata);
          });
        }
      );
    } else throw error;
  } catch (error) {
    res.status(400).send("Contents cannot be empty!");
  }
};

var getAllNotes = async (req, res) => {
  try {
    var data = await Notes.findAll({
      attributes: ["name", "UId"],
    });
    res.status(200).send(data);
    console.log(data);
  } catch (error) {
    res.status(500).send({
      message: "Some error occured",
    });
    console.log("Error Occured");
  }
};

var getNotesByName = async (req, res) => {
  try {
    var Id = req.params.id;
    var path = await Notes.findAll({
      raw: true,
      where: { name: Id },
      attributes: ["path"],
    });
    await fs.readFile(`${path[0].path}`, "utf8", function (err, data) {
      res.status(200).send(data);
    });
  } catch {
    res.status(404).send("File not Found");
  }
};

var updateNotes = async (req, res) => {
  try {
    var data = req.body;
    var fname = req.params.id;

    var path = await Notes.findAll({
      raw: true,
      where: { name: fname },
      attributes: ["path", "updateCount"],
    });

    await fs.stat(`${path[0].path}`, async function (err, stat) {
      console.log(req.originalUrl);
      if (err == null) {
        console.log("File exists");
        await fs.appendFile(`${path[0].path}`, `${data}` + "\n", async function (err) {
          //    console.log((caches.has(key)))
          //    caches.set(key,data)
          //  console.log(typeof(`${path[0].updateCount}`))

          await Notes.update(
            { updateCount: parseInt(`${path[0].updateCount}`) + 1 },
            {
              where: { name: fname },
            }
          );
          res.status(201).json("Updated Successfully");
        });
      } else if (err.code === "ENOENT") {
        res.status(400).send({
          message: "File not found",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

var renewNotes = async (req, res) => {
  try {
    var data = req.body;
    var fname = req.params.id;
    var path = await Notes.findAll({
      raw: true,
      where: { name: fname },
      attributes: ["path", "updateCount"],
    });
    //console.log(`${path[0].path}`)
    await fs.stat(`${path[0].path}`, function (err, stat) {
      if (err == null) {
        console.log("File exists");
        fs.writeFile(`${path[0].path}`, `${data}` + "\n", function (err) {
          //  console.log(typeof(`${path[0].updateCount}`))
          Notes.update(
            { updateCount: parseInt(`${path[0].updateCount}`) + 1 },
            {
              where: { name: fname },
            }
          );
          res.status(201).json("Updated Successfully");
        });
      } else if (err.code === "ENOENT") {
        res.status(400).send({
          message: "File not found",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
var deleteNotes = async (req, res) => {
  try {
    var fname = req.params.id;
    var path = await Notes.findAll({
      raw: true,
      where: { name: fname },
      attributes: ["path"],
    });
    await fs.stat(`${path[0].path}`, function (err, stat) {
      var data = req.body;
      if (err == null) {
        console.log("File exists");
        fs.unlink(`${path[0].path}`, function (err) {
          Notes.destroy({ where: { name: fname } });
          res.status(201).send("File Deleted Succesfully");
        });
      } else if (err.code === "ENOENT") {
        res.status(400).send({
          message: "File doesn't exist",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

var user = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    console.log(users);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
};

var login = (req, res) => {
  try {
    // Mock User
    const user = {
      id: 1,
      username: "ayush",
      email: "amehta@email.com",
    };
    jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
      res.json({
        token,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

var loginjwt = async (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: "Post Created",
          authData,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

function verifyToken(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error.message);
  }
}

const mathOperations = {
  sum: function (a, b) {
    return a + b;
  },

  diff: function (a, b) {
    return a - b;
  },
  product: function (a, b) {
    return a * b;
  },
};

module.exports = {
  createNote,
  getNotesByName,
  updateNotes,
  deleteNotes,
  getAllNotes,
  login,
  user,
  loginjwt,
  renewNotes,
  verifyToken,
  mathOperations,
};
