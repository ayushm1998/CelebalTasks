import fetch from "node-fetch";

const funOne = () =>{
    return "I am One"
}

const funTwo = () =>{
    let name= "ayush";
    return new Promise ((resolve, reject)=>{
    if(name==="ayush")

    { resolve( fetch(`https://api.agify.io/?name=${name}`)
    .then(res => res.json()))
    //.catch(console.log("Request failed")))
    //.then (data => (data))

    }
    else {
    reject(error);
} 


}
)}


const funThree =() =>{
    return "I am Three"
}

const callMe = async () =>{
    let one=funOne();
    console.log(one);

try{
    let two= await funTwo();
    console.log(two);
}
catch(error){console.log("Data Not Avaialble")}


    let three=funThree();
    console.log(three);
    
};

callMe();



