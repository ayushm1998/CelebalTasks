import fetch from "node-fetch";
//global.fetch = require("node-fetch");


console.log("hello")

fetch('https://api.agify.io/?name=ayush')
.then(res => res.json())
.then(data => console.log(data))

console.log("End")

