const { response } = require('express');
var db = require('../config/config.js')

const Users= db.users;

var addUser=async (req,res)=>{
    // let data= await Users.build({name:"test", email:"test2@gmail.com"})
    // await data.save();
    
    let data= await Users.create({name:"test6", email:"test6@gmail.com", gender:"m"})
     //Update
    // data.name="dummy";
    // data.save();
    
    //delete
    // data.destroy();
    let response={
        data: 'ok'
    }

    res.status(200).json(response)
}


var crudOperations= async (req,res)=>{

    //Insert
    // let data= await Users.create({name:"Ayush", email:"amehta@gmail.com", gender:"M"})
   
   //Update
//    let data= await Users.update({name:'Anichet'},{where:{name:'Ayush'}})

   //Delete
//    let data= await Users.destroy({
//        where: {
//            id:2
//        }
//    })

//truncate
// let data= await Users.destroy({
//     truncate: true
// })


//bulk insert

// let data= await Users.bulkCreate([
//     {name:"Ayush", email:"amehta@gmail.com", gender:"M"},
//     {name:"Abhi", email:"abhimehta@gmail.com", gender:"F"},
//     {name:"Puneet", email:"nawal@gmail.com", gender:"M"}
// ])


//find
// let data= await Users.findAll({});

   
    let response={
        data:data
    }
    res.status(200).json(response)

}

module.exports={
    addUser, crudOperations
}