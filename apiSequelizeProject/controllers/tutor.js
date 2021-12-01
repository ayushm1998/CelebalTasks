const db = require("../models");
const Op = db.Sequelize.Op;
const Tutor= db.tutor;


// Create and Save a new Tutor
exports.create = async (req, res) => {
    try{
    if(!req.body.tutid){
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    var tutor={
        tutid: req.body.tutid,
        name: req.body.name,
        courseid: req.body.courseid
    }
     
    var data= await Tutor.create(tutor)
    //.then(data=>{
       // console.log(data)
        res.send(data);

    //})
}
    catch(err)//=>
    {
        res.status(500).send({
            message: err.message || "Some error occured"
         })
    }
    //)
  
};


