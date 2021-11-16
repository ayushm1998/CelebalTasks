console.log("Hey before timing")
setTimeout( ()=> {console.log("hello welcome to 0 timing functions")},0000)

setImmediate( ()=> {console.log("Immediately done")})

setTimeout( ()=> {console.log("hello welcome to 5 timing functions")},5000)

setTimeout( ()=> {console.log("hello welcome to 10 timing functions")},10000)

setImmediate( ()=> {console.log("Immediately done")})

var seconds =0;


function a (){
console.log(seconds+"seconds")
seconds++;
}

 setInterval(a,1000);

console.log("finish")