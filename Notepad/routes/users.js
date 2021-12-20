const express = require("express");
const router = express.Router();
const apiController = require("../controllers/users");
const jwt = require("jsonwebtoken");
const cache = require("../cache.js");

router.post("/create", apiController.createNote);

router.get("/show/:id", cache(5), apiController.getNotesByName);

//router.get('/showbyID/:id',cache(5),apiController.getNotesByUId)

router.put("/update/:id", apiController.updateNotes);

router.put("/renew/:id", apiController.renewNotes);

router.delete("/delete/:id", apiController.deleteNotes);

router.get("/getAllNotes", cache(10), apiController.getAllNotes);

router.post("/login", apiController.login);

/**
 * @swagger
 * /users/login/:
 *  post:
 *      summary: This api is used to specific specific tutorials information
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Token Received
 */

/**
 * @swagger
 * /users/loginjwt/:
 *  post:
 *      summary: This api is used to login
 *      description: This api is used to check if get is working
 *      responses:
 *          200:
 *              description: Added Successfully
 *          403:
 *              description: Error
 */

router.post("/loginjwt", apiController.verifyToken, apiController.loginjwt);

/**
 * @swagger
 * /users//getAllNotes:
 *  get:
 *      summary: This api is used to login
 *      description: This api is used to check if get is working
 *      responses:
 *          200:
 *              description: Added Successfully
 */

router.post("/", apiController.user);

module.exports = router;
