const sequelize= require("./util/database")
const Customer=require("./models/customer")
const Order=require("./models/order")
let customerId=null;
Customer.hasMany(Order);

sequelize
.sync({force: true})
.then(result=>{
   return Customer.create({name:"Ayush", email:"abc@email.com"})
    console.log(result)
}).then(customer=>{
    customerId= customer.id;
    console.log("First Customer Created",customer);
    return customer.createOrder({total:45});
})
.then(order=>{
    console.log("Order is:".order)
    return Order.findAll({where: customerId})
})
.then(orders=>{
    console.log("All the orders are:",orders )
})
.catch((err)=>{
console.log(err)})