const express = require ('express');
const path = require('path')

const app= express();
const cookieParser= require('cookie-parser')
const helmet = require ('helmet');
const { permittedCrossDomainPolicies } = require('helmet');
app.use(helmet());

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res,next)=>{
res.send("Sanity Check")
})

app.get('/login', (req,res,next)=>{
    res.render('login')
})

app.post('/process_login', (req,res,next)=>{

    const password=req.body.password;
    const username=req.body.username;
    //validation and saving username in cookie(name,value)
    if(password==='x')
    {
        res.cookie('username',username)
        res.redirect('/welcome')
    }else{
res.redirect('/login?msg=fail')
    }

    //res.json(req.body)
})

app.get('/welcome',(req,res,next)=>
{
    res.render('welcome',{
    username: req.cookies.username
    })
})
app.param('id',(req,res,next,id)=>{
    console.log("Params called:", id)
    next();
})
//getting data from params
app.get('/story/:id',(req,res,next)=>{
    //the req.params object always exists in express it contains all the wildcards
    res.send(`<h1>Story ${req.params.id}</h1>`)

})
//downloading files
app.get('/statement',(req,res,next)=>{
    //app has download option
    res.download(path.join(__dirname,'/userStatments/statement.png'),'Ayushstatement.png',(error=>{
        if(error){
            if(res.headersSent)
            res.redirect('/download/error')
        }

    }))
})
app.get('/logout',(req,res,next)=>{
    res.clearCookie('username');
    res.redirect('/login')

})
app.listen(3000)
console.log("App is listening 3000")