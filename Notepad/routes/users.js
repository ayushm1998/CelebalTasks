var express = require('express');
var router = express.Router();
var apiController = require('../controllers/users')
//var verifyToken= require('../controllers/users')
var jwt = require('jsonwebtoken')


router.post('/create',apiController.createNote)

router.get('/show/:id',apiController.getNotesByName)

router.get('/showbyID/:id',apiController.getNotesByUId)

router.put('/update/:id',apiController.updateNotes)

router.put('/renew/:id', apiController.renewNotes)

router.delete('/delete/:id',apiController.deleteNotes)

router.get('/getAllNotes',apiController.getAllNotes)

router.post('/login', apiController.login)

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

router.post('/loginjwt',apiController.verifyToken, apiController.loginjwt)

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

router.post('/',apiController.user)

module.exports = router;



