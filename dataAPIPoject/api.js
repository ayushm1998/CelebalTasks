var Employee= require('./employee')
const dboperations = require('./dboperations');

var express = require ('express')
var bodyParser=require('body-parser')
var cors= require('cors')
var app= express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/api',router)


router.use((req,res,next)=>{
  console.log("Middleware")
  next();
})

router.route("/employee").get((req,res)=>{
  dboperations.getEmployee().then(result=>{
    //console.log(result))
    res.json(result[0]) 
  })
})

router.route('/employee/:id' ).get((req,res)=>{
  dboperations.getOneEmployee(req.params.id).then(result=>{
    //console.log(result))
    res.json(result[0])
   })
})

router.route("/employee").post((req,res)=>{
  let employee={...req.body}
  dboperations.addEmployee(employee).then(result=>{
    //console.log(result))
    res.status(201).json(result)
  })
})



var port = process.env.PORT || 3000;
app.listen(port)
console.log('Order API is running at '+port)


/* GET users listing. */

  