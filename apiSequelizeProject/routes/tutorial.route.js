module.exports =app =>{
  const tutorials= require ('../controllers/tutorial.controller.js')

  const tutor=require('../controllers/tutor')


  var router = require("express").Router();

  /**
   * @swagger
   *  components:
   *      schemas:
   *          Tutorials:
   *                    type: object
   *                    properties:
   *                          id:
   *                              type: integer
   *                          title:
   *                              type: string
   *                          description:
   *                              type: string
   */

  
/**
   * @swagger
   * /api/tutorials/:
   *  post:
   *      summary: This api is used to insert tutorials information
   *      description: This api is used to check if get is working
   *      requestBody:
   *          required: true
   *          content:
   *              application/json:
   *                  schema:
   *                      $ref: '#components/schemas/Tutorials'                      
   *      responses:
   *          200:
   *              description: Added Successfully          
   */


  router.post("/",tutorials.create);

  /**
   * @swagger
   * /api/tutorials/:
   *  get:
   *      summary: This api is used to get all the tutorials information
   *      description: This api is used to check if get is working
   *      responses:
   *          200:
   *              description: This is fetch api
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: array
   *                          items:
   *                              $ref: '#components/schemas/Tutorials'            
   */

  router.get("/", tutorials.findAll);

  router.get("/published",tutorials.findAllPublished);

 /**
   * @swagger
   * /api/tutorials/{id}:
   *  get:
   *      summary: This api is used to get specific tutorials information
   *      description: This api is used to check if get is working
   *      parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            description: Numeric ID Required
   *            schema: 
   *              type: integer  
   *      responses:
   *          200:
   *              description: This is fetching api for tutorials
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: array
   *                          items:
   *                              $ref: '#components/schemas/Tutorials'            
   */
  router.get("/:id",tutorials.findOne)

  /**
   * @swagger
   * /api/tutorials/{id}:
   *  put:
   *      summary: This api is used to update tutorials information
   *      description: This api is used to check if put is working
   *      parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            description: Numeric ID Required
   *            schema: 
   *              type: integer
   *      requestBody:
   *          required: true
   *          content:
   *              application/json:
   *                  schema:
   *                      $ref: '#components/schemas/Tutorials'                      
   *      responses:
   *          200:
   *              description: Updated Successfully
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: array
   *                          items:
   *                              $ref: '#components/schemas/Tutorials'            
   */          
   

  router.put("/:id",tutorials.update)

  /**
   * @swagger
   * /api/tutorials/{id}:
   *  delete:
   *      summary: This api is used to specific specific tutorials information
   *      description: This api is used to check if delete is working
   *      parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            description: Numeric ID Required
   *            schema: 
   *              type: integer  
   *      responses:
   *          200:
   *              description: Tutorials  deleted    
   */

  router.delete("/:id",tutorials.delete)

  router.delete("/",tutorials.deleteAll)

  router.post('/tutor', tutor.create)

  //Joins
  router.get('/tutor/:id', tutorials.findJoin)

  app.use('/api/tutorials',router)
}