const express = require("express");
const bodyParser =require("body-parser")
//const cors = require("cors");

const app = express();

const swaggerJSDoc= require('swagger-jsdoc')
const swaggerUi= require('swagger-ui-express')

const options={
  definition:{
    openapi: '3.0.0',
    info:{
      title: "NOde JS API Project ",
      version:"1.0.0" 
    },
    servers:[{ 
      url: "http://localhost:8080"
    }]
    
  },
  apis:['routes/tutorial.route.js']


}

const swaggerSpec= swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db= require('./models')

db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require('./routes/tutorial.route')(app)
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});                                                                                      