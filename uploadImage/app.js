var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer= require("multer")
var {imageData, router} = require ('./routes/users.js')
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

console.log(imageData)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', router);


const swaggerJSDoc= require('swagger-jsdoc')
const swaggerUi= require('swagger-ui-express')

const options={
  definition:{
    openapi: '3.0.0',
    info:{
      title: "Upload Project ",
      version:"1.0.0" 
    },
    servers:[{ 
      url: "http://localhost:3000"
    }]
    
  },
  apis:['routes/users.js']


}

const swaggerSpec= swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))


//Download Feature
//imageData1=exportedModule.imageData;
//setTimeout(()=>(console.log(usersRouter.imageData)),20000)

app.get('/download/:id',(req,res,next)=>{
var id=req.params.id;
console.log(id)
var pic=imageData[id].name
  //app has download option
  console.log(pic);
  res.download(path.join(__dirname,`/controllers/${pic}`),'Dog.jpg',(error=>{
      if(error){
          if(res.headersSent)
          res.redirect('/download/error')
      }

  })
  )
  })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
