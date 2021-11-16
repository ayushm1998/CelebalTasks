import fetch from "node-fetch";
const funOne = () =>{
    return "I am One"
}

const funTwo = () =>{
    let name= "ayush";
    //return new Promise ((resolve, reject)=>{
    if(name==="ayush")
    //{ resolve( 
    {    fetch(`https://api.agify.io/?name=${name}`)
    .then(res => res.json())
    .then (data => console.log(data))
    }else{
    //reject(
        console.log( "Data not available");
}


}



const funThree =() =>{
    return "I am Three"
}

const callMe =  () =>{
    let one=funOne();
    console.log(one);
try{
    let two=  funTwo();
   // console.log(two);
}
catch(error){console.log("NA")}


    let three=funThree();
    console.log(three);
    
};

callMe();



