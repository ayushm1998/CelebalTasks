const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const Tutor= db.tutor;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    const tutorial={
        title: req.body.title,
        description: req.body.description,
        published: req.body.published? req.body.published: false
    }
     
    Tutorial.create(tutorial)
    .then(data=>{
        res.send(data);

    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured"
         })
    })
  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title
    var condition= title? {title: { [Op.like]: `%${title}%`}}:null;

    Tutorial.findAll({where: condition} )
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id=req.params.id;

    Tutorial.findByPk(id)
    .then(data=>{
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
                message: "Error retreiving Tutorial with id "+ id
            })
        })

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

    const id= req.params.id

    Tutorial.update(req.body,{
        where: {id: id}
    })
    .then(num=>{
        if(num==1){res.send({
            message: "Tutorial was updated successfully"
        })}
        else{
            res.send({
                message:`Cannot update Tutorial with id=${id}. `
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating Tutorial with id "+ id
        })
    })
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where:{id:id}
    })
    .then(num =>{
        if(num ==1){
        res.send({message: "Tutorial was deleted successfully"
    })
    }else{
        res.send({
            message:`Cannot delete Tutorial with id=${id}`
        })

    }
})
.catch(err=>{
    res.status(500).send({
        message: "Could not delete Tutorial"
    })

})
  
     
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
        Tutorial.destroy({
            where:{},
            truncate: false
        })
        .then(nums=>{
            res.send({message: `${nums} Tutorials where deleted successfully`})
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
    }

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({where:{published:true}})
    .then(data=>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({ 
            message: err.message || "Some error occured"
        })
    })
  

}


// Joins Tutorials and Tutor Table

exports.findJoin = (req, res) => {
    var ids=req.params.id
   

    Tutorial.findAll({attributes:['id','title','description'],
    include:[{
        model:Tutor,
        attributes:['name']
    }],
    where:{id:ids}
    })
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
  
}

