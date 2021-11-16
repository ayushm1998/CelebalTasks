import fs from 'fs';

const d = new Date();
let day = d.getDay();
const myPromise = new Promise((resolve, reject)=>{

    if(day===5){
    resolve();
    } else {
        reject();
    }
})

myPromise
.then(()=> console.log(`Today is ${day+1}th day i.e Friday`)  )
.catch(()=> console.error("SomeAnotherDay"));

//promises with fs

fs.promises
.readFile('./mynewfile1.txt', {encoding: 'utf-8'}, )
.then((data)=> console.log(data))
.catch((err)=> console.log("File not found"));