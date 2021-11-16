import fetch from "node-fetch";
const funOne = () =>{
    return "I am One"
}

const funTwo = () =>{
    return new Promise ((resolve, reject)=>{
    setTimeout(() =>{ resolve( fetch('https://api.agify.io/?name=ayush'))


},3000);
})
}

const funThree =() =>{
    return "I am Three"
}

const callMe = async () =>{
    let one=funOne();
    console.log(one);

    let two= await funTwo();
    console.log(two);

    let three=funThree();
    console.log(three);
    
};

callMe();



