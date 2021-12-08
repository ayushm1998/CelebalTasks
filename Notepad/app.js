var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path=require('path')
var sequelize= require('sequelize')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jwt = require('jsonwebtoken');
var bearer= require('bearer')
var http= require('http')


var app = express();

const swaggerJSDoc= require('swagger-jsdoc')
const swaggerUi= require('swagger-ui-express')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    // API informations (required)
    title: 'Notepad Project', // Title (required)
    version: '1.0.0', // Version (required)
  },
  servers: [{url: 'http://localhost:3000/'}],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};


const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['routes/users.js'],
};


const swaggerSpec= swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))


const db= require('./config/config')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text())

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')


app.get('/download/:id',(req,res,next)=>{
    var name=req.params.id;
    // console.log(id)
    // var pic=imageData[id].name
    //   //app has download option
    //   console.log(pic);
      res.download(path.join(__dirname,`/notes/${name}`),`Notes ${name}.txt`,(error=>{
          if(error){
              if(res.headersSent)
              res.redirect('/download/error')
          }
    
      })
      )
      })
    

db.sequelize.sync();

module.exports = app;
